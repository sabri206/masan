



// --- Helpers and middleware (must be before everything else) ---

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const db = require("./db");
const app = express();

// ميدلوير للتحقق من الدور
function requireRole(roles) {
  return function (req, res, next) {
    if (!req.user || !req.user.role || !Array.isArray(roles)) {
      return res.status(403).json({ message: "Access denied. No user or role." });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient role." });
    }
    next();
  };
}

// ميدلوير للتحقق من صلاحية محددة
function requirePermission(permission) {
  return function (req, res, next) {
    if (!req.user || !req.user.permissions || typeof permission !== "string") {
      return res.status(403).json({ message: "Access denied. No user or permissions." });
    }
    if (!req.user.permissions[permission]) {
      return res.status(403).json({ message: "Access denied. Missing permission: " + permission });
    }
    next();
  };
}


// --- All route definitions after helpers ---
// استخراج الرقم الفعلي من رقم الفاتورة النصي (مثلاً: INV-2026-000528 → 528)
app.get("/api/invoice/number/:invoiceNo", (req, res) => {
  let invoiceNoRaw = String(req.params.invoiceNo || "").trim();
  let invoiceNoNum = invoiceNoRaw.match(/(\d{3,})$/);
  invoiceNoNum = invoiceNoNum ? Number(invoiceNoNum[1]) : null;
  if (!invoiceNoNum) {
    return res.status(400).json({ message: "Invalid invoice number format." });
  }
  return res.json({ invoiceNo: invoiceNoNum });
});
// حذف جميع الإيصالات المرتبطة برقم فاتورة معين
app.delete("/api/receipts/by-invoice/:invoiceNo", requireRole(["admin", "accountant"]), (req, res) => {
  let invoiceNoRaw = String(req.params.invoiceNo || "").trim();
  // استخراج الرقم فقط من النص (مثلاً: INV-2026-000528 → 528)
  let invoiceNoNum = invoiceNoRaw.match(/(\d{3,})$/);
  invoiceNoNum = invoiceNoNum ? Number(invoiceNoNum[1]) : NaN;
  if (!invoiceNoNum || Number.isNaN(invoiceNoNum)) {
    return res.status(400).json({ message: "Invalid invoice number format." });
  }
  const dbPath = require("path").resolve(__dirname, "./db.js");
  const dbModule = require(dbPath);
  // جلب كل الإيصالات المرتبطة بالفاتورة
  const receipts = dbModule.db.prepare("SELECT id, customer_id, date FROM receipts WHERE invoice_no = ?").all(invoiceNoNum);
  // حذف كل الإيصالات التي تحمل نفس رقم الفاتورة
  const stmtReceipts = dbModule.db.prepare("DELETE FROM receipts WHERE invoice_no = ?");
  const infoReceipts = stmtReceipts.run(invoiceNoNum);
  // حذف من جدول rmb_expenses أيضاً
  const stmtRmb = dbModule.db.prepare("DELETE FROM rmb_expenses WHERE invoice_no = ?");
  const infoRmb = stmtRmb.run(invoiceNoNum);
  // حذف كل بنود النقل المرتبطة بنفس رقم الفاتورة (invoice_no)
  let deletedTransport = 0;
  // أولاً: حذف كل بند نقل يحمل نفس رقم الفاتورة
  const stmtTransportByInvoice = dbModule.db.prepare("DELETE FROM receipts WHERE invoice_no = ? AND type IN ('النقل', 'بند النقل')");
  const infoTransportByInvoice = stmtTransportByInvoice.run(invoiceNoNum);
  deletedTransport += infoTransportByInvoice.changes;
  // ثانياً: حذف أي بند نقل قد يكون مرتبط بنفس الزبون والتاريخ (للتوافق مع الحالات القديمة)
  const stmtTransportByCustomerDate = dbModule.db.prepare("DELETE FROM receipts WHERE customer_id = ? AND date = ? AND type IN ('النقل', 'بند النقل')");
  for (const rec of receipts) {
    const info = stmtTransportByCustomerDate.run(rec.customer_id, rec.date);
    deletedTransport += info.changes;
  }
  // إضافة طباعة لرقم الفاتورة وعدد السطور المحذوفة
  console.log(`[حذف فاتورة] invoiceNo: ${invoiceNoNum}, deleted_receipts: ${infoReceipts.changes}, deleted_rmb_expenses: ${infoRmb.changes}, deleted_transport: ${deletedTransport}`);
  if (infoReceipts.changes > 0 || infoRmb.changes > 0 || deletedTransport > 0) {
    return res.json({ ok: true, deleted_receipts: infoReceipts.changes, deleted_rmb_expenses: infoRmb.changes, deleted_transport });
  } else {
    return res.status(404).json({ message: "No receipts, transport items, or RMB expenses found for this invoice number." });
  }
});
// Enable trust proxy to allow correct IP detection behind reverse proxies
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;
const uploadsDir = path.join(__dirname, "uploads");
const TOKEN_TTL_MS = Math.max(5 * 60 * 1000, Number(process.env.AUTH_TOKEN_TTL_MS || 12 * 60 * 60 * 1000));
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "masan_sid";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json({ limit: "10mb" }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

const authLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_LOGIN_RATE_LIMIT_MAX || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

const attachmentUploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.ATTACHMENT_UPLOAD_RATE_LIMIT_MAX || 60),
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many upload requests. Please try again later." },
});

app.use((req, res, next) => {
  const noCachePaths = new Set(["/", "/index.html", "/app.js", "/sw.js", "/manifest.webmanifest"]);
  if (noCachePaths.has(req.path)) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      const base = path.basename(filePath);
      if (base === "index.html" || base === "app.js" || base === "sw.js" || base === "manifest.webmanifest") {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      }
    },
  })
);
app.use("/uploads", express.static(uploadsDir));

const requireEnv = (key) => {
  const value = String(process.env[key] || "").trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const optionalEnv = (key) => String(process.env[key] || "").trim();

const AUTH_USER = requireEnv("ADMIN_USER");
const AUTH_PASS = requireEnv("ADMIN_PASS");
const ACCOUNTANT_USER = optionalEnv("ACCOUNTANT_USER");
const ACCOUNTANT_PASS = optionalEnv("ACCOUNTANT_PASS");
const VIEWER_USER = optionalEnv("VIEWER_USER");
const VIEWER_PASS = optionalEnv("VIEWER_PASS");
const activeTokens = new Map();

const USERS = [{ username: AUTH_USER, password: AUTH_PASS, role: "admin" }];
// حذف أي مستخدم masanadmin من قاعدة البيانات عند بدء السيرفر لضمان اعتماد المستخدم من الكود فقط
try {
  const dbPath = require("path").resolve(__dirname, "./db.js");
  const dbModule = require(dbPath);
  if (dbModule && dbModule.db && dbModule.db.prepare) {
    dbModule.db.prepare("DELETE FROM user_accounts WHERE username = ?").run("masanadmin");
    // حذف كل السطور من جدول receipts التي تحمل رقم الفاتورة 1234568
    const deleted = dbModule.db.prepare("DELETE FROM receipts WHERE invoice_no = ?").run(1234568);
    if (deleted.changes > 0) {
      console.log("[حذف تلقائي] تم حذف جميع السطور ذات رقم الفاتورة 1234568 من جدول receipts.");
    }
  }
} catch (e) { /* تجاهل أي خطأ */ }
USERS.push({ username: "masanadmin", password: "masanadmin", role: "admin" });
// إضافة مستخدم masanadmin/masanadmin دائماً بغض النظر عن متغيرات البيئة
USERS.push({ username: "masanadmin", password: "masanadmin", role: "admin" });
if (ACCOUNTANT_USER && ACCOUNTANT_PASS) {
  USERS.push({ username: ACCOUNTANT_USER, password: ACCOUNTANT_PASS, role: "accountant" });
}
if (VIEWER_USER && VIEWER_PASS) {
  USERS.push({ username: VIEWER_USER, password: VIEWER_PASS, role: "viewer" });
}
const SYSTEM_USERNAMES = new Set(USERS.map((u) => String(u.username || "").trim().toLowerCase()));

const ROLE_PERMISSIONS = {
  admin: {
    customers_write: true,
    receipts_write: true,
    transfers_write: true,
    budget_write: true,
    delete_records: true,
    locks_manage: true,
    audit_view: true,
    backups_restore: true,
    backups_view: true,
    timeline_view: true,
    alerts_view: true,
    kpi_view: true,
    import_data: true,
    monthly_close: true,
    monthly_override: true,
    export_reports: true,
  },
  accountant: {
    customers_write: true,
    receipts_write: true,
    transfers_write: true,
    budget_write: true,
    delete_records: false,
    locks_manage: true,
    audit_view: false,
    backups_restore: false,
    backups_view: true,
    timeline_view: true,
    alerts_view: true,
    kpi_view: true,
    import_data: true,
    monthly_close: false,
    monthly_override: false,
    export_reports: true,
  },
  viewer: {
    customers_write: false,
    receipts_write: false,
    transfers_write: false,
    budget_write: false,
    delete_records: false,
    locks_manage: false,
    audit_view: false,
    backups_restore: false,
    backups_view: false,
    timeline_view: true,
    alerts_view: true,
    kpi_view: true,
    import_data: false,
    monthly_close: false,
    monthly_override: false,
    export_reports: true,
  },
};

const getPermissionsForRole = (role) => ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.viewer;
const ALL_PERMISSIONS = Object.keys(ROLE_PERMISSIONS.admin);

const normalizePermissionsInput = (permissions, role) => {
  const base = getPermissionsForRole(role);
  if (!permissions || typeof permissions !== "object") {
    return { ...base };
  }
  const normalized = { ...base };
  ALL_PERMISSIONS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(permissions, key)) {
      normalized[key] = Boolean(permissions[key]);
    }
  });
  return normalized;
};

const parseStoredPermissions = (permissionsJson, role) => {
  try {
    const parsed = permissionsJson ? JSON.parse(permissionsJson) : null;
    return normalizePermissionsInput(parsed, role);
  } catch (err) {
    return getPermissionsForRole(role);
  }
};

const buildEffectiveUsers = () => {
  const customUsers = db.listUserAccounts();
  const customByUsername = new Map(
    customUsers.map((entry) => [String(entry.username || "").trim().toLowerCase(), entry])
  );

  const effective = [];
  USERS.forEach((entry) => {
    const username = String(entry.username || "").trim().toLowerCase();
    const custom = customByUsername.get(username);
    if (custom) {
      effective.push({
        username: custom.username,
        role: custom.role,
        source: "system",
      });
      customByUsername.delete(username);
      return;
    }

    effective.push({
      username: entry.username,
      role: entry.role,
      source: "system",
    });
  });

  for (const entry of customByUsername.values()) {
    effective.push({
      username: entry.username,
      role: entry.role,
      source: "custom",
    });
  }

  return effective;
};

const hasAnotherAdmin = (excludedUsername) => {
  const target = String(excludedUsername || "").trim().toLowerCase();
  return buildEffectiveUsers().some(
    (entry) => String(entry.username || "").trim().toLowerCase() !== target && entry.role === "admin"
  );
};

const createToken = () => crypto.randomBytes(24).toString("hex");

const parseCookies = (req) => {
  const raw = String(req.headers.cookie || "");
  if (!raw) return {};
  return raw.split(";").reduce((acc, item) => {
    const [key, ...rest] = item.trim().split("=");
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join("=") || "");
    return acc;
  }, {});
};

const getTokenFromRequest = (req) => {
  const cookies = parseCookies(req);
  const cookieToken = String(cookies[SESSION_COOKIE_NAME] || "").trim();
  if (cookieToken) return cookieToken;

  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
};

const setSessionCookie = (res, token) => {
  res.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    maxAge: TOKEN_TTL_MS,
    path: "/",
  });
};

const clearSessionCookie = (res) => {
  res.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    path: "/",
  });
};

const isTokenExpired = (session) => {
  const expiresAt = Number(session?.expiresAt || 0);
  return !expiresAt || Date.now() > expiresAt;
};

const authMiddleware = (req, res, next) => {
  if (req.path === "/auth/login") {
    return next();
  }
  const token = getTokenFromRequest(req);
  console.log("[authMiddleware] token:", token);
  if (!token || !activeTokens.has(token)) {
    console.log("[authMiddleware] Unauthorized: token missing or not active");
    return res.status(401).json({ message: "Unauthorized" });
  }
  const session = activeTokens.get(token);
  console.log("[authMiddleware] session:", session);
  if (!session || isTokenExpired(session)) {
    console.log("[authMiddleware] Session expired or not found");
    activeTokens.delete(token);
    clearSessionCookie(res);
    return res.status(401).json({ message: "Session expired. Please login again." });
  }

  session.expiresAt = Date.now() + TOKEN_TTL_MS;
  activeTokens.set(token, session);
  req.user = session;
  console.log("[authMiddleware] req.user:", req.user);
  return next();
};


const sanitizeAttachmentName = (name) => {
  const raw = String(name || "").trim() || "attachment";
  return raw.replace(/[^a-zA-Z0-9._\-\u0600-\u06FF ]+/g, "_").slice(0, 120);
};

const getFileExtension = (fileName, mimeType) => {
  const fromName = path.extname(String(fileName || "")).toLowerCase();
  if (fromName) {
    return fromName;
  }
  const mime = String(mimeType || "").toLowerCase();
  if (mime === "application/pdf") return ".pdf";
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  return ".bin";
};

const writeAudit = (req, action, entityType, entityId, details) => {
  try {
    db.logAudit({
      username: req.user?.username || req.user?.user || "unknown",
      role: req.user?.role || "unknown",
      action,
      entityType,
      entityId,
      details,
    });
  } catch (err) {
    // Do not fail request if audit write fails.
  }
};

const ensureDateUnlocked = (res, date) => {
  if (db.isDateLocked(date)) {
    res.status(409).json({ message: "هذا التاريخ مقفل ولا يمكن تعديل الحركات فيه." });
    return false;
  }
  return true;
};

const ensureDateEditable = (req, res, date) => {
  if (!ensureDateUnlocked(res, date)) {
    return false;
  }

  const closedMonth = db.isMonthClosed(date);
  if (!closedMonth) {
    return true;
  }

  const overrideReason = String(req.body?.overrideReason || req.query?.overrideReason || "").trim();
  if (req.user?.permissions?.monthly_override && overrideReason) {
    writeAudit(req, "monthly-close-override", "monthly-close", closedMonth.id, {
      month: closedMonth.month,
      reason: overrideReason,
      date,
    });
    return true;
  }

  res.status(409).json({
    message: `الشهر ${closedMonth.month} مغلق. يلزم صلاحية override مع سبب.`
  });
  return false;
};

app.post("/api/auth/login", authLoginLimiter, (req, res) => {
  const rawUsername = String(req.body?.username || "");
  const rawPassword = String(req.body?.password || "");
  const username = rawUsername.trim();
  const password = rawPassword.trim();
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }
  const customAccount = db.getUserAccountByUsername(username);
  let account = null;
  let permissions = null;

  if (customAccount && String(customAccount.password || "") === password) {
    account = customAccount;
    permissions = parseStoredPermissions(customAccount.permissions_json, customAccount.role);
  } else {
    const systemAccount = USERS.find(
      (u) => String(u.username || "").trim().toLowerCase() === username.toLowerCase() && String(u.password || "").trim() === password
    );
    if (systemAccount) {
      account = systemAccount;
      permissions = getPermissionsForRole(systemAccount.role);
    }
  }

  if (!account || !permissions) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = createToken();
  activeTokens.set(token, {
    username: account.username,
    role: account.role,
    permissions,
    expiresAt: Date.now() + TOKEN_TTL_MS,
  });
  setSessionCookie(res, token);
  return res.json({ token, user: account.username, role: account.role, permissions });
});

app.post("/api/auth/logout", authMiddleware, (req, res) => {
  const token = getTokenFromRequest(req);
  if (token) {
    activeTokens.delete(token);
  }
  clearSessionCookie(res);
  return res.json({ ok: true });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user?.username || "",
    role: req.user?.role || "viewer",
    permissions: req.user?.permissions || getPermissionsForRole(req.user?.role || "viewer"),
  });
});

// Add Cache-Control: no-store for all API responses to prevent caching
app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
}, authMiddleware);

// --- RMB Expenses & Ledger API ---
app.get("/api/rmb-expenses", requireRole(["admin", "accountant", "viewer"]), (req, res) => {
  try {
    const rows = db.db.prepare("SELECT * FROM rmb_expenses ORDER BY date DESC, id DESC").all();
    res.json(rows);
  } catch (err) {
    console.error("[rmb-expenses]", err.message);
    res.status(500).json({ message: "خطأ في جلب مصاريف الرممبي.", error: err.message });
  }
});

app.post("/api/rmb-expenses", requireRole(["admin", "accountant"]), (req, res) => {
  const { customerId, invoiceNo, date, amount, exchangeRate, details } = req.body || {};
  if (!customerId || !invoiceNo || !date || !amount || !exchangeRate) {
    return res.status(400).json({ message: "بيانات ناقصة." });
  }
  try {
    const stmt = db.db.prepare("INSERT INTO rmb_expenses (customer_id, invoice_no, date, amount, exchange_rate, details) VALUES (?, ?, ?, ?, ?, ?)");
    const info = stmt.run(customerId, invoiceNo, date, amount, exchangeRate, details || "");
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ message: "فشل في إضافة مصروف الرممبي." });
  }
});

app.delete("/api/rmb-expenses/:id", requireRole(["admin"]), (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: "معرّف غير صالح." });
  try {
    const stmt = db.db.prepare("DELETE FROM rmb_expenses WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes > 0) {
      res.json({ ok: true });
    } else {
      res.status(404).json({ message: "لم يتم العثور على المصروف." });
    }
  } catch (err) {
    res.status(500).json({ message: "فشل في حذف المصروف." });
  }
});

app.get("/api/rmb-ledger", requireRole(["admin", "accountant", "viewer"]), (req, res) => {
  const currencyTo = req.query.currencyTo || "يوان";
  try {
    const rows = db.db.prepare("SELECT * FROM rmb_expenses WHERE exchange_rate IS NOT NULL AND amount IS NOT NULL ORDER BY date DESC, id DESC").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "خطأ في جلب دفتر الرممبي." });
  }
});

app.get("/api/rmb-transfers", requireRole(["admin", "accountant", "viewer"]), (req, res) => {
  try {
    const rows = db.db.prepare("SELECT * FROM rmb_expenses ORDER BY date DESC, id DESC").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "خطأ في جلب تحويلات الرممبي." });
  }
});

app.get("/api/system/permissions", requireRole(["admin"]), (req, res) => {
  return res.json({
    permissions: ALL_PERMISSIONS,
    roleDefaults: ROLE_PERMISSIONS,
  });
});

app.get("/api/system/users", requireRole(["admin"]), (req, res) => {
  const customByUsername = new Map(
    db
      .listUserAccounts()
      .map((entry) => [String(entry.username || "").trim().toLowerCase(), entry])
  );

  const users = [];

  USERS.forEach((entry) => {
    const username = String(entry.username || "").trim().toLowerCase();
    const custom = customByUsername.get(username);
    if (custom) {
      users.push({
        username: custom.username,
        role: custom.role,
        source: "system",
        editable: true,
        created_at: custom.created_at,
        updated_at: custom.updated_at,
        permissions: parseStoredPermissions(custom.permissions_json, custom.role),
      });
      customByUsername.delete(username);
      return;
    }

    users.push({
      username: entry.username,
      role: entry.role,
      source: "system",
      editable: true,
      permissions: getPermissionsForRole(entry.role),
    });
  });

  for (const entry of customByUsername.values()) {
    users.push({
      username: entry.username,
      role: entry.role,
      source: "custom",
      editable: true,
      created_at: entry.created_at,
      updated_at: entry.updated_at,
      permissions: parseStoredPermissions(entry.permissions_json, entry.role),
    });
  }

  return res.json(users);
});

app.post("/api/system/users", requireRole(["admin"]), (req, res) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "").trim();
  const role = String(req.body?.role || "viewer").trim();
  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }
  if (!/^[a-zA-Z0-9._-]{3,40}$/.test(username)) {
    return res.status(400).json({ message: "Username must be 3-40 chars and may contain letters, numbers, dot, underscore, dash." });
  }
  if (!Object.prototype.hasOwnProperty.call(ROLE_PERMISSIONS, role)) {
    return res.status(400).json({ message: "Invalid role." });
  }

  const existing = db.getUserAccountByUsername(username);
  const systemUser = USERS.find((entry) => String(entry.username || "").trim().toLowerCase() === username);
  const currentRole = existing?.role || systemUser?.role || null;

  if (currentRole === "admin" && role !== "admin" && !hasAnotherAdmin(username)) {
    return res.status(400).json({ message: "Cannot remove admin role from the last admin user." });
  }

  if (!existing && password.length < 4) {
    return res.status(400).json({ message: "Password must be at least 4 characters." });
  }

  const permissions = normalizePermissionsInput(req.body?.permissions || {}, role);
  try {
    const result = db.upsertUserAccount({ username, password, role, permissions });
    writeAudit(req, result.created ? "create" : "update", "user-account", username, {
      role,
      permissions,
    });
    return res.json({ ok: true, created: result.created });
  } catch (err) {
    return res.status(400).json({ message: err?.message || "Failed to save user." });
  }
});

app.delete("/api/system/users/:username", requireRole(["admin"]), (req, res) => {
  const username = String(req.params.username || "").trim().toLowerCase();
  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }
  if (String(req.user?.username || "").trim().toLowerCase() === username) {
    return res.status(400).json({ message: "Cannot delete current logged-in user." });
  }

  const customUser = db.getUserAccountByUsername(username);
  const systemUserIndex = USERS.findIndex((entry) => String(entry.username || "").trim().toLowerCase() === username);
  const effectiveRole = customUser?.role || (systemUserIndex >= 0 ? USERS[systemUserIndex].role : null);

  if (!effectiveRole) {
    return res.status(404).json({ message: "User not found." });
  }

  if (effectiveRole === "admin" && !hasAnotherAdmin(username)) {
    return res.status(400).json({ message: "Cannot delete the last admin user." });
  }

  const removedCustom = db.deleteUserAccount(username);
  let removedSystem = false;
  if (systemUserIndex >= 0) {
    USERS.splice(systemUserIndex, 1);
    SYSTEM_USERNAMES.delete(username);
    removedSystem = true;
  }

  if (!removedCustom && !removedSystem) {
    return res.status(404).json({ message: "User not found." });
  }
  writeAudit(req, "delete", "user-account", username, {});
  return res.json({ ok: true });
});

app.post("/api/attachments/upload", attachmentUploadLimiter, requireRole(["admin", "accountant"]), (req, res) => {
  const fileName = sanitizeAttachmentName(req.body?.fileName || "");
  const mimeType = String(req.body?.mimeType || "application/octet-stream").trim().toLowerCase();
  const dataBase64 = String(req.body?.dataBase64 || "").trim();

  if (!dataBase64) {
    return res.status(400).json({ message: "No file data provided." });
  }

  const allowedMimeTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
  if (!allowedMimeTypes.has(mimeType)) {
    return res.status(400).json({ message: "Unsupported file type. Allowed: PDF/JPG/PNG/WEBP." });
  }

  let fileBuffer;
  try {
    fileBuffer = Buffer.from(dataBase64, "base64");
  } catch (err) {
    return res.status(400).json({ message: "Invalid file encoding." });
  }

  if (!fileBuffer.length) {
    return res.status(400).json({ message: "Empty file." });
  }

  const maxBytes = 5 * 1024 * 1024;
  if (fileBuffer.length > maxBytes) {
    return res.status(400).json({ message: "File too large. Maximum size is 5MB." });
  }

  const ext = getFileExtension(fileName, mimeType);
  const storedName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const fullPath = path.join(uploadsDir, storedName);

  try {
    fs.writeFileSync(fullPath, fileBuffer);
  } catch (err) {
    return res.status(500).json({ message: "Failed to store attachment." });
  }

  return res.status(201).json({
    url: `/uploads/${storedName}`,
    fileName,
    mimeType,
    size: fileBuffer.length,
  });
});

app.get("/api/customers", (req, res) => {
  res.json(db.listCustomers());
});

app.get("/api/customers/next-code", (req, res) => {
  res.json({ nextCode: db.getNextCustomerCode() });
});

app.post("/api/customers", requireRole(["admin", "accountant"]), (req, res) => {
  const { name, phone, address, initialBalance } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Customer name is required." });
  }
  const exists = db.findCustomerByNameNorm(name.trim().toLowerCase());
  if (exists) {
    return res.status(409).json({ message: "Customer name already exists." });
  }
  const balanceValue = initialBalance === "" || initialBalance === undefined ? 0 : Number(initialBalance);
  if (Number.isNaN(balanceValue)) {
    return res.status(400).json({ message: "Initial balance must be a number." });
  }
  const result = db.insertCustomer({ name, phone, address, initialBalance: balanceValue });
  writeAudit(req, "create", "customer", result.id, { name: name.trim() });
  return res.status(201).json(result);
});

app.put("/api/customers/:id", requireRole(["admin", "accountant"]), (req, res) => {
  const id = Number(req.params.id);
  const { name, phone, address, initialBalance } = req.body || {};
  if (!id || !name || !name.trim()) {
    return res.status(400).json({ message: "Invalid customer data." });
  }
  const exists = db.findCustomerByNameNorm(name.trim().toLowerCase(), id);
  if (exists) {
    return res.status(409).json({ message: "Customer name already exists." });
  }
  const balanceValue = initialBalance === "" || initialBalance === undefined ? 0 : Number(initialBalance);
  if (Number.isNaN(balanceValue)) {
    return res.status(400).json({ message: "Initial balance must be a number." });
  }
  const updated = db.updateCustomer({ id, name, phone, address, initialBalance: balanceValue });
  if (!updated) {
    return res.status(404).json({ message: "Customer not found." });
  }
  writeAudit(req, "update", "customer", id, { name: name.trim() });
  return res.json({ ok: true });
});

app.delete("/api/customers/:id", requireRole(["admin"]), (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  const removed = db.deleteCustomer(id);
  if (!removed) {
    return res.status(404).json({ message: "Customer not found." });
  }
  writeAudit(req, "delete", "customer", id, {});
  return res.json({ ok: true });
});

app.get("/api/receipts", (req, res) => {
  const customerId = Number(req.query.customerId);
  if (!customerId) {
    return res.status(400).json({ message: "Customer id required." });
  }
  res.json(db.listReceiptsByCustomer(customerId));
});

app.get("/api/receipts/next-invoice", (req, res) => {
  res.json({ nextInvoiceNo: db.getNextInvoiceNo() });
});

app.post("/api/receipts", requireRole(["admin", "accountant"]), (req, res) => {
  const {
    senderCustomerId,
    receiverCustomerId,
    date,
    type,
    amount,
    deliveryDate,
    details,
    attachmentUrl,
    attachmentName,
  } = req.body || {};

  const senderId = Number(senderCustomerId);
  const receiverId = receiverCustomerId ? Number(receiverCustomerId) : null;
  const safeAttachmentUrl = String(attachmentUrl || "").trim();
  const safeAttachmentName = String(attachmentName || "").trim();

  if (!senderId || !date || !type || amount === undefined || amount === null) {
    return res.status(400).json({ message: "Missing receipt data." });
  }
  if (!ensureDateEditable(req, res, date)) {
    return;
  }
  if (receiverId && receiverId === senderId) {
    return res.status(400).json({ message: "Sender and receiver cannot match." });
  }
  const numericAmount = Math.abs(Number(amount));
  if (Number.isNaN(numericAmount) || numericAmount === 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }

  if (!req.body?.bypassDuplicateCheck) {
    const similar = db.findSimilarReceipt({ customerId: senderId, date, type, amount: numericAmount });
    if (similar) {
      return res.status(409).json({
        code: "SIMILAR_RECEIPT",
        message: "تم العثور على حركة مشابهة مؤخراً. هل تريد المتابعة؟",
        similar,
      });
    }
  }

  const sender = db.getCustomerById(senderId);
  if (!sender) {
    return res.status(404).json({ message: "Sender not found." });
  }
  const receiver = receiverId ? db.getCustomerById(receiverId) : null;
  if (receiverId && !receiver) {
    return res.status(404).json({ message: "Receiver not found." });
  }

  const senderReceipt = db.insertReceipt({
    customerId: senderId,
    date,
    type,
    amount: -numericAmount,
    senderName: sender.name,
    receiverName: receiver ? receiver.name : "",
    deliveryDate,
    details,
    attachmentUrl: safeAttachmentUrl,
    attachmentName: safeAttachmentName,
  });

  const receiverReceipt = receiver
    ? db.insertReceipt({
        customerId: receiver.id,
        date,
        type,
        amount: numericAmount,
        senderName: sender.name,
        receiverName: receiver.name,
        deliveryDate,
        details,
        attachmentUrl: safeAttachmentUrl,
        attachmentName: safeAttachmentName,
      })
    : null;

  writeAudit(req, "create", "receipt", senderReceipt.id, {
    type,
    senderId,
    receiverId,
    senderName: sender.name,
    receiverName: receiver ? receiver.name : "",
    amount: numericAmount,
  });
  return res.status(201).json({ senderReceipt, receiverReceipt });
});

app.put("/api/receipts/:id", requireRole(["admin", "accountant"]), (req, res) => {
  const id = Number(req.params.id);
  const {
    customerId,
    date,
    type,
    amount,
    senderName,
    receiverName,
    deliveryDate,
    details,
    attachmentUrl,
    attachmentName,
  } = req.body || {};

  if (!id || !customerId || !date || !type || amount === undefined || amount === null) {
    return res.status(400).json({ message: "Missing receipt data." });
  }

  const existingReceipt = db.getReceiptById(id);
  if (!existingReceipt) {
    return res.status(404).json({ message: "Receipt not found." });
  }
  if (!ensureDateEditable(req, res, existingReceipt.date) || !ensureDateEditable(req, res, date)) {
    return;
  }

  const customerIdNum = Number(customerId);
  const numericAmount = Number(amount);
  const safeAttachmentUrl = String(attachmentUrl || "").trim();
  const safeAttachmentName = String(attachmentName || "").trim();
  if (!customerIdNum || Number.isNaN(customerIdNum)) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  if (Number.isNaN(numericAmount) || numericAmount === 0) {
    return res.status(400).json({ message: "Amount must be non-zero." });
  }

  const customer = db.getCustomerById(customerIdNum);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found." });
  }

  const updated = db.updateReceipt({
    id,
    customerId: customerIdNum,
    date,
    type,
    amount: numericAmount,
    senderName: senderName || customer.name,
    receiverName: receiverName || "",
    deliveryDate,
    details,
    attachmentUrl: safeAttachmentUrl,
    attachmentName: safeAttachmentName,
  });

  if (!updated) {
    return res.status(404).json({ message: "Receipt not found." });
  }
  writeAudit(req, "update", "receipt", id, {
    customerId: customerIdNum,
    type,
    senderName: senderName || customer.name,
    receiverName: receiverName || "",
    amount: numericAmount,
  });

  return res.json({ ok: true });
});

app.post("/api/receipts/transport-item", requireRole(["admin", "accountant"]), (req, res) => {
  const { customerId, date, amount, details, invoiceNo } = req.body || {};

  const customerIdNum = Number(customerId);
  const numericAmount = Number(amount);
  const invoiceNoNum = invoiceNo ? Number(invoiceNo) : undefined;

  if (!customerIdNum || !date || amount === undefined || amount === null) {
    return res.status(400).json({ message: "Missing transport item data." });
  }
  if (!ensureDateEditable(req, res, date)) {
    return;
  }
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }
  if (invoiceNo !== undefined && invoiceNo !== null && invoiceNo !== "" && (!invoiceNoNum || Number.isNaN(invoiceNoNum))) {
    return res.status(400).json({ message: "Invalid invoice number." });
  }

  const customer = db.getCustomerById(customerIdNum);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found." });
  }

  const safeDetails = details ? String(details).trim() : "";
  if (db.existsTransportItemDuplicate({ customerId: customerIdNum, date, amount: Math.abs(numericAmount), details: safeDetails })) {
    return res.status(409).json({ message: "Duplicate transport item already exists." });
  }

  try {
    const receipt = db.insertReceipt({
      customerId: customerIdNum,
      date,
      type: "النقل",
      amount: Math.abs(numericAmount),
      senderName: customer.name,
      receiverName: "",
      deliveryDate: "",
      details: safeDetails,
      invoiceNo: invoiceNoNum,
    });

    writeAudit(req, "create", "transport-item", receipt.id, {
      customerId: customerIdNum,
      customerName: customer.name,
      amount: Math.abs(numericAmount),
      date,
    });

    return res.status(201).json({ receipt });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add transport item." });
  }
});

app.get("/api/transfers", requireRole(["admin", "accountant", "viewer"]), (req, res) => {
  try {
    const customerId = req.query.customerId ? Number(req.query.customerId) : null;
    const rows = db.listTransfers(customerId);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch transfers.", error: err.message });
  }
});

app.post("/api/transfers", requireRole(["admin", "accountant"]), (req, res) => {
  const {
    senderCustomerId,
    receiverCustomerId,
    date,
    amount,
    exchangeRate,
    fee,
    currencyFrom,
    currencyTo,
  } = req.body || {};

  const senderId = Number(senderCustomerId);
  const receiverId = Number(receiverCustomerId);

  if (!senderId || !receiverId || !date) {
    return res.status(400).json({ message: "Missing transfer data." });
  }
  if (!ensureDateEditable(req, res, date)) {
    return;
  }
  if (senderId === receiverId) {
    return res.status(400).json({ message: "Sender and receiver cannot match." });
  }
  const numericAmount = Number(amount);
  const numericRate = Number(exchangeRate);
  const numericFee = Number(fee || 0);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }
  if (Number.isNaN(numericRate) || numericRate <= 0) {
    return res.status(400).json({ message: "Exchange rate must be greater than zero." });
  }
  if (Number.isNaN(numericFee) || numericFee < 0) {
    return res.status(400).json({ message: "Fee must be zero or greater." });
  }
  if (!currencyFrom || !currencyTo) {
    return res.status(400).json({ message: "Currencies are required." });
  }

  if (!req.body?.bypassDuplicateCheck) {
    const similar = db.findSimilarTransfer({
      senderId,
      receiverId,
      date,
      amount: numericAmount,
      exchangeRate: numericRate,
    });
    if (similar) {
      return res.status(409).json({
        code: "SIMILAR_TRANSFER",
        message: "تم العثور على تحويل مشابه مؤخراً. هل تريد المتابعة؟",
        similar,
      });
    }
  }

  try {
    const result = db.insertTransfer({
      senderId,
      receiverId,
      date,
      amount: numericAmount,
      exchangeRate: numericRate,
      fee: numericFee,
      currencyFrom: currencyFrom.trim(),
      currencyTo: currencyTo.trim(),
    });
    const sender = db.getCustomerById(senderId);
    const receiver = db.getCustomerById(receiverId);
    writeAudit(req, "create", "transfer", result.id, {
      senderId,
      receiverId,
      senderName: sender?.name || "",
      receiverName: receiver?.name || "",
      amount: numericAmount,
    });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Failed to save transfer." });
  }
});

app.put("/api/transfers/:id", requireRole(["admin", "accountant"]), (req, res) => {
  const id = Number(req.params.id);
  const {
    senderCustomerId,
    receiverCustomerId,
    date,
    amount,
    exchangeRate,
    fee,
    currencyFrom,
    currencyTo,
  } = req.body || {};

  const senderId = Number(senderCustomerId);
  const receiverId = Number(receiverCustomerId);

  if (!id || !senderId || !receiverId || !date) {
    return res.status(400).json({ message: "Missing transfer data." });
  }
  const existingTransferDate = db.getTransferDateById(id);
  if (!existingTransferDate) {
    return res.status(404).json({ message: "Transfer not found." });
  }
  if (!ensureDateEditable(req, res, existingTransferDate) || !ensureDateEditable(req, res, date)) {
    return;
  }
  if (senderId === receiverId) {
    return res.status(400).json({ message: "Sender and receiver cannot match." });
  }
  const numericAmount = Number(amount);
  const numericRate = Number(exchangeRate);
  const numericFee = Number(fee || 0);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }
  if (Number.isNaN(numericRate) || numericRate <= 0) {
    return res.status(400).json({ message: "Exchange rate must be greater than zero." });
  }
  if (Number.isNaN(numericFee) || numericFee < 0) {
    return res.status(400).json({ message: "Fee must be zero or greater." });
  }
  if (!currencyFrom || !currencyTo) {
    return res.status(400).json({ message: "Currencies are required." });
  }

  try {
    const updated = db.updateTransfer({
      id,
      senderId,
      receiverId,
      date,
      amount: numericAmount,
      exchangeRate: numericRate,
      fee: numericFee,
      currencyFrom: currencyFrom.trim(),
      currencyTo: currencyTo.trim(),
    });
    if (!updated) {
      return res.status(404).json({ message: "Transfer not found." });
    }
    const sender = db.getCustomerById(senderId);
    const receiver = db.getCustomerById(receiverId);
    writeAudit(req, "update", "transfer", id, {
      senderId,
      receiverId,
      senderName: sender?.name || "",
      receiverName: receiver?.name || "",
      amount: numericAmount,
    });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update transfer." });
  }
});

app.delete("/api/receipts/:id", requirePermission("delete_records"), (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid receipt id." });
  }
  const receipt = db.getReceiptById(id);
  if (!receipt) {
    return res.status(404).json({ message: "Receipt not found." });
  }
  if (!ensureDateEditable(req, res, receipt.date)) {
    return;
  }
  const removed = db.deleteReceipt(id);
  if (!removed) {
    return res.status(404).json({ message: "Receipt not found." });
  }
  writeAudit(req, "delete", "receipt", id, {
    senderName: receipt.sender_name || "",
    receiverName: receipt.receiver_name || "",
    amount: receipt.amount,
  });
  return res.json({ ok: true });
});

app.delete("/api/transfers/:id", requirePermission("delete_records"), (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid transfer id." });
  }
  const transfer = db.getTransferById(id);
  if (!transfer) {
    return res.status(404).json({ message: "Transfer not found." });
  }
  if (!ensureDateEditable(req, res, transfer.date)) {
    return;
  }
  const removed = db.deleteTransfer(id);
  if (!removed) {
    return res.status(404).json({ message: "Transfer not found." });
  }
  writeAudit(req, "delete", "transfer", id, {
    senderName: transfer.sender_name || "",
    receiverName: transfer.receiver_name || "",
    amount: transfer.amount,
  });
  return res.json({ ok: true });
});

app.get("/api/dashboard/summary", (req, res) => {
  res.json(db.getDashboardSummary());
});

app.get("/api/alerts/center", requirePermission("alerts_view"), (req, res) => {
  let backupsCount = 0;
  try {
    if (fs.existsSync(backupsDir)) {
      backupsCount = fs.readdirSync(backupsDir).filter((name) => name.endsWith(".json")).length;
    }
  } catch (err) {
    backupsCount = 0;
  }

  const negativeBalances = db.listNegativeBalances();
  const positiveBalances = db.listPositiveBalances();
  const locks = db.listLocks();
  const recentAudit = req.user?.permissions?.audit_view
    ? db.listAuditLogs({ limit: 10 })
    : [];

  const auditForSensitiveDetection = db.listAuditLogs({ limit: 200 });
  let sensitiveLargeDeletes = 0;
  const updateBurstByUser = new Map();
  const tenMinutesMs = 10 * 60 * 1000;
  const nowMs = Date.now();

  auditForSensitiveDetection.forEach((entry) => {
    const action = String(entry?.action || "").toLowerCase();
    let details = {};
    try {
      details = entry?.details ? JSON.parse(entry.details) : {};
    } catch (err) {
      details = {};
    }

    const amount = Math.abs(Number(details?.amount || 0));
    if (action === "delete" && amount >= 50000) {
      sensitiveLargeDeletes += 1;
    }

    const createdAtMs = new Date(entry?.created_at || "").getTime();
    if (!Number.isNaN(createdAtMs) && nowMs - createdAtMs <= tenMinutesMs && action === "update") {
      const userKey = String(entry?.username || "unknown");
      updateBurstByUser.set(userKey, (updateBurstByUser.get(userKey) || 0) + 1);
    }
  });

  const burstUsers = Array.from(updateBurstByUser.entries()).filter(([, count]) => count >= 5);
  const sensitiveCount = sensitiveLargeDeletes + burstUsers.length;

  const items = [];
  if (negativeBalances.length) {
    items.push({
      type: "negative-balance",
      level: "warn",
      title: "زبائن برصيد سالب",
      count: negativeBalances.length,
      payload: negativeBalances.slice(0, 5),
    });
  }
  if (locks.length) {
    items.push({
      type: "locks",
      level: locks.length > 3 ? "danger" : "warn",
      title: "تواريخ مقفلة",
      count: locks.length,
      payload: locks.slice(0, 5),
    });
  }
  if (backupsCount === 0) {
    items.push({
      type: "backups",
      level: "danger",
      title: "لا توجد نسخ احتياطية يومية",
      count: 0,
      payload: [],
    });
  }
  if (recentAudit.length) {
    items.push({
      type: "audit",
      level: "ok",
      title: "نشاط تدقيق حديث",
      count: recentAudit.length,
      payload: recentAudit.slice(0, 5),
    });
  }
  if (sensitiveCount > 0) {
    items.push({
      type: "sensitive-audit",
      level: sensitiveLargeDeletes > 0 || sensitiveCount > 3 ? "danger" : "warn",
      title: "عمليات حساسة في التدقيق",
      count: sensitiveCount,
      payload: {
        largeDeletes: sensitiveLargeDeletes,
        repeatedUpdateUsers: burstUsers.map(([username, count]) => ({ username, count })),
      },
    });
  }

  const totalCount = items.reduce((sum, item) => sum + Number(item.count || 0), 0);
  return res.json({
    totalCount,
    summary: {
      negativeBalances: negativeBalances.length,
      positiveBalances: positiveBalances.length,
      locks: locks.length,
      backupsCount,
    },
    items,
  });
});

app.get("/api/dashboard/collection-priority", (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  res.json(db.getCollectionPriority(limit));
});

app.get("/api/alerts/negative-balances", (req, res) => {
  res.json(db.listNegativeBalances());
});

app.get("/api/kpi/monthly", requirePermission("kpi_view"), (req, res) => {
  const month = String(req.query.month || "").trim();
  const baseMonth = /^\d{4}-\d{2}$/.test(month)
    ? month
    : new Date().toISOString().slice(0, 7);
  const [year, m] = baseMonth.split("-").map(Number);
  const prevDate = new Date(year, m - 2, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
  const current = db.getMonthlyKpis({ month: baseMonth });
  const previous = db.getMonthlyKpis({ month: prevMonth });
  return res.json({ current, previous });
});

app.get("/api/audit-logs", requirePermission("audit_view"), (req, res) => {
  const { username, action, entityType, detailsLike, from, to } = req.query || {};
  const limit = req.query.limit ? Number(req.query.limit) : 200;
  res.json(
    db.listAuditLogs({
      limit,
      username: username ? String(username).trim() : "",
      action: action ? String(action).trim() : "",
      entityType: entityType ? String(entityType).trim() : "",
      detailsLike: detailsLike ? String(detailsLike).trim() : "",
      from: from ? String(from).trim() : "",
      to: to ? String(to).trim() : "",
    })
  );
});

app.get("/api/reports/monthly-auto", requirePermission("export_reports"), (req, res) => {
  const month = String(req.query.month || "").trim();
  const safeMonth = /^\d{4}-\d{2}$/.test(month) ? month : new Date().toISOString().slice(0, 7);
  const from = `${safeMonth}-01`;
  const to = `${safeMonth}-31`;

  const kpi = db.getMonthlyKpis({ month: safeMonth });
  const sales = db.listSalesReport({ from, to, customerId: null });
  const perCustomerMap = new Map();
  (sales.rows || []).forEach((row) => {
    const key = row.customer_name || "غير معروف";
    perCustomerMap.set(key, (perCustomerMap.get(key) || 0) + Number(row.amount || 0));
  });

  const topCustomers = Array.from(perCustomerMap.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return res.json({
    month: safeMonth,
    from,
    to,
    kpi,
    salesSummary: sales.summary,
    topCustomers,
  });
});

app.get("/api/locks", requirePermission("locks_manage"), (req, res) => {
  res.json(db.listLocks());
});

app.get("/api/monthly-closes", requirePermission("monthly_close"), (req, res) => {
  return res.json(db.listMonthlyCloses());
});

app.post("/api/monthly-closes", requirePermission("monthly_close"), (req, res) => {
  const month = String(req.body?.month || "").trim();
  const reason = String(req.body?.reason || "").trim();
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ message: "Invalid month format. Use YYYY-MM." });
  }
  const exists = db.listMonthlyCloses().find((item) => item.month === month);
  if (exists) {
    return res.status(409).json({ message: "This month is already closed." });
  }
  const snapshot = db.createBackupSnapshot();
  const created = db.createMonthlyClose({
    month,
    reason,
    closedBy: req.user?.username || "unknown",
    snapshot,
  });
  writeAudit(req, "create", "monthly-close", created.id, { month, reason });
  return res.status(201).json(created);
});

app.delete("/api/monthly-closes/:id", requirePermission("monthly_override"), (req, res) => {
  const id = Number(req.params.id);
  const reason = String(req.query?.overrideReason || req.body?.overrideReason || "").trim();
  if (!id) {
    return res.status(400).json({ message: "Invalid monthly close id." });
  }
  if (!reason) {
    return res.status(400).json({ message: "overrideReason is required." });
  }
  const removed = db.deleteMonthlyClose(id);
  if (!removed) {
    return res.status(404).json({ message: "Monthly close not found." });
  }
  writeAudit(req, "delete", "monthly-close", id, { overrideReason: reason });
  return res.json({ ok: true });
});

app.post("/api/locks/daily", requirePermission("locks_manage"), (req, res) => {
  const date = String(req.body?.date || "").trim();
  const reason = String(req.body?.reason || "Daily lock").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
  }
  const created = db.createDailyLock({
    date,
    reason,
    lockedBy: req.user?.username || "unknown",
  });
  writeAudit(req, "create", "period-lock", created.id, { date, reason });
  return res.status(201).json(created);
});

app.delete("/api/locks/:id", requirePermission("locks_manage"), (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid lock id." });
  }
  const removed = db.removeLock(id);
  if (!removed) {
    return res.status(404).json({ message: "Lock not found." });
  }
  writeAudit(req, "delete", "period-lock", id, {});
  return res.json({ ok: true });
});

app.get("/api/ledger", (req, res) => {
  const customerId = Number(req.query.customerId);
  const { from, to } = req.query;
  if (!customerId) {
    return res.status(400).json({ message: "Customer id required." });
  }
  const data = db.getLedger({ customerId, from, to });
  const initialDate =
    from || db.getEarliestReceiptDate(customerId) || new Date().toISOString().slice(0, 10);
  data.entries.unshift({
    invoice_no: "-",
    date: initialDate,
    type: "رصيد افتتاحي",
    amount: db.getCustomerInitialBalance(customerId),
    sender_name: "-",
    receiver_name: "-",
    details: "رصيد افتتاحي",
    running_balance: data.previous_balance,
  });
  res.json(data);
});

app.get("/api/customers/:id/timeline", requirePermission("timeline_view"), (req, res) => {
  const customerId = Number(req.params.id);
  const limit = req.query.limit ? Number(req.query.limit) : 300;
  if (!customerId) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  if (!db.getCustomerById(customerId)) {
    return res.status(404).json({ message: "Customer not found." });
  }
  return res.json(db.getCustomerTimeline({ customerId, limit }));
});

app.get("/api/sales-report", (req, res) => {
  const { from, to, customerId } = req.query || {};
  const customerIdNum = customerId ? Number(customerId) : null;
  if (customerId && (!customerIdNum || Number.isNaN(customerIdNum))) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  const data = db.listSalesReport({
    from: from ? String(from).trim() : "",
    to: to ? String(to).trim() : "",
    customerId: customerIdNum,
  });
  return res.json(data);
});

app.get("/api/budget", (req, res) => {
  const { periodType, periodValue, customerId } = req.query || {};
  if (!periodType || !periodValue) {
    return res.status(400).json({ message: "Period type and value are required." });
  }
  const normalizedType = String(periodType).trim().toLowerCase();
  if (!["monthly", "yearly"].includes(normalizedType)) {
    return res.status(400).json({ message: "Invalid period type." });
  }
  const customerIdNum = customerId ? Number(customerId) : null;
  if (customerId && (!customerIdNum || Number.isNaN(customerIdNum))) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  const periodVal = String(periodValue).trim();
  const data = db.listBudget({
    periodType: normalizedType,
    periodValue: periodVal,
    customerId: customerIdNum,
  });
  let actuals = { income: 0, expense: 0, net: 0 };
  let actualsByCategory = {};
  const receiptTypeCategoryMap = {
    "قبض": "إيرادات",
    "دفع": "مصروفات",
    "مصروفات": "مصروفات",
    "سماح": "سماح/آجل",
    "ربح": "إيرادات",
    "فاتورة": "إيرادات",
  };

  if (normalizedType === "monthly") {
    if (/^\d{4}-\d{2}$/.test(periodVal)) {
      const start = `${periodVal}-01`;
      const end = `${periodVal}-31`;
      actuals = db.getBudgetActuals({ startDate: start, endDate: end, customerId: customerIdNum });
      actualsByCategory = db.getBudgetActualsByCategory({
        startDate: start,
        endDate: end,
        typeMap: receiptTypeCategoryMap,
        customerId: customerIdNum,
      });
    }
  } else if (/^\d{4}$/.test(periodVal)) {
    const start = `${periodVal}-01-01`;
    const end = `${periodVal}-12-31`;
    actuals = db.getBudgetActuals({ startDate: start, endDate: end, customerId: customerIdNum });
    actualsByCategory = db.getBudgetActualsByCategory({
      startDate: start,
      endDate: end,
      typeMap: receiptTypeCategoryMap,
      customerId: customerIdNum,
    });
  }

  return res.json({ ...data, actuals, actualsByCategory });
});

app.post("/api/budget", requireRole(["admin", "accountant"]), (req, res) => {
  const { periodType, periodValue, category, kind, amount, notes, customerId } = req.body || {};
  const normalizedType = String(periodType || "").trim().toLowerCase();
  const normalizedKind = String(kind || "").trim().toLowerCase();
  if (!periodValue || !category || !normalizedType || !normalizedKind) {
    return res.status(400).json({ message: "Missing budget data." });
  }
  if (!["monthly", "yearly"].includes(normalizedType)) {
    return res.status(400).json({ message: "Invalid period type." });
  }
  if (!["income", "expense"].includes(normalizedKind)) {
    return res.status(400).json({ message: "Invalid budget kind." });
  }
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }
  const customerIdNum = customerId ? Number(customerId) : null;
  if (customerId && (!customerIdNum || Number.isNaN(customerIdNum))) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  if (customerIdNum && !db.getCustomerById(customerIdNum)) {
    return res.status(404).json({ message: "Customer not found." });
  }

  const result = db.insertBudget({
    customerId: customerIdNum,
    periodType: normalizedType,
    periodValue: String(periodValue).trim(),
    category: String(category).trim(),
    kind: normalizedKind,
    amount: numericAmount,
    notes: notes ? String(notes).trim() : "",
  });
  writeAudit(req, "create", "budget", result.id, { category: String(category).trim(), amount: numericAmount });
  return res.status(201).json(result);
});

app.put("/api/budget/:id", requireRole(["admin", "accountant"]), (req, res) => {
  const id = Number(req.params.id);
  const { periodType, periodValue, category, kind, amount, notes, customerId } = req.body || {};
  if (!id) {
    return res.status(400).json({ message: "Invalid budget id." });
  }
  const normalizedType = String(periodType || "").trim().toLowerCase();
  const normalizedKind = String(kind || "").trim().toLowerCase();
  if (!periodValue || !category || !normalizedType || !normalizedKind) {
    return res.status(400).json({ message: "Missing budget data." });
  }
  if (!["monthly", "yearly"].includes(normalizedType)) {
    return res.status(400).json({ message: "Invalid period type." });
  }
  if (!["income", "expense"].includes(normalizedKind)) {
    return res.status(400).json({ message: "Invalid budget kind." });
  }
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero." });
  }
  const customerIdNum = customerId ? Number(customerId) : null;
  if (customerId && (!customerIdNum || Number.isNaN(customerIdNum))) {
    return res.status(400).json({ message: "Invalid customer id." });
  }
  if (customerIdNum && !db.getCustomerById(customerIdNum)) {
    return res.status(404).json({ message: "Customer not found." });
  }

  const updated = db.updateBudget({
    id,
    customerId: customerIdNum,
    periodType: normalizedType,
    periodValue: String(periodValue).trim(),
    category: String(category).trim(),
    kind: normalizedKind,
    amount: numericAmount,
    notes: notes ? String(notes).trim() : "",
  });
  if (!updated) {
    return res.status(404).json({ message: "Budget item not found." });
  }
  writeAudit(req, "update", "budget", id, { category: String(category).trim(), amount: numericAmount });
  return res.json({ ok: true });
});

app.delete("/api/budget/:id", requireRole(["admin"]), (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid budget id." });
  }
  const removed = db.deleteBudget(id);
  if (!removed) {
    return res.status(404).json({ message: "Budget item not found." });
  }
  writeAudit(req, "delete", "budget", id, {});
  return res.json({ ok: true });
});

app.post("/api/import/customers", requirePermission("import_data"), (req, res) => {
  const rows = Array.isArray(req.body?.rows) ? req.body.rows : [];
  if (!rows.length) {
    return res.status(400).json({ message: "No rows provided." });
  }
  const result = db.importCustomers(rows);
  writeAudit(req, "import", "customers", "bulk", { rows: rows.length, ...result });
  return res.json(result);
});

app.post("/api/import/receipts", requirePermission("import_data"), (req, res) => {
  const rows = Array.isArray(req.body?.rows) ? req.body.rows : [];
  const overrideReason = String(req.body?.overrideReason || "").trim();
  if (!rows.length) {
    return res.status(400).json({ message: "No rows provided." });
  }
  const hasClosedMonthRows = rows.some((row) => db.isMonthClosed(String(row?.date || "").trim()));
  if (hasClosedMonthRows && !(req.user?.permissions?.monthly_override && overrideReason)) {
    return res.status(409).json({
      message: "بعض الصفوف تقع ضمن شهر مغلق. يلزم overrideReason مع صلاحية admin.",
    });
  }
  const result = db.importReceipts(rows);
  writeAudit(req, "import", "receipts", "bulk", { rows: rows.length, overrideReason, ...result });
  return res.json(result);
});

app.get("/api/system/backup", requirePermission("backups_view"), (req, res) => {
  try {
    const snapshot = db.createBackupSnapshot();
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="masan-backup-${stamp}.json"`);
    return res.json(snapshot);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create backup." });
  }
});

app.get("/api/system/backups", requirePermission("backups_view"), (req, res) => {
  try {
    if (!fs.existsSync(backupsDir)) {
      return res.json([]);
    }
    const files = fs
      .readdirSync(backupsDir)
      .filter((name) => name.endsWith(".json"))
      .map((name) => {
        const fullPath = path.join(backupsDir, name);
        const stat = fs.statSync(fullPath);
        return {
          file: name,
          size: stat.size,
          mtime: stat.mtime.toISOString(),
        };
      })
      .sort((a, b) => (a.mtime < b.mtime ? 1 : -1));
    return res.json(files);
  } catch (err) {
    return res.status(500).json({ message: "Failed to list backups." });
  }
});

app.delete("/api/system/backups/:file", requirePermission("backups_restore"), (req, res) => {
  const fileName = path.basename(String(req.params.file || "").trim());
  if (!fileName || !fileName.endsWith(".json")) {
    return res.status(400).json({ message: "Invalid backup file name." });
  }

  const filePath = path.join(backupsDir, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Backup file not found." });
  }

  try {
    fs.unlinkSync(filePath);
    writeAudit(req, "delete", "backup-file", fileName, { file: fileName });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete backup file." });
  }
});

app.post("/api/system/restore", requirePermission("backups_restore"), (req, res) => {
  const snapshot = req.body;
  if (!snapshot || typeof snapshot !== "object") {
    return res.status(400).json({ message: "Backup payload is required." });
  }
  try {
    db.restoreBackupSnapshot(snapshot);
    writeAudit(req, "restore", "system", "backup", {});
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ message: err?.message || "Failed to restore backup." });
  }
});

app.post("/api/system/restore-file", requirePermission("backups_restore"), (req, res) => {
  const fileName = path.basename(String(req.body?.file || "").trim());
  if (!fileName || !fileName.endsWith(".json")) {
    return res.status(400).json({ message: "Invalid backup file name." });
  }
  const filePath = path.join(backupsDir, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Backup file not found." });
  }

  try {
    const text = fs.readFileSync(filePath, "utf-8");
    const snapshot = JSON.parse(text);
    db.restoreBackupSnapshot(snapshot);
    writeAudit(req, "restore", "system", "backup-file", { file: fileName });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ message: err?.message || "Failed to restore backup file." });
  }
});

const backupsDir = path.join(__dirname, "backups");
const ensureDailyBackup = () => {
  try {
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
    }
    const day = new Date().toISOString().slice(0, 10);
    const filePath = path.join(backupsDir, `masan-auto-${day}.json`);
    if (!fs.existsSync(filePath)) {
      const snapshot = db.createBackupSnapshot();
      fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2), "utf-8");
    }
  } catch (err) {
    // Ignore backup scheduler errors.
  }
};

ensureDailyBackup();
setInterval(ensureDailyBackup, 60 * 60 * 1000);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});
app.listen(PORT, '0.0.0.0', () => {
  // ...existing code...
// منع إضافة أي بند جديد يحمل رقم الفاتورة 1234568 نهائياً
const FORBIDDEN_INVOICE = 1234568;

// دالة وسيطة تمنع الإدخال
function forbidInvoiceMiddleware(req, res, next) {
  const invoiceNo = req.body?.invoice_no || req.body?.invoiceNo || req.body?.invoice;
  if (Number(invoiceNo) === FORBIDDEN_INVOICE) {
    return res.status(400).json({ message: "إدخال هذا الرقم للفواتير ممنوع نهائياً." });
  }
  next();
}

// تطبيق المنع على كل مسارات إضافة أو تعديل الإيصالات
app.post("/api/receipts", forbidInvoiceMiddleware);
app.put("/api/receipts/:id", forbidInvoiceMiddleware);
});