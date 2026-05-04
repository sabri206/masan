const statusPill = document.getElementById("status-pill");
const installAppButton = document.getElementById("install-app");
const logoutButton = document.getElementById("logout-btn");
const forceRefreshButton = document.getElementById("force-refresh-btn");
const liteModeToggle = document.getElementById("lite-mode-toggle");
const themeSelect = document.getElementById("theme-select");
const toastStack = document.getElementById("toast-stack");

const authOverlay = document.getElementById("auth-overlay");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginSubmit = document.getElementById("login-submit");
const loginMessage = document.getElementById("login-message");
const termsDay = document.getElementById("terms-day");
const termsDate = document.getElementById("terms-date");
const termsTime = document.getElementById("terms-time");

const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");

const customerCode = document.getElementById("customer-code");
const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const customerAddress = document.getElementById("customer-address");
const customerInitialBalance = document.getElementById("customer-initial-balance");
const customerSave = document.getElementById("customer-save");
const customerReset = document.getElementById("customer-reset");
const customerMessage = document.getElementById("customer-message");
const customersTable = document.getElementById("customers-table");
const timelineCustomer = document.getElementById("timeline-customer");
const timelineLimit = document.getElementById("timeline-limit");
const timelineLoad = document.getElementById("timeline-load");
const timelineTable = document.getElementById("timeline-table");
const timelineMessage = document.getElementById("timeline-message");

const receiptSender = document.getElementById("receipt-sender");
const receiptReceiver = document.getElementById("receipt-receiver");
const receiptPartyDetails = document.getElementById("receipt-party-details");
const receiptInvoice = document.getElementById("receipt-invoice");
const receiptDate = document.getElementById("receipt-date");
const receiptType = document.getElementById("receipt-type");
const receiptAmount = document.getElementById("receipt-amount");
const receiptDelivery = document.getElementById("receipt-delivery");
const receiptMore = document.getElementById("receipt-details");
const receiptAutoInvoice = document.getElementById("receipt-auto-invoice");
const receiptSave = document.getElementById("receipt-save");
const receiptCreateInvoice = document.getElementById("receipt-create-invoice");
const receiptReset = document.getElementById("receipt-reset");
const receiptMessage = document.getElementById("receipt-message");
const receiptsTable = document.getElementById("receipts-table");
const receiptAttachmentFile = document.getElementById("receipt-attachment-file");
const receiptAttachmentUpload = document.getElementById("receipt-attachment-upload");
const receiptAttachmentClear = document.getElementById("receipt-attachment-clear");
const receiptAttachmentStatus = document.getElementById("receipt-attachment-status");

const invoiceNumber = document.getElementById("invoice-number");
const invoiceDate = document.getElementById("invoice-date");
const invoiceCustomer = document.getElementById("invoice-customer");
const invoiceBrand = document.getElementById("invoice-brand");
const invoiceMaterial = document.getElementById("invoice-material");
const invoiceCartons = document.getElementById("invoice-cartons");
const invoiceCbm = document.getElementById("invoice-cbm");
const invoiceRmbAmount = document.getElementById("invoice-rmb-amount");
const invoiceRmbConverted = document.getElementById("invoice-rmb-converted");
const invoiceExchangeRate = document.getElementById("invoice-exchange-rate");
const invoiceUsdAmount = document.getElementById("invoice-usd-amount");
const invoiceTransportAmount = document.getElementById("invoice-transport-amount");
const invoiceTransportTotal = document.getElementById("invoice-transport-total");
const invoiceReportLinkMode = document.getElementById("invoice-report-link-mode");
const invoiceSpendRmb = document.getElementById("invoice-spend-rmb");
const invoiceDetails = document.getElementById("invoice-details");
const invoiceSave = document.getElementById("invoice-save");
const invoicePrint = document.getElementById("invoice-print");
const invoiceReset = document.getElementById("invoice-reset");
const invoiceMessage = document.getElementById("invoice-message");
const invoiceSavedTable = document.getElementById("invoice-saved-table");
const invoiceSavedEmpty = document.getElementById("invoice-saved-empty");
const invoiceSavedSearch = document.getElementById("invoice-saved-search");
const invoiceAttachmentFile = document.getElementById("invoice-attachment-file");
const invoiceAttachmentUpload = document.getElementById("invoice-attachment-upload");
const invoiceAttachmentClear = document.getElementById("invoice-attachment-clear");
const invoiceAttachmentStatus = document.getElementById("invoice-attachment-status");

const transferSender = document.getElementById("transfer-sender");
const transferReceiver = document.getElementById("transfer-receiver");
const transferDate = document.getElementById("transfer-date");
const transferAmount = document.getElementById("transfer-amount");
const transferRate = document.getElementById("transfer-rate");
const transferFee = document.getElementById("transfer-fee");
const transferTotal = document.getElementById("transfer-total");
const transferCurrencyFrom = document.getElementById("transfer-currency-from");
const transferCurrencyTo = document.getElementById("transfer-currency-to");
const transferPartyDetails = document.getElementById("transfer-party-details");
const transferSave = document.getElementById("transfer-save");
const transferReset = document.getElementById("transfer-reset");
const transferMessage = document.getElementById("transfer-message");
const transfersTable = document.getElementById("transfers-table");

const rmbCurrency = document.getElementById("rmb-currency");
const rmbLoad = document.getElementById("rmb-load");
const rmbTable = document.getElementById("rmb-table");
const rmbIncoming = document.getElementById("rmb-incoming");
const rmbOutgoing = document.getElementById("rmb-outgoing");
const rmbTotal = document.getElementById("rmb-total");

const rmbTransferSender = document.getElementById("rmb-transfer-sender");
const rmbTransferReceiver = document.getElementById("rmb-transfer-receiver");
const rmbTransferDate = document.getElementById("rmb-transfer-date");
const rmbTransferAmount = document.getElementById("rmb-transfer-amount");
const rmbTransferRate = document.getElementById("rmb-transfer-rate");
const rmbTransferUsd = document.getElementById("rmb-transfer-usd");
const rmbTransferSave = document.getElementById("rmb-transfer-save");
const rmbTransferReset = document.getElementById("rmb-transfer-reset");
const rmbTransferMessage = document.getElementById("rmb-transfer-message");
const rmbTransfersTable = document.getElementById("rmb-transfers-table");

const ledgerCustomer = document.getElementById("ledger-customer");
const ledgerFrom = document.getElementById("ledger-from");
const ledgerTo = document.getElementById("ledger-to");
const ledgerLoad = document.getElementById("ledger-load");
const ledgerBalance = document.getElementById("ledger-balance");
const ledgerTable = document.getElementById("ledger-table");

const reportCustomer = document.getElementById("report-customer");
const reportFrom = document.getElementById("report-from");
const reportTo = document.getElementById("report-to");
const reportSearch = document.getElementById("report-search");
const reportTable = document.getElementById("report-table");
const reportSaveImage = document.getElementById("report-save-image");
const reportExportExcel = document.getElementById("report-export-excel");
const reportExportPdf = document.getElementById("report-export-pdf");
const reportExportStatement = document.getElementById("report-export-statement");
const reportQuickDaily = document.getElementById("report-quick-daily");
const reportQuickWeekly = document.getElementById("report-quick-weekly");
const reportMonthlyAuto = document.getElementById("report-monthly-auto");
const reportMessage = document.getElementById("report-message");
const reportGalleryList = document.getElementById("report-gallery-list");
const reportGalleryEmpty = document.getElementById("report-gallery-empty");

const dashboardRefresh = document.getElementById("dashboard-refresh");
const dashboardReceivables = document.getElementById("dashboard-receivables");
const dashboardPayables = document.getElementById("dashboard-payables");
const dashboardTransport = document.getElementById("dashboard-transport");
const dashboardMovementToday = document.getElementById("dashboard-movement-today");
const dashboardDebtorsTable = document.getElementById("dashboard-debtors-table");
const dashboardNegativeTable = document.getElementById("dashboard-negative-table");
const dashboardPriorityTable = document.getElementById("dashboard-priority-table");
const dashboardNetDebtors = document.getElementById("dashboard-net-debtors");
const dashboardNetPayables = document.getElementById("dashboard-net-payables");
const dashboardNetDebtorsTotal = document.getElementById("dashboard-net-debtors-total");
const dashboardNetPayablesTotal = document.getElementById("dashboard-net-payables-total");
const dashboardNetFinal = document.getElementById("dashboard-net-final");
const dashboardNetDebtorsSelectAll = document.getElementById("dashboard-net-debtors-select-all");
const dashboardNetDebtorsClear = document.getElementById("dashboard-net-debtors-clear");
const dashboardNetPayablesSelectAll = document.getElementById("dashboard-net-payables-select-all");
const dashboardNetPayablesClear = document.getElementById("dashboard-net-payables-clear");

const salesCustomer = document.getElementById("sales-customer");
const salesFrom = document.getElementById("sales-from");
const salesTo = document.getElementById("sales-to");
const salesLoad = document.getElementById("sales-load");
const salesTable = document.getElementById("sales-table");
const salesTotal = document.getElementById("sales-total");
const salesCount = document.getElementById("sales-count");
const salesCustomers = document.getElementById("sales-customers");

const budgetPeriodType = document.getElementById("budget-period-type");
const budgetCustomer = document.getElementById("budget-customer");
const budgetPeriodMonthRow = document.getElementById("budget-period-month-row");
const budgetPeriodMonth = document.getElementById("budget-period-month");
const budgetPeriodYearRow = document.getElementById("budget-period-year-row");
const budgetPeriodYear = document.getElementById("budget-period-year");
const budgetCategory = document.getElementById("budget-category");
const budgetKind = document.getElementById("budget-kind");
const budgetAmount = document.getElementById("budget-amount");
const budgetNotes = document.getElementById("budget-notes");
const budgetSave = document.getElementById("budget-save");
const budgetReset = document.getElementById("budget-reset");
const budgetLoad = document.getElementById("budget-load");
const budgetMessage = document.getElementById("budget-message");
const budgetTable = document.getElementById("budget-table");
const budgetIncomeTotal = document.getElementById("budget-income-total");
const budgetExpenseTotal = document.getElementById("budget-expense-total");
const budgetNetTotal = document.getElementById("budget-net-total");
const budgetActualIncome = document.getElementById("budget-actual-income");
const budgetActualExpense = document.getElementById("budget-actual-expense");
const budgetActualNet = document.getElementById("budget-actual-net");
const budgetDiffIncome = document.getElementById("budget-diff-income");
const budgetDiffExpense = document.getElementById("budget-diff-expense");
const budgetDiffNet = document.getElementById("budget-diff-net");

const backupDownload = document.getElementById("backup-download");
const backupFile = document.getElementById("backup-file");
const backupConfirm = document.getElementById("backup-confirm");
const backupRestore = document.getElementById("backup-restore");
const backupMessage = document.getElementById("backup-message");
const backupListRefresh = document.getElementById("backup-list-refresh");
const backupListTable = document.getElementById("backup-list-table");
const opsBackupsCount = document.getElementById("ops-backups-count");
const opsLocksCount = document.getElementById("ops-locks-count");
const opsAuditCount = document.getElementById("ops-audit-count");
const opsBackupsBadge = document.getElementById("ops-backups-badge");
const opsLocksBadge = document.getElementById("ops-locks-badge");
const opsAuditBadge = document.getElementById("ops-audit-badge");
const opsAlertsTotal = document.getElementById("ops-alerts-total");
const opsAlertsBadge = document.getElementById("ops-alerts-badge");
const opsAlertsTable = document.getElementById("ops-alerts-table");
const opsOverviewCards = document.getElementById("ops-overview-cards");
const opsAlertsCard = document.getElementById("ops-alerts-card");
const opsBackupsCard = document.getElementById("ops-backups-card");
const opsLocksCard = document.getElementById("ops-locks-card");
const opsAuditCard = document.getElementById("ops-audit-card");
const opsNotifyCard = document.getElementById("ops-notify-card");
const opsBrandingCard = document.getElementById("ops-branding-card");
const opsShortcutsCard = document.getElementById("ops-shortcuts-card");
const opsCloudBackupCard = document.getElementById("ops-cloud-backup-card");
const opsKpiCard = document.getElementById("ops-kpi-card");
const opsMonthlyCloseCard = document.getElementById("ops-monthly-close-card");
const opsImportCard = document.getElementById("ops-import-card");

const lockDate = document.getElementById("lock-date");
const lockReason = document.getElementById("lock-reason");
const lockSave = document.getElementById("lock-save");
const lockRefresh = document.getElementById("lock-refresh");
const lockTable = document.getElementById("lock-table");
const lockMessage = document.getElementById("lock-message");

const auditUser = document.getElementById("audit-user");
const auditAction = document.getElementById("audit-action");
const auditEntity = document.getElementById("audit-entity");
const auditDetails = document.getElementById("audit-details");
const auditFrom = document.getElementById("audit-from");
const auditTo = document.getElementById("audit-to");
const auditSearch = document.getElementById("audit-search");
const auditQuick24h = document.getElementById("audit-quick-24h");
const auditQuick7d = document.getElementById("audit-quick-7d");
const auditClearDates = document.getElementById("audit-clear-dates");
const auditExportExcel = document.getElementById("audit-export-excel");
const auditColumnToggles = Array.from(document.querySelectorAll("[data-audit-col-toggle]"));
const auditTable = document.getElementById("audit-table");
const auditMessage = document.getElementById("audit-message");

const kpiMonth = document.getElementById("kpi-month");
const kpiLoad = document.getElementById("kpi-load");
const kpiTable = document.getElementById("kpi-table");
const kpiMessage = document.getElementById("kpi-message");

const monthlyCloseMonth = document.getElementById("monthly-close-month");
const monthlyCloseReason = document.getElementById("monthly-close-reason");
const monthlyCloseSave = document.getElementById("monthly-close-save");
const monthlyCloseRefresh = document.getElementById("monthly-close-refresh");
const monthlyCloseTable = document.getElementById("monthly-close-table");
const monthlyCloseMessage = document.getElementById("monthly-close-message");

const importType = document.getElementById("import-type");
const importFile = document.getElementById("import-file");
const importPreview = document.getElementById("import-preview");
const importCommit = document.getElementById("import-commit");
const importPreviewHead = document.getElementById("import-preview-head");
const importPreviewTable = document.getElementById("import-preview-table");
const importMessage = document.getElementById("import-message");
const usersAdminCard = document.getElementById("users-admin-card");
const userAdminUsername = document.getElementById("user-admin-username");
const userAdminPassword = document.getElementById("user-admin-password");
const userAdminRole = document.getElementById("user-admin-role");
const permissionsGrid = document.getElementById("permissions-grid");
const userAdminSave = document.getElementById("user-admin-save");
const userAdminReset = document.getElementById("user-admin-reset");
const userAdminRefresh = document.getElementById("user-admin-refresh");
const usersAdminTable = document.getElementById("users-admin-table");
const userAdminMessage = document.getElementById("user-admin-message");

const alertsEnable = document.getElementById("alerts-enable");
const alertsNotifyState = document.getElementById("alerts-notify-state");
const alertsTest = document.getElementById("alerts-test");
const alertsMessage = document.getElementById("alerts-message");
const brandingLogo = document.getElementById("branding-logo");
const brandingStamp = document.getElementById("branding-stamp");
const brandingSave = document.getElementById("branding-save");
const brandingMessage = document.getElementById("branding-message");
const shortcutsHelp = document.getElementById("shortcuts-help");
const shortcutsMessage = document.getElementById("shortcuts-message");
const cloudBackupDrive = document.getElementById("cloud-backup-drive");
const cloudBackupOnedrive = document.getElementById("cloud-backup-onedrive");
const cloudBackupMessage = document.getElementById("cloud-backup-message");

let cachedCustomers = [];
let cachedBudgetItems = [];
let deferredInstallPrompt = null;
let currentUserRole = "viewer";
let opsHeartbeatTimer = null;
let currentPermissions = {};
let importPreviewRows = [];
let lastAlertsTotal = 0;
let currentReceiptAttachment = { url: "", name: "" };
let currentInvoiceAttachment = { url: "", name: "" };
let lastAuditRows = [];
let auditColumnsInitialized = false;
let userPermissionKeys = [];
let userRoleDefaults = {};

const AUTH_TOKEN_KEY = "masanAuthToken";
const AUTO_INVOICE_KEY = "masanAutoInvoiceEnabled";
const SAVED_INVOICES_KEY = "masanSavedInvoices";
const OFFICIAL_INVOICE_COUNTER_KEY = "masanOfficialInvoiceCounter";
const LITE_MODE_KEY = "masanLiteMode";
const THEME_VARIANT_KEY = "masanThemeVariant";
const BRANDING_KEY = "masanPrintBranding";
const ALERTS_NOTIFY_KEY = "masanAlertNotifications";
const AUDIT_VISIBLE_COLS_KEY = "masanAuditVisibleColumns";
const MAX_SAVED_INVOICES = 200;
const THEME_VARIANTS = [
  { id: "warm", label: "دافئ" },
  { id: "ocean", label: "محيطي" },
  { id: "mono", label: "حيادي" },
];

const ROLE_LABELS_AR = {
  admin: "مدير النظام",
  accountant: "محاسب",
  viewer: "مشاهد",
};

const PERMISSION_LABELS_AR = {
  customers_write: "إدارة الزبائن",
  receipts_write: "إدارة الوصولات",
  transfers_write: "إدارة التحويلات",
  budget_write: "إدارة الميزانية",
  delete_records: "حذف السجلات",
  import_data: "استيراد البيانات",
  locks_manage: "إدارة الأقفال",
  audit_view: "عرض سجل التدقيق",
  monthly_close: "إغلاق الشهر",
  monthly_override: "تجاوز إغلاق الشهر",
  backups_view: "عرض النسخ الاحتياطية",
  backups_restore: "استرجاع النسخ الاحتياطية",
  timeline_view: "عرض السجل الزمني",
  alerts_view: "عرض التنبيهات",
  kpi_view: "عرض مؤشرات الأداء",
  export_reports: "تصدير التقارير",
};

const PERMISSION_GROUPS_AR = [
  {
    id: "accounting",
    label: "المحاسبة والعمليات",
    keys: ["customers_write", "receipts_write", "transfers_write", "budget_write", "delete_records", "import_data"],
  },
  {
    id: "security",
    label: "الأمان والرقابة",
    keys: ["locks_manage", "audit_view", "monthly_close", "monthly_override"],
  },
  {
    id: "backup",
    label: "النسخ الاحتياطي",
    keys: ["backups_view", "backups_restore"],
  },
  {
    id: "reports",
    label: "التقارير والمتابعة",
    keys: ["timeline_view", "alerts_view", "kpi_view", "export_reports"],
  },
];

const getRoleLabelAr = (roleKey) => ROLE_LABELS_AR[roleKey] || roleKey;
const getPermissionLabelAr = (permissionKey) => PERMISSION_LABELS_AR[permissionKey] || permissionKey;

const getOrderedPermissionKeys = (keys) => {
  const list = Array.isArray(keys) ? keys : [];
  const knownOrder = PERMISSION_GROUPS_AR.flatMap((group) => group.keys);
  const orderedKnown = knownOrder.filter((key) => list.includes(key));
  const extras = list.filter((key) => !knownOrder.includes(key)).sort();
  return [...orderedKnown, ...extras];
};

const buildPermissionGroups = (keys) => {
  const available = new Set(Array.isArray(keys) ? keys : []);
  const groups = PERMISSION_GROUPS_AR.map((group) => ({
    id: group.id,
    label: group.label,
    keys: group.keys.filter((key) => available.has(key)),
  })).filter((group) => group.keys.length > 0);

  const known = new Set(PERMISSION_GROUPS_AR.flatMap((group) => group.keys));
  const extras = Array.from(available).filter((key) => !known.has(key)).sort();
  if (extras.length) {
    groups.push({
      id: "other",
      label: "صلاحيات أخرى",
      keys: extras,
    });
  }
  return groups;
};

const AUDIT_COLUMNS = ["created_at", "username", "role", "action", "entity_type", "entity_id", "details"];
const DEFAULT_AUDIT_COLUMNS = ["created_at", "username", "action", "entity_type"];

const loadVisibleAuditColumns = () => {
  try {
    const raw = localStorage.getItem(AUDIT_VISIBLE_COLS_KEY);
    if (!raw) return [...DEFAULT_AUDIT_COLUMNS];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...DEFAULT_AUDIT_COLUMNS];
    const valid = parsed.filter((col) => AUDIT_COLUMNS.includes(col));
    return valid.length ? valid : [...DEFAULT_AUDIT_COLUMNS];
  } catch (err) {
    return [...DEFAULT_AUDIT_COLUMNS];
  }
};

const saveVisibleAuditColumns = (cols) => {
  const valid = Array.from(new Set((cols || []).filter((col) => AUDIT_COLUMNS.includes(col))));
  localStorage.setItem(AUDIT_VISIBLE_COLS_KEY, JSON.stringify(valid.length ? valid : DEFAULT_AUDIT_COLUMNS));
};

const getVisibleAuditColumns = () => {
  const selected = auditColumnToggles
    .filter((toggle) => toggle.checked)
    .map((toggle) => toggle.dataset.auditColToggle)
    .filter((col) => AUDIT_COLUMNS.includes(col));
  return selected.length ? selected : [...DEFAULT_AUDIT_COLUMNS];
};

const applyAuditColumnVisibility = () => {
  const visible = new Set(getVisibleAuditColumns());
  const headerCells = document.querySelectorAll("th[data-audit-col]");
  headerCells.forEach((cell) => {
    const col = cell.getAttribute("data-audit-col");
    cell.style.display = visible.has(col) ? "" : "none";
  });

  const rowCells = document.querySelectorAll("#audit-table td[data-audit-col]");
  rowCells.forEach((cell) => {
    const col = cell.getAttribute("data-audit-col");
    cell.style.display = visible.has(col) ? "" : "none";
  });

  const emptyCell = auditTable?.querySelector("td[data-audit-empty='1']");
  if (emptyCell) {
    emptyCell.colSpan = Math.max(1, visible.size);
  }
};

const setupAuditColumnToggles = () => {
  if (!auditColumnToggles.length) return;
  if (auditColumnsInitialized) {
    applyAuditColumnVisibility();
    return;
  }
  auditColumnsInitialized = true;
  const visible = new Set(loadVisibleAuditColumns());
  auditColumnToggles.forEach((toggle) => {
    const col = toggle.dataset.auditColToggle;
    toggle.checked = visible.has(col);
    toggle.addEventListener("change", () => {
      const selected = getVisibleAuditColumns();
      if (!selected.length) {
        toggle.checked = true;
        return;
      }
      saveVisibleAuditColumns(selected);
      applyAuditColumnVisibility();
    });
  });
  saveVisibleAuditColumns(Array.from(visible));
  applyAuditColumnVisibility();
};

const renderPermissionsGrid = (selectedPermissions = {}) => {
  if (!permissionsGrid) return;
  if (!userPermissionKeys.length) {
    permissionsGrid.innerHTML = "<div class='permissions-empty'>لا توجد صلاحيات متاحة.</div>";
    return;
  }
  const groups = buildPermissionGroups(userPermissionKeys);
  permissionsGrid.innerHTML = groups
    .map((group) => {
      const items = group.keys
        .map((key) => {
          const checked = selectedPermissions[key] ? "checked" : "";
          return `<label class="permission-item"><input type="checkbox" data-permission-key="${escapeHtml(key)}" ${checked} />${escapeHtml(getPermissionLabelAr(key))}</label>`;
        })
        .join("");
      return `<div class="permission-group"><div class="permission-group-title">${escapeHtml(group.label)}</div><div class="permission-group-items">${items}</div></div>`;
    })
    .join("");
};

const collectSelectedPermissions = () => {
  const selected = {};
  const boxes = permissionsGrid ? permissionsGrid.querySelectorAll("input[data-permission-key]") : [];
  boxes.forEach((box) => {
    selected[box.dataset.permissionKey] = Boolean(box.checked);
  });
  return selected;
};

const resetUserAdminForm = () => {
  if (userAdminUsername) userAdminUsername.value = "";
  if (userAdminPassword) userAdminPassword.value = "";
  if (userAdminRole) userAdminRole.value = "viewer";
  renderPermissionsGrid(userRoleDefaults.viewer || {});
};

const loadUserPermissionsConfig = async () => {
  if (!usersAdminCard || currentUserRole !== "admin") return;
  const data = await api("/api/system/permissions");
  userPermissionKeys = getOrderedPermissionKeys(Array.isArray(data?.permissions) ? data.permissions : []);
  userRoleDefaults = data?.roleDefaults && typeof data.roleDefaults === "object" ? data.roleDefaults : {};
  const roleKey = userAdminRole?.value || "viewer";
  renderPermissionsGrid(userRoleDefaults[roleKey] || {});
};

const loadUsersAdminTable = async () => {
  if (!usersAdminTable || currentUserRole !== "admin") return;
  const rows = await api("/api/system/users");
  usersAdminTable.innerHTML = (rows || [])
    .map((row) => {
      const perms = Object.entries(row.permissions || {})
        .filter((entry) => entry[1])
        .map((entry) => getPermissionLabelAr(entry[0]))
        .join(", ");
      const actions = row.editable
        ? `<button class="secondary" data-user-edit="${escapeHtml(row.username)}">تعديل</button>
           <button class="secondary" data-user-delete="${escapeHtml(row.username)}">حذف</button>`
        : "-";
      return `
        <tr data-user-row="${escapeHtml(row.username)}" data-user-role="${escapeHtml(row.role)}" data-user-source="${escapeHtml(row.source || "")}" data-user-perms="${escapeHtml(JSON.stringify(row.permissions || {}))}">
          <td>${escapeHtml(row.username)}</td>
          <td>${escapeHtml(getRoleLabelAr(row.role))}</td>
          <td>${escapeHtml(row.source || "-")}</td>
          <td>${escapeHtml(perms || "-")}</td>
          <td>${actions}</td>
        </tr>
      `;
    })
    .join("");
  if (!rows?.length) {
    usersAdminTable.innerHTML = "<tr><td colspan='5'>لا يوجد مستخدمون.</td></tr>";
  }
};

const getOfficialInvoiceNo = (dateValue = "") => {
  const year = (dateValue || new Date().toISOString().slice(0, 10)).slice(0, 4) || String(new Date().getFullYear());
  let counters = {};
  try {
    counters = JSON.parse(localStorage.getItem(OFFICIAL_INVOICE_COUNTER_KEY) || "{}");
  } catch (err) {
    counters = {};
  }
  const next = Number(counters[year] || 0) + 1;
  counters[year] = next;
  localStorage.setItem(OFFICIAL_INVOICE_COUNTER_KEY, JSON.stringify(counters));
  return `INV-${year}-${String(next).padStart(6, "0")}`;
};

const buildRiskWarnings = ({ amount, exchangeRate, contextLabel }) => {
  const warnings = [];
  const absAmount = Math.abs(Number(amount || 0));
  const rate = Number(exchangeRate || 0);
  if (absAmount >= 1000000) {
    warnings.push(`المبلغ كبير جدًا (${formatMoney(absAmount)}).`);
  }
  if (rate && (rate > 100 || rate < 0.01)) {
    warnings.push(`سعر الصرف غير معتاد (${formatTransferValue(rate)}).`);
  }
  if (!warnings.length) {
    return true;
  }
  const message = [`تحذير قبل حفظ ${contextLabel}:`, ...warnings, "هل تريد المتابعة؟"].join("\n");
  return window.confirm(message);
};

const getAuthToken = () => "";
const setAuthToken = (token) => {
  // Cookie-based session is authoritative; keep local storage token disabled.
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

const loadBranding = () => {
  try {
    return JSON.parse(localStorage.getItem(BRANDING_KEY) || "{}") || {};
  } catch (err) {
    return {};
  }
};

const saveBranding = (branding) => {
  localStorage.setItem(BRANDING_KEY, JSON.stringify(branding || {}));
};

const loadBrandingIntoForm = () => {
  const branding = loadBranding();
  if (brandingLogo) {
    brandingLogo.value = String(branding.logo || "");
  }
  if (brandingStamp) {
    brandingStamp.value = String(branding.stamp || "");
  }
};

const isValidImageLogoUrl = (value) => {
  const url = String(value || "").trim();
  if (!url) return true;
  if (url.startsWith("data:image/")) return true;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }
    const pathname = parsed.pathname.toLowerCase();
    return /(\.(png|jpg|jpeg|webp|gif|svg))$/.test(pathname);
  } catch (err) {
    return false;
  }
};

const getBrandingHeaderHtml = () => {
  const branding = loadBranding();
  const logo = String(branding.logo || "").trim();
  const stamp = String(branding.stamp || "").trim();
  const logoHtml = logo
    ? `<img src="${logo.replaceAll('"', '&quot;')}" alt="logo" style="height:56px;max-width:180px;object-fit:contain" />`
    : "";
  const stampHtml = stamp
    ? `<div style="font-size:12px;color:#4f4f4f;border:1px dashed #bbb;padding:6px 10px;border-radius:8px;display:inline-block">${stamp
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")}</div>`
    : "";
  if (!logoHtml && !stampHtml) return "";
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;padding:8px 20px 0;">
      <div>${logoHtml}</div>
      <div>${stampHtml}</div>
    </div>
  `;
};

const showToast = (text, type = "info") => {
  if (!toastStack) return;
  const toast = document.createElement("div");
  toast.className = `toast-item ${type}`;
  toast.textContent = text;
  toastStack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 260);
  }, 3600);
};

const setLiteMode = (enabled) => {
  document.body.classList.toggle("lite-mode", Boolean(enabled));
  localStorage.setItem(LITE_MODE_KEY, enabled ? "1" : "0");
  if (liteModeToggle) {
    liteModeToggle.textContent = enabled ? "وضع عادي" : "وضع خفيف";
  }
};

const isLiteModeEnabled = () => localStorage.getItem(LITE_MODE_KEY) === "1";
const toggleLiteMode = () => setLiteMode(!isLiteModeEnabled());
const getThemeVariant = () => {
  const saved = String(localStorage.getItem(THEME_VARIANT_KEY) || "warm").toLowerCase();
  return THEME_VARIANTS.find((item) => item.id === saved)?.id || "warm";
};

const applyThemeVariant = (variantId) => {
  const active = THEME_VARIANTS.find((item) => item.id === variantId) || THEME_VARIANTS[0];
  document.body.setAttribute("data-theme", active.id);
  localStorage.setItem(THEME_VARIANT_KEY, active.id);
  if (themeSelect) {
    themeSelect.value = active.id;
    themeSelect.title = `القالب الحالي: ${active.label}`;
  }
};

const isAlertsNotifyEnabled = () => localStorage.getItem(ALERTS_NOTIFY_KEY) === "1";
const setAlertsNotifyEnabled = (enabled) => localStorage.setItem(ALERTS_NOTIFY_KEY, enabled ? "1" : "0");

const updateAlertsNotifyUi = () => {
  const enabled = isAlertsNotifyEnabled();
  if (alertsEnable) {
    alertsEnable.textContent = enabled ? "إيقاف إشعارات النظام" : "تفعيل إشعارات النظام";
  }
  if (alertsNotifyState) {
    setOpsBadgeState(alertsNotifyState, enabled ? "مفعلة" : "غير مفعلة", enabled ? "ok" : "warn");
  }
};

const playAlertBeep = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.23);
  } catch (err) {
    // Audio is optional.
  }
};

const getScreenOrder = () =>
  Array.from(document.querySelectorAll(".nav-btn")).map((btn) => btn.dataset.screen).filter(Boolean);

const isTypingTarget = (target) => {
  if (!target || !(target instanceof Element)) return false;
  const tag = String(target.tagName || "").toUpperCase();
  if (["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(tag)) return true;
  return Boolean(target.closest('[contenteditable="true"]'));
};

const getActiveScreenId = () => {
  const active = document.querySelector(".screen.active");
  return active?.id || "";
};

const getQuickSaveButtonForScreen = (screenId) => {
  const map = {
    "customers-add": customerSave,
    receipts: receiptSave,
    "invoice-builder": invoiceSave,
    transfers: transferSave,
    "rmb-balance": rmbTransferSave,
    budget: budgetSave,
    backup: backupRestore,
    ops: monthlyCloseSave,
  };
  return map[screenId] || null;
};

const triggerQuickSave = () => {
  const screenId = getActiveScreenId();
  const saveButton = getQuickSaveButtonForScreen(screenId);
  if (!saveButton || saveButton.disabled) {
    showToast("لا يوجد حفظ سريع متاح لهذه الشاشة.", "warn");
    return false;
  }
  saveButton.click();
  showToast("تم تنفيذ الحفظ السريع.", "ok");
  return true;
};

const getShortcutsHtml = () => {
  const rows = [
    ["Option + 1 .. 9", "التنقل بين الشاشات 1 إلى 9"],
    ["Option + Shift + 1 .. 3", "التنقل إلى الشاشات 10 إلى 12"],
    ["Option + S", "حفظ سريع حسب الشاشة الحالية"],
    ["Option + R", "تحديث المؤشرات في لوحة المؤشرات"],
    ["Option + L", "تفعيل/تعطيل الوضع الخفيف"],
    ["Esc", "إغلاق نافذة عرض الاختصارات"],
  ];

  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr>
          <th style="text-align:right;border-bottom:1px solid #ddd;padding:8px">الاختصار</th>
          <th style="text-align:right;border-bottom:1px solid #ddd;padding:8px">الوظيفة</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0"><kbd style="padding:2px 6px;border:1px solid #ccc;border-radius:6px;background:#fafafa">${row[0]}</kbd></td>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0">${row[1]}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
};

const showShortcutHelp = () => {
  const previous = document.getElementById("shortcuts-overlay");
  if (previous) {
    previous.remove();
  }

  const overlay = document.createElement("div");
  overlay.id = "shortcuts-overlay";
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "background:rgba(10,20,30,.58)",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "z-index:9999",
    "padding:20px",
  ].join(";");

  const card = document.createElement("div");
  card.style.cssText = [
    "width:min(680px,96vw)",
    "max-height:88vh",
    "overflow:auto",
    "background:#fff",
    "border-radius:14px",
    "box-shadow:0 24px 60px rgba(0,0,0,.22)",
    "padding:18px",
    "direction:rtl",
  ].join(";");

  card.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px">
      <h3 style="margin:0;font-size:18px">اختصارات الكيبورد</h3>
      <button type="button" id="shortcuts-close" class="secondary">إغلاق</button>
    </div>
    ${getShortcutsHtml()}
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  const closeButton = card.querySelector("#shortcuts-close");
  closeButton?.addEventListener("click", close);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  const onEsc = (event) => {
    if (event.key === "Escape") {
      close();
      window.removeEventListener("keydown", onEsc);
    }
  };
  window.addEventListener("keydown", onEsc);

  showMessage(shortcutsMessage, "تم فتح قائمة الاختصارات.", true);
};

const isAutoInvoiceEnabled = () => localStorage.getItem(AUTO_INVOICE_KEY) !== "0";

const setAutoInvoiceEnabled = (enabled) => {
  localStorage.setItem(AUTO_INVOICE_KEY, enabled ? "1" : "0");
  if (receiptAutoInvoice) {
    receiptAutoInvoice.checked = enabled;
  }
};

const api = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = { ...(options.headers || {}) };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers, credentials: "same-origin" });
  if (!res.ok) {
    if (res.status === 401) {
      setAuthToken("");
      showLogin(true);
    }
    const contentType = res.headers.get("content-type") || "";
    let message = "خطأ في الطلب";

    let errorCode = "";
    let errorPayload = null;
    if (contentType.includes("application/json")) {
      const data = await res.json().catch(() => ({}));
      message = data.message || message;
      errorCode = data.code || "";
      errorPayload = data;
    } else {
      const text = await res.text().catch(() => "");
      if (
        res.status === 404 &&
        url.includes("/api/receipts/transport-item")
      ) {
        message = "الرجاء إعادة تشغيل السيرفر ثم المحاولة مرة أخرى.";
      } else if (res.status === 404 && url.includes("/api/rmb-expenses")) {
        message = "خدمة صرف الرممبي غير مفعلة حالياً. الرجاء إعادة تشغيل السيرفر.";
      } else if (text && text.length < 200) {
        message = text;
      }
    }

    const error = new Error(message);
    if (errorCode) {
      error.code = errorCode;
    }
    if (errorPayload) {
      error.payload = errorPayload;
    }
    throw error;
  }
  return res.json();
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const sanitizeHttpUrl = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw, window.location.origin);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }
    return parsed.href;
  } catch (err) {
    return "";
  }
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : "";
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("تعذر قراءة الملف."));
    reader.readAsDataURL(file);
  });

const renderAttachmentStatus = (statusElement, attachment) => {
  if (!statusElement) return;
  const name = String(attachment?.name || "").trim();
  const url = String(attachment?.url || "").trim();
  const safeUrl = sanitizeHttpUrl(url);
  if (!safeUrl) {
    statusElement.textContent = "لا يوجد مرفق.";
    statusElement.className = "inline-message";
    return;
  }
  const safeName = escapeHtml(name || "مرفق");
  statusElement.innerHTML = `المرفق الحالي: <a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener">${safeName}</a>`;
  statusElement.className = "inline-message success";
};

const uploadAttachment = async (file) => {
  if (!file) {
    throw new Error("اختر ملفًا أولاً.");
  }
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("حجم الملف أكبر من 5MB.");
  }
  const dataBase64 = await fileToBase64(file);
  const response = await api("/api/attachments/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      dataBase64,
    }),
  });
  return {
    url: String(response?.url || "").trim(),
    name: String(response?.fileName || file.name || "").trim(),
  };
};

const setReceiptAttachment = (attachment = { url: "", name: "" }) => {
  currentReceiptAttachment = {
    url: String(attachment?.url || "").trim(),
    name: String(attachment?.name || "").trim(),
  };
  renderAttachmentStatus(receiptAttachmentStatus, currentReceiptAttachment);
};

const setInvoiceAttachment = (attachment = { url: "", name: "" }) => {
  currentInvoiceAttachment = {
    url: String(attachment?.url || "").trim(),
    name: String(attachment?.name || "").trim(),
  };
  renderAttachmentStatus(invoiceAttachmentStatus, currentInvoiceAttachment);
};

setReceiptAttachment({ url: "", name: "" });
setInvoiceAttachment({ url: "", name: "" });

const setStatus = (text, ok = true) => {
  statusPill.textContent = text;
  statusPill.style.background = ok ? "var(--sea)" : "var(--rose)";
};

const hasPermission = (permission) => Boolean(currentPermissions?.[permission]);
const canWrite = () =>
  hasPermission("customers_write") ||
  hasPermission("receipts_write") ||
  hasPermission("transfers_write") ||
  hasPermission("budget_write");
const canDelete = () => hasPermission("delete_records");

const setButtonVisibility = (element, visible) => {
  if (!element) return;
  element.style.display = visible ? "" : "none";
};

const setSectionVisibility = (element, visible) => {
  if (!element) return;
  element.style.display = visible ? "" : "none";
};

const setNavScreenVisibility = (screenId, visible) => {
  const navButton = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
  const screenSection = document.getElementById(screenId);
  if (navButton) {
    navButton.style.display = visible ? "" : "none";
  }
  if (screenSection && !visible) {
    screenSection.classList.remove("active");
  }
};

const applyNavVisibilityByPermissions = () => {
  const canUseOps =
    currentUserRole === "admin" ||
    hasPermission("alerts_view") ||
    hasPermission("kpi_view") ||
    hasPermission("backups_view") ||
    hasPermission("locks_manage") ||
    hasPermission("audit_view") ||
    hasPermission("import_data") ||
    hasPermission("monthly_close");

  const visibilityMap = {
    dashboard: true,
    "customers-add": hasPermission("customers_write"),
    "customers-list": hasPermission("customers_write") || hasPermission("timeline_view"),
    receipts: hasPermission("receipts_write"),
    transfers: hasPermission("transfers_write"),
    "rmb-balance": hasPermission("receipts_write") || hasPermission("transfers_write"),
    ledger: hasPermission("timeline_view"),
    reports: hasPermission("export_reports"),
    backup: hasPermission("backups_view") || hasPermission("backups_restore"),
    ops: canUseOps,
  };

  Object.entries(visibilityMap).forEach(([screenId, visible]) => {
    setNavScreenVisibility(screenId, Boolean(visible));
  });

  const activeScreen = document.querySelector(".screen.active");
  const activeScreenId = activeScreen?.id || "";
  if (activeScreenId && visibilityMap[activeScreenId] === false) {
    const firstVisible = Array.from(document.querySelectorAll(".nav-btn[data-screen]")).find(
      (btn) => btn.style.display !== "none"
    );
    if (firstVisible?.dataset?.screen) {
      setActiveScreen(firstVisible.dataset.screen);
    }
  }
};

const applyRolePermissions = () => {
  const writeDisabled = !canWrite();
  const deleteDisabled = !canDelete();

  [
    customerSave,
    receiptSave,
    transferSave,
    rmbTransferSave,
    budgetSave,
    invoiceSave,
    backupRestore,
    lockSave,
  ].forEach((btn) => {
    if (!btn) return;
    btn.disabled = writeDisabled;
    setButtonVisibility(btn, !writeDisabled);
  });

  [
    customerReset,
    receiptReset,
    transferReset,
    rmbTransferReset,
    budgetReset,
    invoiceReset,
  ].forEach((btn) => {
    if (!btn) return;
    btn.disabled = writeDisabled;
  });

  if (backupRestore) {
    backupRestore.disabled = deleteDisabled;
    setButtonVisibility(backupRestore, !deleteDisabled);
  }
  if (backupListRefresh) {
    backupListRefresh.disabled = !hasPermission("backups_view");
    setButtonVisibility(backupListRefresh, hasPermission("backups_view"));
  }
  if (auditSearch) {
    auditSearch.disabled = !hasPermission("audit_view");
    setButtonVisibility(auditSearch, hasPermission("audit_view"));
  }
  if (auditQuick24h) {
    auditQuick24h.disabled = !hasPermission("audit_view");
    setButtonVisibility(auditQuick24h, hasPermission("audit_view"));
  }
  if (auditQuick7d) {
    auditQuick7d.disabled = !hasPermission("audit_view");
    setButtonVisibility(auditQuick7d, hasPermission("audit_view"));
  }
  if (auditClearDates) {
    auditClearDates.disabled = !hasPermission("audit_view");
    setButtonVisibility(auditClearDates, hasPermission("audit_view"));
  }
  if (auditExportExcel) {
    auditExportExcel.disabled = !hasPermission("audit_view");
    setButtonVisibility(auditExportExcel, hasPermission("audit_view"));
  }
  auditColumnToggles.forEach((toggle) => {
    toggle.disabled = !hasPermission("audit_view");
  });
  if (lockRefresh) {
    lockRefresh.disabled = !hasPermission("locks_manage");
    setButtonVisibility(lockRefresh, hasPermission("locks_manage"));
  }
  if (timelineLoad) {
    timelineLoad.disabled = !hasPermission("timeline_view");
    setButtonVisibility(timelineLoad, hasPermission("timeline_view"));
  }
  if (kpiLoad) {
    kpiLoad.disabled = !hasPermission("kpi_view");
    setButtonVisibility(kpiLoad, hasPermission("kpi_view"));
  }
  if (monthlyCloseSave) {
    monthlyCloseSave.disabled = !hasPermission("monthly_close");
    setButtonVisibility(monthlyCloseSave, hasPermission("monthly_close"));
  }
  if (monthlyCloseRefresh) {
    monthlyCloseRefresh.disabled = !hasPermission("monthly_close");
    setButtonVisibility(monthlyCloseRefresh, hasPermission("monthly_close"));
  }
  if (importPreview) {
    importPreview.disabled = !hasPermission("import_data");
    setButtonVisibility(importPreview, hasPermission("import_data"));
  }
  if (importCommit) {
    importCommit.disabled = !hasPermission("import_data");
    setButtonVisibility(importCommit, hasPermission("import_data"));
  }

  const canViewAlertsOps = hasPermission("alerts_view");
  const canViewBackupsOps = hasPermission("backups_view");
  const canViewLocksOps = hasPermission("locks_manage");
  const canViewAuditOps = hasPermission("audit_view");
  const canViewKpiOps = hasPermission("kpi_view");
  const canViewMonthlyCloseOps = hasPermission("monthly_close");
  const canViewImportOps = hasPermission("import_data");
  const canViewCloudBackupOps = hasPermission("backups_view");

  setSectionVisibility(opsAlertsCard, canViewAlertsOps);
  setSectionVisibility(opsBackupsCard, canViewBackupsOps);
  setSectionVisibility(opsLocksCard, canViewLocksOps);
  setSectionVisibility(opsAuditCard, canViewAuditOps);
  setSectionVisibility(opsNotifyCard, canViewAlertsOps);
  setSectionVisibility(opsKpiCard, canViewKpiOps);
  setSectionVisibility(opsMonthlyCloseCard, canViewMonthlyCloseOps);
  setSectionVisibility(opsImportCard, canViewImportOps);
  setSectionVisibility(opsCloudBackupCard, canViewCloudBackupOps);
  setSectionVisibility(opsBrandingCard, true);
  setSectionVisibility(opsShortcutsCard, true);

  const canViewAnyOverviewCard = canViewBackupsOps || canViewLocksOps || canViewAuditOps;
  setSectionVisibility(opsOverviewCards, canViewAnyOverviewCard);

  const canManageUsers = currentUserRole === "admin";
  if (usersAdminCard) {
    usersAdminCard.style.display = canManageUsers ? "block" : "none";
  }
  [userAdminSave, userAdminReset, userAdminRefresh, userAdminUsername, userAdminPassword, userAdminRole].forEach((el) => {
    if (!el) return;
    el.disabled = !canManageUsers;
  });
  const permissionBoxes = permissionsGrid ? permissionsGrid.querySelectorAll("input[data-permission-key]") : [];
  permissionBoxes.forEach((box) => {
    box.disabled = !canManageUsers;
  });

  applyNavVisibilityByPermissions();
};

const downloadBackupSnapshot = async () => {
  const snapshot = await api("/api/system/backup");
  const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `masan-backup-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const restoreBackupSnapshot = async () => {
  if (!backupFile?.files?.length) {
    showMessage(backupMessage, "اختر ملف النسخة الاحتياطية أولاً.", false);
    return;
  }
  const [file] = backupFile.files;
  const text = await file.text();
  let snapshot;
  try {
    snapshot = JSON.parse(text);
  } catch (err) {
    showMessage(backupMessage, "الملف غير صالح (JSON).", false);
    return;
  }

  await api("/api/system/restore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });

  await refreshAllViewsAfterRestore();

  showMessage(backupMessage, "تم استرجاع النسخة الاحتياطية بنجاح.", true);
};

const refreshAllViewsAfterRestore = async () => {
  await loadCustomers();
  renderSavedInvoices();
  await loadNextCustomerCode();
  await loadNextInvoice();
  await resetReceiptForm();
  await resetInvoiceBuilderForm();
  resetTransferForm();
  setBudgetDefaults();
  await loadBudget();
  await loadRmbBalances();
  await loadRmbTransfers();
  resetRmbTransferForm();
  ledgerTable.innerHTML = "";
  ledgerBalance.textContent = "";
  reportTable.innerHTML = "";
  await loadDashboard();
};

const loadServerBackups = async () => {
  if (!backupListTable) return;
  const rows = await api("/api/system/backups");
  if (opsBackupsCount) {
    opsBackupsCount.textContent = String(rows?.length || 0);
  }
  if ((rows?.length || 0) >= 7) {
    setOpsBadgeState(opsBackupsBadge, "ممتاز", "ok");
  } else if ((rows?.length || 0) > 0) {
    setOpsBadgeState(opsBackupsBadge, "جيد", "warn");
  } else {
    setOpsBadgeState(opsBackupsBadge, "لا توجد نسخ", "danger");
  }
  backupListTable.innerHTML = (rows || [])
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.file)}</td>
        <td>${row.size}</td>
        <td>${formatDateTime(row.mtime)}</td>
        <td>
          <button class="secondary" data-restore-server-backup="${escapeHtml(row.file)}">استرجاع</button>
          <button class="secondary" data-delete-server-backup="${escapeHtml(row.file)}">حذف</button>
        </td>
      </tr>
    `
    )
    .join("");
  if (!rows?.length) {
    backupListTable.innerHTML = `<tr><td colspan="4">لا توجد نسخ على السيرفر.</td></tr>`;
  }
};

const loadLocks = async () => {
  if (!lockTable) return;
  const rows = await api("/api/locks");
  if (opsLocksCount) {
    opsLocksCount.textContent = String(rows?.length || 0);
  }
  if ((rows?.length || 0) === 0) {
    setOpsBadgeState(opsLocksBadge, "لا يوجد", "ok");
  } else if ((rows?.length || 0) <= 3) {
    setOpsBadgeState(opsLocksBadge, "انتباه", "warn");
  } else {
    setOpsBadgeState(opsLocksBadge, "عالي", "danger");
  }
  lockTable.innerHTML = (rows || [])
    .map(
      (row) => `
      <tr>
        <td>${row.date_from}</td>
        <td>${escapeHtml(row.reason || "-")}</td>
        <td>${escapeHtml(row.locked_by || "-")}</td>
        <td><button class="secondary" data-lock-delete="${row.id}">فتح القفل</button></td>
      </tr>
    `
    )
    .join("");
  if (!rows?.length) {
    lockTable.innerHTML = `<tr><td colspan="4">لا توجد تواريخ مقفلة.</td></tr>`;
  }
};

const loadAuditLogs = async () => {
  if (!auditTable) return;
  const params = new URLSearchParams();
  if (auditUser?.value?.trim()) params.set("username", auditUser.value.trim());
  if (auditAction?.value?.trim()) params.set("action", auditAction.value.trim());
  if (auditEntity?.value?.trim()) params.set("entityType", auditEntity.value.trim());
  if (auditDetails?.value?.trim()) params.set("detailsLike", auditDetails.value.trim());
  if (auditFrom?.value) params.set("from", auditFrom.value);
  if (auditTo?.value) params.set("to", auditTo.value);
  params.set("limit", "300");
  const rows = await api(`/api/audit-logs?${params.toString()}`);
  lastAuditRows = Array.isArray(rows) ? rows : [];
  if (opsAuditCount) {
    opsAuditCount.textContent = String(rows?.length || 0);
  }
  if ((rows?.length || 0) > 0) {
    setOpsBadgeState(opsAuditBadge, "نشط", "ok");
  } else {
    setOpsBadgeState(opsAuditBadge, "فارغ", "warn");
  }

  const toAuditActionArabic = (action) => {
    const key = String(action || "").toLowerCase();
    if (key === "create") return "إضافة";
    if (key === "update") return "تعديل";
    if (key === "delete") return "حذف";
    return action || "-";
  };

  const getAuditActionClass = (action) => {
    const key = String(action || "").toLowerCase();
    if (key === "create") return "audit-action-create";
    if (key === "update") return "audit-action-update";
    if (key === "delete") return "audit-action-delete";
    return "audit-action-other";
  };

  const formatAuditDetails = (rawDetails, row) => {
    const raw = String(rawDetails || "").trim();
    if (!raw) return "-";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      return raw;
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return raw;
    }

    const hasAmount = parsed.amount !== undefined && parsed.amount !== null && parsed.amount !== "";
    const amountLabel = hasAmount ? `المبلغ: ${formatTransferValue(parsed.amount)}` : "";
    const senderLabel = parsed.senderName || (parsed.senderId ? `#${parsed.senderId}` : "");
    const receiverLabel = parsed.receiverName || (parsed.receiverId ? `#${parsed.receiverId}` : "");
    const customerLabel = parsed.customerName || (parsed.customerId ? `#${parsed.customerId}` : "");

    const entityType = String(row?.entity_type || "").toLowerCase();
    const keyParts = [];

    if (entityType === "transfer" || entityType === "receipt") {
      if (senderLabel) keyParts.push(`المرسل: ${senderLabel}`);
      if (receiverLabel) keyParts.push(`المستلم: ${receiverLabel}`);
      if (amountLabel) keyParts.push(amountLabel);
    } else if (entityType === "rmb-expense" || entityType === "transport-item") {
      if (customerLabel) keyParts.push(`الزبون: ${customerLabel}`);
      if (amountLabel) keyParts.push(amountLabel);
    }

    if (!keyParts.length) {
      if (senderLabel) keyParts.push(`المرسل: ${senderLabel}`);
      if (receiverLabel) keyParts.push(`المستلم: ${receiverLabel}`);
      if (customerLabel) keyParts.push(`الزبون: ${customerLabel}`);
      if (amountLabel) keyParts.push(amountLabel);
    }

    if (parsed.invoiceNo) keyParts.push(`فاتورة: ${parsed.invoiceNo}`);
    if (parsed.date) keyParts.push(`تاريخ: ${parsed.date}`);

    if (keyParts.length) return keyParts.join(" | ");

    const fallback = Object.entries(parsed)
      .slice(0, 4)
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join(" | ");
    return fallback || "-";
  };

  auditTable.innerHTML = (rows || [])
    .map(
      (row) => `
      <tr class="audit-row ${getAuditActionClass(row.action)}">
        <td data-audit-col="created_at">${formatDateTime(row.created_at)}</td>
        <td data-audit-col="username">${escapeHtml(row.username)}</td>
        <td data-audit-col="role">${escapeHtml(row.role)}</td>
        <td data-audit-col="action"><span class="audit-action-chip ${getAuditActionClass(row.action)}">${escapeHtml(toAuditActionArabic(row.action))}</span></td>
        <td data-audit-col="entity_type">${escapeHtml(row.entity_type)}</td>
        <td data-audit-col="entity_id">${escapeHtml(row.entity_id || "-")}</td>
        <td data-audit-col="details">${escapeHtml(formatAuditDetails(row.details, row))}</td>
      </tr>
    `
    )
    .join("");
  if (!rows?.length) {
    const colCount = Math.max(1, getVisibleAuditColumns().length);
    auditTable.innerHTML = `<tr><td data-audit-empty='1' colspan="${colCount}">لا توجد نتائج.</td></tr>`;
  }
  applyAuditColumnVisibility();
};

const loadAlertsCenter = async () => {
  if (!opsAlertsTable) return;
  const data = await api("/api/alerts/center");
  const items = data.items || [];
  const total = Number(data.totalCount || 0);
  if (opsAlertsTotal) {
    opsAlertsTotal.textContent = String(total);
  }
  if (total === 0) {
    setOpsBadgeState(opsAlertsBadge, "مستقر", "ok");
  } else if (total < 10) {
    setOpsBadgeState(opsAlertsBadge, "تنبيهات", "warn");
  } else {
    setOpsBadgeState(opsAlertsBadge, "مرتفع", "danger");
  }

  if (total > lastAlertsTotal && isAlertsNotifyEnabled()) {
    const msg = `يوجد ${total} تنبيه حالي.`;
    showToast(msg, total >= 10 ? "danger" : "warn");
    playAlertBeep();
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Masan Alerts", { body: msg });
    }
  }
  lastAlertsTotal = total;

  opsAlertsTable.innerHTML = items
    .map(
      (item) => {
        const levelClass = ["ok", "warn", "danger"].includes(String(item.level)) ? String(item.level) : "warn";
        return `
      <tr>
        <td>${escapeHtml(item.type)}</td>
        <td><span class="ops-alert-level ${levelClass}">${escapeHtml(item.level)}</span></td>
        <td>${escapeHtml(item.title)}</td>
        <td>${item.count}</td>
      </tr>
    `;
      }
    )
    .join("");
  if (!items.length) {
    opsAlertsTable.innerHTML = `<tr><td colspan="4">لا توجد تنبيهات حالياً.</td></tr>`;
  }
};

const loadMonthlyKpis = async () => {
  if (!kpiTable) return;
  const monthValue = getMonthInputValue(kpiMonth) || new Date().toISOString().slice(0, 7);
  const data = await api(`/api/kpi/monthly?month=${encodeURIComponent(monthValue)}`);
  const current = data.current || {};
  const previous = data.previous || {};
  const rows = [
    ["التدفق الداخل", current.inflow, previous.inflow],
    ["التدفق الخارج", current.outflow, previous.outflow],
    ["صافي التدفق", current.netFlow, previous.netFlow],
    ["التحصيل", current.collections, previous.collections],
    ["الفواتير", current.invoices, previous.invoices],
    ["نسبة التحصيل %", current.collectionRate, previous.collectionRate],
    ["الزبائن النشطين", current.activeCustomers, previous.activeCustomers],
  ];
  kpiTable.innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td>${row[0]}</td>
        <td>${formatTransferValue(row[1] || 0)}</td>
        <td>${formatTransferValue(row[2] || 0)}</td>
      </tr>
    `
    )
    .join("");
};

const loadMonthlyCloses = async () => {
  if (!monthlyCloseTable) return;
  const rows = await api("/api/monthly-closes");
  monthlyCloseTable.innerHTML = (rows || [])
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.month)}</td>
        <td>${escapeHtml(row.reason || "-")}</td>
        <td>${escapeHtml(row.closed_by || "-")}</td>
        <td>${formatDateTime(row.created_at)}</td>
        <td><button class="secondary" data-monthly-close-delete="${row.id}">فتح</button></td>
      </tr>
    `
    )
    .join("");
  if (!rows?.length) {
    monthlyCloseTable.innerHTML = `<tr><td colspan="5">لا توجد أشهر مغلقة.</td></tr>`;
  }
};

const loadCustomerTimeline = async () => {
  if (!timelineTable || !timelineCustomer?.value) {
    if (timelineTable) timelineTable.innerHTML = "";
    return;
  }
  const limit = Number(timelineLimit?.value || 200);
  const rows = await api(
    `/api/customers/${timelineCustomer.value}/timeline?limit=${encodeURIComponent(limit)}`
  );
  timelineTable.innerHTML = (rows || [])
    .map(
      (row) => `
      <tr>
        <td>${row.date}</td>
        <td>${escapeHtml(row.source)}</td>
        <td>${escapeHtml(row.event_type)}</td>
        <td>${row.ref_no}</td>
        <td class="${formatBalanceClass(row.amount)}">${formatMoney(row.amount)}</td>
        <td>${escapeHtml(row.sender_name || "-")}</td>
        <td>${escapeHtml(row.receiver_name || "-")}</td>
        <td>${escapeHtml(row.details || "-")}</td>
      </tr>
    `
    )
    .join("");
  if (!rows?.length) {
    timelineTable.innerHTML = `<tr><td colspan="8">لا توجد حركات ضمن هذا الفلتر.</td></tr>`;
  }
};

const parseImportFileRows = async () => {
  if (!importFile?.files?.length) {
    throw new Error("اختر ملف Excel أولاً.");
  }
  if (typeof XLSX === "undefined") {
    throw new Error("مكتبة Excel غير متاحة حالياً.");
  }
  const file = importFile.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  return rows;
};

const renderImportPreview = (rows) => {
  if (!importPreviewHead || !importPreviewTable) return;
  importPreviewRows = Array.isArray(rows) ? rows : [];
  if (!importPreviewRows.length) {
    importPreviewHead.innerHTML = "";
    importPreviewTable.innerHTML = `<tr><td>لا توجد بيانات للمعاينة.</td></tr>`;
    return;
  }

  const keys = Object.keys(importPreviewRows[0]).slice(0, 8);
  importPreviewHead.innerHTML = `<tr>${keys.map((k) => `<th>${escapeHtml(k)}</th>`).join("")}</tr>`;
  importPreviewTable.innerHTML = importPreviewRows
    .slice(0, 15)
    .map((row) => `<tr>${keys.map((k) => `<td>${escapeHtml(row[k] ?? "")}</td>`).join("")}</tr>`)
    .join("");
};

const setupPwaInstall = () => {
  if (!installAppButton) return;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installAppButton.hidden = false;
  });

  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installAppButton.hidden = true;
  });

  window.addEventListener("appinstalled", () => {
    installAppButton.hidden = true;
    deferredInstallPrompt = null;
  });
};

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

      if (isLocalhost) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((reg) => reg.unregister()));
          if ("caches" in window) {
            const cacheKeys = await caches.keys();
            await Promise.all(cacheKeys.map((key) => caches.delete(key)));
          }
        } catch (err) {
          // Ignore cleanup errors on localhost.
        }
        return;
      }

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      try {
        const registration = await navigator.serviceWorker.register("/sw.js");

        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });

        setInterval(() => {
          registration.update().catch(() => {});
        }, 60 * 1000);
      } catch (err) {
        // Ignore service worker registration errors.
      }
    });
  }
};

const forceRefreshApp = async () => {
  if (forceRefreshButton) {
    forceRefreshButton.disabled = true;
    forceRefreshButton.textContent = "جاري التحديث...";
  }
  setStatus("جاري تنفيذ تحديث إجباري...", true);
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.update().catch(() => {});
        if (reg.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      }
    }

    if ("caches" in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
    }

    window.location.reload();
  } catch (err) {
    setStatus("تعذر التحديث الإجباري", false);
    if (forceRefreshButton) {
      forceRefreshButton.disabled = false;
      forceRefreshButton.textContent = "تحديث إجباري";
    }
  }
};

// --- تحديث تلقائي للكاش عند وجود إصدار جديد ---
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // عند وجود إصدار جديد، أعد تحميل الصفحة تلقائيًا
    window.location.reload();
  });

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        // إذا كان هناك إصدار جديد ينتظر التفعيل، أظهر زر التحديث الإجباري
        if (forceRefreshButton) {
          forceRefreshButton.hidden = false;
          forceRefreshButton.disabled = false;
          forceRefreshButton.textContent = "تحديث إجباري (إصدار جديد)";
          forceRefreshButton.onclick = () => {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          };
        }
      }
    } catch (err) {
      // تجاهل الأخطاء
    }
  });
}

const showMessage = (el, text, ok = true) => {
  if (!el) {
    return;
  }
  el.textContent = text;
  el.className = `inline-message ${ok ? "success" : "error"}`;
};

const showOpsNotice = (text, ok = true) => {
  setStatus(text, ok);
  showMessage(backupMessage, text, ok);
};

const stopOpsHeartbeat = () => {
  if (opsHeartbeatTimer) {
    clearInterval(opsHeartbeatTimer);
    opsHeartbeatTimer = null;
  }
};

const clearAuditLogsTable = (message = "السجل فارغ. اختر فلتر زمني أو اضغط بحث السجل.") => {
  if (!auditTable) return;
  lastAuditRows = [];
  const colCount = Math.max(1, getVisibleAuditColumns().length);
  auditTable.innerHTML = `<tr><td data-audit-empty='1' colspan="${colCount}">${escapeHtml(message)}</td></tr>`;
  applyAuditColumnVisibility();
};

const refreshOpsHeartbeat = async () => {
  if (!hasPermission("alerts_view") && !hasPermission("kpi_view") && !hasPermission("backups_view")) return;
  try {
    if (hasPermission("alerts_view")) {
      await loadAlertsCenter();
    }
    if (hasPermission("backups_view")) {
      await loadServerBackups();
    }
    if (hasPermission("locks_manage")) {
      await loadLocks();
    }
    if (hasPermission("kpi_view")) {
      await loadMonthlyKpis();
    }
  } catch (err) {
    // Keep heartbeat silent to avoid interrupting user workflow.
  }
};

const startOpsHeartbeat = () => {
  stopOpsHeartbeat();
  if (!hasPermission("alerts_view") && !hasPermission("kpi_view") && !hasPermission("backups_view")) return;
  opsHeartbeatTimer = setInterval(() => {
    refreshOpsHeartbeat();
  }, 60 * 1000);
};

const isMonthInputSupported = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "month");
  return input.type === "month";
};

const normalizeMonthValue = (value) => {
  const raw = String(value || "").trim().replaceAll("/", "-");
  if (/^\d{4}-\d{2}$/.test(raw)) return raw;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw.slice(0, 7);
  return "";
};

const getMonthInputValue = (inputEl) => normalizeMonthValue(inputEl?.value || "");

const setMonthInputValue = (inputEl, monthValue) => {
  if (!inputEl) return;
  const safeMonth = normalizeMonthValue(monthValue);
  if (!safeMonth) return;
  if (inputEl.type === "date") {
    inputEl.value = `${safeMonth}-01`;
    return;
  }
  inputEl.value = safeMonth;
};

const applyMonthInputFallback = () => {
  if (isMonthInputSupported()) return;
  [kpiMonth, monthlyCloseMonth].forEach((inputEl) => {
    if (!inputEl) return;
    const currentMonth = normalizeMonthValue(inputEl.value);
    inputEl.type = "date";
    inputEl.step = "1";
    if (currentMonth) {
      inputEl.value = `${currentMonth}-01`;
    }
  });
};

const setOpsDefaults = () => {
  applyMonthInputFallback();
  setupAuditColumnToggles();
  clearAuditLogsTable();
  const currentMonth = new Date().toISOString().slice(0, 7);
  if (kpiMonth && !kpiMonth.value) {
    setMonthInputValue(kpiMonth, currentMonth);
  }
  if (monthlyCloseMonth && !monthlyCloseMonth.value) {
    setMonthInputValue(monthlyCloseMonth, currentMonth);
  }
  loadBrandingIntoForm();
  updateAlertsNotifyUi();
  resetUserAdminForm();
};

const setOpsBadgeState = (element, text, mode = "") => {
  if (!element) return;
  element.textContent = text;
  element.classList.remove("ok", "warn", "danger");
  if (mode) {
    element.classList.add(mode);
  }
};

const showLogin = (visible) => {
  authOverlay.classList.toggle("active", visible);
  authOverlay.setAttribute("aria-hidden", String(!visible));
  document.body.classList.toggle("auth-only", visible);
  if (logoutButton) {
    logoutButton.hidden = visible;
  }
  if (forceRefreshButton) {
    forceRefreshButton.hidden = visible;
  }
};

const resetLoginForm = () => {
  loginUsername.value = "";
  loginPassword.value = "";
  loginMessage.textContent = "";
};

const formatMoney = (value) => {
  const numeric = Number(value) || 0;
  return new Intl.NumberFormat("ar-IQ-u-nu-latn", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numeric);
};

const formatTransferValue = (value) => {
  const numeric = Number(value) || 0;
  return new Intl.NumberFormat("ar-IQ-u-nu-latn", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
};

const updateTermsDateTime = () => {
  if (!termsDay || !termsDate || !termsTime) return;
  const now = new Date();
  termsDay.textContent = now.toLocaleDateString("ar-IQ", { weekday: "long" });
  termsDate.textContent = now.toLocaleDateString("ar-IQ-u-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  termsTime.textContent = now.toLocaleTimeString("ar-IQ-u-nu-latn", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};
updateTermsDateTime();
setInterval(updateTermsDateTime, 1000);

const formatDateTime = (value) => {
  const date = value ? new Date(value) : new Date();
  return new Intl.DateTimeFormat("ar-IQ-u-nu-latn", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const cleanReportDetails = (detailsValue) => {
  const raw = String(detailsValue || "").trim();
  if (!raw) return "-";

  const withModeStyle = raw.replace(
    /\s*\|\s*نوع\s*الربط\s*:\s*(مبلغ\s*النقل\s*فقط|الإجمالي\s*النهائي)/gi,
    " مع $1"
  );
  return withModeStyle || "-";
};

const REPORT_GALLERY_KEY = "reportGalleryItems";
const MAX_GALLERY_ITEMS = 12;

const loadReportGallery = () => {
  try {
    const raw = localStorage.getItem(REPORT_GALLERY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
};

const saveReportGallery = (items) => {
  localStorage.setItem(REPORT_GALLERY_KEY, JSON.stringify(items));
};

const renderReportGallery = () => {
  const items = loadReportGallery();
  if (!items.length) {
    reportGalleryEmpty.style.display = "block";
    reportGalleryList.innerHTML = "";
    return;
  }
  reportGalleryEmpty.style.display = "none";
  reportGalleryList.innerHTML = items
    .map(
      (item) => `
      <article class="gallery-item">
        <div class="gallery-thumb-wrap">
          <img class="gallery-thumb" src="${escapeHtml(sanitizeHttpUrl(item.dataUrl) || item.dataUrl)}" alt="كشف زبون - ${escapeHtml(item.customerName || "-")}" loading="lazy" />
        </div>
        <div class="gallery-meta">
          <span class="gallery-customer">${escapeHtml(item.customerName)}</span>
          <span class="gallery-date">${formatDateTime(item.createdAt)}</span>
        </div>
        <div class="gallery-actions">
          <button class="secondary gallery-btn" data-gallery-preview="${item.id}">معاينة</button>
          <button class="secondary gallery-btn" data-gallery-download="${item.id}">تنزيل</button>
          <button class="secondary gallery-btn danger" data-gallery-remove="${item.id}">حذف</button>
        </div>
      </article>
    `
    )
    .join("");
};

const getReportTableElement = () => {
  return reportTable ? reportTable.closest("table") : null;
};

const setActiveScreen = (screenId) => {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });
  if (screenId === "customers-list") {
    loadCustomers();
  }
  if (screenId === "rmb-balance") {
    loadRmbBalances();
    loadRmbTransfers();
  }
  if (screenId === "budget") {
    loadBudget();
  }
  if (screenId === "dashboard") {
    loadDashboard();
  }
};

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveScreen(btn.dataset.screen);
  });
});

if (liteModeToggle) {
  liteModeToggle.addEventListener("click", () => {
    toggleLiteMode();
  });
}

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    const nextId = String(themeSelect.value || "warm");
    const nextTheme = THEME_VARIANTS.find((item) => item.id === nextId) || THEME_VARIANTS[0];
    applyThemeVariant(nextTheme.id);
    showToast(`تم تغيير القالب إلى ${nextTheme.label}.`, "ok");
  });
}

if (budgetPeriodType) {
  budgetPeriodType.addEventListener("change", () => {
    setBudgetPeriodVisibility();
    loadBudget();
  });
}

if (budgetPeriodMonth) {
  budgetPeriodMonth.addEventListener("change", () => {
    loadBudget();
  });
}

if (budgetPeriodYear) {
  budgetPeriodYear.addEventListener("change", () => {
    loadBudget();
  });
}

if (budgetCustomer) {
  budgetCustomer.addEventListener("change", () => {
    loadBudget();
  });
}

const loadNextCustomerCode = async () => {
  const data = await api("/api/customers/next-code");
  customerCode.value = data.nextCode;
};

const loadCustomers = async () => {
  const senderValue = receiptSender.value;
  const receiverValue = receiptReceiver.value;
  const ledgerValue = ledgerCustomer.value;
  const timelineValue = timelineCustomer ? timelineCustomer.value : "";
  const reportValue = reportCustomer.value;
  const salesValue = salesCustomer ? salesCustomer.value : "";
  const transferSenderValue = transferSender.value;
  const transferReceiverValue = transferReceiver.value;
  const rmbSenderValue = rmbTransferSender.value;
  const rmbReceiverValue = rmbTransferReceiver.value;
  const budgetCustomerValue = budgetCustomer ? budgetCustomer.value : "";
  const invoiceCustomerValue = invoiceCustomer ? invoiceCustomer.value : "";

  const customers = await api("/api/customers");
  cachedCustomers = customers;
  customersTable.innerHTML = customers
    .map(
      (c) => `
      <tr>
        <td>${c.code}</td>
        <td>${escapeHtml(c.name)}</td>
        <td>${escapeHtml(c.phone || "-")}</td>
        <td>${escapeHtml(c.address || "-")}</td>
        <td>${formatMoney(c.initial_balance)}</td>
        <td>${formatMoney(c.current_balance)}</td>
        <td>
          <button class="secondary" data-edit="${c.id}">تعديل</button>
          <button class="secondary" data-timeline="${c.id}">Timeline</button>
          <button class="secondary" data-delete="${c.id}">حذف</button>
        </td>
      </tr>
    `
    )
    .join("");

  const options = customers
    .map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`)
    .join("");
  receiptSender.innerHTML = `<option value="">-- اختر مرسل --</option>${options}`;
  receiptReceiver.innerHTML = `<option value="">-- اختر مستلم --</option>${options}`;
  ledgerCustomer.innerHTML = `<option value="">-- اختر زبون --</option>${options}`;
  reportCustomer.innerHTML = `<option value="">-- اختر زبون --</option>${options}`;
  if (salesCustomer) {
    salesCustomer.innerHTML = `<option value="">كل الزبائن</option>${options}`;
  }
  transferSender.innerHTML = `<option value="">-- اختر مرسل --</option>${options}`;
  transferReceiver.innerHTML = `<option value="">-- اختر مستلم --</option>${options}`;
  rmbTransferSender.innerHTML = `<option value="">-- اختر مرسل --</option>${options}`;
  rmbTransferReceiver.innerHTML = `<option value="">-- اختر مستلم --</option>${options}`;
  if (budgetCustomer) {
    budgetCustomer.innerHTML = `<option value="">الشركة (شامل)</option>${options}`;
  }
  if (invoiceCustomer) {
    invoiceCustomer.innerHTML = `<option value="">-- اختر زبون --</option>${options}`;
  }
  if (timelineCustomer) {
    timelineCustomer.innerHTML = `<option value="">-- اختر زبون --</option>${options}`;
  }

  if (senderValue) receiptSender.value = senderValue;
  if (receiverValue) receiptReceiver.value = receiverValue;
  if (ledgerValue) ledgerCustomer.value = ledgerValue;
  if (reportValue) reportCustomer.value = reportValue;
  if (salesCustomer && salesValue) salesCustomer.value = salesValue;
  if (transferSenderValue) transferSender.value = transferSenderValue;
  if (transferReceiverValue) transferReceiver.value = transferReceiverValue;
  if (rmbSenderValue) rmbTransferSender.value = rmbSenderValue;
  if (rmbReceiverValue) rmbTransferReceiver.value = rmbReceiverValue;
  if (budgetCustomer && budgetCustomerValue) budgetCustomer.value = budgetCustomerValue;
  if (invoiceCustomer && invoiceCustomerValue) invoiceCustomer.value = invoiceCustomerValue;
  if (timelineCustomer && timelineValue) timelineCustomer.value = timelineValue;

  updateReceiptPartyDetails();
  updateTransferPartyDetails();
};

const loadDashboard = async () => {
  if (!dashboardReceivables) return;
  const [summary, negatives, priority, customers] = await Promise.all([
    api("/api/dashboard/summary"),
    api("/api/alerts/negative-balances"),
    api("/api/dashboard/collection-priority?limit=10"),
    api("/api/customers"),
  ]);

  cachedCustomers = Array.isArray(customers) ? customers : cachedCustomers;

  dashboardReceivables.value = formatMoney(summary.receivables || 0);
  dashboardPayables.value = formatMoney(summary.payables || 0);
  dashboardTransport.value = formatMoney(summary.transportTotal || 0);
  dashboardMovementToday.value = formatMoney(summary.movementToday || 0);

  dashboardDebtorsTable.innerHTML = (summary.topDebtors || [])
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.name)}</td>
        <td class="${formatBalanceClass(row.current_balance)}">${formatMoney(row.current_balance)}</td>
      </tr>
    `
    )
    .join("");
  if (!summary.topDebtors?.length) {
    dashboardDebtorsTable.innerHTML = `<tr><td colspan="2">لا توجد مديونيات حالياً.</td></tr>`;
  }

  dashboardNegativeTable.innerHTML = (negatives || [])
    .map(
      (row) => `
      <tr>
        <td>${row.code}</td>
        <td>${escapeHtml(row.name)}</td>
        <td class="balance-negative">${formatMoney(row.current_balance)}</td>
      </tr>
    `
    )
    .join("");
  if (!negatives?.length) {
    dashboardNegativeTable.innerHTML = `<tr><td colspan="3">لا توجد بيانات رصيد سالب حالياً.</td></tr>`;
  }

  if (dashboardPriorityTable) {
    dashboardPriorityTable.innerHTML = (priority || [])
      .map(
        (row) => `
      <tr>
        <td>${row.code}</td>
        <td>${escapeHtml(row.name)}</td>
        <td class="balance-positive">${formatMoney(row.current_balance)}</td>
        <td>${row.days_since_movement}</td>
        <td>${formatTransferValue(row.priority_score)}</td>
      </tr>
    `
      )
      .join("");
    if (!priority?.length) {
      dashboardPriorityTable.innerHTML = `<tr><td colspan="5">لا توجد بيانات أولوية تحصيل حالياً.</td></tr>`;
    }
  }

  renderDashboardNetSelectors();
  recalcDashboardNetCard();
};

const recalcDashboardNetCard = () => {
  if (!dashboardNetDebtors || !dashboardNetPayables) return;

  const debtorsTotal = Array.from(dashboardNetDebtors.selectedOptions).reduce(
    (sum, option) => sum + Math.max(0, Number(option.dataset.balance || 0)),
    0
  );
  const payablesTotal = Array.from(dashboardNetPayables.selectedOptions).reduce(
    (sum, option) => sum + Math.abs(Number(option.dataset.balance || 0)),
    0
  );
  const finalBalance = payablesTotal - debtorsTotal;

  if (dashboardNetDebtorsTotal) {
    dashboardNetDebtorsTotal.value = formatMoney(debtorsTotal);
    applyBalanceClass(dashboardNetDebtorsTotal, debtorsTotal);
  }
  if (dashboardNetPayablesTotal) {
    dashboardNetPayablesTotal.value = formatMoney(payablesTotal);
    applyBalanceClass(dashboardNetPayablesTotal, payablesTotal);
  }
  if (dashboardNetFinal) {
    dashboardNetFinal.value = formatMoney(finalBalance);
    applyBalanceClass(dashboardNetFinal, finalBalance);
  }
};

const renderDashboardNetSelectors = () => {
  if (!dashboardNetDebtors || !dashboardNetPayables) return;

  const selectedDebtors = new Set(Array.from(dashboardNetDebtors.selectedOptions).map((option) => option.value));
  const selectedPayables = new Set(Array.from(dashboardNetPayables.selectedOptions).map((option) => option.value));

  const positives = cachedCustomers
    .filter((c) => Number(c.current_balance || 0) > 0)
    .sort((a, b) => Number(b.current_balance || 0) - Number(a.current_balance || 0));
  const negatives = cachedCustomers
    .filter((c) => Number(c.current_balance || 0) < 0)
    .sort((a, b) => Number(a.current_balance || 0) - Number(b.current_balance || 0));

  dashboardNetDebtors.innerHTML = positives
    .map((c) => {
      const balance = Number(c.current_balance || 0);
      const selected = selectedDebtors.has(String(c.id)) ? " selected" : "";
      return `<option value="${c.id}" data-balance="${balance}"${selected}>${escapeHtml(c.name)} (${formatMoney(balance)})</option>`;
    })
    .join("");
  if (!positives.length) {
    dashboardNetDebtors.innerHTML = `<option value="" disabled>لا يوجد زبائن مدينين حالياً</option>`;
  }

  dashboardNetPayables.innerHTML = negatives
    .map((c) => {
      const balance = Number(c.current_balance || 0);
      const selected = selectedPayables.has(String(c.id)) ? " selected" : "";
      return `<option value="${c.id}" data-balance="${balance}"${selected}>${escapeHtml(c.name)} (${formatMoney(Math.abs(balance))})</option>`;
    })
    .join("");
  if (!negatives.length) {
    dashboardNetPayables.innerHTML = `<option value="" disabled>لا يوجد زبائن أنا مطلوب لهم حالياً</option>`;
  }
};

const enableMultiSelectToggle = (selectElement) => {
  if (!selectElement || !selectElement.multiple) return;
  selectElement.addEventListener("mousedown", (event) => {
    const option = event.target.closest("option");
    if (!option || option.disabled) return;
    event.preventDefault();
    option.selected = !option.selected;
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));
  });
};

const setAllSelectOptions = (selectElement, selected) => {
  if (!selectElement || !selectElement.options?.length) return;
  Array.from(selectElement.options).forEach((option) => {
    if (option.disabled || !option.value) return;
    option.selected = selected;
  });
  selectElement.dispatchEvent(new Event("change", { bubbles: true }));
};

const resetCustomerForm = async () => {
  customerName.value = "";
  customerPhone.value = "";
  customerAddress.value = "";
  customerInitialBalance.value = "";
  await loadNextCustomerCode();
  customerSave.dataset.editId = "";
};

customerSave.addEventListener("click", async () => {
  try {
    const payload = {
      name: customerName.value,
      phone: customerPhone.value,
      address: customerAddress.value,
      initialBalance: customerInitialBalance.value,
    };
    if (customerSave.dataset.editId) {
      await api(`/api/customers/${customerSave.dataset.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      showMessage(customerMessage, "تم التعديل بنجاح", true);
    } else {
      await api("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      showMessage(customerMessage, "تم الحفظ بنجاح", true);
    }
    await loadCustomers();
    await resetCustomerForm();
  } catch (err) {
    showMessage(customerMessage, err.message, false);
  }
});

customerReset.addEventListener("click", () => {
  resetCustomerForm();
  customerMessage.textContent = "";
});

customersTable.addEventListener("click", async (event) => {
  const editId = event.target.dataset.edit;
  const timelineId = event.target.dataset.timeline;
  const deleteId = event.target.dataset.delete;
  if (editId) {
    const customers = await api("/api/customers");
    const customer = customers.find((c) => c.id === Number(editId));
    if (customer) {
      customerName.value = customer.name;
      customerPhone.value = customer.phone || "";
      customerAddress.value = customer.address || "";
      customerInitialBalance.value =
        customer.initial_balance === null || customer.initial_balance === undefined
          ? ""
          : customer.initial_balance;
      customerCode.value = customer.code;
      customerSave.dataset.editId = customer.id;
      setActiveScreen("customers-add");
    }
  }
  if (timelineId) {
    if (timelineCustomer) {
      timelineCustomer.value = String(timelineId);
    }
    setActiveScreen("customer-timeline");
    await loadCustomerTimeline();
  }
  if (deleteId) {
    await api(`/api/customers/${deleteId}`, { method: "DELETE" });
    await loadCustomers();
    await resetCustomerForm();
  }
});

const loadNextInvoice = async () => {
  const data = await api("/api/receipts/next-invoice");
  receiptInvoice.value = data.nextInvoiceNo;
  if (invoiceNumber && !invoiceNumber.value) {
    invoiceNumber.value = getOfficialInvoiceNo(invoiceDate?.value || new Date().toISOString().slice(0, 10));
  }
};

const updateInvoiceUsdAmount = () => {
  if (!invoiceUsdAmount) return;
  const baseRmb = Number(invoiceRmbConverted?.value || invoiceRmbAmount?.value || 0);
  const rate = Number(invoiceExchangeRate?.value || 0);
  if (!baseRmb || !rate || rate <= 0) {
    invoiceUsdAmount.value = "";
    return;
  }
  invoiceUsdAmount.value = formatTransferValue(baseRmb / rate);
};

const updateInvoiceTransportTotal = () => {
  if (!invoiceTransportTotal) return;
  const cbm = Number(invoiceCbm?.value || 0);
  const transport = Number(invoiceTransportAmount?.value || 0);
  if (!transport || transport <= 0) {
    invoiceTransportTotal.value = "";
    return;
  }
  const total = cbm > 0 ? cbm * transport : transport;
  invoiceTransportTotal.value = formatTransferValue(total);
};

const getSavedInvoices = () => {
  try {
    const data = JSON.parse(localStorage.getItem(SAVED_INVOICES_KEY) || "[]");
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item) => {
      const usdAmount = Number(item?.usdAmount || 0);
      const transportTotal = Number(item?.transportTotal || 0);
      const finalUsdTotal = Number.isFinite(Number(item?.finalUsdTotal))
        ? Number(item.finalUsdTotal)
        : usdAmount + transportTotal;
      const reportLinkMode = item?.reportLinkMode === "transport" ? "transport" : "final";
      return {
        ...item,
        usdAmount,
        transportTotal,
        finalUsdTotal,
        reportLinkMode,
        attachmentUrl: String(item?.attachmentUrl || "").trim(),
        attachmentName: String(item?.attachmentName || "").trim(),
      };
    });
  } catch (err) {
    return [];
  }
};

const setSavedInvoices = (items) => {
  localStorage.setItem(SAVED_INVOICES_KEY, JSON.stringify(items));
};

const getInvoiceLinkModeLabel = (mode) =>
  mode === "transport" ? "مبلغ النقل فقط" : "الإجمالي النهائي";

const renderSavedInvoices = () => {
  if (!invoiceSavedTable || !invoiceSavedEmpty) return;
  const items = getSavedInvoices();
  const query = (invoiceSavedSearch?.value || "").trim().toLowerCase();
  const filteredItems = query
    ? items.filter((item) => {
        const invoiceNo = String(item.invoiceNo || "").toLowerCase();
        const customerName = String(item.customerName || "").toLowerCase();
        return invoiceNo.includes(query) || customerName.includes(query);
      })
    : items;

  if (!items.length) {
    invoiceSavedEmpty.textContent = "لا توجد فواتير محفوظة بعد.";
  } else if (!filteredItems.length) {
    invoiceSavedEmpty.textContent = "لا توجد نتائج مطابقة للبحث.";
  }
  invoiceSavedEmpty.style.display = filteredItems.length ? "none" : "block";
  invoiceSavedTable.innerHTML = filteredItems
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.invoiceNo || "-")}</td>
        <td>${escapeHtml(item.date || "-")}</td>
        <td>${escapeHtml(item.customerName || "-")}</td>
        <td>${escapeHtml(item.brand || "-")}</td>
        <td>${formatTransferValue(item.usdAmount || 0)}</td>
        <td>${formatTransferValue(item.transportTotal || 0)}</td>
        <td>${formatMoney(item.finalUsdTotal || 0)} دولار</td>
        <td>${getInvoiceLinkModeLabel(item.reportLinkMode)}</td>
        <td>
          <div class="invoice-saved-actions">
            ${
              item.attachmentUrl
                ? `<a class="secondary invoice-btn invoice-btn-attach" href="${escapeHtml(sanitizeHttpUrl(item.attachmentUrl))}" target="_blank" rel="noopener" title="فتح المرفق" aria-label="فتح المرفق">مرفق</a>`
                : ""
            }
            <button class="secondary invoice-btn invoice-btn-edit" data-invoice-edit="${item.id}" title="تعديل" aria-label="تعديل">تعديل</button>
            <button class="secondary invoice-btn invoice-btn-print" data-invoice-print="${item.id}" title="طباعة" aria-label="طباعة">طباعة</button>
            <button class="secondary invoice-btn invoice-btn-delete" data-invoice-delete="${item.id}" title="حذف" aria-label="حذف">حذف</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");
};

const fillInvoiceFormFromSaved = (item) => {
  if (!item) return;
  if (invoiceSave) {
    invoiceSave.dataset.editId = String(item.id || "");
    invoiceSave.textContent = "تحديث";
  }
  if (invoiceNumber) invoiceNumber.value = item.invoiceNo || "";
  if (invoiceDate) invoiceDate.value = item.date || "";
  if (invoiceCustomer) invoiceCustomer.value = item.customerId || "";
  if (invoiceBrand) invoiceBrand.value = item.brand || "";
  if (invoiceMaterial) invoiceMaterial.value = item.material || "";
  if (invoiceCartons) invoiceCartons.value = item.cartons || "";
  if (invoiceCbm) invoiceCbm.value = item.cbm || "";
  if (invoiceRmbAmount) invoiceRmbAmount.value = item.rmbAmount || "";
  if (invoiceRmbConverted) invoiceRmbConverted.value = item.rmbConverted || "";
  if (invoiceExchangeRate) invoiceExchangeRate.value = item.exchangeRate || "";
  if (invoiceTransportAmount) invoiceTransportAmount.value = item.meterPrice || "";
  if (invoiceReportLinkMode) invoiceReportLinkMode.value = item.reportLinkMode || "final";
  if (invoiceSpendRmb) invoiceSpendRmb.value = item.spendFromRmb ? "yes" : "no";
  if (invoiceDetails) invoiceDetails.value = item.details || "";
  if (invoiceAttachmentFile) {
    invoiceAttachmentFile.value = "";
  }
  setInvoiceAttachment({
    url: item.attachmentUrl || "",
    name: item.attachmentName || "",
  });
  updateInvoiceUsdAmount();
  updateInvoiceTransportTotal();
};

const openSavedInvoiceByNo = (invoiceNo, { preview = false } = {}) => {
  const normalized = String(invoiceNo || "").trim();
  if (!normalized) return false;
  const items = getSavedInvoices();
  const entry = items.find((item) => String(item.invoiceNo || "").trim() === normalized);
  if (!entry) {
    return false;
  }
  fillInvoiceFormFromSaved(entry);
  setActiveScreen("invoice-builder");
  if (preview) {
    openInvoiceBuilderWindow(entry);
  }
  showMessage(invoiceMessage, `تم فتح الفاتورة رقم ${normalized}.`, true);
  return true;
};

const saveInvoiceBuilderData = async () => {
  try {
    const editId = Number(invoiceSave?.dataset?.editId || 0);
    const isEditMode = Boolean(editId);
    const customer = cachedCustomers.find((c) => c.id === Number(invoiceCustomer?.value));
    if (!customer) {
      showMessage(invoiceMessage, "اختر اسم الزبون قبل الحفظ.", false);
      return;
    }

    const officialInvoiceNo = (invoiceNumber?.value || "").trim() || getOfficialInvoiceNo(invoiceDate?.value);
    if (invoiceNumber) {
      invoiceNumber.value = officialInvoiceNo;
    }

    const cbmNumeric = Number(invoiceCbm?.value || 0);
    const rmbAmount = Number(invoiceRmbAmount?.value || 0);
    const rmbConverted = Number(invoiceRmbConverted?.value || invoiceRmbAmount?.value || 0);
    const rate = Number(invoiceExchangeRate?.value || 0);
    const usdAmount = rmbConverted > 0 && rate > 0 ? rmbConverted / rate : 0;
    const meterPrice = Number(invoiceTransportAmount?.value || 0);
    const transportTotal = cbmNumeric > 0 && meterPrice > 0 ? cbmNumeric * meterPrice : meterPrice;
    const finalUsdTotal = Math.trunc(usdAmount + transportTotal);
    const reportLinkMode = invoiceReportLinkMode?.value === "transport" ? "transport" : "final";
    const reportAmount = reportLinkMode === "transport" ? transportTotal : finalUsdTotal;
    const spendFromRmb = invoiceSpendRmb?.value === "yes";
    const rmbSpendAmount = Number(invoiceRmbConverted?.value || invoiceRmbAmount?.value || 0);

    const entry = {
      id: isEditMode ? editId : Date.now() + Math.floor(Math.random() * 1000),
      invoiceNo: officialInvoiceNo,
      date: invoiceDate?.value || "",
      customerId: customer.id,
      customerName: customer.name,
      brand: invoiceBrand?.value?.trim() || "",
      material: invoiceMaterial?.value?.trim() || "",
      cartons: Number(invoiceCartons?.value || 0),
      cbm: cbmNumeric,
      rmbAmount,
      rmbConverted,
      exchangeRate: rate,
      usdAmount,
      meterPrice,
      transportTotal,
      finalUsdTotal,
      reportLinkMode,
      reportAmount,
      spendFromRmb,
      rmbSpendAmount,
      details: invoiceDetails?.value?.trim() || "",
      attachmentUrl: currentInvoiceAttachment.url,
      attachmentName: currentInvoiceAttachment.name,
      createdAt: new Date().toISOString(),
    };

    let items = getSavedInvoices();
    const duplicate = items.find(
      (item) => String(item.invoiceNo) === String(officialInvoiceNo) && Number(item.id) !== Number(entry.id)
    );
    if (duplicate) {
      showMessage(invoiceMessage, "رقم الفاتورة مستخدم مسبقًا، اضغط تفريغ للحصول على رقم جديد.", false);
      return;
    }

    if (isEditMode) {
      const oldEntry = items.find((item) => Number(item.id) === Number(entry.id));
      const mergedEntry = {
        ...entry,
        createdAt: oldEntry?.createdAt || entry.createdAt,
      };
      items = items.map((item) => (Number(item.id) === Number(entry.id) ? mergedEntry : item));
    } else {
      items.unshift(entry);
    }

    if (items.length > MAX_SAVED_INVOICES) {
      items = items.slice(0, MAX_SAVED_INVOICES);
    }

    if (reportAmount > 0) {
      const reportModeText = reportLinkMode === "transport" ? "مبلغ النقل فقط" : "الإجمالي النهائي";
      await api("/api/receipts/transport-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customer.id,
          date: invoiceDate?.value || new Date().toISOString().slice(0, 10),
          amount: reportAmount,
          details: `ماركة: ${invoiceBrand?.value?.trim() || "-"} مع ${reportModeText}`,
        }),
      });
    }

    let rmbSpendNote = "";
    if (spendFromRmb && rmbSpendAmount > 0) {
      try {
        await api("/api/rmb-expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: customer.id,
            invoiceNo: officialInvoiceNo,
            date: invoiceDate?.value || new Date().toISOString().slice(0, 10),
            amount: rmbSpendAmount,
            exchangeRate: rate,
            details: `صرف رممبي لفاتورة ${officialInvoiceNo} | ماركة: ${invoiceBrand?.value?.trim() || "-"}`,
          }),
        });
      } catch (err) {
        const msg = String(err?.message || "");
        if (msg.includes("خدمة صرف الرممبي غير مفعلة") || msg.includes("Cannot POST /api/rmb-expenses")) {
          rmbSpendNote = " (لم يتم تسجيل صرف الرممبي: أعد تشغيل السيرفر)";
        } else {
          throw err;
        }
      }
    }

    setSavedInvoices(items);
    renderSavedInvoices();
    await loadCustomers();
    await loadRmbBalances();
    await loadRmbTransfers();
    if (reportCustomer && Number(reportCustomer.value) === Number(customer.id)) {
      await loadReport();
    }
    await resetInvoiceBuilderForm();
    showMessage(
      invoiceMessage,
      `${isEditMode ? "تم تحديث" : "تم حفظ"} الفاتورة وربط ${
        reportLinkMode === "transport" ? "مبلغ النقل فقط" : "الإجمالي النهائي"
      } في تقرير الزبائن.${spendFromRmb && rmbSpendAmount > 0 ? " وتم الصرف من رصيد الرممبي." : ""}${rmbSpendNote}`,
      true
    );
  } catch (err) {
    showMessage(invoiceMessage, err.message || "تعذر حفظ الفاتورة.", false);
  }
};

const resetInvoiceBuilderForm = async () => {
  if (!invoiceDate) return;
  invoiceDate.valueAsDate = new Date();
  if (invoiceNumber) invoiceNumber.value = getOfficialInvoiceNo(invoiceDate.value);
  if (invoiceCustomer) invoiceCustomer.value = "";
  if (invoiceBrand) invoiceBrand.value = "";
  if (invoiceMaterial) invoiceMaterial.value = "";
  if (invoiceCartons) invoiceCartons.value = "";
  if (invoiceCbm) invoiceCbm.value = "";
  if (invoiceRmbAmount) invoiceRmbAmount.value = "";
  if (invoiceRmbConverted) invoiceRmbConverted.value = "";
  if (invoiceExchangeRate) invoiceExchangeRate.value = "";
  if (invoiceUsdAmount) invoiceUsdAmount.value = "";
  if (invoiceTransportAmount) invoiceTransportAmount.value = "";
  if (invoiceTransportTotal) invoiceTransportTotal.value = "";
  if (invoiceReportLinkMode) invoiceReportLinkMode.value = "final";
  if (invoiceSpendRmb) invoiceSpendRmb.value = "no";
  if (invoiceDetails) invoiceDetails.value = "";
  if (invoiceAttachmentFile) invoiceAttachmentFile.value = "";
  setInvoiceAttachment({ url: "", name: "" });
  if (invoiceSave) {
    invoiceSave.dataset.editId = "";
    invoiceSave.textContent = "حفظ";
  }
  if (invoiceMessage) invoiceMessage.textContent = "";
  await loadNextInvoice();
};

const openInvoiceBuilderWindow = (invoiceEntry = null) => {
  const customer = invoiceEntry
    ? { name: invoiceEntry.customerName || "-" }
    : cachedCustomers.find((c) => c.id === Number(invoiceCustomer?.value));
  if (!customer) {
    showMessage(invoiceMessage, "اختر اسم الزبون أولاً.", false);
    return;
  }

  const number = invoiceEntry ? invoiceEntry.invoiceNo || "-" : invoiceNumber?.value || "-";
  const date = invoiceEntry ? invoiceEntry.date || "-" : invoiceDate?.value || new Date().toISOString().slice(0, 10);
  const brand = invoiceEntry ? invoiceEntry.brand || "-" : invoiceBrand?.value?.trim() || "-";
  const material = invoiceEntry ? invoiceEntry.material || "-" : invoiceMaterial?.value?.trim() || "-";
  const cartons = invoiceEntry ? invoiceEntry.cartons || "-" : invoiceCartons?.value || "-";
  const cbmNumeric = invoiceEntry ? Number(invoiceEntry.cbm || 0) : Number(invoiceCbm?.value || 0);
  const cbm = cbmNumeric > 0 ? String(cbmNumeric) : "-";
  const rmbAmount = invoiceEntry ? Number(invoiceEntry.rmbAmount || 0) : Number(invoiceRmbAmount?.value || 0);
  const rmbConverted = invoiceEntry
    ? Number(invoiceEntry.rmbConverted || 0)
    : Number(invoiceRmbConverted?.value || invoiceRmbAmount?.value || 0);
  const rate = invoiceEntry ? Number(invoiceEntry.exchangeRate || 0) : Number(invoiceExchangeRate?.value || 0);
  const usdAmount = invoiceEntry
    ? Number(invoiceEntry.usdAmount || 0)
    : rmbConverted > 0 && rate > 0
      ? rmbConverted / rate
      : 0;
  const transportInput = invoiceEntry ? Number(invoiceEntry.meterPrice || 0) : Number(invoiceTransportAmount?.value || 0);
  const transportAmount = invoiceEntry
    ? Number(invoiceEntry.transportTotal || 0)
    : cbmNumeric > 0 && transportInput > 0
      ? cbmNumeric * transportInput
      : transportInput;
  const details = invoiceEntry ? invoiceEntry.details || "-" : invoiceDetails?.value?.trim() || "-";
  const totalUsd = usdAmount + transportAmount;

  const rmbAmountDisplay = Number.isFinite(rmbAmount) && rmbAmount > 0 ? formatTransferValue(rmbAmount) : "-";
  const rmbConvertedDisplay = Number.isFinite(rmbConverted) && rmbConverted > 0 ? formatTransferValue(rmbConverted) : "-";
  const rateDisplay = Number.isFinite(rate) && rate > 0 ? formatTransferValue(rate) : "-";
  const usdAmountDisplay = Number.isFinite(usdAmount) && usdAmount > 0 ? formatTransferValue(usdAmount) : "-";
  const transportInputDisplay = Number.isFinite(transportInput) && transportInput > 0 ? formatTransferValue(transportInput) : "-";
  const transportAmountDisplay = Number.isFinite(transportAmount) && transportAmount > 0 ? formatTransferValue(transportAmount) : "-";
  const brandingHeaderHtml = getBrandingHeaderHtml();

  const popup = window.open("", "_blank");
  if (!popup) {
    showMessage(invoiceMessage, "المتصفح منع فتح نافذة الفاتورة. اسمح بالنوافذ المنبثقة.", false);
    return;
  }

  const safe = (value) => String(value === undefined || value === null || value === "" ? "-" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  popup.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>فاتورة رقم ${safe(number)}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f7f6f3; color: #1b1b1f; margin: 0; padding: 24px; }
          .invoice { max-width: 1150px; margin: 0 auto; border: 1px solid #d9d3c8; border-radius: 14px; overflow: hidden; background: #fff; }
          .head { background: linear-gradient(135deg, #f8f4ef 0%, #f0e8dd 100%); padding: 18px 22px; border-bottom: 1px solid #e0dcd4; }
          .head h1 { margin: 0; font-size: 24px; }
          .subhead { margin-top: 6px; color: #5e5a55; font-size: 13px; }
          .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px 20px 8px; }
          .box { background: #faf8f4; border: 1px solid #e0dcd4; border-radius: 10px; padding: 10px 12px; }
          .label { color: #4c4945; font-size: 13px; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 700; }
          .table-wrap { padding: 8px 20px 12px; overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #e0dcd4; padding: 9px 8px; text-align: center; font-size: 14px; }
          th { background: #f8f4ef; }
          .details-box { margin: 0 20px 12px; padding: 12px; border: 1px solid #e0dcd4; border-radius: 10px; background: #faf8f4; }
          .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 0 20px 16px; }
          .summary .box { background: #f6fbf8; }
          .totals { padding: 0 20px 18px; font-size: 16px; font-weight: 700; color: #1f7a8c; }
          .actions { display: flex; gap: 10px; justify-content: flex-start; padding: 0 20px 20px; }
          button { border: 1px solid #d8d0c2; background: #e9e3d8; border-radius: 8px; padding: 8px 14px; cursor: pointer; }
          @media print {
            .actions { display: none; }
            body { padding: 0; }
            .invoice { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          ${brandingHeaderHtml}
          <div class="head">
            <h1>فاتورة / Invoice</h1>
          </div>
          <div class="meta">
            <div class="box"><div class="label">رقم الفاتورة</div><div class="value">${safe(number)}</div></div>
            <div class="box"><div class="label">تاريخ الفاتورة</div><div class="value">${safe(date)}</div></div>
            <div class="box"><div class="label">اسم الزبون</div><div class="value">${safe(customer.name)}</div></div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ماركة</th>
                  <th>مادة</th>
                  <th>كرتون</th>
                  <th>CBM</th>
                  <th>مبلغ رممبي</th>
                  <th>تحويل مبلغ رممبي</th>
                  <th>سعر صرف</th>
                  <th>مبلغ دولار</th>
                  <th>سعر متر</th>
                  <th>الاجمالي مبلغ النقل</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${safe(brand)}</td>
                  <td>${safe(material)}</td>
                  <td>${safe(cartons)}</td>
                  <td>${safe(cbm)}</td>
                  <td>${safe(rmbAmountDisplay)}</td>
                  <td>${safe(rmbConvertedDisplay)}</td>
                  <td>${safe(rateDisplay)}</td>
                  <td>${safe(usdAmountDisplay)}</td>
                  <td>${safe(transportInputDisplay)}</td>
                  <td>${safe(transportAmountDisplay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="details-box">
            <div class="label">التفاصيل</div>
            <div class="value">${safe(details)}</div>
          </div>
          <div class="summary">
            <div class="box"><div class="label">مبلغ دولار</div><div class="value">${safe(usdAmountDisplay)}</div></div>
            <div class="box"><div class="label">الاجمالي مبلغ النقل</div><div class="value">${safe(transportAmountDisplay)}</div></div>
            <div class="box"><div class="label">الإجمالي النهائي بالدولار</div><div class="value">${safe(formatMoney(totalUsd > 0 ? Math.trunc(totalUsd) : 0))}</div></div>
          </div>
          <div class="actions">
            <button onclick="window.print()">طباعة</button>
            <button onclick="window.close()">اغلاق</button>
          </div>
        </div>
      </body>
    </html>
  `);
  popup.document.close();
  showMessage(invoiceMessage, "تم إنشاء معاينة الفاتورة بنجاح.", true);
};

const formatCustomerDetails = (customer, label) => {
  if (!customer) {
    return `<strong>${escapeHtml(label)}:</strong> -`;
  }
  return `
    <strong>${escapeHtml(label)}:</strong> ${escapeHtml(customer.name)} | 
    <strong>الكود:</strong> ${customer.code} | 
    <strong>الهاتف:</strong> ${escapeHtml(customer.phone || "-")} | 
    <strong>العنوان:</strong> ${escapeHtml(customer.address || "-")} | 
    <strong>الرصيد الابتدائي:</strong> ${formatMoney(customer.initial_balance)} | 
    <strong>الرصيد الحالي:</strong> ${formatMoney(customer.current_balance)}
  `;
};

const updateReceiptPartyDetails = () => {
  const sender = cachedCustomers.find((c) => c.id === Number(receiptSender.value));
  const receiver = cachedCustomers.find((c) => c.id === Number(receiptReceiver.value));
  if (!sender && !receiver) {
    receiptPartyDetails.textContent = "اختر مرسل أو مستلم لعرض البيانات.";
    return;
  }
  const senderBlock = formatCustomerDetails(sender, "المرسل");
  const receiverBlock = formatCustomerDetails(receiver, "المستلم");
  receiptPartyDetails.innerHTML = `${senderBlock}<br />${receiverBlock}`;
};

const updateTransferPartyDetails = () => {
  if (!transferPartyDetails) return;
  const sender = cachedCustomers.find((c) => c.id === Number(transferSender.value));
  const receiver = cachedCustomers.find((c) => c.id === Number(transferReceiver.value));
  if (!sender && !receiver) {
    transferPartyDetails.textContent = "اختر مرسل أو مستلم لعرض البيانات.";
    return;
  }
  const senderBlock = formatCustomerDetails(sender, "المرسل");
  const receiverBlock = formatCustomerDetails(receiver, "المستلم");
  const amount = Number(transferAmount.value || 0);
  const rate = Number(transferRate.value || 0);
  const conversionLine =
    amount && rate
      ? `مبلغ التحويل: ${formatTransferValue(amount)} ${transferCurrencyFrom.value} -> ${formatTransferValue(
          amount * rate
        )} ${transferCurrencyTo.value} (${formatTransferValue(amount)} * ${formatTransferValue(rate)})`
      : "";
  transferPartyDetails.innerHTML = `${senderBlock}<br />${receiverBlock}${conversionLine ? `<br />${conversionLine}` : ""}`;
};

const getReceiptCustomerId = () => {
  if (receiptSender.value) {
    return receiptSender.value;
  }
  if (receiptReceiver.value) {
    return receiptReceiver.value;
  }
  return "";
};

const openReceiptInvoiceWindow = ({ silent = false } = {}) => {
  const sender = cachedCustomers.find((c) => c.id === Number(receiptSender.value));
  const receiver = cachedCustomers.find((c) => c.id === Number(receiptReceiver.value));
  const invoiceNo = receiptInvoice.value || "-";
  const date = receiptDate.value || new Date().toISOString().slice(0, 10);
  const type = receiptType.value || "-";
  const amount = Number(receiptAmount.value || 0);
  const deliveryDate = receiptDelivery.value || "-";
  const details = receiptMore.value?.trim() || "-";
  const brandingHeaderHtml = getBrandingHeaderHtml();

  if (!sender) {
    if (!silent) {
      showMessage(receiptMessage, "اختر اسم المرسل قبل إنشاء الفاتورة.", false);
    }
    return;
  }
  if (!amount || Number.isNaN(amount) || amount <= 0) {
    if (!silent) {
      showMessage(receiptMessage, "ادخل مبلغ صحيح قبل إنشاء الفاتورة.", false);
    }
    return;
  }

  const popup = window.open("", "_blank");
  if (!popup) {
    if (!silent) {
      showMessage(receiptMessage, "المتصفح منع فتح نافذة الفاتورة. اسمح بالنوافذ المنبثقة.", false);
    }
    return;
  }

  const safe = (value) => String(value || "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  popup.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>فاتورة رقم ${safe(invoiceNo)}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #fff; color: #1b1b1f; margin: 0; padding: 24px; }
          .invoice { max-width: 820px; margin: 0 auto; border: 1px solid #e0dcd4; border-radius: 12px; overflow: hidden; }
          .head { background: #f8f4ef; padding: 16px 20px; border-bottom: 1px solid #e0dcd4; }
          .head h1 { margin: 0; font-size: 24px; }
          .meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 16px 20px; }
          .box { background: #faf8f4; border: 1px solid #e0dcd4; border-radius: 10px; padding: 10px 12px; }
          .label { color: #2e2e35; font-size: 13px; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 700; }
          .section { padding: 0 20px 20px; }
          .line { margin: 8px 0; }
          .amount { font-size: 22px; font-weight: 800; color: #1f7a8c; }
          .actions { display: flex; gap: 10px; justify-content: flex-start; padding: 0 20px 20px; }
          button { border: 1px solid #d8d0c2; background: #e9e3d8; border-radius: 8px; padding: 8px 14px; cursor: pointer; }
          @media print {
            .actions { display: none; }
            body { padding: 0; }
            .invoice { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          ${brandingHeaderHtml}
          <div class="head">
            <h1>فاتورة / Invoice</h1>
          </div>
          <div class="meta">
            <div class="box"><div class="label">رقم الفاتورة</div><div class="value">${safe(invoiceNo)}</div></div>
            <div class="box"><div class="label">التاريخ</div><div class="value">${safe(date)}</div></div>
            <div class="box"><div class="label">نوع البند</div><div class="value">${safe(type)}</div></div>
            <div class="box"><div class="label">تاريخ التسليم</div><div class="value">${safe(deliveryDate)}</div></div>
          </div>
          <div class="section">
            <div class="line"><strong>المرسل:</strong> ${safe(sender.name)} (${safe(sender.code)})</div>
            <div class="line"><strong>المستلم:</strong> ${safe(receiver?.name || "-")}${receiver ? ` (${safe(receiver.code)})` : ""}</div>
            <div class="line"><strong>التفاصيل:</strong> ${safe(details)}</div>
            <div class="line amount">المبلغ: ${safe(formatMoney(amount))}</div>
          </div>
          <div class="actions">
            <button onclick="window.print()">طباعة</button>
            <button onclick="window.close()">اغلاق</button>
          </div>
        </div>
      </body>
    </html>
  `);
  popup.document.close();
  if (!silent) {
    showMessage(receiptMessage, "تم إنشاء الفاتورة بنجاح.", true);
  }
};

const loadReceipts = async (customerId) => {
  if (!customerId) {
    receiptsTable.innerHTML = "";
    return;
  }
  const receipts = await api(`/api/receipts?customerId=${customerId}`);
  const customer = cachedCustomers.find((c) => c.id === Number(customerId));
  const initialBalance = Number(customer?.initial_balance || 0);
  const initialDate = receipts[0]?.date || new Date().toISOString().slice(0, 10);
  const openingRow = `
      <tr>
        <td>-</td>
        <td>${initialDate}</td>
        <td>رصيد افتتاحي</td>
        <td>${formatMoney(initialBalance)}</td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
    `;
  const receiptRows = receipts
    .map((r) => {
      const isTransportType = String(r.type || "").trim() === "النقل" || String(r.type || "").trim() === "بند النقل";
      const senderLabel = isTransportType ? "sabri" : r.sender_name || "-";
      const receiverLabel = isTransportType ? r.receiver_name || r.sender_name || "-" : r.receiver_name || "-";
      return `
      <tr>
        <td>${escapeHtml(r.invoice_no)}</td>
        <td>${escapeHtml(r.date)}</td>
        <td>${escapeHtml(r.type)}</td>
        <td>${formatMoney(r.amount)}</td>
        <td>${escapeHtml(senderLabel)}</td>
        <td>${escapeHtml(receiverLabel)}</td>
        <td>
          ${
            r.attachment_url
              ? `<a class="secondary" href="${escapeHtml(sanitizeHttpUrl(r.attachment_url))}" target="_blank" rel="noopener">مرفق</a>`
              : ""
          }
          <button class="secondary" data-receipt-edit="${r.id}">تعديل</button>
          <button class="secondary" data-receipt-delete="${r.id}">حذف</button>
        </td>
      </tr>
    `;
    })
    .join("");
  receiptsTable.innerHTML = `${openingRow}${receiptRows}`;
};

const resetReceiptForm = async () => {
  receiptDate.valueAsDate = new Date();
  receiptType.value = "قبض";
  receiptAmount.value = "";
  receiptSender.value = "";
  receiptReceiver.value = "";
  receiptDelivery.value = "";
  receiptMore.value = "";
  receiptMessage.textContent = "";
  receiptSave.dataset.editId = "";
  receiptSave.dataset.editSign = "";
  receiptSave.textContent = "حفظ";
  if (receiptAttachmentFile) {
    receiptAttachmentFile.value = "";
  }
  setReceiptAttachment({ url: "", name: "" });
  await loadNextInvoice();
  updateReceiptPartyDetails();
  receiptsTable.innerHTML = "";
};

const loadTransfers = async () => {
  if (!transfersTable) return;
  const customerId = transferSender.value || transferReceiver.value;
  if (!customerId) {
    transfersTable.innerHTML = "";
    return;
  }
  const transfers = await api(`/api/transfers?customerId=${customerId}`);
  transfersTable.innerHTML = transfers
    .map(
      (t) => `
      <tr>
        <td>${t.transfer_no}</td>
        <td>${escapeHtml(t.date)}</td>
        <td>${escapeHtml(t.sender_name)}</td>
        <td>${escapeHtml(t.receiver_name)}</td>
        <td>${formatMoney(t.amount)}</td>
        <td>${t.exchange_rate}</td>
        <td>${formatMoney(t.fee)}</td>
        <td>${t.currency_from}</td>
        <td>${t.currency_to}</td>
        <td>
          <button class="secondary" data-transfer-edit="${t.id}">تعديل</button>
          <button class="secondary" data-transfer-delete="${t.id}">حذف</button>
        </td>
      </tr>
    `
    )
    .join("");
};

const loadTransferById = async (id) => {
  return api(`/api/transfers/${id}`);
};

const resetTransferForm = () => {
  if (!transferDate) return;
  transferDate.valueAsDate = new Date();
  transferAmount.value = "";
  transferRate.value = "";
  transferFee.value = "0";
  if (transferTotal) transferTotal.value = "";
  transferMessage.textContent = "";
  transferSave.dataset.editId = "";
  updateTransferPartyDetails();
  transfersTable.innerHTML = "";
};

const fillTransferForm = (transfer) => {
  transferSender.value = transfer.sender_id;
  transferReceiver.value = transfer.receiver_id;
  transferDate.value = transfer.date;
  transferAmount.value = transfer.amount;
  transferRate.value = transfer.exchange_rate;
  transferFee.value = transfer.fee;
  transferCurrencyFrom.value = transfer.currency_from;
  transferCurrencyTo.value = transfer.currency_to;
  transferSave.dataset.editId = transfer.id;
  updateTransferTotal();
  updateTransferPartyDetails();
  setActiveScreen("transfers");
};

const loadRmbBalances = async () => {
  if (!rmbTable) return;
  const currencyTo = rmbCurrency?.value || "يوان";
  const rmbExpensesPromise = api("/api/rmb-expenses").catch((err) => {
    if ((err.message || "").includes("Cannot GET /api/rmb-expenses") || (err.message || "").includes("خطأ في الطلب")) {
      return [];
    }
    throw err;
  });

  const [rows, rmbTransfers, rmbExpenses] = await Promise.all([
    api(`/api/rmb-ledger?currencyTo=${encodeURIComponent(currencyTo)}`),
    api("/api/rmb-transfers?currencyFrom=رممبي"),
    rmbExpensesPromise,
  ]);
  const totalIncoming = rows.reduce((sum, row) => sum + Number(row.converted_amount || 0), 0);
  const totalOutgoing = rmbTransfers.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const totalExpenses = (rmbExpenses || []).reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const netTotal = totalIncoming - totalOutgoing - totalExpenses;
  if (rmbIncoming) rmbIncoming.value = formatTransferValue(totalIncoming);
  if (rmbOutgoing) rmbOutgoing.value = formatTransferValue(totalOutgoing + totalExpenses);
  if (rmbTotal) rmbTotal.value = formatTransferValue(netTotal);
  rmbTable.innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.date)}</td>
        <td>${escapeHtml(row.sender_name)}</td>
        <td>${escapeHtml(row.receiver_name)}</td>
        <td>${formatTransferValue(row.amount)}</td>
        <td>${formatTransferValue(row.exchange_rate)}</td>
        <td>${formatTransferValue(row.converted_amount)}</td>
        <td>
          <button class="secondary" data-rmb-edit="${row.id}">تعديل</button>
          <button class="secondary" data-rmb-delete="${row.id}">حذف</button>
        </td>
      </tr>
    `
    )
    .join("");
};

const loadRmbTransfers = async () => {
  if (!rmbTransfersTable) return;
  const expensesPromise = api("/api/rmb-expenses").catch((err) => {
    const msg = String(err?.message || "");
    if (msg.includes("Cannot GET /api/rmb-expenses") || msg.includes("خطأ في الطلب")) {
      return [];
    }
    throw err;
  });

  const [rows, expenses] = await Promise.all([
    api("/api/rmb-transfers?currencyFrom=رممبي"),
    expensesPromise,
  ]);

  const transferRows = (rows || []).map((row) => ({
    kind: "transfer",
    date: row.date,
    sender_name: row.sender_name,
    receiver_name: row.receiver_name,
    amount: Number(row.amount || 0),
    exchange_rate: row.exchange_rate,
    converted_amount: row.converted_amount,
    id: row.id,
  }));

  const expenseRows = (expenses || []).map((row) => ({
    kind: "expense",
    date: row.date,
    sender_name: row.customer_name || "-",
    receiver_name: "رصيد رممبي",
    amount: Number(row.amount || 0),
    exchange_rate: Number(row.exchange_rate || 0) > 0 ? Number(row.exchange_rate) : null,
    converted_amount:
      Number(row.exchange_rate || 0) > 0 ? Number(row.amount || 0) / Number(row.exchange_rate || 1) : null,
    invoice_no: row.invoice_no || "",
    id: row.id,
  }));

  const merged = [...transferRows, ...expenseRows].sort((a, b) => {
    const keyA = `${a.date || ""}-${a.kind}-${a.id || 0}`;
    const keyB = `${b.date || ""}-${b.kind}-${b.id || 0}`;
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });

  rmbTransfersTable.innerHTML = merged
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.date)}</td>
        <td>
          ${escapeHtml(row.sender_name)}
          ${
            row.kind === "expense"
              ? row.invoice_no
                ? `<button class="ops-badge warn" data-rmb-expense-invoice="${escapeHtml(String(row.invoice_no))}">صرف فاتورة</button>`
                : '<span class="ops-badge warn">صرف فاتورة</span>'
              : ""
          }
        </td>
        <td>${escapeHtml(row.receiver_name)}</td>
        <td>${formatTransferValue(row.amount)}</td>
        <td>${row.exchange_rate == null ? "-" : formatTransferValue(row.exchange_rate)}</td>
        <td>${row.converted_amount == null ? "-" : formatTransferValue(row.converted_amount)}</td>
        <td>
          ${
            row.kind === "expense"
              ? `<button class="secondary" data-rmb-expense-delete="${row.id}">حذف</button>`
              : `<button class="secondary" data-rmb-transfer-edit="${row.id}">تعديل</button>
          <button class="secondary" data-rmb-transfer-delete="${row.id}">حذف</button>`
          }
        </td>
      </tr>
    `
    )
    .join("");

  if (!merged.length) {
    rmbTransfersTable.innerHTML = `<tr><td colspan="7">لا توجد عمليات رممبي حالياً.</td></tr>`;
  }
};

const updateRmbTransferUsd = () => {
  if (!rmbTransferUsd) return;
  const amount = Number(rmbTransferAmount.value || 0);
  const rate = Number(rmbTransferRate.value || 0);
  if (!amount || !rate) {
    rmbTransferUsd.value = "";
    return;
  }
  rmbTransferUsd.value = formatTransferValue(amount / rate);
};

const resetRmbTransferForm = () => {
  if (!rmbTransferDate) return;
  rmbTransferDate.valueAsDate = new Date();
  rmbTransferAmount.value = "";
  rmbTransferRate.value = "";
  rmbTransferUsd.value = "";
  rmbTransferMessage.textContent = "";
  rmbTransferSave.dataset.editId = "";
};

const fillRmbTransferForm = (transfer) => {
  rmbTransferSender.value = transfer.sender_id;
  rmbTransferReceiver.value = transfer.receiver_id;
  rmbTransferDate.value = transfer.date;
  rmbTransferAmount.value = transfer.amount;
  rmbTransferRate.value = transfer.exchange_rate;
  rmbTransferSave.dataset.editId = transfer.id;
  updateRmbTransferUsd();
  setActiveScreen("rmb-balance");
};

const updateTransferTotal = () => {
  if (!transferTotal) return;
  const amount = Number(transferAmount.value || 0);
  const rate = Number(transferRate.value || 0);
  if (!amount || !rate) {
    transferTotal.value = "";
    return;
  }
  const total = amount * rate;
  transferTotal.value = formatTransferValue(total);
  updateTransferPartyDetails();
};

receiptSender.addEventListener("change", async () => {
  updateReceiptPartyDetails();
  await loadReceipts(getReceiptCustomerId());
});

receiptReceiver.addEventListener("change", async () => {
  updateReceiptPartyDetails();
  await loadReceipts(getReceiptCustomerId());
});

transferSender.addEventListener("change", async () => {
  updateTransferPartyDetails();
  await loadTransfers();
});

transferReceiver.addEventListener("change", async () => {
  updateTransferPartyDetails();
  await loadTransfers();
});

transferAmount.addEventListener("input", updateTransferTotal);
transferRate.addEventListener("input", updateTransferTotal);
transferCurrencyFrom.addEventListener("input", updateTransferTotal);
transferCurrencyTo.addEventListener("input", updateTransferTotal);

if (invoiceRmbAmount) {
  invoiceRmbAmount.addEventListener("input", updateInvoiceUsdAmount);
}
if (invoiceRmbConverted) {
  invoiceRmbConverted.addEventListener("input", updateInvoiceUsdAmount);
}
if (invoiceExchangeRate) {
  invoiceExchangeRate.addEventListener("input", updateInvoiceUsdAmount);
}
if (invoiceCbm) {
  invoiceCbm.addEventListener("input", updateInvoiceTransportTotal);
}
if (invoiceTransportAmount) {
  invoiceTransportAmount.addEventListener("input", updateInvoiceTransportTotal);
}

rmbTransferAmount.addEventListener("input", updateRmbTransferUsd);
rmbTransferRate.addEventListener("input", updateRmbTransferUsd);

receiptSave.addEventListener("click", async () => {
  try {
    const isEditMode = Boolean(receiptSave.dataset.editId);
    const rawAmount = Number(receiptAmount.value || 0);
    if (!rawAmount || Number.isNaN(rawAmount) || rawAmount <= 0) {
      showMessage(receiptMessage, "ادخل مبلغ صحيح.", false);
      return;
    }

    const payload = {
      senderCustomerId: receiptSender.value,
      receiverCustomerId: receiptReceiver.value,
      date: receiptDate.value,
      type: receiptType.value,
      amount: receiptAmount.value,
      deliveryDate: receiptDelivery.value,
      details: receiptMore.value,
      attachmentUrl: currentReceiptAttachment.url,
      attachmentName: currentReceiptAttachment.name,
      bypassDuplicateCheck: receiptSave.dataset.bypassDuplicate === "1",
    };

    if (!payload.senderCustomerId) {
      showMessage(receiptMessage, "اختر اسم المرسل.", false);
      return;
    }
    if (!isEditMode && payload.receiverCustomerId && payload.receiverCustomerId === payload.senderCustomerId) {
      showMessage(receiptMessage, "المرسل والمستلم لا يمكن أن يكونا نفس الزبون.", false);
      return;
    }

    if (isEditMode) {
      if (!buildRiskWarnings({ amount: rawAmount, exchangeRate: 0, contextLabel: "الوصل" })) {
        return;
      }
      const sign = Number(receiptSave.dataset.editSign || -1);
      const editPayload = {
        customerId: Number(payload.senderCustomerId),
        date: payload.date,
        type: payload.type,
        amount: Math.abs(rawAmount) * (sign >= 0 ? 1 : -1),
        senderName: payload.senderCustomerId
          ? (cachedCustomers.find((c) => c.id === Number(payload.senderCustomerId))?.name || "")
          : "",
        receiverName: payload.receiverCustomerId
          ? (cachedCustomers.find((c) => c.id === Number(payload.receiverCustomerId))?.name || "")
          : "",
        deliveryDate: payload.deliveryDate,
        details: payload.details,
        attachmentUrl: currentReceiptAttachment.url,
        attachmentName: currentReceiptAttachment.name,
      };
      await api(`/api/receipts/${receiptSave.dataset.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPayload),
      });
      showMessage(receiptMessage, "تم تعديل الوصل", true);
    } else {
      if (!buildRiskWarnings({ amount: rawAmount, exchangeRate: 0, contextLabel: "الوصل" })) {
        return;
      }
      await api("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (isAutoInvoiceEnabled()) {
        openReceiptInvoiceWindow({ silent: true });
      }
      showMessage(receiptMessage, "تم حفظ الوصل", true);
    }

    await loadReceipts(getReceiptCustomerId());
    await resetReceiptForm();
    await loadLedger();
    await loadCustomers();
    receiptSave.dataset.bypassDuplicate = "";
  } catch (err) {
    if (err.code === "SIMILAR_RECEIPT") {
      const ok = confirm(`${err.message}\nرقم مشابه: ${err.payload?.similar?.invoice_no || "-"}\nهل تريد المتابعة؟`);
      if (ok) {
        receiptSave.dataset.bypassDuplicate = "1";
        receiptSave.click();
        return;
      }
    }
    receiptSave.dataset.bypassDuplicate = "";
    showMessage(receiptMessage, err.message, false);
  }
});

receiptReset.addEventListener("click", () => {
  resetReceiptForm();
});

if (receiptAttachmentUpload) {
  receiptAttachmentUpload.addEventListener("click", async () => {
    try {
      const file = receiptAttachmentFile?.files?.[0];
      if (!file) {
        setStatus("اختر ملف مرفق للوصل", false);
        return;
      }
      receiptAttachmentUpload.disabled = true;
      const uploaded = await uploadAttachment(file);
      setReceiptAttachment(uploaded);
      setStatus("تم رفع مرفق الوصل", true);
    } catch (err) {
      setStatus(err.message || "تعذر رفع مرفق الوصل", false);
    } finally {
      receiptAttachmentUpload.disabled = false;
    }
  });
}

if (receiptAttachmentClear) {
  receiptAttachmentClear.addEventListener("click", () => {
    if (receiptAttachmentFile) {
      receiptAttachmentFile.value = "";
    }
    setReceiptAttachment({ url: "", name: "" });
  });
}

if (receiptCreateInvoice) {
  receiptCreateInvoice.addEventListener("click", () => {
    openReceiptInvoiceWindow();
  });
}

if (receiptAutoInvoice) {
  receiptAutoInvoice.addEventListener("change", () => {
    setAutoInvoiceEnabled(receiptAutoInvoice.checked);
  });
}

if (invoicePrint) {
  invoicePrint.addEventListener("click", () => {
    openInvoiceBuilderWindow();
  });
}

if (invoiceSave) {
  invoiceSave.addEventListener("click", async () => {
    await saveInvoiceBuilderData();
  });
}

if (invoiceReset) {
  invoiceReset.addEventListener("click", () => {
    resetInvoiceBuilderForm();
  });
}

if (invoiceAttachmentUpload) {
  invoiceAttachmentUpload.addEventListener("click", async () => {
    try {
      const file = invoiceAttachmentFile?.files?.[0];
      if (!file) {
        setStatus("اختر ملف مرفق للفاتورة", false);
        return;
      }
      invoiceAttachmentUpload.disabled = true;
      const uploaded = await uploadAttachment(file);
      setInvoiceAttachment(uploaded);
      setStatus("تم رفع مرفق الفاتورة", true);
    } catch (err) {
      setStatus(err.message || "تعذر رفع مرفق الفاتورة", false);
    } finally {
      invoiceAttachmentUpload.disabled = false;
    }
  });
}

if (invoiceAttachmentClear) {
  invoiceAttachmentClear.addEventListener("click", () => {
    if (invoiceAttachmentFile) {
      invoiceAttachmentFile.value = "";
    }
    setInvoiceAttachment({ url: "", name: "" });
  });
}

if (invoiceSavedTable) {
  invoiceSavedTable.addEventListener("click", async (event) => {
    const editId = Number(event.target.dataset.invoiceEdit || 0);
    const printId = Number(event.target.dataset.invoicePrint || 0);
    const deleteId = Number(event.target.dataset.invoiceDelete || 0);
    const items = getSavedInvoices();

    if (editId) {
      const entry = items.find((item) => Number(item.id) === editId);
      if (!entry) return;
      fillInvoiceFormFromSaved(entry);
      showMessage(invoiceMessage, "تم تحميل الفاتورة للتعديل.", true);
      setActiveScreen("invoice-builder");
      return;
    }

    if (printId) {
      const entry = items.find((item) => Number(item.id) === printId);
      if (!entry) return;
      openInvoiceBuilderWindow(entry);
      return;
    }

    if (deleteId) {
      const entry = items.find((item) => Number(item.id) === deleteId);
      const invoiceNo = String(entry?.invoiceNo || "").trim();
      if (invoiceNo) {
        try {
          await api(`/api/rmb-expenses/by-invoice/${encodeURIComponent(invoiceNo)}`, {
            method: "DELETE",
          });
        } catch (err) {
          const msg = String(err?.message || "");
          if (!msg.includes("Cannot DELETE /api/rmb-expenses/by-invoice")) {
            throw err;
          }
        }
      }
      const filtered = items.filter((item) => Number(item.id) !== deleteId);
      setSavedInvoices(filtered);
      renderSavedInvoices();
      await loadRmbTransfers();
      await loadRmbBalances();
      showMessage(invoiceMessage, "تم حذف الفاتورة المحفوظة.", true);
      await loadNextInvoice();
    }
  });
}

if (invoiceSavedSearch) {
  invoiceSavedSearch.addEventListener("input", () => {
    renderSavedInvoices();
  });
}

transferSave.addEventListener("click", async () => {
  try {
    const payload = {
      senderCustomerId: transferSender.value,
      receiverCustomerId: transferReceiver.value,
      date: transferDate.value,
      amount: transferAmount.value,
      exchangeRate: transferRate.value,
      fee: transferFee.value,
      currencyFrom: transferCurrencyFrom.value,
      currencyTo: transferCurrencyTo.value,
      bypassDuplicateCheck: transferSave.dataset.bypassDuplicate === "1",
    };
    if (!payload.senderCustomerId || !payload.receiverCustomerId) {
      showMessage(transferMessage, "اختر المرسل والمستلم.", false);
      return;
    }
    if (payload.senderCustomerId === payload.receiverCustomerId) {
      showMessage(transferMessage, "المرسل والمستلم لا يمكن أن يكونا نفس الزبون.", false);
      return;
    }
    if (!payload.amount || Number(payload.amount) <= 0) {
      showMessage(transferMessage, "ادخل مبلغ حوالة صحيح.", false);
      return;
    }
    if (!payload.exchangeRate || Number(payload.exchangeRate) <= 0) {
      showMessage(transferMessage, "ادخل سعر صرف صحيح.", false);
      return;
    }
    if (payload.fee === "" || Number(payload.fee) < 0) {
      showMessage(transferMessage, "العمولة يجب ان تكون صفر او اكبر.", false);
      return;
    }
    if (!payload.currencyFrom || !payload.currencyTo) {
      showMessage(transferMessage, "حدد العملة.", false);
      return;
    }
    if (
      !buildRiskWarnings({
        amount: Number(payload.amount),
        exchangeRate: Number(payload.exchangeRate),
        contextLabel: "التحويل",
      })
    ) {
      return;
    }

    if (transferSave.dataset.editId) {
      await api(`/api/transfers/${transferSave.dataset.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      showMessage(transferMessage, "تم تعديل التحويل", true);
    } else {
      await api("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      showMessage(transferMessage, "تم حفظ التحويل", true);
    }
    await loadRmbBalances();
    await loadTransfers();
    await loadLedger();
    await loadCustomers();
    transferSave.dataset.bypassDuplicate = "";
    resetTransferForm();
  } catch (err) {
    if (err.code === "SIMILAR_TRANSFER") {
      const ok = confirm(`${err.message}\nرقم مشابه: ${err.payload?.similar?.transfer_no || "-"}\nهل تريد المتابعة؟`);
      if (ok) {
        transferSave.dataset.bypassDuplicate = "1";
        transferSave.click();
        return;
      }
    }
    transferSave.dataset.bypassDuplicate = "";
    showMessage(transferMessage, err.message, false);
  }
});

transferReset.addEventListener("click", () => {
  resetTransferForm();
});

rmbTransferSave.addEventListener("click", async () => {
  try {
    const payload = {
      senderCustomerId: rmbTransferSender.value,
      receiverCustomerId: rmbTransferReceiver.value,
      date: rmbTransferDate.value,
      amount: rmbTransferAmount.value,
      exchangeRate: rmbTransferRate.value,
      fee: 0,
      currencyFrom: "رممبي",
      currencyTo: "دولار",
      bypassDuplicateCheck: rmbTransferSave.dataset.bypassDuplicate === "1",
    };
    if (!payload.senderCustomerId || !payload.receiverCustomerId) {
      showMessage(rmbTransferMessage, "اختر المرسل والمستلم.", false);
      return;
    }
    if (payload.senderCustomerId === payload.receiverCustomerId) {
      showMessage(rmbTransferMessage, "المرسل والمستلم لا يمكن أن يكونا نفس الزبون.", false);
      return;
    }
    if (!payload.amount || Number(payload.amount) <= 0) {
      showMessage(rmbTransferMessage, "ادخل مبلغ رممبي صحيح.", false);
      return;
    }
    if (!payload.exchangeRate || Number(payload.exchangeRate) <= 0) {
      showMessage(rmbTransferMessage, "ادخل سعر صرف صحيح.", false);
      return;
    }
    if (
      !buildRiskWarnings({
        amount: Number(payload.amount),
        exchangeRate: Number(payload.exchangeRate),
        contextLabel: "حوالة رممبي",
      })
    ) {
      return;
    }

    if (rmbTransferSave.dataset.editId) {
      await api(`/api/transfers/${rmbTransferSave.dataset.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      showMessage(rmbTransferMessage, "تم تعديل حوالة رممبي", true);
    } else {
      await api("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      showMessage(rmbTransferMessage, "تم حفظ حوالة رممبي", true);
    }

    await loadRmbTransfers();
    await loadRmbBalances();
    await loadTransfers();
    await loadLedger();
    await loadCustomers();
    rmbTransferSave.dataset.bypassDuplicate = "";
    resetRmbTransferForm();
  } catch (err) {
    if (err.code === "SIMILAR_TRANSFER") {
      const ok = confirm(`${err.message}\nرقم مشابه: ${err.payload?.similar?.transfer_no || "-"}\nهل تريد المتابعة؟`);
      if (ok) {
        rmbTransferSave.dataset.bypassDuplicate = "1";
        rmbTransferSave.click();
        return;
      }
    }
    rmbTransferSave.dataset.bypassDuplicate = "";
    showMessage(rmbTransferMessage, err.message, false);
  }
});

rmbTransferReset.addEventListener("click", () => {
  resetRmbTransferForm();
});

if (rmbLoad) {
  rmbLoad.addEventListener("click", () => {
    loadRmbBalances();
  });
}

receiptsTable.addEventListener("click", async (event) => {
  const editId = event.target.dataset.receiptEdit;
  const deleteId = event.target.dataset.receiptDelete;
  if (editId) {
    const customerId = getReceiptCustomerId();
    if (!customerId) return;
    const receipts = await api(`/api/receipts?customerId=${customerId}`);
    const receipt = receipts.find((r) => r.id === Number(editId));
    if (!receipt) return;
    receiptSave.dataset.editId = String(receipt.id);
    receiptSave.dataset.editSign = Number(receipt.amount) >= 0 ? "1" : "-1";
    receiptSave.textContent = "حفظ التعديل";
    receiptDate.value = receipt.date || "";
    receiptType.value = receipt.type || "قبض";
    receiptAmount.value = String(Math.abs(Number(receipt.amount || 0)));
    receiptDelivery.value = receipt.delivery_date || "";
    receiptMore.value = receipt.details || "";
    if (receiptAttachmentFile) {
      receiptAttachmentFile.value = "";
    }
    setReceiptAttachment({
      url: receipt.attachment_url || "",
      name: receipt.attachment_name || "",
    });
    showMessage(receiptMessage, "تم تحميل الوصل للتعديل.", true);
    return;
  }
  if (deleteId) {
    const confirmed = confirm("هل تريد حذف هذا الوصل؟\nإذا كان مرتبطًا بحوالة، سيتم حذف طرفي الحوالة (المرسل والمستلم) معًا.");
    if (!confirmed) {
      return;
    }
    await api(`/api/receipts/${deleteId}`, { method: "DELETE" });
    await loadReceipts(getReceiptCustomerId());
    await loadLedger();
    await loadCustomers();
  }
});

transfersTable.addEventListener("click", async (event) => {
  const editId = event.target.dataset.transferEdit;
  const deleteId = event.target.dataset.transferDelete;
  if (editId) {
    const transfer = await loadTransferById(editId);
    fillTransferForm(transfer);
    return;
  }
  if (deleteId) {
    await api(`/api/transfers/${deleteId}`, { method: "DELETE" });
    await loadTransfers();
    await loadLedger();
    await loadCustomers();
    await loadRmbBalances();
  }
});

rmbTable.addEventListener("click", async (event) => {
  const editId = event.target.dataset.rmbEdit;
  const deleteId = event.target.dataset.rmbDelete;
  try {
    if (editId) {
      const transfer = await loadTransferById(editId);
      fillTransferForm(transfer);
      return;
    }
    if (deleteId) {
      const confirmed = confirm("هل تريد حذف عملية إيداع الرممبي؟");
      if (!confirmed) {
        return;
      }
      await api(`/api/transfers/${deleteId}`, { method: "DELETE" });
      await loadRmbBalances();
      await loadRmbTransfers();
      await loadTransfers();
      await loadLedger();
      await loadCustomers();
      showMessage(rmbTransferMessage, "تم حذف عملية الإيداع بنجاح.", true);
    }
  } catch (err) {
    showMessage(rmbTransferMessage, err.message || "تعذر حذف عملية الإيداع.", false);
  }
});

rmbTransfersTable.addEventListener("click", async (event) => {
  const expenseInvoiceNo = String(event.target.dataset.rmbExpenseInvoice || "").trim();
  const expenseDeleteId = Number(event.target.dataset.rmbExpenseDelete || 0);
  const editId = event.target.dataset.rmbTransferEdit;
  const deleteId = event.target.dataset.rmbTransferDelete;

  if (expenseInvoiceNo) {
    const opened = openSavedInvoiceByNo(expenseInvoiceNo, { preview: true });
    if (!opened) {
      setActiveScreen("invoice-builder");
      if (invoiceNumber) {
        invoiceNumber.value = expenseInvoiceNo;
      }
      showMessage(invoiceMessage, `لم يتم العثور على الفاتورة رقم ${expenseInvoiceNo} ضمن الفواتير المحفوظة.`, false);
    }
    return;
  }

  if (expenseDeleteId) {
    if (!confirm("هل تريد حذف حركة صرف الفاتورة من سجل رممبي؟")) {
      return;
    }
    await api(`/api/rmb-expenses/${expenseDeleteId}`, { method: "DELETE" });
    await loadRmbTransfers();
    await loadRmbBalances();
    return;
  }

  if (editId) {
    const transfer = await loadTransferById(editId);
    fillRmbTransferForm(transfer);
    return;
  }
  if (deleteId) {
    await api(`/api/transfers/${deleteId}`, { method: "DELETE" });
    await loadRmbTransfers();
    await loadRmbBalances();
    await loadTransfers();
    await loadLedger();
    await loadCustomers();
  }
});

const formatBalanceClass = (value) => (value > 0 ? "balance-positive" : value < 0 ? "balance-negative" : "");

const applyBalanceClass = (element, value) => {
  if (!element) return;
  element.classList.remove("balance-positive", "balance-negative", "positive-strong", "negative-strong");
  const className = formatBalanceClass(Number(value || 0));
  if (className) {
    element.classList.add(className);
  }
};

const getBudgetPeriodValue = () => {
  if (!budgetPeriodType) return "";
  if (budgetPeriodType.value === "monthly") {
    return budgetPeriodMonth?.value || "";
  }
  return budgetPeriodYear?.value || "";
};

const formatBudgetKind = (kind) => (kind === "income" ? "دخل" : "مصروف");

const formatBudgetPeriod = (type, value) => (type === "monthly" ? `شهري ${value}` : `سنوي ${value}`);

const setBudgetPeriodVisibility = () => {
  if (!budgetPeriodType || !budgetPeriodMonthRow || !budgetPeriodYearRow) return;
  const isMonthly = budgetPeriodType.value === "monthly";
  budgetPeriodMonthRow.style.display = isMonthly ? "flex" : "none";
  budgetPeriodYearRow.style.display = isMonthly ? "none" : "flex";
};

const setBudgetDefaults = () => {
  if (!budgetPeriodType) return;
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  budgetPeriodType.value = "monthly";
  if (budgetPeriodMonth) budgetPeriodMonth.value = `${year}-${month}`;
  if (budgetPeriodYear) budgetPeriodYear.value = year;
  setBudgetPeriodVisibility();
};

const resetBudgetForm = () => {
  if (!budgetSave) return;
  budgetCategory.value = "";
  budgetKind.value = "income";
  budgetAmount.value = "";
  budgetNotes.value = "";
  budgetMessage.textContent = "";
  budgetSave.dataset.editId = "";
};

const fillBudgetForm = (item) => {
  if (budgetCustomer) {
    budgetCustomer.value = item.customer_id || "";
  }
  budgetPeriodType.value = item.period_type;
  setBudgetPeriodVisibility();
  if (item.period_type === "monthly") {
    budgetPeriodMonth.value = item.period_value;
  } else {
    budgetPeriodYear.value = item.period_value;
  }
  budgetCategory.value = item.category;
  budgetKind.value = item.kind;
  budgetAmount.value = item.amount;
  budgetNotes.value = item.notes || "";
  budgetSave.dataset.editId = item.id;
  setActiveScreen("budget");
};

const loadBudget = async () => {
  if (!budgetTable) return;
  const periodType = budgetPeriodType.value;
  const periodValue = getBudgetPeriodValue();
  if (!periodType || !periodValue) {
    budgetTable.innerHTML = "";
    if (budgetIncomeTotal) budgetIncomeTotal.textContent = "0";
    if (budgetExpenseTotal) budgetExpenseTotal.textContent = "0";
    if (budgetNetTotal) budgetNetTotal.textContent = "0";
    if (budgetActualIncome) budgetActualIncome.textContent = "0";
    if (budgetActualExpense) budgetActualExpense.textContent = "0";
    if (budgetActualNet) budgetActualNet.textContent = "0";
    if (budgetDiffIncome) budgetDiffIncome.textContent = "0";
    if (budgetDiffExpense) budgetDiffExpense.textContent = "0";
    if (budgetDiffNet) budgetDiffNet.textContent = "0";
    applyBalanceClass(budgetNetTotal, 0);
    applyBalanceClass(budgetActualNet, 0);
    applyBalanceClass(budgetDiffIncome, 0);
    applyBalanceClass(budgetDiffExpense, 0);
    applyBalanceClass(budgetDiffNet, 0);
    return;
  }
  try {
    const customerId = budgetCustomer ? budgetCustomer.value : "";
    const customerPart = customerId ? `&customerId=${encodeURIComponent(customerId)}` : "";
    const data = await api(
      `/api/budget?periodType=${encodeURIComponent(periodType)}&periodValue=${encodeURIComponent(periodValue)}${customerPart}`
    );
    cachedBudgetItems = data.rows || [];
    const actualsByCategory = data.actualsByCategory || {};
    budgetTable.innerHTML = data.rows
      .map(
        (item) => {
          const categoryActual = actualsByCategory[item.category] || { income: 0, expense: 0 };
          const actualValue = item.kind === "income" ? categoryActual.income : categoryActual.expense;
          const diffValue = actualValue - Number(item.amount || 0);
          return `
        <tr>
          <td>${escapeHtml(item.customer_name || "الشركة")}</td>
          <td>${formatBudgetPeriod(item.period_type, item.period_value)}</td>
          <td>${escapeHtml(item.category)}</td>
          <td>${formatBudgetKind(item.kind)}</td>
          <td>${formatTransferValue(item.amount)}</td>
          <td>${formatTransferValue(actualValue)}</td>
          <td class="${formatBalanceClass(diffValue)}">${formatTransferValue(diffValue)}</td>
          <td>${escapeHtml(item.notes || "-")}</td>
          <td>
            <button class="secondary" data-budget-edit="${item.id}">تعديل</button>
            <button class="secondary" data-budget-delete="${item.id}">حذف</button>
          </td>
        </tr>
      `;
        }
      )
      .join("");
    if (budgetIncomeTotal) budgetIncomeTotal.textContent = formatTransferValue(data.totals.income);
    if (budgetExpenseTotal) budgetExpenseTotal.textContent = formatTransferValue(data.totals.expense);
    if (budgetNetTotal) budgetNetTotal.textContent = formatTransferValue(data.totals.net);
    if (budgetActualIncome) budgetActualIncome.textContent = formatTransferValue(data.actuals?.income || 0);
    if (budgetActualExpense) budgetActualExpense.textContent = formatTransferValue(data.actuals?.expense || 0);
    if (budgetActualNet) budgetActualNet.textContent = formatTransferValue(data.actuals?.net || 0);
    if (budgetDiffIncome)
      budgetDiffIncome.textContent = formatTransferValue((data.actuals?.income || 0) - data.totals.income);
    if (budgetDiffExpense)
      budgetDiffExpense.textContent = formatTransferValue((data.actuals?.expense || 0) - data.totals.expense);
    if (budgetDiffNet)
      budgetDiffNet.textContent = formatTransferValue((data.actuals?.net || 0) - data.totals.net);

    applyBalanceClass(budgetNetTotal, data.totals.net);
    applyBalanceClass(budgetActualNet, data.actuals?.net || 0);
    applyBalanceClass(budgetDiffIncome, (data.actuals?.income || 0) - data.totals.income);
    applyBalanceClass(budgetDiffExpense, (data.actuals?.expense || 0) - data.totals.expense);
    applyBalanceClass(budgetDiffNet, (data.actuals?.net || 0) - data.totals.net);
  } catch (err) {
    showMessage(budgetMessage, err.message, false);
  }
};

if (budgetLoad) {
  budgetLoad.addEventListener("click", () => {
    loadBudget();
  });
}

if (budgetSave) {
  budgetSave.addEventListener("click", async () => {
    try {
      const periodType = budgetPeriodType.value;
      const periodValue = getBudgetPeriodValue();
      const payload = {
        customerId: budgetCustomer ? budgetCustomer.value : "",
        periodType,
        periodValue,
        category: budgetCategory.value.trim(),
        kind: budgetKind.value,
        amount: budgetAmount.value,
        notes: budgetNotes.value.trim(),
      };
      if (!payload.periodValue) {
        showMessage(budgetMessage, "حدد الفترة.", false);
        return;
      }
      if (!payload.category) {
        showMessage(budgetMessage, "ادخل اسم البند.", false);
        return;
      }
      if (!payload.amount || Number(payload.amount) <= 0) {
        showMessage(budgetMessage, "ادخل مبلغ صحيح.", false);
        return;
      }

      if (budgetSave.dataset.editId) {
        await api(`/api/budget/${budgetSave.dataset.editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showMessage(budgetMessage, "تم تعديل بند الميزانية", true);
      } else {
        await api("/api/budget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showMessage(budgetMessage, "تم حفظ بند الميزانية", true);
      }
      await loadBudget();
      resetBudgetForm();
    } catch (err) {
      showMessage(budgetMessage, err.message, false);
    }
  });
}

if (budgetReset) {
  budgetReset.addEventListener("click", () => {
    resetBudgetForm();
  });
}

if (budgetTable) {
  budgetTable.addEventListener("click", async (event) => {
    const editId = event.target.dataset.budgetEdit;
    const deleteId = event.target.dataset.budgetDelete;
    if (editId) {
      const item = cachedBudgetItems.find((entry) => entry.id === Number(editId));
      if (item) {
        fillBudgetForm(item);
      }
      return;
    }
    if (deleteId) {
      await api(`/api/budget/${deleteId}`, { method: "DELETE" });
      await loadBudget();
      resetBudgetForm();
    }
  });
}

const loadLedger = async () => {
  const customerId = ledgerCustomer.value;
  if (!customerId) {
    ledgerTable.innerHTML = "";
    ledgerBalance.textContent = "";
    return;
  }
  const from = ledgerFrom.value;
  const to = ledgerTo.value;
  const data = await api(
    `/api/ledger?customerId=${customerId}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
  );

  ledgerBalance.innerHTML = `
    <span>الرصيد السابق: <strong class="${formatBalanceClass(data.previous_balance)}">${formatMoney(data.previous_balance)}</strong></span>
    <span>الرصيد الحالي: <strong class="${formatBalanceClass(data.current_balance)}">${formatMoney(data.current_balance)}</strong></span>
  `;

  ledgerTable.innerHTML = data.entries
    .map((e) => {
      const typeText = String(e.type || "").trim();
      const isTransportType = typeText === "النقل" || typeText === "بند النقل";
      const senderLabel = isTransportType ? "sabri" : e.sender_name || "-";
      const receiverLabel = isTransportType ? e.receiver_name || e.sender_name || "-" : e.receiver_name || "-";
      return `
      <tr>
        <td>${escapeHtml(e.invoice_no)}</td>
        <td>${escapeHtml(e.date)}</td>
        <td>${escapeHtml(senderLabel)}</td>
        <td>${escapeHtml(receiverLabel)}</td>
        <td>${formatMoney(e.amount)}</td>
        <td>${escapeHtml(e.details || "-")}</td>
        <td class="${formatBalanceClass(e.running_balance)}">${formatMoney(e.running_balance)}</td>
      </tr>
    `;
    })
    .join("");
};

ledgerLoad.addEventListener("click", () => {
  loadLedger();
});

const loadReport = async () => {
  const customerId = reportCustomer.value;
  if (!customerId) {
    reportTable.innerHTML = "";
    return;
  }
  const from = reportFrom.value;
  const to = reportTo.value;
  const data = await api(
    `/api/ledger?customerId=${customerId}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
  );
  reportTable.innerHTML = data.entries
    .map((e) => {
      const typeText = String(e.type || "").trim();
      const isTransportType = typeText === "النقل" || typeText === "بند النقل";
      const senderLabel = isTransportType ? "sabri" : e.sender_name || "-";
      const receiverLabel = isTransportType ? e.receiver_name || e.sender_name || "-" : e.receiver_name || "-";
      return `
      <tr>
        <td>${escapeHtml(e.invoice_no)}</td>
        <td>${escapeHtml(e.date)}</td>
        <td>${escapeHtml(e.type)}</td>
        <td>${formatMoney(e.amount)}</td>
        <td>${escapeHtml(senderLabel)}</td>
        <td>${escapeHtml(receiverLabel)}</td>
        <td>${escapeHtml(cleanReportDetails(e.details))}</td>
        <td class="${formatBalanceClass(e.running_balance)}" data-balance-value="${Number(e.running_balance || 0)}">${formatMoney(e.running_balance)}</td>
      </tr>
    `;
    })
    .join("");

  const customer = cachedCustomers.find((c) => c.id === Number(customerId));
};

const exportReportExcel = () => {
  const rows = Array.from(reportTable.querySelectorAll("tr"));
  if (!rows.length) {
    showMessage(reportMessage, "لا يوجد بيانات للتصدير.", false);
    return;
  }

  const headers = ["فاتورة", "تاريخ", "النوع", "المبلغ", "المرسل", "المستلم", "التفاصيل", "الرصيد"];
  const lines = [headers.join(",")];
  rows.forEach((tr) => {
    const values = Array.from(tr.querySelectorAll("td")).map((td) => {
      const v = (td.textContent || "").replaceAll('"', '""').trim();
      return `"${v}"`;
    });
    lines.push(values.join(","));
  });

  const blob = new Blob([`\uFEFF${lines.join("\n")}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `customer-report-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showMessage(reportMessage, "تم تصدير التقرير إلى Excel (CSV).", true);
};

const exportReportPdf = () => {
  const tableElement = getReportTableElement();
  if (!tableElement || !reportTable.querySelector("tr")) {
    showMessage(reportMessage, "لا يوجد بيانات للتصدير.", false);
    return;
  }
  const customer = cachedCustomers.find((c) => c.id === Number(reportCustomer.value));
  const title = `تقرير الزبون: ${customer?.name || "-"}`;
  const popup = window.open("", "_blank");
  if (!popup) {
    showMessage(reportMessage, "المتصفح منع فتح نافذة التصدير.", false);
    return;
  }
  popup.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1 { margin: 0 0 14px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #bbb; padding: 8px; text-align: center; }
          th { background: #f3f3f3; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${tableElement.outerHTML}
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
  showMessage(reportMessage, "تم فتح تصدير PDF للطباعة/الحفظ.", true);
};

const exportCustomerStatementPdf = async () => {
  const customerId = reportCustomer.value;
  if (!customerId) {
    showMessage(reportMessage, "اختر زبون أولاً.", false);
    return;
  }

  const from = reportFrom.value;
  const to = reportTo.value;
  const data = await api(
    `/api/ledger?customerId=${customerId}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
  );
  if (!data.entries?.length) {
    showMessage(reportMessage, "لا يوجد بيانات كشف ضمن هذه الفترة.", false);
    return;
  }

  const customer = cachedCustomers.find((c) => c.id === Number(customerId));
  const openingBalance = Number(data.previous_balance || 0);
  const closingBalance = Number(data.current_balance || 0);

  const popup = window.open("", "_blank");
  if (!popup) {
    showMessage(reportMessage, "المتصفح منع فتح نافذة الطباعة.", false);
    return;
  }

  const rowsHtml = data.entries
    .map(
      (e) => `
      <tr>
        <td>${e.invoice_no}</td>
        <td>${e.date}</td>
        <td>${e.type}</td>
        <td>${formatMoney(e.amount)}</td>
        <td>${cleanReportDetails(e.details)}</td>
        <td>${formatMoney(e.running_balance)}</td>
      </tr>
    `
    )
    .join("");

  popup.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>كشف حساب - ${customer?.name || "-"}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 22px; color: #1b1b1f; }
          h1 { margin: 0 0 6px; }
          .meta { margin-bottom: 14px; color: #333; }
          .totals { display: flex; gap: 24px; margin: 10px 0 16px; font-weight: 700; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #b9b9b9; padding: 8px; text-align: center; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>كشف حساب زبون</h1>
        <div class="meta">الزبون: ${customer?.name || "-"} | الفترة: ${from || "البداية"} - ${to || "الآن"}</div>
        <div class="totals">
          <div>الرصيد الافتتاحي: ${formatMoney(openingBalance)}</div>
          <div>الرصيد الختامي: ${formatMoney(closingBalance)}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>فاتورة</th>
              <th>تاريخ</th>
              <th>النوع</th>
              <th>المبلغ</th>
              <th>التفاصيل</th>
              <th>الرصيد</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
  showMessage(reportMessage, "تم فتح كشف الحساب PDF للطباعة.", true);
};

const toDateInputValue = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const exportQuickSalesReport = async (period = "daily") => {
  const now = new Date();
  const to = toDateInputValue(now);
  const fromDate = new Date(now);
  if (period === "weekly") {
    fromDate.setDate(now.getDate() - 6);
  }
  const from = toDateInputValue(fromDate);
  const customerId = reportCustomer?.value || "";
  const customerPart = customerId ? `&customerId=${encodeURIComponent(customerId)}` : "";
  const data = await api(
    `/api/sales-report?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${customerPart}`
  );

  const rows = data.rows || [];
  if (!rows.length) {
    showMessage(reportMessage, "لا توجد بيانات ضمن المدة المحددة للتقرير السريع.", false);
    return;
  }

  const headers = ["فاتورة", "تاريخ", "الزبون", "النوع", "المبلغ", "المرسل", "المستلم", "التفاصيل"];
  const lines = [headers.join(",")];
  rows.forEach((row) => {
    const values = [
      row.invoice_no,
      row.date,
      row.customer_name,
      row.type,
      formatMoney(row.amount),
      row.sender_name || "-",
      row.receiver_name || "-",
      row.details || "-",
    ].map((val) => `"${String(val).replaceAll('"', '""')}"`);
    lines.push(values.join(","));
  });

  lines.push("");
  lines.push(`"إجمالي المبيعات","${formatMoney(data.summary?.totalSales || 0)}"`);
  lines.push(`"عدد العمليات","${data.summary?.totalCount || 0}"`);
  lines.push(`"عدد الزبائن","${data.summary?.customersCount || 0}"`);

  const blob = new Blob([`\uFEFF${lines.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${period === "weekly" ? "weekly" : "daily"}-quick-report-${to}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showMessage(reportMessage, `تم تصدير التقرير ${period === "weekly" ? "الأسبوعي" : "اليومي"} السريع.`, true);
};

const setSalesDefaults = () => {
  if (!salesFrom || !salesTo) return;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  salesFrom.value = `${year}-${month}-01`;
  salesTo.value = `${year}-${month}-${day}`;
};

const loadSalesReport = async () => {
  if (!salesTable) return;
  const customerId = salesCustomer?.value || "";
  const from = salesFrom?.value || "";
  const to = salesTo?.value || "";
  const customerPart = customerId ? `&customerId=${encodeURIComponent(customerId)}` : "";
  const data = await api(
    `/api/sales-report?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${customerPart}`
  );

  salesTable.innerHTML = (data.rows || [])
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.invoice_no)}</td>
        <td>${escapeHtml(row.date)}</td>
        <td>${escapeHtml(row.customer_name)}</td>
        <td>${escapeHtml(row.type)}</td>
        <td>${formatMoney(row.amount)}</td>
        <td>${escapeHtml(row.sender_name || "-")}</td>
        <td>${escapeHtml(row.receiver_name || "-")}</td>
        <td>${escapeHtml(row.details || "-")}</td>
      </tr>
    `
    )
    .join("");

  if (!data.rows?.length) {
    salesTable.innerHTML = `
      <tr>
        <td colspan="8">لا توجد بيانات مبيعات ضمن هذا الفلتر.</td>
      </tr>
    `;
  }

  if (salesTotal) salesTotal.textContent = formatMoney(data.summary?.totalSales || 0);
  if (salesCount) salesCount.textContent = String(data.summary?.totalCount || 0);
  if (salesCustomers) salesCustomers.textContent = String(data.summary?.customersCount || 0);
};

reportSearch.addEventListener("click", () => {
  loadReport();
});

if (dashboardRefresh) {
  dashboardRefresh.addEventListener("click", () => {
    loadDashboard();
  });
}

if (dashboardNetDebtors) {
  enableMultiSelectToggle(dashboardNetDebtors);
  dashboardNetDebtors.addEventListener("change", () => {
    recalcDashboardNetCard();
  });
}

if (dashboardNetDebtorsSelectAll) {
  dashboardNetDebtorsSelectAll.addEventListener("click", () => {
    setAllSelectOptions(dashboardNetDebtors, true);
  });
}

if (dashboardNetDebtorsClear) {
  dashboardNetDebtorsClear.addEventListener("click", () => {
    setAllSelectOptions(dashboardNetDebtors, false);
  });
}

if (dashboardNetPayables) {
  enableMultiSelectToggle(dashboardNetPayables);
  dashboardNetPayables.addEventListener("change", () => {
    recalcDashboardNetCard();
  });
}

if (dashboardNetPayablesSelectAll) {
  dashboardNetPayablesSelectAll.addEventListener("click", () => {
    setAllSelectOptions(dashboardNetPayables, true);
  });
}

if (dashboardNetPayablesClear) {
  dashboardNetPayablesClear.addEventListener("click", () => {
    setAllSelectOptions(dashboardNetPayables, false);
  });
}

if (reportExportExcel) {
  reportExportExcel.addEventListener("click", () => {
    exportReportExcel();
  });
}

if (reportExportPdf) {
  reportExportPdf.addEventListener("click", () => {
    exportReportPdf();
  });
}

if (reportExportStatement) {
  reportExportStatement.addEventListener("click", async () => {
    try {
      await exportCustomerStatementPdf();
    } catch (err) {
      showMessage(reportMessage, err.message || "فشل تجهيز كشف الحساب PDF.", false);
    }
  });
}

if (reportQuickDaily) {
  reportQuickDaily.addEventListener("click", async () => {
    try {
      await exportQuickSalesReport("daily");
    } catch (err) {
      showMessage(reportMessage, err.message || "فشل تصدير التقرير اليومي السريع.", false);
    }
  });
}

if (reportQuickWeekly) {
  reportQuickWeekly.addEventListener("click", async () => {
    try {
      await exportQuickSalesReport("weekly");
    } catch (err) {
      showMessage(reportMessage, err.message || "فشل تصدير التقرير الأسبوعي السريع.", false);
    }
  });
}

if (salesLoad) {
  salesLoad.addEventListener("click", () => {
    loadSalesReport();
  });
}

if (salesCustomer) {
  salesCustomer.addEventListener("change", () => {
    loadSalesReport();
  });
}

if (timelineLoad) {
  timelineLoad.addEventListener("click", async () => {
    try {
      await loadCustomerTimeline();
      showMessage(timelineMessage, "تم تحميل سجل النشاط.", true);
    } catch (err) {
      showMessage(timelineMessage, err.message || "فشل تحميل سجل النشاط.", false);
    }
  });
}

if (kpiLoad) {
  kpiLoad.addEventListener("click", async () => {
    try {
      await loadMonthlyKpis();
      showMessage(kpiMessage, "تم تحميل مؤشرات KPI الشهرية.", true);
    } catch (err) {
      showMessage(kpiMessage, err.message || "فشل تحميل KPI.", false);
    }
  });
}

if (monthlyCloseSave) {
  monthlyCloseSave.addEventListener("click", async () => {
    try {
      const closeMonthValue = getMonthInputValue(monthlyCloseMonth);
      if (!closeMonthValue) {
        showMessage(monthlyCloseMessage, "حدد الشهر أولاً.", false);
        return;
      }
      await api("/api/monthly-closes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: closeMonthValue,
          reason: monthlyCloseReason?.value || "",
        }),
      });
      await loadMonthlyCloses();
      showMessage(monthlyCloseMessage, "تم إغلاق الشهر بنجاح.", true);
    } catch (err) {
      showMessage(monthlyCloseMessage, err.message || "فشل إغلاق الشهر.", false);
    }
  });
}

if (monthlyCloseRefresh) {
  monthlyCloseRefresh.addEventListener("click", async () => {
    try {
      await loadMonthlyCloses();
      showMessage(monthlyCloseMessage, "تم تحديث قائمة الإغلاقات.", true);
    } catch (err) {
      showMessage(monthlyCloseMessage, err.message || "فشل تحميل الإغلاقات.", false);
    }
  });
}

if (monthlyCloseTable) {
  monthlyCloseTable.addEventListener("click", async (event) => {
    const id = Number(event.target.dataset.monthlyCloseDelete || 0);
    if (!id) return;
    const reason = prompt("سبب فتح الإغلاق الشهري (مطلوب):", "");
    if (!reason || !reason.trim()) {
      showMessage(monthlyCloseMessage, "السبب مطلوب لفتح الإغلاق الشهري.", false);
      return;
    }
    try {
      await api(`/api/monthly-closes/${id}?overrideReason=${encodeURIComponent(reason.trim())}`, {
        method: "DELETE",
      });
      await loadMonthlyCloses();
      showMessage(monthlyCloseMessage, "تم فتح الإغلاق الشهري.", true);
    } catch (err) {
      showMessage(monthlyCloseMessage, err.message || "فشل فتح الإغلاق الشهري.", false);
    }
  });
}

if (importPreview) {
  importPreview.addEventListener("click", async () => {
    try {
      const rows = await parseImportFileRows();
      renderImportPreview(rows);
      showMessage(importMessage, `تمت المعاينة: ${rows.length} صف.`, true);
    } catch (err) {
      renderImportPreview([]);
      showMessage(importMessage, err.message || "فشل المعاينة.", false);
    }
  });
}

if (importCommit) {
  importCommit.addEventListener("click", async () => {
    try {
      if (!importPreviewRows.length) {
        showMessage(importMessage, "اعمل معاينة أولاً قبل الاستيراد.", false);
        return;
      }
      const type = importType?.value || "customers";
      const endpoint = type === "receipts" ? "/api/import/receipts" : "/api/import/customers";
      const result = await api(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: importPreviewRows }),
      });
      await loadCustomers();
      await loadDashboard();
      showMessage(
        importMessage,
        `تم الاستيراد: ${result.inserted || 0} | تم تخطي: ${result.skipped || 0} | أخطاء: ${(result.errors || []).length}`,
        true
      );
    } catch (err) {
      showMessage(importMessage, err.message || "فشل الاستيراد.", false);
    }
  });
}

reportSaveImage.addEventListener("click", async () => {
  try {
    if (!reportCustomer.value) {
      showMessage(reportMessage, "اختر زبون واعرض التقرير أولاً.", false);
      return;
    }
    if (!reportTable.querySelector("tr")) {
      showMessage(reportMessage, "لا يوجد بيانات لحفظها.", false);
      return;
    }
    const tableElement = getReportTableElement();
    if (!tableElement || typeof html2canvas !== "function") {
      showMessage(reportMessage, "تعذر تجهيز الصورة.", false);
      return;
    }

    const customer = cachedCustomers.find((c) => c.id === Number(reportCustomer.value));
    const fromDate = reportFrom.value || "غير محدد";
    const toDate = reportTo.value || "غير محدد";
    const titleText = `كشف الزبون: ${customer?.name || "غير معروف"}`;
    const rangeText = `من ${fromDate} الى ${toDate}`;
    const reportRows = Array.from(reportTable.querySelectorAll("tr"));
    const parseNumberText = (value) =>
      Number(String(value || "").replace(/,/g, "").replace(/[^0-9.\-]/g, "")) || 0;
    const amounts = reportRows.map((row) => parseNumberText(row.querySelectorAll("td")?.[3]?.textContent || "0"));
    const types = reportRows.map((row) => String(row.querySelectorAll("td")?.[2]?.textContent || "").trim());
    const totalMovements = reportRows.length;
    const totalCollections = amounts.reduce(
      (sum, amount, idx) => (types[idx] === "قبض" ? sum + Math.abs(amount) : sum),
      0
    );
    const totalTurnover = amounts.reduce((sum, amount) => sum + Math.abs(amount), 0);

    const captureWrapper = document.createElement("div");
    captureWrapper.style.width = "1240px";
    captureWrapper.style.maxWidth = "1240px";
    captureWrapper.style.background = "linear-gradient(180deg, #ffffff 0%, #f8f7f3 100%)";
    captureWrapper.style.padding = "26px";
    captureWrapper.style.borderRadius = "18px";
    captureWrapper.style.border = "1px solid #e9dfcf";
    captureWrapper.style.boxShadow = "0 22px 40px rgba(35, 38, 45, 0.12)";
    captureWrapper.style.position = "fixed";
    captureWrapper.style.top = "-10000px";
    captureWrapper.style.right = "-10000px";

    const titleEl = document.createElement("h3");
    titleEl.textContent = titleText;
    titleEl.style.margin = "0 0 8px";
    titleEl.style.fontSize = "28px";
    titleEl.style.fontWeight = "900";
    titleEl.style.color = "#1f2e3a";

    const rangeEl = document.createElement("div");
    rangeEl.textContent = rangeText;
    rangeEl.style.margin = "0 0 16px";
    rangeEl.style.color = "#677281";
    rangeEl.style.fontSize = "15px";
    rangeEl.style.fontWeight = "600";

    const refId = `ST-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Date.now()).slice(-4)}`;
    const identityEl = document.createElement("div");
    identityEl.style.display = "flex";
    identityEl.style.flexWrap = "wrap";
    identityEl.style.gap = "10px";
    identityEl.style.margin = "0 0 16px";
    const codeText = customer?.code ? `الكود: ${customer.code}` : "الكود: -";
    const phoneText = customer?.phone ? `الهاتف: ${customer.phone}` : "الهاتف: -";
    identityEl.innerHTML = `
      <span style="padding:6px 12px;border:1px solid #dbe3e8;background:#f4f8fb;border-radius:999px;font-size:13px;font-weight:700;color:#2e435b">${escapeHtml(codeText)}</span>
      <span style="padding:6px 12px;border:1px solid #e2d9cc;background:#faf5ea;border-radius:999px;font-size:13px;font-weight:700;color:#5a4a33">${escapeHtml(phoneText)}</span>
      <span style="padding:6px 12px;border:1px solid #d7dce3;background:#f2f4f8;border-radius:999px;font-size:13px;font-weight:700;color:#495568">Ref: ${escapeHtml(refId)}</span>
    `;

    const balanceEl = document.createElement("div");
    const lastBalanceCell = reportTable?.querySelector("tr:last-child td:last-child");
    const balanceText = lastBalanceCell ? lastBalanceCell.textContent : "";
    const balanceNumber = Number(lastBalanceCell?.dataset?.balanceValue || 0);
    const statusText = balanceNumber < 0 ? "دائن لصالح الزبون" : balanceNumber > 0 ? "مدين على الزبون" : "متوازن";

    const summaryGrid = document.createElement("div");
    summaryGrid.style.display = "grid";
    summaryGrid.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
    summaryGrid.style.gap = "10px";
    summaryGrid.style.margin = "0 0 18px";
    const cardStyle = "padding:10px 12px;border-radius:12px;border:1px solid #dce3e9;background:#f7fafc";

    summaryGrid.innerHTML = `
      <div style="${cardStyle}">
        <div style="font-size:12px;color:#5f6e7e;font-weight:700">إجمالي الحركات</div>
        <div style="font-size:20px;color:#23384f;font-weight:900">${formatMoney(totalMovements)}</div>
      </div>
      <div style="${cardStyle}">
        <div style="font-size:12px;color:#5f6e7e;font-weight:700">إجمالي القبض</div>
        <div style="font-size:20px;color:#1f6a54;font-weight:900">${formatMoney(totalCollections)}</div>
      </div>
      <div style="padding:10px 12px;border-radius:12px;border:1px solid #d8d9dd;background:#f6f7fb">
        <div style="font-size:12px;color:#5f6e7e;font-weight:700">الرصيد النهائي (${statusText})</div>
        <div style="font-size:20px;color:${balanceNumber < 0 ? "#22835b" : balanceNumber > 0 ? "#a6384a" : "#1f2e3a"};font-weight:900">${balanceText || "0"}</div>
      </div>
    `;

    balanceEl.textContent = `حجم الحركة الكلي: ${formatMoney(totalTurnover)}`;
    balanceEl.style.margin = "0 0 14px";
    balanceEl.style.fontWeight = "800";
    balanceEl.style.fontFamily = "Tajawal, sans-serif";
    balanceEl.style.fontSize = "15px";
    balanceEl.style.padding = "8px 12px";
    balanceEl.style.borderRadius = "10px";
    balanceEl.style.display = "inline-block";
    balanceEl.style.border = "1px solid #dde4eb";
    balanceEl.style.background = "#f7fafc";
    balanceEl.style.color = "#314659";

    const tableClone = tableElement.cloneNode(true);
    tableClone.style.width = "100%";
    tableClone.style.border = "1px solid #d7dddf";
    tableClone.style.borderRadius = "14px";
    tableClone.style.overflow = "hidden";
    tableClone.style.borderCollapse = "collapse";
    tableClone.style.borderSpacing = "0";
    tableClone.style.background = "#ffffff";
    tableClone.style.boxShadow = "0 10px 28px rgba(38, 54, 76, 0.08)";

    const tableHeaders = tableClone.querySelectorAll("th");
    tableHeaders.forEach((th) => {
      th.style.borderBottom = "1px solid #d7dddf";
      th.style.borderLeft = "1px solid #e5eaed";
      th.style.fontSize = "14px";
      th.style.padding = "12px 10px";
      th.style.background = "linear-gradient(180deg, #f4f7fa 0%, #edf2f7 100%)";
      th.style.color = "#24364a";
      th.style.fontWeight = "800";
    });

    tableClone.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
      row.querySelectorAll("td").forEach((td) => {
        td.style.borderBottom = "1px solid #e7ecef";
        td.style.borderLeft = "1px solid #eef2f5";
        td.style.fontSize = "14px";
        td.style.padding = "11px 10px";
        td.style.background = rowIndex % 2 === 0 ? "#ffffff" : "#fbfcfd";
        td.style.color = "#1d2c3d";
        td.style.fontWeight = "600";
      });
    });

    tableClone.querySelectorAll("tr").forEach((row) => {
      const lastCell = row.lastElementChild;
      if (lastCell) {
        lastCell.style.borderLeft = "none";
      }
    });

    const footerEl = document.createElement("div");
    footerEl.style.marginTop = "14px";
    footerEl.style.paddingTop = "10px";
    footerEl.style.borderTop = "1px dashed #d6dce2";
    footerEl.style.display = "flex";
    footerEl.style.justifyContent = "space-between";
    footerEl.style.gap = "10px";
    footerEl.style.flexWrap = "wrap";
    footerEl.innerHTML = `
      <span style="font-size:12px;color:#697888;font-weight:700">Generated by Masan • ${formatDateTime(new Date().toISOString())}</span>
      <span style="font-size:12px;color:#697888;font-weight:700">هذا الكشف لغرض المطابقة فقط</span>
    `;

    captureWrapper.appendChild(titleEl);
    captureWrapper.appendChild(rangeEl);
    captureWrapper.appendChild(identityEl);
    captureWrapper.appendChild(summaryGrid);
    captureWrapper.appendChild(balanceEl);
    captureWrapper.appendChild(tableClone);
    captureWrapper.appendChild(footerEl);
    document.body.appendChild(captureWrapper);

    const canvas = await html2canvas(captureWrapper, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    captureWrapper.remove();

    const dataUrl = canvas.toDataURL("image/png");
    const item = {
      id: `${Date.now()}`,
      customerName: customer?.name || "كشف زبون",
      createdAt: new Date().toISOString(),
      dataUrl,
    };

    const items = [item, ...loadReportGallery()].slice(0, MAX_GALLERY_ITEMS);
    saveReportGallery(items);
    renderReportGallery();

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `report-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    showMessage(reportMessage, "تم حفظ الكشـف كصورة.", true);
  } catch (err) {
    showMessage(reportMessage, "فشل حفظ الصورة.", false);
  }
});

reportGalleryList.addEventListener("click", (event) => {
  const previewId = event.target.dataset.galleryPreview;
  const downloadId = event.target.dataset.galleryDownload;
  const removeId = event.target.dataset.galleryRemove;
  if (!previewId && !downloadId && !removeId) return;

  const items = loadReportGallery();
  if (previewId) {
    const item = items.find((entry) => entry.id === previewId);
    if (!item) return;
    const previewWindow = window.open("", "_blank");
    if (!previewWindow) return;
    previewWindow.document.write(`
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>معاينة كشف الزبون</title>
          <style>
            body { margin: 0; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            img { max-width: 96vw; max-height: 94vh; object-fit: contain; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.45); }
          </style>
        </head>
        <body>
          <img src="${item.dataUrl}" alt="كشف زبون" />
        </body>
      </html>
    `);
    previewWindow.document.close();
  }

  if (downloadId) {
    const item = items.find((entry) => entry.id === downloadId);
    if (!item) return;
    const link = document.createElement("a");
    link.href = item.dataUrl;
    link.download = `report-${downloadId}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  if (removeId) {
    const nextItems = items.filter((entry) => entry.id !== removeId);
    saveReportGallery(nextItems);
    renderReportGallery();
  }
});

if (backupDownload) {
  backupDownload.addEventListener("click", async () => {
    try {
      await downloadBackupSnapshot();
      showMessage(backupMessage, "تم تنزيل النسخة الاحتياطية.", true);
    } catch (err) {
      showMessage(backupMessage, err.message || "فشل تنزيل النسخة الاحتياطية.", false);
    }
  });
}

if (backupListRefresh) {
  backupListRefresh.addEventListener("click", async () => {
    try {
      await loadServerBackups();
      showOpsNotice("تم تحديث قائمة النسخ.", true);
    } catch (err) {
      showOpsNotice(err.message || "فشل تحميل قائمة النسخ.", false);
    }
  });
}

if (backupListTable) {
  backupListTable.addEventListener("click", async (event) => {
    const file = event.target.dataset.restoreServerBackup;
    const deleteFile = event.target.dataset.deleteServerBackup;
    if (!file && !deleteFile) return;

    if (file) {
      if (!confirm(`سيتم استرجاع النسخة ${file} واستبدال البيانات الحالية. هل أنت متأكد؟`)) {
        return;
      }
      try {
        await api("/api/system/restore-file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file }),
        });
        await refreshAllViewsAfterRestore();
        await loadServerBackups();
        showOpsNotice("تم استرجاع نسخة السيرفر بنجاح.", true);
      } catch (err) {
        showOpsNotice(err.message || "فشل استرجاع نسخة السيرفر.", false);
      }
      return;
    }

    if (deleteFile) {
      if (!confirm(`هل تريد حذف النسخة ${deleteFile} نهائياً؟`)) {
        return;
      }
      try {
        await api(`/api/system/backups/${encodeURIComponent(deleteFile)}`, {
          method: "DELETE",
        });
        await loadServerBackups();
        showOpsNotice("تم حذف نسخة السيرفر.", true);
      } catch (err) {
        showOpsNotice(err.message || "فشل حذف نسخة السيرفر.", false);
      }
    }
  });
}

if (backupRestore) {
  backupRestore.addEventListener("click", async () => {
    try {
      if ((backupConfirm?.value || "").trim().toUpperCase() !== "RESTORE") {
        showMessage(backupMessage, "اكتب RESTORE للتأكيد قبل الاسترجاع.", false);
        return;
      }
      if (!confirm("سيتم استبدال كل البيانات الحالية. هل أنت متأكد؟")) {
        return;
      }
      await restoreBackupSnapshot();
      setStatus("تم استرجاع النسخة الاحتياطية", true);
      if (backupConfirm) {
        backupConfirm.value = "";
      }
    } catch (err) {
      showMessage(backupMessage, err.message || "فشل استرجاع النسخة الاحتياطية.", false);
      setStatus("فشل استرجاع النسخة", false);
    }
  });
}

if (lockSave) {
  lockSave.addEventListener("click", async () => {
    try {
      if (!lockDate?.value) {
        showMessage(lockMessage, "حدد التاريخ أولاً.", false);
        return;
      }
      await api("/api/locks/daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: lockDate.value, reason: lockReason?.value || "Daily lock" }),
      });
      await loadLocks();
      showMessage(lockMessage, "تم قفل اليوم بنجاح.", true);
    } catch (err) {
      showMessage(lockMessage, err.message || "فشل قفل اليوم.", false);
    }
  });
}

if (lockRefresh) {
  lockRefresh.addEventListener("click", async () => {
    try {
      await loadLocks();
      showMessage(lockMessage, "تم تحديث الأقفال.", true);
    } catch (err) {
      showMessage(lockMessage, err.message || "فشل تحميل الأقفال.", false);
    }
  });
}

if (lockTable) {
  lockTable.addEventListener("click", async (event) => {
    const lockId = Number(event.target.dataset.lockDelete || 0);
    if (!lockId) return;
    if (!confirm("هل تريد فتح هذا القفل؟")) {
      return;
    }
    try {
      await api(`/api/locks/${lockId}`, { method: "DELETE" });
      await loadLocks();
      showMessage(lockMessage, "تم فتح القفل.", true);
    } catch (err) {
      showMessage(lockMessage, err.message || "فشل فتح القفل.", false);
    }
  });
}

if (auditSearch) {
  auditSearch.addEventListener("click", async () => {
    try {
      await loadAuditLogs();
      showMessage(auditMessage, "تم تحميل السجل.", true);
    } catch (err) {
      showMessage(auditMessage, err.message || "فشل تحميل سجل التدقيق.", false);
    }
  });
}

const applyAuditQuickRange = async (days) => {
  const now = new Date();
  const fromDate = new Date(now);
  fromDate.setDate(now.getDate() - Math.max(0, Number(days) || 0));
  const toIso = now.toISOString().slice(0, 10);
  const fromIso = fromDate.toISOString().slice(0, 10);
  if (auditFrom) auditFrom.value = fromIso;
  if (auditTo) auditTo.value = toIso;
  await loadAuditLogs();
  showMessage(auditMessage, "تم تطبيق الفلتر الزمني.", true);
};

if (auditQuick24h) {
  auditQuick24h.addEventListener("click", async () => {
    try {
      await applyAuditQuickRange(1);
    } catch (err) {
      showMessage(auditMessage, err.message || "فشل تطبيق فلتر آخر 24 ساعة.", false);
    }
  });
}

if (auditQuick7d) {
  auditQuick7d.addEventListener("click", async () => {
    try {
      await applyAuditQuickRange(7);
    } catch (err) {
      showMessage(auditMessage, err.message || "فشل تطبيق فلتر آخر 7 أيام.", false);
    }
  });
}

if (auditClearDates) {
  auditClearDates.addEventListener("click", async () => {
    try {
      if (auditFrom) auditFrom.value = "";
      if (auditTo) auditTo.value = "";
      clearAuditLogsTable();
      showMessage(auditMessage, "تم مسح الفلاتر وإفراغ السجل المعروض.", true);
    } catch (err) {
      showMessage(auditMessage, err.message || "فشل مسح فلاتر التاريخ.", false);
    }
  });
}

if (auditExportExcel) {
  auditExportExcel.addEventListener("click", async () => {
    try {
      if (typeof XLSX === "undefined") {
        showMessage(auditMessage, "مكتبة Excel غير متاحة حالياً.", false);
        return;
      }

      if (!lastAuditRows.length) {
        showMessage(auditMessage, "حمّل السجل أولاً عبر البحث أو الفلتر الزمني ثم أعد التصدير.", false);
        return;
      }

      const toAuditActionArabic = (action) => {
        const key = String(action || "").toLowerCase();
        if (key === "create") return "إضافة";
        if (key === "update") return "تعديل";
        if (key === "delete") return "حذف";
        return action || "-";
      };

      const formatAuditExportDetails = (rawDetails) => {
        const raw = String(rawDetails || "").trim();
        if (!raw) return "-";
        try {
          const parsed = JSON.parse(raw);
          if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return raw;
          }
          const parts = [];
          if (parsed.senderName) parts.push(`المرسل: ${parsed.senderName}`);
          if (parsed.receiverName) parts.push(`المستلم: ${parsed.receiverName}`);
          if (parsed.customerName) parts.push(`الزبون: ${parsed.customerName}`);
          if (parsed.amount !== undefined && parsed.amount !== null && parsed.amount !== "") {
            parts.push(`المبلغ: ${formatTransferValue(parsed.amount)}`);
          }
          if (parsed.invoiceNo) parts.push(`فاتورة: ${parsed.invoiceNo}`);
          return parts.length ? parts.join(" | ") : raw;
        } catch (err) {
          return raw;
        }
      };

      const exportRows = lastAuditRows.map((row) => ({
        التاريخ: formatDateTime(row.created_at),
        المستخدم: row.username || "-",
        الدور: row.role || "-",
        العملية: toAuditActionArabic(row.action),
        الكيان: row.entity_type || "-",
        المعرف: row.entity_id || "-",
        التفاصيل: formatAuditExportDetails(row.details),
      }));

      const sheet = XLSX.utils.json_to_sheet(exportRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, "Audit");
      const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
      XLSX.writeFile(workbook, `audit-log-${stamp}.xlsx`);
      showMessage(auditMessage, "تم تصدير سجل التدقيق إلى Excel.", true);
    } catch (err) {
      showMessage(auditMessage, err.message || "فشل تصدير سجل التدقيق.", false);
    }
  });
}

if (alertsEnable) {
  alertsEnable.addEventListener("click", async () => {
    const nextEnabled = !isAlertsNotifyEnabled();
    setAlertsNotifyEnabled(nextEnabled);
    updateAlertsNotifyUi();

    if (nextEnabled && "Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch (err) {
        // Ignore permission errors; in-app alerts still work.
      }
    }

    showMessage(alertsMessage, nextEnabled ? "تم تفعيل الإشعارات." : "تم إيقاف الإشعارات.", true);
  });
}

if (alertsTest) {
  alertsTest.addEventListener("click", async () => {
    const enabled = isAlertsNotifyEnabled();
    const msg = "هذا اختبار إشعار النظام.";

    showToast(msg, "warn");
    playAlertBeep();

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Masan Alerts", { body: msg });
      } else if (enabled && Notification.permission === "default") {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            new Notification("Masan Alerts", { body: msg });
          }
        } catch (err) {
          // Keep silent: test already ran in-page.
        }
      }
    }

    showMessage(alertsMessage, enabled ? "تم إرسال إشعار تجريبي." : "الاختبار عمل داخل الصفحة. فعّل الإشعارات لتلقيها تلقائيًا.", true);
  });
}

if (brandingSave) {
  brandingSave.addEventListener("click", () => {
    const logo = String(brandingLogo?.value || "").trim();
    const stamp = String(brandingStamp?.value || "").trim();
    if (!isValidImageLogoUrl(logo)) {
      showMessage(brandingMessage, "رابط الشعار غير صالح. استخدم رابط صورة صحيح (png/jpg/jpeg/webp/gif/svg) أو data:image.", false);
      return;
    }
    saveBranding({ logo, stamp });
    showMessage(brandingMessage, "تم حفظ الهوية الرسمية للطباعة.", true);
  });
}

if (shortcutsHelp) {
  shortcutsHelp.addEventListener("click", () => {
    showShortcutHelp();
  });
}

if (userAdminRole) {
  userAdminRole.addEventListener("change", () => {
    const roleKey = userAdminRole.value || "viewer";
    renderPermissionsGrid(userRoleDefaults[roleKey] || {});
  });
}

if (userAdminReset) {
  userAdminReset.addEventListener("click", () => {
    resetUserAdminForm();
    if (userAdminMessage) {
      userAdminMessage.textContent = "";
    }
  });
}

if (userAdminRefresh) {
  userAdminRefresh.addEventListener("click", async () => {
    try {
      await loadUsersAdminTable();
      showMessage(userAdminMessage, "تم تحديث المستخدمين.", true);
    } catch (err) {
      showMessage(userAdminMessage, err.message || "فشل تحميل المستخدمين.", false);
    }
  });
}

if (userAdminSave) {
  userAdminSave.addEventListener("click", async () => {
    try {
      const payload = {
        username: String(userAdminUsername?.value || "").trim().toLowerCase(),
        password: String(userAdminPassword?.value || "").trim(),
        role: String(userAdminRole?.value || "viewer"),
        permissions: collectSelectedPermissions(),
      };
      const savedPassword = payload.password;
      if (!payload.username) {
        showMessage(userAdminMessage, "ادخل اسم المستخدم أولاً.", false);
        return;
      }
      await api("/api/system/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await loadUsersAdminTable();
      resetUserAdminForm();
      if (savedPassword) {
        showMessage(userAdminMessage, `تم حفظ المستخدم والصلاحيات. كلمة المرور: ${savedPassword}`, true);
      } else {
        showMessage(userAdminMessage, "تم حفظ المستخدم والصلاحيات. كلمة المرور لم تتغير.", true);
      }
    } catch (err) {
      showMessage(userAdminMessage, err.message || "فشل حفظ المستخدم.", false);
    }
  });
}

if (usersAdminTable) {
  usersAdminTable.addEventListener("click", async (event) => {
    const editUsername = String(event.target.dataset.userEdit || "").trim().toLowerCase();
    const deleteUsername = String(event.target.dataset.userDelete || "").trim().toLowerCase();

    if (editUsername) {
      const row = Array.from(usersAdminTable.querySelectorAll("tr[data-user-row]")).find(
        (entry) => String(entry.getAttribute("data-user-row") || "").trim().toLowerCase() === editUsername
      );
      if (!row) return;
      const role = row.getAttribute("data-user-role") || "viewer";
      const rawPerms = row.getAttribute("data-user-perms") || "{}";
      let parsedPerms = {};
      try {
        parsedPerms = JSON.parse(rawPerms);
      } catch (err) {
        parsedPerms = userRoleDefaults[role] || {};
      }
      if (userAdminUsername) userAdminUsername.value = editUsername;
      if (userAdminPassword) userAdminPassword.value = "";
      if (userAdminRole) userAdminRole.value = role;
      renderPermissionsGrid(parsedPerms);
      showMessage(userAdminMessage, "تم تحميل المستخدم للتعديل.", true);
      return;
    }

    if (deleteUsername) {
      if (!confirm(`هل تريد حذف المستخدم ${deleteUsername}؟`)) {
        return;
      }
      try {
        await api(`/api/system/users/${encodeURIComponent(deleteUsername)}`, { method: "DELETE" });
        await loadUsersAdminTable();
        showMessage(userAdminMessage, "تم حذف المستخدم.", true);
      } catch (err) {
        showMessage(userAdminMessage, err.message || "فشل حذف المستخدم.", false);
      }
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (!event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }
  if (isTypingTarget(document.activeElement)) {
    return;
  }

  const key = String(event.key || "").toLowerCase();
  if (!key) return;

  if (/^[1-9]$/.test(key)) {
    event.preventDefault();
    let index = Number(key) - 1;
    if (event.shiftKey) {
      if (key === "1") index = 9;
      if (key === "2") index = 10;
      if (key === "3") index = 11;
    }
    const order = getScreenOrder();
    const screenId = order[index];
    if (screenId) {
      setActiveScreen(screenId);
      showToast(`تم الانتقال إلى شاشة: ${screenId}`, "ok");
    }
    return;
  }

  if (key === "s") {
    event.preventDefault();
    triggerQuickSave();
    return;
  }

  if (key === "r") {
    event.preventDefault();
    if (dashboardRefresh && !dashboardRefresh.disabled) {
      dashboardRefresh.click();
      showToast("تم تحديث المؤشرات.", "ok");
    }
    return;
  }

  if (key === "l") {
    event.preventDefault();
    toggleLiteMode();
    showToast("تم تبديل وضع العرض.", "ok");
  }
});

const init = async () => {
  try {
    applyThemeVariant(getThemeVariant());
    setLiteMode(isLiteModeEnabled());
    setAutoInvoiceEnabled(isAutoInvoiceEnabled());
    renderReportGallery();
    setupPwaInstall();
    registerServiceWorker();

    const me = await api("/api/auth/me");
    currentUserRole = me?.role || "viewer";
    currentPermissions = me?.permissions || {};
    applyRolePermissions();
    showLogin(false);
    await loadCustomers();
    await loadDashboard();
    renderSavedInvoices();
    await loadNextCustomerCode();
    await loadNextInvoice();
    await resetReceiptForm();
    await resetInvoiceBuilderForm();
    updateReceiptPartyDetails();
    resetTransferForm();
    updateTransferPartyDetails();
    setBudgetDefaults();
    setSalesDefaults();
    setOpsDefaults();
    await loadBudget();
    await loadSalesReport();
    await loadRmbBalances();
    await loadRmbTransfers();
    if (hasPermission("alerts_view")) {
      await loadAlertsCenter();
    }
    if (hasPermission("kpi_view")) {
      await loadMonthlyKpis();
    }
    if (hasPermission("monthly_close")) {
      await loadMonthlyCloses();
    }
    if (currentUserRole === "admin") {
      await loadUserPermissionsConfig();
      await loadUsersAdminTable();
    }
    if (canWrite()) {
      await loadServerBackups();
      await loadLocks();
    }
    startOpsHeartbeat();
    resetRmbTransferForm();
    setStatus("جاهز / Ready", true);
  } catch (err) {
    setStatus("فشل الاتصال بالخادم", false);
    showLogin(true);
    setAuthToken("");
  }
};

init();

if (loginSubmit) {
  loginSubmit.addEventListener("click", async () => {
    try {
      showMessage(loginMessage, "جاري التحقق...", true);
      const payload = {
        username: loginUsername.value.trim(),
        password: loginPassword.value,
      };
      const data = await api("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setAuthToken("");
      currentUserRole = data.role || "viewer";
      currentPermissions = data.permissions || {};
      applyRolePermissions();
      showLogin(false);
      resetLoginForm();
      await loadCustomers();
      await loadDashboard();
      renderSavedInvoices();
      await loadNextCustomerCode();
      await loadNextInvoice();
      await resetReceiptForm();
      await resetInvoiceBuilderForm();
      updateReceiptPartyDetails();
      resetTransferForm();
      updateTransferPartyDetails();
      setBudgetDefaults();
      setSalesDefaults();
      setOpsDefaults();
      await loadBudget();
      await loadSalesReport();
      await loadRmbBalances();
      await loadRmbTransfers();
      if (hasPermission("alerts_view")) {
        await loadAlertsCenter();
      }
      if (hasPermission("kpi_view")) {
        await loadMonthlyKpis();
      }
      if (hasPermission("monthly_close")) {
        await loadMonthlyCloses();
      }
      if (currentUserRole === "admin") {
        await loadUserPermissionsConfig();
        await loadUsersAdminTable();
      }
      if (canWrite()) {
        await loadServerBackups();
        await loadLocks();
      }
      startOpsHeartbeat();
      resetRmbTransferForm();
      setStatus("جاهز / Ready", true);
    } catch (err) {
      showMessage(loginMessage, err.message || "بيانات الدخول غير صحيحة", false);
      setStatus("فشل تسجيل الدخول", false);
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch (err) {
      // Ignore errors on logout.
    } finally {
      stopOpsHeartbeat();
      setAuthToken("");
      currentUserRole = "viewer";
      currentPermissions = {};
      applyRolePermissions();
      showLogin(true);
      setStatus("تم تسجيل الخروج", false);
    }
  });
}

if (forceRefreshButton) {
  forceRefreshButton.addEventListener("click", async () => {
    await forceRefreshApp();
  });
}
