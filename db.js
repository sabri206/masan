const path = require("path");
const Database = require("better-sqlite3");

const dbPath = process.env.DB_PATH || path.join(__dirname, "data.sqlite");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_norm TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    initial_balance REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS receipts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_no INTEGER UNIQUE NOT NULL,
    customer_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    sender_name TEXT NOT NULL,
    receiver_name TEXT,
    delivery_date TEXT,
    details TEXT,
    attachment_url TEXT,
    attachment_name TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transfer_no INTEGER UNIQUE NOT NULL,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    amount REAL NOT NULL,
    exchange_rate REAL NOT NULL,
    fee REAL NOT NULL,
    converted_amount REAL NOT NULL DEFAULT 0,
    currency_from TEXT NOT NULL,
    currency_to TEXT NOT NULL,
    sender_receipt_id INTEGER NOT NULL,
    receiver_receipt_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES customers(id),
    FOREIGN KEY (receiver_id) REFERENCES customers(id),
    FOREIGN KEY (sender_receipt_id) REFERENCES receipts(id),
    FOREIGN KEY (receiver_receipt_id) REFERENCES receipts(id)
  );

  CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    period_type TEXT NOT NULL,
    period_value TEXT NOT NULL,
    category TEXT NOT NULL,
    kind TEXT NOT NULL,
    amount REAL NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE INDEX IF NOT EXISTS idx_budgets_period ON budgets (period_type, period_value);

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at);

  CREATE TABLE IF NOT EXISTS period_locks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_from TEXT NOT NULL,
    date_to TEXT NOT NULL,
    reason TEXT,
    locked_by TEXT,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_period_locks_range ON period_locks (date_from, date_to);

  CREATE TABLE IF NOT EXISTS monthly_closes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month TEXT UNIQUE NOT NULL,
    reason TEXT,
    closed_by TEXT,
    snapshot_json TEXT,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_monthly_closes_month ON monthly_closes (month);

  CREATE TABLE IF NOT EXISTS rmb_expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    invoice_no TEXT,
    date TEXT NOT NULL,
    amount REAL NOT NULL,
    exchange_rate REAL,
    details TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE INDEX IF NOT EXISTS idx_rmb_expenses_date ON rmb_expenses (date);

  CREATE TABLE IF NOT EXISTS user_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    permissions_json TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_user_accounts_username ON user_accounts (username);
`);

const ensureInitialBalanceColumn = () => {
  const columns = db.prepare("PRAGMA table_info(customers)").all();
  const hasInitial = columns.some((col) => col.name === "initial_balance");
  if (!hasInitial) {
    db.exec("ALTER TABLE customers ADD COLUMN initial_balance REAL NOT NULL DEFAULT 0");
  }
};

const ensureTransferColumns = () => {
  const columns = db.prepare("PRAGMA table_info(transfers)").all();
  const hasConverted = columns.some((col) => col.name === "converted_amount");
  if (!hasConverted) {
    db.exec("ALTER TABLE transfers ADD COLUMN converted_amount REAL NOT NULL DEFAULT 0");
  }
};

const ensureBudgetCustomerColumn = () => {
  const columns = db.prepare("PRAGMA table_info(budgets)").all();
  const hasCustomerId = columns.some((col) => col.name === "customer_id");
  if (!hasCustomerId) {
    db.exec("ALTER TABLE budgets ADD COLUMN customer_id INTEGER");
  }
  db.exec("CREATE INDEX IF NOT EXISTS idx_budgets_customer ON budgets (customer_id)");
};

const ensureRmbExpenseColumns = () => {
  const columns = db.prepare("PRAGMA table_info(rmb_expenses)").all();
  const hasExchangeRate = columns.some((col) => col.name === "exchange_rate");
  if (!hasExchangeRate) {
    db.exec("ALTER TABLE rmb_expenses ADD COLUMN exchange_rate REAL");
  }
};

const ensureReceiptAttachmentColumns = () => {
  const columns = db.prepare("PRAGMA table_info(receipts)").all();
  const hasAttachmentUrl = columns.some((col) => col.name === "attachment_url");
  const hasAttachmentName = columns.some((col) => col.name === "attachment_name");
  if (!hasAttachmentUrl) {
    db.exec("ALTER TABLE receipts ADD COLUMN attachment_url TEXT");
  }
  if (!hasAttachmentName) {
    db.exec("ALTER TABLE receipts ADD COLUMN attachment_name TEXT");
  }
};

const ensureReceiptTypeNames = () => {
  const mappings = [
    { from: "وصل قبض", to: "قبض" },
    { from: "ام نقدا", to: "قبض" },
    { from: "من والى", to: "فاتورة" },
    { from: "سماح", to: "سماح" },
    { from: "بند النقل", to: "النقل" },
  ];
  mappings.forEach((mapping) => {
    db.prepare("UPDATE receipts SET type = ? WHERE type = ?").run(mapping.to, mapping.from);
  });
};

const ensureBudgetCategoryNames = () => {
  const mappings = [
    { from: "مبيعات", to: "إيرادات" },
    { from: "تحويلات", to: "حوالات" },
    { from: "سماح", to: "سماح/آجل" },
  ];
  mappings.forEach((mapping) => {
    db.prepare("UPDATE budgets SET category = ? WHERE category = ?").run(mapping.to, mapping.from);
  });
};

const ensureTransportItemsPositive = () => {
  db.prepare("UPDATE receipts SET amount = ABS(amount) WHERE type IN (?, ?) AND amount < 0").run("بند النقل", "النقل");
};

ensureInitialBalanceColumn();
ensureTransferColumns();
ensureBudgetCustomerColumn();
ensureRmbExpenseColumns();
ensureReceiptAttachmentColumns();
ensureReceiptTypeNames();
ensureBudgetCategoryNames();
ensureTransportItemsPositive();

const nowIso = () => new Date().toISOString();
const normalizeName = (name) => name.trim().toLowerCase();

const getNextCustomerCode = () => {
  const row = db.prepare("SELECT MAX(code) AS max_code FROM customers").get();
  const next = (row?.max_code || 1610999) + 1;
  return next;
};

const getNextInvoiceNo = () => {
  const row = db.prepare("SELECT MAX(invoice_no) AS max_no FROM receipts").get();
  return (row?.max_no || 0) + 1;
};

const listCustomers = () => {
  return db
    .prepare(
      `SELECT c.id,
              c.code,
              c.name,
              c.phone,
              c.address,
              c.initial_balance,
              c.created_at,
              COALESCE(SUM(r.amount), 0) AS receipts_sum,
              (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
       FROM customers c
       LEFT JOIN receipts r ON r.customer_id = c.id
       GROUP BY c.id
       ORDER BY c.name ASC`
    )
    .all();
};

const getCustomerById = (id) => {
  return db
    .prepare(
      "SELECT id, code, name, phone, address, initial_balance, created_at FROM customers WHERE id = ?"
    )
    .get(id);
};

const getCustomerByCode = (code) => {
  return db
    .prepare(
      "SELECT id, code, name, phone, address, initial_balance, created_at FROM customers WHERE code = ?"
    )
    .get(code);
};

const insertCustomer = ({ name, phone, address, initialBalance }) => {
  const stmt = db.prepare(
    "INSERT INTO customers (code, name, name_norm, phone, address, initial_balance, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const code = getNextCustomerCode();
  const nameNorm = normalizeName(name);
  const info = stmt.run(
    code,
    name.trim(),
    nameNorm,
    phone || "",
    address || "",
    Number(initialBalance) || 0,
    nowIso()
  );
  return { id: info.lastInsertRowid, code };
};

const updateCustomer = ({ id, name, phone, address, initialBalance }) => {
  const stmt = db.prepare(
    "UPDATE customers SET name = ?, name_norm = ?, phone = ?, address = ?, initial_balance = ? WHERE id = ?"
  );
  const info = stmt.run(
    name.trim(),
    normalizeName(name),
    phone || "",
    address || "",
    Number(initialBalance) || 0,
    id
  );
  return info.changes > 0;
};

const deleteCustomer = (id) => {
  db.prepare("DELETE FROM receipts WHERE customer_id = ?").run(id);
  const info = db.prepare("DELETE FROM customers WHERE id = ?").run(id);
  return info.changes > 0;
};

const findCustomerByNameNorm = (nameNorm, excludeId) => {
  if (excludeId) {
    return db
      .prepare("SELECT id FROM customers WHERE name_norm = ? AND id != ?")
      .get(nameNorm, excludeId);
  }
  return db.prepare("SELECT id FROM customers WHERE name_norm = ?").get(nameNorm);
};

const listReceiptsByCustomer = (customerId) => {
  return db
    .prepare(
      "SELECT id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at FROM receipts WHERE customer_id = ? ORDER BY date ASC, id ASC"
    )
    .all(customerId);
};

const getReceiptById = (id) => {
  return db
    .prepare(
      "SELECT id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at FROM receipts WHERE id = ?"
    )
    .get(id);
};

const getEarliestReceiptDate = (customerId) => {
  const row = db
    .prepare("SELECT MIN(date) AS min_date FROM receipts WHERE customer_id = ?")
    .get(customerId);
  return row?.min_date || "";
};

const getCustomerInitialBalance = (customerId) => {
  const row = db
    .prepare("SELECT initial_balance FROM customers WHERE id = ?")
    .get(customerId);
  return Number(row?.initial_balance || 0);
};

const insertReceipt = ({
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
  invoiceNo,
}) => {
  const stmt = db.prepare(
    "INSERT INTO receipts (invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const finalInvoiceNo = invoiceNo || getNextInvoiceNo();
  const info = stmt.run(
    finalInvoiceNo,
    customerId,
    date,
    type,
    amount,
    senderName,
    receiverName || "",
    deliveryDate || "",
    details || "",
    attachmentUrl || "",
    attachmentName || "",
    nowIso()
  );
  return { id: info.lastInsertRowid, invoiceNo: finalInvoiceNo };
};

const deleteReceipt = (id) => {
  const run = db.transaction(() => {
    const current = db
      .prepare(
        "SELECT id, customer_id, date, type, amount, sender_name, receiver_name FROM receipts WHERE id = ?"
      )
      .get(id);
    if (!current) {
      return false;
    }

    const transfer = db
      .prepare(
        "SELECT id, sender_receipt_id, receiver_receipt_id FROM transfers WHERE sender_receipt_id = ? OR receiver_receipt_id = ?"
      )
      .get(id, id);

    if (transfer) {
      db.prepare("DELETE FROM transfers WHERE id = ?").run(transfer.id);
      db.prepare("DELETE FROM receipts WHERE id = ?").run(transfer.sender_receipt_id);
      db.prepare("DELETE FROM receipts WHERE id = ?").run(transfer.receiver_receipt_id);
      return true;
    }

    const isPairedReceipt =
      String(current.type || "").trim() === "قبض" &&
      String(current.sender_name || "").trim() &&
      String(current.receiver_name || "").trim();

    if (isPairedReceipt) {
      const counterpart = db
        .prepare(
          `SELECT id
           FROM receipts
           WHERE id != ?
             AND date = ?
             AND type = ?
             AND sender_name = ?
             AND receiver_name = ?
             AND ABS(amount) = ABS(?)
             AND amount = -?
           ORDER BY id ASC
           LIMIT 1`
        )
        .get(
          current.id,
          current.date,
          current.type,
          current.sender_name,
          current.receiver_name,
          Number(current.amount || 0),
          Number(current.amount || 0)
        );

      if (counterpart?.id) {
        db.prepare("DELETE FROM receipts WHERE id = ?").run(counterpart.id);
      }
    }

    const info = db.prepare("DELETE FROM receipts WHERE id = ?").run(id);
    return info.changes > 0;
  });

  return run();
};

const updateReceipt = ({
  id,
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
}) => {
  const info = db
    .prepare(
      "UPDATE receipts SET customer_id = ?, date = ?, type = ?, amount = ?, sender_name = ?, receiver_name = ?, delivery_date = ?, details = ?, attachment_url = ?, attachment_name = ? WHERE id = ?"
    )
    .run(
      customerId,
      date,
      type,
      amount,
      senderName || "",
      receiverName || "",
      deliveryDate || "",
      details || "",
      attachmentUrl || "",
      attachmentName || "",
      id
    );
  return info.changes > 0;
};

const listTransfers = (customerId) => {
  if (customerId) {
    return db
      .prepare(
        `SELECT t.id,
                t.transfer_no,
                t.sender_id,
                t.receiver_id,
                t.date,
                t.amount,
                t.exchange_rate,
                t.fee,
                t.converted_amount,
                t.currency_from,
                t.currency_to,
                s.name AS sender_name,
                r.name AS receiver_name
         FROM transfers t
         JOIN customers s ON s.id = t.sender_id
         JOIN customers r ON r.id = t.receiver_id
         WHERE t.sender_id = ? OR t.receiver_id = ?
         ORDER BY t.date ASC, t.id ASC`
      )
      .all(customerId, customerId);
  }

  return db
    .prepare(
      `SELECT t.id,
              t.transfer_no,
              t.sender_id,
              t.receiver_id,
              t.date,
              t.amount,
              t.exchange_rate,
              t.fee,
              t.converted_amount,
              t.currency_from,
              t.currency_to,
              s.name AS sender_name,
              r.name AS receiver_name
       FROM transfers t
       JOIN customers s ON s.id = t.sender_id
       JOIN customers r ON r.id = t.receiver_id
       ORDER BY t.date ASC, t.id ASC`
    )
    .all();
};

const listTransfersByCurrencyFrom = (currencyFrom = "رممبي") => {
  const normalized = String(currencyFrom || "").trim().toLowerCase();
  return db
    .prepare(
      `SELECT t.id,
              t.transfer_no,
              t.sender_id,
              t.receiver_id,
              t.date,
              t.amount,
              t.exchange_rate,
              t.converted_amount,
              t.currency_from,
              t.currency_to,
              s.name AS sender_name,
              r.name AS receiver_name
       FROM transfers t
       JOIN customers s ON s.id = t.sender_id
       JOIN customers r ON r.id = t.receiver_id
       WHERE LOWER(t.currency_from) = ?
       ORDER BY t.date ASC, t.id ASC`
    )
    .all(normalized);
};

const getTransferById = (id) => {
  return db
    .prepare(
      `SELECT t.id,
              t.transfer_no,
              t.sender_id,
              t.receiver_id,
              t.date,
              t.amount,
              t.exchange_rate,
              t.fee,
              t.converted_amount,
              t.currency_from,
              t.currency_to,
              t.sender_receipt_id,
              t.receiver_receipt_id,
              s.name AS sender_name,
              r.name AS receiver_name
       FROM transfers t
       JOIN customers s ON s.id = t.sender_id
       JOIN customers r ON r.id = t.receiver_id
       WHERE t.id = ?`
    )
    .get(id);
};

const getTransferDateById = (id) => {
  const row = db.prepare("SELECT date FROM transfers WHERE id = ?").get(id);
  return row?.date || "";
};

const findSimilarReceipt = ({ customerId, date, type, amount, excludeId }) => {
  const safeAmount = Math.abs(Number(amount) || 0);
  if (!safeAmount || !customerId || !date || !type) return null;
  const tolerance = Math.max(1, safeAmount * 0.01);
  if (excludeId) {
    return db
      .prepare(
        `SELECT id, invoice_no, date, amount, type, sender_name, receiver_name
         FROM receipts
         WHERE customer_id = ?
           AND type = ?
           AND id != ?
           AND date BETWEEN date(?, '-3 day') AND date(?, '+3 day')
           AND ABS(ABS(amount) - ?) <= ?
         ORDER BY date DESC, id DESC
         LIMIT 1`
      )
      .get(customerId, type, excludeId, date, date, safeAmount, tolerance);
  }
  return db
    .prepare(
      `SELECT id, invoice_no, date, amount, type, sender_name, receiver_name
       FROM receipts
       WHERE customer_id = ?
         AND type = ?
         AND date BETWEEN date(?, '-3 day') AND date(?, '+3 day')
         AND ABS(ABS(amount) - ?) <= ?
       ORDER BY date DESC, id DESC
       LIMIT 1`
    )
    .get(customerId, type, date, date, safeAmount, tolerance);
};

const findSimilarTransfer = ({ senderId, receiverId, date, amount, exchangeRate, excludeId }) => {
  const safeAmount = Number(amount) || 0;
  if (!safeAmount || !senderId || !receiverId || !date) return null;
  const tolerance = Math.max(1, Math.abs(safeAmount) * 0.01);
  const rateTolerance = Math.max(0.0001, Math.abs(Number(exchangeRate) || 0) * 0.02);
  if (excludeId) {
    return db
      .prepare(
        `SELECT id, transfer_no, date, amount, exchange_rate, sender_id, receiver_id
         FROM transfers
         WHERE sender_id = ?
           AND receiver_id = ?
           AND id != ?
           AND date BETWEEN date(?, '-3 day') AND date(?, '+3 day')
           AND ABS(amount - ?) <= ?
           AND ABS(exchange_rate - ?) <= ?
         ORDER BY date DESC, id DESC
         LIMIT 1`
      )
      .get(senderId, receiverId, excludeId, date, date, safeAmount, tolerance, Number(exchangeRate) || 0, rateTolerance);
  }
  return db
    .prepare(
      `SELECT id, transfer_no, date, amount, exchange_rate, sender_id, receiver_id
       FROM transfers
       WHERE sender_id = ?
         AND receiver_id = ?
         AND date BETWEEN date(?, '-3 day') AND date(?, '+3 day')
         AND ABS(amount - ?) <= ?
         AND ABS(exchange_rate - ?) <= ?
       ORDER BY date DESC, id DESC
       LIMIT 1`
    )
    .get(senderId, receiverId, date, date, safeAmount, tolerance, Number(exchangeRate) || 0, rateTolerance);
};

const listRmbLedger = (currencyTo = "يوان") => {
  const normalized = String(currencyTo || "").trim().toLowerCase();
  return db
    .prepare(
            `SELECT t.id,
              t.transfer_no,
              t.date,
              t.amount,
              t.exchange_rate,
              t.converted_amount,
              t.currency_to,
              s.name AS sender_name,
              r.name AS receiver_name
       FROM transfers t
       JOIN customers s ON s.id = t.sender_id
       JOIN customers r ON r.id = t.receiver_id
       WHERE LOWER(t.currency_to) = ?
       ORDER BY t.date ASC, t.id ASC`
    )
    .all(normalized);
};

const listRmbExpenses = ({ from = "", to = "" } = {}) => {
  const clauses = [];
  const params = [];
  if (from) {
    clauses.push("e.date >= ?");
    params.push(from);
  }
  if (to) {
    clauses.push("e.date <= ?");
    params.push(to);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db
    .prepare(
      `SELECT e.id,
              e.customer_id,
              e.invoice_no,
              e.date,
              e.amount,
              e.exchange_rate,
              e.details,
              e.created_at,
              c.name AS customer_name
       FROM rmb_expenses e
       LEFT JOIN customers c ON c.id = e.customer_id
       ${where}
       ORDER BY e.date ASC, e.id ASC`
    )
    .all(...params);
};

const insertRmbExpense = ({ customerId, invoiceNo, date, amount, exchangeRate, details }) => {
  const info = db
    .prepare(
      "INSERT INTO rmb_expenses (customer_id, invoice_no, date, amount, exchange_rate, details, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      customerId || null,
      invoiceNo || "",
      date,
      Number(amount || 0),
      Number(exchangeRate || 0) > 0 ? Number(exchangeRate) : null,
      details || "",
      nowIso()
    );
  return { id: info.lastInsertRowid };
};

const deleteRmbExpensesByInvoiceNo = (invoiceNo) => {
  const normalized = String(invoiceNo || "").trim();
  if (!normalized) return 0;
  const legacyNeedle = `لفاتورة ${normalized}`;
  const info = db
    .prepare(
      "DELETE FROM rmb_expenses WHERE TRIM(COALESCE(invoice_no, '')) = ? OR INSTR(COALESCE(details, ''), ?) > 0"
    )
    .run(normalized, legacyNeedle);
  return Number(info?.changes || 0);
};

const deleteRmbExpenseById = (id) => {
  const info = db.prepare("DELETE FROM rmb_expenses WHERE id = ?").run(Number(id || 0));
  return Number(info?.changes || 0);
};

const insertTransfer = ({
  senderId,
  receiverId,
  date,
  amount,
  exchangeRate,
  fee,
  currencyFrom,
  currencyTo,
}) => {
  const sender = getCustomerById(senderId);
  const receiver = getCustomerById(receiverId);
  if (!sender || !receiver) {
    throw new Error("Sender or receiver not found.");
  }

  const numericAmount = Number(amount);
  const numericRate = Number(exchangeRate);
  const numericFee = Number(fee);
  const fromLower = String(currencyFrom || "").trim().toLowerCase();
  const convertedAmount = fromLower.includes("رممبي")
    ? numericAmount / numericRate
    : numericAmount * numericRate;
  const transferNo = getNextInvoiceNo();
  const receiptDetails = String(currencyFrom || "").trim().includes("رممبي")
    ? `رممبي ${numericAmount} -> ${currencyTo} | سعر صرف ${numericRate}`
    : `تحويل ${currencyFrom} -<${currencyTo} /سعر صرف ${numericRate}`;

  const run = db.transaction(() => {
    const senderReceipt = insertReceipt({
      customerId: senderId,
      date,
      type: "تحويل",
      amount: -(numericAmount + numericFee),
      senderName: sender.name,
      receiverName: receiver.name,
      deliveryDate: "",
      details: receiptDetails,
      invoiceNo: transferNo,
    });

    const receiverReceipt = insertReceipt({
      customerId: receiverId,
      date,
      type: "تحويل",
      amount: convertedAmount,
      senderName: sender.name,
      receiverName: receiver.name,
      deliveryDate: "",
      details: receiptDetails,
      invoiceNo: transferNo + 1,
    });

    const info = db
      .prepare(
        "INSERT INTO transfers (transfer_no, sender_id, receiver_id, date, amount, exchange_rate, fee, converted_amount, currency_from, currency_to, sender_receipt_id, receiver_receipt_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .run(
        transferNo,
        senderId,
        receiverId,
        date,
        numericAmount,
        numericRate,
        numericFee,
        convertedAmount,
        currencyFrom,
        currencyTo,
        senderReceipt.id,
        receiverReceipt.id,
        nowIso()
      );

    return { id: info.lastInsertRowid, transferNo };
  });

  return run();
};

const updateTransfer = ({
  id,
  senderId,
  receiverId,
  date,
  amount,
  exchangeRate,
  fee,
  currencyFrom,
  currencyTo,
}) => {
  const transfer = getTransferById(id);
  if (!transfer) {
    return false;
  }

  const sender = getCustomerById(senderId);
  const receiver = getCustomerById(receiverId);
  if (!sender || !receiver) {
    throw new Error("Sender or receiver not found.");
  }

  const numericAmount = Number(amount);
  const numericRate = Number(exchangeRate);
  const numericFee = Number(fee);
  const fromLower = String(currencyFrom || "").trim().toLowerCase();
  const convertedAmount = fromLower.includes("رممبي")
    ? numericAmount / numericRate
    : numericAmount * numericRate;
  const receiptDetails = String(currencyFrom || "").trim().includes("رممبي")
    ? `رممبي ${numericAmount} -> ${currencyTo} | سعر صرف ${numericRate}`
    : `تحويل ${currencyFrom} -<${currencyTo} /سعر صرف ${numericRate}`;

  const run = db.transaction(() => {
    db.prepare(
      "UPDATE receipts SET customer_id = ?, date = ?, type = ?, amount = ?, sender_name = ?, receiver_name = ?, details = ? WHERE id = ?"
    ).run(
      senderId,
      date,
      "تحويل",
      -(numericAmount + numericFee),
      sender.name,
      receiver.name,
      receiptDetails,
      transfer.sender_receipt_id
    );

    db.prepare(
      "UPDATE receipts SET customer_id = ?, date = ?, type = ?, amount = ?, sender_name = ?, receiver_name = ?, details = ? WHERE id = ?"
    ).run(
      receiverId,
      date,
      "تحويل",
      convertedAmount,
      sender.name,
      receiver.name,
      receiptDetails,
      transfer.receiver_receipt_id
    );

    const info = db
      .prepare(
        "UPDATE transfers SET sender_id = ?, receiver_id = ?, date = ?, amount = ?, exchange_rate = ?, fee = ?, converted_amount = ?, currency_from = ?, currency_to = ? WHERE id = ?"
      )
      .run(
        senderId,
        receiverId,
        date,
        numericAmount,
        numericRate,
        numericFee,
        convertedAmount,
        currencyFrom,
        currencyTo,
        id
      );

    return info.changes > 0;
  });

  return run();
};

const deleteTransfer = (id) => {
  const transfer = db
    .prepare(
      "SELECT sender_receipt_id, receiver_receipt_id FROM transfers WHERE id = ?"
    )
    .get(id);
  if (!transfer) return false;

  const run = db.transaction(() => {
    const info = db.prepare("DELETE FROM transfers WHERE id = ?").run(id);
    db.prepare("DELETE FROM receipts WHERE id = ?").run(transfer.sender_receipt_id);
    db.prepare("DELETE FROM receipts WHERE id = ?").run(transfer.receiver_receipt_id);
    return info.changes > 0;
  });

  return run();
};

const listBudget = ({ periodType, periodValue, customerId }) => {
  const rows = db
    .prepare(
      `SELECT b.id,
              b.customer_id,
              c.name AS customer_name,
              b.period_type,
              b.period_value,
              b.category,
              b.kind,
              b.amount,
              b.notes,
              b.created_at
       FROM budgets b
       LEFT JOIN customers c ON c.id = b.customer_id
       WHERE b.period_type = ?
         AND b.period_value = ?
         AND ((? IS NULL AND b.customer_id IS NULL) OR b.customer_id = ?)
       ORDER BY b.kind ASC, b.category ASC, b.id ASC`
    )
    .all(periodType, periodValue, customerId, customerId);

  const totals = rows.reduce(
    (acc, row) => {
      if (row.kind === "income") {
        acc.income += Number(row.amount) || 0;
      } else if (row.kind === "expense") {
        acc.expense += Number(row.amount) || 0;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  totals.net = totals.income - totals.expense;

  return { rows, totals };
};

const getBudgetActuals = ({ startDate, endDate, customerId }) => {
  const row = db
    .prepare(
      `SELECT
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS income,
        COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS expense
       FROM receipts
       WHERE date >= ? AND date <= ?
         AND (? IS NULL OR customer_id = ?)
         AND type != 'تحويل'`
    )
    .get(startDate, endDate, customerId, customerId);

  const income = Number(row?.income || 0);
  const expense = Number(row?.expense || 0);
  return { income, expense, net: income - expense };
};

const getBudgetActualsByCategory = ({ startDate, endDate, typeMap, customerId }) => {
  const rows = db
    .prepare(
      `SELECT type,
              COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS income,
              COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS expense
       FROM receipts
       WHERE date >= ? AND date <= ?
         AND (? IS NULL OR customer_id = ?)
         AND type != 'تحويل'
       GROUP BY type`
    )
    .all(startDate, endDate, customerId, customerId);

  const byCategory = {};
  rows.forEach((row) => {
    const mapped = typeMap?.[row.type] || row.type || "غير محدد";
    if (!byCategory[mapped]) {
      byCategory[mapped] = { income: 0, expense: 0, net: 0 };
    }
    byCategory[mapped].income += Number(row.income || 0);
    byCategory[mapped].expense += Number(row.expense || 0);
    byCategory[mapped].net = byCategory[mapped].income - byCategory[mapped].expense;
  });

  return byCategory;
};

const insertBudget = ({ customerId, periodType, periodValue, category, kind, amount, notes }) => {
  const stmt = db.prepare(
    "INSERT INTO budgets (customer_id, period_type, period_value, category, kind, amount, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const info = stmt.run(
    customerId || null,
    periodType,
    periodValue,
    category.trim(),
    kind,
    Number(amount),
    notes || "",
    nowIso()
  );
  return { id: info.lastInsertRowid };
};

const updateBudget = ({ id, customerId, periodType, periodValue, category, kind, amount, notes }) => {
  const stmt = db.prepare(
    "UPDATE budgets SET customer_id = ?, period_type = ?, period_value = ?, category = ?, kind = ?, amount = ?, notes = ? WHERE id = ?"
  );
  const info = stmt.run(
    customerId || null,
    periodType,
    periodValue,
    category.trim(),
    kind,
    Number(amount),
    notes || "",
    id
  );
  return info.changes > 0;
};

const deleteBudget = (id) => {
  const info = db.prepare("DELETE FROM budgets WHERE id = ?").run(id);
  return info.changes > 0;
};

const logAudit = ({ username, role, action, entityType, entityId, details }) => {
  const info = db
    .prepare(
      "INSERT INTO audit_logs (username, role, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      username || "unknown",
      role || "unknown",
      action,
      entityType,
      entityId !== undefined && entityId !== null ? String(entityId) : "",
      details ? JSON.stringify(details) : "",
      nowIso()
    );
  return { id: info.lastInsertRowid };
};

const listAuditLogs = (options = {}) => {
  if (typeof options === "number") {
    options = { limit: options };
  }

  const normalizeDateOnly = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const normalized = raw.replaceAll("/", "-");
    return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : "";
  };

  const limit = Math.max(1, Math.min(Number(options.limit) || 200, 1000));
  const conditions = [];
  const params = [];

  if (options.username) {
    conditions.push("LOWER(username) LIKE ?");
    params.push(`%${String(options.username).trim().toLowerCase()}%`);
  }
  if (options.action) {
    conditions.push("action = ?");
    params.push(String(options.action).trim());
  }
  if (options.entityType) {
    conditions.push("entity_type = ?");
    params.push(String(options.entityType).trim());
  }
  if (options.detailsLike) {
    conditions.push("LOWER(details) LIKE ?");
    params.push(`%${String(options.detailsLike).trim().toLowerCase()}%`);
  }
  const fromDate = normalizeDateOnly(options.from);
  const toDate = normalizeDateOnly(options.to);
  if (fromDate) {
    conditions.push("SUBSTR(created_at, 1, 10) >= ?");
    params.push(fromDate);
  }
  if (toDate) {
    conditions.push("SUBSTR(created_at, 1, 10) <= ?");
    params.push(toDate);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return db
    .prepare(
      `SELECT id, username, role, action, entity_type, entity_id, details, created_at
       FROM audit_logs
       ${where}
       ORDER BY id DESC
       LIMIT ?`
    )
    .all(...params, limit);
};

const listLocks = () => {
  return db
    .prepare(
      `SELECT id, date_from, date_to, reason, locked_by, created_at
       FROM period_locks
       ORDER BY id DESC`
    )
    .all();
};

const createDailyLock = ({ date, lockedBy, reason }) => {
  const lockDate = String(date || "").trim();
  const info = db
    .prepare(
      `INSERT INTO period_locks (date_from, date_to, reason, locked_by, created_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(lockDate, lockDate, String(reason || "").trim(), String(lockedBy || "").trim(), nowIso());
  return { id: info.lastInsertRowid };
};

const removeLock = (id) => {
  const info = db.prepare("DELETE FROM period_locks WHERE id = ?").run(id);
  return info.changes > 0;
};

const isDateLocked = (date) => {
  const d = String(date || "").trim();
  if (!d) return false;
  const row = db
    .prepare(
      `SELECT id
       FROM period_locks
       WHERE date_from <= ? AND date_to >= ?
       LIMIT 1`
    )
    .get(d, d);
  return Boolean(row?.id);
};

const isMonthClosed = (date) => {
  const month = String(date || "").trim().slice(0, 7);
  if (!month) return false;
  const row = db
    .prepare(
      `SELECT id, month, reason, closed_by, created_at
       FROM monthly_closes
       WHERE month = ?
       LIMIT 1`
    )
    .get(month);
  return row || null;
};

const listMonthlyCloses = () => {
  return db
    .prepare(
      `SELECT id, month, reason, closed_by, created_at
       FROM monthly_closes
       ORDER BY month DESC`
    )
    .all();
};

const createMonthlyClose = ({ month, reason, closedBy, snapshot }) => {
  const safeMonth = String(month || "").trim();
  const info = db
    .prepare(
      `INSERT INTO monthly_closes (month, reason, closed_by, snapshot_json, created_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      safeMonth,
      String(reason || "").trim(),
      String(closedBy || "").trim(),
      JSON.stringify(snapshot || {}),
      nowIso()
    );
  return { id: info.lastInsertRowid, month: safeMonth };
};

const deleteMonthlyClose = (id) => {
  const info = db.prepare("DELETE FROM monthly_closes WHERE id = ?").run(id);
  return info.changes > 0;
};

const existsTransportItemDuplicate = ({ customerId, date, amount, details }) => {
  const row = db
    .prepare(
      `SELECT id
       FROM receipts
       WHERE customer_id = ?
         AND date = ?
         AND type = 'النقل'
         AND ABS(amount - ?) < 0.0001
         AND details = ?
       LIMIT 1`
    )
    .get(customerId, date, Number(amount) || 0, details || "");
  return Boolean(row?.id);
};

const getDashboardSummary = () => {
  const totals = db
    .prepare(
      `SELECT
         COALESCE(SUM(CASE WHEN current_balance > 0 THEN current_balance ELSE 0 END), 0) AS receivables,
         COALESCE(SUM(CASE WHEN current_balance < 0 THEN -current_balance ELSE 0 END), 0) AS payables
       FROM (
         SELECT c.id,
                (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
         FROM customers c
         LEFT JOIN receipts r ON r.customer_id = c.id
         GROUP BY c.id
       ) t`
    )
    .get();

  const transport = db
    .prepare(
      `SELECT COALESCE(SUM(amount), 0) AS total_transport
       FROM receipts
       WHERE type = 'النقل' AND amount > 0`
    )
    .get();

  const today = new Date().toISOString().slice(0, 10);
  const movementToday = db
    .prepare(
      `SELECT COALESCE(SUM(ABS(amount)), 0) AS total_movement
       FROM receipts
       WHERE date = ?`
    )
    .get(today);

  const topDebtors = db
    .prepare(
      `SELECT c.id,
              c.name,
              (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
       FROM customers c
       LEFT JOIN receipts r ON r.customer_id = c.id
       GROUP BY c.id
       HAVING current_balance > 0
       ORDER BY current_balance DESC
       LIMIT 5`
    )
    .all();

  return {
    receivables: Number(totals?.receivables || 0),
    payables: Number(totals?.payables || 0),
    transportTotal: Number(transport?.total_transport || 0),
    movementToday: Number(movementToday?.total_movement || 0),
    topDebtors,
  };
};

const listNegativeBalances = () => {
  return db
    .prepare(
      `SELECT c.id,
              c.code,
              c.name,
              (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
       FROM customers c
       LEFT JOIN receipts r ON r.customer_id = c.id
       GROUP BY c.id
       HAVING current_balance < 0
       ORDER BY current_balance ASC`
    )
    .all();
};

const listPositiveBalances = () => {
  return db
    .prepare(
      `SELECT c.id,
              c.code,
              c.name,
              (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
       FROM customers c
       LEFT JOIN receipts r ON r.customer_id = c.id
       GROUP BY c.id
       HAVING current_balance > 0
       ORDER BY current_balance DESC`
    )
    .all();
};

const getCollectionPriority = (limit = 10) => {
  const rows = db
    .prepare(
      `SELECT c.id,
              c.code,
              c.name,
              c.created_at,
              (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance,
              MAX(r.date) AS last_movement_date
       FROM customers c
       LEFT JOIN receipts r ON r.customer_id = c.id
       GROUP BY c.id
       HAVING current_balance > 0`
    )
    .all();

  const prioritized = rows
    .map((row) => {
      const lastMovementDate = row.last_movement_date || row.created_at || "";
      let daysSinceMovement = 0;
      if (lastMovementDate) {
        const diffMs = Date.now() - new Date(lastMovementDate).getTime();
        daysSinceMovement = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      }
      const balance = Number(row.current_balance || 0);
      const score = balance * (1 + daysSinceMovement / 30);
      return {
        ...row,
        current_balance: balance,
        days_since_movement: daysSinceMovement,
        priority_score: Number(score.toFixed(2)),
      };
    })
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, Math.max(1, Math.min(Number(limit) || 10, 50)));

  return prioritized;
};

const getMonthlyKpis = ({ month }) => {
  const safeMonth = String(month || "").trim();
  if (!/^\d{4}-\d{2}$/.test(safeMonth)) {
    return {
      month: safeMonth,
      inflow: 0,
      outflow: 0,
      netFlow: 0,
      collections: 0,
      invoices: 0,
      collectionRate: 0,
      activeCustomers: 0,
    };
  }
  const startDate = `${safeMonth}-01`;
  const endDate = `${safeMonth}-31`;

  const movement = db
    .prepare(
      `SELECT
         COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS inflow,
         COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS outflow,
         COALESCE(SUM(CASE WHEN type = 'قبض' AND amount > 0 THEN amount ELSE 0 END), 0) AS collections,
         COALESCE(SUM(CASE WHEN type IN ('فاتورة', 'النقل') AND amount > 0 THEN amount ELSE 0 END), 0) AS invoices,
         COUNT(DISTINCT customer_id) AS active_customers
       FROM receipts
       WHERE date >= ? AND date <= ?`
    )
    .get(startDate, endDate);

  const inflow = Number(movement?.inflow || 0);
  const outflow = Number(movement?.outflow || 0);
  const collections = Number(movement?.collections || 0);
  const invoices = Number(movement?.invoices || 0);
  const collectionRate = invoices > 0 ? (collections / invoices) * 100 : 0;

  return {
    month: safeMonth,
    inflow,
    outflow,
    netFlow: inflow - outflow,
    collections,
    invoices,
    collectionRate: Number(collectionRate.toFixed(2)),
    activeCustomers: Number(movement?.active_customers || 0),
  };
};

const getCustomerTimeline = ({ customerId, limit = 300 }) => {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 300, 1000));
  const receiptEvents = db
    .prepare(
      `SELECT
         r.id,
         r.date,
         r.invoice_no AS ref_no,
         'receipt' AS source,
         r.type AS event_type,
         r.amount,
         r.sender_name,
         r.receiver_name,
         r.details,
         r.created_at
       FROM receipts r
       WHERE r.customer_id = ?`
    )
    .all(customerId);

  const transferEvents = db
    .prepare(
      `SELECT
         t.id,
         t.date,
         t.transfer_no AS ref_no,
         'transfer' AS source,
         CASE
           WHEN t.sender_id = ? THEN 'تحويل صادر'
           ELSE 'تحويل وارد'
         END AS event_type,
         CASE
           WHEN t.sender_id = ? THEN -(t.amount + t.fee)
           ELSE t.converted_amount
         END AS amount,
         s.name AS sender_name,
         r.name AS receiver_name,
         (t.currency_from || ' -> ' || t.currency_to || ' | rate ' || t.exchange_rate) AS details,
         t.created_at
       FROM transfers t
       JOIN customers s ON s.id = t.sender_id
       JOIN customers r ON r.id = t.receiver_id
       WHERE t.sender_id = ? OR t.receiver_id = ?`
    )
    .all(customerId, customerId, customerId, customerId);

  return [...receiptEvents, ...transferEvents]
    .sort((a, b) => {
      if (a.date === b.date) {
        return String(b.created_at || "").localeCompare(String(a.created_at || ""));
      }
      return String(b.date).localeCompare(String(a.date));
    })
    .slice(0, safeLimit);
};

const importCustomers = (rows = []) => {
  const result = { inserted: 0, skipped: 0, errors: [] };
  rows.forEach((row, idx) => {
    try {
      const name = String(row.name || row.customer_name || "").trim();
      if (!name) {
        result.skipped += 1;
        return;
      }
      const exists = findCustomerByNameNorm(name.toLowerCase());
      if (exists) {
        result.skipped += 1;
        return;
      }
      insertCustomer({
        name,
        phone: row.phone || "",
        address: row.address || "",
        initialBalance: Number(row.initial_balance || row.initialBalance || 0),
      });
      result.inserted += 1;
    } catch (err) {
      result.errors.push({ row: idx + 1, message: err.message || "Insert failed" });
    }
  });
  return result;
};

const importReceipts = (rows = []) => {
  const result = { inserted: 0, skipped: 0, errors: [] };
  rows.forEach((row, idx) => {
    try {
      const customerCode = Number(row.customer_code || row.code || 0);
      const customerName = String(row.customer_name || row.customer || "").trim();
      const customerByCode = customerCode ? getCustomerByCode(customerCode) : null;
      const customerByName = customerName ? listCustomers().find((c) => c.name === customerName) : null;
      const customer = customerByCode || customerByName;
      if (!customer) {
        result.skipped += 1;
        return;
      }
      const date = String(row.date || "").trim();
      const type = String(row.type || "").trim();
      const amount = Number(row.amount || 0);
      if (!date || !type || Number.isNaN(amount) || amount === 0) {
        result.skipped += 1;
        return;
      }
      insertReceipt({
        customerId: customer.id,
        date,
        type,
        amount,
        senderName: row.sender_name || customer.name,
        receiverName: row.receiver_name || "",
        deliveryDate: row.delivery_date || "",
        details: row.details || "",
      });
      result.inserted += 1;
    } catch (err) {
      result.errors.push({ row: idx + 1, message: err.message || "Insert failed" });
    }
  });
  return result;
};

const getLedger = ({ customerId, from, to }) => {
  const initialBalance = getCustomerInitialBalance(customerId);
  const params = [customerId];
  let where = "customer_id = ?";
  if (from) {
    where += " AND date >= ?";
    params.push(from);
  }
  if (to) {
    where += " AND date <= ?";
    params.push(to);
  }

  const rangeRows = db
    .prepare(
      `SELECT id, invoice_no, date, type, amount, sender_name, receiver_name, delivery_date, details
       FROM receipts
       WHERE ${where}
       ORDER BY date ASC, id ASC`
    )
    .all(...params);

  let prevRow = { sum_amount: 0 };
  if (from) {
    const prevParams = [customerId, from];
    prevRow = db
      .prepare(
        "SELECT COALESCE(SUM(amount), 0) AS sum_amount FROM receipts WHERE customer_id = ? AND date < ?"
      )
      .get(...prevParams);
  }

  let running = initialBalance + (prevRow?.sum_amount || 0);
  const entries = rangeRows.map((row) => {
    running += Number(row.amount);
    return { ...row, running_balance: running };
  });

  return {
    previous_balance: initialBalance + (prevRow?.sum_amount || 0),
    current_balance: running,
    entries,
  };
};

const listSalesReport = ({ from, to, customerId }) => {
  const conditions = ["r.type != 'تحويل'", "r.amount > 0"];
  const params = [];

  if (customerId) {
    conditions.push("r.customer_id = ?");
    params.push(customerId);
  }
  if (from) {
    conditions.push("r.date >= ?");
    params.push(from);
  }
  if (to) {
    conditions.push("r.date <= ?");
    params.push(to);
  }

  const where = conditions.join(" AND ");

  const rows = db
    .prepare(
      `SELECT r.id,
              r.invoice_no,
              r.customer_id,
              c.name AS customer_name,
              r.date,
              r.type,
              r.amount,
              r.sender_name,
              r.receiver_name,
              r.details
       FROM receipts r
       JOIN customers c ON c.id = r.customer_id
       WHERE ${where}
       ORDER BY r.date DESC, r.id DESC`
    )
    .all(...params);

  const summary = db
    .prepare(
      `SELECT COALESCE(SUM(r.amount), 0) AS total_sales,
              COUNT(*) AS total_count,
              COUNT(DISTINCT r.customer_id) AS customers_count
       FROM receipts r
       WHERE ${where}`
    )
    .get(...params);

  return {
    rows,
    summary: {
      totalSales: Number(summary?.total_sales || 0),
      totalCount: Number(summary?.total_count || 0),
      customersCount: Number(summary?.customers_count || 0),
    },
  };
};

const listUserAccounts = () => {
  return db
    .prepare(
      `SELECT id, username, role, permissions_json, created_at, updated_at
       FROM user_accounts
       ORDER BY username ASC`
    )
    .all();
};

const getUserAccountByUsername = (username) => {
  const normalized = String(username || "").trim().toLowerCase();
  if (!normalized) return null;
  return db
    .prepare(
      `SELECT id, username, password, role, permissions_json, created_at, updated_at
       FROM user_accounts
       WHERE LOWER(username) = ?`
    )
    .get(normalized);
};

const upsertUserAccount = ({ username, password, role, permissions }) => {
  const normalizedUsername = String(username || "").trim().toLowerCase();
  if (!normalizedUsername) {
    throw new Error("Username is required.");
  }
  const safeRole = String(role || "viewer").trim() || "viewer";
  const safePermissions = permissions && typeof permissions === "object" ? JSON.stringify(permissions) : "";
  const existing = getUserAccountByUsername(normalizedUsername);
  const now = nowIso();

  if (existing) {
    if (String(password || "").trim()) {
      db.prepare(
        `UPDATE user_accounts
         SET password = ?, role = ?, permissions_json = ?, updated_at = ?
         WHERE id = ?`
      ).run(String(password), safeRole, safePermissions, now, existing.id);
    } else {
      db.prepare(
        `UPDATE user_accounts
         SET role = ?, permissions_json = ?, updated_at = ?
         WHERE id = ?`
      ).run(safeRole, safePermissions, now, existing.id);
    }
    return { id: existing.id, created: false };
  }

  if (!String(password || "").trim()) {
    throw new Error("Password is required for new user.");
  }

  const info = db
    .prepare(
      `INSERT INTO user_accounts (username, password, role, permissions_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(normalizedUsername, String(password), safeRole, safePermissions, now, now);
  return { id: info.lastInsertRowid, created: true };
};

const deleteUserAccount = (username) => {
  const normalizedUsername = String(username || "").trim().toLowerCase();
  if (!normalizedUsername) return false;
  const info = db.prepare("DELETE FROM user_accounts WHERE LOWER(username) = ?").run(normalizedUsername);
  return info.changes > 0;
};

const createBackupSnapshot = () => {
  const customers = db
    .prepare(
      "SELECT id, code, name, name_norm, phone, address, initial_balance, created_at FROM customers ORDER BY id ASC"
    )
    .all();
  const receipts = db
    .prepare(
      "SELECT id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at FROM receipts ORDER BY id ASC"
    )
    .all();
  const transfers = db
    .prepare(
      "SELECT id, transfer_no, sender_id, receiver_id, date, amount, exchange_rate, fee, converted_amount, currency_from, currency_to, sender_receipt_id, receiver_receipt_id, created_at FROM transfers ORDER BY id ASC"
    )
    .all();
  const budgets = db
    .prepare(
      "SELECT id, customer_id, period_type, period_value, category, kind, amount, notes, created_at FROM budgets ORDER BY id ASC"
    )
    .all();
  const locks = db
    .prepare(
      "SELECT id, date_from, date_to, reason, locked_by, created_at FROM period_locks ORDER BY id ASC"
    )
    .all();
  const monthlyCloses = db
    .prepare(
      "SELECT id, month, reason, closed_by, snapshot_json, created_at FROM monthly_closes ORDER BY id ASC"
    )
    .all();
  const rmbExpenses = db
    .prepare(
      "SELECT id, customer_id, invoice_no, date, amount, exchange_rate, details, created_at FROM rmb_expenses ORDER BY id ASC"
    )
    .all();
  const userAccounts = db
    .prepare(
      "SELECT id, username, password, role, permissions_json, created_at, updated_at FROM user_accounts ORDER BY id ASC"
    )
    .all();

  return {
    version: 1,
    createdAt: nowIso(),
    data: {
      customers,
      receipts,
      transfers,
      budgets,
      locks,
      monthlyCloses,
      rmbExpenses,
      userAccounts,
    },
  };
};

const restoreBackupSnapshot = (snapshot) => {
  const data = snapshot?.data;
  const customers = data?.customers;
  const receipts = data?.receipts;
  const transfers = data?.transfers;
  const budgets = data?.budgets;
  const locks = Array.isArray(data?.locks) ? data.locks : [];
  const monthlyCloses = Array.isArray(data?.monthlyCloses) ? data.monthlyCloses : [];
  const rmbExpenses = Array.isArray(data?.rmbExpenses) ? data.rmbExpenses : [];
  const userAccounts = Array.isArray(data?.userAccounts) ? data.userAccounts : [];

  if (!data || !Array.isArray(customers) || !Array.isArray(receipts) || !Array.isArray(transfers) || !Array.isArray(budgets)) {
    throw new Error("Invalid backup format.");
  }

  db.pragma("foreign_keys = OFF");
  const run = db.transaction(() => {
    db.prepare("DELETE FROM transfers").run();
    db.prepare("DELETE FROM receipts").run();
    db.prepare("DELETE FROM budgets").run();
    db.prepare("DELETE FROM period_locks").run();
    db.prepare("DELETE FROM monthly_closes").run();
    db.prepare("DELETE FROM rmb_expenses").run();
    db.prepare("DELETE FROM user_accounts").run();
    db.prepare("DELETE FROM customers").run();

    const insertCustomerStmt = db.prepare(
      "INSERT INTO customers (id, code, name, name_norm, phone, address, initial_balance, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    customers.forEach((row) => {
      insertCustomerStmt.run(
        row.id,
        row.code,
        row.name,
        row.name_norm,
        row.phone || "",
        row.address || "",
        Number(row.initial_balance || 0),
        row.created_at || nowIso()
      );
    });

    const insertReceiptStmt = db.prepare(
      "INSERT INTO receipts (id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    receipts.forEach((row) => {
      insertReceiptStmt.run(
        row.id,
        row.invoice_no,
        row.customer_id,
        row.date,
        row.type,
        Number(row.amount || 0),
        row.sender_name || "",
        row.receiver_name || "",
        row.delivery_date || "",
        row.details || "",
        row.attachment_url || "",
        row.attachment_name || "",
        row.created_at || nowIso()
      );
    });

    const insertTransferStmt = db.prepare(
      "INSERT INTO transfers (id, transfer_no, sender_id, receiver_id, date, amount, exchange_rate, fee, converted_amount, currency_from, currency_to, sender_receipt_id, receiver_receipt_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    transfers.forEach((row) => {
      insertTransferStmt.run(
        row.id,
        row.transfer_no,
        row.sender_id,
        row.receiver_id,
        row.date,
        Number(row.amount || 0),
        Number(row.exchange_rate || 0),
        Number(row.fee || 0),
        Number(row.converted_amount || 0),
        row.currency_from || "",
        row.currency_to || "",
        row.sender_receipt_id,
        row.receiver_receipt_id,
        row.created_at || nowIso()
      );
    });

    const insertBudgetStmt = db.prepare(
      "INSERT INTO budgets (id, customer_id, period_type, period_value, category, kind, amount, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    budgets.forEach((row) => {
      insertBudgetStmt.run(
        row.id,
        row.customer_id || null,
        row.period_type,
        row.period_value,
        row.category,
        row.kind,
        Number(row.amount || 0),
        row.notes || "",
        row.created_at || nowIso()
      );
    });

    const insertLockStmt = db.prepare(
      "INSERT INTO period_locks (id, date_from, date_to, reason, locked_by, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    );
    locks.forEach((row) => {
      insertLockStmt.run(
        row.id,
        row.date_from,
        row.date_to,
        row.reason || "",
        row.locked_by || "",
        row.created_at || nowIso()
      );
    });

    const insertMonthlyCloseStmt = db.prepare(
      "INSERT INTO monthly_closes (id, month, reason, closed_by, snapshot_json, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    );
    monthlyCloses.forEach((row) => {
      insertMonthlyCloseStmt.run(
        row.id,
        row.month,
        row.reason || "",
        row.closed_by || "",
        row.snapshot_json || "{}",
        row.created_at || nowIso()
      );
    });

    const insertRmbExpenseStmt = db.prepare(
      "INSERT INTO rmb_expenses (id, customer_id, invoice_no, date, amount, exchange_rate, details, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    rmbExpenses.forEach((row) => {
      insertRmbExpenseStmt.run(
        row.id,
        row.customer_id || null,
        row.invoice_no || "",
        row.date,
        Number(row.amount || 0),
        Number(row.exchange_rate || 0) > 0 ? Number(row.exchange_rate) : null,
        row.details || "",
        row.created_at || nowIso()
      );
    });

    const insertUserStmt = db.prepare(
      "INSERT INTO user_accounts (id, username, password, role, permissions_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    userAccounts.forEach((row) => {
      insertUserStmt.run(
        row.id,
        String(row.username || "").trim().toLowerCase(),
        String(row.password || ""),
        String(row.role || "viewer"),
        row.permissions_json || "",
        row.created_at || nowIso(),
        row.updated_at || nowIso()
      );
    });
  });

  run();
  db.pragma("foreign_keys = ON");
  return true;
};

module.exports = {
  getNextCustomerCode,
  getNextInvoiceNo,
  listCustomers,
  getCustomerById,
  getCustomerByCode,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomerByNameNorm,
  listReceiptsByCustomer,
  getReceiptById,
  getEarliestReceiptDate,
  insertReceipt,
  updateReceipt,
  deleteReceipt,
  getCustomerInitialBalance,
  getLedger,
  listTransfers,
  listTransfersByCurrencyFrom,
  getTransferById,
  getTransferDateById,
  findSimilarReceipt,
  findSimilarTransfer,
  listRmbLedger,
  listRmbExpenses,
  insertRmbExpense,
  deleteRmbExpensesByInvoiceNo,
  deleteRmbExpenseById,
  insertTransfer,
  updateTransfer,
  deleteTransfer,
  listBudget,
  insertBudget,
  updateBudget,
  deleteBudget,
  getBudgetActuals,
  getBudgetActualsByCategory,
  listSalesReport,
  logAudit,
  listAuditLogs,
  listLocks,
  createDailyLock,
  removeLock,
  isDateLocked,
  isMonthClosed,
  listMonthlyCloses,
  createMonthlyClose,
  deleteMonthlyClose,
  existsTransportItemDuplicate,
  getDashboardSummary,
  listNegativeBalances,
  listPositiveBalances,
  getCollectionPriority,
  getMonthlyKpis,
  getCustomerTimeline,
  importCustomers,
  importReceipts,
  listUserAccounts,
  getUserAccountByUsername,
  upsertUserAccount,
  deleteUserAccount,
  createBackupSnapshot,
  restoreBackupSnapshot,
  db,
};
