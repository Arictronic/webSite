import {
  FONT_OPTIONS,
  FONT_FAMILY_BY_ID,
  FONT_ID_ALIASES,
} from "./fonts.generated.js";

const AUTH_PASSWORD = "12345678";
const AUTH_OK_KEY = "studio_auth_ok";
let authorized = false;

function isAuthorized() {
  return localStorage.getItem(AUTH_OK_KEY) === "1";
}

function setAuthorizedTrue() {
  authorized = true;
  localStorage.setItem(AUTH_OK_KEY, "1");
}

function renderAuthGate(onSuccess) {
  const appRoot = document.getElementById("appRoot");
  if (appRoot) appRoot.style.display = "none";

  const wrap = document.createElement("div");
  wrap.id = "authGate";
  wrap.className = "backdrop show";

  wrap.innerHTML = `
    <div class="modal auth-modal" role="dialog" aria-modal="true" aria-labelledby="authTitle">
      <header class="modal-head">
        <h2 id="authTitle">Вход</h2>
      </header>

      <div class="modal-body">
        <div class="field">
          <label for="authLogin">Логин (любой)</label>
          <input id="authLogin" type="text" autocomplete="username" />
        </div>

        <div class="field">
          <label for="authPass">Пароль</label>
          <input id="authPass" type="password" autocomplete="current-password" />
        </div>

        <div id="authErr" class="warning" style="display:none;">Неверный пароль</div>
      </div>

      <footer class="modal-foot">
        <div class="right-actions">
          <button id="authBtn" class="primary" type="button">Войти</button>
        </div>
      </footer>
    </div>
  `;

  document.body.appendChild(wrap);

  const passEl = wrap.querySelector("#authPass");
  const btn = wrap.querySelector("#authBtn");
  const err = wrap.querySelector("#authErr");

  function submit() {
    const pass = String(passEl.value || "");
    if (pass === AUTH_PASSWORD) {
      setAuthorizedTrue();

      const appRoot = document.getElementById("appRoot");
      if (appRoot) appRoot.style.display = "";

      wrap.remove();
      onSuccess();
    } else {
      err.style.display = "block";
      passEl.focus();
      passEl.select?.();
    }
  }

  btn.addEventListener("click", submit);
  passEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submit();
  });
}

console.log("app.js загружен");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM загружен, запускаем инициализацию");
  });
} else {
  console.log("DOM уже загружен");
}

const MAX_NAME_LINES = 3;
const MAX_NAME_CHARS = 150;
const MAX_NAME_LINE_LEN = 50;

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const COLOR_SWATCHES = [
  "#0f172a",
  "#111827",
  "#1f2937",
  "#334155",
  "#475569",
  "#64748b",
  "#94a3b8",
  "#cbd5e1",
  "#e2e8f0",
  "#f1f5f9",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#6366f1",
  "#a855f7",
  "#ec4899",
];

const FONT_PRESETS = {
  compact: {
    lineHeight: 1.05,
    titleClamp: 2,
    letterSpacing: -0.01,
    cardPadY: 5,
    cardRadius: 10,
    weightTitle: 900,
    weightMeta: 600,
  },
  balanced: {
    lineHeight: 1.12,
    titleClamp: 3,
    letterSpacing: 0.0,
    cardPadY: 7,
    cardRadius: 12,
    weightTitle: 900,
    weightMeta: 600,
  },
  spacious: {
    lineHeight: 1.2,
    titleClamp: 3,
    letterSpacing: 0.02,
    cardPadY: 9,
    cardRadius: 14,
    weightTitle: 800,
    weightMeta: 600,
  },
  print: {
    lineHeight: 1.18,
    titleClamp: 3,
    letterSpacing: 0.01,
    cardPadY: 8,
    cardRadius: 10,
    weightTitle: 700,
    weightMeta: 500,
    textTransform: "none",
  },
};

const THEME_PRESETS = [
  {
    id: "warm-red",
    name: "Warm Red",
    tokens: {
      bg: "#f6f7fb",
      card: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#e2e8f0",
      gridHead: "#f8fafc",
      accent: "#ef4444",
      now: "#fff7c2",
      today: "#fff5f5",
    },
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    tokens: {
      bg: "#f5fbff",
      card: "#ffffff",
      text: "#0b1220",
      muted: "#475569",
      border: "#dbeafe",
      gridHead: "#eef6ff",
      accent: "#0ea5e9",
      now: "#dbeafe",
      today: "#e0f2fe",
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    tokens: {
      bg: "#f6fbf7",
      card: "#ffffff",
      text: "#0b1220",
      muted: "#475569",
      border: "#d1fae5",
      gridHead: "#ecfdf5",
      accent: "#22c55e",
      now: "#dcfce7",
      today: "#e7fbe9",
    },
  },
  {
    id: "violet",
    name: "Violet",
    tokens: {
      bg: "#f7f7ff",
      card: "#ffffff",
      text: "#0b1220",
      muted: "#475569",
      border: "#e0e7ff",
      gridHead: "#f0f1ff",
      accent: "#6366f1",
      now: "#e0e7ff",
      today: "#eef2ff",
    },
  },
  {
    id: "graphite-dark",
    name: "Graphite Dark",
    tokens: {
      bg: "#0b1220",
      card: "#0f172a",
      text: "#e5e7eb",
      muted: "#94a3b8",
      border: "#1f2a44",
      gridHead: "#0b1220",
      accent: "#f59e0b",
      now: "#3a2f00",
      today: "#2a1212",
    },
  },
];
const STORAGE_KEY = "studio_schedule_v13";

const exportBackdrop = document.getElementById("exportBackdrop");
const expPreset = document.getElementById("expPreset");
const expFormat = document.getElementById("expFormat");
const expBg = document.getElementById("expBg");
const expQuality = document.getElementById("expQuality");
const expQualityVal = document.getElementById("expQualityVal");
const expJpegWrap = document.getElementById("expJpegWrap");
const expPreviewImg = document.getElementById("expPreviewImg");

const $ = (id) => document.getElementById(id);

function pad2(n) {
  return String(n).padStart(2, "0");
}
function parseHHMM(s) {
  const [h, m] = (s || "").split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function minToHHMM(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${pad2(h)}:${pad2(m)}`;
}
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function initErrorHandling() {
  window.addEventListener("error", function (e) {
    console.error("Глобальная ошибка:", {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      error: e.error,
    });

    if (
      !e.message.includes("ResizeObserver") &&
      !e.message.includes("webkitMaskImage")
    ) {
      toast(
        "ERR",
        "Ошибка",
        "Произошла ошибка в приложении. Проверьте консоль.",
        5000,
      );
    }
  });

  window.addEventListener("unhandledrejection", function (e) {
    console.error("Необработанный промис:", e.reason);
  });
}

const GENERIC_FAMILIES = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "-apple-system",
]);

function quoteCssString(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function sanitizeFontFamilyStack(stack) {
  const parts = String(stack)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  if (!parts.length) return stack;

  const first = parts[0];
  const needsQuotes =
    !GENERIC_FAMILIES.has(first) && /[^a-zA-Z0-9 _-]/.test(first);

  parts[0] = needsQuotes ? quoteCssString(first) : first;
  return parts.join(", ");
}

function deepCopy(o) {
  return JSON.parse(JSON.stringify(o));
}

function hexToRgb(hex) {
  const h = (hex || "").replace("#", "");
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
function rgba(hex, alpha) {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
function srgbToLin(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function relLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const r = srgbToLin(rgb.r),
    g = srgbToLin(rgb.g),
    b = srgbToLin(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(fgHex, bgHex) {
  const L1 = relLuminance(fgHex);
  const L2 = relLuminance(bgHex);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}
function bestTextOn(bgHex) {
  const dark = "#0f172a";
  const light = "#ffffff";
  return contrastRatio(dark, bgHex) >= contrastRatio(light, bgHex)
    ? dark
    : light;
}

const DEFAULT_STATE = () => ({
  version: 13,
  settings: {
    schedule: {
      start: "08:00",
      end: "22:00",
      slotMinutes: 60,
      slotHeight: 72,
      snapMinutes: 5,
      maxPerCell: 2,
      defaultDuration: 60,
    },
    display: {
      cellView: "timeline",
      cardMode: "namecoachroom",
      showNotes: true,
      showEmptyHint: true,
      showDayView: false,
      showTodayHighlight: true,
      dayWidthPx: 0,
      cellPadPx: 6,
    },
    font: {
      preset: "custom",
      tightness: "normal",
      titleFamily: "system",
      metaFamily: "system",
      family: "system",
      lineHeight: 1.12,
      titleSize1: 12,
      titleSize2: 10,
      metaSize1: 11,
      metaSize2: 9,
      weightTitle: 900,
      weightMeta: 600,
      sampleText: "(расписание / РАСПИСАНИЕ)",
      letterSpacing: 0,
      textTransform: "none",
      titleClamp: 3,
      cardPadY: 7,
      cardRadius: 12,
    },
    theme: {
      mode: "auto",
      customTokens: deepCopy(THEME_PRESETS[0].tokens),
      alpha: { today: 60, now: 65, event: 100, shadow: 10 },
    },
    logo: {
      enabled: false,
      variant: 1,
      opacity: 12,
      recolor: false,
      color: "#0ea5e9",
      layout: "center",
      tileSize: 140,
      horizontalGap: 180,
      verticalGap: 180,
      rotation: 0,
      tileOffsetX: 0,
      tileOffsetY: 0,
      uploadedFileData: null,
    },
  },
  directions: [
    { id: "yoga", name: "Йога", color: "#ef4444" },
    { id: "pilates", name: "Пилатес", color: "#14b8a6" },
    { id: "crossfit", name: "Кроссфит", color: "#0ea5e9" },
  ],

  coaches: ["Анна", "Дмитрий", "Елена"],
  events: [],
});

let state = DEFAULT_STATE();
let isSaving = false;
let lastSaveTime = 0;

let history = [];
let future = [];
const HISTORY_LIMIT = 60;

function pushHistory(reason) {
  history.push({ snapshot: deepCopy(state), reason, ts: Date.now() });
  if (history.length > HISTORY_LIMIT) history.shift();
  future = [];
  updateUndoRedoButtons();
  scheduleAutoSave(`history: ${reason}`);
}
function updateUndoRedoButtons() {
  $("btnUndo").disabled = history.length === 0;
  $("btnRedo").disabled = future.length === 0;
}
function undo() {
  if (!history.length) return;
  const last = history.pop();
  future.push({
    snapshot: deepCopy(state),
    reason: last.reason,
    ts: Date.now(),
  });
  state = deepCopy(last.snapshot);
  hardenState();
  saveState(true);
  renderAll();
  toast("OK", "Undo", last.reason || "Отменено");
  updateUndoRedoButtons();
}
function redo() {
  if (!future.length) return;
  const next = future.pop();
  history.push({
    snapshot: deepCopy(state),
    reason: next.reason,
    ts: Date.now(),
  });
  state = deepCopy(next.snapshot);
  hardenState();
  saveState(true);
  renderAll();
  toast("OK", "Redo", next.reason || "Повторено");
  updateUndoRedoButtons();
}

let autoSaveTimer;
function scheduleAutoSave(reason) {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    saveState();
    showSaveIndicator();
    if (reason) console.log(`Auto-save: ${reason}`);
  }, 2000);
}

// Глобальный кэш для плиток
window._tileBlobCache = window._tileBlobCache || new Map();

// Очистка кэша
window.clearTileBlobCache = function clearTileBlobCache() {
  for (const blobUrl of window._tileBlobCache.values()) {
    try {
      URL.revokeObjectURL(blobUrl);
    } catch {}
  }
  window._tileBlobCache.clear();
};

let saveIndicatorStyleAdded = false;

function showSaveIndicator() {
  const oldIndicator = document.querySelector(".save-indicator");
  if (oldIndicator) {
    oldIndicator.remove();
  }

  if (!saveIndicatorStyleAdded) {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeOut {
        0% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; transform: translateY(10px); }
      }
    `;
    document.head.appendChild(style);
    saveIndicatorStyleAdded = true;
  }

  const indicator = document.createElement("div");
  indicator.className = "save-indicator show";
  indicator.textContent = "Сохранено";
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--accent);
    color: var(--accentText);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: fadeOut 2s forwards;
  `;

  document.body.appendChild(indicator);

  setTimeout(() => {
    if (indicator.parentNode) {
      indicator.remove();
    }
  }, 2000);
}

function clearOldBackups() {
  try {
    const backups = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith(`${STORAGE_KEY}_backup_`)) {
        const time = parseInt(key.split("_").pop());
        if (!isNaN(time)) {
          backups.push({ key, time });
        }
      }
    }

    backups.sort((a, b) => b.time - a.time);

    const toRemove = backups.slice(3);

    toRemove.forEach((backup) => {
      sessionStorage.removeItem(backup.key);
    });

    if (toRemove.length > 0) {
      console.log(`Удалено ${toRemove.length} старых резервных копий`);
    }
  } catch (e) {
    console.warn("Ошибка при очистке резервных копий:", e);
  }
}

function isLocalStorageAvailable() {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function isValidState(parsed) {
  return (
    parsed &&
    typeof parsed === "object" &&
    parsed.settings &&
    Array.isArray(parsed.events)
  );
}

function migrateState(parsed) {
  const currentVersion = 13;

  if (!parsed.version || parsed.version < currentVersion) {
    console.log(
      `Миграция с версии ${parsed.version || "unknown"} на ${currentVersion}`,
    );

    const migrated = deepCopy(DEFAULT_STATE());

    if (Array.isArray(parsed.events)) {
      migrated.events = parsed.events.map((ev) => ({
        ...ev,
        id: ev.id || uid(),
        createdAt: ev.createdAt || Date.now(),
      }));
    }

    if (Array.isArray(parsed.directions)) {
      migrated.directions = parsed.directions;
    }

    if (Array.isArray(parsed.coaches)) {
      migrated.coaches = parsed.coaches;
    }

    if (parsed.settings) {
      Object.keys(parsed.settings).forEach((key) => {
        if (
          migrated.settings[key] &&
          typeof migrated.settings[key] === "object"
        ) {
          migrated.settings[key] = {
            ...migrated.settings[key],
            ...parsed.settings[key],
          };
        }
      });
    }

    migrated.version = currentVersion;
    return migrated;
  }

  return parsed;
}

function compressAndSave(json) {
  try {
    const compressed = json.replace(/\s+/g, " ");
    if (compressed.length <= 4500000) {
      localStorage.setItem(STORAGE_KEY, compressed);
      console.log("Данные сжаты и сохранены");
      return true;
    }

    const stateCopy = deepCopy(state);
    const backupSettings = deepCopy(state.settings);
    stateCopy.settings = { version: stateCopy.version };

    const minimalJson = JSON.stringify({
      version: stateCopy.version,
      events: stateCopy.events,
      directions: stateCopy.directions,
      coaches: stateCopy.coaches,
    });

    if (minimalJson.length <= 4500000) {
      localStorage.setItem(STORAGE_KEY, minimalJson);

      state.settings = backupSettings;
      console.log("Сохранены только основные данные");
      return true;
    }

    return false;
  } catch (e) {
    console.error("Ошибка сжатия:", e);
    return false;
  }
}

function createBackup(json) {
  try {
    const backupKey = `${STORAGE_KEY}_backup_${Date.now()}`;
    sessionStorage.setItem(backupKey, json);

    const backups = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith(`${STORAGE_KEY}_backup_`)) {
        backups.push({ key, time: parseInt(key.split("_").pop()) });
      }
    }

    backups.sort((a, b) => b.time - a.time);
    backups.slice(3).forEach((backup) => {
      sessionStorage.removeItem(backup.key);
    });
  } catch (e) {
    console.warn("Не удалось создать резервную копию:", e);
  }
}

function handleStorageFull() {
  toast(
    "ERR",
    "⛔",
    "Недостаточно места в хранилище. Удалите старые события или экспортируйте данные.",
    5000,
  );

  setTimeout(() => {
    showStorageCleanupPrompt();
  }, 1000);
}

function saveState(silent = false) {
  if (isSaving) {
    console.warn("⚠️ Сохранение уже выполняется");
    return;
  }

  if (!isLocalStorageAvailable()) {
    toast(
      "WARN",
      "⚠️",
      "Локальное хранилище недоступно. Данные не сохранены.",
      3000,
    );
    isSaving = false;
    return;
  }

  isSaving = true;

  try {
    state.version = 13;

    const json = JSON.stringify(state, null, 2);

    if (json.length > 4500000) {
      if (compressAndSave(json)) {
        console.log("Данные успешно сохранены (со сжатием)");
      } else {
        toast("ERR", "❌", "Данные слишком большие для сохранения", 3000);
        isSaving = false;
        return;
      }
    } else {
      localStorage.setItem(STORAGE_KEY, json);
    }

    createBackup(json);

    clearOldBackups();

    lastSaveTime = Date.now();

    if (!silent) {
      showSaveIndicator();
    }
  } catch (e) {
    console.error("Ошибка сохранения:", e);

    if (e.name === "QuotaExceededError") {
      handleStorageFull();
    } else if (e.name === "SecurityError") {
      toast(
        "ERR",
        "🔒",
        "Доступ к хранилищу заблокирован настройками браузера",
        5000,
      );
    } else {
      toast("ERR", "❌", "Ошибка сохранения: " + e.message, 3000);
    }
  } finally {
    isSaving = false;
  }
}

function loadState() {
  try {
    if (!isLocalStorageAvailable()) {
      state = DEFAULT_STATE();
      toast(
        "WARN",
        "⚠️",
        "Локальное хранилище недоступно. Используются настройки по умолчанию.",
        3000,
      );
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state = DEFAULT_STATE();
      console.log(
        "Нет сохраненных данных, используется состояние по умолчанию",
      );
      return;
    }

    const parsed = JSON.parse(raw);

    if (!isValidState(parsed)) {
      throw new Error("Невалидная структура данных");
    }

    state = migrateState(parsed);

    hardenState();

    console.log("Данные успешно загружены, версия:", state.version);
  } catch (e) {
    console.error("Ошибка загрузки:", e);

    const restored = restoreFromBackup();

    if (restored) {
      toast("OK", "♻️", "Данные восстановлены из резервной копии", 3000);
    } else {
      state = DEFAULT_STATE();
      toast(
        "WARN",
        "⚠️",
        "Не удалось загрузить данные. Используются настройки по умолчанию.",
        3000,
      );
    }
  }
}

function restoreFromBackup() {
  let latestBackup = null;
  let latestTime = 0;

  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith(`${STORAGE_KEY}_backup_`)) {
        const time = parseInt(key.split("_").pop());
        if (time > latestTime) {
          latestTime = time;
          latestBackup = key;
        }
      }
    }

    if (latestBackup) {
      const backupData = sessionStorage.getItem(latestBackup);
      const parsed = JSON.parse(backupData);

      if (isValidState(parsed)) {
        state = migrateState(parsed);
        hardenState();
        return true;
      }
    }
  } catch (e) {
    console.error("Ошибка восстановления из бэкапа:", e);
  }

  return false;
}

function showStorageCleanupPrompt() {
  const modal = document.createElement("div");
  modal.className = "backdrop show";
  modal.innerHTML = `
    <div class="modal" style="max-width:500px">
      <header class="modal-head">
        <h2>Очистка хранилища</h2>
        <button class="ghost" onclick="this.closest('.backdrop').remove()">×</button>
      </header>
      <div class="modal-body">
        <p>LocalStorage переполнен. Рекомендуемые действия:</p>
        <div style="display:flex; flex-direction:column; gap:10px; margin:15px 0">
          <button class="primary" id="exportAllBtn">📥 Экспортировать всё в JSON</button>
          <button id="clearOldBtn">🗑️ Удалить старые события (больше месяца)</button>
          <button class="danger" id="clearAllBtn">⚠️ Полная очистка (только настройки)</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#exportAllBtn").addEventListener("click", () => {
    exportJson();
    modal.remove();
  });

  modal.querySelector("#clearOldBtn").addEventListener("click", () => {
    clearOldEvents();
    modal.remove();
  });

  modal.querySelector("#clearAllBtn").addEventListener("click", () => {
    if (confirm("Удалить все занятия? Сохранятся только настройки.")) {
      state.events = [];
      saveState();
      renderAll();
      toast("OK", "Очищено", "Все занятия удалены");
    }
    modal.remove();
  });
}

function clearOldEvents() {
  const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const oldCount = state.events.length;

  state.events = state.events.filter((ev) => {
    const eventTime = ev.createdAt || 0;
    return eventTime > monthAgo;
  });

  const removed = oldCount - state.events.length;
  saveState();
  renderAll();
  toast("OK", "Очищено", `Удалено ${removed} старых событий`);
}

function hardenState() {
  const defaultState =
    typeof DEFAULT_STATE === "function" ? DEFAULT_STATE() : DEFAULT_STATE;

  if (!state.settings) state.settings = deepCopy(defaultState.settings);
  if (!state.settings.schedule)
    state.settings.schedule = deepCopy(defaultState.settings.schedule);
  if (!state.settings.font)
    state.settings.font = deepCopy(defaultState.settings.font);
  if (!state.settings.display)
    state.settings.display = deepCopy(defaultState.settings.display);
  if (!state.settings.theme)
    state.settings.theme = deepCopy(defaultState.settings.theme);

  const f = state.settings.font;

  if (!state.settings.font.sampleText)
    state.settings.font.sampleText = defaultState.settings.font.sampleText;

  if (!state.settings.logo) {
    state.settings.logo = deepCopy(defaultState.settings.logo);
  }

  const lg = state.settings.logo;

  lg.enabled = !!lg.enabled;
  lg.variant = clamp(Math.round(Number(lg.variant ?? 1)), 1, 3);
  lg.opacity = clamp(Math.round(Number(lg.opacity ?? 12)), 0, 100);
  lg.recolor = !!lg.recolor;
  lg.color = typeof lg.color === "string" ? lg.color.trim() : "#0ea5e9";
  lg.layout = (typeof lg.layout === "string" && lg.layout.trim()) || "center";
  lg.tileSize = clamp(Math.round(Number(lg.tileSize ?? 140)), 20, 400);

  if (
    typeof lg.horizontalGap === "undefined" &&
    typeof lg.tileGap !== "undefined"
  ) {
    lg.horizontalGap = lg.tileGap;
  }
  if (
    typeof lg.verticalGap === "undefined" &&
    typeof lg.tileGap !== "undefined"
  ) {
    lg.verticalGap = lg.tileGap;
  }

  lg.horizontalGap = clamp(Math.round(Number(lg.horizontalGap ?? 180)), 0, 800);
  lg.verticalGap = clamp(Math.round(Number(lg.verticalGap ?? 180)), 0, 800);

  lg.rotation = clamp(Math.round(Number(lg.rotation ?? 0)), -180, 180);

  lg.tileOffsetX = clamp(Math.round(Number(lg.tileOffsetX ?? 0)), -2000, 2000);
  lg.tileOffsetY = clamp(Math.round(Number(lg.tileOffsetY ?? 0)), -2000, 2000);

  if (lg.uploadedFileData && typeof lg.uploadedFileData === "string") {
    if (
      !lg.uploadedFileData.startsWith("data:") &&
      !lg.uploadedFileData.startsWith("blob:")
    ) {
      lg.uploadedFileData = null;
    }
  } else {
    lg.uploadedFileData = null;
  }

  if (typeof lg.tileGap !== "undefined") {
    delete lg.tileGap;
  }

  if (typeof f.preset !== "string" || !f.preset.trim()) f.preset = "custom";
  if (typeof f.tightness !== "string" || !f.tightness.trim())
    f.tightness = "normal";

  const fallbackFamily =
    (typeof f.family === "string" && f.family.trim()) ||
    (typeof defaultState.settings.font.family === "string" &&
      defaultState.settings.font.family.trim()) ||
    "system";

  if (!(typeof f.family === "string" && f.family.trim()))
    f.family = fallbackFamily;
  if (!(typeof f.titleFamily === "string" && f.titleFamily.trim()))
    f.titleFamily = f.family;
  if (!(typeof f.metaFamily === "string" && f.metaFamily.trim()))
    f.metaFamily = f.family;

  const sch = state.settings.schedule;
  sch.slotHeight = clamp(
    Math.round(
      Number(sch.slotHeight) || defaultState.settings.schedule.slotHeight,
    ),
    48,
    240,
  );
  sch.slotMinutes = clamp(
    Math.round(
      Number(sch.slotMinutes) || defaultState.settings.schedule.slotMinutes,
    ),
    1,
    240,
  );
  sch.maxPerCell = 2;

  if (!Array.isArray(state.events)) state.events = [];
  if (!Array.isArray(state.directions))
    state.directions = deepCopy(defaultState.directions);
  if (!Array.isArray(state.coaches)) state.coaches = [];

  state.events.forEach((ev) => {
    if (!ev.id) ev.id = uid();
    if (!ev.createdAt) ev.createdAt = Date.now();
  });
}

function generateDirectionId(name) {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const hash = Math.random().toString(36).substring(2, 8);
  return `dir_${cleanName}_${hash}`;
}

let filters = { day: "all", time: "all", dir: new Set(), q: "" };
let searchDebounce;

function getDir(id) {
  return state.directions.find((d) => d.id === id);
}

function matchesQuery(ev) {
  const q = (filters.q || "").trim().toLowerCase();
  if (!q) return true;
  const dir = getDir(ev.directionId);
  const hay = `${ev.name || ""} ${ev.coach || ""} ${ev.room || ""} ${
    dir?.name || ""
  }`.toLowerCase();
  return hay.includes(q);
}
function matchesDay(ev) {
  if (filters.day === "all") return true;
  return ev.dayIndex === filters.day;
}
function matchesTime(ev) {
  if (filters.time === "all") return true;

  const m = ev.startMin;

  if (filters.time === "morning") return m >= 360 && m < 720;
  if (filters.time === "day") return m >= 720 && m < 1080;
  if (filters.time === "evening") return m >= 1080 && m < 1380;

  return true;
}

function matchesDir(ev) {
  if (!filters.dir.size) return true;
  return filters.dir.has(ev.directionId);
}

function getBounds() {
  const s = state.settings.schedule;
  return {
    start: parseHHMM(s.start),
    end: parseHHMM(s.end),
    step: Number(s.slotMinutes),
    h: Number(s.slotHeight),
    snap: Number(s.snapMinutes),
    max: 2,
    defDur: Number(s.defaultDuration),
  };
}
function buildSlots() {
  const { start, end, step } = getBounds();
  const out = [];
  if (start == null || end == null || step <= 0) return out;
  for (let t = start; t < end; t += step) out.push(t);
  return out;
}
function slotStartFor(min) {
  const { start, step } = getBounds();
  return start + Math.floor((min - start) / step) * step;
}

function validateTimeSlot(dayIndex, startMin, durationMin, ignoreId = null) {
  const { start, end, step } = getBounds();

  const maxInSlot = state.settings?.schedule?.maxPerCell || 2;

  if (startMin < start || startMin >= end) {
    return {
      valid: false,
      reason: `Начало должно быть между ${minToHHMM(start)} и ${minToHHMM(end)}.`,
    };
  }

  if (durationMin < 1) {
    return {
      valid: false,
      reason: `Длительность должна быть не менее 1 минуты.`,
    };
  }

  if (startMin + durationMin > end) {
    return {
      valid: false,
      reason: `Занятие выходит за пределы рабочего времени (окончание ${minToHHMM(startMin + durationMin)} > ${minToHHMM(end)}).`,
    };
  }

  const overlappingEvents = state.events.filter((ev) => {
    if (ev.id === ignoreId) return false;

    if (ev.dayIndex !== dayIndex) return false;

    const evStart = ev.startMin;
    const evEnd = ev.startMin + ev.durationMin;
    const newStart = startMin;
    const newEnd = startMin + durationMin;

    return newStart < evEnd && newEnd > evStart;
  });

  if (overlappingEvents.length > 0) {
    const slotStart = slotStartFor(startMin);
    const slotEnd = slotStart + step;

    const eventsInSameSlot = overlappingEvents.filter((ev) => {
      const evSlotStart = slotStartFor(ev.startMin);
      return evSlotStart === slotStart;
    });

    if (eventsInSameSlot.length >= maxInSlot) {
      return {
        valid: false,
        reason: `В этом временном интервале уже есть максимальное количество занятий (${maxInSlot}).`,
      };
    }

    if (state.settings.display.cellView === "timeline") {
      const sortedEvents = [...eventsInSameSlot].sort(
        (a, b) => a.startMin - b.startMin,
      );

      for (const ev of sortedEvents) {
        const evStart = ev.startMin;
        const evEnd = ev.startMin + ev.durationMin;

        if (startMin < evEnd && startMin + durationMin > evStart) {
          return {
            valid: false,
            reason: `Занятие пересекается с существующим (${ev.name} ${minToHHMM(evStart)}-${minToHHMM(evEnd)}).`,
          };
        }
      }
    }
  }

  return { valid: true };
}

function prefersDark() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}
const DEFAULT_LIGHT = THEME_PRESETS[0].tokens;
const DEFAULT_DARK = THEME_PRESETS.find((p) => p.id === "graphite-dark").tokens;

function ensureThemeContrast(tokens) {
  const out = { ...tokens };
  const minRatio = 4.5;

  if (contrastRatio(out.text, out.bg) < minRatio) out.text = bestTextOn(out.bg);
  if (contrastRatio(out.text, out.card) < minRatio)
    out.text = bestTextOn(out.card);

  if (!out.muted) out.muted = out.text === "#ffffff" ? "#94a3b8" : "#64748b";
  if (contrastRatio(out.muted, out.card) < 3)
    out.muted = out.text === "#ffffff" ? "#94a3b8" : "#64748b";

  if (contrastRatio(out.border, out.card) < 1.25) {
    out.border = out.text === "#ffffff" ? "#1f2a44" : "#e2e8f0";
  }
  return out;
}

function applyFont() {
  const f = state.settings.font;

  const mainId = FONT_ID_ALIASES[f?.family] || f?.family || "system";
  const titleId = FONT_ID_ALIASES[f?.titleFamily] || f?.titleFamily || mainId;
  const metaId = FONT_ID_ALIASES[f?.metaFamily] || f?.metaFamily || mainId;
  const mainFamily = FONT_FAMILY_BY_ID[mainId] || FONT_FAMILY_BY_ID.system;

  const titleFamily = FONT_FAMILY_BY_ID[titleId] || mainFamily;

  const metaFamily = FONT_FAMILY_BY_ID[metaId] || mainFamily;

  const r = document.documentElement.style;

  r.setProperty("--tableFont", sanitizeFontFamilyStack(mainFamily));
  r.setProperty("--evTitleFont", sanitizeFontFamilyStack(titleFamily));
  r.setProperty("--evMetaFont", sanitizeFontFamilyStack(metaFamily));

  r.setProperty("--evLineHeight", String(f.lineHeight));
  r.setProperty("--evTitleSize1", `${f.titleSize1}px`);
  r.setProperty("--evTitleSize2", `${f.titleSize2}px`);
  r.setProperty("--evMetaSize1", `${f.metaSize1}px`);
  r.setProperty("--evMetaSize2", `${f.metaSize2}px`);
  r.setProperty("--evTitleW", String(f.weightTitle));
  r.setProperty("--evMetaW", String(f.weightMeta));
  r.setProperty("--evLetterSpacing", `${Number(f.letterSpacing || 0)}em`);
  r.setProperty("--evTextTransform", String(f.textTransform || "none"));
  r.setProperty("--evTitleClamp", String(Number(f.titleClamp || 3)));
  r.setProperty("--evCardPadY", `${Number(f.cardPadY || 7)}px`);
  r.setProperty("--evCardRadius", `${Number(f.cardRadius || 12)}px`);

  const uiRadius = clamp(Number(f.cardRadius ?? 12) + 2, 10, 24);
  r.setProperty("--radius", uiRadius + "px");

  const lh = Number(f.lineHeight) || 1.12;
  const t1 = Number(f.titleSize1) || 12;
  const m1 = Number(f.metaSize1) || 11;

  const wantedSlotH = Math.ceil(t1 * lh * 3 + m1 * lh * 2 + 28);

  const slotFromSettings = Number(state.settings.schedule?.slotHeight) || 72;
  const slotH = Math.max(48, slotFromSettings, wantedSlotH);
  r.setProperty("--slotH", `${slotH}px`);

  const wantedCardMinH = Math.ceil(t1 * lh * 2.6 + m1 * lh * 1.4 + 24);
  r.setProperty("--evCardMinH", `${Math.max(60, wantedCardMinH)}px`);

  const wantedDayMinW = Math.ceil((t1 || 12) * 7.5 + 84);
  r.setProperty("--dayMinW", clamp(wantedDayMinW, 120, 240) + "px");
  if (!(Number(state.settings.display?.dayWidthPx) > 0)) {
    r.setProperty("--dayW", clamp(wantedDayMinW, 120, 240) + "px");
  }

  const wantedTimeCol = Math.ceil(Math.max(44, m1 * 4 + 20));
  r.setProperty("--timeCol", clamp(wantedTimeCol, 26, 80) + "px");
}

function applyTheme() {
  const t = state.settings.theme;
  let tokens;

  if (t.mode === "auto") tokens = prefersDark() ? DEFAULT_DARK : DEFAULT_LIGHT;
  else if (t.mode === "light") tokens = DEFAULT_LIGHT;
  else if (t.mode === "dark") tokens = DEFAULT_DARK;
  else tokens = t.customTokens;

  tokens = ensureThemeContrast(tokens);

  const inferredDark = relLuminance(tokens.bg) < 0.35;
  document.documentElement.dataset.scheme = inferredDark ? "dark" : "light";

  const r = document.documentElement.style;
  r.setProperty("--bg", tokens.bg);
  r.setProperty("--card", tokens.card);
  r.setProperty("--text", tokens.text);
  r.setProperty("--muted", tokens.muted);
  r.setProperty("--border", tokens.border);
  r.setProperty("--gridHead", tokens.gridHead);
  r.setProperty("--accent", tokens.accent);
  r.setProperty("--accentText", bestTextOn(tokens.accent));

  const aToday = clamp((t.alpha.today ?? 60) / 100, 0, 1);
  const aNow = clamp((t.alpha.now ?? 65) / 100, 0, 1);
  const aEvent = clamp((t.alpha.event ?? 100) / 100, 0.2, 1);
  const aShadow = clamp((t.alpha.shadow ?? 10) / 100, 0, 1);

  r.setProperty("--todayColRGBA", rgba(tokens.today, aToday));
  r.setProperty("--nowRowRGBA", rgba(tokens.now, aNow));
  r.setProperty("--eventAlpha", String(aEvent));
  r.setProperty(
    "--shadowRGBA",
    `rgba(15, 23, 42, ${inferredDark ? 0.35 : aShadow})`,
  );

  applyFont();
  applyLayout();
}

function applyLayout() {
  const d = state.settings.display;
  const r = document.documentElement.style;

  const pad = Number(d.cellPadPx ?? 6);
  r.setProperty("--cellPad", `${clamp(pad, 0, 24)}px`);

  const w = Number(d.dayWidthPx ?? 0);
  if (w > 0) r.setProperty("--dayW", `${clamp(w, 120, 800)}px`);
}

function ensureLogoLayer() {
  const scheduleWrap = document.querySelector(".schedule-wrap");
  if (!scheduleWrap) return null;

  let layer = document.getElementById("logoLayer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "logoLayer";
    layer.setAttribute("aria-hidden", "true");
    layer.style.display = "none";
    scheduleWrap.appendChild(layer);
  }

  let mark = document.getElementById("logoMark");
  if (!mark) {
    mark = document.createElement("div");
    mark.id = "logoMark";
    mark.setAttribute("aria-hidden", "true");
    layer.appendChild(mark);
  }

  // Убедимся, что .schedule-wrap имеет position: relative
  if (scheduleWrap.style.position !== "relative") {
    scheduleWrap.style.position = "relative";
  }

  return layer;
}

// Добавьте после функции ensureLogoLayer()
function getScheduleMetrics(context = document) {
  const schedule = context.querySelector('.schedule');
  if (!schedule) {
    // Возвращаем дефолтные значения, если schedule не найден
    return {
      timeColWidth: 76,
      dayHeadHeight: 42,
      scheduleWidth: 0,
      scheduleHeight: 0,
      contentWidth: 0,
      contentHeight: 0
    };
  }

  // Ищем колонку времени
  let timeColWidth = 76;
  const timeCell = schedule.querySelector('.cell.time');
  if (timeCell) {
    const rect = timeCell.getBoundingClientRect();
    timeColWidth = rect.width;
  }
  
  // Ищем заголовок дня
  let dayHeadHeight = 42;
  const headCell = schedule.querySelector('.cell.head');
  if (headCell) {
    const rect = headCell.getBoundingClientRect();
    dayHeadHeight = rect.height;
  }
  
  // Полная ширина и высота расписания
  const scheduleWidth = schedule.scrollWidth;
  const scheduleHeight = schedule.scrollHeight;
  
  // Ширина и высота области контента (без заголовков)
  const contentWidth = scheduleWidth - timeColWidth;
  const contentHeight = scheduleHeight - dayHeadHeight;

  return {
    timeColWidth,
    dayHeadHeight,
    scheduleWidth,
    scheduleHeight,
    contentWidth: Math.max(0, contentWidth),
    contentHeight: Math.max(0, contentHeight)
  };
}

function getLogoVariant() {
  const variant = state.settings.logo?.variant;
  // Если вариант 3 выбран, но файл не загружен, возвращаем вариант 1 как запасной
  if (variant === 3 && !state.settings.logo.uploadedFileData) {
    return 1;
  }
  return clamp(Math.round(Number(variant ?? 1)), 1, 3);
}

const LOGO_URLS = {
  1: "./src/Logo.svg",
  2: "./src/Logo2.svg",
  3: "uploaded" // специальное значение для загруженного файла
};

// Функция для получения URL логотипа
function getLogoUrlByVariant(variant, recolorColor = null) {
  variant = Number(variant);
  
  // Если указан цвет для перекрашивания и это встроенный логотип (1 или 2)
  if (recolorColor && (variant === 1 || variant === 2)) {
    const cacheKey = `${variant}_${recolorColor}`;
    if (!window._logoSvgBlobUrls) window._logoSvgBlobUrls = {};
    
    if (!window._logoSvgBlobUrls[cacheKey]) {
      let svgString;
      if (variant === 1) {
        // Простой круг - минимальный валидный SVG
        svgString = `<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="${recolorColor}" stroke="none"/>
        </svg>`;
      } else if (variant === 2) {
        // Простой прямоугольник
        svgString = `<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="${recolorColor}" stroke="none"/>
        </svg>`;
      }
      
      if (svgString) {
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        window._logoSvgBlobUrls[cacheKey] = URL.createObjectURL(blob);
      }
    }
    return window._logoSvgBlobUrls[cacheKey] || getLogoUrlByVariant(variant);
  }
  
  // Стандартное поведение для незакрашенных логотипов
  if (!window._logoSvgBlobUrls) window._logoSvgBlobUrls = {};
  
  // Создаем встроенные SVG для логотипов 1 и 2
  if (!window._logoSvgBlobUrls[1]) {
    const svg1 = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#000000" stroke="none"/>
    </svg>`;
    const blob1 = new Blob([svg1], { type: "image/svg+xml;charset=utf-8" });
    window._logoSvgBlobUrls[1] = URL.createObjectURL(blob1);
  }
  
  if (!window._logoSvgBlobUrls[2]) {
    const svg2 = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="80" rx="10" fill="#000000" stroke="none"/>
    </svg>`;
    const blob2 = new Blob([svg2], { type: "image/svg+xml;charset=utf-8" });
    window._logoSvgBlobUrls[2] = URL.createObjectURL(blob2);
  }
  
  // Для варианта 3 возвращаем загруженный файл
  if (variant === 3) {
    const fileData = state.settings.logo?.uploadedFileData;
    if (fileData && (fileData.startsWith("data:") || fileData.startsWith("blob:"))) {
      return fileData;
    } else {
      console.warn('Загруженный файл не найден, используем логотип 1');
      return window._logoSvgBlobUrls[1];
    }
  }
  
  return window._logoSvgBlobUrls[variant] || window._logoSvgBlobUrls[1];
}

// ПОЛЕЗНО: Можно добавить небольшую проверку при старте, чтобы убедиться, что LOGO_URLS определён
if (typeof LOGO_URLS === 'undefined') {
  console.error("LOGO_URLS is not defined! Please define it before calling getLogoUrlByVariant.");
  // Можно установить временный фоллбэк, если LOGO_URLS не определён
  // const LOGO_URLS = { 1: "", 2: "" }; // или другие пути
}

window.getTileSrc = function getTileSrc(
  variant,
  tileSize = 140,
  horizontalGap = 180,
  verticalGap = 180,
  rotation = 0,
  layout = "tile",
  recolorColor = null
) {
  variant = Number(variant);
  
  // Получаем data URL логотипа
  const logoDataUrl = getLogoDataUrl(variant, recolorColor);
  
  // Ключ для кэша
  const key = `${variant}|${tileSize}|${horizontalGap}|${verticalGap}|${rotation}|${layout}|${recolorColor}`;
  
  // Проверяем кэш
  if (window._tileBlobCache && window._tileBlobCache.get(key)) {
    return window._tileBlobCache.get(key);
  }
  
  let svg;
  
  if (layout === "diagonal") {
    // ДИАГОНАЛЬНЫЙ РЕЖИМ
    const cellW = tileSize + horizontalGap;
    const cellH = tileSize + verticalGap;
    
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cellW * 2}" height="${cellH * 2}" viewBox="0 0 ${cellW * 2} ${cellH * 2}">
      <defs>
        <pattern id="pattern${key}" patternUnits="userSpaceOnUse" width="${cellW * 2}" height="${cellH * 2}">
          <g transform="translate(${cellW/2}, ${cellH/2}) rotate(${rotation}) translate(${-tileSize/2}, ${-tileSize/2})">
            <image href="${logoDataUrl}" width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid meet"/>
          </g>
          <g transform="translate(${cellW * 1.5}, ${cellH * 1.5}) rotate(${rotation}) translate(${-tileSize/2}, ${-tileSize/2})">
            <image href="${logoDataUrl}" width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid meet"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern${key})"/>
    </svg>`;
  } else {
    // ОБЫЧНЫЙ ПЛИТОЧНЫЙ РЕЖИМ
    const cellW = tileSize + horizontalGap;
    const cellH = tileSize + verticalGap;
    
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cellW}" height="${cellH}" viewBox="0 0 ${cellW} ${cellH}">
      <defs>
        <pattern id="pattern${key}" patternUnits="userSpaceOnUse" width="${cellW}" height="${cellH}">
          <g transform="translate(${cellW/2}, ${cellH/2}) rotate(${rotation}) translate(${-tileSize/2}, ${-tileSize/2})">
            <image href="${logoDataUrl}" width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid meet"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern${key})"/>
    </svg>`;
  }
  
  // Кэшируем результат
  const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  if (window._tileBlobCache) {
    window._tileBlobCache.set(key, dataUrl);
  }
  
  return dataUrl;
};

// --- НОВЫЙ КОД ---
// Строки SVG для внутреннего использования
// Вместо двух систем - одна простая
const LOGO_SVG_STRINGS = {
  1: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>',
  2: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="15" fill="currentColor"/></svg>',
  3: null // Для загруженного файла
};

// Добавьте эту функцию после getLogoUrlByVariant
window.getLogoDataUrl = function getLogoDataUrl(variant, recolorColor = null) {
  variant = Number(variant);
  
  // Для загруженного файла (вариант 3) - возвращаем как есть
  if (variant === 3) {
    const fileData = state.settings.logo?.uploadedFileData;
    if (fileData && fileData.startsWith("data:")) {
      // Если нужно перекрасить, создаем новый data URL с перекрашиванием
      if (recolorColor) {
        // Для SVG файлов можно добавить стиль перекрашивания
        if (fileData.includes("image/svg+xml")) {
          // Извлекаем SVG и добавляем стиль
          const base64 = fileData.split(',')[1];
          const svgText = atob(base64);
          let coloredSvg = svgText;
          // Простая замена fill и stroke цветов
          coloredSvg = coloredSvg.replace(/(fill|stroke)="[^"]*"/g, `$1="${recolorColor}"`);
          return `data:image/svg+xml;base64,${btoa(coloredSvg)}`;
        }
      }
      return fileData;
    }
    // Fallback на вариант 1
    variant = 1;
  }
  
  // Определяем SVG строку для вариантов 1 и 2
  let svgString;
  if (variant === 1) {
    svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>';
  } else if (variant === 2) {
    svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="15" fill="currentColor"/></svg>';
  } else {
    svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>';
  }
  
  // Если указан цвет для перекрашивания, заменяем currentColor
  if (recolorColor && (variant === 1 || variant === 2)) {
    svgString = svgString.replace(/fill="currentColor"/g, `fill="${recolorColor}"`);
  }
  
  // Кодируем в base64 для data URL
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
};

// Глобальный объект для хранения Blob URL (чтобы можно было освобождать память)
window._logoSvgBlobUrls = window._logoSvgBlobUrls || {};
// Функция для получения Blob URL для SVG строк
window.getLogoSvgBlobUrl = function (variant) {
  variant = Number(variant);
  if (!(variant in LOGO_SVG_STRINGS)) {
    console.warn(`getLogoSvgBlobUrl: Unknown variant ${variant}`);
    variant = 1; // fallback
  }

  if (!window._logoSvgBlobUrls[variant]) {
    const svgString = LOGO_SVG_STRINGS[variant];
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    window._logoSvgBlobUrls[variant] = URL.createObjectURL(blob);
  }
  return window._logoSvgBlobUrls[variant];
};

// --- /НОВЫЙ КОД ---
function applyLogo() {
  const layer = document.getElementById("logoLayer");
  const mark = document.getElementById("logoMark");
  if (!layer || !mark) return;

  const lg = state.settings.logo || {};
  const hasLogo = !!lg.enabled;
  layer.style.display = hasLogo ? "block" : "none";

  if (!hasLogo) {
    mark.style.cssText = "";
    return;
  }

  const layout = String(lg.layout || "center");
  const variant = getLogoVariant();
  
  // Получаем метрики расписания
  const metrics = getScheduleMetrics();
  
  console.log('Logo positioning metrics:', metrics);
  
  // Общие стили для слоя логотипа
  layer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    display: ${hasLogo ? 'block' : 'none'};
  `;
  
  // Полностью сбрасываем стили марки
  mark.style.cssText = '';
  
  // Базовые стили марки
  mark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 0;
    opacity: ${(lg.opacity || 12) / 100};
  `;
  
  if (layout === "center") {
    // ЦЕНТРИРОВАННЫЙ РЕЖИМ
    const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
    
    // Рассчитываем центр области контента
    const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
    const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;
    
    mark.style.cssText += `
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${centerX - tileSize / 2}px;
      top: ${centerY - tileSize / 2}px;
      transform: rotate(${lg.rotation || 0}deg);
    `;
    
    // Получаем URL логотипа
    const src = getLogoUrlByVariant(variant, lg.recolor ? lg.color : null);
    
    applyLogoStyle(mark, src, lg.recolor && variant === 3 ? lg.color : null, false);
  } 
  else if (layout === "stamp") {
    // ШТАМП - в правом нижнем углу области контента
    const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
    
    const stampX = metrics.timeColWidth + metrics.contentWidth - tileSize - 20;
    const stampY = metrics.dayHeadHeight + metrics.contentHeight - tileSize - 20;
    
    mark.style.cssText += `
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${stampX}px;
      top: ${stampY}px;
      transform: rotate(${lg.rotation || 0}deg);
    `;
    
    const src = getLogoUrlByVariant(variant, lg.recolor ? lg.color : null);
    
    applyLogoStyle(mark, src, lg.recolor && variant === 3 ? lg.color : null, false);
  }
  else if (layout === "tile" || layout === "diagonal") {
    // ПЛИТОЧНЫЕ РЕЖИМЫ - заполняем только область контента
    const tileSize = Math.max(20, Math.min(400, Number(lg.tileSize) || 140));
    const horizontalGap = Number(lg.horizontalGap || 180);
    const verticalGap = Number(lg.verticalGap || 180);
    
    mark.style.cssText += `
      left: ${metrics.timeColWidth}px;
      top: ${metrics.dayHeadHeight}px;
      width: ${metrics.contentWidth}px;
      height: ${metrics.contentHeight}px;
    `;
    
    // Получаем data URL для плитки
    const src = window.getTileSrc(
      variant,
      tileSize,
      horizontalGap,
      verticalGap,
      lg.rotation || 0,
      layout,
      lg.recolor ? lg.color : null
    );
    
    if (lg.recolor && variant === 3) {
      // Для загруженного файла с перекрашиванием используем mask
      mark.style.backgroundColor = lg.color || "#0ea5e9";
      mark.style.webkitMaskImage = `url(${src})`;
      mark.style.maskImage = `url(${src})`;
      mark.style.webkitMaskRepeat = 'repeat';
      mark.style.maskRepeat = 'repeat';
      mark.style.backgroundImage = 'none';
      
      // Размер паттерна для разных режимов
      if (layout === "diagonal") {
        mark.style.webkitMaskSize = `${tileSize * 2}px ${tileSize * 2}px`;
        mark.style.maskSize = `${tileSize * 2}px ${tileSize * 2}px`;
      } else {
        mark.style.webkitMaskSize = `${tileSize}px ${tileSize}px`;
        mark.style.maskSize = `${tileSize}px ${tileSize}px`;
      }
      
      // Смещение
      const offsetX = Number(lg.tileOffsetX || 0);
      const offsetY = Number(lg.tileOffsetY || 0);
      mark.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
      mark.style.maskPosition = `${offsetX}px ${offsetY}px`;
    } else {
      mark.style.backgroundImage = `url(${src})`;
      mark.style.backgroundRepeat = 'repeat';
      
      // Размер паттерна для разных режимов
      if (layout === "diagonal") {
        mark.style.backgroundSize = `${tileSize * 2}px ${tileSize * 2}px`;
      } else {
        mark.style.backgroundSize = `${tileSize}px ${tileSize}px`;
      }
      
      // Смещение
      const offsetX = Number(lg.tileOffsetX || 0);
      const offsetY = Number(lg.tileOffsetY || 0);
      mark.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    }
  }
  
  // Принудительно пересчитываем стили
  layer.style.display = hasLogo ? 'block' : 'none';
  mark.style.display = hasLogo ? 'block' : 'none';
}

// Вспомогательная функция для применения стилей логотипа
function applyLogoStyle(element, src, recolorColor = null, isTile = false) {
  if (recolorColor && src) {
    element.style.backgroundColor = recolorColor;
    element.style.webkitMaskImage = `url(${src})`;
    element.style.maskImage = `url(${src})`;
    element.style.webkitMaskRepeat = isTile ? 'repeat' : 'no-repeat';
    element.style.maskRepeat = isTile ? 'repeat' : 'no-repeat';
    element.style.webkitMaskPosition = 'center';
    element.style.maskPosition = 'center';
    element.style.webkitMaskSize = isTile ? 'contain' : 'contain';
    element.style.maskSize = isTile ? 'contain' : 'contain';
    element.style.backgroundImage = 'none';
  } else if (src) {
    element.style.backgroundImage = `url(${src})`;
    element.style.backgroundRepeat = isTile ? 'repeat' : 'no-repeat';
    element.style.backgroundPosition = 'center';
    element.style.backgroundSize = 'contain';
  }
}

function syncLogoPreview() {
  const lg = state.settings.logo || {};
  const previewContainer = document.getElementById("logoPreviewContainer");
  
  if (!previewContainer) return;
  
  // Создаем или обновляем предпросмотр
  let preview = previewContainer.querySelector(".logo-preview");
  if (!preview) {
    preview = document.createElement("div");
    preview.className = "logo-preview";
    previewContainer.appendChild(preview);
  }
  
  // Сбрасываем стили
  preview.style.cssText = '';
  
  if (!lg.enabled) {
    preview.style.display = 'none';
    return;
  }
  
  preview.style.display = 'block';
  
  // Устанавливаем размер предпросмотра
  const tileSize = Math.max(20, Math.min(400, Number(lg.tileSize) || 140));
  preview.style.width = `${tileSize}px`;
  preview.style.height = `${tileSize}px`;
  preview.style.opacity = `${Number(lg.opacity) / 100}`;
  
  const layout = String(lg.layout || "center");
  const variant = getLogoVariant();
  const isTile = layout === "tile" || layout === "diagonal";
  
  // Получаем URL логотипа
  let src;
  if (isTile) {
    src = window.getTileSrc(
      variant,
      tileSize,
      lg.horizontalGap || 180,
      lg.verticalGap || 180,
      lg.rotation || 0,
      layout,
      lg.recolor ? lg.color : null
    );
  } else {
    src = getLogoUrlByVariant(variant, lg.recolor ? lg.color : null);
  }
  
  // Применяем стили в зависимости от режима
  if (isTile) {
    preview.style.backgroundImage = `url(${src})`;
    preview.style.backgroundRepeat = "repeat";
    preview.style.backgroundSize = `${tileSize}px ${tileSize}px`;
    preview.style.backgroundPosition = "0 0";
  } else {
    preview.style.backgroundImage = `url(${src})`;
    preview.style.backgroundRepeat = "no-repeat";
    preview.style.backgroundSize = "contain";
    preview.style.backgroundPosition = "center center";
  }
  
  // Обработка режима перекрашивания
  if (lg.recolor && variant === 3) {
    preview.style.backgroundColor = lg.color || "#0ea5e9";
    preview.style.webkitMaskImage = `url(${src})`;
    preview.style.maskImage = `url(${src})`;
    preview.style.backgroundImage = "";
    preview.style.webkitMaskSize = "contain";
    preview.style.maskSize = "contain";
    preview.style.webkitMaskRepeat = "no-repeat";
    preview.style.maskRepeat = "no-repeat";
    preview.style.webkitMaskPosition = "center center";
    preview.style.maskPosition = "center center";
  }
}

let lastLogoState = null;

function updateLogoIfNeeded() {
  const lg = state.settings.logo || {};
  const currentState = JSON.stringify({
    enabled: lg.enabled,
    variant: lg.variant,
    opacity: lg.opacity,
    recolor: lg.recolor,
    color: lg.color,
    layout: lg.layout,
    tileSize: lg.tileSize,
    horizontalGap: lg.horizontalGap,
    verticalGap: lg.verticalGap,
    rotation: lg.rotation,
    tileOffsetX: lg.tileOffsetX,
    tileOffsetY: lg.tileOffsetY,
    uploadedFileData: lg.uploadedFileData, // важно для загруженных файлов
  });

  if (currentState !== lastLogoState) {
    lastLogoState = currentState;
    applyLogo();
  }
}

function mkLabel(text) {
  const s = document.createElement("span");
  s.className = "label";
  s.textContent = text + ":";
  return s;
}
function mkChip(active, text, onClick) {
  const c = document.createElement("button");
  c.type = "button";
  c.className = "chip" + (active ? " active" : "");
  c.textContent = text;
  c.addEventListener("click", onClick);
  return c;
}
function mkDirChip(active, dir, count, onClick) {
  const c = document.createElement("button");
  c.type = "button";
  c.className = "chip" + (active ? " active" : "");
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.style.background = dir.color;
  const name = document.createElement("span");
  name.textContent = dir.name;
  const cnt = document.createElement("span");
  cnt.className = "count";
  cnt.textContent = String(count);
  c.appendChild(dot);
  c.appendChild(name);
  c.appendChild(cnt);
  c.addEventListener("click", onClick);
  return c;
}
function countByDirection() {
  const map = {};
  state.events.forEach((ev) => {
    if (!memoizedEventVisible(ev)) return;
    map[ev.directionId] = (map[ev.directionId] || 0) + 1;
  });
  return map;
}

function renderFilterBar() {
  const dayGroup = $("dayGroup");
  dayGroup.innerHTML = "";
  dayGroup.appendChild(mkLabel("День"));
  dayGroup.appendChild(
    mkChip(filters.day === "all", "Все", () => {
      filters.day = "all";
      onFiltersChanged();
    }),
  );
  DAYS.forEach((d, idx) =>
    dayGroup.appendChild(
      mkChip(filters.day === idx, d, () => {
        filters.day = idx;
        onFiltersChanged();
      }),
    ),
  );

  const timeGroup = $("timeGroup");
  timeGroup.innerHTML = "";
  timeGroup.appendChild(mkLabel("Время"));
  [
    { id: "all", label: "Весь день" },
    { id: "morning", label: "Утро" },
    { id: "day", label: "День" },
    { id: "evening", label: "Вечер" },
  ].forEach((o) =>
    timeGroup.appendChild(
      mkChip(filters.time === o.id, o.label, () => {
        filters.time = o.id;
        onFiltersChanged();
      }),
    ),
  );

  const dirGroup = $("dirGroup");
  dirGroup.innerHTML = "";
  dirGroup.appendChild(mkLabel("Направления"));
  dirGroup.appendChild(
    mkChip(filters.dir.size === 0, "Все", () => {
      filters.dir.clear();
      onFiltersChanged();
    }),
  );

  const counts = countByDirection();
  state.directions.forEach((d) => {
    dirGroup.appendChild(
      mkDirChip(filters.dir.has(d.id), d, counts[d.id] || 0, () => {
        if (filters.dir.has(d.id)) filters.dir.delete(d.id);
        else filters.dir.add(d.id);
        onFiltersChanged();
      }),
    );
  });

  $("q").value = filters.q || "";
}

function metaCoachRoom(ev, includeTime = false) {
  const parts = [];

  if (includeTime) {
    const range = `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`;
    parts.push(range);
  }

  if (ev.coach) parts.push(fixTypography(ev.coach));
  if (ev.room) parts.push(fixTypography(ev.room));
  return parts.join(" · ");
}

function metaFullByMode(ev) {
  const mode = state.settings.display.cardMode;

  if (mode === "name") return "";
  if (mode === "namecoachroom") return metaCoachRoom(ev, false);
  if (mode === "nametimecoachroom") return metaCoachRoom(ev, true);

  return metaCoachRoom(ev, true);
}

function mkCell(cls, text) {
  const d = document.createElement("div");
  d.className = cls;
  d.textContent = text;
  return d;
}

function renderSchedule() {
  let scheduleEl = $("schedule");
  if (!scheduleEl) {
    console.error("Элемент schedule не найден!");
    return;
  }
  scheduleEl.innerHTML = "";

  const { step } = getBounds();
  const slots = buildSlots();
  const view = state.settings.display.cellView;

  const todayIndex = (new Date().getDay() + 6) % 7;

  const sw = document.querySelector(".schedule-wrap");

  scheduleEl.classList.toggle("compact-mode", view === "compact");

  if (sw) {
    sw.classList.toggle("is-compact", view === "compact");
  }

  if (view !== "compact") {
    scheduleEl.appendChild(mkCell("cell head time", ""));
  }

  DAYS.forEach((d, dayIndex) => {
    const c = mkCell("cell head", "");

    const daySpan = document.createElement("span");
    daySpan.textContent = d;

    const actionsSpan = document.createElement("span");
    actionsSpan.className = "day-actions";
    actionsSpan.title = "Действия";
    actionsSpan.textContent = "⋯";
    actionsSpan.dataset.dayIndex = dayIndex;

    c.appendChild(daySpan);
    c.appendChild(document.createTextNode(" "));
    c.appendChild(actionsSpan);

    scheduleEl.appendChild(c);
  });

  function createCompactEventCard(ev) {
    const dir = getDir(ev.directionId);
    const color = dir ? dir.color : "#64748b";
    const text = bestTextOn(color);

    const el = document.createElement("div");
    el.className = "event compact-card";
    el.dataset.eid = ev.id;
    if (!memoizedEventVisible(ev)) el.classList.add("dim");

    el.style.setProperty("--ev-bg", color);
    el.style.setProperty("--ev-text", text);

    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (de) => {
      de.dataTransfer.setData("text/event-id", ev.id);
      de.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    el.addEventListener("click", (ce) => {
      ce.stopPropagation();
      openEdit(ev.id);
    });

    const title = document.createElement("div");
    title.className = "t";
    title.textContent = fixTypography(ev.name) || "Без названия";
    el.appendChild(title);

    const metaText = metaFullByMode(ev);
    if (metaText) {
      const meta = document.createElement("div");
      meta.className = "m";
      meta.textContent = metaText;
      el.appendChild(meta);
    }

    const grab = document.createElement("div");
    grab.className = "grab";
    grab.textContent = "↕";
    el.appendChild(grab);

    if (state.settings.display.showNotes) {
      const tt = [];
      tt.push(
        `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
      );
      if (ev.coach) tt.push(ev.coach);
      if (ev.room) tt.push(ev.room);
      if (dir) tt.push(dir.name);
      if (ev.notes) tt.push(`📝 ${ev.notes}`);
      el.title = tt.join(" · ");
    }

    return el;
  }

  if (view === "compact") {
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const cell = mkCell("cell droppable", "");
      if (
        dayIndex === todayIndex &&
        state.settings.display.showTodayHighlight
      ) {
        cell.classList.add("col-today");
      }

      const slot = document.createElement("div");
      slot.className = "slot compact-mode";

      const slotInner = document.createElement("div");
      slotInner.className = "slot-inner";
      slot.appendChild(slotInner);

      const dayEvents = state.events
        .filter((ev) => ev.dayIndex === dayIndex)
        .sort((a, b) => a.startMin - b.startMin);

      if (dayEvents.length === 0) {
        if (state.settings.display.showEmptyHint) {
          const hint = document.createElement("div");
          hint.className = "empty-slot";
          hint.textContent = "Нет занятий";
          slotInner.appendChild(hint);
        }
      } else {
        dayEvents.forEach((ev) =>
          slotInner.appendChild(createCompactEventCard(ev)),
        );
      }

      cell.addEventListener("click", (e) => {
        if (
          e.target === cell ||
          e.target === slotInner ||
          (e.target &&
            e.target.classList &&
            e.target.classList.contains("empty-slot"))
        ) {
          const start = parseHHMM(state.settings.schedule.start) || 540;
          smartOpenCreate(dayIndex, start);
        }
      });

      cell.appendChild(slot);
      scheduleEl.appendChild(cell);
    }
  } else {
    slots.forEach((slotStart, slotIndex) => {
      const slotEnd = slotStart + step;

      const tCell = mkCell("cell time", minToHHMM(slotStart));
      scheduleEl.appendChild(tCell);

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cell = mkCell("cell droppable", "");
        cell.dataset.slotIndex = String(slotIndex);

        if (
          dayIndex === todayIndex &&
          state.settings.display.showTodayHighlight
        ) {
          cell.classList.add("col-today");
        }

        const slot = document.createElement("div");
        slot.className = "slot";
        if (view === "list") slot.classList.add("list-mode");
        if (view === "timeline") slot.classList.add("tl-fill");

        const slotInner = document.createElement("div");
        slotInner.className = "slot-inner";
        slot.appendChild(slotInner);

        cell.addEventListener("click", () =>
          smartOpenCreate(dayIndex, slotStart, slotEnd),
        );

        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.stopPropagation();
          cell.classList.add("drop-target");
          e.dataTransfer.dropEffect = "move";
        });

        cell.addEventListener("dragleave", (e) => {
          if (!cell.contains(e.relatedTarget))
            cell.classList.remove("drop-target");
        });

        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          e.stopPropagation();
          cell.classList.remove("drop-target");

          const id = e.dataTransfer.getData("text/event-id");
          if (!id) return;

          const ev = state.events.find((x) => x.id === id);
          if (!ev) return;

          smartMoveEvent(id, dayIndex, slotStart, "Перемещение drag&drop");
        });

        const eventsInCell = state.events
          .filter(
            (ev) =>
              ev.dayIndex === dayIndex &&
              ev.startMin >= slotStart &&
              ev.startMin < slotEnd,
          )
          .sort((a, b) => a.startMin - b.startMin);

        const count = eventsInCell.length;

        if (!count) {
          if (state.settings.display.showEmptyHint) {
            const hint = document.createElement("div");
            hint.className = "empty-slot";
            hint.textContent = "Клик для добавления";
            slotInner.appendChild(hint);
          }
        } else if (view === "list") {
          eventsInCell.forEach((ev) => {
            const dir = getDir(ev.directionId);
            const color = dir ? dir.color : "#64748b";
            const text = bestTextOn(color);

            const el = document.createElement("div");
            el.className = "event list" + (count === 2 ? " double" : "");
            el.dataset.eid = ev.id;
            if (!memoizedEventVisible(ev)) el.classList.add("dim");
            el.style.setProperty("--ev-bg", color);
            el.style.setProperty("--ev-text", text);

            el.setAttribute("draggable", "true");
            el.addEventListener("dragstart", (de) => {
              de.dataTransfer.setData("text/event-id", ev.id);
              de.dataTransfer.effectAllowed = "move";
              el.classList.add("dragging");
            });
            el.addEventListener("dragend", () =>
              el.classList.remove("dragging"),
            );
            el.addEventListener("click", (ce) => {
              ce.stopPropagation();
              openEdit(ev.id);
            });

            const title = document.createElement("div");
            title.className = "t";
            title.textContent = fixTypography(ev.name) || "Без названия";

            const metaText = metaFullByMode(ev);
            const meta = document.createElement("div");
            meta.className = "m";
            meta.textContent = metaText;

            const grab = document.createElement("div");
            grab.className = "grab";
            grab.textContent = "↕";

            el.appendChild(title);
            if (metaText) el.appendChild(meta);
            el.appendChild(grab);

            if (state.settings.display.showNotes) {
              const tt = [];
              tt.push(
                `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
              );
              if (ev.coach) tt.push(ev.coach);
              if (ev.room) tt.push(ev.room);
              if (dir) tt.push(dir.name);
              if (ev.notes) tt.push("— " + ev.notes);
              el.title = tt.join("\n");
            }

            slotInner.appendChild(el);
          });
        } else {
          if (count === 2) {
            slot.classList.add("two");
            cell.dataset.double = "1";

            const doubleLayout = "stacked";

            const sortedEvents = [...eventsInCell].sort(
              (a, b) => a.startMin - b.startMin,
            );
            sortedEvents.forEach((ev) => {
              const dir = getDir(ev.directionId);
              const color = dir ? dir.color : "#64748b";
              const text = bestTextOn(color);

              const el = document.createElement("div");
              el.className = "event double";
              el.classList.add(doubleLayout);
              el.dataset.eid = ev.id;
              if (!memoizedEventVisible(ev)) el.classList.add("dim");
              el.style.setProperty("--ev-bg", color);
              el.style.setProperty("--ev-text", text);

              el.setAttribute("draggable", "true");
              el.addEventListener("dragstart", (de) => {
                de.dataTransfer.setData("text/event-id", ev.id);
                de.dataTransfer.effectAllowed = "move";
                el.classList.add("dragging");
              });
              el.addEventListener("dragend", () =>
                el.classList.remove("dragging"),
              );
              el.addEventListener("click", (ce) => {
                ce.stopPropagation();
                openEdit(ev.id);
              });

              const title = document.createElement("div");
              title.className = "t";
              title.textContent = fixTypography(ev.name);
              el.appendChild(title);

              const metaText = metaFullByMode(ev);
              if (metaText) {
                const meta = document.createElement("div");
                el.classList.add("title-3");
                meta.className = "m";
                meta.textContent = metaText;
                el.appendChild(meta);
              }

              const grab = document.createElement("div");
              grab.className = "grab";
              grab.textContent = "↕";
              el.appendChild(grab);

              if (state.settings.display.showNotes) {
                const tt = [];
                tt.push(
                  `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
                );
                if (ev.coach) tt.push(ev.coach);
                if (ev.room) tt.push(ev.room);
                if (dir) tt.push(dir.name);
                if (ev.notes) tt.push(`📝 ${ev.notes}`);
                el.title = tt.join(" · ");
              }

              slotInner.appendChild(el);
            });
          } else {
            cell.dataset.double = "";
            eventsInCell.forEach((ev) => {
              const dir = getDir(ev.directionId);
              const color = dir ? dir.color : "#64748b";
              const text = bestTextOn(color);

              const el = document.createElement("div");
              el.className = "event";
              el.dataset.eid = ev.id;
              if (!memoizedEventVisible(ev)) el.classList.add("dim");
              el.style.setProperty("--ev-bg", color);
              el.style.setProperty("--ev-text", text);

              el.setAttribute("draggable", "true");
              el.addEventListener("dragstart", (de) => {
                de.dataTransfer.setData("text/event-id", ev.id);
                de.dataTransfer.effectAllowed = "move";
                el.classList.add("dragging");
              });
              el.addEventListener("dragend", () =>
                el.classList.remove("dragging"),
              );
              el.addEventListener("click", (ce) => {
                ce.stopPropagation();
                openEdit(ev.id);
              });

              const title = document.createElement("div");
              title.className = "t";
              title.textContent = fixTypography(ev.name);
              el.appendChild(title);

              const metaText = metaFullByMode(ev);
              if (metaText) {
                const meta = document.createElement("div");
                meta.className = "m";
                meta.textContent = metaText;
                el.appendChild(meta);
              }

              const grab = document.createElement("div");
              grab.className = "grab";
              grab.textContent = "↕";
              el.appendChild(grab);

              if (state.settings.display.showNotes) {
                const tt = [];
                tt.push(
                  `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
                );
                if (ev.coach) tt.push(ev.coach);
                if (ev.room) tt.push(ev.room);
                if (dir) tt.push(dir.name);
                if (ev.notes) tt.push(`📝 ${ev.notes}`);
                el.title = tt.join(" · ");
              }

              slotInner.appendChild(el);
            });
          }
        }

        cell.appendChild(slot);
        scheduleEl.appendChild(cell);
      }
    });
  }

  $("emptyHint").hidden = state.events.length !== 0;

  scheduleEl.addEventListener("click", function (e) {
    const dayActions = e.target.closest(".day-actions");
    if (dayActions) {
      e.stopPropagation();
      const dayIndex = parseInt(dayActions.dataset.dayIndex);
      if (!isNaN(dayIndex)) {
        dayMenu(dayIndex);
      }
    }
  });

  markGeometryDirty();
}

let lastGeomKey = "";

function getGeomKey() {
  const d = state.settings.display;
  const s = state.settings.schedule;
  const f = state.settings.font;

  return [
    d.cellView,
    d.dayWidthPx ?? 0,
    d.cellPadPx ?? 6,
    s.slotHeight ?? 72,

    f.family,
    f.titleFamily,
    f.metaFamily,

    f.lineHeight,
    f.titleSize1,
    f.titleSize2,
    f.metaSize1,
    f.metaSize2,
    f.weightTitle,
    f.weightMeta,
  ].join("|");
}

function markGeometryDirtyIfNeeded() {
  const key = getGeomKey();
  if (key === lastGeomKey) return;
  lastGeomKey = key;
  markGeometryDirty();
}

let lastCellView = null;
let geometrySyncRaf = 0;
let resizeDebounce = null;

window.addEventListener("resize", () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => {
    markGeometryDirty();
  }, 150);
});

function requestGeometrySync() {
  if (!geometryDirty) return;
  if (geometrySyncRaf) cancelAnimationFrame(geometrySyncRaf);

  geometrySyncRaf = requestAnimationFrame(() => {
    geometrySyncRaf = 0;
    geometryDirty = false;
    syncGridGeometry();
  });
}

let geometryDirty = false;
let geometryRafId = null;
let geometryCache = new WeakMap();

function markGeometryDirty() {
  if (geometryDirty) return;
  geometryDirty = true;

  if (geometryRafId) cancelAnimationFrame(geometryRafId);
  geometryRafId = requestAnimationFrame(() => {
    geometryDirty = false;
    geometryRafId = null;
    performGeometrySync();
  });
}

function syncGridGeometry() {
  markGeometryDirty();
}

function performGeometrySync() {
  const view = state.settings.display.cellView;
  const scheduleEl = document.getElementById("schedule");
  if (!scheduleEl) return;

  if (view === "list") return;

  if (view === "compact") {
    const allCells = Array.from(scheduleEl.querySelectorAll(".cell.droppable"));
    if (!allCells.length) return;

    const allCards = Array.from(
      scheduleEl.querySelectorAll(".event.compact-card"),
    );

    const fragment = document.createDocumentFragment();

    const measurements = {
      cards: [],
      cells: [],
    };

    allCards.forEach((card) => {
      card.style.removeProperty("height");
      card.style.removeProperty("min-height");
      measurements.cards.push({
        element: card,
        height: 0,
      });
    });

    allCells.forEach((cell) => {
      cell.style.removeProperty("height");
      cell.style.removeProperty("min-height");
      measurements.cells.push({
        element: cell,
        scrollHeight: 0,
        padding: 0,
      });
    });

    requestAnimationFrame(() => {
      if (state.settings.display.cellView !== "compact") return;

      let maxCardH = 0;
      measurements.cards.forEach((item) => {
        const h = item.element.getBoundingClientRect().height;
        item.height = h;
        if (h > maxCardH) maxCardH = h;
      });

      const cardH = Math.max(Math.ceil(maxCardH), 60) + "px";

      measurements.cards.forEach((item) => {
        item.element.style.setProperty("height", cardH, "important");
      });

      requestAnimationFrame(() => {
        let maxCellH = 0;
        measurements.cells.forEach((item) => {
          const cs = getComputedStyle(item.element);
          const padY =
            (parseFloat(cs.paddingTop) || 0) +
            (parseFloat(cs.paddingBottom) || 0);

          const inner = item.element.querySelector(".slot-inner");
          const contentH = inner
            ? inner.scrollHeight
            : item.element.scrollHeight;
          const need = contentH + padY;

          if (need > maxCellH) maxCellH = need;
        });

        const cellH = Math.ceil(maxCellH) + "px";

        measurements.cells.forEach((item) => {
          item.element.style.height = cellH;
        });
      });
    });
    return;
  }

  scheduleEl.classList.add("measuring");

  requestAnimationFrame(() => {
    if (state.settings.display.cellView !== "timeline") {
      scheduleEl.classList.remove("measuring");
      return;
    }

    const cells = Array.from(scheduleEl.querySelectorAll(".cell.droppable"));
    if (!cells.length) {
      scheduleEl.classList.remove("measuring");
      return;
    }

    const widthMeasurements = [];
    const eventMeasurements = [];

    cells.forEach((c) => {
      c.style.removeProperty("height");
      c.style.removeProperty("min-height");

      const rect = c.getBoundingClientRect();
      widthMeasurements.push({
        element: c,
        width: rect.width,
      });
    });

    const events = Array.from(
      scheduleEl.querySelectorAll(".cell.droppable .event"),
    ).slice(0, 24);

    events.forEach((ev) => {
      const w = Math.max(ev.getBoundingClientRect().width, ev.scrollWidth);
      eventMeasurements.push(w);
    });

    const maxCellW = Math.max(...widthMeasurements.map((m) => m.width));
    const maxEventW = Math.max(...eventMeasurements);

    const rawW = Math.max(maxCellW, maxEventW);
    if (rawW > 0 && !(Number(state.settings.display?.dayWidthPx) > 0)) {
      const maxW = Math.min(320, Math.max(220, window.innerWidth - 120));
      const nextW = clamp(Math.ceil(rawW), 120, maxW);

      const cur =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--dayW"),
        ) || 0;

      if (!cur || Math.abs(cur - nextW) >= 4) {
        document.documentElement.style.setProperty("--dayW", nextW + "px");
      }
    }

    scheduleEl.classList.remove("measuring");
    scheduleEl.classList.add("measuring-h");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (state.settings.display.cellView !== "timeline") {
          scheduleEl.classList.remove("measuring-h");
          return;
        }

        const cells2 = Array.from(
          scheduleEl.querySelectorAll(".cell.droppable"),
        );
        if (!cells2.length) {
          scheduleEl.classList.remove("measuring-h");
          return;
        }

        try {
          const rowHeights = new Map();

          cells2.forEach((c) => {
            c.style.removeProperty("height");
            c.style.removeProperty("min-height");
          });

          const rootCS = getComputedStyle(document.documentElement);
          const minRowH =
            parseFloat(rootCS.getPropertyValue("--slotH")) ||
            Number(state.settings.schedule?.slotHeight) ||
            72;

          cells2.forEach((c) => {
            const key = c.dataset.slotIndex;
            if (key == null) return;

            const cs = getComputedStyle(c);
            const padY =
              (parseFloat(cs.paddingTop) || 0) +
              (parseFloat(cs.paddingBottom) || 0);

            const slotEl = c.querySelector(".slot.tl-fill");
            const inner = c.querySelector(".slot-inner");

            let contentH = 0;

            if (slotEl?.classList.contains("two") && inner) {
              const evs = Array.from(inner.querySelectorAll(".event"));
              if (evs.length) {
                let maxEvH = 0;
                evs.forEach((el) => {
                  const h = el.getBoundingClientRect().height;
                  if (h > maxEvH) maxEvH = h;
                });

                const innerCS = getComputedStyle(inner);
                const gap = parseFloat(innerCS.rowGap || innerCS.gap) || 0;
                contentH = maxEvH * 2 + gap;
              } else {
                contentH = inner.scrollHeight;
              }
            } else {
              contentH = inner ? inner.scrollHeight : c.scrollHeight;
            }

            const need = Math.max(contentH + padY, minRowH);
            const prev = rowHeights.get(key) ?? 0;
            if (need > prev) rowHeights.set(key, need);
          });

          cells2.forEach((c) => {
            const key = c.dataset.slotIndex;
            if (key == null) return;

            const h = rowHeights.get(key);
            if (h) c.style.height = `${Math.ceil(h)}px`;
          });
        } finally {
          scheduleEl.classList.remove("measuring-h");
        }
      });
    });
  });
}

window.addEventListener("resize", () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => {
    if (state.settings.display.cellView === "timeline") {
      markGeometryDirty();
    }
  }, 150);
});

let searchDebounceTimer = null;
let lastSearchValue = "";
const SEARCH_DEBOUNCE_MS = 300;

let filterCache = new WeakMap();
let lastFilterHash = "";

function getFilterHash() {
  const { day, time, dir, q } = filters;
  const dirStr = Array.from(dir).sort().join(",");
  return `${day}|${time}|${dirStr}|${q}`;
}

function memoizedEventVisible(ev) {
  const hash = getFilterHash();

  if (!filterCache.has(ev)) {
    filterCache.set(ev, {
      cache: {},
      timestamps: {},
      keys: [],
    });
  }

  const cacheData = filterCache.get(ev);

  if (cacheData.cache[hash] !== undefined) {
    cacheData.timestamps[hash] = Date.now();
    return cacheData.cache[hash];
  }

  const isVisible =
    matchesDay(ev) && matchesTime(ev) && matchesDir(ev) && matchesQuery(ev);

  cacheData.cache[hash] = isVisible;
  cacheData.timestamps[hash] = Date.now();
  cacheData.keys.push(hash);

  if (cacheData.keys.length > 5) {
    let oldestKey = cacheData.keys[0];
    let oldestTime = cacheData.timestamps[oldestKey];

    for (let i = 1; i < cacheData.keys.length; i++) {
      const key = cacheData.keys[i];
      if (cacheData.timestamps[key] < oldestTime) {
        oldestKey = key;
        oldestTime = cacheData.timestamps[key];
      }
    }

    delete cacheData.cache[oldestKey];
    delete cacheData.timestamps[oldestKey];
    cacheData.keys = cacheData.keys.filter((k) => k !== oldestKey);
  }

  return isVisible;
}

function clearFilterCache() {
  filterCache = new WeakMap();
  lastFilterHash = "";
}

function onFiltersChanged() {
  renderFilterBar();

  applyEventVisibilityOnly();
}

function initSearch() {
  const searchInput = $("q");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    clearTimeout(searchDebounceTimer);

    searchDebounceTimer = setTimeout(() => {
      if (value === lastSearchValue) return;

      lastSearchValue = value;
      filters.q = value;
      onFiltersChanged();

      if (value) {
        console.log(
          `Поиск: "${value}", найдено: ${state.events.filter(matchesQuery).length}`,
        );
      }
    }, SEARCH_DEBOUNCE_MS);
  });

  const clearBtn = searchInput.nextElementSibling;
  if (clearBtn && clearBtn.classList.contains("clear-search")) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      filters.q = "";
      onFiltersChanged();
      searchInput.focus();
    });
  }
}

function applyEventVisibilityOnly() {
  const events = document.querySelectorAll("#schedule .event[data-eid]");
  const total = events.length;
  let visibleCount = 0;

  if (total === 0) {
    renderStats();
    return;
  }

  requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment();
    const changes = [];

    events.forEach((el) => {
      const ev = state.events.find((e) => e.id === el.dataset.eid);
      if (!ev) return;

      const isVisible = memoizedEventVisible(ev);
      if (isVisible) visibleCount++;

      const currentlyDim = el.classList.contains("dim");
      const shouldBeDim = !isVisible;

      if (currentlyDim !== shouldBeDim) {
        changes.push({ el, shouldBeDim });
      }
    });

    if (changes.length > 0) {
      changes.forEach(({ el, shouldBeDim }) => {
        el.classList.toggle("dim", shouldBeDim);
      });
    }

    renderStats(visibleCount);
  });
}

function renderStats(visibleCount = null) {
  const total = state.events.length;
  const shown =
    visibleCount !== null
      ? visibleCount
      : state.events.filter(memoizedEventVisible).length;

  $("stats").textContent = total
    ? `Показано: ${shown}/${total}`
    : "Нет занятий";

  updateFilterChips();
}

function updateFilterChips() {
  const counts = countByDirection();

  document.querySelectorAll("#dirGroup .chip .count").forEach((el) => {
    const chip = el.closest(".chip");
    const dirId = chip.dataset.dirId;
    if (dirId && counts[dirId] !== undefined) {
      el.textContent = `(${counts[dirId]})`;
    }
  });
}

function renderAll() {
  applyTheme();
  renderFilterBar();
  renderSchedule();
  renderStats();
  markGeometryDirtyIfNeeded();
}

function dayMenu(dayIndex) {
  const action = prompt(
    `День ${DAYS[dayIndex]}:\n1 — Очистить день\n2 — Скопировать с предыдущего\n3 — Скопировать на следующий`,
    "1",
  );
  if (!action) return;

  if (action === "1") {
    if (!confirm("Удалить все занятия этого дня?")) return;
    pushHistory("Очистка дня");
    state.events = state.events.filter((e) => e.dayIndex !== dayIndex);
    saveState();
    renderAll();
    toast("OK", "День очищен", `Удалены занятия за ${DAYS[dayIndex]}.`);
    return;
  }

  if (action === "2") {
    if (dayIndex === 0) {
      toast("WARN", "Нельзя", "У понедельника нет предыдущего.");
      return;
    }
    pushHistory("Копирование дня");
    const prev = state.events.filter((e) => e.dayIndex === dayIndex - 1);
    const copies = prev.map((e) => ({ ...deepCopy(e), id: uid(), dayIndex }));
    state.events = state.events.concat(copies);
    saveState();
    renderAll();
    toast("OK", "Скопировано", `Скопировано: ${copies.length}.`);
    return;
  }

  if (action === "3") {
    if (dayIndex === 6) {
      toast("WARN", "Нельзя", "У воскресенья нет следующего.");
      return;
    }
    pushHistory("Копирование дня");
    const cur = state.events.filter((e) => e.dayIndex === dayIndex);
    const copies = cur.map((e) => ({
      ...deepCopy(e),
      id: uid(),
      dayIndex: dayIndex + 1,
    }));
    state.events = state.events.concat(copies);
    saveState();
    renderAll();
    toast("OK", "Скопировано", `Скопировано: ${copies.length}.`);
    return;
  }
}

function smartOpenCreate(dayIndex, slotStart, slotEnd = null) {
  const { step, defDur } = getBounds();
  if (!slotEnd) slotEnd = slotStart + step;

  const eventsInCell = state.events
    .filter(
      (ev) =>
        ev.dayIndex === dayIndex &&
        ev.startMin >= slotStart &&
        ev.startMin < slotEnd,
    )
    .sort((a, b) => a.startMin - b.startMin);

  if (eventsInCell.length >= 2) {
    toast("WARN", "Нельзя добавить", "В этом слоте максимум 2 занятия");
    return;
  }

  let defaultStart = slotStart;
  let defaultDuration = defDur;

  if (eventsInCell.length === 0) {
    defaultStart = slotStart;
    defaultDuration = defDur;
  } else if (eventsInCell.length === 1) {
    const existing = eventsInCell[0];

    defaultStart = existing.startMin;
    defaultDuration = defDur;
  }

  openCreate(dayIndex, defaultStart, defaultDuration);
}
const fontPreset = $("fontPreset");
const fontQuickTightness = $("fontQuickTightness");
const fontLetterSpacing = $("fontLetterSpacing");
const fontTextTransform = $("fontTextTransform");
const fontTitleClamp = $("fontTitleClamp");
const fontCardPaddingY = $("fontCardPaddingY");
const fontCardRadius = $("fontCardRadius");

const eventBackdrop = $("eventBackdrop");
const evId = $("evId");
const evDay = $("evDay");
const evName = $("evName");
const evDir = $("evDir");
const evStart = $("evStart");
const evDur = $("evDur");
const evCoach = $("evCoach");
const evRoom = $("evRoom");
const evNotes = $("evNotes");
const dirPreviewWrap = $("dirPreviewWrap");
const conflictsEl = $("conflicts");

const newDirName = $("newDirName");
const newDirColor = $("newDirColor");
const swatches = $("swatches");
const newDirPreview = $("newDirPreview");

const btnDelete = $("btnDelete");
const btnDuplicate = $("btnDuplicate");

const logoVariant = $("logoVariant");

function uid() {
  return "e_" + Math.random().toString(36).slice(2, 10);
}

function renderDirSelect(selectedId) {
  evDir.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "— Выберите направление —";
  evDir.appendChild(emptyOption);

  state.directions.forEach((d) => {
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.name;
    evDir.appendChild(o);
  });

  const separator = document.createElement("option");
  separator.disabled = true;
  separator.textContent = "────────────────────";
  evDir.appendChild(separator);

  const manageOption = document.createElement("option");
  manageOption.value = "__manage__";
  manageOption.textContent = "⚙️ Управление направлениями...";
  evDir.appendChild(manageOption);

  if (selectedId) {
    evDir.value = selectedId;
  }
  renderDirPreview();
}

function renderCoachSelect(selectedCoach) {
  evCoach.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "— Выберите тренера —";
  evCoach.appendChild(emptyOption);

  state.coaches.forEach((coach) => {
    const o = document.createElement("option");
    o.value = coach;
    o.textContent = coach;
    evCoach.appendChild(o);
  });

  const separator = document.createElement("option");
  separator.disabled = true;
  separator.textContent = "─────────────────";
  evCoach.appendChild(separator);

  const newOption = document.createElement("option");
  newOption.value = "__new__";
  newOption.textContent = "➕ Добавить нового тренера";
  evCoach.appendChild(newOption);

  const manageOption = document.createElement("option");
  manageOption.value = "__manage__";
  manageOption.textContent = "⚙️ Управление тренерами...";
  evCoach.appendChild(manageOption);

  if (selectedCoach) {
    evCoach.value = selectedCoach;
  }
}

function renderDirPreview() {
  dirPreviewWrap.innerHTML = "";
  const dir = getDir(evDir.value);
  if (!dir) return;
  const p = document.createElement("div");
  p.className = "preview";
  p.style.background = dir.color;
  p.textContent = dir.name;
  dirPreviewWrap.appendChild(p);
}

function renderDirSwatches() {
  swatches.innerHTML = "";
  COLOR_SWATCHES.slice(10).forEach((c) => {
    const s = document.createElement("div");
    s.className =
      "swatch" +
      (newDirColor.value.toLowerCase() === c.toLowerCase() ? " active" : "");
    s.style.background = c;
    s.addEventListener("click", () => {
      newDirColor.value = c;
      renderDirSwatches();
      updateNewDirPreview();
    });
    swatches.appendChild(s);
  });
}

function updateNewDirPreview() {
  const name = newDirName.value.trim();
  if (!name) {
    newDirPreview.style.display = "none";
    return;
  }
  newDirPreview.style.display = "inline-flex";
  newDirPreview.style.background = newDirColor.value;
  newDirPreview.textContent = name;
}

function openCreate(dayIndex, slotStart, duration = null) {
  const { defDur } = getBounds();
  setEventModal(
    {
      id: "",
      dayIndex,
      startMin: slotStart,
      durationMin: duration || defDur,
      name: "",
      coach: "",
      room: "",
      directionId: state.directions[0]?.id || "",
      notes: "",
      createdAt: Date.now(),
    },
    "➕ Новое занятие",
  );
}

function openEdit(id) {
  const ev = state.events.find((e) => e.id === id);
  if (!ev) return;
  setEventModal(ev, "Редактирование");
}

function setEventModal(ev, title) {
  eventTitle.textContent = title;
  evId.value = ev.id;
  evDay.value = String(ev.dayIndex);
  evName.value = ev.name;

  updateCharCounter();
  renderCoachSelect(ev.coach);
  evRoom.value = ev.room;
  evNotes.value = ev.notes;
  evStart.value = minToHHMM(ev.startMin);
  evDur.value = String(ev.durationMin);
  renderDirSelect(ev.directionId);

  newDirName.value = "";
  newDirColor.value = "#ef4444";
  updateNewDirPreview();
  renderDirSwatches();

  conflictsEl.style.display = "none";
  conflictsEl.textContent = "";

  const isEdit = !!ev.id;
  btnDelete.style.display = isEdit ? "inline-flex" : "none";
  btnDuplicate.style.display = isEdit ? "inline-flex" : "none";

  eventBackdrop.classList.add("show");
  setTimeout(() => evName.focus(), 20);
  updateConflictsLive();
}

function closeEventModal() {
  eventBackdrop.classList.remove("show");
}

function updateConflictsLive() {
  const { start, end } = getBounds();
  const dayIndex = Number(evDay.value);
  const startMin = parseHHMM(evStart.value);
  const dur = Number(evDur.value);

  const issues = [];

  if (startMin == null) issues.push("Некорректное время начала.");
  if (!dur || dur < 1) issues.push("Длительность должна быть >= 1 минуты.");
  if (startMin != null && (startMin < start || startMin >= end))
    issues.push("Время начала вне диапазона дня (Настройки → Расписание).");

  if (startMin != null && dur > 0) {
    const validation = validateTimeSlot(
      dayIndex,
      startMin,
      dur,
      evId.value || null,
    );
    if (!validation.valid) issues.push(validation.reason);
  }

  if (issues.length) {
    conflictsEl.style.display = "block";
    conflictsEl.textContent = issues.join(" ");
  } else {
    conflictsEl.style.display = "none";
    conflictsEl.textContent = "";
  }
}

function saveEventFromModal() {
  const { start, end } = getBounds();
  const id = evId.value || uid();
  const dayIndex = Number(evDay.value);

  const name = sanitizeEventName(evName.value);
  if (evName.value !== name) {
    evName.value = name;
    updateCharCounter();
  }

  if (!name) {
    toast("WARN", "⚠️ Ошибка", "Укажите название занятия.");
    evName.focus();
    return;
  }

  const startMin = parseHHMM(evStart.value);
  if (startMin === null) {
    toast("WARN", "⚠️ Ошибка", "Укажите время начала.");
    return;
  }

  const dur = Number(evDur.value);
  if (!dur || dur < 1) {
    toast("WARN", "⚠️ Ошибка", "Длительность минимум 1 мин.");
    return;
  }

  const validation = validateTimeSlot(
    dayIndex,
    startMin,
    dur,
    evId.value || null,
  );
  if (!validation.valid) {
    toast(
      "WARN",
      "⚠️ Ошибка",
      validation.reason || "Некорректное время занятия.",
    );
    return;
  }

  let directionId = evDir.value;
  const ndName = newDirName.value.trim();
  if (ndName) {
    const existingDir = state.directions.find(
      (d) => d.name.toLowerCase() === ndName.toLowerCase(),
    );
    if (existingDir) {
      directionId = existingDir.id;
      toast(
        "INFO",
        "ℹ️ Направление существует",
        "Выбрано существующее направление.",
      );
    } else {
      const ndId = generateDirectionId(ndName);
      state.directions.push({
        id: ndId,
        name: ndName,
        color: newDirColor.value || "#ef4444",
      });
      directionId = ndId;
    }
  }

  const coachVal = evCoach.value;
  const coach = coachVal === "new" || coachVal === "__new__" ? "" : coachVal;

  const next = {
    id,
    dayIndex,
    startMin,
    durationMin: dur,
    name,
    coach,
    room: evRoom.value.trim(),
    directionId,
    notes: evNotes.value.trim(),
    createdAt: evId.value
      ? state.events.find((e) => e.id === id)?.createdAt || Date.now()
      : Date.now(),
  };

  const idx = state.events.findIndex((e) => e.id === id);
  pushHistory(idx < 0 ? "➕ Новое занятие" : "✏️ Редактирование");
  if (idx >= 0) state.events[idx] = next;
  else state.events.push(next);

  saveState();
  renderAll();
  closeEventModal();
}

function deleteEventFromModal() {
  const id = evId.value;
  if (!id) return;
  if (!confirm("Удалить занятие?")) return;
  pushHistory("Удаление занятия");
  state.events = state.events.filter((e) => e.id !== id);
  saveState();
  renderAll();
  closeEventModal();
}

function duplicateEventFromModal() {
  const id = evId.value;
  const src = state.events.find((e) => e.id === id);
  if (!src) return;

  const { step } = getBounds();
  const slotStart = slotStartFor(src.startMin);
  const slotEnd = slotStart + step;

  const copy = deepCopy(src);
  copy.id = uid();
  copy.createdAt = Date.now();

  const validation = validateTimeSlot(
    copy.dayIndex,
    copy.startMin,
    copy.durationMin,
    null,
  );
  if (!validation.valid) {
    toast("WARN", "Нельзя дублировать", validation.reason);
    return;
  }

  pushHistory("Дублирование занятия");
  state.events.push(copy);
  saveState();
  renderAll();
  closeEventModal();
  toast("OK", "Дублировано", "Копия добавлена.");
}

function smartMoveEvent(id, toDay, toSlotStart, reason) {
  const { start, end, step } = getBounds();
  const idx = state.events.findIndex((e) => e.id === id);

  if (idx < 0) {
    toast("ERR", "Ошибка", "Событие не найдено", 2000);
    return;
  }

  const ev = state.events[idx];

  if (toSlotStart < start || toSlotStart >= end) {
    toast(
      "WARN",
      "Нельзя переместить",
      "Целевое время вне диапазона расписания",
      2000,
    );
    return;
  }

  const validation = validateTimeSlot(toDay, toSlotStart, ev.durationMin, id);

  if (!validation.valid) {
    toast("WARN", "Нельзя переместить", validation.reason, 3000);
    return;
  }

  const slotStart = toSlotStart;
  const slotEnd = slotStart + step;

  const eventsInTargetSlot = state.events
    .filter(
      (e) =>
        e.id !== id &&
        e.dayIndex === toDay &&
        e.startMin >= slotStart &&
        e.startMin < slotEnd,
    )
    .sort((a, b) => a.startMin - b.startMin);

  let targetStartTime = slotStart;

  if (eventsInTargetSlot.length > 0) {
    if (state.settings.display.cellView === "timeline") {
      const maxInSlot = state.settings.schedule?.maxPerCell || 2;

      if (eventsInTargetSlot.length >= maxInSlot) {
        toast(
          "WARN",
          "Нельзя переместить",
          `В этом слоте уже ${maxInSlot} занятия`,
          2000,
        );
        return;
      }

      targetStartTime = ev.startMin;

      if (targetStartTime + ev.durationMin > slotEnd) {
        targetStartTime = slotStart;
      }
    } else {
      targetStartTime = slotStart;
    }
  }

  pushHistory(reason || "Перемещение занятия");

  state.events[idx].dayIndex = toDay;
  state.events[idx].startMin = targetStartTime;

  clearFilterCache();

  saveState(true);
  renderAll();

  const dayName = DAYS[toDay] || `День ${toDay + 1}`;
  toast(
    "OK",
    "Перемещено",
    `${ev.name} → ${dayName} ${minToHHMM(targetStartTime)}`,
    2000,
  );
}

function findBestSlotForEvent(ev, preferredDay = null, preferredTime = null) {
  const { start, end, step } = getBounds();
  const days = preferredDay !== null ? [preferredDay] : [0, 1, 2, 3, 4, 5, 6];

  for (const day of days) {
    let timeStart = preferredTime !== null ? preferredTime : start;

    for (let t = timeStart; t + ev.durationMin <= end; t += step) {
      const validation = validateTimeSlot(day, t, ev.durationMin, ev.id);

      if (validation.valid) {
        return { day, time: t };
      }
    }

    if (preferredTime !== null) {
      for (let t = start; t + ev.durationMin <= end; t += step) {
        const validation = validateTimeSlot(day, t, ev.durationMin, ev.id);

        if (validation.valid) {
          return { day, time: t };
        }
      }
    }
  }

  return null;
}

function fixEventOverlaps() {
  let fixedCount = 0;
  const { start, end, step } = getBounds();

  const sortedEvents = [...state.events].sort((a, b) => {
    if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
    return a.startMin - b.startMin;
  });

  for (let day = 0; day < 7; day++) {
    const dayEvents = sortedEvents.filter((ev) => ev.dayIndex === day);

    for (let i = 0; i < dayEvents.length; i++) {
      const ev1 = dayEvents[i];

      for (let j = i + 1; j < dayEvents.length; j++) {
        const ev2 = dayEvents[j];

        if (
          ev1.startMin < ev2.startMin + ev2.durationMin &&
          ev1.startMin + ev1.durationMin > ev2.startMin
        ) {
          const newSlot = findBestSlotForEvent(ev2, day, ev2.startMin + step);

          if (newSlot) {
            const idx = state.events.findIndex((e) => e.id === ev2.id);
            if (idx >= 0) {
              state.events[idx].dayIndex = newSlot.day;
              state.events[idx].startMin = newSlot.time;
              fixedCount++;
            }
          }
        }
      }
    }
  }

  if (fixedCount > 0) {
    pushHistory(`Авто-исправление ${fixedCount} пересечений`);
    saveState();
    renderAll();
    toast(
      "OK",
      "Исправлено",
      `Автоматически исправлено ${fixedCount} пересечений`,
      3000,
    );
  }

  return fixedCount;
}

function updateEventPosition(id, dayIndex, startMin, reason) {
  const idx = state.events.findIndex((e) => e.id === id);
  if (idx < 0) return;

  pushHistory(reason);
  state.events[idx].dayIndex = dayIndex;
  state.events[idx].startMin = startMin;

  saveState(true);
  renderAll();
  toast(
    "OK",
    "",
    `${state.events[idx].name} → ${DAYS[dayIndex]} ${minToHHMM(startMin)}`,
  );
}

const settingsBackdrop = $("settingsBackdrop");
const settingsWarn = $("settingsWarn");

const tabSchedule = $("tabSchedule");
const tabDisplay = $("tabDisplay");
const tabFont = $("tabFont");
const tabTheme = $("tabTheme");
const panelSchedule = $("panelSchedule");
const panelDisplay = $("panelDisplay");
const panelFont = $("panelFont");
const panelTheme = $("panelTheme");
const tabLogo = $("tabLogo");
const panelLogo = $("panelLogo");

function setActiveTab(which) {
  [tabSchedule, tabDisplay, tabFont, tabTheme, tabLogo].forEach((x) =>
    x.classList.remove("active"),
  );
  [panelSchedule, panelDisplay, panelFont, panelTheme, panelLogo].forEach((x) =>
    x.classList.remove("active"),
  );

  if (which === "schedule") {
    tabSchedule.classList.add("active");
    panelSchedule.classList.add("active");
  }
  if (which === "display") {
    tabDisplay.classList.add("active");
    panelDisplay.classList.add("active");
  }
  if (which === "font") {
    tabFont.classList.add("active");
    panelFont.classList.add("active");
  }
  if (which === "theme") {
    tabTheme.classList.add("active");
    panelTheme.classList.add("active");
  }
  if (which === "logo") {
    tabLogo.classList.add("active");
    panelLogo.classList.add("active");
  }
}
tabSchedule.addEventListener("click", () => setActiveTab("schedule"));
tabDisplay.addEventListener("click", () => setActiveTab("display"));
tabFont.addEventListener("click", () => setActiveTab("font"));
tabTheme.addEventListener("click", () => setActiveTab("theme"));
tabLogo.addEventListener("click", () => setActiveTab("logo"));

const setStart = $("setStart");
const setEnd = $("setEnd");
const setDefaultDur = $("setDefaultDur");

const dispCellView = $("dispCellView");
const dispCardMode = $("dispCardMode");
const dispShowNotes = $("dispShowNotes");
const dispShowEmptyHint = $("dispShowEmptyHint");
const dispShowToday = $("dispShowToday");
const dispDayWidth = $("dispDayWidth");
const dispCellPad = $("dispCellPad");

const fontFamily = $("fontFamily");

const logoLayout = $("logoLayout");
const logoEnabled = $("logoEnabled");
const logoOpacity = $("logoOpacity");
const logoOpacityVal = $("logoOpacityVal");
const logoRecolor = $("logoRecolor");
const logoColorWrap = $("logoColorWrap");
const logoColor = $("logoColor");
const logoTileSize = $("logoTileSize");
const logoTileGap = $("logoTileGap");
const logoTileOffsetX = $("logoTileOffsetX");
const logoTileOffsetY = $("logoTileOffsetY");
const logoHorizontalGap = $("logoHorizontalGap");
const logoVerticalGap = $("logoVerticalGap");
const logoRotation = $("logoRotation");
const logoRotationVal = $("logoRotationVal");
const logoHorizontalGapVal = $("logoHorizontalGapVal");
const logoVerticalGapVal = $("logoVerticalGapVal");
const logoTileSizeNum = $("logoTileSizeNum");
const logoUpload = $("logoUpload");

const logoHorizontalGapNum = $("logoHorizontalGapNum");
const logoVerticalGapNum = $("logoVerticalGapNum");
const logoRotationNum = $("logoRotationNum");
const logoTileOffsetXNum = $("logoTileOffsetXNum");
const logoTileOffsetYNum = $("logoTileOffsetYNum");
const logoOpacityNum = $("logoOpacityNum");

const DEFAULT_FONT_SAMPLE_TEXT = DEFAULT_STATE().settings.font.sampleText;

// Добавьте прямые обработчики для числовых полей логотипа
function setupLogoNumberInputs() {
  console.log("Setting up logo number inputs...");
  
  // Слайдер размера плитки
  if (logoTileSize) {
    logoTileSize.addEventListener("input", () => {
      console.log("logoTileSize slider changed:", logoTileSize.value);
      const value = clamp(Math.round(Number(logoTileSize.value || 140)), 20, 400);
      state.settings.logo.tileSize = value;
      
      // Обновляем числовое поле
      if (logoTileSizeNum) {
        logoTileSizeNum.value = value;
      }
      
      updateLogoAndSave();
    });
  }

  // Размер плитки
  if (logoTileSizeNum) {
    logoTileSizeNum.addEventListener("input", function() {
      console.log("logoTileSizeNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 140)), 20, 400);
      state.settings.logo.tileSize = value;
      
      // Обновляем слайдер
      if (logoTileSize) {
        logoTileSize.value = value;
      }
      
      // Обновляем логотип
      updateLogoAndSave();
    });
  }
  
  // Горизонтальный зазор
  if (logoHorizontalGapNum) {
    logoHorizontalGapNum.addEventListener("input", function() {
      console.log("logoHorizontalGapNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 180)), 0, 800);
      state.settings.logo.horizontalGap = value;
      
      // Обновляем слайдер
      if (logoHorizontalGap) {
        logoHorizontalGap.value = value;
      }
      
      if (logoHorizontalGapVal) {
        logoHorizontalGapVal.textContent = `${value}px`;
      }
      
      updateLogoAndSave();
    });
  }
  
  // Вертикальный зазор
  if (logoVerticalGapNum) {
    logoVerticalGapNum.addEventListener("input", function() {
      console.log("logoVerticalGapNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 180)), 0, 800);
      state.settings.logo.verticalGap = value;
      
      // Обновляем слайдер
      if (logoVerticalGap) {
        logoVerticalGap.value = value;
      }
      
      if (logoVerticalGapVal) {
        logoVerticalGapVal.textContent = `${value}px`;
      }
      
      updateLogoAndSave();
    });
  }
  
  // Поворот
  if (logoRotationNum) {
    logoRotationNum.addEventListener("input", function() {
      console.log("logoRotationNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 0)), -180, 180);
      state.settings.logo.rotation = value;
      
      // Обновляем слайдер
      if (logoRotation) {
        logoRotation.value = value;
      }
      
      if (logoRotationVal) {
        logoRotationVal.textContent = `${value}°`;
      }
      
      updateLogoAndSave();
    });
  }
  
  // Смещение X
  if (logoTileOffsetXNum) {
    logoTileOffsetXNum.addEventListener("input", function() {
      console.log("logoTileOffsetXNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 0)), -2000, 2000);
      state.settings.logo.tileOffsetX = value;
      
      // Обновляем слайдер
      if (logoTileOffsetX) {
        logoTileOffsetX.value = value;
      }
      
      updateLogoAndSave();
    });
  }
  
  // Смещение Y
  if (logoTileOffsetYNum) {
    logoTileOffsetYNum.addEventListener("input", function() {
      console.log("logoTileOffsetYNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 0)), -2000, 2000);
      state.settings.logo.tileOffsetY = value;
      
      // Обновляем слайдер
      if (logoTileOffsetY) {
        logoTileOffsetY.value = value;
      }
      
      updateLogoAndSave();
    });
  }
  
  // Прозрачность
  if (logoOpacityNum) {
    logoOpacityNum.addEventListener("input", function() {
      console.log("logoOpacityNum changed:", this.value);
      const value = clamp(Math.round(Number(this.value || 12)), 0, 100);
      state.settings.logo.opacity = value;
      
      // Обновляем слайдер
      if (logoOpacity) {
        logoOpacity.value = value;
      }
      
      if (logoOpacityVal) {
        logoOpacityVal.textContent = `${value}%`;
      }
      
      updateLogoAndSave();
    });
  }
  
  console.log("Logo number inputs setup complete");
}



function getFontSampleText() {
  const raw = (state?.settings?.font?.sampleText ?? "").trim();
  return raw || DEFAULT_FONT_SAMPLE_TEXT;
}

function getFontOptionById(id) {
  return FONT_OPTIONS.find((x) => x.id === id) || FONT_OPTIONS[0];
}

function fillFontSelectOptions() {
  fontFamily.innerHTML = "";
  const frag = document.createDocumentFragment();
  FONT_OPTIONS.forEach((f) => {
    const o = document.createElement("option");
    o.value = f.id;
    o.textContent = `${f.name} ${getFontSampleText()}`;
    frag.appendChild(o);
  });
  fontFamily.appendChild(frag);
}

const fontTitleFamily = document.getElementById("fontTitleFamily");
const fontMetaFamily = document.getElementById("fontMetaFamily");

function initFontPicker(cfg) {
  const wrap = document.getElementById(cfg.wrapId);
  const btn = document.getElementById(cfg.btnId);
  const pop = document.getElementById(cfg.popId);
  const list = document.getElementById(cfg.listId);
  const search = document.getElementById(cfg.searchId);
  const title = document.getElementById(cfg.titleId);
  const sample = document.getElementById(cfg.sampleId);

  const PAGE = 20;
  let limit = PAGE;
  let lastQuery = "";
  let lastMoreTriggerAt = 0;
  let observer = null;

  function close() {
    pop.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
  }
  function open() {
    pop.classList.add("show");
    btn.setAttribute("aria-expanded", "true");
    search.value = "";
    renderList("");
    setTimeout(() => search.focus(), 0);
  }

  function ensureObserver() {
    if (observer) return;
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;

        const now = Date.now();
        if (now - lastMoreTriggerAt < 250) return;
        lastMoreTriggerAt = now;

        limit += PAGE;
        const prev = list.scrollTop;
        renderList(lastQuery, true);
        requestAnimationFrame(() => {
          list.scrollTop = prev;
        });
      },
      { root: list, rootMargin: "200px", threshold: 0.01 },
    );
  }

  function setSelected(id, silent = false) {
    cfg.setValue(id);

    const opt = getFontOptionById(id);
    title.textContent = opt.name;

    sample.textContent = getFontSampleText();
    sample.style.fontFamily = sanitizeFontFamilyStack(opt.css);

    if (!silent) {
      applyFont();
      renderAll();
      saveState(true);
    }

    renderList(search.value, true);
  }

  function renderList(filterText, keepScroll = false) {
    const q = String(filterText || "")
      .trim()
      .toLowerCase();

    if (q !== lastQuery) {
      lastQuery = q;
      limit = PAGE;
    }

    const prevScroll = keepScroll ? list.scrollTop : 0;

    list.innerHTML = "";
    const filtered = FONT_OPTIONS.filter(
      (f) => !q || f.name.toLowerCase().includes(q),
    );
    const visible = filtered.slice(0, limit);

    const curId = cfg.getValue();

    for (const f of visible) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `font-item${curId === f.id ? " active" : ""}`;
      b.dataset.value = f.id;

      b.innerHTML = `
        <div class="name">${f.name}</div>
        <div class="sample">${getFontSampleText()}</div>
      `;

      const sampleEl = b.querySelector(".sample");
      if (sampleEl) sampleEl.style.fontFamily = sanitizeFontFamilyStack(f.css);

      b.addEventListener("click", () => {
        setSelected(f.id);
        close();
      });
      list.appendChild(b);
    }

    if (filtered.length > visible.length) {
      const more = document.createElement("div");
      more.className = "font-more-hover";
      more.textContent = `Ещё ${Math.min(PAGE, filtered.length - visible.length)}…`;
      list.appendChild(more);

      ensureObserver();
      observer.disconnect();
      observer.observe(more);
    } else if (observer) {
      observer.disconnect();
    }

    if (keepScroll)
      requestAnimationFrame(() => {
        list.scrollTop = prevScroll;
      });
  }

  btn.addEventListener("click", () => {
    if (pop.classList.contains("show")) close();
    else open();
  });

  search.addEventListener("input", () => renderList(search.value));

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) close();
  });

  return { setSelected };
}

fillFontSelectOptions(fontFamily);
fillFontSelectOptions(fontTitleFamily);
fillFontSelectOptions(fontMetaFamily);

const pickerMain = initFontPicker({
  wrapId: "fontPicker",
  btnId: "fontPickerBtn",
  popId: "fontPickerPop",
  listId: "fontPickerList",
  searchId: "fontPickerSearch",
  titleId: "fontPickerTitle",
  sampleId: "fontPickerSample",
  getValue: () => fontFamily.value,
  setValue: (id) => {
    fontFamily.value = id;
    state.settings.font.family = id;
  },
});

const pickerTitle = initFontPicker({
  wrapId: "fontTitlePicker",
  btnId: "fontTitlePickerBtn",
  popId: "fontTitlePickerPop",
  listId: "fontTitlePickerList",
  searchId: "fontTitlePickerSearch",
  titleId: "fontTitlePickerTitle",
  sampleId: "fontTitlePickerSample",
  getValue: () => fontTitleFamily.value,
  setValue: (id) => {
    fontTitleFamily.value = id;
    state.settings.font.titleFamily = id;
  },
});

const pickerMeta = initFontPicker({
  wrapId: "fontMetaPicker",
  btnId: "fontMetaPickerBtn",
  popId: "fontMetaPickerPop",
  listId: "fontMetaPickerList",
  searchId: "fontMetaPickerSearch",
  titleId: "fontMetaPickerTitle",
  sampleId: "fontMetaPickerSample",
  getValue: () => fontMetaFamily.value,
  setValue: (id) => {
    fontMetaFamily.value = id;
    state.settings.font.metaFamily = id;
  },
});

pickerMain.setSelected(state?.settings?.font?.family || "system", true);
pickerTitle.setSelected(
  state?.settings?.font?.titleFamily ||
    state?.settings?.font?.family ||
    "system",
  true,
);
pickerMeta.setSelected(
  state?.settings?.font?.metaFamily ||
    state?.settings?.font?.family ||
    "system",
  true,
);

const TIGHTNESS = {
  tight: { lineHeight: 1.05, letterSpacing: -0.01 },
  normal: { lineHeight: 1.12, letterSpacing: 0.0 },
  loose: { lineHeight: 1.2, letterSpacing: 0.02 },
};

function syncFontInputsFromState() {
  const f = state.settings.font;
  if (fontLineHeight) fontLineHeight.value = String(f.lineHeight ?? 1.12);
  if (fontLetterSpacing) fontLetterSpacing.value = String(f.letterSpacing ?? 0);
  if (fontTextTransform)
    fontTextTransform.value = String(f.textTransform ?? "none");
  if (fontTitleClamp) fontTitleClamp.value = String(f.titleClamp ?? 3);
  if (fontCardPaddingY) fontCardPaddingY.value = String(f.cardPadY ?? 7);
  if (fontCardRadius) fontCardRadius.value = String(f.cardRadius ?? 12);
  if (fontWeightTitle) fontWeightTitle.value = String(f.weightTitle ?? 900);
  if (fontWeightMeta) fontWeightMeta.value = String(f.weightMeta ?? 600);
}

function applyTypographyPreset(presetId) {
  const p = FONT_PRESETS[presetId];
  if (!p) return;

  const f = state.settings.font;
  f.lineHeight = p.lineHeight ?? f.lineHeight;
  f.titleClamp = p.titleClamp ?? f.titleClamp;
  f.letterSpacing = p.letterSpacing ?? f.letterSpacing;
  f.cardPadY = p.cardPadY ?? f.cardPadY;
  f.cardRadius = p.cardRadius ?? f.cardRadius;
  f.weightTitle = p.weightTitle ?? f.weightTitle;
  f.weightMeta = p.weightMeta ?? f.weightMeta;
  if (p.textTransform != null) f.textTransform = p.textTransform;

  syncFontInputsFromState();
  applyFont();
  renderAll();
  saveState(true);
}

function applyTightnessPreset(level) {
  const p = TIGHTNESS[level];
  if (!p) return;

  const f = state.settings.font;
  f.lineHeight = p.lineHeight;
  f.letterSpacing = p.letterSpacing;

  syncFontInputsFromState();
  applyFont();
  renderAll();
  saveState(true);
}

if (fontPreset && !fontPreset.dataset.hooked) {
  fontPreset.addEventListener("change", () => {
    const v = fontPreset.value;
    if (v === "custom") return;
    applyTypographyPreset(v);
  });
  fontPreset.dataset.hooked = "1";
}

if (fontQuickTightness && !fontQuickTightness.dataset.hooked) {
  fontQuickTightness.addEventListener("change", () => {
    applyTightnessPreset(fontQuickTightness.value);
  });
  fontQuickTightness.dataset.hooked = "1";
}

const fontLineHeight = $("fontLineHeight");
const fontSampleText = $("fontSampleText");
const fontTitle1 = $("fontTitle1");
const fontTitle2 = $("fontTitle2");
const fontMeta1 = $("fontMeta1");
const fontMeta2 = $("fontMeta2");
const fontWeightTitle = $("fontWeightTitle");
const fontWeightMeta = $("fontWeightMeta");

const themeMode = $("themeMode");
const themePreset = $("themePreset");
const paletteGrid = $("paletteGrid");
const themeWarn = $("themeWarn");

const tAccent = $("tAccent");
const tBg = $("tBg");
const tCard = $("tCard");
const tText = $("tText");
const tBorder = $("tBorder");
const tGridHead = $("tGridHead");
const tNowRow = $("tNowRow");
const tTodayCol = $("tTodayCol");

const alphaToday = $("alphaToday");
const alphaNow = $("alphaNow");
const alphaEvent = $("alphaEvent");
const alphaShadow = $("alphaShadow");
const alphaTodayVal = $("alphaTodayVal");
const alphaNowVal = $("alphaNowVal");
const alphaEventVal = $("alphaEventVal");
const alphaShadowVal = $("alphaShadowVal");

if (fontSampleText) {
  fontSampleText.addEventListener("change", () => {
    const st = (fontSampleText.value || "").trim();
    state.settings.font.sampleText =
      st || DEFAULT_STATE.settings.font.sampleText;

    fontPickerSample.textContent = getFontSampleText();
    fillFontSelectOptions();
    renderFontPickerList(fontPickerSearch.value);

    saveState(true);
  });
}

const DOTS = {
  accent: $("dotsAccent"),
  bg: $("dotsBg"),
  card: $("dotsCard"),
  text: $("dotsText"),
  border: $("dotsBorder"),
  gridHead: $("dotsGridHead"),
  now: $("dotsNowRow"),
  today: $("dotsTodayCol"),
};

function normalizeHex(v) {
  if (!v) return "#000000";
  let s = String(v).trim().toLowerCase();
  if (!s.startsWith("#")) s = "#" + s;
  if (s.length === 4) {
    s = "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
  }
  return s;
}

function sameHex(a, b) {
  return normalizeHex(a) === normalizeHex(b);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, "0");
  return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
}

function getColorLibrary() {
  const extra = [];
  for (let i = 0; i < 36; i++) extra.push(hslToHex(i * 10, 75, 55));

  const base = [...COLOR_SWATCHES, ...extra].map(normalizeHex);
  const out = [];
  const seen = new Set();
  for (const c of base) {
    if (seen.has(c)) continue;
    seen.add(c);
    out.push(c);
  }
  return out;
}

function fillDots(container, getCurrent, onPick) {
  container.innerHTML = "";
  const cur = () => normalizeHex(getCurrent());

  getColorLibrary().forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dotbtn";
    b.style.background = c;
    b.title = c;
    b.setAttribute("aria-label", c);

    if (sameHex(c, cur())) b.classList.add("active");

    b.addEventListener("click", () => onPick(c));
    container.appendChild(b);
  });
}

window.getLogoUrlByVariant = function getLogoUrlByVariant(variant, recolorColor = null) {
  variant = Number(variant);
  
  // Для загруженного файла (вариант 3)
  if (variant === 3) {
    const fileData = state.settings.logo?.uploadedFileData;
    if (fileData && (fileData.startsWith("data:") || fileData.startsWith("blob:"))) {
      return fileData;
    }
    // Fallback на вариант 1
    variant = 1;
  }
  
  // Получаем SVG строку
  let svgString = LOGO_SVG_STRINGS[variant];
  if (!svgString) {
    console.warn(`Неизвестный вариант логотипа: ${variant}, используем вариант 1`);
    svgString = LOGO_SVG_STRINGS[1];
  }
  
  // Если указан цвет для перекрашивания, заменяем currentColor
  if (recolorColor && (variant === 1 || variant === 2)) {
    svgString = svgString.replace(/fill="currentColor"/g, `fill="${recolorColor}"`);
  }
  
  // Создаём Blob URL для SVG
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};

function clearLogoCache() {
  // Очищаем кэш для тайлов
  if (window.clearTileBlobCache) {
    window.clearTileBlobCache();
  }
  
  // Очищаем кэш для Blob URL логотипов
  if (window._logoSvgBlobUrls) {
    for (const key in window._logoSvgBlobUrls) {
      try {
        URL.revokeObjectURL(window._logoSvgBlobUrls[key]);
      } catch (e) {
        console.warn('Не удалось очистить URL:', e);
      }
    }
    window._logoSvgBlobUrls = {};
  }
  
  // Также очищаем глобальный кэш
  if (window._tileBlobCache) {
    for (const blobUrl of window._tileBlobCache.values()) {
      try {
        URL.revokeObjectURL(blobUrl);
      } catch {}
    }
    window._tileBlobCache.clear();
  }
}

function openSettings() {
  setActiveTab("schedule");
  settingsWarn.style.display = "none";
  settingsWarn.textContent = "";

  const s = state.settings.schedule;
  setStart.value = s.start;
  setEnd.value = s.end;
  setDefaultDur.value = String(s.defaultDuration);

  const d = state.settings.display;
  dispCellView.value = d.cellView;
  dispCardMode.value = d.cardMode;
  dispShowNotes.value = d.showNotes ? "yes" : "no";
  dispShowToday.value = d.showTodayHighlight ? "yes" : "no";
  dispDayWidth.value = String(d.dayWidthPx ?? 0);
  dispCellPad.value = String(d.cellPadPx ?? 6);
  dispShowEmptyHint.value = d.showEmptyHint ? "yes" : "no";

  const f = state.settings.font;

  const presetVal =
    f && typeof f.preset === "string" && f.preset.trim() ? f.preset : "custom";
  const tightnessVal =
    f && typeof f.tightness === "string" && f.tightness.trim()
      ? f.tightness
      : "normal";

  if (fontPreset) fontPreset.value = presetVal;
  if (fontQuickTightness) fontQuickTightness.value = tightnessVal;

  const lg = state.settings.logo;

  if (logoLayout) logoLayout.value = lg.layout || "center";
  if (logoTileSize) logoTileSize.value = String(lg.tileSize ?? 140);

  if (logoHorizontalGap)
    logoHorizontalGap.value = String(lg.horizontalGap ?? 180);
  if (logoVerticalGap) logoVerticalGap.value = String(lg.verticalGap ?? 180);
  if (logoRotation) {
    logoRotation.value = String(lg.rotation ?? 0);
    if (logoRotationVal) {
      logoRotationVal.textContent = `${logoRotation.value}°`;
    }
  }

  if (logoTileOffsetX) logoTileOffsetX.value = String(lg.tileOffsetX ?? 0);
  if (logoTileOffsetY) logoTileOffsetY.value = String(lg.tileOffsetY ?? 0);
  if (logoVariant) {
    // Сохраняем текущее значение
    const currentVariant = String(lg.variant ?? 1);
    
    // Очищаем список
    logoVariant.innerHTML = '';
    
    // Добавляем стандартные варианты
    const option1 = document.createElement('option');
    option1.value = '1';
    option1.textContent = 'Логотип 1';
    logoVariant.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = '2';
    option2.textContent = 'Логотип 2';
    logoVariant.appendChild(option2);
    
    // Добавляем вариант для загруженного файла, если он есть
    if (lg.uploadedFileData) {
      const option3 = document.createElement('option');
      option3.value = '3';
      option3.textContent = 'Загруженный файл';
      logoVariant.appendChild(option3);
    }
    
    // Устанавливаем текущее значение
    logoVariant.value = currentVariant;
  }
  // Обработчик изменения варианта логотипа
  if (logoVariant) {
    logoVariant.addEventListener('change', function() {
      const variant = Number(this.value);
      state.settings.logo.variant = variant;
      
      // Показываем/скрываем блок загрузки файла
      const logoUploadWrap = document.getElementById("logoUploadWrap");
      if (logoUploadWrap) {
        logoUploadWrap.style.display = variant === 3 ? 'block' : 'none';
      }
      
      // Обновляем логотип
      updateLogoAndSave();
    });
  }

  const logoUploadWrap = document.getElementById("logoUploadWrap");
  if (logoUploadWrap && logoVariant) {
    logoUploadWrap.style.display = lg.variant === 3 ? "block" : "none";
  }
  // В openSettings() добавьте:
  if (logoHorizontalGapNum) logoHorizontalGapNum.value = String(lg.horizontalGap ?? 180);
  if (logoVerticalGapNum) logoVerticalGapNum.value = String(lg.verticalGap ?? 180);
  if (logoRotationNum) logoRotationNum.value = String(lg.rotation ?? 0);
  if (logoTileOffsetXNum) logoTileOffsetXNum.value = String(lg.tileOffsetX ?? 0);
  if (logoTileOffsetYNum) logoTileOffsetYNum.value = String(lg.tileOffsetY ?? 0);

  logoEnabled.checked = !!lg.enabled;

  logoOpacity.value = String(lg.opacity ?? 12);
  logoOpacityVal.textContent = `${logoOpacity.value}%`;

  logoRecolor.checked = !!lg.recolor;
  logoColor.value = lg.color || "#0ea5e9";
  logoColorWrap.style.display = logoRecolor.checked ? "block" : "none";

  if (logoLayout) logoLayout.value = lg.layout || "center";

  // Обработчик загрузки файла
  if (logoUpload) {
    logoUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(event) {
        // Сохраняем данные файла
        state.settings.logo.uploadedFileData = event.target.result;
        
        // Устанавливаем вариант 3
        state.settings.logo.variant = 3;
        
        // Обновляем выпадающий список, чтобы добавить вариант 3
        if (logoVariant) {
          // Проверяем, есть ли уже вариант 3
          let hasOption3 = false;
          for (let i = 0; i < logoVariant.options.length; i++) {
            if (logoVariant.options[i].value === '3') {
              hasOption3 = true;
              break;
            }
          }
          
          // Если нет, добавляем
          if (!hasOption3) {
            const option3 = document.createElement('option');
            option3.value = '3';
            option3.textContent = 'Загруженный файл';
            logoVariant.appendChild(option3);
          }
          
          // Устанавливаем значение 3
          logoVariant.value = '3';
        }
        
        // Обновляем логотип
        updateLogoAndSave();
        
        // Сбрасываем значение input, чтобы можно было загрузить тот же файл снова
        logoUpload.value = '';
      };
      
      reader.readAsDataURL(file);
    });
  }
  syncLogoPreview();

  if (fontLetterSpacing) fontLetterSpacing.value = String(f.letterSpacing ?? 0);
  if (fontTextTransform) fontTextTransform.value = f.textTransform || "none";
  if (fontTitleClamp) fontTitleClamp.value = String(f.titleClamp ?? 3);
  if (fontCardPaddingY) fontCardPaddingY.value = String(f.cardPadY ?? 7);
  if (fontCardRadius) fontCardRadius.value = String(f.cardRadius ?? 12);

  const mainFam = f.family || "system";
  const titleFam = f.titleFamily || mainFam;
  const metaFam = f.metaFamily || mainFam;

  pickerMain.setSelected(mainFam, true);
  pickerTitle.setSelected(titleFam, true);
  pickerMeta.setSelected(metaFam, true);

  fontFamily.value = mainFam;
  if (typeof fontTitleFamily !== "undefined" && fontTitleFamily)
    fontTitleFamily.value = titleFam;
  if (typeof fontMetaFamily !== "undefined" && fontMetaFamily)
    fontMetaFamily.value = metaFam;

  if (fontLineHeight) fontLineHeight.value = String(f.lineHeight ?? 1.12);
  if (fontTitle1) fontTitle1.value = String(f.titleSize1 ?? 12);
  if (fontTitle2) fontTitle2.value = String(f.titleSize2 ?? 10);
  if (fontMeta1) fontMeta1.value = String(f.metaSize1 ?? 11);
  if (fontMeta2) fontMeta2.value = String(f.metaSize2 ?? 9);
  if (fontWeightTitle) fontWeightTitle.value = String(f.weightTitle ?? 900);
  if (fontWeightMeta) fontWeightMeta.value = String(f.weightMeta ?? 600);

  if (fontSampleText) fontSampleText.value = f.sampleText || "";

  const th = state.settings.theme;
  themeMode.value = th.mode;
  syncLogoLayoutFromState();
  renderThemePresetUI();
  fillThemeInputsFromState();

  settingsBackdrop.classList.add("show");
}

function closeSettings() {
  settingsBackdrop.classList.remove("show");
}

function renderThemePresetUI() {
  const normalizeHex = (v) => {
    if (!v) return "#000000";
    let s = String(v).trim().toLowerCase();
    if (!s.startsWith("#")) s = "#" + s;
    if (s.length === 4) s = "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
    return s;
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x) =>
      Math.round(255 * x)
        .toString(16)
        .padStart(2, "0");
    return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
  };

  const buildColorLibrary = () => {
    const extra = [];
    for (let i = 0; i < 36; i++) extra.push(hslToHex(i * 10, 78, 56));
    for (let i = 0; i < 36; i++) extra.push(hslToHex(i * 10, 78, 44));
    for (let i = 0; i < 36; i++) extra.push(hslToHex(i * 10, 78, 66));

    const base = [...COLOR_SWATCHES, ...extra].map(normalizeHex);
    const out = [];
    const seen = new Set();
    for (const c of base) {
      if (seen.has(c)) continue;
      seen.add(c);
      out.push(c);
    }
    return out;
  };

  const setActivePresetCard = (presetId) => {
    paletteGrid.querySelectorAll(".palette").forEach((el) => {
      el.classList.toggle("active", el.dataset.preset === presetId);
    });
  };

  const renderDotRow = (container, inputEl, colorLib) => {
    container.innerHTML = "";
    const cur = normalizeHex(inputEl.value);

    colorLib.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dotbtn";
      b.dataset.color = c;
      b.style.background = c;
      b.title = c;
      b.setAttribute("aria-label", c);
      if (normalizeHex(c) === cur) b.classList.add("active");

      b.addEventListener("click", () => {
        inputEl.value = c;
        onThemeInput();
        syncDotsActive();
      });

      b.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (navigator.clipboard?.writeText) navigator.clipboard.writeText(c);
      });

      container.appendChild(b);
    });
  };

  const syncDotsActive = () => {
    const map = [
      [DOTS.accent, tAccent],
      [DOTS.bg, tBg],
      [DOTS.card, tCard],
      [DOTS.text, tText],
      [DOTS.border, tBorder],
      [DOTS.gridHead, tGridHead],
      [DOTS.now, tNowRow],
      [DOTS.today, tTodayCol],
    ];

    map.forEach(([wrap, inputEl]) => {
      const cur = normalizeHex(inputEl.value);
      wrap.querySelectorAll(".dotbtn").forEach((btn) => {
        btn.classList.toggle("active", normalizeHex(btn.dataset.color) === cur);
      });
    });
  };

  const prev = themePreset.value;
  themePreset.innerHTML = "";

  const optFrag = document.createDocumentFragment();
  THEME_PRESETS.forEach((p) => {
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.name;
    optFrag.appendChild(o);
  });
  themePreset.appendChild(optFrag);

  const defaultId = THEME_PRESETS[0]?.id || "";
  const initialId = THEME_PRESETS.some((p) => p.id === prev) ? prev : defaultId;
  themePreset.value = initialId;

  paletteGrid.innerHTML = "";
  const gridFrag = document.createDocumentFragment();

  THEME_PRESETS.forEach((p) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "palette";
    el.dataset.preset = p.id;
    el.setAttribute("aria-label", `Тема: ${p.name}`);

    const crTextCard = contrastRatio(p.tokens.text, p.tokens.card);
    const crTextBg = contrastRatio(p.tokens.text, p.tokens.bg);
    const warn = crTextCard < 4.5 || crTextBg < 4.5;

    el.innerHTML = `
      <div class="name">${p.name}</div>
      <div class="bar">
        <span class="c" style="background:${p.tokens.bg}"></span>
        <span class="c" style="background:${p.tokens.card}"></span>
        <span class="c" style="background:${p.tokens.accent}"></span>
        <span class="c" style="background:${p.tokens.gridHead}"></span>
        <span class="c" style="background:${p.tokens.today}"></span>
      </div>
      <div class="mini">
        Акцент: ${p.tokens.accent}
        · Контраст: card ${crTextCard.toFixed(2)}, bg ${crTextBg.toFixed(2)}
        ${warn ? "· Проверь читаемость" : ""}
      </div>
    `;

    el.addEventListener("click", () => {
      themePreset.value = p.id;
      setActivePresetCard(p.id);
      applyPresetToCustom(p.id);
    });

    gridFrag.appendChild(el);
  });

  paletteGrid.appendChild(gridFrag);
  setActivePresetCard(themePreset.value);

  if (!themePreset.dataset.activeHooked) {
    themePreset.addEventListener("change", () =>
      setActivePresetCard(themePreset.value),
    );
    themePreset.dataset.activeHooked = "1";
  }

  const lib = buildColorLibrary();
  renderDotRow(DOTS.accent, tAccent, lib);
  renderDotRow(DOTS.bg, tBg, lib);
  renderDotRow(DOTS.card, tCard, lib);
  renderDotRow(DOTS.text, tText, lib);
  renderDotRow(DOTS.border, tBorder, lib);
  renderDotRow(DOTS.gridHead, tGridHead, lib);
  renderDotRow(DOTS.now, tNowRow, lib);
  renderDotRow(DOTS.today, tTodayCol, lib);

  const qm = window.queueMicrotask || ((fn) => Promise.resolve().then(fn));
  qm(() => {
    setActivePresetCard(themePreset.value);
    syncDotsActive();
  });

  const inputs = [
    tAccent,
    tBg,
    tCard,
    tText,
    tBorder,
    tGridHead,
    tNowRow,
    tTodayCol,
  ];
  inputs.forEach((inp) => {
    if (inp.dataset.dotsHooked) return;
    inp.addEventListener("input", syncDotsActive);
    inp.dataset.dotsHooked = "1";
  });
}

function openCoachManager() {
  if (!state.coaches.length) {
    toast("INFO", "ℹ️", "Список тренеров пуст");
    return;
  }

  let message = "📝 СПИСОК ТРЕНЕРОВ:\n\n";
  state.coaches.forEach((coach, idx) => {
    const count = state.events.filter((e) => e.coach === coach).length;
    message += `${idx + 1}. ${coach} (занятий: ${count})\n`;
  });
  message += "\n━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "Введите номер тренера для удаления\nили 0 для отмены:";

  const choice = prompt(message, "0");
  if (!choice || choice === "0") return;

  const idx = parseInt(choice) - 1;
  if (idx < 0 || idx >= state.coaches.length) {
    toast("WARN", "⚠️", "Неверный номер");
    return;
  }

  const coachToDelete = state.coaches[idx];
  const affectedCount = state.events.filter(
    (e) => e.coach === coachToDelete,
  ).length;

  if (affectedCount > 0) {
    if (
      !confirm(
        `❌ Удалить "${coachToDelete}"?\n\nЭто повлияет на ${affectedCount} занятий.\nТренер будет удален из всех занятий.`,
      )
    ) {
      return;
    }
  }

  state.coaches.splice(idx, 1);

  state.events.forEach((ev) => {
    if (ev.coach === coachToDelete) {
      ev.coach = "";
    }
  });

  pushHistory(`🗑️ Удален тренер: ${coachToDelete}`);
  saveState();
  renderAll();
  toast("OK", "Удалено", `Тренер "${coachToDelete}" удален`);

  renderCoachSelect("");
}

function fillThemeInputsFromState() {
  const c =
    state.settings.theme.customTokens || deepCopy(THEME_PRESETS[0].tokens);
  tAccent.value = c.accent;
  tBg.value = c.bg;
  tCard.value = c.card;
  tText.value = c.text;
  tBorder.value = c.border;
  tGridHead.value = c.gridHead;
  tNowRow.value = c.now;
  tTodayCol.value = c.today;

  const a = state.settings.theme.alpha;
  alphaToday.value = String(a.today);
  alphaNow.value = String(a.now);
  alphaEvent.value = String(a.event);
  alphaShadow.value = String(a.shadow);

  alphaTodayVal.textContent = `${a.today}%`;
  alphaNowVal.textContent = `${a.now}%`;
  alphaEventVal.textContent = `${a.event}%`;
  alphaShadowVal.textContent = `${a.shadow}%`;

  themeWarn.style.display = "none";
  themeWarn.textContent = "";
}

function collectThemeInputs() {
  return {
    bg: tBg.value,
    card: tCard.value,
    text: tText.value,
    muted: state.settings.theme.customTokens?.muted || "#64748b",
    border: tBorder.value,
    gridHead: tGridHead.value,
    accent: tAccent.value,
    now: tNowRow.value,
    today: tTodayCol.value,
  };
}

function applyPresetToCustom(presetId) {
  const p = THEME_PRESETS.find((x) => x.id === presetId);
  if (!p) return;
  state.settings.theme.customTokens = deepCopy(p.tokens);
  fillThemeInputsFromState();
  previewThemeWarnings();
  applyTheme();
}

function previewThemeWarnings() {
  const tokens = collectThemeInputs();
  const issues = [];
  const cr1 = contrastRatio(tokens.text, tokens.bg);
  const cr2 = contrastRatio(tokens.text, tokens.card);
  if (cr1 < 4.5)
    issues.push(
      `Контраст text/bg низкий: ${cr1.toFixed(2)}:1 (будет авто‑исправление).`,
    );
  if (cr2 < 4.5)
    issues.push(
      `Контраст text/card низкий: ${cr2.toFixed(2)}:1 (будет авто‑исправление).`,
    );
  if (issues.length) {
    themeWarn.style.display = "block";
    themeWarn.textContent = issues.join(" ");
  } else {
    themeWarn.style.display = "none";
    themeWarn.textContent = "";
  }
}

function onThemeInput() {
  state.settings.theme.customTokens = collectThemeInputs();
  state.settings.theme.alpha = {
    today: Number(alphaToday.value),
    now: Number(alphaNow.value),
    event: Number(alphaEvent.value),
    shadow: Number(alphaShadow.value),
  };

  alphaTodayVal.textContent = alphaToday.value;
  alphaNowVal.textContent = alphaNow.value;
  alphaEventVal.textContent = alphaEvent.value;
  alphaShadowVal.textContent = alphaShadow.value;

  previewThemeWarnings();

  if (themeMode.value === "custom") {
    state.settings.theme.mode = "custom";
  }

  applyTheme();
}

function saveSettings() {
  const issues = [];

  const startStr = setStart.value;
  const endStr = setEnd.value;
  const defaultDuration = Number(setDefaultDur.value);

  const startMin = parseHHMM(startStr);
  const endMin = parseHHMM(endStr);

  if (startMin == null || endMin == null)
    issues.push("Проверьте время начала/конца.");
  if (startMin != null && endMin != null && endMin <= startMin)
    issues.push("Конец дня должен быть позже начала.");
  if (!defaultDuration || defaultDuration < 1)
    issues.push("Длительность по умолчанию должна быть >= 1.");

  let lh = Number(fontLineHeight.value);
  if (!Number.isFinite(lh)) {
    lh = 1.12;
    issues.push("Line-height: некорректное число.");
  }
  lh = clamp(lh, 1.0, 1.8);

  const t1 = Number(fontTitle1.value),
    t2 = Number(fontTitle2.value);
  const m1 = Number(fontMeta1.value),
    m2 = Number(fontMeta2.value);

  if (t2 > t1)
    issues.push(
      "Размер названия для 2 занятий должен быть <= размера для 1 занятия.",
    );

  state.settings.theme.mode = themeMode.value;
  state.settings.theme.customTokens = collectThemeInputs();
  state.settings.theme.alpha = {
    today: Number(alphaToday.value),
    now: Number(alphaNow.value),
    event: Number(alphaEvent.value),
    shadow: Number(alphaShadow.value),
  };

  if (issues.length) {
    settingsWarn.style.display = "block";
    settingsWarn.textContent = issues.join(" ");
    return;
  }

  const oldStart = state.settings.schedule.start;
  const oldEnd = state.settings.schedule.end;

  const timeParamsChanged = oldStart !== startStr || oldEnd !== endStr;
  let removed = 0;

  if (timeParamsChanged) {
    const before = state.events.length;
    const { start, end, step } = getBounds();
    const startBound = start;
    const endBound = end;

    state.events = state.events.filter((ev) => {
      if (ev.startMin < startBound || ev.startMin >= endBound) return false;
      const ss = slotStartFor(ev.startMin);
      const se = ss + step;
      if (ev.startMin + ev.durationMin > se) return false;
      return true;
    });

    removed = before - state.events.length;
  }

  state.settings.logo.enabled = !!logoEnabled.checked;
  state.settings.logo.opacity = clamp(
    Math.round(Number(logoOpacity.value ?? 12)),
    0,
    100,
  );
  state.settings.logo.recolor = !!logoRecolor.checked;
  state.settings.logo.color = String(logoColor.value || "#0ea5e9").trim();
  if (logoLayout)
    state.settings.logo.layout = String(logoLayout.value || "center");

  if (logoHorizontalGap) {
    let horizontalGap = Number(logoHorizontalGap.value);
    if (!Number.isFinite(horizontalGap)) horizontalGap = 180;
    horizontalGap = clamp(Math.round(horizontalGap), 0, 800);
    state.settings.logo.horizontalGap = horizontalGap;
  }

  if (logoVerticalGap) {
    let verticalGap = Number(logoVerticalGap.value);
    if (!Number.isFinite(verticalGap)) verticalGap = 180;
    verticalGap = clamp(Math.round(verticalGap), 0, 800);
    state.settings.logo.verticalGap = verticalGap;
  }

  if (logoRotation) {
    let rotation = Number(logoRotation.value);
    if (!Number.isFinite(rotation)) rotation = 0;
    rotation = clamp(Math.round(rotation), -180, 180);
    state.settings.logo.rotation = rotation;
  }

  if (
    logoTileSize ||
    logoHorizontalGap ||
    logoVerticalGap ||
    logoRotation ||
    logoTileOffsetX ||
    logoTileOffsetY
  ) {
    if (window.clearTileBlobCache) window.clearTileBlobCache();
  }

  let tileSize = Number(logoTileSize?.value);
  if (!Number.isFinite(tileSize)) tileSize = 140;
  tileSize = clamp(Math.round(tileSize), 20, 400);
  state.settings.logo.tileSize = tileSize;

  let tileOffsetX = Number(logoTileOffsetX?.value);
  if (!Number.isFinite(tileOffsetX)) tileOffsetX = 0;
  tileOffsetX = clamp(Math.round(tileOffsetX), -2000, 2000);
  state.settings.logo.tileOffsetX = tileOffsetX;

  let tileOffsetY = Number(logoTileOffsetY?.value);
  if (!Number.isFinite(tileOffsetY)) tileOffsetY = 0;
  tileOffsetY = clamp(Math.round(tileOffsetY), -2000, 2000);
  state.settings.logo.tileOffsetY = tileOffsetY;

  state.settings.logo.variant = clamp(
    Math.round(Number(logoVariant.value || 1)),
    1,
    3,
  );

  if (window.clearTileBlobCache) window.clearTileBlobCache();

  pushHistory("Изменение настроек");
  state.settings.font.preset = fontPreset?.value || "custom";
  state.settings.font.tightness = fontQuickTightness?.value || "normal";

  state.settings.schedule.start = startStr;
  state.settings.schedule.end = endStr;
  state.settings.schedule.defaultDuration = defaultDuration;

  state.settings.schedule.maxPerCell = 2;

  let dayWidthPx = Number(dispDayWidth.value);
  if (!Number.isFinite(dayWidthPx) || dayWidthPx < 0) dayWidthPx = 0;

  let cellPadPx = Number(dispCellPad.value);
  if (!Number.isFinite(cellPadPx) || cellPadPx < 0) cellPadPx = 0;

  cellPadPx = clamp(Math.round(cellPadPx), 0, 24);
  if (dayWidthPx > 0) dayWidthPx = clamp(Math.round(dayWidthPx), 120, 800);

  state.settings.display.showTodayHighlight = dispShowToday.value === "yes";
  state.settings.display.dayWidthPx = dayWidthPx;
  state.settings.display.cellPadPx = cellPadPx;

  state.settings.display.cellView = dispCellView.value;
  state.settings.display.cardMode = dispCardMode.value;
  state.settings.display.showNotes = dispShowNotes.value === "yes";
  state.settings.display.showEmptyHint = dispShowEmptyHint.value === "yes";

  const prev = state.settings.font || {};

  const mainFam = fontFamily?.value || prev.family || "system";

  const titleFam = fontTitleFamily?.value || prev.titleFamily || mainFam;

  const metaFam = fontMetaFamily?.value || prev.metaFamily || mainFam;

  state.settings.font.family = mainFam;
  state.settings.font.titleFamily = titleFam;
  state.settings.font.metaFamily = metaFam;

  state.settings.font.lineHeight = lh;
  state.settings.font.titleSize1 = t1;
  state.settings.font.titleSize2 = t2;
  state.settings.font.metaSize1 = m1;
  state.settings.font.metaSize2 = m2;
  state.settings.font.weightTitle = Number(fontWeightTitle.value);
  state.settings.font.weightMeta = Number(fontWeightMeta.value);

  if (fontSampleText) {
    const st = (fontSampleText.value || "").trim();
    state.settings.font.sampleText =
      st || DEFAULT_STATE.settings.font.sampleText;
  }

  let letterSpacing = Number(fontLetterSpacing?.value);
  if (!Number.isFinite(letterSpacing)) letterSpacing = 0;
  letterSpacing = clamp(letterSpacing, -0.05, 0.2);

  const textTransform = String(fontTextTransform?.value ?? "none");

  let titleClamp = Number(fontTitleClamp?.value);
  if (!Number.isFinite(titleClamp)) titleClamp = 3;
  titleClamp = clamp(Math.round(titleClamp), 2, 4);

  let cardPadY = Number(fontCardPaddingY?.value);
  if (!Number.isFinite(cardPadY)) cardPadY = 7;
  cardPadY = clamp(Math.round(cardPadY), 2, 14);

  let cardRadius = Number(fontCardRadius?.value);
  if (!Number.isFinite(cardRadius)) cardRadius = 12;
  cardRadius = clamp(Math.round(cardRadius), 0, 18);

  state.settings.font.letterSpacing = letterSpacing;
  state.settings.font.textTransform = textTransform;
  state.settings.font.titleClamp = titleClamp;
  state.settings.font.cardPadY = cardPadY;
  state.settings.font.cardRadius = cardRadius;

  saveState();
  closeSettings();
  renderAll();
  requestAnimationFrame(() => updateLogoIfNeeded());

  if (removed > 0)
    toast(
      "WARN",
      "Применено",
      `Удалено занятий вне диапазона/слота: ${removed}.`,
    );
  else toast("OK", "", "Настройки сохранены.");
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `schedule_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("OK", "Экспорт JSON", "Файл скачан.");
}

function importJson(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const parsed = JSON.parse(r.result);

      if (!confirm("Импортировать данные? Текущие данные будут заменены."))
        return;
      pushHistory("Импорт JSON");
      state = parsed;
      state.version = 13;
      hardenState();
      saveState();
      renderAll();
      toast("OK", "Импорт выполнен", "Данные загружены.");
    } catch (e) {
      toast("ERR", "Импорт не удался", e.message || "Проверьте формат JSON.");
    }
  };
  r.readAsText(file);
}

function toast(kind, title, text) {
  const toasts = $("toasts");
  const el = document.createElement("div");
  el.className = "toast";

  const icon = document.createElement("div");
  icon.className = "icon";
  icon.textContent = kind === "OK" ? "✓" : kind === "WARN" ? "!" : "×";
  icon.style.background =
    kind === "OK"
      ? "var(--ok)"
      : kind === "WARN"
        ? "var(--warn)"
        : "var(--danger)";

  const content = document.createElement("div");
  content.className = "content";
  const t = document.createElement("div");
  t.className = "title";
  t.textContent = title;
  const d = document.createElement("div");
  d.className = "text";
  d.textContent = text || "";
  content.appendChild(t);
  content.appendChild(d);

  const actions = document.createElement("div");
  actions.className = "actions";
  const close = document.createElement("button");
  close.className = "close";
  close.textContent = "×";
  close.addEventListener("click", () => el.remove());
  actions.appendChild(close);

  el.appendChild(icon);
  el.appendChild(content);
  el.appendChild(actions);

  toasts.appendChild(el);
  setTimeout(() => {
    if (el.isConnected) el.remove();
  }, 4500);
}

$("btnSettings").addEventListener("click", openSettings);
$("btnUndo").addEventListener("click", undo);
$("btnRedo").addEventListener("click", redo);

$("btnExportJson").addEventListener("click", exportJson);

$("btnImportJson").addEventListener("click", () => $("fileInput").click());
$("btnExportPng").addEventListener("click", openExportModal);

document
  .getElementById("btnCloseExport")
  .addEventListener("click", closeExportModal);
document
  .getElementById("btnExpCancel")
  .addEventListener("click", closeExportModal);
exportBackdrop.addEventListener("click", (e) => {
  if (e.target === exportBackdrop) closeExportModal();
});

expFormat.addEventListener("change", () => {
  syncExportModalUI();
  lastPreview = null;
  expPreviewImg.removeAttribute("src");
});

expPreset.addEventListener("change", () => {
  lastPreview = null;
  expPreviewImg.removeAttribute("src");
});
expBg.addEventListener("change", () => {
  lastPreview = null;
  expPreviewImg.removeAttribute("src");
});

expQuality.addEventListener("input", () => {
  expQualityVal.textContent = String(expQuality.value);
  lastPreview = null;
  expPreviewImg.removeAttribute("src");
});

document
  .getElementById("btnExpPreview")
  .addEventListener("click", buildExportPreview);
document
  .getElementById("btnExpDownload")
  .addEventListener("click", downloadFromExportModal);

$("fileInput").addEventListener("change", (e) => {
  const f = e.target.files && e.target.files[0];
  if (f) importJson(f);
  e.target.value = "";
});

$("btnClearAll").addEventListener("click", () => {
  if (!confirm("Очистить все занятия?")) return;
  pushHistory("Очистка всех занятий");
  state.events = [];
  saveState();
  renderAll();
  toast("OK", "Очищено", "Все занятия удалены.");
});

$("btnCloseEvent").addEventListener("click", closeEventModal);
$("btnCancel").addEventListener("click", closeEventModal);
$("btnSave").addEventListener("click", saveEventFromModal);
$("btnDelete").addEventListener("click", deleteEventFromModal);
$("btnDuplicate").addEventListener("click", duplicateEventFromModal);
eventBackdrop.addEventListener("click", (e) => {
  if (e.target === eventBackdrop) closeEventModal();
});

$("btnCloseSettings").addEventListener("click", closeSettings);
$("btnSettingsCancel").addEventListener("click", closeSettings);
$("btnSettingsSave").addEventListener("click", saveSettings);
settingsBackdrop.addEventListener("click", (e) => {
  if (e.target === settingsBackdrop) closeSettings();
});

q.addEventListener("input", (e) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    filters.q = e.target.value;
    applyEventVisibilityOnly();
    renderFilterBar();
  }, 150);
});

evDir.addEventListener("change", () => {
  if (evDir.value === "__manage__") {
    openDirectionManager();
    evDir.value = "";
  } else {
    renderDirPreview();
  }
});
evStart.addEventListener("input", updateConflictsLive);
evDur.addEventListener("input", updateConflictsLive);
evCoach.addEventListener("input", updateConflictsLive);
evCoach.addEventListener("change", () => {
  if (evCoach.value === "__new__") {
    const newCoach = prompt("Введите имя нового тренера:");
    if (newCoach && newCoach.trim()) {
      const coachName = newCoach.trim();
      if (!state.coaches.includes(coachName)) {
        state.coaches.push(coachName);
        state.coaches.sort();
      }
      renderCoachSelect(coachName);
      toast("OK", "Добавлен", `Тренер "${coachName}" добавлен`);
    } else {
      evCoach.value = "";
    }
  } else if (evCoach.value === "__manage__") {
    openCoachManager();
    evCoach.value = "";
  }
});

evRoom.addEventListener("input", updateConflictsLive);

newDirName.addEventListener("input", updateNewDirPreview);
newDirColor.addEventListener("input", () => {
  renderDirSwatches();
  updateNewDirPreview();
});

themeMode.addEventListener("change", () => {
  state.settings.theme.mode = themeMode.value;
  applyTheme();
});
themePreset.addEventListener("change", () =>
  applyPresetToCustom(themePreset.value),
);
[tAccent, tBg, tCard, tText, tBorder, tGridHead, tNowRow, tTodayCol].forEach(
  (inp) => inp.addEventListener("input", onThemeInput),
);
[alphaToday, alphaNow, alphaEvent, alphaShadow].forEach((inp) =>
  inp.addEventListener("input", onThemeInput),
);

$("btnThemeReset").addEventListener("click", () => {
  state.settings.theme.customTokens = deepCopy(THEME_PRESETS[0].tokens);
  state.settings.theme.alpha = { today: 60, now: 65, event: 100, shadow: 10 };
  fillThemeInputsFromState();
  applyTheme();
  toast("OK", "Тема", "Сброшено к дефолту.");
});
$("btnThemeAutoFix").addEventListener("click", () => {
  state.settings.theme.customTokens = ensureThemeContrast(collectThemeInputs());
  fillThemeInputsFromState();
  applyTheme();
  toast("OK", "Тема", "Контраст исправлен.");
});

document.addEventListener("keydown", (e) => {
  const isMac = navigator.platform.toLowerCase().includes("mac");
  const mod = isMac ? e.metaKey : e.ctrlKey;

  if (mod && e.key.toLowerCase() === "z") {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }
  if (mod && e.key.toLowerCase() === "y") {
    e.preventDefault();
    redo();
  }
  if (e.key === "Escape") {
    if (eventBackdrop.classList.contains("show")) closeEventModal();
    if (settingsBackdrop.classList.contains("show")) closeSettings();
  }
});

function openDirectionManager() {
  if (!state.directions.length) {
    toast("INFO", "ℹ️", "Список направлений пуст");
    return;
  }

  let message = "📝 УПРАВЛЕНИЕ НАПРАВЛЕНИЯМИ\n\n";
  state.directions.forEach((dir, idx) => {
    const count = state.events.filter((e) => e.directionId === dir.id).length;
    message += `${idx + 1}. ${dir.name} (занятий: ${count})\n`;
  });
  message += "\n━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "Действия:\n";
  message += "• Введите номер для РЕДАКТИРОВАНИЯ\n";
  message += "• Номер с минусом (-3) для УДАЛЕНИЯ\n";
  message += "• 0 для отмены";

  const choice = prompt(message, "0");
  if (!choice || choice === "0") return;

  if (choice.startsWith("-")) {
    const idx = parseInt(choice.substring(1)) - 1;
    if (idx < 0 || idx >= state.directions.length) {
      toast("WARN", "⚠️", "Неверный номер");
      return;
    }
    deleteDirection(idx);
    return;
  }

  const idx = parseInt(choice) - 1;
  if (idx < 0 || idx >= state.directions.length) {
    toast("WARN", "⚠️", "Неверный номер");
    return;
  }

  editDirection(idx);
}

function deleteDirection(idx) {
  const dir = state.directions[idx];

  const affectedCount = state.events.filter(
    (e) => e.directionId === dir.id,
  ).length;

  if (affectedCount > 0) {
    const ok = window.confirm(
      `❌ Удалить направление "${dir.name}"?\n\n` +
        `Это повлияет на ${affectedCount} занятий.\n` +
        `Направление будет заменено на первое оставшееся.`,
    );
    if (!ok) return;
  }

  const remaining = state.directions.filter((_, i) => i !== idx);
  const replacementId = remaining[0]?.id || "";

  state.events.forEach((ev) => {
    if (ev.directionId === dir.id) ev.directionId = replacementId;
  });

  state.directions.splice(idx, 1);

  pushHistory(`🗑️ Удалено направление: ${dir.name}`);
  saveState();
  renderAll();
  toast("OK", "Удалено", `Направление "${dir.name}" удалено`);

  renderDirSelect(replacementId);
}

function editDirection(idx) {
  const dir = state.directions[idx];

  const details = document.getElementById("dirDetails");
  const summary = document.getElementById("dirDetailsSummary");
  const createMode = document.getElementById("dirCreateMode");
  const editMode = document.getElementById("dirEditMode");

  summary.textContent = `✏️ Редактирование: ${dir.name}`;
  createMode.style.display = "none";
  editMode.style.display = "block";
  details.open = true;

  const editName = document.getElementById("editDirName");
  const editColor = document.getElementById("editDirColor");
  editName.value = dir.name;
  editColor.value = dir.color;

  const btnSave = document.getElementById("btnSaveEditDir");
  const btnCancel = document.getElementById("btnCancelEditDir");

  btnSave.onclick = () => {
    const newName = editName.value.trim();
    if (!newName) {
      toast("WARN", "⚠️", "Укажите название");
      return;
    }

    dir.name = newName;
    dir.color = editColor.value;

    pushHistory(`✏️ Изменено направление: ${newName}`);
    saveState();
    renderAll();
    toast("OK", "Сохранено", `Направление обновлено`);

    resetDirDetailsMode();
    renderDirSelect(dir.id);
  };

  btnCancel.onclick = () => {
    resetDirDetailsMode();
  };
}

// --- НАЧАЛО НОВОЙ ФУНКЦИИ ---
// Помести это в app.js ВНЕ (до или после) bootstrapCore, но не внутри неё.
function initLogoSync() {
  console.log('Initializing logo sync...');
  
  const controls = [
    {
      slider: "logoTileSize",
      num: "logoTileSizeNum",
      param: "tileSize",
      min: 20,
      max: 400,
      unit: "px",
    },
    {
      slider: "logoHorizontalGap",
      num: "logoHorizontalGapNum",
      val: "logoHorizontalGapVal",
      param: "horizontalGap",
      min: 0,
      max: 800,
      unit: "px",
    },
    {
      slider: "logoVerticalGap",
      num: "logoVerticalGapNum",
      val: "logoVerticalGapVal",
      param: "verticalGap",
      min: 0,
      max: 800,
      unit: "px",
    },
    {
      slider: "logoRotation",
      num: "logoRotationNum",
      val: "logoRotationVal",
      param: "rotation",
      min: -180,
      max: 180,
      unit: "°",
    },
    {
      slider: "logoOpacity",
      num: "logoOpacityNum",  // Исправлено: теперь это input, а не span
      val: "logoOpacityVal",  // Это span для отображения
      param: "opacity",
      min: 0,
      max: 100,
      unit: "%",
    },
    {
      slider: "logoTileOffsetX",
      num: "logoTileOffsetXNum",
      param: "tileOffsetX",
      min: -2000,
      max: 2000,
      unit: "px",
    },
    {
      slider: "logoTileOffsetY",
      num: "logoTileOffsetYNum",
      param: "tileOffsetY",
      min: -2000,
      max: 2000,
      unit: "px",
    },
  ];

  controls.forEach((control) => {
    const slider = document.getElementById(control.slider);
    const numInput = document.getElementById(control.num);
    const valOutput = control.val ? document.getElementById(control.val) : null;

    console.log(`Control ${control.param}:`, { slider, numInput, valOutput });

    if (!slider && !numInput) {
      console.warn(`Elements not found for control: ${control.param}`);
      return;
    }

    function updateValue(value, source) {
      console.log(`updateValue called from ${source}:`, value, 'for', control.param);
      
      // Преобразуем значение с учетом ограничений
      let numValue = Number(value);
      if (isNaN(numValue)) {
        console.warn(`Invalid value for ${control.param}:`, value);
        numValue = control.min;
      }
      
      numValue = clamp(Math.round(numValue), control.min, control.max);
      console.log(`Normalized value for ${control.param}:`, numValue);

      // Обновляем числовое поле (только если это INPUT элемент)
      if (numInput && numInput.tagName === "INPUT") {
        // Проверяем, чтобы не зациклиться
        if (Number(numInput.value) !== numValue) {
          numInput.value = numValue;
          console.log(`Updated number input for ${control.param} to:`, numValue);
        }
      } else if (numInput && control.num === "logoOpacityNum") {
        // Для logoOpacityNum это input
        numInput.value = numValue;
      }

      // Обновляем слайдер (только если значение изменилось)
      if (slider && Number(slider.value) !== numValue) {
        slider.value = numValue;
        console.log(`Updated slider for ${control.param} to:`, numValue);
      }

      // Обновляем отображаемое значение (если есть элемент для вывода)
      if (valOutput) {
        valOutput.textContent = `${numValue}${control.unit}`;
        console.log(`Updated value display for ${control.param} to:`, numValue + control.unit);
      }

      // Обновляем состояние
      if (state.settings.logo[control.param] !== numValue) {
        state.settings.logo[control.param] = numValue;
        console.log(`Updated state for ${control.param} to:`, numValue);
        
        // Очищаем кэш плиток
        if (window.clearTileBlobCache) {
          console.log('Clearing tile cache');
          window.clearTileBlobCache();
        }
        
        // Обновляем логотип
        updateLogoIfNeeded();
        
        // Сохраняем состояние
        saveState(true);
        console.log(`Saved state for ${control.param}`);
      } else {
        console.log(`Value for ${control.param} unchanged, skipping update.`);
      }
    }

    // Обработчик для слайдера
    if (slider) {
      // Удаляем старый обработчик, если есть
      slider.removeEventListener("input", slider._logoHandler);
      
      // Создаем новый обработчик
      slider._logoHandler = function() {
        console.log(`Slider ${control.param} changed:`, this.value);
        updateValue(this.value, 'slider');
      };
      
      slider.addEventListener("input", slider._logoHandler);
      console.log(`Added handler for slider ${control.slider}`);
    }

    // Обработчик для числового поля (только для input элементов)
    if (numInput && numInput.tagName === "INPUT") {
      // Удаляем старый обработчик, если есть
      numInput.removeEventListener("input", numInput._logoHandler);
      
      // Создаем новый обработчик
      numInput._logoHandler = function() {
        console.log(`Number input ${control.param} changed:`, this.value);
        updateValue(this.value, 'number-input');
      };
      
      numInput.addEventListener("input", numInput._logoHandler);
      console.log(`Added handler for number input ${control.num}`);
    }
    
    // Также добавляем обработчик изменения для select элементов
    if (numInput && numInput.tagName === "SELECT") {
      numInput.removeEventListener("change", numInput._logoHandler);
      numInput._logoHandler = function() {
        console.log(`Select ${control.param} changed:`, this.value);
        updateValue(this.value, 'select');
      };
      numInput.addEventListener("change", numInput._logoHandler);
    }
  });

  console.log('Logo sync initialization complete.');
  
  // Инициализируем значения при первом запуске
  syncInitialValues();
}

function syncInitialValues() {
  console.log('Syncing initial logo values...');
  
  const lg = state.settings.logo || {};
  
  // Синхронизируем все значения из состояния в UI
  if (logoTileSize && lg.tileSize !== undefined) {
    logoTileSize.value = lg.tileSize;
  }
  if (logoTileSizeNum && lg.tileSize !== undefined) {
    logoTileSizeNum.value = lg.tileSize;
  }
  
  if (logoHorizontalGap && lg.horizontalGap !== undefined) {
    logoHorizontalGap.value = lg.horizontalGap;
  }
  if (logoHorizontalGapNum && lg.horizontalGap !== undefined) {
    logoHorizontalGapNum.value = lg.horizontalGap;
  }
  if (logoHorizontalGapVal && lg.horizontalGap !== undefined) {
    logoHorizontalGapVal.textContent = `${lg.horizontalGap}px`;
  }
  
  if (logoVerticalGap && lg.verticalGap !== undefined) {
    logoVerticalGap.value = lg.verticalGap;
  }
  if (logoVerticalGapNum && lg.verticalGap !== undefined) {
    logoVerticalGapNum.value = lg.verticalGap;
  }
  if (logoVerticalGapVal && lg.verticalGap !== undefined) {
    logoVerticalGapVal.textContent = `${lg.verticalGap}px`;
  }
  
  if (logoRotation && lg.rotation !== undefined) {
    logoRotation.value = lg.rotation;
  }
  if (logoRotationNum && lg.rotation !== undefined) {
    logoRotationNum.value = lg.rotation;
  }
  if (logoRotationVal && lg.rotation !== undefined) {
    logoRotationVal.textContent = `${lg.rotation}°`;
  }
  
  if (logoOpacity && lg.opacity !== undefined) {
    logoOpacity.value = lg.opacity;
  }
  if (logoOpacityNum && lg.opacity !== undefined) {
    logoOpacityNum.value = lg.opacity;
  }
  if (logoOpacityVal && lg.opacity !== undefined) {
    logoOpacityVal.textContent = `${lg.opacity}%`;
  }
  
  if (logoTileOffsetX && lg.tileOffsetX !== undefined) {
    logoTileOffsetX.value = lg.tileOffsetX;
  }
  if (logoTileOffsetXNum && lg.tileOffsetX !== undefined) {
    logoTileOffsetXNum.value = lg.tileOffsetX;
  }
  
  if (logoTileOffsetY && lg.tileOffsetY !== undefined) {
    logoTileOffsetY.value = lg.tileOffsetY;
  }
  if (logoTileOffsetYNum && lg.tileOffsetY !== undefined) {
    logoTileOffsetYNum.value = lg.tileOffsetY;
  }
  
  console.log('Initial logo values synced.');
}

// Также добавьте эту вспомогательную функцию для обновления логотипа
let logoUpdateDebounceTimer;

function updateLogoAndSave() {
  console.log("Обновление логотипа...");
  
  // Принудительно пересоздаем логотип
  applyLogo();
  
  // Синхронизируем предпросмотр
  syncLogoPreview();
  
  // Сохраняем состояние
  scheduleAutoSave("logo updated");
  
  // Перерисовываем если нужно
  setTimeout(() => {
    markGeometryDirty();
  }, 100);
}


// Обновленная функция syncLogoLayoutFromState для полной синхронизации
function syncLogoLayoutFromState() {
  const lg = state.settings.logo || {};

  console.log("Syncing logo layout from state:", lg);

  // Устанавливаем CSS переменные
  document.documentElement.style.setProperty('--logo-tile-size', `${lg.tileSize || 140}px`);
  document.documentElement.style.setProperty('--logo-offset-x', `${lg.tileOffsetX || 0}px`);
  document.documentElement.style.setProperty('--logo-offset-y', `${lg.tileOffsetY || 0}px`);
  document.documentElement.style.setProperty('--logo-opacity', `${(lg.opacity || 12) / 100}`);
  document.documentElement.style.setProperty('--logo-color', lg.color || "#0ea5e9");

  // 1. Синхронизация выпадающего списка вариантов логотипа
  updateLogoVariantOptions();

  // 2. Основной режим отображения
  if (logoLayout) {
    const layoutValue = lg.layout || "center";
    logoLayout.value = layoutValue;
    
    // Добавляем обработчик изменения, если его еще нет
    if (!logoLayout.hasLayoutChangeHandler) {
      logoLayout.addEventListener('change', function() {
        state.settings.logo.layout = this.value;
        updateLogoAndSave();
        console.log("Режим вотермарки изменен на:", this.value);
      });
      logoLayout.hasLayoutChangeHandler = true;
    }
  }

  // 3. Прозрачность - полная синхронизация всех связанных элементов
  if (logoOpacity) {
    const opacityValue = clamp(Math.round(Number(lg.opacity ?? 12)), 0, 100);
    
    // Обновляем все элементы UI
    logoOpacity.value = String(opacityValue);
    if (logoOpacityVal) logoOpacityVal.textContent = `${opacityValue}%`;
    if (logoOpacityNum && logoOpacityNum.tagName === "INPUT") {
      logoOpacityNum.value = String(opacityValue);
    }
    
    // Синхронизируем состояние
    if (state.settings.logo.opacity !== opacityValue) {
      state.settings.logo.opacity = opacityValue;
    }
    
    // Добавляем обработчик изменения прозрачности
    if (!logoOpacity.hasOpacityChangeHandler) {
      logoOpacity.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 0, 100);
        state.settings.logo.opacity = value;
        
        // Обновляем связанные элементы
        if (logoOpacityVal) logoOpacityVal.textContent = `${value}%`;
        if (logoOpacityNum && logoOpacityNum.tagName === "INPUT") {
          logoOpacityNum.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoOpacity.hasOpacityChangeHandler = true;
    }
  }

  // 4. Режим перекрашивания
  if (logoRecolor) {
    const isRecolor = !!lg.recolor;
    logoRecolor.checked = isRecolor;
    
    // Показываем/скрываем блок выбора цвета
    if (logoColorWrap) {
      logoColorWrap.style.display = isRecolor ? "block" : "none";
    }
    
    // Добавляем обработчик изменения режима перекрашивания
    if (!logoRecolor.hasRecolorChangeHandler) {
      logoRecolor.addEventListener('change', function() {
        state.settings.logo.recolor = this.checked;
        
        // Показываем/скрываем блок выбора цвета
        if (logoColorWrap) {
          logoColorWrap.style.display = this.checked ? "block" : "none";
        }
        
        updateLogoAndSave();
        console.log("Режим перекрашивания изменен:", this.checked);
      });
      logoRecolor.hasRecolorChangeHandler = true;
    }
  }

  // 5. Цвет для перекрашивания
  if (logoColor) {
    const colorValue = lg.color || "#0ea5e9";
    
    // Валидация hex-цвета
    if (/^#[0-9A-F]{6}$/i.test(colorValue)) {
      logoColor.value = colorValue;
    } else {
      console.warn(`Некорректный цвет логотипа: ${colorValue}. Используется значение по умолчанию.`);
      state.settings.logo.color = "#0ea5e9";
      logoColor.value = "#0ea5e9";
    }
    
    // Добавляем обработчик изменения цвета
    if (!logoColor.hasColorChangeHandler) {
      logoColor.addEventListener('change', function() {
        state.settings.logo.color = this.value;
        updateLogoAndSave();
        console.log("Цвет логотипа изменен:", this.value);
      });
      logoColor.hasColorChangeHandler = true;
    }
  }

  // 6. Размер плитки - синхронизация слайдера и числового поля
  if (logoTileSize || logoTileSizeNum) {
    const tileSizeValue = clamp(Math.round(Number(lg.tileSize ?? 140)), 20, 400);
    
    if (logoTileSize) logoTileSize.value = String(tileSizeValue);
    if (logoTileSizeNum && logoTileSizeNum.tagName === "INPUT") {
      logoTileSizeNum.value = String(tileSizeValue);
    }
    
    // Обновляем состояние
    if (state.settings.logo.tileSize !== tileSizeValue) {
      state.settings.logo.tileSize = tileSizeValue;
    }
    
    // Добавляем обработчик изменения размера плитки
    if (logoTileSize && !logoTileSize.hasTileSizeChangeHandler) {
      logoTileSize.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 20, 400);
        state.settings.logo.tileSize = value;
        
        if (logoTileSizeNum && logoTileSizeNum.tagName === "INPUT") {
          logoTileSizeNum.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoTileSize.hasTileSizeChangeHandler = true;
    }
    
    if (logoTileSizeNum && logoTileSizeNum.tagName === "INPUT" && !logoTileSizeNum.hasTileSizeNumChangeHandler) {
      logoTileSizeNum.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 20, 400);
        state.settings.logo.tileSize = value;
        
        if (logoTileSize) {
          logoTileSize.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoTileSizeNum.hasTileSizeNumChangeHandler = true;
    }
  }

  // 7. Горизонтальный зазор - синхронизация всех элементов
  if (logoHorizontalGap || logoHorizontalGapNum || logoHorizontalGapVal) {
    const gapValue = clamp(Math.round(Number(lg.horizontalGap ?? 180)), 0, 800);
    
    if (logoHorizontalGap) logoHorizontalGap.value = String(gapValue);
    if (logoHorizontalGapNum && logoHorizontalGapNum.tagName === "INPUT") {
      logoHorizontalGapNum.value = String(gapValue);
    }
    if (logoHorizontalGapVal) {
      logoHorizontalGapVal.textContent = `${gapValue}px`;
    }
    
    // Синхронизируем состояние
    if (state.settings.logo.horizontalGap !== gapValue) {
      state.settings.logo.horizontalGap = gapValue;
    }
    
    // Добавляем обработчик изменения горизонтального зазора
    if (logoHorizontalGap && !logoHorizontalGap.hasHorizontalGapChangeHandler) {
      logoHorizontalGap.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 0, 800);
        state.settings.logo.horizontalGap = value;
        
        if (logoHorizontalGapNum && logoHorizontalGapNum.tagName === "INPUT") {
          logoHorizontalGapNum.value = String(value);
        }
        if (logoHorizontalGapVal) {
          logoHorizontalGapVal.textContent = `${value}px`;
        }
        
        updateLogoAndSave();
      });
      logoHorizontalGap.hasHorizontalGapChangeHandler = true;
    }
    
    if (logoHorizontalGapNum && logoHorizontalGapNum.tagName === "INPUT" && !logoHorizontalGapNum.hasHorizontalGapNumChangeHandler) {
      logoHorizontalGapNum.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 0, 800);
        state.settings.logo.horizontalGap = value;
        
        if (logoHorizontalGap) {
          logoHorizontalGap.value = String(value);
        }
        if (logoHorizontalGapVal) {
          logoHorizontalGapVal.textContent = `${value}px`;
        }
        
        updateLogoAndSave();
      });
      logoHorizontalGapNum.hasHorizontalGapNumChangeHandler = true;
    }
  }

  // 8. Вертикальный зазор - синхронизация всех элементов
  if (logoVerticalGap || logoVerticalGapNum || logoVerticalGapVal) {
    const gapValue = clamp(Math.round(Number(lg.verticalGap ?? 180)), 0, 800);
    
    if (logoVerticalGap) logoVerticalGap.value = String(gapValue);
    if (logoVerticalGapNum && logoVerticalGapNum.tagName === "INPUT") {
      logoVerticalGapNum.value = String(gapValue);
    }
    if (logoVerticalGapVal) {
      logoVerticalGapVal.textContent = `${gapValue}px`;
    }
    
    // Синхронизируем состояние
    if (state.settings.logo.verticalGap !== gapValue) {
      state.settings.logo.verticalGap = gapValue;
    }
    
    // Добавляем обработчик изменения вертикального зазора
    if (logoVerticalGap && !logoVerticalGap.hasVerticalGapChangeHandler) {
      logoVerticalGap.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 0, 800);
        state.settings.logo.verticalGap = value;
        
        if (logoVerticalGapNum && logoVerticalGapNum.tagName === "INPUT") {
          logoVerticalGapNum.value = String(value);
        }
        if (logoVerticalGapVal) {
          logoVerticalGapVal.textContent = `${value}px`;
        }
        
        updateLogoAndSave();
      });
      logoVerticalGap.hasVerticalGapChangeHandler = true;
    }
    
    if (logoVerticalGapNum && logoVerticalGapNum.tagName === "INPUT" && !logoVerticalGapNum.hasVerticalGapNumChangeHandler) {
      logoVerticalGapNum.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), 0, 800);
        state.settings.logo.verticalGap = value;
        
        if (logoVerticalGap) {
          logoVerticalGap.value = String(value);
        }
        if (logoVerticalGapVal) {
          logoVerticalGapVal.textContent = `${value}px`;
        }
        
        updateLogoAndSave();
      });
      logoVerticalGapNum.hasVerticalGapNumChangeHandler = true;
    }
  }

  // 9. Поворот - синхронизация всех элементов
  if (logoRotation || logoRotationNum || logoRotationVal) {
    const rotationValue = clamp(Math.round(Number(lg.rotation ?? 0)), -180, 180);
    
    if (logoRotation) logoRotation.value = String(rotationValue);
    if (logoRotationNum && logoRotationNum.tagName === "INPUT") {
      logoRotationNum.value = String(rotationValue);
    }
    if (logoRotationVal) {
      logoRotationVal.textContent = `${rotationValue}°`;
    }
    
    // Синхронизируем состояние
    if (state.settings.logo.rotation !== rotationValue) {
      state.settings.logo.rotation = rotationValue;
    }
    
    // Добавляем обработчик изменения поворота
    if (logoRotation && !logoRotation.hasRotationChangeHandler) {
      logoRotation.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), -180, 180);
        state.settings.logo.rotation = value;
        
        if (logoRotationNum && logoRotationNum.tagName === "INPUT") {
          logoRotationNum.value = String(value);
        }
        if (logoRotationVal) {
          logoRotationVal.textContent = `${value}°`;
        }
        
        updateLogoAndSave();
      });
      logoRotation.hasRotationChangeHandler = true;
    }
    
    if (logoRotationNum && logoRotationNum.tagName === "INPUT" && !logoRotationNum.hasRotationNumChangeHandler) {
      logoRotationNum.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), -180, 180);
        state.settings.logo.rotation = value;
        
        if (logoRotation) {
          logoRotation.value = String(value);
        }
        if (logoRotationVal) {
          logoRotationVal.textContent = `${value}°`;
        }
        
        updateLogoAndSave();
      });
      logoRotationNum.hasRotationNumChangeHandler = true;
    }
  }

  // 10. Смещение по X - синхронизация слайдера и числового поля
  if (logoTileOffsetX || logoTileOffsetXNum) {
    const offsetValue = clamp(Math.round(Number(lg.tileOffsetX ?? 0)), -2000, 2000);
    
    if (logoTileOffsetX) logoTileOffsetX.value = String(offsetValue);
    if (logoTileOffsetXNum && logoTileOffsetXNum.tagName === "INPUT") {
      logoTileOffsetXNum.value = String(offsetValue);
    }
    
    // Синхронизируем состояние
    if (state.settings.logo.tileOffsetX !== offsetValue) {
      state.settings.logo.tileOffsetX = offsetValue;
    }
    
    // Добавляем обработчик изменения смещения X
    if (logoTileOffsetX && !logoTileOffsetX.hasTileOffsetXChangeHandler) {
      logoTileOffsetX.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), -2000, 2000);
        state.settings.logo.tileOffsetX = value;
        
        if (logoTileOffsetXNum && logoTileOffsetXNum.tagName === "INPUT") {
          logoTileOffsetXNum.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoTileOffsetX.hasTileOffsetXChangeHandler = true;
    }
    
    if (logoTileOffsetXNum && logoTileOffsetXNum.tagName === "INPUT" && !logoTileOffsetXNum.hasTileOffsetXNumChangeHandler) {
      logoTileOffsetXNum.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), -2000, 2000);
        state.settings.logo.tileOffsetX = value;
        
        if (logoTileOffsetX) {
          logoTileOffsetX.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoTileOffsetXNum.hasTileOffsetXNumChangeHandler = true;
    }
  }

  // 11. Смещение по Y - синхронизация слайдера и числового поля
  if (logoTileOffsetY || logoTileOffsetYNum) {
    const offsetValue = clamp(Math.round(Number(lg.tileOffsetY ?? 0)), -2000, 2000);
    
    if (logoTileOffsetY) logoTileOffsetY.value = String(offsetValue);
    if (logoTileOffsetYNum && logoTileOffsetYNum.tagName === "INPUT") {
      logoTileOffsetYNum.value = String(offsetValue);
    }
    
    // Синхронизируем состояние
    if (state.settings.logo.tileOffsetY !== offsetValue) {
      state.settings.logo.tileOffsetY = offsetValue;
    }
    
    // Добавляем обработчик изменения смещения Y
    if (logoTileOffsetY && !logoTileOffsetY.hasTileOffsetYChangeHandler) {
      logoTileOffsetY.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), -2000, 2000);
        state.settings.logo.tileOffsetY = value;
        
        if (logoTileOffsetYNum && logoTileOffsetYNum.tagName === "INPUT") {
          logoTileOffsetYNum.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoTileOffsetY.hasTileOffsetYChangeHandler = true;
    }
    
    if (logoTileOffsetYNum && logoTileOffsetYNum.tagName === "INPUT" && !logoTileOffsetYNum.hasTileOffsetYNumChangeHandler) {
      logoTileOffsetYNum.addEventListener('input', function() {
        const value = clamp(Math.round(Number(this.value)), -2000, 2000);
        state.settings.logo.tileOffsetY = value;
        
        if (logoTileOffsetY) {
          logoTileOffsetY.value = String(value);
        }
        
        updateLogoAndSave();
      });
      logoTileOffsetYNum.hasTileOffsetYNumChangeHandler = true;
    }
  }

  // 12. Включен/выключен
  if (logoEnabled) {
    const isEnabled = !!lg.enabled;
    logoEnabled.checked = isEnabled;
    
    // Добавляем обработчик изменения состояния включения
    if (!logoEnabled.hasEnabledChangeHandler) {
      logoEnabled.addEventListener('change', function() {
        state.settings.logo.enabled = this.checked;
        updateLogoAndSave();
        console.log("Логотип включен:", this.checked);
      });
      logoEnabled.hasEnabledChangeHandler = true;
    }
  }

  // 13. Обновляем UI загрузки файла
  const logoUploadWrap = document.getElementById("logoUploadWrap");
  if (logoUploadWrap) {
    const currentVariant = Number(logoVariant?.value || lg.variant || 1);
    logoUploadWrap.style.display = currentVariant === 3 ? "block" : "none";
  }

  // 14. Запускаем обновление логотипа
  setTimeout(() => {
    updateLogoIfNeeded();
    console.log("Logo layout sync complete");
  }, 10);
}

// Вспомогательная функция для обновления списка вариантов логотипа
function updateLogoVariantOptions() {
  const lg = state.settings.logo || {};
  const logoVariant = document.getElementById('logoVariant');
  
  if (!logoVariant) {
    console.warn("Элемент logoVariant не найден");
    return;
  }
  
  // Сохраняем текущее выбранное значение
  const currentValue = logoVariant.value;
  const scrollTop = logoVariant.scrollTop;
  
  // Очищаем список
  logoVariant.innerHTML = '';
  
  // Определяем доступные варианты
  const variants = [
    { 
      value: '1', 
      label: 'Логотип 1',
      description: 'Основной логотип'
    },
    { 
      value: '2', 
      label: 'Логотип 2',
      description: 'Альтернативный логотип'
    }
  ];
  
  // Добавляем вариант для загруженного файла, если он есть
  const hasUploadedFile = !!lg.uploadedFileData;
  if (hasUploadedFile) {
    variants.push({
      value: '3',
      label: 'Загруженный файл',
      description: 'Пользовательский логотип',
      isCustom: true
    });
  }
  
  // Создаем элементы списка
  variants.forEach(variant => {
    const option = document.createElement('option');
    option.value = variant.value;
    option.textContent = variant.label;
    
    // Добавляем подсказку
    if (variant.description) {
      option.title = variant.description;
    }
    
    // Если вариант 3, но файл не загружен, делаем его недоступным
    if (variant.value === '3' && !hasUploadedFile) {
      option.disabled = true;
      option.textContent += ' (не загружен)';
    }
    
    logoVariant.appendChild(option);
  });
  
  // Восстанавливаем выбранное значение или выбираем корректный вариант
  let targetValue = currentValue;
  
  // Если выбран вариант 3, но файл не загружен, переключаем на вариант 1
  if (currentValue === '3' && !hasUploadedFile) {
    targetValue = '1';
    state.settings.logo.variant = 1;
    console.log("Вариант 3 выбран, но файл не загружен. Переключено на вариант 1.");
  }
  
  // Если целевого значения нет в списке (например, было выбрано 3, но его убрали)
  const optionExists = Array.from(logoVariant.options).some(opt => opt.value === targetValue);
  if (!optionExists && logoVariant.options.length > 0) {
    targetValue = logoVariant.options[0].value;
  }
  
  // Устанавливаем значение
  logoVariant.value = targetValue;
  
  // Восстанавливаем позицию прокрутки
  if (logoVariant.value === currentValue) {
    logoVariant.scrollTop = scrollTop;
  }
  
  // Добавляем обработчик изменения, если его еще нет
  if (!logoVariant.hasLogoChangeHandler) {
    logoVariant.addEventListener('change', function() {
      const newVariant = Number(this.value);
      state.settings.logo.variant = newVariant;
      
      // Обновляем видимость блока загрузки файла
      const logoUploadWrap = document.getElementById("logoUploadWrap");
      if (logoUploadWrap) {
        logoUploadWrap.style.display = newVariant === 3 ? "block" : "none";
      }
      
      // Сохраняем изменения
      updateLogoAndSave();
      console.log(`Вариант логотипа изменен на: ${newVariant}`);
    });
    
    logoVariant.hasLogoChangeHandler = true;
  }
  
  console.log("Logo variant options updated. Current variant:", targetValue);
}

function resetDirDetailsMode() {
  const details = document.getElementById("dirDetails");
  const summary = document.getElementById("dirDetailsSummary");
  const createMode = document.getElementById("dirCreateMode");
  const editMode = document.getElementById("dirEditMode");

  summary.textContent = "➕ Создать новое направление";
  createMode.style.display = "block";
  editMode.style.display = "none";
  details.open = false;
}


function bootstrapCore() {
  loadState();
  state.version = 13;
  hardenState();

  updateUndoRedoButtons();
  renderDirSwatches();

  if (!$("schedule")) {
    console.error("Элемент #schedule не найден!");
    toast("ERR", "Ошибка", "Не найден элемент таблицы");
    return;
  }

  // Добавляем стили для экспорта (должно быть перед инициализацией логотипа)
  addExportStyles();

  // Инициализация логотипа - ПЕРЕД applyTheme()
  ensureLogoLayer();
  
  // Применяем тему
  applyTheme();
  
  // Настраиваем обработчики числовых полей логотипа
  setupLogoNumberInputs();
  
  // Инициализация слайдеров
  initLogoSync();
  
  // Синхронизируем начальные значения
  syncInitialValues();
  
  // Принудительное обновление логотипа
  setTimeout(() => {
    applyLogo();
    console.log("Логотип инициализирован");
  }, 100);
  
  // Применяем тему и рендерим
  renderAll();

  // Инициализируем обработчики событий для логотипа
  initLogoEventHandlers();

  toast("OK", "Готово", "Данные загружены. Автосохранение включено.");

  initErrorHandling();
}

// Добавляем CSS-стили для экспорта
function addExportStyles() {
  if (document.querySelector('#export-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'export-styles';
  style.textContent = `
    .export-mode {
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    .export-mode .schedule {
      overflow: hidden !important;
    }
    .export-mode .schedule-wrap {
      overflow: hidden !important;
    }
    .export-mode::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    .export-mode * {
      box-sizing: border-box !important;
    }
    #logoLayer.export-logo {
      z-index: 1 !important;
    }
  `;
  document.head.appendChild(style);
}

// Инициализация обработчиков событий для логотипа
function initLogoEventHandlers() {
  // Добавляем обработчик изменения размера окна для обновления логотипа
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      applyLogo();
    }, 250);
  });

  // Добавляем обработчик для изменения ориентации устройства
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      applyLogo();
    }, 300);
  });
}

// Обновленная функция waitForResources с улучшенной обработкой изображений
async function waitForResources(element, timeout = 2000, checkInterval = 100) {
  const startTime = Date.now();
  const resources = [];

  // Ждем загрузки обычных изображений
  const images = element.querySelectorAll("img");
  images.forEach((img) => {
    if (!img.complete) {
      resources.push(
        new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        }),
      );
    }
  });

  // Ждем загрузки фоновых изображений и масок
  const elementsWithBg = element.querySelectorAll('[style*="background"], [style*="mask"]');
  elementsWithBg.forEach((el) => {
    const style = getComputedStyle(el);
    const bg = style.backgroundImage;
    const mask = style.maskImage || style.webkitMaskImage;
    
    if (bg && bg !== "none" && !bg.includes("linear-gradient") && !bg.includes("radial-gradient")) {
      resources.push(new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        
        // Извлекаем URL из background-image
        const urlMatch = bg.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          img.src = urlMatch[1];
        } else {
          resolve();
        }
      }));
    }
    
    if (mask && mask !== "none") {
      resources.push(new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        
        // Извлекаем URL из mask-image
        const urlMatch = mask.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          img.src = urlMatch[1];
        } else {
          resolve();
        }
      }));
    }
  });

  // Ждем загрузки шрифтов
  if (document.fonts && document.fonts.ready) {
    resources.push(document.fonts.ready);
  }

  // Ожидаем загрузки всех ресурсов с таймаутом
  try {
    await Promise.race([
      Promise.allSettled(resources),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Таймаут загрузки ресурсов")), timeout)
      )
    ]);
  } catch (e) {
    console.warn("Не все ресурсы загрузились:", e.message);
  }

  // Даем браузеру время на отрисовку
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  // Проверяем, не истекло ли время
  if (Date.now() - startTime > timeout) {
    console.warn("Время ожидания ресурсов истекло");
  }
}

function bootstrap() {
  if (isAuthorized()) {
    authorized = true;

    const appRoot = document.getElementById("appRoot");
    if (appRoot) appRoot.style.display = "";

    const gate = document.getElementById("authGate");
    if (gate) gate.remove();

    bootstrapCore();
    return;
  }

  const startAfterAuth = () => {
    authorized = true;
    bootstrapCore();
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => renderAuthGate(startAfterAuth),
      { once: true },
    );
  } else {
    renderAuthGate(startAfterAuth);
  }
}

try {
  bootstrap();
  const allowedViews = new Set(["timeline", "list", "compact"]);
  if (!allowedViews.has(state.settings.display.cellView)) {
    state.settings.display.cellView = "timeline";
  }
} catch (error) {
  console.error("Ошибка при запуске:", error);

  document.body.innerHTML = `
    <div style="padding: 40px; font-family: sans-serif;">
      <h1 style="color: #ef4444;">Ошибка загрузки приложения</h1>
      <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; overflow: auto;">
        ${error.message}
        ${error.stack}
      </pre>
      <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 6px;">
        Перезагрузить
      </button>
    </div>
  `;
}

const EXPORT_PRESETS = [
  { id: "vk_square", name: "VK пост 1:1 (1080×1080)", w: 1080, h: 1080 },
  { id: "vk_wide", name: "VK обложка 1.91:1 (1200×630)", w: 1200, h: 630 },
  { id: "tg_16_9", name: "Telegram 16:9 (1280×720)", w: 1280, h: 720 },
  { id: "tg_square", name: "Telegram 1:1 (1080×1080)", w: 1080, h: 1080 },
  { id: "a4_portrait", name: "A4 портрет (2480×3508)", w: 2480, h: 3508 },
  { id: "a4_land", name: "A4 альбом (3508×2480)", w: 3508, h: 2480 },
  { id: "auto", name: "Auto (по размеру расписания)", w: 0, h: 0 },
];

function getExportPresetById(id) {
  return EXPORT_PRESETS.find((p) => p.id === id) || EXPORT_PRESETS[0];
}

async function ensureFontsLoaded(timeoutMs = 2500, variantsSet = null) {
  try {
    if (document.fonts) {
      if (variantsSet && variantsSet.size && document.fonts.load) {
        const loads = [];
        for (const key of variantsSet) {
          const [fam, weight, style] = key.split("||");

          loads.push(document.fonts.load(`${style} ${weight} 16px "${fam}"`));
        }
        await Promise.allSettled(loads);
      }

      if (document.fonts.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("fonts timeout")), timeoutMs),
          ),
        ]);
      }
    }
  } catch (_) {}

  await new Promise((r) =>
    requestAnimationFrame(() => requestAnimationFrame(r)),
  );
}

function pickBestFontUrlFromSrc(src) {
  const urls = [];
  const re = /url\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(src || ""))) {
    const raw = m[1].trim().replace(/^["']|["']$/g, "");
    if (!raw || raw.startsWith("data:")) continue;
    urls.push(raw);
  }
  const score = (u) => {
    const p = u.split("?")[0].toLowerCase();
    if (p.endsWith(".woff2")) return 4;
    if (p.endsWith(".woff")) return 3;
    if (p.endsWith(".ttf")) return 2;
    if (p.endsWith(".otf")) return 1;
    return 0;
  };
  urls.sort((a, b) => score(b) - score(a));
  return urls[0] || null;
}

function guessMimeByUrl(u) {
  const p = (u || "").split("?")[0].toLowerCase();
  if (p.endsWith(".woff2")) return "font/woff2";
  if (p.endsWith(".woff")) return "font/woff";
  if (p.endsWith(".ttf")) return "font/ttf";
  if (p.endsWith(".otf")) return "font/otf";
  return "application/octet-stream";
}

function guessFormatByUrl(u) {
  const p = (u || "").split("?")[0].toLowerCase();
  if (p.endsWith(".woff2")) return "woff2";
  if (p.endsWith(".woff")) return "woff";
  if (p.endsWith(".ttf")) return "truetype";
  if (p.endsWith(".otf")) return "opentype";
  return "woff2";
}

async function fetchAsDataUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);

  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }

  const mime = guessMimeByUrl(url);
  return `data:${mime};base64,${btoa(bin)}`;
}

function matchWeight(ruleWeight, wantedWeight) {
  const s = String(ruleWeight || "").trim();

  const parts = s
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter(Number.isFinite);
  if (!parts.length) return wantedWeight === 400;
  if (parts.length === 1) return parts[0] === wantedWeight;
  const [a, b] = parts;
  return wantedWeight >= Math.min(a, b) && wantedWeight <= Math.max(a, b);
}

function absolutizeCssUrls(cssText, baseHref) {
  return String(cssText || "").replace(/url\(([^)]+)\)/g, (m, p1) => {
    const raw = String(p1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (!raw) return m;
    if (/^(data:|blob:|https?:)/i.test(raw)) return m;
    const abs = new URL(raw, baseHref).href;
    return `url("${abs}")`;
  });
}

async function buildFontFaceCssForVariants(
  variantsSet,
  { embedData = false } = {},
) {
  let css = "";
  if (!variantsSet || !variantsSet.size) return css;

  const wanted = Array.from(variantsSet).map((k) => {
    const [fam, weight, style] = k.split("||");
    return {
      fam,
      weight: parseInt(weight, 10) || 400,
      style: (style || "normal").toLowerCase(),
    };
  });

  for (const sheet of Array.from(document.styleSheets)) {
    const baseHref = sheet.href || document.baseURI;

    let rules;
    try {
      rules = sheet.cssRules;
    } catch (_) {
      continue;
    }

    for (const rule of Array.from(rules)) {
      if (rule.type !== CSSRule.FONT_FACE_RULE) continue;

      const fam = _firstFontFamily(rule.style.getPropertyValue("font-family"));
      const style = (
        rule.style.getPropertyValue("font-style") || "normal"
      ).toLowerCase();
      const ruleWeight = rule.style.getPropertyValue("font-weight") || "400";

      const matched = wanted.some((w) => {
        if (w.fam !== fam) return false;
        if (w.style !== style) return false;
        return matchWeight(ruleWeight, w.weight);
      });

      if (!matched) continue;

      css += absolutizeCssUrls(rule.cssText, baseHref) + "\n";
    }
  }

  void embedData;

  return css;
}

function getThemeBgCssColor() {
  const cs = getComputedStyle(document.documentElement);
  let bg = (cs.getPropertyValue("--bg") || "").trim();
  if (!bg) return "#ffffff";
  if (bg.startsWith("#")) return bg;
  return `#${bg}`;
}

function resolveExportBackground(expBg) {
  if (expBg === "transparent") {
    if (expFormat.value === "jpeg") return "#ffffff";
    return null;
  }
  if (expBg === "white") return "#ffffff";
  return getThemeBgCssColor();
}


async function generateWatermarkSVG(state, width, height, metrics = null) {
  const lg = state.settings.logo || {};
  if (!lg.enabled) return "";
  
  const variant = getLogoVariant();
  const layout = lg.layout || "center";
  const opacity = (lg.opacity || 12) / 100;
  const rotation = lg.rotation || 0;
  
  if (layout === "center") {
    // Используем исправленную функцию для центрированного режима
    return generateCenteredLogoSVG(lg, variant, width, height, opacity, rotation, metrics);
  } else if (layout === "tile" || layout === "diagonal") {
    // Используем исправленную функцию для плиточных режимов
    return generateTilePatternSVG(lg, variant, width, height, opacity, rotation);
  } else if (layout === "stamp") {
    // Добавим поддержку режима "stamp" (штамп)
    return generateStampLogoSVG(lg, variant, width, height, opacity, rotation);
  }
  
  return "";
}

function generateStampLogoSVG(lg, variant, width, height, opacity, rotation) {
  const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
  const stampX = width - tileSize - 40; // 40px от правого края
  const stampY = height - tileSize - 40; // 40px от нижнего края
  const halfSize = tileSize / 2;
  
  let logoContent = '';
  const color = lg.recolor ? (lg.color || "#0ea5e9") : "#000000";
  
  if (variant === 1) {
    logoContent = `<circle cx="${stampX + halfSize}" cy="${stampY + halfSize}" r="${halfSize}" fill="${color}" stroke="none"/>`;
  } else if (variant === 2) {
    logoContent = `<rect x="${stampX}" y="${stampY}" width="${tileSize}" height="${tileSize}" fill="${color}" stroke="none"/>`;
  } else if (variant === 3 && lg.uploadedFileData) {
    logoContent = `<image href="${lg.uploadedFileData}" 
                      x="${stampX}" y="${stampY}" 
                      width="${tileSize}" height="${tileSize}"
                      preserveAspectRatio="xMidYMid meet"/>`;
  }
  
  return `<g opacity="${opacity}" transform="rotate(${rotation}, ${stampX + halfSize}, ${stampY + halfSize})">
            ${logoContent}
          </g>`;
}

function generateCenteredLogoSVG(lg, variant, width, height, opacity, rotation, metrics = null) {
  const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
  const halfSize = tileSize / 2;
  
  // Если переданы метрики, используем их для расчета центра области контента
  // Иначе используем центр всего SVG (старая логика)
  let centerX, centerY;
  
  if (metrics && typeof metrics === 'object') {
    // Используем метрики для расчета центра области контента
    centerX = (metrics.timeColWidth || 0) + (metrics.contentWidth || width) / 2;
    centerY = (metrics.dayHeadHeight || 0) + (metrics.contentHeight || height) / 2;
  } else {
    // Старая логика - центр всего изображения
    centerX = width / 2;
    centerY = height / 2;
  }
  
  let logoContent = '';
  const color = lg.recolor ? (lg.color || "#0ea5e9") : "#000000";
  
  if (variant === 1) {
    logoContent = `<circle cx="${centerX}" cy="${centerY}" r="${halfSize}" fill="${color}" stroke="none"/>`;
  } else if (variant === 2) {
    const rectX = centerX - halfSize;
    const rectY = centerY - halfSize;
    logoContent = `<rect x="${rectX}" y="${rectY}" width="${tileSize}" height="${tileSize}" fill="${color}" stroke="none"/>`;
  } else if (variant === 3 && lg.uploadedFileData) {
    const imgX = centerX - halfSize;
    const imgY = centerY - halfSize;
    logoContent = `<image href="${lg.uploadedFileData}" 
                  x="${imgX}" y="${imgY}" 
                  width="${tileSize}" height="${tileSize}"
                  preserveAspectRatio="xMidYMid meet"/>`;
  }
  
  return `<g opacity="${opacity}" transform="rotate(${rotation || 0}, ${centerX}, ${centerY})">
            ${logoContent}
          </g>`;
}

function generateTilePatternSVG(lg, variant, width, height, opacity) {
  const tileSize = lg.tileSize || 140;
  const hGap = lg.horizontalGap || 180;
  const vGap = lg.verticalGap || 180;
  const rotation = lg.rotation || 0;
  const layout = lg.layout || "tile";
  const tileOffsetX = lg.tileOffsetX || 0;
  const tileOffsetY = lg.tileOffsetY || 0;
  
  // Рассчитываем размеры ячейки для повёрнутого изображения
  const angle = Math.abs(rotation) % 180;
  const rad = (angle * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  const requiredSize = tileSize * (sin + cos);
  
  let patternSVG = '';
  
  if (layout === "diagonal") {
    // Существующий код для диагонального режима - оставить без изменений
    const cellW = Math.ceil(requiredSize) + hGap;
    const cellH = Math.ceil(requiredSize) + vGap;
    
    patternSVG = `
    <defs>
      <pattern id="tilePattern" 
               patternUnits="userSpaceOnUse" 
               width="${cellW * 2}" 
               height="${cellH * 2}">
        ${generateLogoImageSVG(lg, variant, cellW/2, cellH/2, tileSize, rotation)}
        ${generateLogoImageSVG(lg, variant, cellW * 1.5, cellH * 1.5, tileSize, rotation)}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tilePattern)" opacity="${opacity}"
          transform="translate(${tileOffsetX}, ${tileOffsetY})"/>`;
  } else if (layout === "tile") {
    // Исправленный код для плиточного режима
    const cellW = Math.ceil(requiredSize) + hGap;
    const cellH = Math.ceil(requiredSize) + vGap;
    
    patternSVG = `
    <defs>
      <pattern id="tilePattern" 
               patternUnits="userSpaceOnUse" 
               width="${cellW}" 
               height="${cellH}"
               x="${tileOffsetX}" 
               y="${tileOffsetY}">
        <g transform="rotate(${rotation}, ${cellW/2}, ${cellH/2})">
          ${generateLogoImageSVG(lg, variant, (cellW - tileSize)/2, (cellH - tileSize)/2, tileSize, 0)}
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tilePattern)" opacity="${opacity}"/>`;
  }
  
  return patternSVG;
}

function generateLogoImageSVG(lg, variant, x, y, size, rotation = 0) {
  const color = lg.recolor ? (lg.color || "#0ea5e9") : "#000000";
  
  if (variant === 1) {
    return `<g transform="translate(${x}, ${y}) rotate(${rotation}, ${size/2}, ${size/2})">
              <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" stroke="none"/>
            </g>`;
  } else if (variant === 2) {
    return `<g transform="translate(${x}, ${y}) rotate(${rotation}, ${size/2}, ${size/2})">
              <rect width="${size}" height="${size}" fill="${color}" stroke="none"/>
            </g>`;
  } else if (variant === 3 && lg.uploadedFileData) {
    return `<g transform="translate(${x}, ${y}) rotate(${rotation}, ${size/2}, ${size/2})">
              <image href="${lg.uploadedFileData}" 
                    width="${size}" height="${size}"
                    preserveAspectRatio="xMidYMid meet"/>
            </g>`;
  }
  
  return '';
}

function removeInteractiveElements(element) {
  const selectors = [
    ".grab",
    ".day-actions",
    "button",
    '[draggable="true"]',
    ".empty-slot",
  ];

  selectors.forEach((selector) => {
    element.querySelectorAll(selector).forEach((el) => {
      el.style.display = "none";
      el.style.visibility = "hidden";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    });
  });
}

async function fallbackCapture(element, background) {
  console.warn("Используем fallback захват");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = element.scrollWidth;
  const height = element.scrollHeight;

  canvas.width = width;
  canvas.height = height;

  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.fillStyle = "#333";
  ctx.font = "12px Arial";
  ctx.fillText("Экспорт не удался, попробуйте снова", 10, 20);

  return canvas;
}

async function captureScheduleCanvas({
  compact = false,
  background = null,
} = {}) {
  if (typeof window.html2canvas !== "function") {
    toast(
      "WARN",
      "Экспорт",
      "html2canvas не найден. Проверьте подключение библиотеки.",
      3000,
    );
    return null;
  }

  const loadingToast = toast("INFO", "Экспорт", "Подготовка к экспорту...", 0);

  // Создаем клон с логотипом
  const { clone, cleanup } = makeExportClone({ compact });
  if (!clone) {
    toast("ERR", "Экспорт", "Не удалось создать клон для экспорта", 3000);
    return null;
  }

  try {
    // Удаляем интерактивные элементы
    removeInteractiveElements(clone);
    
    // Скрываем скроллбары и устанавливаем фиксированные размеры
    clone.style.overflow = 'hidden';
    const scheduleEl = clone.querySelector('.schedule');
    if (scheduleEl) {
      scheduleEl.style.overflow = 'hidden';
    }

    // Получаем настройки логотипа
    const lg = state.settings.logo;
    
    // Получаем метрики клона для правильного позиционирования логотипа
    const metrics = getScheduleMetrics(clone);
    
    // Обновляем логотип в клоне для ВСЕХ режимов
    if (lg.enabled) {
      // Для центрированного режима нужно создать специальный SVG
      if (lg.layout === "center") {
        await applyCenteredLogoToClone(clone, lg, metrics);
      } else {
        // Для остальных режимов используем существующий подход
        await applyTileLogoToClone(clone, lg);
      }
    } else {
      // Скрываем логотип, если он отключен
      const logoLayer = clone.querySelector("#logoLayer");
      const logoMark = clone.querySelector("#logoMark");
      if (logoLayer && logoMark) {
        logoLayer.style.display = "none";
        logoMark.style.display = "none";
      }
    }

    const headEls = Array.from(clone.querySelectorAll(".cell.head"));
    headEls.forEach((el) => {
      el.style.position = "static";
      el.style.top = "auto";
      el.style.zIndex = "auto";
    });

    const changed = hideEmptyTimeRows(clone, true, false);

    // Ждем загрузки всех ресурсов
    await waitForResources(clone, 3000);

    // Получаем метрики для установки точных размеров
    const w = Math.max(100, Math.ceil(metrics.scheduleWidth || 1));
    const h = Math.max(100, Math.ceil(metrics.scheduleHeight || 1));

    clone.style.width = `${w}px`;
    clone.style.height = `${h}px`;
    clone.style.overflow = "hidden";

    // Обновляем стили для экспорта
    clone.style.boxSizing = "border-box";
    clone.style.display = "block";
    
    // Обновляем размеры расписания внутри клона
    if (scheduleEl) {
      scheduleEl.style.width = `${w}px`;
      scheduleEl.style.height = `${h}px`;
      scheduleEl.style.overflow = "hidden";
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const html2canvasOptions = {
      backgroundColor: background,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: w,
      height: h,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 5000,
      removeContainer: true,
      onclone: function (clonedDoc) {
        // В клонированном документе также показываем логотип
        if (lg.enabled) {
          const clonedLogoLayer = clonedDoc.querySelector("#logoLayer");
          const clonedLogoMark = clonedDoc.querySelector("#logoMark");
          if (clonedLogoLayer && clonedLogoMark) {
            // Получаем метрики клонированного документа
            const clonedMetrics = getScheduleMetrics(clonedDoc);
            
            // Применяем логотип с учетом метрик
            if (lg.layout === "center") {
              applyCenteredLogoToClonedDoc(clonedDoc, lg, clonedMetrics);
            } else {
              applyLogoToClonedDoc(clonedDoc, lg);
            }
          }
        }
        
        // Удаляем интерактивные элементы
        removeInteractiveElements(clonedDoc);
        
        // Скрываем скроллбары в клонированном документе
        const clonedSchedule = clonedDoc.querySelector('.schedule');
        if (clonedSchedule) {
          clonedSchedule.style.overflow = 'hidden';
        }
        
        const exportModeEls = clonedDoc.querySelectorAll('.export-mode');
        exportModeEls.forEach(el => {
          el.style.overflow = 'hidden';
        });
      },
    };

    const capturePromise = window.html2canvas(clone, html2canvasOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Таймаут захвата canvas (10 секунд)")),
        10000,
      ),
    );

    const canvas = await Promise.race([capturePromise, timeoutPromise]);

    if (loadingToast && loadingToast.remove) loadingToast.remove();

    toast("OK", "Экспорт", "Изображение готово", 2000);

    return canvas;
  } catch (e) {
    console.error("Ошибка захвата canvas:", e);

    try {
      const fallbackCanvas = await fallbackCapture(clone, background);
      toast("WARN", "Экспорт", "Использован упрощённый экспорт", 3000);
      return fallbackCanvas;
    } catch (fallbackError) {
      console.error("Fallback также не удался:", fallbackError);
      toast(
        "ERR",
        "Экспорт",
        e?.message || "Ошибка при создании изображения",
        3000,
      );
      return null;
    }
  } finally {
    cleanup();
  }
}

function updateLogoCSSVariables() {
  const style = document.documentElement.style;
  
  // Получаем реальные размеры из CSS
  const computedStyle = getComputedStyle(document.documentElement);
  const timeColWidth = computedStyle.getPropertyValue('--timeCol') || '76px';
  const dayHeadHeight = '42px'; // Фиксированная высота заголовков из CSS
  
  // Устанавливаем CSS переменные для логотипа
  style.setProperty('--time-col-width', timeColWidth);
  style.setProperty('--day-head-height', dayHeadHeight);
}

// Вызовите эту функцию при инициализации и при изменении размеров
document.addEventListener('DOMContentLoaded', updateLogoCSSVariables);
window.addEventListener('resize', updateLogoCSSVariables);

async function applyCenteredLogoToClone(clone, lg, metrics) {
  const logoLayer = clone.querySelector("#logoLayer");
  const logoMark = clone.querySelector("#logoMark");
  
  if (!logoLayer || !logoMark) return;
  
  const variant = getLogoVariant();
  const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
  
  // Рассчитываем центр области контента с учетом метрик
  const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
  const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;
  
  // Ограничиваем левую границу, чтобы логотип не заходил за колонку времени
  const leftBoundary = metrics.timeColWidth;
  const rightBoundary = metrics.timeColWidth + metrics.contentWidth;
  const topBoundary = metrics.dayHeadHeight;
  const bottomBoundary = metrics.dayHeadHeight + metrics.contentHeight;
  
  // Рассчитываем позицию с учетом границ
  let left = centerX - tileSize / 2;
  let top = centerY - tileSize / 2;
  
  // Проверяем и корректируем, если логотип выходит за границы
  if (left < leftBoundary) {
    left = leftBoundary;
  }
  if (left + tileSize > rightBoundary) {
    left = rightBoundary - tileSize;
  }
  if (top < topBoundary) {
    top = topBoundary;
  }
  if (top + tileSize > bottomBoundary) {
    top = bottomBoundary - tileSize;
  }
  
  // Если после корректировки логотип все еще не помещается, уменьшаем его размер
  let finalTileSize = tileSize;
  if (rightBoundary - leftBoundary < tileSize) {
    finalTileSize = rightBoundary - leftBoundary;
    left = leftBoundary;
  }
  if (bottomBoundary - topBoundary < tileSize) {
    finalTileSize = Math.min(finalTileSize, bottomBoundary - topBoundary);
    top = topBoundary;
  }
  
  // Устанавливаем границы контейнера для логотипа, чтобы он не выходил за область контента
  const logoContainer = document.createElement('div');
  logoContainer.style.cssText = `
    position: absolute;
    top: ${metrics.dayHeadHeight}px;
    left: ${metrics.timeColWidth}px;
    width: ${metrics.contentWidth}px;
    height: ${metrics.contentHeight}px;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  `;
  
  // Очищаем старый слой логотипа
  logoLayer.innerHTML = '';
  
  // Перемещаем логотип в контейнер
  logoLayer.appendChild(logoContainer);
  logoContainer.appendChild(logoMark);
  
  // Обновляем стили логотипа
  logoLayer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: visible;
    display: block;
  `;
  
  // Сбрасываем и устанавливаем стили логотипа
  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 0;
    opacity: ${(lg.opacity || 12) / 100};
    width: ${finalTileSize}px;
    height: ${finalTileSize}px;
    left: ${left - metrics.timeColWidth}px; // Относительно контейнера
    top: ${top - metrics.dayHeadHeight}px; // Относительно контейнера
    transform: rotate(${lg.rotation || 0}deg);
  `;
  
  const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null);
  
  if (lg.recolor && variant === 3) {
    logoMark.style.backgroundColor = lg.color || "#0ea5e9";
    logoMark.style.webkitMaskImage = `url(${src})`;
    logoMark.style.maskImage = `url(${src})`;
    logoMark.style.webkitMaskRepeat = 'no-repeat';
    logoMark.style.maskRepeat = 'no-repeat';
    logoMark.style.webkitMaskPosition = 'center';
    logoMark.style.maskPosition = 'center';
    logoMark.style.webkitMaskSize = 'contain';
    logoMark.style.maskSize = 'contain';
    logoMark.style.backgroundImage = 'none';
  } else {
    logoMark.style.backgroundImage = `url(${src})`;
    logoMark.style.backgroundRepeat = 'no-repeat';
    logoMark.style.backgroundPosition = 'center';
    logoMark.style.backgroundSize = 'contain';
  }
  
  // Устанавливаем CSS переменные для метрик
  const style = clone.style;
  style.setProperty('--time-col-width', `${metrics.timeColWidth}px`);
  style.setProperty('--day-head-height', `${metrics.dayHeadHeight}px`);
  style.setProperty('--content-width', `${metrics.contentWidth}px`);
  style.setProperty('--content-height', `${metrics.contentHeight}px`);
  
  // Добавляем атрибут data-wm
  logoLayer.setAttribute('data-wm', 'center');
  
  // Принудительно показываем
  logoLayer.style.display = 'block';
  logoMark.style.display = 'block';
  
  // Также добавим CSS-класс для дополнительного контроля
  logoLayer.classList.add('logo-container');
  logoMark.classList.add('logo-image');
  
  // Добавляем CSS для границ
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .logo-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: visible;
    }
    
    .logo-image {
      position: absolute;
      pointer-events: none;
      z-index: 0;
    }
    
    /* Гарантируем, что заголовки и колонка времени закрывают логотип */
    .cell.head, .cell.time {
      background-color: var(--gridHead) !important;
      position: relative !important;
      z-index: 10 !important;
    }
    
    /* Убедимся, что область контента отрезает логотип */
    .schedule-wrap {
      position: relative;
      overflow: hidden;
    }
  `;
  
  clone.appendChild(styleEl);
}

// Вспомогательная функция для применения логотипа в клонированном документе
function applyLogoToClonedDoc(clonedDoc, lg) {
  const clonedLogoLayer = clonedDoc.querySelector("#logoLayer");
  const clonedLogoMark = clonedDoc.querySelector("#logoMark");
  
  if (!clonedLogoLayer || !clonedLogoMark) return;
  
  const variant = getLogoVariant();
  const layout = lg.layout || "center";
  
  // Получаем метрики из клонированного документа
  const metrics = getScheduleMetrics(clonedDoc);
  
  // Показываем слой логотипа
  clonedLogoLayer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    display: block;
  `;
  
  // Сбрасываем стили
  clonedLogoMark.style.cssText = '';
  clonedLogoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${(lg.opacity || 12) / 100};
  `;
  
  if (layout === "center") {
    // Центральный режим
    const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
    
    // Рассчитываем центр области контента
    const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
    const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;
    
    clonedLogoMark.style.cssText += `
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${centerX - tileSize / 2}px;
      top: ${centerY - tileSize / 2}px;
      transform: rotate(${lg.rotation || 0}deg);
    `;
    
    const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null);
    
    if (lg.recolor && variant === 3) {
      clonedLogoMark.style.backgroundColor = lg.color || "#0ea5e9";
      clonedLogoMark.style.webkitMaskImage = `url(${src})`;
      clonedLogoMark.style.maskImage = `url(${src})`;
      clonedLogoMark.style.webkitMaskRepeat = 'no-repeat';
      clonedLogoMark.style.maskRepeat = 'no-repeat';
      clonedLogoMark.style.webkitMaskPosition = 'center';
      clonedLogoMark.style.maskPosition = 'center';
      clonedLogoMark.style.webkitMaskSize = 'contain';
      clonedLogoMark.style.maskSize = 'contain';
    } else {
      clonedLogoMark.style.backgroundImage = `url(${src})`;
      clonedLogoMark.style.backgroundRepeat = 'no-repeat';
      clonedLogoMark.style.backgroundPosition = 'center';
      clonedLogoMark.style.backgroundSize = 'contain';
    }
  }
  else if (layout === "stamp") {
    // Режим штампа
    const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
    
    const stampX = metrics.timeColWidth + metrics.contentWidth - tileSize - 20;
    const stampY = metrics.dayHeadHeight + metrics.contentHeight - tileSize - 20;
    
    clonedLogoMark.style.cssText += `
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${stampX}px;
      top: ${stampY}px;
      transform: rotate(${lg.rotation || 0}deg);
    `;
    
    const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null);
    
    if (lg.recolor && variant === 3) {
      clonedLogoMark.style.backgroundColor = lg.color || "#0ea5e9";
      clonedLogoMark.style.webkitMaskImage = `url(${src})`;
      clonedLogoMark.style.maskImage = `url(${src})`;
      clonedLogoMark.style.webkitMaskRepeat = 'no-repeat';
      clonedLogoMark.style.maskRepeat = 'no-repeat';
      clonedLogoMark.style.webkitMaskPosition = 'center';
      clonedLogoMark.style.maskPosition = 'center';
      clonedLogoMark.style.webkitMaskSize = 'contain';
      clonedLogoMark.style.maskSize = 'contain';
    } else {
      clonedLogoMark.style.backgroundImage = `url(${src})`;
      clonedLogoMark.style.backgroundRepeat = 'no-repeat';
      clonedLogoMark.style.backgroundPosition = 'center';
      clonedLogoMark.style.backgroundSize = 'contain';
    }
  }
  else if (layout === "tile" || layout === "diagonal") {
    // Плиточные режимы
    const tileSize = Math.max(20, Math.min(400, Number(lg.tileSize) || 140));
    const horizontalGap = Number(lg.horizontalGap || 180);
    const verticalGap = Number(lg.verticalGap || 180);
    
    // Позиционируем только в области контента
    clonedLogoMark.style.cssText += `
      left: ${metrics.timeColWidth}px;
      top: ${metrics.dayHeadHeight}px;
      width: ${metrics.contentWidth}px;
      height: ${metrics.contentHeight}px;
    `;
    
    // Получаем data URL для плитки
    const src = window.getTileSrc(
      variant,
      tileSize,
      horizontalGap,
      verticalGap,
      lg.rotation || 0,
      layout,
      lg.recolor ? lg.color : null
    );
    
    if (lg.recolor && variant === 3) {
      clonedLogoMark.style.backgroundColor = lg.color || "#0ea5e9";
      clonedLogoMark.style.webkitMaskImage = `url(${src})`;
      clonedLogoMark.style.maskImage = `url(${src})`;
      clonedLogoMark.style.webkitMaskRepeat = 'repeat';
      clonedLogoMark.style.maskRepeat = 'repeat';
    } else {
      clonedLogoMark.style.backgroundImage = `url(${src})`;
      clonedLogoMark.style.backgroundRepeat = 'repeat';
    }
    
    // Размер паттерна
    if (layout === "diagonal") {
      clonedLogoMark.style.backgroundSize = `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`;
      if (lg.recolor && variant === 3) {
        clonedLogoMark.style.webkitMaskSize = `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`;
        clonedLogoMark.style.maskSize = `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`;
      }
    } else {
      clonedLogoMark.style.backgroundSize = `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;
      if (lg.recolor && variant === 3) {
        clonedLogoMark.style.webkitMaskSize = `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;
        clonedLogoMark.style.maskSize = `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;
      }
    }
    
    // Смещение
    const offsetX = Number(lg.tileOffsetX || 0);
    const offsetY = Number(lg.tileOffsetY || 0);
    clonedLogoMark.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    
    if (lg.recolor && variant === 3) {
      clonedLogoMark.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
      clonedLogoMark.style.maskPosition = `${offsetX}px ${offsetY}px`;
    }
  }
  
  // Принудительно показываем
  clonedLogoLayer.style.display = 'block';
  clonedLogoMark.style.display = 'block';
}

// Новая вспомогательная функция для применения плиточного логотипа к клону
async function applyTileLogoToClone(clone, lg) {
  const logoLayer = clone.querySelector("#logoLayer");
  const logoMark = clone.querySelector("#logoMark");
  
  if (!logoLayer || !logoMark) return;
  
  const variant = getLogoVariant();
  const layout = lg.layout || "center";
  
  // Получаем метрики из клона
  const metrics = getScheduleMetrics(clone);
  
  console.log('Clone logo positioning metrics:', metrics);
  
  // Показываем слой логотипа
  logoLayer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; // В экспорте выше
    overflow: hidden;
    display: block;
  `;
  
  // Сбрасываем стили
  logoMark.style.cssText = '';
  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${(lg.opacity || 12) / 100};
  `;
  
  if (layout === "center") {
    // Центральный режим
    const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
    
    // Рассчитываем центр области контента
    const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
    const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;
    
    logoMark.style.cssText += `
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${centerX - tileSize / 2}px;
      top: ${centerY - tileSize / 2}px;
      transform: rotate(${lg.rotation || 0}deg);
    `;
    
    const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null);
    
    applyLogoStyle(logoMark, src, lg.recolor && variant === 3 ? lg.color : null, false);
  }
  else if (layout === "stamp") {
    // Режим штампа
    const tileSize = Math.max(100, Math.min(400, Number(lg.tileSize) || 140));
    
    const stampX = metrics.timeColWidth + metrics.contentWidth - tileSize - 20;
    const stampY = metrics.dayHeadHeight + metrics.contentHeight - tileSize - 20;
    
    logoMark.style.cssText += `
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${stampX}px;
      top: ${stampY}px;
      transform: rotate(${lg.rotation || 0}deg);
    `;
    
    const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null);
    
    applyLogoStyle(logoMark, src, lg.recolor && variant === 3 ? lg.color : null, false);
  }
  else if (layout === "tile" || layout === "diagonal") {
    // Плиточные режимы
    const tileSize = Math.max(20, Math.min(400, Number(lg.tileSize) || 140));
    const horizontalGap = Number(lg.horizontalGap || 180);
    const verticalGap = Number(lg.verticalGap || 180);
    
    // Позиционируем только в области контента
    logoMark.style.cssText += `
      left: ${metrics.timeColWidth}px;
      top: ${metrics.dayHeadHeight}px;
      width: ${metrics.contentWidth}px;
      height: ${metrics.contentHeight}px;
    `;
    
    // Получаем data URL для плитки
    const src = window.getTileSrc(
      variant,
      tileSize,
      horizontalGap,
      verticalGap,
      lg.rotation || 0,
      layout,
      lg.recolor ? lg.color : null
    );
    
    if (lg.recolor && variant === 3) {
      logoMark.style.backgroundColor = lg.color || "#0ea5e9";
      logoMark.style.webkitMaskImage = `url(${src})`;
      logoMark.style.maskImage = `url(${src})`;
      logoMark.style.webkitMaskRepeat = 'repeat';
      logoMark.style.maskRepeat = 'repeat';
      
      // Размер паттерна
      if (layout === "diagonal") {
        logoMark.style.webkitMaskSize = `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`;
        logoMark.style.maskSize = `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`;
      } else {
        logoMark.style.webkitMaskSize = `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;
        logoMark.style.maskSize = `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;
      }
      
      // Смещение
      const offsetX = Number(lg.tileOffsetX || 0);
      const offsetY = Number(lg.tileOffsetY || 0);
      logoMark.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
      logoMark.style.maskPosition = `${offsetX}px ${offsetY}px`;
    } else {
      logoMark.style.backgroundImage = `url(${src})`;
      logoMark.style.backgroundRepeat = 'repeat';
      
      // Размер паттерна
      if (layout === "diagonal") {
        logoMark.style.backgroundSize = `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`;
      } else {
        logoMark.style.backgroundSize = `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;
      }
      
      // Смещение
      const offsetX = Number(lg.tileOffsetX || 0);
      const offsetY = Number(lg.tileOffsetY || 0);
      logoMark.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    }
  }
  
  // Принудительно показываем
  logoLayer.style.display = 'block';
  logoMark.style.display = 'block';
}

let lastPreview = null;

function makeExportClone({ compact = false } = {}) {
  const node = document.querySelector(".schedule-wrap");
  if (!node) return { clone: null, cleanup: () => {} };

  const wrap = document.createElement("div");
  wrap.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
    opacity: 0;
  `;
  wrap.setAttribute("aria-hidden", "true");

  // Глубокое клонирование с сохранением стилей
  const clone = node.cloneNode(true);
  
  // Копируем инлайн-стили
  const originalStyle = window.getComputedStyle(node);
  clone.style.cssText = originalStyle.cssText;
  
  clone.classList.add("export-mode");
  if (compact) clone.classList.add("compact-export");

  // Устанавливаем позиционирование
  clone.style.position = "static";
  clone.style.left = "";
  clone.style.top = "";
  clone.style.right = "";
  clone.style.bottom = "";
  
  // Получаем реальные размеры содержимого
  const scheduleEl = clone.querySelector('.schedule');
  let contentWidth = node.scrollWidth;
  let contentHeight = node.scrollHeight;
  
  // Если есть schedule элемент, используем его размеры
  if (scheduleEl) {
    contentWidth = Math.max(contentWidth, scheduleEl.scrollWidth);
    contentHeight = Math.max(contentHeight, scheduleEl.scrollHeight);
  }
  
  // Добавляем отступы для безопасности
  contentWidth = Math.max(contentWidth, 100);
  contentHeight = Math.max(contentHeight, 100);
  
  clone.style.width = `${contentWidth}px`;
  clone.style.height = `${contentHeight}px`;
  clone.style.maxWidth = "none";
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.margin = "0";
  clone.style.transform = "none";
  clone.style.boxSizing = "border-box";

  wrap.appendChild(clone);
  document.body.appendChild(wrap);

  return {
    clone,
    cleanup: () => {
      if (wrap.parentNode) {
        wrap.remove();
      }
    },
  };
}

function openExportModal() {
  expPreset.innerHTML = "";
  EXPORT_PRESETS.forEach((p) => {
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.name;
    expPreset.appendChild(o);
  });
  expPreset.value = "vk_square";

  expFormat.value = "png";
  expBg.value = "auto";
  expQuality.value = "92";
  expQualityVal.textContent = "92";
  expPreviewImg.removeAttribute("src");
  lastPreview = null;

  syncExportModalUI();
  exportBackdrop.classList.add("show");
}

function closeExportModal() {
  exportBackdrop.classList.remove("show");
}

function syncExportModalUI() {
  const fmt = expFormat.value;
  expJpegWrap.style.display = fmt === "jpeg" ? "block" : "none";

  const optTransparent = expBg.querySelector('option[value="transparent"]');
  if (!optTransparent) return;

  const isJpeg = fmt === "jpeg";

  optTransparent.hidden = isJpeg;
  optTransparent.disabled = isJpeg;

  if (isJpeg) {
    expBg.dataset.prevBg = expBg.value;
    expBg.value = "white";
  } else {
    expBg.value = expBg.dataset.prevBg || "transparent";
    delete expBg.dataset.prevBg;
  }
}

function getExportOptsFromUI() {
  const preset = getExportPresetById(expPreset.value);
  const fmt = expFormat.value;
  const imageFormat = fmt === "jpeg" ? "image/jpeg" : "image/png";
  const quality =
    fmt === "jpeg"
      ? Math.min(1, Math.max(0.6, Number(expQuality.value || 92) / 100))
      : 1.0;

  const background =
    fmt === "svg" ? null : resolveExportBackground(expBg.value);

  const compact = state.settings.display.cellView === "compact";

  return {
    preset,
    fmt,
    imageFormat,
    quality,
    background,
    compact,
  };
}

function _firstFontFamily(fontFamily) {
  const first = (fontFamily || "").split(",")[0].trim();
  return first.replace(/^["']|["']$/g, "");
}

function isGenericFamily(fam) {
  const f = (fam || "").trim().toLowerCase();
  return (
    !f ||
    f === "serif" ||
    f === "sans-serif" ||
    f === "monospace" ||
    f === "system-ui" ||
    f === "ui-sans-serif" ||
    f === "ui-serif" ||
    f === "ui-monospace" ||
    f === "emoji" ||
    f === "math" ||
    f === "fangsong"
  );
}

function normalizeFontWeight(w) {
  const s = String(w || "")
    .trim()
    .toLowerCase();
  if (!s) return 400;
  if (s === "normal") return 400;
  if (s === "bold") return 700;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : 400;
}

function collectUsedFontVariantsFromDom(rootEl) {
  const set = new Set();
  if (!rootEl) return set;

  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.nodeValue && node.nodeValue.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  let node;
  while ((node = walker.nextNode())) {
    const el = node.parentElement;
    if (!el) continue;

    const cs = getComputedStyle(el);
    const fam = _firstFontFamily(cs.fontFamily);
    if (!fam || isGenericFamily(fam)) continue;

    const weight = normalizeFontWeight(cs.fontWeight);
    const style = (cs.fontStyle || "normal").toLowerCase();

    set.add(`${fam}||${weight}||${style}`);
  }

  return set;
}

async function buildExportPreview() {
  const opts = getExportOptsFromUI();

  toast("OK", "Экспорт", "Генерация предпросмотра…");

  if (opts.fmt === "svg") {
    if (
      typeof htmlToImage === "undefined" ||
      typeof htmlToImage.toSvg !== "function"
    ) {
      toast("WARN", "SVG", "html-to-image не найден (проверь подключение).");
      return;
    }

    const { clone, cleanup } = makeExportClone({ compact: opts.compact });
    if (!clone) {
      toast("ERR", "SVG", "Не найден .schedule-wrap");
      return;
    }

    const uiEls = Array.from(
      clone.querySelectorAll(".grab, .day-actions, button, .empty-slot"),
    );

    const uiPrevDisplay = uiEls.map((el) => el.style.display);
    const uiPrevVis = uiEls.map((el) => el.style.visibility);

    uiEls.forEach((el) => {
      el.style.display = "none";
      el.style.visibility = "hidden";
    });

    const headEls = Array.from(clone.querySelectorAll(".cell.head"));
    const headPrevPos = headEls.map((el) => el.style.position);
    const headPrevTop = headEls.map((el) => el.style.top);
    const headPrevZ = headEls.map((el) => el.style.zIndex);

    let changed = [];

    try {
      changed = hideEmptyTimeRows(clone);

      headEls.forEach((el) => {
        el.style.position = "static";
        el.style.top = "auto";
        el.style.zIndex = "auto";
      });

      const bgColor = getThemeBgCssColor() || "#ffffff";

      const scheduleEl = clone.querySelector(".schedule") || clone;

      const usedVariants = collectUsedFontVariantsFromDom(scheduleEl);

      await ensureFontsLoaded(2500, usedVariants);

      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );

      const w = Math.max(
        1,
        Math.ceil(scheduleEl.scrollWidth || scheduleEl.offsetWidth || 1),
      );
      const h = Math.max(
        1,
        Math.ceil(scheduleEl.scrollHeight || scheduleEl.offsetHeight || 1),
      );

      clone.style.width = `${w}px`;
      clone.style.height = `${h}px`;

      const fontEmbedCSS = await buildFontFaceCssForVariants(usedVariants, {
        embedData: false,
      });

      const dataUrl = await htmlToImage.toSvg(clone, {
        backgroundColor: bgColor,
        width: w,
        height: h,
        pixelRatio: 1,
        cacheBust: true,
        quality: 1.0,
        fontEmbedCSS,
      });

      expPreviewImg.src = dataUrl;
      lastPreview = { dataUrl, ...opts };

      toast("OK", "Экспорт", "Предпросмотр SVG готов.");
    } catch (e) {
      console.error("SVG preview error:", e);
      toast("ERR", "SVG", e?.message || "Ошибка предпросмотра SVG");
    } finally {
      uiEls.forEach((el, i) => {
        el.style.display = uiPrevDisplay[i] || "";
        el.style.visibility = uiPrevVis[i] || "";
      });

      headEls.forEach((el, i) => {
        el.style.position = headPrevPos[i] || "";
        el.style.top = headPrevTop[i] || "";
        el.style.zIndex = headPrevZ[i] || "";
      });

      for (let i = changed.length - 1; i >= 0; i--) {
        const { el, prevDisplay } = changed[i];
        el.style.display = prevDisplay;
      }

      cleanup();
    }

    return;
  }

  const baseCanvas = await captureScheduleCanvas({
    compact: opts.compact,
    background: opts.background,
  });
  if (!baseCanvas) {
    toast("ERR", "Экспорт", "Не удалось создать изображение (canvas).");
    return;
  }

  let outCanvas = baseCanvas;

  if (opts.preset.id !== "auto") {
    const p = opts.preset;
    const target = {
      ...p,
      ...(opts.rotate && p.w && p.h ? { w: p.h, h: p.w } : null),
      rotate: !!opts.rotate,
    };
    outCanvas = createFinalCanvas(baseCanvas, target);
  } else if (opts.rotate) {
    outCanvas = baseCanvas;
  }

  const dataUrl = outCanvas.toDataURL(opts.imageFormat, opts.quality);
  expPreviewImg.src = dataUrl;

  lastPreview = { dataUrl, ...opts };
  toast("OK", "Экспорт", "Предпросмотр готов.");
}

async function downloadFromExportModal() {
  const opts = getExportOptsFromUI();

  const needsRebuild =
    !lastPreview ||
    lastPreview.fmt !== opts.fmt ||
    lastPreview.preset?.id !== opts.preset?.id ||
    lastPreview.imageFormat !== opts.imageFormat ||
    lastPreview.quality !== opts.quality ||
    lastPreview.background !== opts.background ||
    lastPreview.compact !== opts.compact;

  if (needsRebuild) {
    await buildExportPreview();
  }
  if (!lastPreview?.dataUrl) return;

  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);

  if (opts.fmt === "svg") {
    a.download = `schedule-${opts.preset.id}-${stamp}.svg`;
    a.href = lastPreview.dataUrl;
    a.click();
    toast("OK", "SVG", "Скачано.");
    return;
  }

  const ext = opts.imageFormat === "image/jpeg" ? "jpg" : "png";
  a.download = `schedule-${opts.preset.id}-${stamp}.${ext}`;
  a.href = lastPreview.dataUrl;
  a.click();

  toast("OK", "Экспорт", "Файл скачан.");
}

function hideEmptyTimeRows(
  rootEl,
  { respectFilters = true, keepNowRow = true } = {},
) {
  const scheduleEl = rootEl.querySelector(".schedule");
  if (!scheduleEl) return [];

  if (scheduleEl.classList.contains("compact-mode")) return [];

  const { step } = getBounds();
  const slots = buildSlots();
  if (!slots.length || !step) return [];

  const allCells = Array.from(scheduleEl.children);
  if (!allCells.length) return [];

  const COLS = scheduleEl.querySelectorAll(".cell.head").length || 8;
  const headerCount = COLS;

  const events =
    respectFilters && typeof memoizedEventVisible === "function"
      ? state.events.filter(memoizedEventVisible)
      : state.events;

  const base = slots[0];
  const diff = new Array(slots.length + 1).fill(0);

  for (const ev of events) {
    const evStart = ev && Number(ev.startMin);
    const evEnd = evStart + Number(ev.durationMin);

    if (
      !Number.isFinite(evStart) ||
      !Number.isFinite(evEnd) ||
      evEnd <= evStart
    )
      continue;

    let first = Math.floor((evStart - base) / step);
    let last = Math.floor((evEnd - 1 - base) / step);

    if (last < 0 || first >= slots.length) continue;

    first = Math.max(0, first);
    last = Math.min(slots.length - 1, last);

    diff[first] += 1;
    diff[last + 1] -= 1;
  }

  const has = new Array(slots.length).fill(false);
  let run = 0;
  for (let i = 0; i < slots.length; i++) {
    run += diff[i];
    has[i] = run > 0;
  }

  const changed = [];
  const hideCell = (el) => {
    const prevDisplay = el.style.display;
    if (prevDisplay === "none") return;
    changed.push({ el, prevDisplay });
    el.style.display = "none";
  };

  for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
    if (has[slotIndex]) continue;

    const rowStartIndex = headerCount + slotIndex * COLS;

    const timeCell = allCells[rowStartIndex];
    if (
      keepNowRow &&
      timeCell &&
      timeCell.classList &&
      timeCell.classList.contains("now")
    )
      continue;

    for (let i = 0; i < COLS; i++) {
      const cell = allCells[rowStartIndex + i];
      if (cell) hideCell(cell);
    }
  }

  return changed;
}

function createFinalCanvas(sourceCanvas, fmt) {
  const final = document.createElement("canvas");
  final.width = fmt.w;
  final.height = fmt.h;

  const ctx = final.getContext("2d");

  const rotate = !!fmt.rotate;

  const srcW = rotate ? sourceCanvas.height : sourceCanvas.width;
  const srcH = rotate ? sourceCanvas.width : sourceCanvas.height;

  const scale = Math.min(fmt.w / srcW, fmt.h / srcH);
  const dw = srcW * scale;
  const dh = srcH * scale;
  const x = (fmt.w - dw) / 2;
  const y = (fmt.h - dh) / 2;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (!rotate) {
    ctx.drawImage(sourceCanvas, x, y, dw, dh);
  } else {
    ctx.translate(fmt.w, 0);
    ctx.rotate(Math.PI / 2);

    ctx.drawImage(sourceCanvas, x, y, dw, dh);
  }

  ctx.restore();
  return final;
}

function updateCharCounter() {
  const maxLength = MAX_NAME_CHARS;
  const currentLength = evName.value.length;

  let counter = document.getElementById("evNameCounter");
  if (!counter) {
    counter = document.createElement("div");
    counter.id = "evNameCounter";
    counter.className = "char-counter";
    evName.parentElement.appendChild(counter);
  }

  counter.textContent = `${currentLength} / ${maxLength} символов`;

  counter.classList.remove("warning", "danger");
  if (currentLength > maxLength * 0.9) {
    counter.classList.add("danger");
  } else if (currentLength > maxLength * 0.7) {
    counter.classList.add("warning");
  }
}

function wrapLineToLen(line, maxLen) {
  if (!line) return "";
  const words = line.split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";

  for (const word of words) {
    if (word.length > maxLen) {
      if (cur) {
        lines.push(cur);
        cur = "";
      }
      for (let i = 0; i < word.length; i += maxLen)
        lines.push(word.slice(i, i + maxLen));
      continue;
    }

    const test = cur ? cur + " " + word : word;
    if (test.length <= maxLen) cur = test;
    else {
      if (cur) lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  return lines.join("\n");
}

function wrapTextToLineLen(text, maxLen) {
  const v = normalizeNewlines(text || "");
  const parts = v.split("\n");
  const out = parts.map((p) => wrapLineToLen(p.trim(), maxLen)).join("\n");
  return normalizeNewlines(out);
}

function sanitizeEventName(raw) {
  let t = normalizeNewlines(raw || "").replace(/\t/g, " ");
  t = t.trim();

  t = clampLines(t, MAX_NAME_LINES);

  t = wrapTextToLineLen(t, MAX_NAME_LINE_LEN);

  t = clampLines(t, MAX_NAME_LINES);

  if (t.length > MAX_NAME_CHARS) t = t.slice(0, MAX_NAME_CHARS);

  t = t.replace(/[ \t]+\n/g, "\n").trim();

  t = clampLines(t, MAX_NAME_LINES);

  return t;
}

function normalizeNewlines(s) {
  return (s ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function clampLines(s, maxLines = 3) {
  const v = normalizeNewlines(s);
  const lines = v.split("\n");
  return lines.slice(0, maxLines).join("\n");
}

function enforceTextareaMaxLines(textarea, maxLines = 3) {
  const before = textarea.value;
  const after = clampLines(before, maxLines);
  if (after === before) return;

  const pos = textarea.selectionStart;
  textarea.value = after;
  const newPos = Math.min(after.length, pos);
  textarea.setSelectionRange(newPos, newPos);
}

evName.addEventListener("input", () => {
  enforceTextareaMaxLines(evName, MAX_NAME_LINES);
  updateCharCounter();

  evName.style.height = "auto";
  evName.style.height = evName.scrollHeight + "px";
});

evName.addEventListener("blur", () => {
  const next = sanitizeEventName(evName.value);
  if (next !== evName.value) evName.value = next;
  updateCharCounter();
});

function fixTypography(text) {
  if (!text) return text;

  const shortWords = [
    "в",
    "к",
    "о",
    "с",
    "у",
    "и",
    "а",
    "на",
    "по",
    "из",
    "за",
    "до",
    "от",
    "со",
    "во",
    "не",
    "ни",
    "то",
    "но",
    "же",
    "ли",
    "бы",
    "ко",
    "об",
    "уж",
    "уз",
  ];

  const pattern = new RegExp(`\\b(${shortWords.join("|")})\\s+`, "gi");

  return text.replace(pattern, "$1\u00A0");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}
