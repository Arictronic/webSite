import { FONT_OPTIONS, FONT_FAMILY_BY_ID, FONT_ID_ALIASES } from "./fonts.generated.js";

console.log("app.js загружен");

// Проверяем, что DOM загружен
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM загружен, запускаем инициализацию");
  });
} else {
  console.log("DOM уже загружен");
}

const MAX_NAME_LINES = 3
const MAX_NAME_CHARS = 150
const MAX_NAME_LINE_LEN = 50

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
  compact:   { lineHeight: 1.05, titleClamp: 2, letterSpacing: -0.01, cardPadY: 5, cardRadius: 10, weightTitle: 900, weightMeta: 600 },
  balanced:  { lineHeight: 1.12, titleClamp: 3, letterSpacing:  0.00, cardPadY: 7, cardRadius: 12, weightTitle: 900, weightMeta: 600 },
  spacious:  { lineHeight: 1.20, titleClamp: 3, letterSpacing:  0.02, cardPadY: 9, cardRadius: 14, weightTitle: 800, weightMeta: 600 },
  print:     { lineHeight: 1.18, titleClamp: 3, letterSpacing:  0.01, cardPadY: 8, cardRadius: 10, weightTitle: 700, weightMeta: 500, textTransform: 'none' },
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

const GENERIC_FAMILIES = new Set([
  "serif","sans-serif","monospace","cursive","fantasy",
  "system-ui","ui-serif","ui-sans-serif","ui-monospace",
  "-apple-system"
]);

function quoteCssString(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function sanitizeFontFamilyStack(stack) {
  const parts = String(stack).split(",").map(x => x.trim()).filter(Boolean);
  if (!parts.length) return stack;

  const first = parts[0];
  const needsQuotes =
    !GENERIC_FAMILIES.has(first) &&
    /[^a-zA-Z0-9 _-]/.test(first); // скобки, точки и т.п.

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
      family: 'system',
      lineHeight: 1.12,
      titleSize1: 12,
      titleSize2: 10,
      metaSize1: 11,
      metaSize2: 9,
      weightTitle: 900,
      weightMeta: 600,
      sampleText: '(расписание / РАСПИСАНИЕ)',
      letterSpacing: 0,
      textTransform: 'none',
      titleClamp: 3,
      cardPadY: 7,
      cardRadius: 12,
    },
    theme: {
      mode: "auto",
      customTokens: deepCopy(THEME_PRESETS[0].tokens),
      alpha: { today: 60, now: 65, event: 100, shadow: 10 },
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

function showSaveIndicator() {
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

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; transform: translateY(10px); }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(indicator);
  setTimeout(() => {
    if (indicator.parentNode) indicator.remove();
    if (style.parentNode) style.remove();
  }, 2000);
}

function clearOldBackups() {
  const backups = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key.startsWith(`${STORAGE_KEY}_backup_`)) {
      backups.push({ key, time: parseInt(key.split("_").pop()) });
    }
  }

  backups.sort((a, b) => b.time - a.time);
  backups.slice(5).forEach((backup) => {
    sessionStorage.removeItem(backup.key);
  });
}

function saveState(silent = false) {
  if (isSaving) {
    console.warn("⚠️ Сохранение уже выполняется");
    return;
  }
  isSaving = true;
  try {
    const json = JSON.stringify(state);
    if (json.length > 4500000) {
      toast("ERR", "❌", "Данные слишком большие для сохранения в JSON");
      isSaving = false;
      return;
    }
    const backup = localStorage.getItem(STORAGE_KEY);
    sessionStorage.setItem(`${STORAGE_KEY}_backup_${Date.now()}`, backup);
    localStorage.setItem(STORAGE_KEY, json);
    clearOldBackups();
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      toast(
        "ERR",
        "⛔",
        "Недостаточно места в localStorage для сохранения JSON"
      );
      showStorageCleanupPrompt();
    } else {
      toast("ERR", "❌", e.message);
    }
  } finally {
    isSaving = false;
    lastSaveTime = Date.now();
    if (!silent) {
      showSaveIndicator();
    }
  }
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

function restoreFromBackup() {
  let latestBackup = null;
  let latestTime = 0;

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
    try {
      const parsed = JSON.parse(backupData);
      if (confirm("Данные повреждены. Восстановить из резервной копии?")) {
        state = parsed;
        hardenState();
        saveState();
        toast("OK", "Восстановлено", "Данные восстановлены из резервной копии");
      }
    } catch {
      state = DEFAULT_STATE();
    }
  } else {
    state = DEFAULT_STATE();
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state = DEFAULT_STATE();
      return;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.version || parsed.version < 13) {
      state = DEFAULT_STATE();
      return;
    }
    state = parsed;
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    restoreFromBackup();
  }
}

function hardenState() {
  const defaultState = DEFAULT_STATE();

  if (!state.settings) state.settings = deepCopy(defaultState.settings);
  if (!state.settings.schedule)
    state.settings.schedule = deepCopy(defaultState.settings.schedule);
  if (!state.settings.font)
    state.settings.font = deepCopy(defaultState.settings.font);
  if (!state.settings.font.sampleText)
    state.settings.font.sampleText = defaultState.settings.font.sampleText;
  if (!state.settings.display)
    state.settings.display = deepCopy(defaultState.settings.display);
  if (!state.settings.theme)
    state.settings.theme = deepCopy(defaultState.settings.theme);

  const sch = state.settings.schedule;

  sch.slotHeight = clamp(
    Math.round(Number(sch.slotHeight) || defaultState.settings.schedule.slotHeight),
    48,
    240
  );

  sch.slotMinutes = clamp(
    Math.round(Number(sch.slotMinutes) || defaultState.settings.schedule.slotMinutes),
    1,
    240
  );

  sch.maxPerCell = 2;

  // Массивы
  if (!Array.isArray(state.events)) state.events = [];

  if (!Array.isArray(state.directions))
    state.directions = deepCopy(defaultState.directions);

  if (!Array.isArray(state.coaches)) state.coaches = [];

  // ID и createdAt для событий
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

  const m = ev.startMin; // минуты от начала дня

  if (filters.time === "morning") return m >= 360 && m < 720;    // 06:00–12:00
  if (filters.time === "day") return m >= 720 && m < 1080;       // 12:00–18:00
  if (filters.time === "evening") return m >= 1080 && m < 1380;  // 18:00–23:00

  return true;
}

function matchesDir(ev) {
  if (!filters.dir.size) return true;
  return filters.dir.has(ev.directionId);
}
function eventVisible(ev) {
  return (
    matchesDay(ev) && matchesTime(ev) && matchesDir(ev) && matchesQuery(ev)
  );
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

  if (startMin < start || startMin >= end)
    return {
      valid: false,
      reason: `Начало должно быть в пределах ${minToHHMM(start)}-${minToHHMM(end)}.`,
    };

  if (startMin + durationMin > end)
    return {
      valid: false,
      reason: `Занятие выходит за пределы рабочего времени.`,
    };

  // УБРАНО: проверка "занятие должно помещаться в один слот"
  // const slotStart = slotStartFor(startMin);
  // const slotEnd = slotStart + step;
  // if (startMin + durationMin > slotEnd)
  //   return { valid: false, reason: `Занятие выходит за пределы слота.` };

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

  const id = (FONT_ID_ALIASES[f.family] || f.family || "system");
  const family = FONT_FAMILY_BY_ID[id] || FONT_FAMILY_BY_ID.system;

  const r = document.documentElement.style;
  // базовые font vars (как было)
  r.setProperty("--tableFont", sanitizeFontFamilyStack(family));
  r.setProperty("--evLineHeight", String(f.lineHeight));
  r.setProperty("--evTitleSize1", `${f.titleSize1}px`);
  r.setProperty("--evTitleSize2", `${f.titleSize2}px`);
  r.setProperty("--evMetaSize1", `${f.metaSize1}px`);
  r.setProperty("--evMetaSize2", `${f.metaSize2}px`);
  r.setProperty("--evTitleW", String(f.weightTitle));
  r.setProperty("--evMetaW", String(f.weightMeta));
  r.setProperty('--evLetterSpacing', `${Number(f.letterSpacing || 0)}em`);
  r.setProperty('--evTextTransform', String(f.textTransform || 'none'));
  r.setProperty('--evTitleClamp', String(Number(f.titleClamp || 3)));
  r.setProperty('--evCardPadY', `${Number(f.cardPadY || 7)}px`);
  r.setProperty('--evCardRadius', `${Number(f.cardRadius || 12)}px`);

  const uiRadius = clamp(Number(f.cardRadius ?? 12) + 2, 10, 24);
  r.setProperty("--radius", uiRadius + "px");

  // ===== NEW: авто-минимумы высот от шрифта (P0) =====
  const lh = Number(f.lineHeight) || 1.12;
  const t1 = Number(f.titleSize1) || 12;
  const m1 = Number(f.metaSize1) || 11;

  // оценка "сколько надо пикселей", чтобы 1 карточка не клипалась при увеличении шрифтов
  // 3 строки заголовка + 2 строки мета + внутренние отступы/зазоры
  const wantedSlotH = Math.ceil(t1 * lh * 3 + m1 * lh * 2 + 28);

  const slotFromSettings = Number(state.settings.schedule?.slotHeight) || 72;
  const slotH = Math.max(48, slotFromSettings, wantedSlotH);
  r.setProperty("--slotH", `${slotH}px`);

  // минимальная высота карточки для compact режима (чтобы не упираться в старые 68px)
  const wantedCardMinH = Math.ceil(t1 * lh * 2.6 + m1 * lh * 1.4 + 24);
  r.setProperty("--evCardMinH", `${Math.max(60, wantedCardMinH)}px`);

  // Минимальная ширина колонки дня (чтобы текст/шрифт не ломали сетку)
  // Примерная оценка: 10 символов заголовка + паддинги
  const wantedDayMinW = Math.ceil(t1 * 7.5 + 84);
  r.setProperty("--dayMinW", clamp(wantedDayMinW, 120, 240) + "px");
  if (!(Number(state.settings.display?.dayWidthPx) > 0)) {
  r.setProperty("--dayW", clamp(wantedDayMinW, 120, 240) + "px");
  }

  // Ширина колонки времени (чтобы HH:MM не сжималось при крупном шрифте)
  r.setProperty('--timeCol', clamp(26, 44, 80) + 'px')
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
    `rgba(15, 23, 42, ${inferredDark ? 0.35 : aShadow})`
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
    if (!matchesDay(ev) || !matchesTime(ev) || !matchesQuery(ev)) return;
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
    })
  );
  DAYS.forEach((d, idx) =>
    dayGroup.appendChild(
      mkChip(filters.day === idx, d, () => {
        filters.day = idx;
        onFiltersChanged();
      })
    )
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
      })
    )
  );

  const dirGroup = $("dirGroup");
  dirGroup.innerHTML = "";
  dirGroup.appendChild(mkLabel("Направления"));
  dirGroup.appendChild(
    mkChip(filters.dir.size === 0, "Все", () => {
      filters.dir.clear();
      onFiltersChanged();
    })
  );

  const counts = countByDirection();
  state.directions.forEach((d) => {
    dirGroup.appendChild(
      mkDirChip(filters.dir.has(d.id), d, counts[d.id] || 0, () => {
        if (filters.dir.has(d.id)) filters.dir.delete(d.id);
        else filters.dir.add(d.id);
        onFiltersChanged();
      })
    );
  });

  $("q").value = filters.q || "";
}

function renderStats() {
  const total = state.events.length;
  const shown = state.events.filter(eventVisible).length;
  $("stats").textContent = total
    ? `Показано: ${shown}/${total}`
    : "Нет занятий";
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

  // fallback на случай старых сохранений
  return metaCoachRoom(ev, true);
}

function mkCell(cls, text) {
  const d = document.createElement("div");
  d.className = cls;
  d.textContent = text;
  return d;
}

function renderSchedule() {
  const scheduleEl = $("schedule");
  scheduleEl.innerHTML = "";

  const { step } = getBounds();
  const slots = buildSlots();
  const view = state.settings.display.cellView;

  const todayIndex = (new Date().getDay() + 6) % 7;
  const nowHour = pad2(new Date().getHours());

  if (view !== lastCellView) {
    lastCellView = view;
    markGeometryDirtyIfNeeded();
  }

  // Управление классом compact-mode
  if (view === "compact") scheduleEl.classList.add("compact-mode");
  else scheduleEl.classList.remove("compact-mode");

  // Колонка времени только если не compact
  if (view !== "compact") {
    scheduleEl.appendChild(mkCell("cell head time", ""));
  }

  // Заголовки дней — всегда
  DAYS.forEach((d, dayIndex) => {
    const c = mkCell("cell head", "");
    c.innerHTML = `<span>${d}</span> <span class="day-actions" title="Действия">⋯</span>`;
    c.querySelector(".day-actions").addEventListener("click", (e) => {
      e.stopPropagation();
      dayMenu(dayIndex);
    });
    scheduleEl.appendChild(c);
  });

  // ===== helpers (compact) =====
  function createCompactEventCard(ev) {
    const dir = getDir(ev.directionId);
    const color = dir ? dir.color : "#64748b";
    const text = bestTextOn(color);

    const el = document.createElement("div");
    el.className = "event compact-card";
    el.dataset.eid = ev.id;
    if (!eventVisible(ev)) el.classList.add("dim");

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

    // FIX: учитывать "Содержание карточки" и в compact тоже
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
      tt.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
      if (ev.coach) tt.push(ev.coach);
      if (ev.room) tt.push(ev.room);
      if (dir) tt.push(dir.name);
      if (ev.notes) tt.push(`📝 ${ev.notes}`);
      el.title = tt.join(" · ");
    }

    return el;
  }

  // ===== КОМПАКТНЫЙ РЕЖИМ =====
  if (view === "compact") {
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const cell = mkCell("cell droppable", "");
      if (dayIndex === todayIndex && state.settings.display.showTodayHighlight) {
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
        dayEvents.forEach((ev) => slotInner.appendChild(createCompactEventCard(ev)));
      }

      cell.addEventListener("click", (e) => {
        if (
          e.target === cell ||
          e.target === slotInner ||
          (e.target && e.target.classList && e.target.classList.contains("empty-slot"))
        ) {
          const start = parseHHMM(state.settings.schedule.start) || 540;
          smartOpenCreate(dayIndex, start);
        }
      });

      cell.appendChild(slot);
      scheduleEl.appendChild(cell);
    }
  } else {
    // ===== timeline / list =====
    slots.forEach((slotStart, slotIndex) => {
      const slotEnd = slotStart + step;

      const tCell = mkCell("cell time", minToHHMM(slotStart));
      scheduleEl.appendChild(tCell);

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cell = mkCell("cell droppable", "");
        cell.dataset.slotIndex = String(slotIndex);

        if (dayIndex === todayIndex && state.settings.display.showTodayHighlight) {
          cell.classList.add("col-today");
        }

        const slot = document.createElement("div");
        slot.className = "slot";
        if (view === "list") slot.classList.add("list-mode");
        if (view === "timeline") slot.classList.add("tl-fill");

        const slotInner = document.createElement("div");
        slotInner.className = "slot-inner";
        slot.appendChild(slotInner);

        cell.addEventListener("click", () => smartOpenCreate(dayIndex, slotStart, slotEnd));

        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.stopPropagation();
          cell.classList.add("drop-target");
          e.dataTransfer.dropEffect = "move";
        });

        cell.addEventListener("dragleave", (e) => {
          if (!cell.contains(e.relatedTarget)) cell.classList.remove("drop-target");
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
              ev.startMin < slotEnd
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
            if (!eventVisible(ev)) el.classList.add("dim");
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

            // FIX: в list тоже всегда учитывать "Содержание карточки"
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
              tt.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
              if (ev.coach) tt.push(ev.coach);
              if (ev.room) tt.push(ev.room);
              if (dir) tt.push(dir.name);
              if (ev.notes) tt.push("— " + ev.notes);
              el.title = tt.join("\n");
            }

            slotInner.appendChild(el);
          });
        } else {
          // TIMELINE
          if (count === 2) {
            slot.classList.add("two");
            cell.dataset.double = "1";

            const doubleLayout = "stacked"; // или "side-by-side"

            const sortedEvents = [...eventsInCell].sort((a, b) => a.startMin - b.startMin);
            sortedEvents.forEach((ev) => {
              const dir = getDir(ev.directionId);
              const color = dir ? dir.color : "#64748b";
              const text = bestTextOn(color);

              const el = document.createElement("div");
              el.className = "event double";
              el.classList.add(doubleLayout);
              el.dataset.eid = ev.id;
              if (!eventVisible(ev)) el.classList.add("dim");
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
              title.textContent = fixTypography(ev.name);
              el.appendChild(title);

              // FIX: учитывать "Содержание карточки" и в double тоже
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
                tt.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
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
              if (!eventVisible(ev)) el.classList.add("dim");
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
                tt.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
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
  markGeometryDirty();
}

let geometryDirty = true;

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
    f.lineHeight,
    f.titleSize1, f.titleSize2,
    f.metaSize1, f.metaSize2,
    f.weightTitle, f.weightMeta
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

function markGeometryDirty() {
  if (geometryDirty && geometrySyncRaf) return;

  geometryDirty = true;
  requestGeometrySync();
}


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

function syncGridGeometry() {
  const view = state.settings.display.cellView;
  const scheduleEl = document.getElementById("schedule");
  if (!scheduleEl) return;

  // LIST: полностью контентный режим
  if (view === "list") return;

  // COMPACT: все клетки одинаковой высоты = высота самой большой клетки
  if (view === 'compact') {
    const allCells = Array.from(scheduleEl.querySelectorAll('.cell.droppable'));
    if (!allCells.length) return;

    const allCards = Array.from(scheduleEl.querySelectorAll('.event.compact-card'));

    // сброс
    for (const cell of allCells) {
      cell.style.removeProperty('height');
      cell.style.removeProperty('min-height');
    }
    for (const card of allCards) {
      card.style.removeProperty('height');
      card.style.removeProperty('min-height');
    }

    requestAnimationFrame(() => {
      if (state.settings.display.cellView !== 'compact') return;

      // 1) измеряем maxCardH
      let maxCardH = 0;
      for (const card of allCards) {
        const h = card.getBoundingClientRect().height;
        if (h > maxCardH) maxCardH = h;
      }

      const cardH = Math.ceil(maxCardH) + 'px';

      // 2) применяем высоту карточкам (важно: !important из-за CSS)
      for (const card of allCards) {
        card.style.setProperty('height', cardH, 'important');
      }

      // 3) после этого считаем maxCellH по обновлённому layout
      let maxCellH = 0;
      for (const cell of allCells) {
        const cs = getComputedStyle(cell);
        const padY =
          (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);

        const inner = cell.querySelector('.slot-inner');
        const contentH = inner ? inner.scrollHeight : cell.scrollHeight;
        const need = contentH + padY;

        if (need > maxCellH) maxCellH = need;
      }

      const cellH = Math.ceil(maxCellH) + 'px';

      // 4) выравниваем высоту всех колонок-дней
      for (const cell of allCells) {
        cell.style.height = cellH;
      }
    });

    return;
  }


  // ===== TIMELINE =====
  // 1) measuring ТОЛЬКО чтобы корректно снять ширины под контент
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

    for (const c of cells) {
      c.style.removeProperty("height");
      c.style.removeProperty("min-height");
    }

    // 1) dayW baseline
    let maxCellW = 0;
    for (const c of cells) {
      const w = c.getBoundingClientRect().width;
      if (w > maxCellW) maxCellW = w;
    }

    // 2) dayW: ширина контента карточек (ограниченно)
    const events = Array.from(
      scheduleEl.querySelectorAll(".cell.droppable .event")
    ).slice(0, 24);

    let maxEventW = 0;
    for (const ev of events) {
      const w = Math.max(ev.getBoundingClientRect().width, ev.scrollWidth);
      if (w > maxEventW) maxEventW = w;
    }

    // 3) dayW clamp + порог обновления (и только если dayWidthPx НЕ задан руками)
    const rawW = Math.max(maxCellW, maxEventW);
    if (rawW > 0 && !(Number(state.settings.display?.dayWidthPx) > 0)) {
      const maxW = Math.min(320, Math.max(220, window.innerWidth - 120));
      const nextW = clamp(Math.ceil(rawW), 120, maxW);

      const cur =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--dayW")
        ) || 0;

      if (!cur || Math.abs(cur - nextW) >= 4) {
        document.documentElement.style.setProperty("--dayW", nextW + "px");
      }
    }

    // выключаем measuring (ширины), чтобы не ломал обычный вид
    scheduleEl.classList.remove("measuring");

    // 2) Высоты строк: включаем measuring-h (АВТО-высота) и только потом меряем
    scheduleEl.classList.add("measuring-h");

    // Два RAF: 1) применить класс measuring-h, 2) мерить уже по новому layout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (state.settings.display.cellView !== "timeline") {
          scheduleEl.classList.remove("measuring-h");
          return;
        }

        const cells2 = Array.from(scheduleEl.querySelectorAll(".cell.droppable"));
        if (!cells2.length) {
          scheduleEl.classList.remove("measuring-h");
          return;
        }

        // всегда снимаем measuring-h, даже если что-то упадёт
        try {
          for (const c of cells2) {
            c.style.removeProperty("height");
            c.style.removeProperty("min-height");
          }

          const rootCS = getComputedStyle(document.documentElement);
          const minRowH =
            parseFloat(rootCS.getPropertyValue("--slotH")) ||
            Number(state.settings.schedule?.slotHeight) ||
            72;

          const byRowNeed = new Map();

          for (const c of cells2) {
            const key = c.dataset.slotIndex;
            if (key == null) continue;

            const cs = getComputedStyle(c);
            const padY =
              (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);

            const slotEl = c.querySelector(".slot.tl-fill");
            const inner = c.querySelector(".slot-inner");

            let contentH = 0;

            // КЕЙС ДВОЙНЫХ: в обычном режиме они делят высоту 50/50,
            // значит строка должна уметь вместить 2 * (самая высокая карточка).
            if (slotEl?.classList.contains("two") && inner) {
              const evs = Array.from(inner.querySelectorAll(".event"));
              if (evs.length) {
                const maxEvH = evs.reduce(
                  (m, el) => Math.max(m, el.getBoundingClientRect().height),
                  0
                );

                const innerCS = getComputedStyle(inner);
                const gap = parseFloat(innerCS.rowGap || innerCS.gap) || 0;

                contentH = (maxEvH * 2) + gap;
              } else {
                contentH = inner.scrollHeight;
              }
            } else {
              // Обычный слот: натуральная высота контента
              contentH = inner ? inner.scrollHeight : c.scrollHeight;
            }

            const need = Math.max(contentH + padY, minRowH);
            const prev = byRowNeed.get(key) ?? 0;
            if (need > prev) byRowNeed.set(key, need);
          }

          for (const c of cells2) {
            const key = c.dataset.slotIndex;
            if (key == null) continue;

            const h = byRowNeed.get(key);
            if (!h) continue;

            c.style.height = `${Math.ceil(h)}px`;
          }
        } finally {
          scheduleEl.classList.remove("measuring-h");
        }
      });
    });
  });
}



function onFiltersChanged() {
  renderFilterBar();          // обновить активные чипы + counts
  applyEventVisibilityOnly(); // перекинуть .dim на события + обновить stats
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
    "1"
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

  // ИСПРАВЛЕНО: убрано ограничение на длительность
  const eventsInCell = state.events
    .filter(
      (ev) =>
        ev.dayIndex === dayIndex &&
        ev.startMin >= slotStart &&
        ev.startMin < slotEnd
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

    // ИСПРАВЛЕНО: Если уже есть одно занятие, создаем второе с тем же временем начала
    // (они будут отображаться рядом side-by-side или stacked)
    defaultStart = existing.startMin;
    defaultDuration = defDur;
  }

  // ИСПРАВЛЕНО: убрана проверка на выход за границы слота
  openCreate(dayIndex, defaultStart, defaultDuration);
}
const fontPreset = $('fontPreset');
const fontQuickTightness = $('fontQuickTightness');
const fontLetterSpacing = $('fontLetterSpacing');
const fontTextTransform = $('fontTextTransform');
const fontTitleClamp = $('fontTitleClamp');
const fontCardPaddingY = $('fontCardPaddingY');
const fontCardRadius = $('fontCardRadius');

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

function uid() {
  return "e_" + Math.random().toString(36).slice(2, 10);
}

function renderDirSelect(selectedId) {
  evDir.innerHTML = "";

  // Пустая опция
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "— Выберите направление —";
  evDir.appendChild(emptyOption);

  // Список направлений
  state.directions.forEach((d) => {
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.name;
    evDir.appendChild(o);
  });

  // ✅ РАЗДЕЛИТЕЛЬ
  const separator = document.createElement("option");
  separator.disabled = true;
  separator.textContent = "────────────────────";
  evDir.appendChild(separator);

  // ✅ УПРАВЛЕНИЕ
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

  // ✅ РАЗДЕЛИТЕЛЬ
  const separator = document.createElement("option");
  separator.disabled = true;
  separator.textContent = "─────────────────";
  evCoach.appendChild(separator);

  // ✅ ДОБАВИТЬ НОВОГО
  const newOption = document.createElement("option");
  newOption.value = "__new__";
  newOption.textContent = "➕ Добавить нового тренера";
  evCoach.appendChild(newOption);

  // ✅ УПРАВЛЕНИЕ СПИСКОМ
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

function applyEventVisibilityOnly() {
  const map = new Map(state.events.map(ev => [ev.id, ev]));

  document.querySelectorAll("#schedule .event[data-eid]").forEach((el) => {
    const ev = map.get(el.dataset.eid);
    if (!ev) return;
    el.classList.toggle("dim", !eventVisible(ev));
  });

  renderStats();
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
    "➕ Новое занятие"
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

  // FIX: убрано правило "занятие должно помещаться в один слот"
  // Вместо этого — единая проверка через validateTimeSlot
  if (startMin != null && dur > 0) {
    const validation = validateTimeSlot(
      dayIndex,
      startMin,
      dur,
      evId.value || null
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

  // 1) Имя: нормализуем и сразу показываем пользователю то, что реально сохранится
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

  // 2) Валидация времени — только через один валидатор
  const validation = validateTimeSlot(dayIndex, startMin, dur, evId.value || null);
  if (!validation.valid) {
    toast("WARN", "⚠️ Ошибка", validation.reason || "Некорректное время занятия.");
    return;
  }

  // УБРАНО: дублирующая проверка "влезать в слот"
  // (и вообще этот блок больше не нужен, потому что validateTimeSlot уже проверил start/end)
  // if (startMin < start || startMin >= end) { ... }
  // const slotStart = slotStartFor(startMin);
  // const slotEnd = slotStart + step;
  // if (startMin + dur > slotEnd) { ... }

  // 3) Направление (как у тебя)
  let directionId = evDir.value;
  const ndName = newDirName.value.trim();
  if (ndName) {
    const existingDir = state.directions.find(
      (d) => d.name.toLowerCase() === ndName.toLowerCase()
    );
    if (existingDir) {
      directionId = existingDir.id;
      toast("INFO", "ℹ️ Направление существует", "Выбрано существующее направление.");
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

  // 4) Coach
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
    null
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

// Умное перемещение с автоматическим поиском места
function smartMoveEvent(id, toDay, toSlotStart, reason) {
  const { start, end, step } = getBounds();
  const idx = state.events.findIndex((e) => e.id === id);
  if (idx < 0) return;

  const ev = state.events[idx];
  const slotStart = toSlotStart;
  const slotEnd = slotStart + step;

  // ИСПРАВЛЕНО: убрано ограничение на длительность
  const eventsInCell = state.events
    .filter(
      (e) =>
        e.id !== id &&
        e.dayIndex === toDay &&
        e.startMin >= slotStart &&
        e.startMin < slotEnd
    )
    .sort((a, b) => a.startMin - b.startMin);

  // Если слот пустой - просто перемещаем
  if (eventsInCell.length === 0) {
    updateEventPosition(id, toDay, slotStart, reason);
    return;
  }

  // Если уже есть одно занятие
  if (eventsInCell.length === 1) {
    const existing = eventsInCell[0];

    // ИСПРАВЛЕНО: разрешаем перемещение на то же время (для side-by-side)
    updateEventPosition(id, toDay, existing.startMin, reason);
    return;
  }

  // Если уже 2 занятия - нельзя добавить
  toast("WARN", "Нельзя переместить", "В этом слоте уже 2 занятия");
}

function updateEventPosition(id, dayIndex, startMin, reason) {
  const idx = state.events.findIndex((e) => e.id === id);
  if (idx < 0) return;

  pushHistory(reason);
  state.events[idx].dayIndex = dayIndex;
  state.events[idx].startMin = startMin;

  saveState(true); // ← ТИХОЕ СОХРАНЕНИЕ
  renderAll();
  toast(
    "OK",
    "",
    `${state.events[idx].name} → ${DAYS[dayIndex]} ${minToHHMM(startMin)}`
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

function setActiveTab(which) {
  [tabSchedule, tabDisplay, tabFont, tabTheme].forEach((x) =>
    x.classList.remove("active")
  );
  [panelSchedule, panelDisplay, panelFont, panelTheme].forEach((x) =>
    x.classList.remove("active")
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
}
tabSchedule.addEventListener("click", () => setActiveTab("schedule"));
tabDisplay.addEventListener("click", () => setActiveTab("display"));
tabFont.addEventListener("click", () => setActiveTab("font"));
tabTheme.addEventListener("click", () => setActiveTab("theme"));

const setStart = $("setStart");
const setEnd = $("setEnd");
const setDefaultDur = $("setDefaultDur");

const dispCellView = $("dispCellView");
const dispCardMode = $("dispCardMode");
const dispShowNotes = $("dispShowNotes");
const dispShowEmptyHint = $("dispShowEmptyHint");
const dispShowToday = $('dispShowToday');
const dispDayWidth  = $('dispDayWidth');
const dispCellPad   = $('dispCellPad');

const fontFamily = $("fontFamily");


function getFontSampleText() {
  const raw = (state?.settings?.font?.sampleText || '').trim();
  return raw || DEFAULTSTATE.settings.font.sampleText;
}

function getFontOptionById(id) {
  return FONT_OPTIONS.find(x => x.id === id) || FONT_OPTIONS[0];
}

function fillFontSelectOptions() {
  fontFamily.innerHTML = '';
  const frag = document.createDocumentFragment();
  FONT_OPTIONS.forEach(f => {
    const o = document.createElement('option');
    o.value = f.id;
    o.textContent = `${f.name} ${getFontSampleText()}`;
    frag.appendChild(o);
  });
  fontFamily.appendChild(frag);
}

const fontPicker = document.getElementById('fontPicker');
const fontPickerBtn = document.getElementById('fontPickerBtn');
const fontPickerPop = document.getElementById('fontPickerPop');
const fontPickerList = document.getElementById('fontPickerList');
const fontPickerSearch = document.getElementById('fontPickerSearch');
const fontPickerTitle = document.getElementById('fontPickerTitle');
const fontPickerSample = document.getElementById('fontPickerSample');

function closeFontPicker() {
  fontPickerPop.classList.remove('show');
  fontPickerBtn.setAttribute('aria-expanded', 'false');
}

function openFontPicker() {
  fontPickerPop.classList.add('show');
  fontPickerBtn.setAttribute('aria-expanded', 'true');
  fontPickerSearch.value = '';
  renderFontPickerList('');
  setTimeout(() => fontPickerSearch.focus(), 0);
}

function setSelectedFont(id) {
  fontFamily.value = id;
  state.settings.font.family = id;

  const opt = getFontOptionById(id);
  fontPickerTitle.textContent = opt.name;
  fontPickerSample.textContent = getFontSampleText();
  fontPickerSample.style.fontFamily = sanitizeFontFamilyStack(opt.css);

  applyFont();
  renderAll();
  saveState(true);

  renderFontPickerList(fontPickerSearch.value);
}

const FONT_PAGE_SIZE = 20;
let fontPickerLimit = FONT_PAGE_SIZE;
let lastFontPickerQuery = '';
let lastMoreTriggerAt = 0;

let fontMoreObserver = null;

function ensureFontMoreObserver() {
  if (fontMoreObserver) return;
  fontMoreObserver = new IntersectionObserver((entries) => {
    if (!entries.some(e => e.isIntersecting)) return;

    const now = Date.now();
    if (now - lastMoreTriggerAt < 250) return;
    lastMoreTriggerAt = now;

    fontPickerLimit += FONT_PAGE_SIZE;

    const prev = fontPickerList.scrollTop;
    renderFontPickerList(lastFontPickerQuery, true);
    requestAnimationFrame(() => { fontPickerList.scrollTop = prev; });
  }, {
    root: fontPickerList,
    rootMargin: '200px',
    threshold: 0.01
  });
}


function renderFontPickerList(filterText, keepScroll = false) {
  const q = (filterText || '').trim().toLowerCase();

  if (q !== lastFontPickerQuery) {
    lastFontPickerQuery = q;
    fontPickerLimit = FONT_PAGE_SIZE;
  }

  // чтобы при догрузке не прыгало вверх
  const prevScroll = keepScroll ? fontPickerList.scrollTop : 0;

  fontPickerList.innerHTML = '';

  const filtered = FONT_OPTIONS.filter(f => !q || f.name.toLowerCase().includes(q));
  const visible = filtered.slice(0, fontPickerLimit);

  for (const f of visible) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'font-item' + (fontFamily.value === f.id ? ' active' : '');
    b.dataset.value = f.id;

    b.innerHTML = `
      <div class="name">${f.name}</div>
      <div class="sample">${getFontSampleText()}</div>
    `;

    // СРАЗУ применяем правильный font-family (без hover)
    const sampleEl = b.querySelector('.sample');
    if (sampleEl) {
      sampleEl.style.fontFamily = sanitizeFontFamilyStack(f.css);
    }

    b.addEventListener('click', () => {
      setSelectedFont(f.id);
      closeFontPicker();
    });

    fontPickerList.appendChild(b);
  }

  // Сентинел внизу для infinite scroll
  if (filtered.length > visible.length) {
    const more = document.createElement('div');
    more.className = 'font-more-hover';
    more.textContent = `Показать ещё: ${Math.min(FONT_PAGE_SIZE, filtered.length - visible.length)}`;

    fontPickerList.appendChild(more);

    ensureFontMoreObserver();
    fontMoreObserver.disconnect();
    fontMoreObserver.observe(more);
  } else {
    if (fontMoreObserver) fontMoreObserver.disconnect();
  }

  if (keepScroll) {
    requestAnimationFrame(() => { fontPickerList.scrollTop = prevScroll; });
  }
}


fillFontSelectOptions();
setSelectedFont(state?.settings?.font?.family || 'system');

fontPickerBtn.addEventListener('click', () => {
  if (fontPickerPop.classList.contains('show')) closeFontPicker();
  else openFontPicker();
});

fontPickerSearch.addEventListener('input', () => {
  renderFontPickerList(fontPickerSearch.value);
});

document.addEventListener('click', (e) => {
  if (!fontPicker.contains(e.target)) closeFontPicker();
});

const fontLineHeight = $("fontLineHeight");
const fontSampleText = $('fontSampleText');
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
  fontSampleText.addEventListener('change', () => {
    const st = (fontSampleText.value || '').trim();
    state.settings.font.sampleText = st || DEFAULTSTATE.settings.font.sampleText;

    // Обновляем UI шрифтов сразу
    fontPickerSample.textContent = getFontSampleText();
    fillFontSelectOptions();
    renderFontPickerList(fontPickerSearch.value);

    // чтобы сохранялось без нажатия "Сохранить"
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
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
}

function getColorLibrary() {
  const extra = [];
  for (let i = 0; i < 36; i++) extra.push(hslToHex(i * 10, 75, 55)); // 36 оттенков

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

function refreshThemeDots() {
  // Перерисовываем активные состояния после любого изменения инпутов
  fillDots(DOTS.accent, () => tAccent.value, (c) => { tAccent.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.bg,     () => tBg.value,     (c) => { tBg.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.card,   () => tCard.value,   (c) => { tCard.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.text,   () => tText.value,   (c) => { tText.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.border, () => tBorder.value, (c) => { tBorder.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.gridHead, () => tGridHead.value, (c) => { tGridHead.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.now,    () => tNowRow.value, (c) => { tNowRow.value = c; onThemeInput(); refreshThemeDots(); });
  fillDots(DOTS.today,  () => tTodayCol.value,(c)=> { tTodayCol.value = c; onThemeInput(); refreshThemeDots(); });
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
  if (fontPreset) fontPreset.value = 'custom';
  if (fontQuickTightness) fontQuickTightness.value = 'normal';

  if (fontLetterSpacing) fontLetterSpacing.value = String(f.letterSpacing ?? 0);
  if (fontTextTransform) fontTextTransform.value = f.textTransform || 'none';
  if (fontTitleClamp) fontTitleClamp.value = String(f.titleClamp ?? 3);
  if (fontCardPaddingY) fontCardPaddingY.value = String(f.cardPadY ?? 7);
  if (fontCardRadius) fontCardRadius.value = String(f.cardRadius ?? 12);

  fontFamily.value = f.family;
  setSelectedFont(fontFamily.value);
  fontLineHeight.value = String(f.lineHeight);
  fontTitle1.value = String(f.titleSize1);
  fontTitle2.value = String(f.titleSize2);
  fontMeta1.value = String(f.metaSize1);
  fontMeta2.value = String(f.metaSize2);
  fontWeightTitle.value = String(f.weightTitle);
  fontWeightMeta.value = String(f.weightMeta);

  const th = state.settings.theme;
  themeMode.value = th.mode;

  if (fontSampleText) fontSampleText.value = f.sampleText || '';

  renderThemePresetUI();
  fillThemeInputsFromState();

  settingsBackdrop.classList.add("show");
}
function closeSettings() {
  settingsBackdrop.classList.remove("show");
}

function renderThemePresetUI() {
  // ---- helpers (локальные, чтобы не раздувать глобальную область) ----
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
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
    return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
  };

  const buildColorLibrary = () => {
    // 36 оттенков + 3 “полосы” по светлоте для вариативности
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
        syncDotsActive(); // чтобы active обновился сразу
      });

      // Быстро копировать hex (правый клик)
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

  // ---- 1) Select: не сбрасывать выбор пользователя ----
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

  // ---- 2) Grid: сделать карточки кнопками + активное состояние ----
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
      themePreset.value = p.id;        // синхронизируем select
      setActivePresetCard(p.id);       // подсветка
      applyPresetToCustom(p.id);       // применяем
    });

    gridFrag.appendChild(el);
  });

  paletteGrid.appendChild(gridFrag);
  setActivePresetCard(themePreset.value);

  // ---- 3) Селект меняет подсветку (без повторного applyPresetToCustom) ----
  if (!themePreset.dataset.activeHooked) {
    themePreset.addEventListener("change", () => setActivePresetCard(themePreset.value));
    themePreset.dataset.activeHooked = "1";
  }

  // ---- 4) Свотчи: больше вариативности + active ----
  const lib = buildColorLibrary();
  renderDotRow(DOTS.accent, tAccent, lib);
  renderDotRow(DOTS.bg, tBg, lib);
  renderDotRow(DOTS.card, tCard, lib);
  renderDotRow(DOTS.text, tText, lib);
  renderDotRow(DOTS.border, tBorder, lib);
  renderDotRow(DOTS.gridHead, tGridHead, lib);
  renderDotRow(DOTS.now, tNowRow, lib);
  renderDotRow(DOTS.today, tTodayCol, lib);

  // У тебя openSettings() вызывает fillThemeInputsFromState() ПОСЛЕ renderThemePresetUI() [file:32],
  // поэтому активные свотчи надо “досинхронизировать” после того, как инпуты заполнятся программно.
  const qm = window.queueMicrotask || ((fn) => Promise.resolve().then(fn));
  qm(() => {
    setActivePresetCard(themePreset.value);
    syncDotsActive();
  });

  // Если пользователь меняет input[type=color] — обновлять active на точках
  const inputs = [tAccent, tBg, tCard, tText, tBorder, tGridHead, tNowRow, tTodayCol];
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

  // Показываем список с номерами
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
    (e) => e.coach === coachToDelete
  ).length;

  if (affectedCount > 0) {
    if (
      !confirm(
        `❌ Удалить "${coachToDelete}"?\n\nЭто повлияет на ${affectedCount} занятий.\nТренер будет удален из всех занятий.`
      )
    ) {
      return;
    }
  }

  // Удаляем тренера
  state.coaches.splice(idx, 1);

  // Очищаем тренера во всех событиях
  state.events.forEach((ev) => {
    if (ev.coach === coachToDelete) {
      ev.coach = "";
    }
  });

  pushHistory(`🗑️ Удален тренер: ${coachToDelete}`);
  saveState();
  renderAll();
  toast("OK", "Удалено", `Тренер "${coachToDelete}" удален`);

  // Обновляем выпадающий список
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
      `Контраст text/bg низкий: ${cr1.toFixed(2)}:1 (будет авто‑исправление).`
    );
  if (cr2 < 4.5)
    issues.push(
      `Контраст text/card низкий: ${cr2.toFixed(2)}:1 (будет авто‑исправление).`
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

  // Изменяем только токены, если режим custom
  if (themeMode.value === "custom") {
    state.settings.theme.mode = "custom";
  }

  // Но всегда применяем тему (включая альфа)
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
      "Размер названия для 2 занятий должен быть <= размера для 1 занятия."
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

  // ✅ ИСПРАВЛЕНИЕ: Проверяем, изменились ли временные параметры расписания
  const oldStart = state.settings.schedule.start;
  const oldEnd = state.settings.schedule.end;

  const timeParamsChanged = (oldStart !== startStr || oldEnd !== endStr);
  let removed = 0;

  // Фильтруем события ТОЛЬКО если временные параметры изменились
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

  pushHistory("Изменение настроек");

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

  state.settings.display.showTodayHighlight = (dispShowToday.value === "yes");
  state.settings.display.dayWidthPx = dayWidthPx;
  state.settings.display.cellPadPx = cellPadPx;

  state.settings.display.cellView = dispCellView.value;
  state.settings.display.cardMode = dispCardMode.value;
  state.settings.display.showNotes = dispShowNotes.value === "yes";
  state.settings.display.showEmptyHint = dispShowEmptyHint.value === "yes";

  state.settings.font.family = fontFamily.value;
  state.settings.font.lineHeight = lh;
  state.settings.font.titleSize1 = t1;
  state.settings.font.titleSize2 = t2;
  state.settings.font.metaSize1 = m1;
  state.settings.font.metaSize2 = m2;
  state.settings.font.weightTitle = Number(fontWeightTitle.value);
  state.settings.font.weightMeta = Number(fontWeightMeta.value);

  if (fontSampleText) {
    const st = (fontSampleText.value || '').trim();
    state.settings.font.sampleText = st || DEFAULTSTATE.settings.font.sampleText;
  }
  let letterSpacing = Number(fontLetterSpacing?.value);
  if (!Number.isFinite(letterSpacing)) letterSpacing = 0;
  letterSpacing = clamp(letterSpacing, -0.05, 0.20);

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

  if (removed > 0)
    toast(
      "WARN",
      "Применено",
      `Удалено занятий вне диапазона/слота: ${removed}.`
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


// ← ДО ЭТОГО МЕСТА ↑

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
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    filters.q = e.target.value
    applyEventVisibilityOnly()
    renderFilterBar()
  }, 150)
})



evDir.addEventListener("change", () => {
  if (evDir.value === "__manage__") {
    openDirectionManager();
    evDir.value = ""; // Сбрасываем
  } else {
    renderDirPreview();
  }
});
evStart.addEventListener("input", updateConflictsLive);
evDur.addEventListener("input", updateConflictsLive);
evCoach.addEventListener("input", updateConflictsLive);
evCoach.addEventListener("change", () => {
  if (evCoach.value === "__new__") {
    // Добавление нового
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
    // Управление списком
    openCoachManager();
    evCoach.value = ""; // Сбрасываем выбор
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
  applyPresetToCustom(themePreset.value)
);
[tAccent, tBg, tCard, tText, tBorder, tGridHead, tNowRow, tTodayCol].forEach(
  (inp) => inp.addEventListener("input", onThemeInput)
);
[alphaToday, alphaNow, alphaEvent, alphaShadow].forEach((inp) =>
  inp.addEventListener("input", onThemeInput)
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

  // Показываем список с опциями
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

  // Удаление (если минус в начале)
  if (choice.startsWith("-")) {
    const idx = parseInt(choice.substring(1)) - 1;
    if (idx < 0 || idx >= state.directions.length) {
      toast("WARN", "⚠️", "Неверный номер");
      return;
    }
    deleteDirection(idx);
    return;
  }

  // Редактирование
  const idx = parseInt(choice) - 1;
  if (idx < 0 || idx >= state.directions.length) {
    toast("WARN", "⚠️", "Неверный номер");
    return;
  }

  editDirection(idx);
}

function deleteDirection(idx) {
  const dir = state.directions[idx];

  const affectedCount = state.events.filter(e => e.directionId === dir.id).length;

  if (affectedCount > 0) {
    const ok = window.confirm(
      `❌ Удалить направление "${dir.name}"?\n\n` +
      `Это повлияет на ${affectedCount} занятий.\n` +
      `Направление будет заменено на первое оставшееся.`
    );
    if (!ok) return;
  }

  // ВАЖНО: берём replacement из оставшихся, а не из state.directions[0]
  const remaining = state.directions.filter((_, i) => i !== idx);
  const replacementId = remaining[0]?.id || "";

  state.events.forEach(ev => {
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

  // Открываем блок <details> в режиме редактирования
  const details = document.getElementById("dirDetails");
  const summary = document.getElementById("dirDetailsSummary");
  const createMode = document.getElementById("dirCreateMode");
  const editMode = document.getElementById("dirEditMode");

  // Переключаем режим
  summary.textContent = `✏️ Редактирование: ${dir.name}`;
  createMode.style.display = "none";
  editMode.style.display = "block";
  details.open = true;

  // Заполняем поля
  const editName = document.getElementById("editDirName");
  const editColor = document.getElementById("editDirColor");
  editName.value = dir.name;
  editColor.value = dir.color;

  // Обработчик сохранения
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

    // Возвращаем в режим создания
    resetDirDetailsMode();
    renderDirSelect(dir.id);
  };

  btnCancel.onclick = () => {
    resetDirDetailsMode();
  };
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

function bootstrap() {
  loadState();
  state.version = 13;
  hardenState();

  updateUndoRedoButtons();
  renderDirSwatches();

  // Проверяем, что основные элементы существуют
  if (!$("schedule")) {
    console.error("Элемент #schedule не найден!");
    toast("ERR", "Ошибка", "Не найден элемент таблицы");
    return;
  }

  applyTheme();
  renderAll();

  toast("OK", "Готово", "Данные загружены. Автосохранение включено.");
  
  // Проверяем наличие основных кнопок
  console.log("Кнопка настроек:", $("btnSettings"));
  console.log("Элемент расписания:", $("schedule"));
}
// ОБРАБОТЧИК ОШИБОК
window.addEventListener('error', function(e) {
  console.error('Глобальная ошибка:', e.error);
  console.error('В файле:', e.filename);
  console.error('На строке:', e.lineno);
  console.error('Колонка:', e.colno);
  
  // Показать пользователю
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    background: #ef4444;
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 999999;
    font-family: monospace;
    font-size: 12px;
    max-height: 200px;
    overflow: auto;
  `;
  errorDiv.innerHTML = `
    <strong>Ошибка в приложении:</strong><br>
    ${e.error?.message || e.message}<br>
    <small>${e.filename}:${e.lineno}:${e.colno}</small>
  `;
  document.body.appendChild(errorDiv);
});

// Запуск приложения с обработкой ошибок
try {
  bootstrap();
  const allowedViews = new Set(["timeline", "list", "compact"]);
  if (!allowedViews.has(state.settings.display.cellView)) {
    state.settings.display.cellView = "timeline";
  }
} catch (error) {
  console.error('Ошибка при запуске:', error);
  
  // Создать простой интерфейс с ошибкой
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
      // Если передали варианты — просим браузер явно их загрузить
      if (variantsSet && variantsSet.size && document.fonts.load) {
        const loads = [];
        for (const key of variantsSet) {
          const [fam, weight, style] = key.split("||");
          // формат строки: "italic 700 16px 'Font Name'"
          loads.push(document.fonts.load(`${style} ${weight} 16px "${fam}"`));
        }
        await Promise.allSettled(loads);
      }

      if (document.fonts.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("fonts timeout")), timeoutMs)
          ),
        ]);
      }
    }
  } catch (_) {
    /* soft-fail */
  }

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
}

function pickBestFontUrlFromSrc(src) {
  // Берём все url(...) и выбираем по расширению: woff2 > woff > ttf > otf
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

  // безопасная base64 конвертация чанками
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
  // иногда бывает диапазон "100 900"
  const parts = s.split(/\s+/).map(x => parseInt(x, 10)).filter(Number.isFinite);
  if (!parts.length) return wantedWeight === 400;
  if (parts.length === 1) return parts[0] === wantedWeight;
  const [a, b] = parts;
  return wantedWeight >= Math.min(a, b) && wantedWeight <= Math.max(a, b);
}

// Добавь этот хелпер (если ещё нет)
function absolutizeCssUrls(cssText, baseHref) {
  return String(cssText || "").replace(/url\(([^)]+)\)/g, (m, p1) => {
    const raw = String(p1).trim().replace(/^["']|["']$/g, "");
    if (!raw) return m;
    if (/^(data:|blob:|https?:)/i.test(raw)) return m;
    const abs = new URL(raw, baseHref).href;
    return `url("${abs}")`;
  });
}

async function buildFontFaceCssForVariants(variantsSet, { embedData = true } = {}) {
  let css = "";
  if (!variantsSet || !variantsSet.size) return css;

  // группируем для удобства матчингом
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
      rules = sheet.cssRules; // может бросить из-за CORS/ограничений
    } catch (_) {
      continue;
    }

    for (const rule of Array.from(rules)) {
      if (rule.type !== CSSRule.FONT_FACE_RULE) continue;

      const fam = _firstFontFamily(rule.style.getPropertyValue("font-family"));
      const style = (rule.style.getPropertyValue("font-style") || "normal").toLowerCase();
      const ruleWeight = rule.style.getPropertyValue("font-weight") || "400";

      for (const w of wanted) {
        if (w.fam !== fam) continue;
        if (w.style !== style) continue;
        if (!matchWeight(ruleWeight, w.weight)) continue;

        // Если НЕ встраиваем data: — всё равно надо "прибить" url(...) к sheet.href,
        // иначе "./__local__-..." станет грузиться из корня страницы.
        if (!embedData) {
          css += absolutizeCssUrls(rule.cssText, baseHref) + "\n";
          continue;
        }

        try {
          const src = rule.style.getPropertyValue("src") || "";
          const bestUrl = pickBestFontUrlFromSrc(src);
          if (!bestUrl) {
            css += absolutizeCssUrls(rule.cssText, baseHref) + "\n";
            continue;
          }

          // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: базируем относительно CSS-файла (fonts/fonts.css),
          // а не относительно страницы.
          const absUrl = new URL(bestUrl, baseHref).href;

          const dataUrl = await fetchAsDataUrl(absUrl);
          const fmt = guessFormatByUrl(bestUrl);

          const display = rule.style.getPropertyValue("font-display") || "swap";
          const unicodeRange = rule.style.getPropertyValue("unicode-range");

          css += `@font-face{font-family:"${fam}";font-style:${style};font-weight:${w.weight};font-display:${display};src:url("${dataUrl}") format("${fmt}");`;
          if (unicodeRange) css += `unicode-range:${unicodeRange};`;
          css += `}\n`;
        } catch (_) {
          // если data: не получилось — оставим как есть, но поправим относительные url(...)
          css += absolutizeCssUrls(rule.cssText, baseHref) + "\n";
        }
      }
    }
  }

  return css;
}

function getThemeBgCssColor() {
  const cs = getComputedStyle(document.documentElement);
  let bg = (cs.getPropertyValue("--bg") || "").trim();
  if (!bg) return "#ffffff";
  if (bg.startsWith("#")) return bg;
  return `#${bg}`; // текущая тема хранит hex без #
}

function resolveExportBackground(expBg) {
  if (expBg === "transparent") {
    if (expFormat.value === "jpeg") return "#ffffff";
    return null;
  }
  if (expBg === "white") return "#ffffff";
  return getThemeBgCssColor();
}


async function captureScheduleCanvas({ compact = false, background = null } = {}) {
  if (typeof window.html2canvas !== "function") {
    toast("WARN", "Экспорт", "html2canvas не найден (проверь html2canvas.min.js).");
    return null;
  }

  const { clone, cleanup } = makeExportClone({ compact });
  if (!clone) return null;

  const uiEls = Array.from(clone.querySelectorAll(".grab, .day-actions, button"));
  const uiPrev = uiEls.map((el) => el.style.visibility);

  // sticky-хедер часто ломает html2canvas — на экспорт делаем static
  const headEls = Array.from(clone.querySelectorAll(".cell.head"));
  const headPrevPos = headEls.map((el) => el.style.position);
  const headPrevTop = headEls.map((el) => el.style.top);
  const headPrevZ = headEls.map((el) => el.style.zIndex);

  uiEls.forEach((el) => (el.style.visibility = "hidden"));

  let changed = [];
  try {
    // скрывать пустые time-строки надо для timeline/list; в compact эта функция сама вернёт []
    changed = hideEmptyTimeRows(clone, true, false);

    // отключаем sticky у шапки
    headEls.forEach((el) => {
      el.style.position = "static";
      el.style.top = "auto";
      el.style.zIndex = "auto";
    });

    await ensureFontsLoaded();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    // размеры берём у .schedule (реальный контент), иначе получаем лишний фон
    const scheduleEl = clone.querySelector(".schedule");
    const w = Math.max(
      1,
      Math.ceil(scheduleEl?.scrollWidth || scheduleEl?.offsetWidth || clone.scrollWidth || clone.offsetWidth || 1)
    );
    const h = Math.max(
      1,
      Math.ceil(scheduleEl?.scrollHeight || scheduleEl?.offsetHeight || clone.scrollHeight || clone.offsetHeight || 1)
    );

    // подгоняем контейнер под контент
    clone.style.width = `${w}px`;
    clone.style.height = `${h}px`;

    const canvas = await window.html2canvas(clone, {
      backgroundColor: background, // null => прозрачный (если так и задумано)
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      windowWidth: w,
      windowHeight: h,
      width: w,
      height: h,
      scrollX: 0,
      scrollY: 0,
    });

    return canvas;
  } catch (e) {
    console.error(e);
    toast("ERR", "Экспорт", e?.message || "Ошибка экспорта");
    return null;
  } finally {
    // вернуть sticky как было
    headEls.forEach((el, i) => {
      el.style.position = headPrevPos[i] || "";
      el.style.top = headPrevTop[i] || "";
      el.style.zIndex = headPrevZ[i] || "";
    });

    uiEls.forEach((el, i) => (el.style.visibility = uiPrev[i] ?? ""));

    for (let i = changed.length - 1; i >= 0; i--) {
      const { el, prevDisplay } = changed[i];
      el.style.display = prevDisplay;
    }

    cleanup();
  }
}

let lastPreview = null; // { fmt, imageFormat, quality, dataUrl }

function makeExportClone({ compact = false } = {}) {
  const node = document.querySelector(".schedule-wrap");
  if (!node) return { clone: null, cleanup: () => {} };

  // Обёртка, чтобы клон не был виден и не влиял на верстку,
  // но при этом НЕ попадал в SVG-стили (мы экспортируем только clone).
  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.left = "0";
  wrap.style.top = "0";
  wrap.style.width = "0";
  wrap.style.height = "0";
  wrap.style.overflow = "hidden";
  wrap.style.pointerEvents = "none";
  wrap.style.zIndex = "-1";
  wrap.setAttribute("aria-hidden", "true");

  const clone = node.cloneNode(true);
  clone.classList.add("export-mode");
  if (compact) clone.classList.add("compact-export");

  // ВАЖНО:
  // 1) НЕ фиксируем высоту — иначе после hideEmptyTimeRows() останется лишний "фон".
  // 2) НЕ ставим top:-10000px (это ломает SVG foreignObject).
  // 3) НЕ ставим opacity:0 (иначе SVG станет пустым).
  clone.style.position = "static";
  clone.style.left = "";
  clone.style.top = "";
  clone.style.right = "";
  clone.style.bottom = "";

  // Ширину задаём, чтобы не схлопывалось/не переносилось.
  const fullW = Math.max(1, Math.round(node.scrollWidth || node.clientWidth || 1));
  clone.style.width = `${fullW}px`;

  clone.style.height = "auto";
  clone.style.maxWidth = "none";
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.margin = "0";
  clone.style.transform = "none";

  wrap.appendChild(clone);
  document.body.appendChild(wrap);

  return {
    clone,
    cleanup: () => wrap.remove(),
  };
}

function openExportModal() {
  // presets
  expPreset.innerHTML = "";
  EXPORT_PRESETS.forEach((p) => {
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.name;
    expPreset.appendChild(o);
  });
  expPreset.value = "vk_square";

  // defaults
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
  const fmt = expFormat.value
  expJpegWrap.style.display = (fmt === 'jpeg') ? 'block' : 'none'

  const optTransparent = expBg.querySelector('option[value="transparent"]')
  if (!optTransparent) return

  const isJpeg = (fmt === 'jpeg')

  // убрать "прозрачность" из выбора при JPEG
  optTransparent.hidden = isJpeg
  optTransparent.disabled = isJpeg

  if (isJpeg) {
    // запомнить прошлый фон (для PNG/SVG) и принудить белый для JPEG
    expBg.dataset.prevBg = expBg.value
    expBg.value = 'white'
  } else {
    // вернуть прошлый фон, а если его нет — сделать прозрачный по умолчанию
    expBg.value = expBg.dataset.prevBg || 'transparent'
    delete expBg.dataset.prevBg
  }
}

function getExportOptsFromUI() {
  const preset = getExportPresetById(expPreset.value);
  const fmt = expFormat.value; // png|jpeg|svg
  const imageFormat = fmt === "jpeg" ? "image/jpeg" : "image/png";
  const quality =
    fmt === "jpeg"
      ? Math.min(1, Math.max(0.6, Number(expQuality.value || 92) / 100))
      : 1.0;

  const background =
    fmt === "svg" ? null : resolveExportBackground(expBg.value);

  // "compact" можно сделать чекбоксом позже; пока: берём текущий view
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
    f === "serif" || f === "sans-serif" || f === "monospace" ||
    f === "system-ui" || f === "ui-sans-serif" || f === "ui-serif" || f === "ui-monospace" ||
    f === "emoji" || f === "math" || f === "fangsong"
  );
}

function normalizeFontWeight(w) {
  const s = String(w || "").trim().toLowerCase();
  if (!s) return 400;
  if (s === "normal") return 400;
  if (s === "bold") return 700;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : 400;
}

function collectUsedFontVariantsFromDom(rootEl) {
  const set = new Set();
  if (!rootEl) return set;

  const walker = document.createTreeWalker(
    rootEl,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return node.nodeValue && node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    }
  );

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

  // --- SVG preview ---
  if (opts.fmt === "svg") {
    if (typeof htmlToImage === "undefined" || typeof htmlToImage.toSvg !== "function") {
      toast("WARN", "SVG", "html-to-image не найден (проверь подключение).");
      return;
    }

    const { clone, cleanup } = makeExportClone({ compact: opts.compact });
    if (!clone) {
      toast("ERR", "SVG", "Не найден .schedule-wrap");
      return;
    }

    const uiEls = Array.from(clone.querySelectorAll(".grab, .day-actions, button, .empty-slot"));

    // ВАЖНО: отдельно сохраняем display и visibility (у тебя раньше visibility восстанавливался из display)
    const uiPrevDisplay = uiEls.map((el) => el.style.display);
    const uiPrevVis = uiEls.map((el) => el.style.visibility);

    // Прячем UI (и по display, и по visibility)
    uiEls.forEach((el) => {
      el.style.display = "none";
      el.style.visibility = "hidden";
    });

    // sticky-хедер часто ломает svg — на экспорт делаем static
    const headEls = Array.from(clone.querySelectorAll(".cell.head"));
    const headPrevPos = headEls.map((el) => el.style.position);
    const headPrevTop = headEls.map((el) => el.style.top);
    const headPrevZ = headEls.map((el) => el.style.zIndex);

    let changed = [];

    try {
      // скрываем пустые time-строки (в compact вернёт [])
      changed = hideEmptyTimeRows(clone);

      // отключаем sticky у шапки
      headEls.forEach((el) => {
        el.style.position = "static";
        el.style.top = "auto";
        el.style.zIndex = "auto";
      });

      // В SVG-ветке фон берём из темы (svg не использует opts.background)
      const bgColor = getThemeBgCssColor() || "#ffffff";

      // работаем строго по реальному контенту расписания
      const scheduleEl = clone.querySelector(".schedule") || clone;

      // === МАКС: собираем реально используемые шрифты по текстовым нодам + weight/style ===
      // (функции collectUsedFontVariantsFromDom / buildFontFaceCssForVariants должны быть добавлены отдельно)
      const usedVariants = collectUsedFontVariantsFromDom(scheduleEl);

      // Догружаем именно эти варианты (ensureFontsLoaded расширен: 2й аргумент variantsSet)
      await ensureFontsLoaded(2500, usedVariants);

      // 2 кадра, чтобы браузер применил метрики
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      // размеры берём у .schedule (реальный контент таблицы)
      const w = Math.max(1, Math.ceil(scheduleEl.scrollWidth || scheduleEl.offsetWidth || 1));
      const h = Math.max(1, Math.ceil(scheduleEl.scrollHeight || scheduleEl.offsetHeight || 1));

      // подгоняем контейнер под контент, чтобы не было “один фон”
      clone.style.width = `${w}px`;
      clone.style.height = `${h}px`;

      // fontEmbedCSS: если передан — html-to-image использует ТОЛЬКО его (не авто-встраивает шрифты) [web:36]
      const fontEmbedCSS = await buildFontFaceCssForVariants(usedVariants, { embedData: true });

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
      // вернуть display/visibility
      uiEls.forEach((el, i) => {
        el.style.display = uiPrevDisplay[i] || "";
        el.style.visibility = uiPrevVis[i] || "";
      });

      // вернуть sticky как было
      headEls.forEach((el, i) => {
        el.style.position = headPrevPos[i] || "";
        el.style.top = headPrevTop[i] || "";
        el.style.zIndex = headPrevZ[i] || "";
      });

      // вернуть скрытые строки времени
      for (let i = changed.length - 1; i >= 0; i--) {
        const { el, prevDisplay } = changed[i];
        el.style.display = prevDisplay;
      }

      cleanup();
    }

    return;
  }

  // --- PNG/JPEG preview ---
  const baseCanvas = await captureScheduleCanvas({
    compact: opts.compact,
    background: opts.background,
  });
  if (!baseCanvas) {
    toast("ERR", "Экспорт", "Не удалось создать изображение (canvas).");
    return;
  }

  let outCanvas = baseCanvas;

  // preset (и rotate внутри createFinalCanvas)
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

function hideEmptyTimeRows(rootEl, { respectFilters = true, keepNowRow = true } = {}) {
  const scheduleEl = rootEl.querySelector(".schedule");
  if (!scheduleEl) return [];

  // В compact-mode нет time-колонки/строк как в timeline/list — скрывать нечего.
  if (scheduleEl.classList.contains("compact-mode")) return [];

  const { step } = getBounds();
  const slots = buildSlots();
  if (!slots.length || !step) return [];

  const allCells = Array.from(scheduleEl.children);
  if (!allCells.length) return [];

  // time + 7 days (обычно 8), но берём из DOM на всякий случай
  const COLS = scheduleEl.querySelectorAll(".cell.head").length || 8;
  const headerCount = COLS;

  const events =
    respectFilters && typeof eventVisible === "function"
      ? state.events.filter(eventVisible)
      : state.events;

  // O(events + slots): diff-массив вместо вложенных циклов
  const base = slots[0];
  const diff = new Array(slots.length + 1).fill(0);

  for (const ev of events) {
    const evStart = ev && Number(ev.startMin);
    const evEnd = evStart + Number(ev.durationMin);

    if (!Number.isFinite(evStart) || !Number.isFinite(evEnd) || evEnd <= evStart) continue;

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

    // Не прячем текущий час (тайм-ячейка может иметь .now)
    const timeCell = allCells[rowStartIndex];
    if (keepNowRow && timeCell && timeCell.classList && timeCell.classList.contains("now")) continue;

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

  // “логический” размер источника после поворота
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
    // Поворот на 90° по часовой: переводим систему координат и крутим
    ctx.translate(fmt.w, 0);
    ctx.rotate(Math.PI / 2);

    // После rotate(90) координаты (x,y) считаются уже в повернутой системе:
    // “холст” имеет размер (fmt.h x fmt.w) в этой системе.
    ctx.drawImage(sourceCanvas, x, y, dw, dh);
  }

  ctx.restore();
  return final;
}

// ===== СЧЕТЧИК СИМВОЛОВ И АВТОМАТИЧЕСКИЕ ПЕРЕНОСЫ =====

function updateCharCounter() {
  const maxLength = MAX_NAME_CHARS
  const currentLength = evName.value.length

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
  if (!line) return ''
  const words = line.split(/\s+/).filter(Boolean)
  const lines = []
  let cur = ''

  for (const word of words) {
    // очень длинное слово режем кусками
    if (word.length > maxLen) {
      if (cur) { lines.push(cur); cur = '' }
      for (let i = 0; i < word.length; i += maxLen) lines.push(word.slice(i, i + maxLen))
      continue
    }

    const test = cur ? (cur + ' ' + word) : word
    if (test.length <= maxLen) cur = test
    else { if (cur) lines.push(cur); cur = word }
  }
  if (cur) lines.push(cur)
  return lines.join('\n')
}

function wrapTextToLineLen(text, maxLen) {
  const v = normalizeNewlines(text || '')
  const parts = v.split('\n')
  const out = parts.map(p => wrapLineToLen(p.trim(), maxLen)).join('\n')
  return normalizeNewlines(out)
}

function clampTitleToLines(titleEl, maxLines) {
  if (!titleEl) return;

  const cs = getComputedStyle(titleEl);
  const lh = parseFloat(cs.lineHeight) || 14;
  const maxHeight = lh * maxLines;

  // уже влазит – ничего не делаем
  if (titleEl.scrollHeight <= maxHeight + 1) return;

  const full = titleEl.textContent;
  let left = 0;
  let right = full.length;
  let best = full;

  // бинарный поиск по длине текста, чтобы поместилось в maxLines
  while (left <= right) {
    const mid = (left + right) >> 1;
    titleEl.textContent = full.slice(0, mid) + "…";

    if (titleEl.scrollHeight <= maxHeight + 1) {
      best = titleEl.textContent;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  titleEl.textContent = best;
}

function sanitizeEventName(raw) {
  let t = normalizeNewlines(raw || '').replace(/\t/g, ' ')
  t = t.trim()

  // сначала ограничим исходные строки
  t = clampLines(t, MAX_NAME_LINES)

  // затем завернём каждую строку до 50 (может добавить переносы)
  t = wrapTextToLineLen(t, MAX_NAME_LINE_LEN)

  // после wrap снова ограничим число строк
  t = clampLines(t, MAX_NAME_LINES)

  // жёсткий лимит по символам (включая \n)
  if (t.length > MAX_NAME_CHARS) t = t.slice(0, MAX_NAME_CHARS)

  // подчистим хвосты
  t = t.replace(/[ \t]+\n/g, '\n').trim()

  // финально ещё раз на всякий случай
  t = clampLines(t, MAX_NAME_LINES)

  return t
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

// ✅ ОБРАБОТЧИК ДЛЯ АВТОМАТИЧЕСКИХ ПЕРЕНОСОВ
evName.addEventListener("input", () => {
  enforceTextareaMaxLines(evName, MAX_NAME_LINES);
  updateCharCounter();

  // Автоматическая подгонка высоты textarea
  evName.style.height = "auto";
  evName.style.height = evName.scrollHeight + "px";
});

// Применяем перенос при потере фокуса
evName.addEventListener('blur', () => {
  const next = sanitizeEventName(evName.value)
  if (next !== evName.value) evName.value = next
  updateCharCounter()
});


// Функция для замены обычных пробелов на неразрывные после предлогов/союзов
function fixTypography(text) {
  if (!text) return text;

  // Список русских предлогов и союзов (1-3 буквы)
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

  // Создаем регулярное выражение для поиска коротких слов с пробелом после них
  const pattern = new RegExp(`\\b(${shortWords.join("|")})\\s+`, "gi");

  // Заменяем обычный пробел на неразрывный (\u00A0)
  return text.replace(pattern, "$1\u00A0");
}
