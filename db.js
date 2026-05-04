const { Pool } = require("pg");

function getPoolConfig() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is required");
  const useSSL = url.includes("sslmode=require") || url.includes("sslmode=verify") || url.includes(".db.ondigitalocean.com");
  // Strip sslmode from URL to avoid conflicts with explicit ssl option
  const cleanUrl = url.replace(/[?&]sslmode=[^&]*/g, (m) => (m.startsWith("?") ? "?" : "")).replace(/\?$/, "").replace(/\?&/, "?");
  return {
    connectionString: cleanUrl,
    ssl: useSSL ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

const pool = new Pool(getPoolConfig());
const query = (sql, params) => pool.query(sql, params);

const nowIso = () => new Date().toISOString();
const normalizeName = (name) => name.trim().toLowerCase();

const initDb = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      code INTEGER UNIQUE NOT NULL,
      name TEXT NOT NULL,
      name_norm TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      initial_balance REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS receipts (
      id SERIAL PRIMARY KEY,
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
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS transfers (
      id SERIAL PRIMARY KEY,
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
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS budgets (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER,
      period_type TEXT NOT NULL,
      period_value TEXT NOT NULL,
      category TEXT NOT NULL,
      kind TEXT NOT NULL,
      amount REAL NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_budgets_period ON budgets (period_type, period_value)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_budgets_customer ON budgets (customer_id)`);

  await query(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      role TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at)`);

  await query(`
    CREATE TABLE IF NOT EXISTS period_locks (
      id SERIAL PRIMARY KEY,
      date_from TEXT NOT NULL,
      date_to TEXT NOT NULL,
      reason TEXT,
      locked_by TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_period_locks_range ON period_locks (date_from, date_to)`);

  await query(`
    CREATE TABLE IF NOT EXISTS monthly_closes (
      id SERIAL PRIMARY KEY,
      month TEXT UNIQUE NOT NULL,
      reason TEXT,
      closed_by TEXT,
      snapshot_json TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_monthly_closes_month ON monthly_closes (month)`);

  await query(`
    CREATE TABLE IF NOT EXISTS rmb_expenses (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER,
      invoice_no TEXT,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      exchange_rate REAL,
      details TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_rmb_expenses_date ON rmb_expenses (date)`);

  await query(`
    CREATE TABLE IF NOT EXISTS user_accounts (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      permissions_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_user_accounts_username ON user_accounts (username)`);
};

// Migration helpers are no-ops in PostgreSQL (schema is created in initDb)
const ensureInitialBalanceColumn = async () => {};
const ensureTransferColumns = async () => {};
const ensureBudgetCustomerColumn = async () => {};
const ensureRmbExpenseColumns = async () => {};
const ensureReceiptAttachmentColumns = async () => {};
const ensureReceiptTypeNames = async () => {};
const ensureBudgetCategoryNames = async () => {};
const ensureTransportItemsPositive = async () => {};

const getNextCustomerCode = async () => {
  const result = await query("SELECT MAX(code) AS max_code FROM customers");
  const row = result.rows[0];
  return (row?.max_code || 1610999) + 1;
};

const getNextInvoiceNo = async () => {
  const result = await query("SELECT MAX(invoice_no) AS max_no FROM receipts");
  const row = result.rows[0];
  return (Number(row?.max_no) || 0) + 1;
};

const listCustomers = async () => {
  const result = await query(
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
  );
  return result.rows;
};

const getCustomerById = async (id) => {
  const result = await query(
    "SELECT id, code, name, phone, address, initial_balance, created_at FROM customers WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

const getCustomerByCode = async (code) => {
  const result = await query(
    "SELECT id, code, name, phone, address, initial_balance, created_at FROM customers WHERE code = $1",
    [code]
  );
  return result.rows[0] || null;
};

const insertCustomer = async ({ name, phone, address, initialBalance }) => {
  const code = await getNextCustomerCode();
  const nameNorm = normalizeName(name);
  const result = await query(
    "INSERT INTO customers (code, name, name_norm, phone, address, initial_balance, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [code, name.trim(), nameNorm, phone || "", address || "", Number(initialBalance) || 0, nowIso()]
  );
  return { id: result.rows[0].id, code };
};

const updateCustomer = async ({ id, name, phone, address, initialBalance }) => {
  const result = await query(
    "UPDATE customers SET name = $1, name_norm = $2, phone = $3, address = $4, initial_balance = $5 WHERE id = $6",
    [name.trim(), normalizeName(name), phone || "", address || "", Number(initialBalance) || 0, id]
  );
  return result.rowCount > 0;
};

const deleteCustomer = async (id) => {
  await query("DELETE FROM receipts WHERE customer_id = $1", [id]);
  const result = await query("DELETE FROM customers WHERE id = $1", [id]);
  return result.rowCount > 0;
};

const findCustomerByNameNorm = async (nameNorm, excludeId) => {
  if (excludeId) {
    const result = await query(
      "SELECT id FROM customers WHERE name_norm = $1 AND id != $2",
      [nameNorm, excludeId]
    );
    return result.rows[0] || null;
  }
  const result = await query("SELECT id FROM customers WHERE name_norm = $1", [nameNorm]);
  return result.rows[0] || null;
};

const listReceiptsByCustomer = async (customerId) => {
  const result = await query(
    "SELECT id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at FROM receipts WHERE customer_id = $1 ORDER BY date ASC, id ASC",
    [customerId]
  );
  return result.rows;
};

const getReceiptById = async (id) => {
  const result = await query(
    "SELECT id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at FROM receipts WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

const getEarliestReceiptDate = async (customerId) => {
  const result = await query(
    "SELECT MIN(date) AS min_date FROM receipts WHERE customer_id = $1",
    [customerId]
  );
  return result.rows[0]?.min_date || "";
};

const getCustomerInitialBalance = async (customerId) => {
  const result = await query(
    "SELECT initial_balance FROM customers WHERE id = $1",
    [customerId]
  );
  return Number(result.rows[0]?.initial_balance || 0);
};

// Internal helper: insert receipt using a specific client (for transactions)
const insertReceiptWithClient = async (client, {
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
  let finalInvoiceNo = invoiceNo;
  if (!finalInvoiceNo) {
    const r = await client.query("SELECT MAX(invoice_no) AS max_no FROM receipts");
    finalInvoiceNo = (Number(r.rows[0]?.max_no) || 0) + 1;
  }
  const result = await client.query(
    "INSERT INTO receipts (invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
    [
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
      nowIso(),
    ]
  );
  return { id: result.rows[0].id, invoiceNo: finalInvoiceNo };
};

const insertReceipt = async ({
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
  const finalInvoiceNo = invoiceNo || (await getNextInvoiceNo());
  const result = await query(
    "INSERT INTO receipts (invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
    [
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
      nowIso(),
    ]
  );
  return { id: result.rows[0].id, invoiceNo: finalInvoiceNo };
};

const updateReceipt = async ({
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
  const result = await query(
    "UPDATE receipts SET customer_id = $1, date = $2, type = $3, amount = $4, sender_name = $5, receiver_name = $6, delivery_date = $7, details = $8, attachment_url = $9, attachment_name = $10 WHERE id = $11",
    [
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
      id,
    ]
  );
  return result.rowCount > 0;
};

const deleteReceipt = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const currentResult = await client.query(
      "SELECT id, customer_id, date, type, amount, sender_name, receiver_name FROM receipts WHERE id = $1",
      [id]
    );
    const current = currentResult.rows[0];
    if (!current) {
      await client.query("ROLLBACK");
      return false;
    }

    const transferResult = await client.query(
      "SELECT id, sender_receipt_id, receiver_receipt_id FROM transfers WHERE sender_receipt_id = $1 OR receiver_receipt_id = $1",
      [id]
    );
    const transfer = transferResult.rows[0];

    if (transfer) {
      await client.query("DELETE FROM transfers WHERE id = $1", [transfer.id]);
      await client.query("DELETE FROM receipts WHERE id = $1", [transfer.sender_receipt_id]);
      await client.query("DELETE FROM receipts WHERE id = $1", [transfer.receiver_receipt_id]);
      await client.query("COMMIT");
      return true;
    }

    const isPairedReceipt =
      String(current.type || "").trim() === "قبض" &&
      String(current.sender_name || "").trim() &&
      String(current.receiver_name || "").trim();

    if (isPairedReceipt) {
      const counterpartResult = await client.query(
        `SELECT id
         FROM receipts
         WHERE id != $1
           AND date = $2
           AND type = $3
           AND sender_name = $4
           AND receiver_name = $5
           AND ABS(amount) = ABS($6)
           AND amount = -$6
         ORDER BY id ASC
         LIMIT 1`,
        [
          current.id,
          current.date,
          current.type,
          current.sender_name,
          current.receiver_name,
          Number(current.amount || 0),
        ]
      );
      const counterpart = counterpartResult.rows[0];
      if (counterpart?.id) {
        await client.query("DELETE FROM receipts WHERE id = $1", [counterpart.id]);
      }
    }

    const deleteResult = await client.query("DELETE FROM receipts WHERE id = $1", [id]);
    await client.query("COMMIT");
    return deleteResult.rowCount > 0;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const listTransfers = async (customerId) => {
  if (customerId) {
    const result = await query(
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
       WHERE t.sender_id = $1 OR t.receiver_id = $1
       ORDER BY t.date ASC, t.id ASC`,
      [customerId]
    );
    return result.rows;
  }

  const result = await query(
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
  );
  return result.rows;
};

const listTransfersByCurrencyFrom = async (currencyFrom = "رممبي") => {
  const normalized = String(currencyFrom || "").trim().toLowerCase();
  const result = await query(
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
     WHERE LOWER(t.currency_from) = $1
     ORDER BY t.date ASC, t.id ASC`,
    [normalized]
  );
  return result.rows;
};

const getTransferById = async (id) => {
  const result = await query(
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
     WHERE t.id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

const getTransferDateById = async (id) => {
  const result = await query("SELECT date FROM transfers WHERE id = $1", [id]);
  return result.rows[0]?.date || "";
};

const findSimilarReceipt = async ({ customerId, date, type, amount, excludeId }) => {
  const safeAmount = Math.abs(Number(amount) || 0);
  if (!safeAmount || !customerId || !date || !type) return null;
  const tolerance = Math.max(1, safeAmount * 0.01);
  if (excludeId) {
    const result = await query(
      `SELECT id, invoice_no, date, amount, type, sender_name, receiver_name
       FROM receipts
       WHERE customer_id = $1
         AND type = $2
         AND id != $3
         AND date BETWEEN ($4::date - INTERVAL '3 days') AND ($4::date + INTERVAL '3 days')
         AND ABS(ABS(amount) - $5) <= $6
       ORDER BY date DESC, id DESC
       LIMIT 1`,
      [customerId, type, excludeId, date, safeAmount, tolerance]
    );
    return result.rows[0] || null;
  }
  const result = await query(
    `SELECT id, invoice_no, date, amount, type, sender_name, receiver_name
     FROM receipts
     WHERE customer_id = $1
       AND type = $2
       AND date BETWEEN ($3::date - INTERVAL '3 days') AND ($3::date + INTERVAL '3 days')
       AND ABS(ABS(amount) - $4) <= $5
     ORDER BY date DESC, id DESC
     LIMIT 1`,
    [customerId, type, date, safeAmount, tolerance]
  );
  return result.rows[0] || null;
};

const findSimilarTransfer = async ({ senderId, receiverId, date, amount, exchangeRate, excludeId }) => {
  const safeAmount = Number(amount) || 0;
  if (!safeAmount || !senderId || !receiverId || !date) return null;
  const tolerance = Math.max(1, Math.abs(safeAmount) * 0.01);
  const rateTolerance = Math.max(0.0001, Math.abs(Number(exchangeRate) || 0) * 0.02);
  if (excludeId) {
    const result = await query(
      `SELECT id, transfer_no, date, amount, exchange_rate, sender_id, receiver_id
       FROM transfers
       WHERE sender_id = $1
         AND receiver_id = $2
         AND id != $3
         AND date BETWEEN ($4::date - INTERVAL '3 days') AND ($4::date + INTERVAL '3 days')
         AND ABS(amount - $5) <= $6
         AND ABS(exchange_rate - $7) <= $8
       ORDER BY date DESC, id DESC
       LIMIT 1`,
      [senderId, receiverId, excludeId, date, safeAmount, tolerance, Number(exchangeRate) || 0, rateTolerance]
    );
    return result.rows[0] || null;
  }
  const result = await query(
    `SELECT id, transfer_no, date, amount, exchange_rate, sender_id, receiver_id
     FROM transfers
     WHERE sender_id = $1
       AND receiver_id = $2
       AND date BETWEEN ($3::date - INTERVAL '3 days') AND ($3::date + INTERVAL '3 days')
       AND ABS(amount - $4) <= $5
       AND ABS(exchange_rate - $6) <= $7
     ORDER BY date DESC, id DESC
     LIMIT 1`,
    [senderId, receiverId, date, safeAmount, tolerance, Number(exchangeRate) || 0, rateTolerance]
  );
  return result.rows[0] || null;
};

const listRmbLedger = async (currencyTo = "يوان") => {
  const normalized = String(currencyTo || "").trim().toLowerCase();
  const result = await query(
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
     WHERE LOWER(t.currency_to) = $1
     ORDER BY t.date ASC, t.id ASC`,
    [normalized]
  );
  return result.rows;
};

const listRmbExpenses = async ({ from = "", to = "" } = {}) => {
  const clauses = [];
  const params = [];
  let idx = 1;
  if (from) {
    clauses.push(`e.date >= $${idx++}`);
    params.push(from);
  }
  if (to) {
    clauses.push(`e.date <= $${idx++}`);
    params.push(to);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await query(
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
     ORDER BY e.date ASC, e.id ASC`,
    params
  );
  return result.rows;
};

const insertRmbExpense = async ({ customerId, invoiceNo, date, amount, exchangeRate, details }) => {
  const result = await query(
    "INSERT INTO rmb_expenses (customer_id, invoice_no, date, amount, exchange_rate, details, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [
      customerId || null,
      invoiceNo || "",
      date,
      Number(amount || 0),
      Number(exchangeRate || 0) > 0 ? Number(exchangeRate) : null,
      details || "",
      nowIso(),
    ]
  );
  return { id: result.rows[0].id };
};

const deleteRmbExpensesByInvoiceNo = async (invoiceNo) => {
  const normalized = String(invoiceNo || "").trim();
  if (!normalized) return 0;
  const legacyNeedle = `لفاتورة ${normalized}`;
  const result = await query(
    "DELETE FROM rmb_expenses WHERE TRIM(COALESCE(invoice_no, '')) = $1 OR STRPOS(COALESCE(details, ''), $2) > 0",
    [normalized, legacyNeedle]
  );
  return Number(result.rowCount || 0);
};

const deleteRmbExpenseById = async (id) => {
  const result = await query("DELETE FROM rmb_expenses WHERE id = $1", [Number(id || 0)]);
  return Number(result.rowCount || 0);
};

const insertTransfer = async ({
  senderId,
  receiverId,
  date,
  amount,
  exchangeRate,
  fee,
  currencyFrom,
  currencyTo,
}) => {
  const sender = await getCustomerById(senderId);
  const receiver = await getCustomerById(receiverId);
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

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const noResult = await client.query("SELECT MAX(invoice_no) AS max_no FROM receipts");
    const transferNo = (Number(noResult.rows[0]?.max_no) || 0) + 1;

    const senderReceipt = await insertReceiptWithClient(client, {
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

    const receiverReceipt = await insertReceiptWithClient(client, {
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

    const transferResult = await client.query(
      "INSERT INTO transfers (transfer_no, sender_id, receiver_id, date, amount, exchange_rate, fee, converted_amount, currency_from, currency_to, sender_receipt_id, receiver_receipt_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      [
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
        nowIso(),
      ]
    );

    await client.query("COMMIT");
    return { id: transferResult.rows[0].id, transferNo };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const updateTransfer = async ({
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
  const transfer = await getTransferById(id);
  if (!transfer) return false;

  const sender = await getCustomerById(senderId);
  const receiver = await getCustomerById(receiverId);
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

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      "UPDATE receipts SET customer_id = $1, date = $2, type = $3, amount = $4, sender_name = $5, receiver_name = $6, details = $7 WHERE id = $8",
      [senderId, date, "تحويل", -(numericAmount + numericFee), sender.name, receiver.name, receiptDetails, transfer.sender_receipt_id]
    );

    await client.query(
      "UPDATE receipts SET customer_id = $1, date = $2, type = $3, amount = $4, sender_name = $5, receiver_name = $6, details = $7 WHERE id = $8",
      [receiverId, date, "تحويل", convertedAmount, sender.name, receiver.name, receiptDetails, transfer.receiver_receipt_id]
    );

    const result = await client.query(
      "UPDATE transfers SET sender_id = $1, receiver_id = $2, date = $3, amount = $4, exchange_rate = $5, fee = $6, converted_amount = $7, currency_from = $8, currency_to = $9 WHERE id = $10",
      [senderId, receiverId, date, numericAmount, numericRate, numericFee, convertedAmount, currencyFrom, currencyTo, id]
    );

    await client.query("COMMIT");
    return result.rowCount > 0;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const deleteTransfer = async (id) => {
  const result = await query(
    "SELECT sender_receipt_id, receiver_receipt_id FROM transfers WHERE id = $1",
    [id]
  );
  const transfer = result.rows[0];
  if (!transfer) return false;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const del = await client.query("DELETE FROM transfers WHERE id = $1", [id]);
    await client.query("DELETE FROM receipts WHERE id = $1", [transfer.sender_receipt_id]);
    await client.query("DELETE FROM receipts WHERE id = $1", [transfer.receiver_receipt_id]);
    await client.query("COMMIT");
    return del.rowCount > 0;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const listBudget = async ({ periodType, periodValue, customerId }) => {
  const result = await query(
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
     WHERE b.period_type = $1
       AND b.period_value = $2
       AND (($3::integer IS NULL AND b.customer_id IS NULL) OR b.customer_id = $3)
     ORDER BY b.kind ASC, b.category ASC, b.id ASC`,
    [periodType, periodValue, customerId || null]
  );
  const rows = result.rows;

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

const getBudgetActuals = async ({ startDate, endDate, customerId }) => {
  const result = await query(
    `SELECT
       COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS income,
       COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS expense
     FROM receipts
     WHERE date >= $1 AND date <= $2
       AND ($3::integer IS NULL OR customer_id = $3)
       AND type != 'تحويل'`,
    [startDate, endDate, customerId || null]
  );
  const row = result.rows[0];
  const income = Number(row?.income || 0);
  const expense = Number(row?.expense || 0);
  return { income, expense, net: income - expense };
};

const getBudgetActualsByCategory = async ({ startDate, endDate, typeMap, customerId }) => {
  const result = await query(
    `SELECT type,
            COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS income,
            COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS expense
     FROM receipts
     WHERE date >= $1 AND date <= $2
       AND ($3::integer IS NULL OR customer_id = $3)
       AND type != 'تحويل'
     GROUP BY type`,
    [startDate, endDate, customerId || null]
  );

  const byCategory = {};
  result.rows.forEach((row) => {
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

const insertBudget = async ({ customerId, periodType, periodValue, category, kind, amount, notes }) => {
  const result = await query(
    "INSERT INTO budgets (customer_id, period_type, period_value, category, kind, amount, notes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
    [customerId || null, periodType, periodValue, category.trim(), kind, Number(amount), notes || "", nowIso()]
  );
  return { id: result.rows[0].id };
};

const updateBudget = async ({ id, customerId, periodType, periodValue, category, kind, amount, notes }) => {
  const result = await query(
    "UPDATE budgets SET customer_id = $1, period_type = $2, period_value = $3, category = $4, kind = $5, amount = $6, notes = $7 WHERE id = $8",
    [customerId || null, periodType, periodValue, category.trim(), kind, Number(amount), notes || "", id]
  );
  return result.rowCount > 0;
};

const deleteBudget = async (id) => {
  const result = await query("DELETE FROM budgets WHERE id = $1", [id]);
  return result.rowCount > 0;
};

const logAudit = async ({ username, role, action, entityType, entityId, details }) => {
  const result = await query(
    "INSERT INTO audit_logs (username, role, action, entity_type, entity_id, details, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [
      username || "unknown",
      role || "unknown",
      action,
      entityType,
      entityId !== undefined && entityId !== null ? String(entityId) : "",
      details ? JSON.stringify(details) : "",
      nowIso(),
    ]
  );
  return { id: result.rows[0].id };
};

const listAuditLogs = async (options = {}) => {
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
  let idx = 1;

  if (options.username) {
    conditions.push(`LOWER(username) LIKE $${idx++}`);
    params.push(`%${String(options.username).trim().toLowerCase()}%`);
  }
  if (options.action) {
    conditions.push(`action = $${idx++}`);
    params.push(String(options.action).trim());
  }
  if (options.entityType) {
    conditions.push(`entity_type = $${idx++}`);
    params.push(String(options.entityType).trim());
  }
  if (options.detailsLike) {
    conditions.push(`LOWER(details) LIKE $${idx++}`);
    params.push(`%${String(options.detailsLike).trim().toLowerCase()}%`);
  }
  const fromDate = normalizeDateOnly(options.from);
  const toDate = normalizeDateOnly(options.to);
  if (fromDate) {
    conditions.push(`LEFT(created_at, 10) >= $${idx++}`);
    params.push(fromDate);
  }
  if (toDate) {
    conditions.push(`LEFT(created_at, 10) <= $${idx++}`);
    params.push(toDate);
  }

  params.push(limit);
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await query(
    `SELECT id, username, role, action, entity_type, entity_id, details, created_at
     FROM audit_logs
     ${where}
     ORDER BY id DESC
     LIMIT $${idx}`,
    params
  );
  return result.rows;
};

const listLocks = async () => {
  const result = await query(
    "SELECT id, date_from, date_to, reason, locked_by, created_at FROM period_locks ORDER BY id DESC"
  );
  return result.rows;
};

const createDailyLock = async ({ date, lockedBy, reason }) => {
  const lockDate = String(date || "").trim();
  const result = await query(
    "INSERT INTO period_locks (date_from, date_to, reason, locked_by, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [lockDate, lockDate, String(reason || "").trim(), String(lockedBy || "").trim(), nowIso()]
  );
  return { id: result.rows[0].id };
};

const removeLock = async (id) => {
  const result = await query("DELETE FROM period_locks WHERE id = $1", [id]);
  return result.rowCount > 0;
};

const isDateLocked = async (date) => {
  const d = String(date || "").trim();
  if (!d) return false;
  const result = await query(
    "SELECT id FROM period_locks WHERE date_from <= $1 AND date_to >= $1 LIMIT 1",
    [d]
  );
  return Boolean(result.rows[0]?.id);
};

const isMonthClosed = async (date) => {
  const month = String(date || "").trim().slice(0, 7);
  if (!month) return false;
  const result = await query(
    "SELECT id, month, reason, closed_by, created_at FROM monthly_closes WHERE month = $1 LIMIT 1",
    [month]
  );
  return result.rows[0] || null;
};

const listMonthlyCloses = async () => {
  const result = await query(
    "SELECT id, month, reason, closed_by, created_at FROM monthly_closes ORDER BY month DESC"
  );
  return result.rows;
};

const createMonthlyClose = async ({ month, reason, closedBy, snapshot }) => {
  const safeMonth = String(month || "").trim();
  const result = await query(
    "INSERT INTO monthly_closes (month, reason, closed_by, snapshot_json, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [safeMonth, String(reason || "").trim(), String(closedBy || "").trim(), JSON.stringify(snapshot || {}), nowIso()]
  );
  return { id: result.rows[0].id, month: safeMonth };
};

const deleteMonthlyClose = async (id) => {
  const result = await query("DELETE FROM monthly_closes WHERE id = $1", [id]);
  return result.rowCount > 0;
};

const existsTransportItemDuplicate = async ({ customerId, date, amount, details }) => {
  const result = await query(
    `SELECT id
     FROM receipts
     WHERE customer_id = $1
       AND date = $2
       AND type = 'النقل'
       AND ABS(amount - $3) < 0.0001
       AND details = $4
     LIMIT 1`,
    [customerId, date, Number(amount) || 0, details || ""]
  );
  return Boolean(result.rows[0]?.id);
};

const getDashboardSummary = async () => {
  const totalsResult = await query(
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
  );

  const transportResult = await query(
    "SELECT COALESCE(SUM(amount), 0) AS total_transport FROM receipts WHERE type = 'النقل' AND amount > 0"
  );

  const today = new Date().toISOString().slice(0, 10);
  const movementResult = await query(
    "SELECT COALESCE(SUM(ABS(amount)), 0) AS total_movement FROM receipts WHERE date = $1",
    [today]
  );

  const topDebtorsResult = await query(
    `SELECT c.id,
            c.name,
            (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
     FROM customers c
     LEFT JOIN receipts r ON r.customer_id = c.id
     GROUP BY c.id
     HAVING (c.initial_balance + COALESCE(SUM(r.amount), 0)) > 0
     ORDER BY current_balance DESC
     LIMIT 5`
  );

  return {
    receivables: Number(totalsResult.rows[0]?.receivables || 0),
    payables: Number(totalsResult.rows[0]?.payables || 0),
    transportTotal: Number(transportResult.rows[0]?.total_transport || 0),
    movementToday: Number(movementResult.rows[0]?.total_movement || 0),
    topDebtors: topDebtorsResult.rows,
  };
};

const listNegativeBalances = async () => {
  const result = await query(
    `SELECT c.id,
            c.code,
            c.name,
            (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
     FROM customers c
     LEFT JOIN receipts r ON r.customer_id = c.id
     GROUP BY c.id
     HAVING (c.initial_balance + COALESCE(SUM(r.amount), 0)) < 0
     ORDER BY current_balance ASC`
  );
  return result.rows;
};

const listPositiveBalances = async () => {
  const result = await query(
    `SELECT c.id,
            c.code,
            c.name,
            (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance
     FROM customers c
     LEFT JOIN receipts r ON r.customer_id = c.id
     GROUP BY c.id
     HAVING (c.initial_balance + COALESCE(SUM(r.amount), 0)) > 0
     ORDER BY current_balance DESC`
  );
  return result.rows;
};

const getCollectionPriority = async (limit = 10) => {
  const result = await query(
    `SELECT c.id,
            c.code,
            c.name,
            c.created_at,
            (c.initial_balance + COALESCE(SUM(r.amount), 0)) AS current_balance,
            MAX(r.date) AS last_movement_date
     FROM customers c
     LEFT JOIN receipts r ON r.customer_id = c.id
     GROUP BY c.id
     HAVING (c.initial_balance + COALESCE(SUM(r.amount), 0)) > 0`
  );

  const prioritized = result.rows
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

const getMonthlyKpis = async ({ month }) => {
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

  const result = await query(
    `SELECT
       COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS inflow,
       COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS outflow,
       COALESCE(SUM(CASE WHEN type = 'قبض' AND amount > 0 THEN amount ELSE 0 END), 0) AS collections,
       COALESCE(SUM(CASE WHEN type IN ('فاتورة', 'النقل') AND amount > 0 THEN amount ELSE 0 END), 0) AS invoices,
       COUNT(DISTINCT customer_id) AS active_customers
     FROM receipts
     WHERE date >= $1 AND date <= $2`,
    [startDate, endDate]
  );

  const movement = result.rows[0];
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

const getCustomerTimeline = async ({ customerId, limit = 300 }) => {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 300, 1000));

  const receiptResult = await query(
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
     WHERE r.customer_id = $1`,
    [customerId]
  );

  const transferResult = await query(
    `SELECT
       t.id,
       t.date,
       t.transfer_no AS ref_no,
       'transfer' AS source,
       CASE
         WHEN t.sender_id = $1 THEN 'تحويل صادر'
         ELSE 'تحويل وارد'
       END AS event_type,
       CASE
         WHEN t.sender_id = $1 THEN -(t.amount + t.fee)
         ELSE t.converted_amount
       END AS amount,
       s.name AS sender_name,
       r.name AS receiver_name,
       (t.currency_from || ' -> ' || t.currency_to || ' | rate ' || t.exchange_rate) AS details,
       t.created_at
     FROM transfers t
     JOIN customers s ON s.id = t.sender_id
     JOIN customers r ON r.id = t.receiver_id
     WHERE t.sender_id = $1 OR t.receiver_id = $1`,
    [customerId]
  );

  return [...receiptResult.rows, ...transferResult.rows]
    .sort((a, b) => {
      if (a.date === b.date) {
        return String(b.created_at || "").localeCompare(String(a.created_at || ""));
      }
      return String(b.date).localeCompare(String(a.date));
    })
    .slice(0, safeLimit);
};

const importCustomers = async (rows = []) => {
  const result = { inserted: 0, skipped: 0, errors: [] };
  for (let idx = 0; idx < rows.length; idx++) {
    const row = rows[idx];
    try {
      const name = String(row.name || row.customer_name || "").trim();
      if (!name) {
        result.skipped += 1;
        continue;
      }
      const exists = await findCustomerByNameNorm(name.toLowerCase());
      if (exists) {
        result.skipped += 1;
        continue;
      }
      await insertCustomer({
        name,
        phone: row.phone || "",
        address: row.address || "",
        initialBalance: Number(row.initial_balance || row.initialBalance || 0),
      });
      result.inserted += 1;
    } catch (err) {
      result.errors.push({ row: idx + 1, message: err.message || "Insert failed" });
    }
  }
  return result;
};

const importReceipts = async (rows = []) => {
  const result = { inserted: 0, skipped: 0, errors: [] };
  for (let idx = 0; idx < rows.length; idx++) {
    const row = rows[idx];
    try {
      const customerCode = Number(row.customer_code || row.code || 0);
      const customerName = String(row.customer_name || row.customer || "").trim();
      const customerByCode = customerCode ? await getCustomerByCode(customerCode) : null;
      let customerByName = null;
      if (!customerByCode && customerName) {
        const all = await listCustomers();
        customerByName = all.find((c) => c.name === customerName) || null;
      }
      const customer = customerByCode || customerByName;
      if (!customer) {
        result.skipped += 1;
        continue;
      }
      const date = String(row.date || "").trim();
      const type = String(row.type || "").trim();
      const amount = Number(row.amount || 0);
      if (!date || !type || Number.isNaN(amount) || amount === 0) {
        result.skipped += 1;
        continue;
      }
      await insertReceipt({
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
  }
  return result;
};

const getLedger = async ({ customerId, from, to }) => {
  const initialBalance = await getCustomerInitialBalance(customerId);
  const params = [customerId];
  let idx = 2;
  let where = "customer_id = $1";
  if (from) {
    where += ` AND date >= $${idx++}`;
    params.push(from);
  }
  if (to) {
    where += ` AND date <= $${idx++}`;
    params.push(to);
  }

  const rangeResult = await query(
    `SELECT id, invoice_no, date, type, amount, sender_name, receiver_name, delivery_date, details
     FROM receipts
     WHERE ${where}
     ORDER BY date ASC, id ASC`,
    params
  );

  let prevSumAmount = 0;
  if (from) {
    const prevResult = await query(
      "SELECT COALESCE(SUM(amount), 0) AS sum_amount FROM receipts WHERE customer_id = $1 AND date < $2",
      [customerId, from]
    );
    prevSumAmount = Number(prevResult.rows[0]?.sum_amount || 0);
  }

  let running = initialBalance + prevSumAmount;
  const entries = rangeResult.rows.map((row) => {
    running += Number(row.amount);
    return { ...row, running_balance: running };
  });

  return {
    previous_balance: initialBalance + prevSumAmount,
    current_balance: running,
    entries,
  };
};

const listSalesReport = async ({ from, to, customerId }) => {
  const conditions = ["r.type != 'تحويل'", "r.amount > 0"];
  const params = [];
  let idx = 1;

  if (customerId) {
    conditions.push(`r.customer_id = $${idx++}`);
    params.push(customerId);
  }
  if (from) {
    conditions.push(`r.date >= $${idx++}`);
    params.push(from);
  }
  if (to) {
    conditions.push(`r.date <= $${idx++}`);
    params.push(to);
  }

  const where = conditions.join(" AND ");

  const rowsResult = await query(
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
     ORDER BY r.date DESC, r.id DESC`,
    params
  );

  const summaryResult = await query(
    `SELECT COALESCE(SUM(r.amount), 0) AS total_sales,
            COUNT(*) AS total_count,
            COUNT(DISTINCT r.customer_id) AS customers_count
     FROM receipts r
     WHERE ${where}`,
    params
  );

  const summary = summaryResult.rows[0];
  return {
    rows: rowsResult.rows,
    summary: {
      totalSales: Number(summary?.total_sales || 0),
      totalCount: Number(summary?.total_count || 0),
      customersCount: Number(summary?.customers_count || 0),
    },
  };
};

const listUserAccounts = async () => {
  const result = await query(
    "SELECT id, username, role, permissions_json, created_at, updated_at FROM user_accounts ORDER BY username ASC"
  );
  return result.rows;
};

const getUserAccountByUsername = async (username) => {
  const normalized = String(username || "").trim().toLowerCase();
  if (!normalized) return null;
  const result = await query(
    "SELECT id, username, password, role, permissions_json, created_at, updated_at FROM user_accounts WHERE LOWER(username) = $1",
    [normalized]
  );
  return result.rows[0] || null;
};

const upsertUserAccount = async ({ username, password, role, permissions }) => {
  const normalizedUsername = String(username || "").trim().toLowerCase();
  if (!normalizedUsername) {
    throw new Error("Username is required.");
  }
  const safeRole = String(role || "viewer").trim() || "viewer";
  const safePermissions = permissions && typeof permissions === "object" ? JSON.stringify(permissions) : "";
  const existing = await getUserAccountByUsername(normalizedUsername);
  const now = nowIso();

  if (existing) {
    if (String(password || "").trim()) {
      await query(
        "UPDATE user_accounts SET password = $1, role = $2, permissions_json = $3, updated_at = $4 WHERE id = $5",
        [String(password), safeRole, safePermissions, now, existing.id]
      );
    } else {
      await query(
        "UPDATE user_accounts SET role = $1, permissions_json = $2, updated_at = $3 WHERE id = $4",
        [safeRole, safePermissions, now, existing.id]
      );
    }
    return { id: existing.id, created: false };
  }

  if (!String(password || "").trim()) {
    throw new Error("Password is required for new user.");
  }

  const result = await query(
    "INSERT INTO user_accounts (username, password, role, permissions_json, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [normalizedUsername, String(password), safeRole, safePermissions, now, now]
  );
  return { id: result.rows[0].id, created: true };
};

const deleteUserAccount = async (username) => {
  const normalizedUsername = String(username || "").trim().toLowerCase();
  if (!normalizedUsername) return false;
  const result = await query(
    "DELETE FROM user_accounts WHERE LOWER(username) = $1",
    [normalizedUsername]
  );
  return result.rowCount > 0;
};

const createBackupSnapshot = async () => {
  const [customers, receipts, transfers, budgets, locks, monthlyCloses, rmbExpenses, userAccounts] =
    await Promise.all([
      query("SELECT id, code, name, name_norm, phone, address, initial_balance, created_at FROM customers ORDER BY id ASC"),
      query("SELECT id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at FROM receipts ORDER BY id ASC"),
      query("SELECT id, transfer_no, sender_id, receiver_id, date, amount, exchange_rate, fee, converted_amount, currency_from, currency_to, sender_receipt_id, receiver_receipt_id, created_at FROM transfers ORDER BY id ASC"),
      query("SELECT id, customer_id, period_type, period_value, category, kind, amount, notes, created_at FROM budgets ORDER BY id ASC"),
      query("SELECT id, date_from, date_to, reason, locked_by, created_at FROM period_locks ORDER BY id ASC"),
      query("SELECT id, month, reason, closed_by, snapshot_json, created_at FROM monthly_closes ORDER BY id ASC"),
      query("SELECT id, customer_id, invoice_no, date, amount, exchange_rate, details, created_at FROM rmb_expenses ORDER BY id ASC"),
      query("SELECT id, username, password, role, permissions_json, created_at, updated_at FROM user_accounts ORDER BY id ASC"),
    ]);

  return {
    version: 1,
    createdAt: nowIso(),
    data: {
      customers: customers.rows,
      receipts: receipts.rows,
      transfers: transfers.rows,
      budgets: budgets.rows,
      locks: locks.rows,
      monthlyCloses: monthlyCloses.rows,
      rmbExpenses: rmbExpenses.rows,
      userAccounts: userAccounts.rows,
    },
  };
};

const restoreBackupSnapshot = async (snapshot) => {
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

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Delete in correct order to respect foreign keys (children first)
    await client.query("DELETE FROM transfers");
    await client.query("DELETE FROM rmb_expenses");
    await client.query("DELETE FROM budgets");
    await client.query("DELETE FROM audit_logs");
    await client.query("DELETE FROM period_locks");
    await client.query("DELETE FROM monthly_closes");
    await client.query("DELETE FROM user_accounts");
    await client.query("DELETE FROM receipts");
    await client.query("DELETE FROM customers");

    for (const row of customers) {
      await client.query(
        "INSERT INTO customers (id, code, name, name_norm, phone, address, initial_balance, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [row.id, row.code, row.name, row.name_norm, row.phone || "", row.address || "", Number(row.initial_balance || 0), row.created_at || nowIso()]
      );
    }

    for (const row of receipts) {
      await client.query(
        "INSERT INTO receipts (id, invoice_no, customer_id, date, type, amount, sender_name, receiver_name, delivery_date, details, attachment_url, attachment_name, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        [row.id, row.invoice_no, row.customer_id, row.date, row.type, Number(row.amount || 0), row.sender_name || "", row.receiver_name || "", row.delivery_date || "", row.details || "", row.attachment_url || "", row.attachment_name || "", row.created_at || nowIso()]
      );
    }

    for (const row of transfers) {
      await client.query(
        "INSERT INTO transfers (id, transfer_no, sender_id, receiver_id, date, amount, exchange_rate, fee, converted_amount, currency_from, currency_to, sender_receipt_id, receiver_receipt_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
        [row.id, row.transfer_no, row.sender_id, row.receiver_id, row.date, Number(row.amount || 0), Number(row.exchange_rate || 0), Number(row.fee || 0), Number(row.converted_amount || 0), row.currency_from || "", row.currency_to || "", row.sender_receipt_id, row.receiver_receipt_id, row.created_at || nowIso()]
      );
    }

    const customerIds = new Set(customers.map(c => c.id));
    for (const row of budgets) {
      const cid = row.customer_id && customerIds.has(row.customer_id) ? row.customer_id : null;
      await client.query(
        "INSERT INTO budgets (id, customer_id, period_type, period_value, category, kind, amount, notes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [row.id, cid, row.period_type, row.period_value, row.category, row.kind, Number(row.amount || 0), row.notes || "", row.created_at || nowIso()]
      );
    }

    for (const row of locks) {
      await client.query(
        "INSERT INTO period_locks (id, date_from, date_to, reason, locked_by, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
        [row.id, row.date_from, row.date_to, row.reason || "", row.locked_by || "", row.created_at || nowIso()]
      );
    }

    for (const row of monthlyCloses) {
      await client.query(
        "INSERT INTO monthly_closes (id, month, reason, closed_by, snapshot_json, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
        [row.id, row.month, row.reason || "", row.closed_by || "", row.snapshot_json || "{}", row.created_at || nowIso()]
      );
    }

    for (const row of rmbExpenses) {
      await client.query(
        "INSERT INTO rmb_expenses (id, customer_id, invoice_no, date, amount, exchange_rate, details, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [row.id, row.customer_id || null, row.invoice_no || "", row.date, Number(row.amount || 0), Number(row.exchange_rate || 0) > 0 ? Number(row.exchange_rate) : null, row.details || "", row.created_at || nowIso()]
      );
    }

    for (const row of userAccounts) {
      await client.query(
        "INSERT INTO user_accounts (id, username, password, role, permissions_json, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [row.id, String(row.username || "").trim().toLowerCase(), String(row.password || ""), String(row.role || "viewer"), row.permissions_json || "", row.created_at || nowIso(), row.updated_at || nowIso()]
      );
    }

    // Reset sequences to max id values
    const tables = ["customers", "receipts", "transfers", "budgets", "period_locks", "monthly_closes", "rmb_expenses", "user_accounts", "audit_logs"];
    for (const table of tables) {
      await client.query(
        `SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE((SELECT MAX(id) FROM ${table}), 1))`
      );
    }

    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  query,
  initDb,
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
  ensureInitialBalanceColumn,
  ensureTransferColumns,
  ensureBudgetCustomerColumn,
  ensureRmbExpenseColumns,
  ensureReceiptAttachmentColumns,
  ensureReceiptTypeNames,
  ensureBudgetCategoryNames,
  ensureTransportItemsPositive,
};
