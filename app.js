import {
  FONT_OPTIONS,
  FONT_FAMILY_BY_ID,
  FONT_ID_ALIASES,
} from "./fonts.generated.js";

// ===================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====================
const $ = (id) => document.getElementById(id);
const USER_AGENT = navigator.userAgent || "";
const IS_IPHONE_DEVICE = /iPhone|iPod/.test(USER_AGENT);
const IS_IPAD_DEVICE =
  /iPad/.test(USER_AGENT) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const IS_IOS_DEVICE = IS_IPHONE_DEVICE || IS_IPAD_DEVICE;
const IS_WEBKIT_ENGINE =
  /AppleWebKit/i.test(USER_AGENT) &&
  !/CriOS|FxiOS|EdgiOS|OPiOS|YaBrowser/i.test(USER_AGENT);
const IS_SAFARI_BROWSER =
  IS_WEBKIT_ENGINE &&
  !/Chrome|Chromium|Android/i.test(USER_AGENT) &&
  /Safari/i.test(USER_AGENT);
// On iOS all browsers run on WebKit, so iOS-specific download handling
// should not be limited to Safari UA only.
const IS_IOS_WEBKIT = IS_IOS_DEVICE;
const SUPPORTS_HAS_SELECTOR =
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports("selector(:has(*))");
if (IS_SAFARI_BROWSER) document.documentElement.classList.add("is-safari");
if (!SUPPORTS_HAS_SELECTOR) {
  document.documentElement.classList.add("no-has-selector");
}
const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const LOGO_URLS = {
  1: "./src/Logo.svg",
  2: "./src/Logo2.svg",
  3: "uploaded",
};
const LOGO_SVG_STRINGS = {
  1: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>',
  2: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="15" fill="currentColor"/></svg>',
  3: null,
};
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
const EXPORT_PRESETS = [
  // { id: "vk_square", name: "VK пост 1:1 (1080×1080)", w: 1080, h: 1080 },
  // { id: "vk_wide", name: "VK обложка 1.91:1 (1200×630)", w: 1200, h: 630 },
  // { id: "tg_16_9", name: "Telegram 16:9 (1280×720)", w: 1280, h: 720 },
  // { id: "tg_square", name: "Telegram 1:1 (1080×1080)", w: 1080, h: 1080 },
  // { id: "a4_portrait", name: "A4 портрет (2480×3508)", w: 2480, h: 3508 },
  { id: "mobile_land", name: "Mobile 16:9 (1920x1080)", w: 1920, h: 1080 },
  { id: "a3_land", name: "A3 альбом (4961×3508)", w: 4961, h: 3508 },
  { id: "a4_land", name: "A4 альбом (3508×2480)", w: 3508, h: 2480 },
  // { id: "auto", name: "Auto (по размеру расписания)", w: 0, h: 0 },
];
const EXPORT_MODE_WEEK = "week";
const EXPORT_MODE_DAY = "day";
const DAY_EXPORT_PRESET = {
  id: "day_1080x1980",
  name: "День (1080×1980)",
  w: 1080,
  h: 1980,
};
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
    id: "sand",
    name: "Sand",
    tokens: {
      bg: "#faf7f2",
      card: "#fffdf9",
      text: "#1f2937",
      muted: "#6b7280",
      border: "#eadfcf",
      gridHead: "#f5ede2",
      accent: "#c2410c",
      now: "#ffe6c7",
      today: "#fff2df",
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
    id: "sunset",
    name: "Sunset",
    tokens: {
      bg: "#fff7f4",
      card: "#ffffff",
      text: "#1f2937",
      muted: "#6b7280",
      border: "#ffd9cc",
      gridHead: "#fff0ea",
      accent: "#f97316",
      now: "#ffe0d3",
      today: "#fff0ea",
    },
  },
  {
    id: "mint",
    name: "Mint",
    tokens: {
      bg: "#f4fbf8",
      card: "#ffffff",
      text: "#102a22",
      muted: "#4f6f64",
      border: "#cdeee2",
      gridHead: "#e8f8f2",
      accent: "#10b981",
      now: "#d5f5e7",
      today: "#e6faf2",
    },
  },
  {
    id: "lavender",
    name: "Lavender",
    tokens: {
      bg: "#f8f7ff",
      card: "#ffffff",
      text: "#1f2440",
      muted: "#636a8a",
      border: "#e4e2ff",
      gridHead: "#efefff",
      accent: "#7c3aed",
      now: "#e7e4ff",
      today: "#f1efff",
    },
  },
  {
    id: "graphite-dark",
    name: "Graphite Dark",
    tokens: {
      bg: "#0b1220",
      card: "#0f172a",
      text: "#f8fafc",
      muted: "#94a3b8",
      border: "#1f2a44",
      gridHead: "#0b1220",
      accent: "#f59e0b",
      now: "#3a2f00",
      today: "#2a1212",
    },
  },
  {
    id: "slate-dark",
    name: "Slate Dark",
    tokens: {
      bg: "#0f172a",
      card: "#131d33",
      text: "#f8fafc",
      muted: "#a5b4c7",
      border: "#2a3a56",
      gridHead: "#111b30",
      accent: "#38bdf8",
      now: "#1e293b",
      today: "#172036",
    },
  },
  {
    id: "forest-dark",
    name: "Forest Dark",
    tokens: {
      bg: "#08130f",
      card: "#0d1b16",
      text: "#f3fff9",
      muted: "#9fc8ba",
      border: "#1f3a30",
      gridHead: "#0a1713",
      accent: "#22c55e",
      now: "#173326",
      today: "#10271e",
    },
  },
  {
    id: "berry-dark",
    name: "Berry Dark",
    tokens: {
      bg: "#140f1f",
      card: "#1b1430",
      text: "#f7f3ff",
      muted: "#b8abc9",
      border: "#2e2550",
      gridHead: "#171129",
      accent: "#f472b6",
      now: "#3a2052",
      today: "#2b1b44",
    },
  },
];
const LOGO_CONSTANTS = {
  DEFAULT_OPACITY: 12,
  DEFAULT_COLOR: "#0ea5e9",
  DEFAULT_LAYOUT: "center",
  DEFAULT_TILE_SIZE: 30,
  DEFAULT_GAP: 180,
  DEFAULT_ROTATION: 0,
  DEFAULT_OFFSET: 0,
  MIN_TILE_SIZE: 20,
  MAX_TILE_SIZE: 1000,
  MIN_GAP: 0,
  MAX_GAP: 800,
  MIN_ROTATION: -180,
  MAX_ROTATION: 180,
  MIN_OFFSET: -2000,
  MAX_OFFSET: 2000,
  CACHE_TTL: 1000,
  DEBOUNCE_DELAY: 150,
  FILE_MAX_SIZE: 5 * 1024 * 1024,
  VALID_FILE_TYPES: [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
  ],
};
const DEFAULT_LIGHT = THEME_PRESETS[0].tokens;
const DEFAULT_DARK = THEME_PRESETS.find((p) => p.id === "graphite-dark").tokens;
const DEFAULT_FONT_SAMPLE_TEXT = DEFAULT_STATE().settings.font.sampleText;
function DEFAULT_STATE() {
  return {
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
        showDate: true,
        weekOffset: 0,
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
        mode: "light",
        customTokens: deepCopy(THEME_PRESETS[0].tokens),
        alpha: { today: 60, now: 65, event: 100, shadow: 10 },
      },
      logo: {
        enabled: false,
        variant: 1,
        opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
        recolor: false,
        color: LOGO_CONSTANTS.DEFAULT_COLOR,
        layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
        tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
        horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
        verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
        rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
        tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
        tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
        uploadedFileData: null,
      },
      exportDay: {
        dayIndex: 0,
        overlay: 45,
        topOffset: 190,
        titleColor: "#ff7ccc",
        backgroundDataUrl: "",
        backgroundName: "",
      },
    },
    // exportPresets должен быть на корневом уровне!
    exportPresets: {
      preset1: {
        name: "Сейчас",
        logo: {
          enabled: false,
          variant: 1,
          opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
          recolor: false,
          color: LOGO_CONSTANTS.DEFAULT_COLOR,
          layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
          tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
          horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
          tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
          tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
          uploadedFileData: null,
        },
      },
      preset2: {
        name: "Середина",
        logo: {
          enabled: false,
          variant: 1,
          opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
          recolor: false,
          color: LOGO_CONSTANTS.DEFAULT_COLOR,
          layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
          tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
          horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
          tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
          tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
          uploadedFileData: null,
        },
      },
      preset3: {
        name: "Диагональ",
        logo: {
          enabled: false,
          variant: 1,
          opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
          recolor: false,
          color: LOGO_CONSTANTS.DEFAULT_COLOR,
          layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
          tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
          horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
          tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
          tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
          uploadedFileData: null,
        },
      },
      preset4: {
        name: "Диагональ 2",
        logo: {
          enabled: false,
          variant: 1,
          opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
          recolor: false,
          color: LOGO_CONSTANTS.DEFAULT_COLOR,
          layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
          tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
          horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
          tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
          tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
          uploadedFileData: null,
        },
      },
      preset5: {
        name: "Сетка",
        logo: {
          enabled: false,
          variant: 1,
          opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
          recolor: false,
          color: LOGO_CONSTANTS.DEFAULT_COLOR,
          layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
          tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
          horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
          tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
          tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
          uploadedFileData: null,
        },
      },
      preset6: {
        name: "Сетка 2",
        logo: {
          enabled: false,
          variant: 1,
          opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
          recolor: false,
          color: LOGO_CONSTANTS.DEFAULT_COLOR,
          layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
          tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
          horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
          rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
          tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
          tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
          uploadedFileData: null,
        },
      },
    },
    directions: [
      { id: "yoga", name: "Йога", color: "#ef4444" },
      { id: "pilates", name: "Пилатес", color: "#14b8a6" },
      { id: "crossfit", name: "Кроссфит", color: "#0ea5e9" },
    ],
    coaches: ["Анна", "Дмитрий", "Елена"],
    events: [],
  };
}

let state = DEFAULT_STATE();

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
let filters = {
  day: "all",
  time: "all",
  dir: new Set(),
  q: "",
};

// ===================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ МОБИЛЬНОГО DND =====================
let lastValidDropCoords = { x: 0, y: 0 };
let lastValidDropIndices = { dayIndex: -1, slotIndex: -1 };

let isUpdating = false;

let saveIndicatorStyleAdded = false;
let filterCache = new Map();
let lastPreview = null;
let currentPreviewObjectUrl = null;
let pendingIosDownloadWindow = null;
let modalScrollLockState = {
  active: false,
  scrollY: 0,
  bodyPosition: "",
  bodyTop: "",
  bodyLeft: "",
  bodyRight: "",
  bodyWidth: "",
};
let exportPreviewZoomBound = false;
let exportPreviewPinch = { active: false, startDistance: 0, startScale: 1 };
let exportPreviewView = {
  element: null,
  width: 0,
  height: 0,
  fitScale: 1,
  scale: 1,
  minScale: 0.1,
  maxScale: 8,
};
let exportWeekPresetId = "";
let exportMode = EXPORT_MODE_WEEK;
let exportDayBackgroundDataUrl = "";
let cachedMetrics = null;
let metricsTimestamp = 0;
let lastLogoState = null;
let isSaving = false;
let lastSaveTime = 0;
let autoSaveTimer;
let history = [];
let future = [];
let searchDebounce;
let authorized = false;
let lastGeomKey = "";
let lastCellView = null;
let geometrySyncRaf = 0;
let resizeDebounce = null;
let geometryDirty = false;
let geometryRafId = null;
let geometryCache = new WeakMap();
let searchDebounceTimer = null;
let lastSearchValue = "";
let pendingRowHeightSync = false;
let rowHeightSyncRaf = 0;
let lastHeightSyncKey = "";

let lastFilterHash = "";

const SEARCH_DEBOUNCE_MS = 300;
const METRICS_CACHE_TIME = 1000;
const STORAGE_KEY = "studio_schedule_v13";
const AUTH_PASSWORD = "12345678";
const AUTH_OK_KEY = "studio_auth_ok";
const MAX_NAME_LINES = 3;
const MAX_NAME_CHARS = 150;
const MAX_NAME_LINE_LEN = 50;
const HISTORY_LIMIT = 60;
const TOAST_MAX_VISIBLE = 4;
const TOAST_DEDUPE_MS = 1200;
const recentToastTimestamps = new Map();
const SW_SCRIPT_URL = new URL("./sw.js", window.location.href).href;
const SW_EXPECTED_SCOPE = new URL("./", window.location.href).href;
const SW_CACHE_PREFIX = "studio-schedule-cache";
const SW_RELOAD_MARK = "studio_sw_reloaded_after_update";
const SW_FORCE_REFRESH_VERSION = "2026-02-16-utf8-1";
const SW_FORCE_REFRESH_MARK = "studio_sw_force_refresh_version";

// ===================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====================

// ============================ ID HTML элементы ============================
const exportBackdrop = $("exportBackdrop");
const expPreset = $("expPreset");
const expFormat = $("expFormat");
const expBg = $("expBg");
const expQuality = $("expQuality");
const expQualityVal = $("expQualityVal");
const expJpegWrap = $("expJpegWrap");
const expPreviewImg = $("expPreviewImg");
const expPreviewFrame = document.querySelector(".export-preview-frame");
const btnExpZoomOut = $("btnExpZoomOut");
const btnExpZoomFit = $("btnExpZoomFit");
const btnExpZoomIn = $("btnExpZoomIn");
const expZoomVal = $("expZoomVal");
const expTabWeek = $("expTabWeek");
const expTabDay = $("expTabDay");
const expPresetWrap = $("expPresetWrap");
const expWeekOptions = $("expWeekOptions");
const expDayOptions = $("expDayOptions");
const expRasterOptions = $("expRasterOptions");
const expBgWrap = $("expBgWrap");
const expHideEmptyWrap = $("expHideEmptyWrap");
const expHint = $("expHint");
const expDaySelect = $("expDaySelect");
const expDayBgFile = $("expDayBgFile");
const expDayBgStatus = $("expDayBgStatus");
const expDayOverlay = $("expDayOverlay");
const expDayOverlayVal = $("expDayOverlayVal");
const expDayTopOffset = $("expDayTopOffset");
const expDayTitleColor = $("expDayTitleColor");
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
const btnSaveNewDir = $("btnSaveNewDir");
const btnClearNewDir = $("btnClearNewDir");
const btnDelete = $("btnDelete");
const btnDuplicate = $("btnDuplicate");
const logoVariant = $("logoVariant");
const setStart = $("setStart");
const setEnd = $("setEnd");
const setDefaultDur = $("setDefaultDur");
const setWeekOffset = $("setWeekOffset");
const setShowDate = $("setShowDate");
const dispCellView = $("dispCellView");
const dispCardMode = $("dispCardMode");
const dispShowNotes = $("dispShowNotes");
const dispShowEmptyHint = $("dispShowEmptyHint");
const dispShowToday = $("dispShowToday");
const dispDayWidth = $("dispDayWidth");
const dispCellPad = $("dispCellPad");
const fontFamily = $("fontFamily");
const fontTitleFamily = $("fontTitleFamily");
const fontMetaFamily = $("fontMetaFamily");
const logoLayout = $("logoLayout");
const logoEnabled = $("logoEnabled");
const logoOpacity = $("logoOpacity");
const logoOpacityVal = $("logoOpacityVal");
const logoRecolor = $("logoRecolor");
const logoColorWrap = $("logoColorWrap");
const logoColor = $("logoColor");
const logoTileSize = $("logoTileSize");
const logoTileOffsetX = $("logoTileOffsetX");
const logoTileOffsetY = $("logoTileOffsetY");
const logoHorizontalGap = $("logoHorizontalGap");
const logoVerticalGap = $("logoVerticalGap");
const logoRotation = $("logoRotation");
const logoRotationVal = $("logoRotationVal");
const logoHorizontalGapVal = $("logoHorizontalGapVal");
const logoVerticalGapVal = $("logoVerticalGapVal");
const logoTileSizeNum = $("logoTileSizeNum");
const logoHorizontalGapNum = $("logoHorizontalGapNum");
const logoVerticalGapNum = $("logoVerticalGapNum");
const logoRotationNum = $("logoRotationNum");
const logoTileOffsetXNum = $("logoTileOffsetXNum");
const logoTileOffsetYNum = $("logoTileOffsetYNum");
const logoOpacityNum = $("logoOpacityNum");
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

const expHideEmpty = $("expHideEmpty");
const btnLoadLogoPreset = $("btnLoadLogoPreset");
const btnSaveLogoPreset = $("btnSaveLogoPreset");
const btnDeleteLogoPreset = $("btnDeleteLogoPreset");
// ============================ ID HTML элементы ============================

// ================== Пусиые слоты (да нет) ============================

if (expHideEmpty) {
  expHideEmpty.addEventListener("change", () => {
    invalidateExportPreview();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExportModule);
} else {
  initExportModule();
}

window.clearPreviewCache = clearPreviewCache;
window.buildExportPreview = buildExportPreview;


function isAuthorized() {
  return localStorage.getItem(AUTH_OK_KEY) === "1";
}

function setAuthorizedTrue() {
  authorized = true;
  localStorage.setItem(AUTH_OK_KEY, "1");
}

function initSettingsTabs() {
  const tabs = [tabSchedule, tabDisplay, tabFont, tabTheme, tabLogo];
  const panels = [
    panelSchedule,
    panelDisplay,
    panelFont,
    panelTheme,
    panelLogo,
  ];

  // Функция для переключения вкладок
  function switchTab(activeTab, activePanel) {
    // Убираем активный класс со всех вкладок
    tabs.forEach((tab) => {
      if (tab) tab.classList.remove("active");
    });

    // Скрываем все панели
    panels.forEach((panel) => {
      if (panel) panel.style.display = "none";
    });

    // Активируем выбранную вкладку и панель
    if (activeTab) activeTab.classList.add("active");
    if (activePanel) activePanel.style.display = "block";
  }

  // Добавляем обработчики клика на каждую вкладку
  tabs.forEach((tab, index) => {
    if (tab && panels[index]) {
      tab.addEventListener("click", () => {
        switchTab(tab, panels[index]);
      });
    }
  });

  // Инициализируем первую вкладку как активную
  if (tabs[0] && panels[0]) {
    switchTab(tabs[0], panels[0]);
  }
}

function syncModalPageScrollLock() {
  const hasOpenModal = !!document.querySelector(".backdrop.show:not([hidden])");
  const docEl = document.documentElement;
  const body = document.body;
  if (!docEl || !body) return;

  docEl.classList.toggle("modal-open", hasOpenModal);
  body.classList.toggle("modal-open", hasOpenModal);

  if (hasOpenModal) {
    if (modalScrollLockState.active) return;
    modalScrollLockState.active = true;
    modalScrollLockState.scrollY =
      window.scrollY || window.pageYOffset || docEl.scrollTop || 0;
    modalScrollLockState.bodyPosition = body.style.position || "";
    modalScrollLockState.bodyTop = body.style.top || "";
    modalScrollLockState.bodyLeft = body.style.left || "";
    modalScrollLockState.bodyRight = body.style.right || "";
    modalScrollLockState.bodyWidth = body.style.width || "";

    body.style.position = "fixed";
    body.style.top = `-${modalScrollLockState.scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return;
  }

  if (!modalScrollLockState.active) return;
  body.style.position = modalScrollLockState.bodyPosition;
  body.style.top = modalScrollLockState.bodyTop;
  body.style.left = modalScrollLockState.bodyLeft;
  body.style.right = modalScrollLockState.bodyRight;
  body.style.width = modalScrollLockState.bodyWidth;

  const restoreScrollY = modalScrollLockState.scrollY || 0;
  modalScrollLockState.active = false;
  modalScrollLockState.scrollY = 0;
  window.scrollTo(0, restoreScrollY);
}

function setBackdropVisible(backdropEl, isVisible) {
  if (!backdropEl) return;
  backdropEl.hidden = !isVisible;
  backdropEl.classList.toggle("show", isVisible);
  syncModalPageScrollLock();
}

function renderAuthGate(onSuccess) {
  const appRoot = $("appRoot");
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
  syncModalPageScrollLock();

  const passEl = wrap.querySelector("#authPass");
  const btn = wrap.querySelector("#authBtn");
  const err = wrap.querySelector("#authErr");

  function submit() {
    const pass = String(passEl.value || "");
    if (pass === AUTH_PASSWORD) {
      setAuthorizedTrue();

      const appRoot = $("appRoot");
      if (appRoot) appRoot.style.display = "";

      wrap.remove();
      syncModalPageScrollLock();
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

function bestTextOnSurfaces(bgHex, cardHex) {
  const candidates = ["#ffffff", "#f8fafc", "#e5e7eb", "#0f172a", "#111827"];
  let best = candidates[0];
  let bestScore = -1;
  for (const candidate of candidates) {
    const score = Math.min(
      contrastRatio(candidate, bgHex),
      contrastRatio(candidate, cardHex),
    );
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return best;
}

function updateUndoRedoButtons() {
  $("btnUndo").disabled = history.length === 0;
  $("btnRedo").disabled = future.length === 0;
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

function generateDirectionId(name) {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const hash = Math.random().toString(36).substring(2, 8);
  return `dir_${cleanName}_${hash}`;
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
  const h = Math.floor(ev.startMin / 60);
  if (filters.time === "morning") return h >= 6 && h < 12;
  if (filters.time === "day") return h >= 12 && h < 18;
  if (filters.time === "evening") return h >= 18 && h < 23;
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

// =========== Вспомогательные ================

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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatDateDDMM(d) {
  const dd = pad2(d.getDate());
  const mm = pad2(d.getMonth() + 1);
  return `${dd}.${mm}`;
}

function getWeekStartDate(baseDate, weekOffset = 0) {
  const d = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
  );
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - day + weekOffset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getScheduleDayDate(dayIndex) {
  if (dayIndex < 0 || dayIndex >= DAYS.length) return null;
  const sch = state.settings.schedule || {};
  const offset = clamp(Math.round(Number(sch.weekOffset ?? 0)), 0, 4);
  const monday = getWeekStartDate(new Date(), offset);
  const cur = new Date(monday);
  cur.setDate(monday.getDate() + dayIndex);
  return cur;
}

function formatDayMonthRu(date) {
  if (!(date instanceof Date)) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function getScheduleDayLabel(dayIndex) {
  if (dayIndex < 0 || dayIndex >= DAYS.length) return "";
  const sch = state.settings.schedule || {};
  const showDate = sch.showDate !== false;
  const cur = getScheduleDayDate(dayIndex);
  if (!cur) return DAYS[dayIndex];
  const datePart = formatDateDDMM(cur);
  return showDate ? `${DAYS[dayIndex]}\u00A0${datePart}` : DAYS[dayIndex];
}

function updateDayHeaders(scheduleEl) {
  if (!scheduleEl) return;
  const headCells = scheduleEl.querySelectorAll(".cell.head");
  let idx = 0;
  headCells.forEach((cell) => {
    if (cell.classList.contains("time")) return;
    const label = getScheduleDayLabel(idx);
    const labelEl = cell.querySelector(".day-label") || cell.querySelector("span");
    if (labelEl) {
      labelEl.textContent = label;
    } else {
      cell.textContent = label;
    }
    idx += 1;
  });
}

function clearToasts() {
  const toasts = document.querySelector("#toasts");
  if (!toasts) return;
  while (toasts.firstChild) {
    toasts.firstChild.remove();
  }
}

function toast(kind, title, text, duration = 4500) {
  if (state?.settings?.display?.showNotes === false) return;

  const toasts = document.querySelector("#toasts");
  if (!toasts) {
    console.warn("Toast container not found");
    return;
  }

  const safeText = text || "";
  const toastKey = `${kind}|${title}|${safeText}`;
  const now = Date.now();
  const lastShownAt = recentToastTimestamps.get(toastKey);
  if (lastShownAt && now - lastShownAt < TOAST_DEDUPE_MS) {
    return;
  }
  recentToastTimestamps.set(toastKey, now);
  for (const [key, ts] of recentToastTimestamps.entries()) {
    if (now - ts > TOAST_DEDUPE_MS * 10) {
      recentToastTimestamps.delete(key);
    }
  }

  const el = document.createElement("div");
  el.className = "toast";

  const icon = document.createElement("div");
  icon.className = "icon";
  icon.textContent = kind === "OK" ? "+" : kind === "WARN" ? "!" : "x";
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
  d.textContent = safeText;
  content.appendChild(t);
  content.appendChild(d);

  const actions = document.createElement("div");
  actions.className = "actions";
  const close = document.createElement("button");
  close.className = "close";
  close.textContent = "x";
  close.addEventListener("click", () => el.remove());
  actions.appendChild(close);

  el.appendChild(icon);
  el.appendChild(content);
  el.appendChild(actions);

  while (toasts.children.length >= TOAST_MAX_VISIBLE) {
    const oldest = toasts.firstElementChild;
    if (!oldest) break;
    oldest.remove();
  }

  toasts.appendChild(el);

  setTimeout(() => {
    if (el.isConnected) el.remove();
  }, Number.isFinite(duration) ? duration : 4500);
}
function pushHistory(reason) {
  history.push({ snapshot: deepCopy(state), reason, ts: Date.now() });
  if (history.length > HISTORY_LIMIT) history.shift();
  future = [];
  updateUndoRedoButtons();
  scheduleAutoSave(`history: ${reason}`);
}

function uid() {
  return "e_" + Math.random().toString(36).slice(2, 10);
}

function getDir(id) {
  return state.directions.find((d) => d.id === id);
}

// =========== Вспомогательные ================

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

  const slotStart = slotStartFor(startMin);
  const eventsInSameSlot = state.events.filter((ev) => {
    if (ev.id === ignoreId) return false;
    if (ev.dayIndex !== dayIndex) return false;
    return slotStartFor(ev.startMin) === slotStart;
  });

  if (eventsInSameSlot.length >= maxInSlot) {
    return {
      valid: false,
      reason: `В этом слоте уже есть максимальное количество занятий (${maxInSlot}).`,
    };
  }

  return { valid: true };
}

function prefersDark() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function ensureThemeContrast(tokens) {
  const out = { ...tokens };
  const minRatio = 4.5;
  const bgL = relLuminance(out.bg);
  const cardL = relLuminance(out.card);
  const isDarkSurfaces = bgL < 0.32 && cardL < 0.38;

  if (
    contrastRatio(out.text, out.bg) < minRatio ||
    contrastRatio(out.text, out.card) < minRatio
  ) {
    out.text = bestTextOnSurfaces(out.bg, out.card);
  }
  if (isDarkSurfaces && relLuminance(out.text) < 0.65) {
    out.text = "#f8fafc";
  }

  if (!out.muted) out.muted = relLuminance(out.text) > 0.6 ? "#94a3b8" : "#64748b";
  if (contrastRatio(out.muted, out.card) < 3) {
    out.muted = relLuminance(out.text) > 0.6 ? "#94a3b8" : "#64748b";
  }

  if (contrastRatio(out.border, out.card) < 1.25) {
    out.border = relLuminance(out.text) > 0.6 ? "#334155" : "#e2e8f0";
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
  const fixedDayW = Number(state.settings.display?.dayWidthPx ?? 0);
  if (fixedDayW > 0) {
    const w = clamp(Math.round(fixedDayW), 60, 800);
    r.setProperty("--dayMinW", `${w}px`);
    r.setProperty("--dayW", `${w}px`);
  } else {
    r.setProperty("--dayMinW", clamp(wantedDayMinW, 120, 240) + "px");
    r.setProperty("--dayW", clamp(wantedDayMinW, 120, 240) + "px");
  }

  const wantedTimeCol = Math.ceil(Math.max(32, m1 * 3 + 14));
  r.setProperty("--timeCol", clamp(wantedTimeCol, 24, 64) + "px");

  requestRowHeightSync(true);
  markGeometryDirtyIfNeeded();
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
    r.setProperty("--eventAlpha", String(aEvent)); // ← Инлайн для обычных элементов
    r.setProperty("--shadowRGBA", `rgba(15, 23, 42, ${inferredDark ? 0.35 : aShadow})`);

    // 🔑 КРИТИЧЕСКИ ВАЖНО: псевдоэлементы НЕ видят инлайн-переменные!
    // Нужно создать <style> тег для :root
    let themeStyle = document.getElementById("theme-vars");
    if (!themeStyle) {
        themeStyle = document.createElement("style");
        themeStyle.id = "theme-vars";
        document.head.appendChild(themeStyle);
    }
    themeStyle.textContent = `:root { --eventAlpha: ${aEvent}; }`;

    if (window.logoManager && window.logoManager.eventManager) {
        window.logoManager.eventManager.updateCSSVariables();
    }
    applyFont();
    applyLayout();
}

function applyLayout() {
  const d = state.settings.display;
  const r = document.documentElement.style;
  const pad = Number(d.cellPadPx ?? 6);
  r.setProperty("--cellPad", `${clamp(pad, 0, 24)}px`);

  const w = Number(d.dayWidthPx ?? 0);
  if (w > 0) {
    const maxW = clamp(w, 60, 800);
    r.setProperty("--dayW", `${maxW}px`);
    r.setProperty("--dayMinW", `${maxW}px`);
  }

  // Добавляем стили для скролла
  const scheduleWrap = document.querySelector(".schedule-wrap");
  if (scheduleWrap) {
    scheduleWrap.style.overflowX = "auto";
    scheduleWrap.style.overflowY = "auto";
    scheduleWrap.style.width = "100%";
    scheduleWrap.style.maxWidth = "100%";
    scheduleWrap.style.boxSizing = "border-box";
  }

  const schedule = document.querySelector(".schedule");
  if (schedule) {
    schedule.style.minWidth = "fit-content";
    schedule.style.width = "auto";
  }

  const timeCol = getComputedStyle(document.documentElement)
    .getPropertyValue("--timeCol")
    .trim();
  const headHeight = timeCol || "46px";
  r.setProperty("--dayHeadHeight", headHeight);
  r.setProperty("--day-head-height", headHeight);

  if (document.getElementById("schedule")) {
    requestRowHeightSync(true);
  }
}

window._logoSvgBlobUrls = window._logoSvgBlobUrls || {};

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
  return parts.join(" | ");
}

function metaCoachOnly(ev) {
  return ev.coach ? fixTypography(ev.coach) : "";
}

function metaTimeCoach(ev) {
  const parts = [];
  parts.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
  if (ev.coach) parts.push(fixTypography(ev.coach));
  return parts.join(" | ");
}

function metaStartTimeCoach(ev) {
  const parts = [minToHHMM(ev.startMin)];
  if (ev.coach) parts.push(fixTypography(ev.coach));
  return parts.join(" | ");
}

function metaStartTimeRoom(ev) {
  const parts = [minToHHMM(ev.startMin)];
  if (ev.room) parts.push(fixTypography(ev.room));
  return parts.join(" | ");
}

function metaFullByMode(ev) {
  const mode = state.settings.display.cardMode;

  if (mode === "name") return "";
  if (mode === "namecoach") return metaCoachOnly(ev);
  if (mode === "nametimecoach") return metaTimeCoach(ev);
  if (mode === "namestarttimecoach") return metaStartTimeCoach(ev);
  if (mode === "namestarttimeroom") return metaStartTimeRoom(ev);
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
// ==================== Алгоритмы сохранения ====================

function hardenState() {
  const defaultState =
    typeof DEFAULT_STATE === "function" ? DEFAULT_STATE() : DEFAULT_STATE;

  const fillMissing = (target, defaults) => {
    if (!target || !defaults) return;
    Object.keys(defaults).forEach((key) => {
      if (typeof target[key] === "undefined") {
        target[key] = deepCopy(defaults[key]);
      }
    });
  };

  if (!state.settings) state.settings = deepCopy(defaultState.settings);
  if (!state.settings.schedule)
    state.settings.schedule = deepCopy(defaultState.settings.schedule);
  if (!state.settings.font)
    state.settings.font = deepCopy(defaultState.settings.font);
  if (!state.settings.display)
    state.settings.display = deepCopy(defaultState.settings.display);
  if (!state.settings.theme)
    state.settings.theme = deepCopy(defaultState.settings.theme);
  if (!state.settings.exportDay)
    state.settings.exportDay = deepCopy(defaultState.settings.exportDay);

  fillMissing(state.settings, defaultState.settings);
  fillMissing(state.settings.schedule, defaultState.settings.schedule);
  fillMissing(state.settings.display, defaultState.settings.display);
  fillMissing(state.settings.font, defaultState.settings.font);
  fillMissing(state.settings.theme, defaultState.settings.theme);
  fillMissing(state.settings.exportDay, defaultState.settings.exportDay);
  if (!state.exportPresets) {
    state.exportPresets = deepCopy(defaultState.exportPresets);
  }

  const f = state.settings.font;

  if (!state.settings.font.sampleText)
    state.settings.font.sampleText = defaultState.settings.font.sampleText;

  if (!state.settings.logo) {
    state.settings.logo = deepCopy(defaultState.settings.logo);
  }
  if (!state.settings.exportDay) {
    state.settings.exportDay = deepCopy(defaultState.settings.exportDay);
  }

  const lg = state.settings.logo;
  const exportDaySettings = state.settings.exportDay;
  const displaySettings = state.settings.display;

  lg.enabled = !!lg.enabled;
  lg.variant = clamp(Math.round(Number(lg.variant ?? 1)), 1, 3);
  lg.opacity = clamp(Math.round(Number(lg.opacity ?? 12)), 0, 100);
  lg.recolor = !!lg.recolor;
  lg.color = typeof lg.color === "string" ? lg.color.trim() : "#0ea5e9";
  lg.layout = (typeof lg.layout === "string" && lg.layout.trim()) || "center";

  // ИЗМЕНЕНИЕ: Теперь tileSize - это процент (0-100) вместо пикселей
  lg.tileSize = clamp(Math.round(Number(lg.tileSize ?? 30)), 0, 100);

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

  const allowedCardModes = new Set([
    "name",
    "namecoach",
    "nametimecoach",
    "namestarttimecoach",
    "namestarttimeroom",
    "namecoachroom",
    "nametimecoachroom",
  ]);
  if (!allowedCardModes.has(displaySettings.cardMode)) {
    displaySettings.cardMode = defaultState.settings.display.cardMode;
  }

  exportDaySettings.dayIndex = clamp(
    Math.round(
      Number(exportDaySettings.dayIndex ?? defaultState.settings.exportDay.dayIndex),
    ),
    0,
    DAYS.length - 1,
  );
  exportDaySettings.overlay = clamp(
    Math.round(
      Number(exportDaySettings.overlay ?? defaultState.settings.exportDay.overlay),
    ),
    0,
    90,
  );
  exportDaySettings.topOffset = clamp(
    Math.round(
      Number(
        exportDaySettings.topOffset ?? defaultState.settings.exportDay.topOffset,
      ),
    ),
    0,
    900,
  );
  exportDaySettings.titleColor = normalizeHexColor(
    exportDaySettings.titleColor ?? defaultState.settings.exportDay.titleColor,
    defaultState.settings.exportDay.titleColor,
  );
  if (
    typeof exportDaySettings.backgroundDataUrl !== "string" ||
    !exportDaySettings.backgroundDataUrl.startsWith("data:image/")
  ) {
    exportDaySettings.backgroundDataUrl =
      defaultState.settings.exportDay.backgroundDataUrl;
  }
  exportDaySettings.backgroundName =
    typeof exportDaySettings.backgroundName === "string"
      ? exportDaySettings.backgroundName.trim().slice(0, 160)
      : "";

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
  sch.showDate = sch.showDate !== false;
  sch.weekOffset = clamp(Math.round(Number(sch.weekOffset ?? 0)), 0, 4);

  if (!Array.isArray(state.events)) state.events = [];
  if (!Array.isArray(state.directions))
    state.directions = deepCopy(defaultState.directions);
  if (!Array.isArray(state.coaches)) state.coaches = [];

  state.events.forEach((ev) => {
    if (!ev.id) ev.id = uid();
    if (!ev.createdAt) ev.createdAt = Date.now();
  });
}

$("btnSettings").addEventListener("click", openSettings);
$("btnUndo").addEventListener("click", undo);
$("btnRedo").addEventListener("click", redo);
$("btnExportJson").addEventListener("click", exportJson);
$("btnImportJson").addEventListener("click", () => $("fileInput").click());
$("btnExportPng").addEventListener("click", openExportModal);

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



function scheduleAutoSave(reason) {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    saveState();
    showSaveIndicator();
    if (reason) console.log(`Auto-save: ${reason}`);
  }, 2000);
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

function handleStorageFull() {
  toast(
    "ERR",
    "Хранилище",
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

function openSettings() {
  console.log("=== openSettings начало ===");
  console.log("=== ТЕКУЩЕЕ СОСТОЯНИЕ ТЕМЫ ===");
  console.log("Режим:", state.settings.theme.mode);
  console.log(
    "customTokens:",
    JSON.stringify(state.settings.theme.customTokens),
  );
  console.log("alpha:", state.settings.theme.alpha);
  console.log("==============================");

  setActiveTab("schedule");
  settingsWarn.style.display = "none";
  settingsWarn.textContent = "";

  const s = state.settings.schedule;
  setStart.value = s.start;
  setEnd.value = s.end;
  setDefaultDur.value = String(s.defaultDuration);
  if (setWeekOffset) setWeekOffset.value = String(s.weekOffset ?? 0);
  if (setShowDate) setShowDate.value = s.showDate === false ? "no" : "yes";

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
  if (logoTileSize) logoTileSize.value = String(lg.tileSize ?? 30);

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

  // ✅ Обновляем список вариантов логотипа
  if (logoVariant) {
    logoVariant.innerHTML = "";

    const option1 = document.createElement("option");
    option1.value = "1";
    option1.textContent = "Логотип 1";
    logoVariant.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "2";
    option2.textContent = "Логотип 2";
    logoVariant.appendChild(option2);

    if (lg.uploadedFileData) {
      const option3 = document.createElement("option");
      option3.value = "3";
      option3.textContent = "Загруженный файл";
      logoVariant.appendChild(option3);
    }

    logoVariant.value = String(lg.variant ?? 1);
  }

  const logoUploadWrap = $("logoUploadWrap");
  if (logoUploadWrap && logoVariant) {
    logoUploadWrap.style.display = lg.variant === 3 ? "block" : "none";
  }

  if (logoHorizontalGapNum)
    logoHorizontalGapNum.value = String(lg.horizontalGap ?? 180);
  if (logoVerticalGapNum)
    logoVerticalGapNum.value = String(lg.verticalGap ?? 180);
  if (logoRotationNum) logoRotationNum.value = String(lg.rotation ?? 0);
  if (logoTileOffsetXNum)
    logoTileOffsetXNum.value = String(lg.tileOffsetX ?? 0);
  if (logoTileOffsetYNum)
    logoTileOffsetYNum.value = String(lg.tileOffsetY ?? 0);

  logoEnabled.checked = !!lg.enabled;
  logoOpacity.value = String(lg.opacity ?? 12);
  logoOpacityVal.textContent = `${logoOpacity.value}%`;
  logoRecolor.checked = !!lg.recolor;
  logoColor.value = lg.color || "#0ea5e9";
  logoColorWrap.style.display = logoRecolor.checked ? "block" : "none";

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

  // ✅ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Устанавливаем themeMode из состояния
  // Временно отключаем обработчик событий
  if (themeMode) {
    const originalHandler = themeMode.onchange;
    themeMode.onchange = null; // Отключаем временно

    // Устанавливаем значение из состояния
    themeMode.value = th.mode || "auto";
    console.log("themeMode установлен в:", themeMode.value);

    // Восстанавливаем обработчик
    setTimeout(() => {
      themeMode.onchange = originalHandler;
    }, 0);
  }

  renderThemePresetUI();
  fillThemeInputsFromState();

  setBackdropVisible(settingsBackdrop, true);

  // ✅ Синхронизируем значения контролов логотипа
  if (window.logoManager) {
    window.logoManager.controlSyncer.syncInitialValues();
    window.logoManager.syncPreview();
  }
  console.log("themeMode.value ПОСЛЕ:", themeMode?.value);
  console.log("=== openSettings конец ===");
  console.log("=== ТЕКУЩЕЕ СОСТОЯНИЕ ТЕМЫ ===");
  console.log("Режим:", state.settings.theme.mode);
  console.log(
    "customTokens:",
    JSON.stringify(state.settings.theme.customTokens),
  );
  console.log("alpha:", state.settings.theme.alpha);
  console.log("==============================");
}

function closeSettings() {
  setBackdropVisible(settingsBackdrop, false);
}

function saveSettings() {
  const issues = [];

  const startStr = setStart.value;
  const endStr = setEnd.value;
  const defaultDuration = Number(setDefaultDur.value);
  const weekOffset = setWeekOffset ? Number(setWeekOffset.value) : 0;
  const showDate =
    setShowDate ? setShowDate.value === "yes" : true;

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

  if (issues.length) {
    settingsWarn.style.display = "block";
    settingsWarn.textContent = issues.join(" ");
    return;
  }

  // ✅ Тема
  if (themeMode) state.settings.theme.mode = themeMode.value;
  if (typeof collectThemeInputs === "function") {
    state.settings.theme.customTokens = collectThemeInputs();
  }
  if (alphaToday) state.settings.theme.alpha.today = Number(alphaToday.value);
  if (alphaNow) state.settings.theme.alpha.now = Number(alphaNow.value);
  if (alphaEvent) state.settings.theme.alpha.event = Number(alphaEvent.value);
  if (alphaShadow)
    state.settings.theme.alpha.shadow = Number(alphaShadow.value);

  // ✅ Логотип - используем значения из контролов
  if (logoEnabled) state.settings.logo.enabled = !!logoEnabled.checked;
  if (logoOpacity) {
    state.settings.logo.opacity = clamp(
      Math.round(Number(logoOpacity.value ?? 12)),
      0,
      100,
    );
  }
  if (logoRecolor) state.settings.logo.recolor = !!logoRecolor.checked;
  if (logoColor)
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

  if (logoTileSize) {
    let tileSize = Number(logoTileSize.value);
    if (!Number.isFinite(tileSize)) tileSize = 30;
    tileSize = clamp(Math.round(tileSize), 0, 100);
    state.settings.logo.tileSize = tileSize;
  }

  if (logoTileOffsetX) {
    let tileOffsetX = Number(logoTileOffsetX.value);
    if (!Number.isFinite(tileOffsetX)) tileOffsetX = 0;
    tileOffsetX = clamp(Math.round(tileOffsetX), -2000, 2000);
    state.settings.logo.tileOffsetX = tileOffsetX;
  }

  if (logoTileOffsetY) {
    let tileOffsetY = Number(logoTileOffsetY.value);
    if (!Number.isFinite(tileOffsetY)) tileOffsetY = 0;
    tileOffsetY = clamp(Math.round(tileOffsetY), -2000, 2000);
    state.settings.logo.tileOffsetY = tileOffsetY;
  }

  if (logoVariant) {
    state.settings.logo.variant = clamp(
      Math.round(Number(logoVariant.value || 1)),
      1,
      3,
    );
  }

  // ✅ Очистка кэша логотипа
  if (window.logoManager) {
    window.logoManager.clearCache();
  }

  // ✅ Расписание
  state.settings.schedule.start = startStr;
  state.settings.schedule.end = endStr;
  state.settings.schedule.defaultDuration = defaultDuration;
  state.settings.schedule.maxPerCell = 2;
  state.settings.schedule.weekOffset = clamp(
    Math.round(Number(weekOffset) || 0),
    0,
    4,
  );
  state.settings.schedule.showDate = !!showDate;

  // ✅ Отображение
  if (dispShowToday)
    state.settings.display.showTodayHighlight = dispShowToday.value === "yes";

  let dayWidthPx = Number(dispDayWidth.value);
  if (!Number.isFinite(dayWidthPx) || dayWidthPx < 0) dayWidthPx = 0;
  if (dayWidthPx > 0) dayWidthPx = clamp(Math.round(dayWidthPx), 60, 800);
  state.settings.display.dayWidthPx = dayWidthPx;

  let cellPadPx = Number(dispCellPad.value);
  if (!Number.isFinite(cellPadPx) || cellPadPx < 0) cellPadPx = 0;
  cellPadPx = clamp(Math.round(cellPadPx), 0, 24);
  state.settings.display.cellPadPx = cellPadPx;

  if (dispCellView) state.settings.display.cellView = dispCellView.value;
  if (dispCardMode) state.settings.display.cardMode = dispCardMode.value;
  if (dispShowNotes)
    state.settings.display.showNotes = dispShowNotes.value === "yes";
  if (state.settings.display.showNotes === false) {
    clearToasts();
  }
  if (dispShowEmptyHint)
    state.settings.display.showEmptyHint = dispShowEmptyHint.value === "yes";

  // ✅ Шрифты
  const prev = state.settings.font || {};
  const mainFam = fontFamily?.value || prev.family || "system";
  const titleFam = fontTitleFamily?.value || prev.titleFamily || mainFam;
  const metaFam = fontMetaFamily?.value || prev.metaFamily || mainFam;

  if (fontPreset) state.settings.font.preset = fontPreset?.value || "custom";
  if (fontQuickTightness)
    state.settings.font.tightness = fontQuickTightness?.value || "normal";

  state.settings.font.family = mainFam;
  state.settings.font.titleFamily = titleFam;
  state.settings.font.metaFamily = metaFam;
  state.settings.font.lineHeight = lh;
  state.settings.font.titleSize1 = t1;
  state.settings.font.titleSize2 = t2;
  state.settings.font.metaSize1 = m1;
  state.settings.font.metaSize2 = m2;

  if (fontWeightTitle)
    state.settings.font.weightTitle = Number(fontWeightTitle.value);
  if (fontWeightMeta)
    state.settings.font.weightMeta = Number(fontWeightMeta.value);

  if (fontSampleText) {
    const st = (fontSampleText.value || "").trim();
    state.settings.font.sampleText =
      st || DEFAULT_STATE().settings.font.sampleText;
  }

  let letterSpacing = Number(fontLetterSpacing?.value);
  if (!Number.isFinite(letterSpacing)) letterSpacing = 0;
  letterSpacing = clamp(letterSpacing, -0.05, 0.2);
  if (fontLetterSpacing) state.settings.font.letterSpacing = letterSpacing;

  const textTransform = String(fontTextTransform?.value ?? "none");
  if (fontTextTransform) state.settings.font.textTransform = textTransform;

  let titleClamp = Number(fontTitleClamp?.value);
  if (!Number.isFinite(titleClamp)) titleClamp = 3;
  titleClamp = clamp(Math.round(titleClamp), 2, 4);
  if (fontTitleClamp) state.settings.font.titleClamp = titleClamp;

  let cardPadY = Number(fontCardPaddingY?.value);
  if (!Number.isFinite(cardPadY)) cardPadY = 7;
  cardPadY = clamp(Math.round(cardPadY), 2, 14);
  if (fontCardPaddingY) state.settings.font.cardPadY = cardPadY;

  let cardRadius = Number(fontCardRadius?.value);
  if (!Number.isFinite(cardRadius)) cardRadius = 12;
  cardRadius = clamp(Math.round(cardRadius), 0, 18);
  if (fontCardRadius) state.settings.font.cardRadius = cardRadius;

  // ✅ Сохранение и обновление
  pushHistory("Изменение настроек");
  saveState();

  // ✅ Закрываем диалог настроек
  closeSettings();

  renderAll();

  // ✅ Обновляем логотип
  if (window.logoManager) {
    setTimeout(() => {
      try {
        window.logoManager.update();
      } catch (error) {
        console.error("Ошибка обновления логотипа:", error);
      }
    }, 50);
  }

  // ✅ Уведомления
  toast("OK", "", "Настройки сохранены.");
}

function exportJson() {
  hardenState();
  const snapshot = deepCopy(state);
  snapshot.version = 13;
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const fileName = `schedule_${new Date().toISOString().slice(0, 10)}.json`;
  const mode = downloadFile(url, fileName);
  if (mode === "new-tab") {
    toast(
      "INFO",
      "Экспорт JSON",
      "Открыто в новой вкладке. В Safari сохраните файл через «Поделиться».",
    );
  } else {
    toast("OK", "Экспорт JSON", "Файл скачан.");
  }
}

function importJson(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const parsed = JSON.parse(r.result);
      if (!isValidState(parsed)) {
        throw new Error(
          "Некорректный формат: ожидаются settings и массив events.",
        );
      }

      if (!confirm("Импортировать данные? Текущие данные будут заменены."))
        return;
      pushHistory("Импорт JSON");
      state = migrateState(parsed);
      hardenState();
      saveState();
      renderAll();
      toast("OK", "Импорт выполнен", "Данные загружены.");
    } catch (e) {
      toast("ERR", "Импорт не удался", e.message || "Проверьте формат JSON.");
    }
  };
  r.readAsText(file, "UTF-8");
}

function isValidState(parsed) {
  return (
    parsed &&
    typeof parsed === "object" &&
    parsed.settings &&
    Array.isArray(parsed.events)
  );
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

// ==================== LOGO_RENDER ====================
class LogoCache {
  constructor() {
    this.metricsCache = null;
    this.metricsTimestamp = 0;
    this.tileCache = new Map();
    this.blobUrls = new Map();
  }

  clear() {
    // Очистка Blob URL для избежания утечек памяти
    for (const url of this.blobUrls.values()) {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        console.warn("Error revoking blob URL:", e);
      }
    }
    this.blobUrls.clear();
    this.tileCache.clear();
    this.metricsCache = null;
  }

  setBlobUrl(key, url) {
    // Удаляем старый URL если есть
    if (this.blobUrls.has(key)) {
      try {
        URL.revokeObjectURL(this.blobUrls.get(key));
      } catch (e) {
        console.warn("Error revoking old blob URL:", e);
      }
    }
    this.blobUrls.set(key, url);
  }

  getBlobUrl(key) {
    return this.blobUrls.get(key);
  }

  setTile(key, dataUrl) {
    this.tileCache.set(key, dataUrl);
  }

  getTile(key) {
    return this.tileCache.get(key);
  }

  clearTileCache() {
    this.tileCache.clear();
  }

  setMetrics(metrics) {
    this.metricsCache = metrics;
    this.metricsTimestamp = Date.now();
  }

  getMetrics() {
    const now = Date.now();
    if (
      this.metricsCache &&
      now - this.metricsTimestamp < LOGO_CONSTANTS.CACHE_TTL
    ) {
      return this.metricsCache;
    }
    return null;
  }
}

class LogoMetrics {
  constructor() {
    this.cache = new Map();
  }

  calculate(context = document) {
    const cacheKey = "metrics";
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const schedule = context.querySelector(".schedule");
    if (!schedule) {
      const result = this.calculateFallback(context);
      this.cache.set(cacheKey, result);
      return result;
    }

    let timeColWidth = schedule.classList.contains("compact-mode") ? 0 : 46;
    const timeCell = schedule.querySelector(".cell.time");
    if (timeCell) {
      timeColWidth = timeCell.offsetWidth || timeCell.getBoundingClientRect().width;
    }

    let dayHeadHeight = 42;
    const headCell = schedule.querySelector(".cell.head");
    if (headCell) {
      dayHeadHeight = headCell.offsetHeight || headCell.getBoundingClientRect().height;
    }

    let scheduleWidth, scheduleHeight;
    if (schedule.classList.contains("compact-mode")) {
      const cells = schedule.querySelectorAll(".cell.droppable");
      if (cells.length > 0) {
        const firstCell = cells[0];
        const cellRect = firstCell.getBoundingClientRect();
        scheduleWidth = cellRect.width * 7;
        scheduleHeight = schedule.scrollHeight;
      } else {
        scheduleWidth = schedule.scrollWidth;
        scheduleHeight = schedule.scrollHeight;
      }
    } else {
      scheduleWidth = schedule.scrollWidth;
      scheduleHeight = schedule.scrollHeight;
    }

    const contentWidth = Math.max(0, scheduleWidth - timeColWidth);
    const contentHeight = Math.max(0, scheduleHeight - dayHeadHeight);

    const result = {
      timeColWidth,
      dayHeadHeight,
      scheduleWidth,
      scheduleHeight,
      contentWidth,
      contentHeight,
    };

    this.cache.set(cacheKey, result);
    setTimeout(() => this.cache.delete(cacheKey), LOGO_CONSTANTS.CACHE_TTL);

    return result;
  }

  calculateFallback(context = document) {
  const computedStyle = getComputedStyle(context.documentElement);
  let timeColWidth = parseFloat(computedStyle.getPropertyValue("--timeCol")) || 46;
  const schedule = context.querySelector(".schedule");
  if (schedule && schedule.classList.contains("compact-mode")) {
    timeColWidth = 0;
  }
    const dayHeadHeight = 42;

    let scheduleWidth = 0;
    let scheduleHeight = 0;
    const scheduleWrap = context.querySelector(".schedule-wrap");
    if (scheduleWrap) {
      scheduleWidth = scheduleWrap.scrollWidth || scheduleWrap.offsetWidth;
      scheduleHeight = scheduleWrap.scrollHeight || scheduleWrap.offsetHeight;
    }

    return {
      timeColWidth,
      dayHeadHeight,
      scheduleWidth,
      scheduleHeight,
      contentWidth: Math.max(0, scheduleWidth - timeColWidth),
      contentHeight: Math.max(0, scheduleHeight - dayHeadHeight),
    };
  }

  clearCache() {
    this.cache.clear();
  }

  static calculate() {
    return new LogoMetrics().calculate();
  }

  static calculateFallback() {
    return new LogoMetrics().calculateFallback();
  }
}

class LogoAssetManager {
  constructor(cache) {
    this.cache = cache;
    this.builtInSvgs = {
      1: this.createCircleSvg(),
      2: this.createRectangleSvg(),
    };
  }

  createCircleSvg(color = "currentColor", opacity = 1) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="${color}" ${opacity < 1 ? `style="opacity:${opacity}"` : ""}/>
    </svg>`;
  }

  createRectangleSvg(color = "currentColor", opacity = 1) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="80" rx="15" fill="${color}" ${opacity < 1 ? `style="opacity:${opacity}"` : ""}/>
    </svg>`;
  }

  getDataUrl(variant, recolorColor = null, opacity = 100) {
    variant = Number(variant);
    const opacityValue = opacity / 100;

    if (variant === 3) {
      const fileData = state.settings.logo?.uploadedFileData;
      if (fileData && fileData.startsWith("data:")) {
        return this.processUploadedFile(fileData, recolorColor, opacityValue);
      }
      variant = 1;
    }

    let svgString;
    if (variant === 1) {
      svgString = this.createCircleSvg(
        recolorColor || "currentColor",
        opacityValue,
      );
    } else if (variant === 2) {
      svgString = this.createRectangleSvg(
        recolorColor || "currentColor",
        opacityValue,
      );
    } else {
      svgString = this.createCircleSvg(
        recolorColor || "currentColor",
        opacityValue,
      );
    }

    const base64 = btoa(unescape(encodeURIComponent(svgString)));
    return `data:image/svg+xml;base64,${base64}`;
  }

  processUploadedFile(fileData, recolorColor, opacity) {
    if (!recolorColor && opacity >= 1) {
      return fileData;
    }

    const base64 = fileData.split(",")[1];
    let svgText = atob(base64);

    if (recolorColor && fileData.includes("image/svg+xml")) {
      svgText = svgText.replace(
        /(fill|stroke)="[^"]*"/g,
        `$1="${recolorColor}"`,
      );
    }

    if (opacity < 1) {
      const svgStart = svgText.indexOf("<svg");
      if (svgStart !== -1) {
        const svgEnd = svgText.indexOf(">", svgStart);
        const svgTag = svgText.substring(svgStart, svgEnd + 1);

        if (svgTag.includes('style="')) {
          svgText = svgText.replace(
            /style="([^"]*)"/,
            `style="$1;opacity:${opacity}"`,
          );
        } else {
          svgText = svgText.replace(
            svgTag,
            svgTag.replace(">", ` style="opacity:${opacity}">`),
          );
        }
      }
    }

    return `data:image/svg+xml;base64,${btoa(svgText)}`;
  }

  getTileSrc(
    variant,
    tileSize,
    horizontalGap,
    verticalGap,
    rotation,
    layout,
    recolorColor,
    opacity,
  ) {
    const key = `${variant}|${tileSize}|${horizontalGap}|${verticalGap}|${rotation}|${layout}|${recolorColor}|${opacity}`;

    const cached = this.cache.getTile(key);
    if (cached) {
      return cached;
    }

    const logoDataUrl = this.getDataUrl(variant, recolorColor, opacity);
    let svg;

    if (layout === "diagonal") {
      const cellW = tileSize + horizontalGap;
      const cellH = tileSize + verticalGap;
      svg = this.createDiagonalPattern(
        cellW,
        cellH,
        tileSize,
        rotation,
        logoDataUrl,
      );
    } else {
      const cellW = tileSize + horizontalGap;
      const cellH = tileSize + verticalGap;
      svg = this.createTilePattern(
        cellW,
        cellH,
        tileSize,
        rotation,
        logoDataUrl,
      );
    }

    const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    this.cache.setTile(key, dataUrl);

    return dataUrl;
  }

  createTilePattern(cellW, cellH, tileSize, rotation, logoDataUrl) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${cellW}" height="${cellH}" viewBox="0 0 ${cellW} ${cellH}">
      <defs>
        <pattern id="pattern" patternUnits="userSpaceOnUse" width="${cellW}" height="${cellH}">
          <g transform="translate(${cellW / 2}, ${cellH / 2}) rotate(${rotation}) translate(${-tileSize / 2}, ${-tileSize / 2})">
            <image href="${logoDataUrl}" width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid meet"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern)"/>
    </svg>`;
  }

  createDiagonalPattern(cellW, cellH, tileSize, rotation, logoDataUrl) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${cellW * 2}" height="${cellH * 2}" viewBox="0 0 ${cellW * 2} ${cellH * 2}">
      <defs>
        <pattern id="pattern" patternUnits="userSpaceOnUse" width="${cellW * 2}" height="${cellH * 2}">
          <g transform="translate(${cellW / 2}, ${cellH / 2}) rotate(${rotation}) translate(${-tileSize / 2}, ${-tileSize / 2})">
            <image href="${logoDataUrl}" width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid meet"/>
          </g>
          <g transform="translate(${cellW * 1.5}, ${cellH * 1.5}) rotate(${rotation}) translate(${-tileSize / 2}, ${-tileSize / 2})">
            <image href="${logoDataUrl}" width="${tileSize}" height="${tileSize}" preserveAspectRatio="xMidYMid meet"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern)"/>
    </svg>`;
  }
}

class LogoRenderer {
  constructor(assetManager, cache) {
    this.assetManager = assetManager;
    this.cache = cache;
    this.layer = null;
    this.mark = null;
    this.metrics = new LogoMetrics();
  }

  ensureLayer() {
    const scheduleWrap = document.querySelector(".schedule-wrap");
    if (!scheduleWrap) return false;

    if (!this.layer) {
      const existingLayers = Array.from(
        scheduleWrap.querySelectorAll("#logoLayer"),
      );
      this.layer = existingLayers[0] || null;
      if (!this.layer) {
        this.layer = document.createElement("div");
        this.layer.id = "logoLayer";
        this.layer.setAttribute("aria-hidden", "true");
        scheduleWrap.appendChild(this.layer);
      }
      // Удаляем дубликаты слоев, если они есть
      if (existingLayers.length > 1) {
        existingLayers.slice(1).forEach((dup) => dup.remove());
      }
    }

    if (!this.mark) {
      const existingMark =
        this.layer?.querySelector("#logoMark") ||
        scheduleWrap.querySelector("#logoMark");
      this.mark = existingMark || null;
      if (!this.mark) {
        this.mark = document.createElement("div");
        this.mark.id = "logoMark";
        this.mark.setAttribute("aria-hidden", "true");
        this.layer.appendChild(this.mark);
      } else if (this.layer && this.mark.parentElement !== this.layer) {
        this.layer.appendChild(this.mark);
      }
    }

    if (scheduleWrap.style.position !== "relative") {
      scheduleWrap.style.position = "relative";
    }

    return true;
  }

  calculateTileSize(percent, metrics, layout) {
    const safePercent = clamp(Number(percent), 0, 1000);

    if (!metrics || !metrics.contentWidth || !metrics.contentHeight) {
      const defaultPixelSize = Math.round((safePercent / 100) * 300);
      return Math.max(LOGO_CONSTANTS.MIN_TILE_SIZE, defaultPixelSize);
    }

    if (layout === "center") {
      const minContentDimension = Math.min(
        metrics.contentWidth,
        metrics.contentHeight,
      );
      const pixelSize = Math.round((safePercent / 100) * minContentDimension);
      return Math.max(LOGO_CONSTANTS.MIN_TILE_SIZE, pixelSize);
    }

    const pixelSize = Math.round((safePercent / 100) * metrics.contentWidth);
    return Math.max(LOGO_CONSTANTS.MIN_TILE_SIZE, pixelSize);
  }

  render(logoState) {
    if (!logoState.enabled) {
      this.hide();
      return;
    }

    if (!this.ensureLayer()) return;

    const metrics = this.cache.getMetrics() || this.metrics.calculate();
    this.cache.setMetrics(metrics);

    this.clearStyles();

    const layout = logoState.layout || LOGO_CONSTANTS.DEFAULT_LAYOUT;
    const opacity = (logoState.opacity || LOGO_CONSTANTS.DEFAULT_OPACITY) / 100;
    const variant = this.getVariant(logoState);
    const recolor = !!logoState.recolor;
    const color = logoState.color || LOGO_CONSTANTS.DEFAULT_COLOR;

    this.showLayer();

    if (layout === "center") {
      this.renderCenter(logoState, metrics, variant, opacity, recolor, color);
    } else if (layout === "tile" || layout === "diagonal") {
      this.renderTile(
        logoState,
        metrics,
        variant,
        opacity,
        recolor,
        color,
        layout,
      );
    }

    this.show();
  }

  renderCenter(logoState, metrics, variant, opacity, recolor, color) {
    const tileSizePercent = clamp(
      Number(logoState.tileSize || LOGO_CONSTANTS.DEFAULT_TILE_SIZE),
      0,
      1000,
    );
    const tileSize = this.calculateTileSize(tileSizePercent, metrics, "center");

    const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
    const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;
    const halfSize = tileSize / 2;

    let left = centerX - halfSize;
    let top = centerY - halfSize;

    // Ограничиваем границами
    const leftBoundary = metrics.timeColWidth;
    const rightBoundary = metrics.timeColWidth + metrics.contentWidth;
    const topBoundary = metrics.dayHeadHeight;
    const bottomBoundary = metrics.dayHeadHeight + metrics.contentHeight;

    if (left < leftBoundary) left = leftBoundary;
    if (left + tileSize > rightBoundary) left = rightBoundary - tileSize;
    if (top < topBoundary) top = topBoundary;
    if (top + tileSize > bottomBoundary) top = bottomBoundary - tileSize;

    const rotation = logoState.rotation || LOGO_CONSTANTS.DEFAULT_ROTATION;
    const src = this.assetManager.getDataUrl(variant, recolor ? color : null);

    this.mark.style.cssText = `
      position: absolute;
      pointer-events: none;
      z-index: 1;
      opacity: ${opacity};
      width: ${tileSize}px;
      height: ${tileSize}px;
      left: ${left}px;
      top: ${top}px;
      transform: rotate(${rotation}deg);
    `;

    this.applyLogoStyle(recolor && variant === 3, src, color, false);
  }

  renderTile(logoState, metrics, variant, opacity, recolor, color, layout) {
    const tileSize = Math.max(
      LOGO_CONSTANTS.MIN_TILE_SIZE,
      Math.min(
        LOGO_CONSTANTS.MAX_TILE_SIZE,
        Number(logoState.tileSize) || LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
      ),
    );

    const horizontalGap = Number(
      logoState.horizontalGap || LOGO_CONSTANTS.DEFAULT_GAP,
    );
    const verticalGap = Number(
      logoState.verticalGap || LOGO_CONSTANTS.DEFAULT_GAP,
    );
    const rotation = logoState.rotation || LOGO_CONSTANTS.DEFAULT_ROTATION;

    this.mark.style.cssText = `
      position: absolute;
      pointer-events: none;
      z-index: 1;
      opacity: ${opacity};
      left: ${metrics.timeColWidth}px;
      top: ${metrics.dayHeadHeight}px;
      width: ${metrics.contentWidth}px;
      height: ${metrics.contentHeight}px;
    `;

    const src = this.assetManager.getTileSrc(
      variant,
      tileSize,
      horizontalGap,
      verticalGap,
      rotation,
      layout,
      recolor ? color : null,
      logoState.opacity,
    );

    this.applyLogoStyle(recolor && variant === 3, src, color, true);

    // Размер паттерна
    const patternSize =
      layout === "diagonal"
        ? `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`
        : `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;

    this.mark.style.backgroundSize = patternSize;
    if (recolor && variant === 3) {
      this.mark.style.webkitMaskSize = patternSize;
      this.mark.style.maskSize = patternSize;
    }

    // Смещение
    const offsetX = Number(
      logoState.tileOffsetX || LOGO_CONSTANTS.DEFAULT_OFFSET,
    );
    const offsetY = Number(
      logoState.tileOffsetY || LOGO_CONSTANTS.DEFAULT_OFFSET,
    );

    this.mark.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    if (recolor && variant === 3) {
      this.mark.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
      this.mark.style.maskPosition = `${offsetX}px ${offsetY}px`;
    }
  }

  applyLogoStyle(isRecoloredVariant3, src, color, isRepeat) {
    if (isRecoloredVariant3) {
      this.mark.style.backgroundColor = color;
      this.mark.style.webkitMaskImage = `url(${src})`;
      this.mark.style.maskImage = `url(${src})`;
      this.mark.style.webkitMaskRepeat = isRepeat ? "repeat" : "no-repeat";
      this.mark.style.maskRepeat = isRepeat ? "repeat" : "no-repeat";

      if (!isRepeat) {
        this.mark.style.webkitMaskPosition = "center";
        this.mark.style.maskPosition = "center";
        this.mark.style.webkitMaskSize = "contain";
        this.mark.style.maskSize = "contain";
      }

      this.mark.style.backgroundImage = "none";
    } else {
      this.mark.style.backgroundImage = `url(${src})`;
      this.mark.style.backgroundRepeat = isRepeat ? "repeat" : "no-repeat";
      if (!isRepeat) {
        this.mark.style.backgroundPosition = "center";
        this.mark.style.backgroundSize = "contain";
      }
    }
  }

  getVariant(logoState) {
    const variant = logoState.variant;
    if (variant === 3 && !logoState.uploadedFileData) {
      return 1;
    }
    return clamp(Math.round(Number(variant ?? 1)), 1, 3);
  }

  clearStyles() {
    if (this.mark) this.mark.style.cssText = "";
    if (this.layer) this.layer.style.cssText = "";
  }

  showLayer() {
    if (this.layer) {
      this.layer.style.cssText = `
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
    }

    const schedule = document.querySelector(".schedule");
    if (schedule) {
      schedule.style.position = "relative";
      schedule.style.zIndex = "2";
    }
  }

  show() {
    if (this.layer) this.layer.style.display = "block";
    if (this.mark) this.mark.style.display = "block";
  }

  hide() {
    if (this.layer) this.layer.style.display = "none";
    if (this.mark) this.mark.style.display = "none";
  }
}

class ControlSyncer {
  constructor(logoManager) {
    this.logoManager = logoManager;
    this.controls = [
      {
        slider: "logoTileSize",
        num: "logoTileSizeNum",
        param: "tileSize",
        min: 0,
        max: 1000,
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
        num: "logoOpacityNum",
        val: "logoOpacityVal",
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
      },
      {
        slider: "logoTileOffsetY",
        num: "logoTileOffsetYNum",
        param: "tileOffsetY",
        min: -2000,
        max: 2000,
      },
    ];

    this.debounceTimers = new Map();
    this.initialized = false;
  }

  setup() {
    if (this.initialized) return;

    this.controls.forEach((control) => {
      const slider = $(control.slider);
      const numInput = $(control.num);
      const valOutput = control.val ? $(control.val) : null;

      if (slider) {
        slider.addEventListener(
          "input",
          this.debounce(() => {
            this.handleSliderChange(control, slider.value);
          }, control.param),
        );
      }

      if (numInput && numInput.tagName === "INPUT") {
        numInput.addEventListener(
          "input",
          this.debounce(() => {
            this.handleNumberInputChange(control, numInput.value);
          }, control.param),
        );
      }
    });

    this.initialized = true;
  }

  handleSliderChange(control, value) {
    const numValue = this.validateValue(value, control);
    this.updateControls(control, numValue);
    this.updateState(control.param, numValue);
  }

  handleNumberInputChange(control, value) {
    const numValue = this.validateValue(value, control);
    this.updateControls(control, numValue);
    this.updateState(control.param, numValue);
  }

  validateValue(value, control) {
    let numValue = Number(value);
    if (isNaN(numValue)) {
      numValue = control.min;
    }
    return clamp(Math.round(numValue), control.min, control.max);
  }

  updateControls(control, value) {
    const slider = $(control.slider);
    const numInput = $(control.num);
    const valOutput = control.val ? $(control.val) : null;

    if (slider && Number(slider.value) !== value) {
      slider.value = value;
    }

    if (
      numInput &&
      numInput.tagName === "INPUT" &&
      Number(numInput.value) !== value
    ) {
      numInput.value = value;
    }

    if (valOutput && control.unit) {
      valOutput.textContent = `${value}${control.unit}`;
    }
  }

  updateState(param, value) {
    if (!state.settings.logo) {
      state.settings.logo = {};
    }

    if (state.settings.logo[param] !== value) {
      state.settings.logo[param] = value;
      this.logoManager?.update();
    }
  }

  debounce(fn, key) {
    return (...args) => {
      clearTimeout(this.debounceTimers.get(key));
      const timer = setTimeout(
        () => fn(...args),
        LOGO_CONSTANTS.DEBOUNCE_DELAY,
      );
      this.debounceTimers.set(key, timer);
    };
  }

  syncInitialValues() {
    const lg = state.settings.logo || {};

    this.controls.forEach((control) => {
      const value =
        lg[control.param] !== undefined
          ? lg[control.param]
          : control.param === "tileSize"
            ? LOGO_CONSTANTS.DEFAULT_TILE_SIZE
            : control.param === "horizontalGap" ||
                control.param === "verticalGap"
              ? LOGO_CONSTANTS.DEFAULT_GAP
              : control.param === "rotation"
                ? LOGO_CONSTANTS.DEFAULT_ROTATION
                : control.param === "opacity"
                  ? LOGO_CONSTANTS.DEFAULT_OPACITY
                  : LOGO_CONSTANTS.DEFAULT_OFFSET;

      this.updateControls(control, value);
    });
  }

  syncAllControls() {
    this.syncInitialValues();
  }
}

class LogoPreview {
  constructor(assetManager) {
    this.assetManager = assetManager;
    this.container = null;
    this.preview = null;
  }

  init() {
    this.container = $("logoPreviewContainer");
    if (!this.container) return;

    this.preview = document.createElement("div");
    this.preview.className = "logo-preview";
    this.container.appendChild(this.preview);
  }

  sync(logoState) {
    if (!this.preview) this.init();
    if (!this.preview) return;

    this.preview.style.cssText = "";

    if (!logoState.enabled) {
      this.preview.style.display = "none";
      return;
    }

    this.preview.style.display = "block";
    this.preview.style.width = "100px";
    this.preview.style.height = "100px";

    const opacity = (logoState.opacity || LOGO_CONSTANTS.DEFAULT_OPACITY) / 100;
    this.preview.style.opacity = `${opacity}`;

    const layout = logoState.layout || LOGO_CONSTANTS.DEFAULT_LAYOUT;
    const variant = this.getVariant(logoState);
    const recolor = !!logoState.recolor;
    const color = logoState.color || LOGO_CONSTANTS.DEFAULT_COLOR;

    if (layout === "center") {
      this.renderCenterPreview(variant, recolor, color);
    } else {
      this.renderTilePreview(logoState, variant, recolor, color, layout);
    }
  }

  renderCenterPreview(variant, recolor, color) {
    const src = this.assetManager.getDataUrl(variant, recolor ? color : null);

    this.preview.style.backgroundImage = `url(${src})`;
    this.preview.style.backgroundRepeat = "no-repeat";
    this.preview.style.backgroundSize = "contain";
    this.preview.style.backgroundPosition = "center";

    if (recolor && variant === 3) {
      this.preview.style.backgroundColor = color;
      this.preview.style.webkitMaskImage = `url(${src})`;
      this.preview.style.maskImage = `url(${src})`;
      this.preview.style.webkitMaskSize = "contain";
      this.preview.style.maskSize = "contain";
      this.preview.style.webkitMaskRepeat = "no-repeat";
      this.preview.style.maskRepeat = "no-repeat";
      this.preview.style.webkitMaskPosition = "center";
      this.preview.style.maskPosition = "center";
      this.preview.style.backgroundImage = "none";
    }
  }

  renderTilePreview(logoState, variant, recolor, color, layout) {
    const tileSize = Math.max(
      LOGO_CONSTANTS.MIN_TILE_SIZE,
      Math.min(
        100,
        Number(logoState.tileSize) || LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
      ),
    );

    const horizontalGap = Number(
      logoState.horizontalGap || LOGO_CONSTANTS.DEFAULT_GAP,
    );
    const verticalGap = Number(
      logoState.verticalGap || LOGO_CONSTANTS.DEFAULT_GAP,
    );
    const rotation = logoState.rotation || LOGO_CONSTANTS.DEFAULT_ROTATION;

    const tileSrc = this.assetManager.getTileSrc(
      variant,
      tileSize,
      horizontalGap,
      verticalGap,
      rotation,
      layout,
      recolor ? color : null,
    );

    this.preview.style.backgroundImage = `url(${tileSrc})`;
    this.preview.style.backgroundRepeat = "repeat";
    this.preview.style.backgroundSize = `${tileSize}px ${tileSize}px`;
  }

  getVariant(logoState) {
    const variant = logoState.variant;
    if (variant === 3 && !logoState.uploadedFileData) {
      return 1;
    }
    return clamp(Math.round(Number(variant ?? 1)), 1, 3);
  }
}

class LogoEventManager {
  constructor(logoManager) {
    this.logoManager = logoManager;
    this.handlers = new Map();
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    this.setupVariantHandler();
    this.setupUploadHandler();
    this.setupLayoutHandler();
    this.setupOpacityHandler();
    this.setupRecolorHandler();
    this.setupColorHandler();
    this.setupEnabledHandler();
    this.setupFileClearHandler();
    this.setupCSSVariables();

    this.initialized = true;
  }

  setupEventListeners() {
    // Обработчик изменения размера окна
    window.addEventListener("resize", () => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.cache.clear();
        if (this.isInitialized) {
          this.update();
        }
      }, 250);
    });

    // Обработчик изменения ориентации
    window.addEventListener("orientationchange", () => {
      if (this.orientationTimer) clearTimeout(this.orientationTimer);
      this.orientationTimer = setTimeout(() => {
        this.cache.clear();
        if (this.isInitialized) {
          this.update();
        }
      }, 300);
    });

    // Обработчик видимости вкладки
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && this.isInitialized) {
        setTimeout(() => this.update(), 100);
      }
    });
  }

  setupVariantHandler() {
    const logoVariant = $("logoVariant");
    if (!logoVariant) return;

    const handler = () => {
      const variant = Number(logoVariant.value);
      state.settings.logo.variant = variant;

      const logoUploadWrap = $("logoUploadWrap");
      if (logoUploadWrap) {
        logoUploadWrap.style.display = variant === 3 ? "block" : "none";
      }

      this.updateVariantDropdown();
      this.logoManager.update();
    };

    logoVariant.addEventListener("change", handler);
    this.handlers.set("logoVariant", handler);
  }

  setupUploadHandler() {
    const logoUpload = $("logoUpload");
    if (!logoUpload) return;

    const handler = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!this.validateFile(file)) {
        toast("WARN", "Ошибка", "Неподдерживаемый тип файла");
        logoUpload.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        state.settings.logo.uploadedFileData = event.target.result;
        state.settings.logo.variant = 3;

        this.updateVariantDropdown();
        this.logoManager.update();
        logoUpload.value = "";
      };

      reader.onerror = () => {
        toast("ERR", "Ошибка", "Не удалось загрузить файл");
        logoUpload.value = "";
      };

      reader.readAsDataURL(file);
    };

    logoUpload.addEventListener("change", handler);
    this.handlers.set("logoUpload", handler);
  }

  validateFile(file) {
    if (!LOGO_CONSTANTS.VALID_FILE_TYPES.includes(file.type)) {
      return false;
    }

    if (file.size > LOGO_CONSTANTS.FILE_MAX_SIZE) {
      toast(
        "WARN",
        "Внимание",
        "Файл слишком большой, рекомендуемый размер до 5MB",
      );
      return true;
    }

    return true;
  }

  updateVariantDropdown() {
    const logoVariant = $("logoVariant");
    if (!logoVariant) return;

    const lg = state.settings.logo || {};
    const hasUploadedFile = !!lg.uploadedFileData;

    // Сохраняем текущее значение
    const currentValue = logoVariant.value;
    const scrollTop = logoVariant.scrollTop;

    // Очищаем список
    logoVariant.innerHTML = "";

    // Добавляем стандартные опции
    const option1 = document.createElement("option");
    option1.value = "1";
    option1.textContent = "Логотип 1";
    logoVariant.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "2";
    option2.textContent = "Логотип 2";
    logoVariant.appendChild(option2);

    // Добавляем вариант для загруженного файла, если он есть
    if (hasUploadedFile) {
      const option3 = document.createElement("option");
      option3.value = "3";
      option3.textContent = "Загруженный файл";
      logoVariant.appendChild(option3);
    }

    // Восстанавливаем выбранное значение
    let targetValue = currentValue;

    // Если выбран вариант 3, но файл не загружен, переключаем на вариант 1
    if (currentValue === "3" && !hasUploadedFile) {
      targetValue = "1";
      state.settings.logo.variant = 1;
    }

    // Если целевого значения нет в списке, выбираем первое доступное
    const optionExists = Array.from(logoVariant.options).some(
      (opt) => opt.value === targetValue,
    );
    if (!optionExists && logoVariant.options.length > 0) {
      targetValue = logoVariant.options[0].value;
    }

    // Устанавливаем значение
    logoVariant.value = targetValue;

    // Восстанавливаем позицию прокрутки
    logoVariant.scrollTop = scrollTop;

    // Обновляем видимость блока загрузки файла
    const logoUploadWrap = $("logoUploadWrap");
    if (logoUploadWrap) {
      logoUploadWrap.style.display =
        logoVariant.value === "3" ? "block" : "none";
    }
  }

  setupLayoutHandler() {
    const logoLayout = $("logoLayout");
    if (!logoLayout) return;

    const handler = () => {
      state.settings.logo.layout = logoLayout.value;
      this.logoManager.update();
    };

    logoLayout.addEventListener("change", handler);
    this.handlers.set("logoLayout", handler);
  }

  setupOpacityHandler() {
    const logoOpacity = $("logoOpacity");
    const logoOpacityVal = $("logoOpacityVal");
    const logoOpacityNum = $("logoOpacityNum");

    if (!logoOpacity) return;

    const handler = () => {
      const value = clamp(Math.round(Number(logoOpacity.value)), 0, 100);
      state.settings.logo.opacity = value;

      if (logoOpacityVal) logoOpacityVal.textContent = `${value}%`;
      if (logoOpacityNum) logoOpacityNum.value = String(value);

      this.updateCSSVariables();
      this.logoManager.update();
    };

    logoOpacity.addEventListener("input", handler);
    this.handlers.set("logoOpacity", handler);
  }

  setupRecolorHandler() {
    const logoRecolor = $("logoRecolor");
    const logoColorWrap = $("logoColorWrap");

    if (!logoRecolor) return;

    const handler = () => {
      state.settings.logo.recolor = logoRecolor.checked;

      if (logoColorWrap) {
        logoColorWrap.style.display = logoRecolor.checked ? "block" : "none";
      }

      this.updateCSSVariables();
      this.logoManager.update();
    };

    logoRecolor.addEventListener("change", handler);
    this.handlers.set("logoRecolor", handler);
  }

  setupColorHandler() {
    const logoColor = $("logoColor");
    if (!logoColor) return;

    const handler = () => {
      state.settings.logo.color = logoColor.value;
      this.updateCSSVariables();
      this.logoManager.update();
    };

    logoColor.addEventListener("change", handler);
    this.handlers.set("logoColor", handler);
  }

  setupEnabledHandler() {
    const logoEnabled = $("logoEnabled");
    if (!logoEnabled) return;

    const handler = () => {
      state.settings.logo.enabled = logoEnabled.checked;
      this.logoManager.update();
    };

    logoEnabled.addEventListener("change", handler);
    this.handlers.set("logoEnabled", handler);
  }

  setupFileClearHandler() {
    const logoClearUpload = $("logoClearUpload");
    if (!logoClearUpload) return;

    const handler = () => {
      if (confirm("Удалить загруженный файл?")) {
        state.settings.logo.uploadedFileData = null;
        state.settings.logo.variant = 1;

        this.updateVariantDropdown();
        this.logoManager.update();
      }
    };

    logoClearUpload.addEventListener("click", handler);
    this.handlers.set("logoClearUpload", handler);
  }

  setupCSSVariables() {
    this.updateCSSVariables();
  }

  updateCSSVariables() {
    const lg = state.settings.logo || {};

    document.documentElement.style.setProperty(
      "--logo-tile-size",
      `${lg.tileSize || LOGO_CONSTANTS.DEFAULT_TILE_SIZE}%`,
    );
    document.documentElement.style.setProperty(
      "--logo-offset-x",
      `${lg.tileOffsetX || LOGO_CONSTANTS.DEFAULT_OFFSET}px`,
    );
    document.documentElement.style.setProperty(
      "--logo-offset-y",
      `${lg.tileOffsetY || LOGO_CONSTANTS.DEFAULT_OFFSET}px`,
    );
    document.documentElement.style.setProperty(
      "--logo-opacity",
      `${(lg.opacity || LOGO_CONSTANTS.DEFAULT_OPACITY) / 100}`,
    );
    document.documentElement.style.setProperty(
      "--logo-color",
      lg.color || LOGO_CONSTANTS.DEFAULT_COLOR,
    );
  }

  removeVariantOption3() {
    const logoVariant = $("logoVariant");
    if (!logoVariant) return;

    for (let i = 0; i < logoVariant.options.length; i++) {
      if (logoVariant.options[i].value === "3") {
        logoVariant.remove(i);
        break;
      }
    }
  }

  destroy() {
    for (const [key, handler] of this.handlers) {
      const element = $(key);
      if (element) {
        if (key === "logoOpacity") {
          element.removeEventListener("input", handler);
        } else if (key === "logoClearUpload") {
          element.removeEventListener("click", handler);
        } else {
          element.removeEventListener("change", handler);
        }
      }
    }
    this.handlers.clear();
    this.initialized = false;
  }
}

class LogoManager {
  constructor() {
    this.cache = new LogoCache();
    this.assetManager = new LogoAssetManager(this.cache);
    this.renderer = new LogoRenderer(this.assetManager, this.cache);
    this.controlSyncer = new ControlSyncer(this);
    this.preview = new LogoPreview(this.assetManager);
    this.eventManager = new LogoEventManager(this);

    this.lastStateHash = "";
    this.isInitialized = false;
    this.resizeTimer = null;
    this.orientationTimer = null;
  }

  init() {
    if (this.isInitialized) return;

    try {
      this.controlSyncer.setup();
      this.eventManager.init();
      this.controlSyncer.syncInitialValues();

      this.preview.init();
      this.syncPreview();
      this.setupResizeHandlers();

      this.setupGlobalMethods();

      this.isInitialized = true;

      // Первоначальный рендеринг
      setTimeout(() => this.update(), 100);

      console.log("LogoManager успешно инициализирован");
    } catch (error) {
      console.error("Ошибка инициализации LogoManager:", error);
      throw error;
    }
  }

  update() {
    try {
      const logoState = this.getState();
      const newHash = this.getStateHash(logoState);

      if (newHash === this.lastStateHash) {
        return;
      }

      this.lastStateHash = newHash;

      this.renderer.render(logoState);
      this.syncPreview();
      this.scheduleSave();

      console.log("Логотип обновлен");
    } catch (error) {
      console.error("Ошибка обновления логотипа:", error);
      this.handleError(error);
    }
  }

  getState() {
    return state.settings.logo || {};
  }

  getStateHash(logoState) {
    return JSON.stringify({
      enabled: logoState.enabled,
      variant: logoState.variant,
      opacity: logoState.opacity,
      recolor: logoState.recolor,
      color: logoState.color,
      layout: logoState.layout,
      tileSize: logoState.tileSize,
      horizontalGap: logoState.horizontalGap,
      verticalGap: logoState.verticalGap,
      rotation: logoState.rotation,
      tileOffsetX: logoState.tileOffsetX,
      tileOffsetY: logoState.tileOffsetY,
      uploadedFileData: logoState.uploadedFileData ? "has-file" : "no-file",
    });
  }

  syncPreview() {
    try {
      this.preview.sync(this.getState());
    } catch (error) {
      console.warn("Ошибка синхронизации предпросмотра:", error);
    }
  }

  scheduleSave() {
    if (typeof scheduleAutoSave === "function") {
      scheduleAutoSave("логотип обновлен");
    }
  }

  clearCache() {
    this.cache.clear();
  }

  setupResizeHandlers() {
    if (this._onResize || this._onOrientation) return;

    this._onResize = () => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        try {
          this.cache.clear();
          this.renderer?.metrics?.clearCache?.();
          if (typeof updateLogoCSSVariables === "function") {
            updateLogoCSSVariables();
          }
          this.update();
        } catch (error) {
          console.warn("LogoManager resize update error:", error);
        }
      }, 150);
    };

    this._onOrientation = () => {
      if (this.orientationTimer) clearTimeout(this.orientationTimer);
      this.orientationTimer = setTimeout(() => {
        if (this._onResize) this._onResize();
      }, 250);
    };

    window.addEventListener("resize", this._onResize, { passive: true });
    window.addEventListener("orientationchange", this._onOrientation, {
      passive: true,
    });
  }

  setupGlobalMethods() {
    // Для обратной совместимости
    window.getScheduleMetrics = () => this.renderer.metrics.calculate();
    window.clearTileBlobCache = () => this.clearCache();
    window.getTileSrc = (...args) => this.assetManager.getTileSrc(...args);
    window.getLogoDataUrl = (...args) => this.assetManager.getDataUrl(...args);
  }

  handleError(error) {
    console.error("Критическая ошибка в LogoManager:", error);

    // Пытаемся восстановить
    try {
      this.renderer.hide();
      this.clearCache();

      setTimeout(() => {
        try {
          this.update();
        } catch (retryError) {
          console.error("Не удалось восстановить логотип:", retryError);
        }
      }, 1000);
    } catch (recoveryError) {
      console.error("Не удалось обработать ошибку:", recoveryError);
    }
  }

  destroy() {
    try {
      this.renderer.hide();
      this.clearCache();
      this.eventManager.destroy();

      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      if (this.orientationTimer) clearTimeout(this.orientationTimer);
      if (this._onResize) {
        window.removeEventListener("resize", this._onResize);
      }
      if (this._onOrientation) {
        window.removeEventListener("orientationchange", this._onOrientation);
      }
      this._onResize = null;
      this._onOrientation = null;

      this.isInitialized = false;
      console.log("LogoManager уничтожен");
    } catch (error) {
      console.error("Ошибка при уничтожении LogoManager:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.LogoManager = LogoManager;
  window.LogoAssetManager = LogoAssetManager;
  window.LogoRenderer = LogoRenderer;
  window.LogoCache = LogoCache;
  window.LogoMetrics = LogoMetrics;
  window.ControlSyncer = ControlSyncer;
  window.LogoPreview = LogoPreview;
  window.LogoEventManager = LogoEventManager;
  window.LOGO_CONSTANTS = LOGO_CONSTANTS;

  console.log("Модули логотипа загружены и готовы к использованию");
});

// ==================== LOGO_RENDER ====================

// ==================== ПЕРЕНОС_СКРОЛЛ ====================






































const CELL_HEIGHT_CONFIG = {
  MIN_CELL_HEIGHT: 72,
  EVENT_GAP: 2,
  CELL_PADDING: 6,
  MIN_EVENT_HEIGHT: 30,
  TITLE_LINES: 3,
  META_LINES: 2,
  DOUBLE_TITLE_LINES: 2,
  DOUBLE_META_LINES: 2,
};

const TOUCH_DRAG_CONFIG = {
  ACTIVATION_DELAY: 500,
  FEEDBACK_RADIUS: 24,
  CANCEL_ZONE_SIZE: 60,
  AUTO_SCROLL_THRESHOLD: 50,
  AUTO_SCROLL_SPEED: 15, // Увеличена скорость
  VIBRATION_SHORT: 20,
  VIBRATION_CANCEL: 50,
  MOUSE_ACTIVATION_THRESHOLD_PX: 5,
  TOUCH_ACTIVATION_THRESHOLD_PX: 10,
};

function applyTitleStyles(element, lines) {
  const title = element?.querySelector?.(".t");
  if (!title) return;

  const set = (prop, value) => title.style.setProperty(prop, value, "important");
  set("line-height", "var(--evLineHeight)");
  set("max-height", "none");
  set("height", "auto");

  if (lines === 1) {
    set("display", "block");
    set("-webkit-box-orient", "horizontal");
    set("-webkit-line-clamp", "unset");
    set("line-clamp", "unset");
    set("white-space", "nowrap");
    set("overflow", "hidden");
    set("text-overflow", "ellipsis");
  } else if (lines > 1) {
    set("display", "-webkit-box");
    set("-webkit-box-orient", "vertical");
    set("-webkit-line-clamp", String(lines));
    set("line-clamp", String(lines));
    set("white-space", "normal");
    set("overflow", "hidden");
    set("text-overflow", "ellipsis");
  } else {
    set("display", "block");
    set("-webkit-box-orient", "horizontal");
    set("-webkit-line-clamp", "unset");
    set("line-clamp", "unset");
    set("white-space", "normal");
    set("overflow", "visible");
    set("text-overflow", "clip");
  }
}

function applyMetaStyles(element, lines) {
  const meta = element?.querySelector?.(".m");
  if (!meta) return;

  const set = (prop, value) => meta.style.setProperty(prop, value, "important");
  set("line-height", "var(--evLineHeight)");
  set("max-height", "none");
  set("height", "auto");

  if (lines === 1) {
    set("display", "block");
    set("-webkit-box-orient", "horizontal");
    set("-webkit-line-clamp", "unset");
    set("line-clamp", "unset");
    set("white-space", "nowrap");
    set("overflow", "hidden");
    set("text-overflow", "ellipsis");
  } else if (lines > 1) {
    set("display", "-webkit-box");
    set("-webkit-box-orient", "vertical");
    set("-webkit-line-clamp", String(lines));
    set("line-clamp", String(lines));
    set("white-space", "normal");
    set("overflow", "hidden");
    set("text-overflow", "ellipsis");
  } else {
    set("display", "block");
    set("-webkit-box-orient", "horizontal");
    set("-webkit-line-clamp", "unset");
    set("line-clamp", "unset");
    set("white-space", "normal");
    set("overflow", "visible");
    set("text-overflow", "clip");
  }
}

function measureEventHeight(el, titleLines, metaLines) {
  if (!el) return 0;

  applyTitleStyles(el, titleLines);
  applyMetaStyles(el, metaLines);

  el.style.height = "auto";
  el.style.minHeight = "auto";
  el.style.maxHeight = "none";

  const h = Math.max(el.scrollHeight, CELL_HEIGHT_CONFIG.MIN_EVENT_HEIGHT);
  return h;
}

let touchDragState = {
  active: false,
  element: null,
  eventId: null,
  eventData: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  activationTimer: null,
  clone: null,
  cancelZone: null,
  targetCell: null,
  originalCell: null,
  originalPosition: { x: 0, y: 0, width: 0, height: 0 },
  isMouse: false,
  autoScrollInterval: null, // ОДИН раз
  pendingRowUpdates: new Set(),
  rowUpdateTimeout: null,
  isDragging: false,
  lastValidDropCell: null,
  touchStartTime: 0,
  container: null,
  feedback: null,
  lastMoveTime: 0,
  isProcessingTouch: false,
  lastTouchStartTime: 0,
  hadSortableInstances: false,
  autoScrollDirection: 0, // Добавить в state
  autoScrollDirectionX: 0, // Добавить в state
};

let autoScrollDirection = 0;
let autoScrollDirectionX = 0;
let autoScrollAnimationFrame = null;

function initTouchDragSafe() {
  console.log("[TouchDnD] Инициализация системы Drag-and-Drop");

  // Добавляем CSS стили для двойных событий
  if (!document.getElementById('touch-drag-styles')) {
    const style = document.createElement('style');
    style.id = 'touch-drag-styles';
    style.textContent = `
      .event.event-double { box-shadow: none !important; }
      .event.event-double-top { 
        margin-bottom: ${CELL_HEIGHT_CONFIG.EVENT_GAP}px !important; 
        border-bottom-left-radius: 0 !important; 
        border-bottom-right-radius: 0 !important; 
      }
      .event.event-double-bottom { 
        margin-top: ${CELL_HEIGHT_CONFIG.EVENT_GAP}px !important; 
        border-top-left-radius: 0 !important; 
        border-top-right-radius: 0 !important; 
      }
      .event.compact { 
        min-height: ${CELL_HEIGHT_CONFIG.MIN_EVENT_HEIGHT}px !important; 
        margin: 0 !important; 
        border-radius: 4px !important; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important; 
      }
      .event:not(.event-double) { 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important; 
      }
      .cell.droppable {
        min-height: var(--slotH, ${CELL_HEIGHT_CONFIG.MIN_CELL_HEIGHT}px) !important;
        padding: var(--cellPad) !important;
      }
    `;
    document.head.appendChild(style);
  }

  const scheduleEl = document.getElementById("schedule");
  if (!scheduleEl) {
    console.error("[TouchDnD] Элемент #schedule не найден");
    return;
  }

  // Если уже инициализировано, не переинициализируем
  if (touchDragState.container === scheduleEl && touchDragState.isInitialized) {
    return;
  }

  touchDragState.container = scheduleEl;
  touchDragState.isInitialized = true;

  // Удаляем старые обработчики
  scheduleEl.removeEventListener("touchstart", handleTouchStart);
  scheduleEl.removeEventListener("touchmove", handleTouchMove);
  scheduleEl.removeEventListener("touchend", handleTouchEnd);
  scheduleEl.removeEventListener("touchcancel", handleTouchCancel);
  scheduleEl.removeEventListener("mousedown", handleMouseDown);

  // Добавляем новые обработчики
  scheduleEl.addEventListener("touchstart", handleTouchStart, { passive: false });
  scheduleEl.addEventListener("touchmove", handleTouchMove, { passive: false });
  scheduleEl.addEventListener("touchend", handleTouchEnd);
  scheduleEl.addEventListener("touchcancel", handleTouchCancel);
  scheduleEl.addEventListener("mousedown", handleMouseDown);

  // Глобальные обработчики для мыши
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // Обработчики для случаев выхода за границы
  document.addEventListener("mouseleave", handleWindowLeave);
  window.removeEventListener("blur", handleWindowBlur);
  window.removeEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener("blur", handleWindowBlur);
  window.addEventListener("beforeunload", handleBeforeUnload);

  // Временно отключаем SortableJS если он есть
  if (window.Sortable) {
    console.log("[TouchDnD] SortableJS обнаружен, временно отключаем");
    scheduleEl.classList.add("touch-drag-active");
    touchDragState.hadSortableInstances = true;
  }

  // Инициализируем высоты строк и применяем классы для двойных событий
  initializeAllRowHeights();
  applyDoubleEventClasses();
  
  console.log("[TouchDnD] Инициализация завершена");
}

function handleTouchStart(e) {
  // Проверяем, не идет ли уже другое перетаскивание
  if (touchDragState.isProcessingTouch || touchDragState.active) {
    return;
  }

  const now = Date.now();
  if (now - touchDragState.lastTouchStartTime < 100) {
    return;
  }

  if (e.type === 'mousedown' && e.button !== 0) {
    return;
  }

  const touch = e.touches ? e.touches[0] : e;
  let clientX, clientY;
  
  if (e.touches) {
    if (!touch) return;
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = touch.clientX;
    clientY = touch.clientY;
  }

  // Проверяем, что координаты валидны
  if (typeof clientX !== 'number' || typeof clientY !== 'number' || 
      isNaN(clientX) || isNaN(clientY)) {
    console.warn("[TouchDnD] Некорректные координаты", clientX, clientY);
    return;
  }

  const clickedElement = document.elementFromPoint(clientX, clientY);
  if (!clickedElement) {
    return;
  }

  const eventElement = clickedElement.closest('.event');
  if (!eventElement) {
    return;
  }

  const eventId = eventElement.dataset.eid || eventElement.closest("[data-eid]")?.dataset.eid;
  if (!eventId) {
    return;
  }

  if (!e.touches) {
    e.preventDefault();
    e.stopPropagation();
  }

  const eventData = state.events.find(ev => ev.id === eventId);
  if (!eventData) {
    return;
  }

  touchDragState.isProcessingTouch = true;
  touchDragState.element = eventElement;
  touchDragState.eventId = eventId;
  touchDragState.eventData = eventData;
  touchDragState.startX = clientX;
  touchDragState.startY = clientY;
  touchDragState.currentX = clientX;
  touchDragState.currentY = clientY;
  touchDragState.isMouse = !e.touches;
  touchDragState.originalCell = eventElement.closest(".cell.droppable");
  touchDragState.originalPosition = eventElement.getBoundingClientRect();
  touchDragState.touchStartTime = Date.now();
  touchDragState.isDragging = false;
  touchDragState.lastTouchStartTime = now;

  eventElement.classList.add("touch-active");

  touchDragState.activationTimer = setTimeout(() => {
    if (!touchDragState.isDragging && touchDragState.element) {
      activateTouchDrag(clientX, clientY);
    }
  }, TOUCH_DRAG_CONFIG.ACTIVATION_DELAY);

  if (e.touches) {
    document.addEventListener("touchmove", handleTouchMoveGlobal, { passive: false });
    document.addEventListener("touchend", handleTouchEndGlobal, { passive: false });
    document.addEventListener("touchcancel", handleTouchEndGlobal, { passive: false });
  } else {
    document.addEventListener("mousemove", handleMouseMoveInitial);
    document.addEventListener("mouseup", handleMouseUpInitial);
  }

  if (navigator.vibrate && navigator.vibrate.length) {
    try {
      navigator.vibrate(TOUCH_DRAG_CONFIG.VIBRATION_SHORT);
    } catch (err) {
      // Игнорируем ошибки вибрации
    }
  }
}

function handleTouchMoveGlobal(e) {
  if (!touchDragState.element) return;

  const touch = e.touches ? e.touches[0] : e;
  if (!touch) return;

  const clientX = touch.clientX;
  const clientY = touch.clientY;

  // Проверяем валидность координат
  if (typeof clientX !== 'number' || typeof clientY !== 'number' ||
      isNaN(clientX) || isNaN(clientY)) {
    return;
  }

  handleTouchMove(e, clientX, clientY);
}

function applyDoubleEventClasses() {
  const scheduleEl = document.getElementById("schedule");
  if (!scheduleEl) return;

  const cells = scheduleEl.querySelectorAll('.cell.droppable');
  
  cells.forEach(cell => {
    const events = cell.querySelectorAll('.event:not(.touch-drag-clone)');
    
    // Убираем все классы двойных событий
    events.forEach(event => {
      event.classList.remove('event-double', 'event-double-top', 'event-double-bottom');
    });

    // Если в ячейке ровно два события
    if (events.length === 2) {
      // Определяем порядок событий (можно по ID или по позиции в DOM)
      const sortedEvents = Array.from(events).sort((a, b) => {
        const aId = a.dataset.eid || a.closest('[data-eid]')?.dataset.eid;
        const bId = b.dataset.eid || b.closest('[data-eid]')?.dataset.eid;
        return (aId || '').localeCompare(bId || '');
      });
      
      sortedEvents[0].classList.add('event-double', 'event-double-top');
      sortedEvents[1].classList.add('event-double', 'event-double-bottom');
    }
  });
}

function renderEvent(eventData, cell) {
  if (!cell || !eventData) return null;

  // Проверяем, есть ли уже такое событие в ячейке
  const existingEvent = cell.querySelector(`[data-eid="${eventData.id}"]`);
  if (existingEvent) {
    return existingEvent;
  }

  // Создаем элемент события
  const eventDiv = document.createElement('div');
  eventDiv.className = 'event';
  eventDiv.dataset.eid = eventData.id;
  
  // Добавляем контент в зависимости от типа отображения
  const view = state.settings.display.cellView;
  
  if (view === 'compact') {
    eventDiv.classList.add('compact');
    eventDiv.innerHTML = `
      <div class="event-compact-content">
        <div class="event-title">${escapeHtml(eventData.name)}</div>
        ${eventData.teacher ? `<div class="event-teacher">${escapeHtml(eventData.teacher)}</div>` : ''}
      </div>
    `;
  } else {
    // Стандартный вид
    eventDiv.innerHTML = `
      <div class="event-content">
        <div class="event-title">${escapeHtml(eventData.name)}</div>
        ${eventData.teacher ? `<div class="event-teacher">${escapeHtml(eventData.teacher)}</div>` : ''}
        ${eventData.location ? `<div class="event-location">${escapeHtml(eventData.location)}</div>` : ''}
        ${eventData.type ? `<div class="event-type">${escapeHtml(eventData.type)}</div>` : ''}
        <div class="event-time">${minToHHMM(eventData.startMin)} - ${minToHHMM(eventData.endMin)}</div>
      </div>
    `;
    
    // Добавляем цвет события, если есть
    if (eventData.color) {
      eventDiv.style.backgroundColor = eventData.color;
      eventDiv.style.borderColor = eventData.color;
    }
  }

  // Добавляем в ячейку
  const slotInner = cell.querySelector('.slot-inner') || createSlotInner(cell);
  slotInner.appendChild(eventDiv);

  // Обновляем классы двойных событий для этой ячейки
  updateDoubleEventClassesForCell(cell);
  
  return eventDiv;
}

function handleMouseMoveInitial(e) {
  if (!touchDragState.element || touchDragState.isDragging) return;

  const deltaX = Math.abs(e.clientX - touchDragState.startX);
  const deltaY = Math.abs(e.clientY - touchDragState.startY);
  const threshold = TOUCH_DRAG_CONFIG.MOUSE_ACTIVATION_THRESHOLD_PX;

  if (deltaX > threshold || deltaY > threshold) {
    document.removeEventListener("mousemove", handleMouseMoveInitial);
    document.removeEventListener("mouseup", handleMouseUpInitial);

    if (touchDragState.activationTimer) {
      clearTimeout(touchDragState.activationTimer);
      touchDragState.activationTimer = null;
    }

    activateTouchDrag(e.clientX, e.clientY);
  }
}

function createSlotInner(cell) {
  const slotInner = document.createElement('div');
  slotInner.className = 'slot-inner';
  cell.appendChild(slotInner);
  return slotInner;
}

function updateDoubleEventClassesForCell(cell) {
  if (!cell) return;
  
  const events = cell.querySelectorAll('.event:not(.touch-drag-clone)');
  
  // Убираем старые классы
  events.forEach(event => {
    event.classList.remove('event-double', 'event-double-top', 'event-double-bottom');
  });

  // Применяем новые классы если нужно
  if (events.length === 2) {
    const sortedEvents = Array.from(events).sort((a, b) => {
      const aId = a.dataset.eid || a.closest('[data-eid]')?.dataset.eid;
      const bId = b.dataset.eid || b.closest('[data-eid]')?.dataset.eid;
      return (aId || '').localeCompare(bId || '');
    });
    
    sortedEvents[0].classList.add('event-double', 'event-double-top');
    sortedEvents[1].classList.add('event-double', 'event-double-bottom');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function handleTouchMove(e, clientX, clientY) {
  if (!touchDragState.element) return;

  if (typeof clientX !== "number" || typeof clientY !== "number") {
    const touch = e?.touches ? e.touches[0] : e;
    if (!touch) return;
    clientX = touch.clientX;
    clientY = touch.clientY;
  }

  // Проверяем валидность координат
  if (typeof clientX !== 'number' || typeof clientY !== 'number' ||
      isNaN(clientX) || isNaN(clientY)) {
    return;
  }

  touchDragState.currentX = clientX;
  touchDragState.currentY = clientY;

  if (!touchDragState.active && !touchDragState.isDragging) {
    const deltaX = Math.abs(clientX - touchDragState.startX);
    const deltaY = Math.abs(clientY - touchDragState.startY);
    const threshold = touchDragState.isMouse
      ? TOUCH_DRAG_CONFIG.MOUSE_ACTIVATION_THRESHOLD_PX
      : TOUCH_DRAG_CONFIG.TOUCH_ACTIVATION_THRESHOLD_PX;

    if (deltaX > threshold || deltaY > threshold) {
      if (touchDragState.activationTimer) {
        clearTimeout(touchDragState.activationTimer);
        touchDragState.activationTimer = null;
      }

      if (!touchDragState.active) {
        if (touchDragState.isMouse) {
          activateTouchDrag(clientX, clientY);
        } else {
          cancelPendingTouchDrag();
          return;
        }
      }
    }
  }

  if (touchDragState.active) {
    e.preventDefault();
    e.stopPropagation();
    updateTouchDragPosition(clientX, clientY);
  }
}

function cancelPendingTouchDrag() {
  if (touchDragState.activationTimer) {
    clearTimeout(touchDragState.activationTimer);
    touchDragState.activationTimer = null;
  }

  document.removeEventListener("touchmove", handleTouchMoveGlobal);
  document.removeEventListener("touchend", handleTouchEndGlobal);
  document.removeEventListener("touchcancel", handleTouchEndGlobal);

  document.removeEventListener("mousemove", handleMouseMoveInitial);
  document.removeEventListener("mouseup", handleMouseUpInitial);
  document.removeEventListener("mousemove", handleInitialMouseMove);

  if (touchDragState.element) {
    touchDragState.element.classList.remove("touch-active");
  }

  touchDragState.active = false;
  touchDragState.isDragging = false;
  touchDragState.isProcessingTouch = false;
  touchDragState.element = null;
  touchDragState.eventId = null;
  touchDragState.eventData = null;
  touchDragState.targetCell = null;
  touchDragState.originalCell = null;
  touchDragState.feedback = null;
  touchDragState.startX = 0;
  touchDragState.startY = 0;
  touchDragState.currentX = 0;
  touchDragState.currentY = 0;
}

function handleMouseUpInitial(e) {
  if (!touchDragState.isDragging) {
    if (touchDragState.element && touchDragState.eventId) {
      setTimeout(() => {
        openEdit(touchDragState.eventId);
      }, 150);
    }
    resetTouchDragState();
  }

  document.removeEventListener("mousemove", handleMouseMoveInitial);
  document.removeEventListener("mouseup", handleMouseUpInitial);
}

function handleTouchEnd(e) {
  if (touchDragState.activationTimer) {
    clearTimeout(touchDragState.activationTimer);
    touchDragState.activationTimer = null;
  }

  if (!touchDragState.active && !touchDragState.isDragging) {
    const endTime = Date.now();
    const duration = endTime - touchDragState.touchStartTime;
    const movedX = Math.abs(touchDragState.currentX - touchDragState.startX);
    const movedY = Math.abs(touchDragState.currentY - touchDragState.startY);

    if (duration < 300 && movedX < 10 && movedY < 10 && touchDragState.eventId) {
      setTimeout(() => {
        openEdit(touchDragState.eventId);
      }, 150);
    }

    resetTouchDragState();
    return;
  }

  if (touchDragState.active) {
    e.preventDefault();
    e.stopPropagation();
    completeTouchDrag();
  }
}

function handleTouchCancel() {
  if (touchDragState.activationTimer) {
    clearTimeout(touchDragState.activationTimer);
    touchDragState.activationTimer = null;
  }

  if (touchDragState.active) {
    cancelTouchDrag();
  } else {
    resetTouchDragState();
  }
}

function handleMouseDown(e) {
    if (touchDragState.active || e.button !== 0) return;

    const element = e.target.closest('.event');
    if (!element) return;

    const eventId = element.dataset.eid || element.closest('[data-eid]')?.dataset.eid;
    if (!eventId) return;

    const eventData = state.events.find(ev => ev.id === eventId);
    if (!eventData) return;

    e.preventDefault();
    e.stopPropagation();

    touchDragState.active = false;
    touchDragState.element = element;
    touchDragState.eventId = eventId;
    touchDragState.eventData = eventData;
    touchDragState.startX = e.clientX;
    touchDragState.startY = e.clientY;
    touchDragState.currentX = e.clientX;
    touchDragState.currentY = e.clientY;
    touchDragState.isMouse = true;
    touchDragState.originalCell = element.closest('.cell.droppable');
    touchDragState.originalPosition = element.getBoundingClientRect();
    touchDragState.touchStartTime = Date.now();
    touchDragState.isDragging = false;

    element.classList.add('touch-active');

    document.addEventListener('mousemove', handleInitialMouseMove);
}

function handleInitialMouseMove(e) {
    if (!touchDragState.element || touchDragState.active) return;

    const deltaX = Math.abs(e.clientX - touchDragState.startX);
    const deltaY = Math.abs(e.clientY - touchDragState.startY);

    if (deltaX > TOUCH_DRAG_CONFIG.MOUSE_ACTIVATION_THRESHOLD_PX ||
        deltaY > TOUCH_DRAG_CONFIG.MOUSE_ACTIVATION_THRESHOLD_PX) {
        document.removeEventListener('mousemove', handleInitialMouseMove);
        activateTouchDrag(e.clientX, e.clientY);
    }
}

function handleMouseMove(e) {
  if (!touchDragState.active || !touchDragState.isMouse) return;

  e.preventDefault();
  e.stopPropagation();
  updateTouchDragPosition(e.clientX, e.clientY);
}

function handleTouchEndGlobal(e) {
  handleTouchEnd(e);

  document.removeEventListener("touchmove", handleTouchMoveGlobal);
  document.removeEventListener("touchend", handleTouchEndGlobal);
  document.removeEventListener("touchcancel", handleTouchEndGlobal);
}

function handleMouseUp(e) {
    if (!touchDragState.isMouse) return;

    document.removeEventListener('mousemove', handleInitialMouseMove);

    if (touchDragState.active) {
        e.preventDefault();
        e.stopPropagation();
        completeTouchDrag();
    } else {
        if (touchDragState.element && touchDragState.eventId) {
            setTimeout(() => {
                openEdit(touchDragState.eventId);
            }, 150);
        }
        resetTouchDragState();
    }
}

function activateTouchDrag(x, y) {
  if (!touchDragState.element || touchDragState.active) return;

  console.log("[TouchDnD] Активация перетаскивания");

  touchDragState.active = true;
  touchDragState.isDragging = true;

  createDragClone();
  createCancelZone();
  updateTouchDragPosition(x, y);

  document.body.classList.add("drag-active");
  touchDragState.element.classList.add("dragging-touch");
  touchDragState.originalCell?.classList.add("drag-source");

  if (window.Sortable && touchDragState.container) {
    touchDragState.container.classList.add("touch-drag-active");
  }

  document.addEventListener("contextmenu", handleContextMenuCancel);
  document.addEventListener("keydown", handleEscapeCancel);
}

function createDragClone() {
  const clone = touchDragState.element.cloneNode(true);
  clone.classList.add("touch-drag-clone");

  // УБРАТЬ !important из transition
  clone.style.cssText = `
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.9;
    transform: scale(1.05) translate(-50%, -50%);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    width: ${touchDragState.originalPosition.width}px;
    height: ${touchDragState.originalPosition.height}px;
    left: ${touchDragState.originalPosition.left}px;
    top: ${touchDragState.originalPosition.top}px;
    transition: transform 0.2s, opacity 0.2s;
  `;

  document.body.appendChild(clone);
  touchDragState.clone = clone;
}

function createCancelZone() {
  const zone = document.createElement("div");
  zone.className = "drag-cancel-zone";
  zone.innerHTML = "×<br><small>Отмена</small>";

  zone.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    width: ${TOUCH_DRAG_CONFIG.CANCEL_ZONE_SIZE}px;
    height: ${TOUCH_DRAG_CONFIG.CANCEL_ZONE_SIZE}px;
    border-radius: 50%;
    background-color: rgba(239, 68, 68, 0.9);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    border: 2px solid white;
  `;

  document.body.appendChild(zone);
  touchDragState.cancelZone = zone;

  setTimeout(() => {
    if (touchDragState.cancelZone) {
      touchDragState.cancelZone.style.opacity = "1";
    }
  }, 100);
}

function updateTouchDragPosition(x, y) {
  if (!touchDragState.active || !touchDragState.clone) return;

  console.log("[TouchDnD] updateTouchDragPosition:", x, y);

  touchDragState.currentX = x;
  touchDragState.currentY = y;

  if (!isNaN(x) && !isNaN(y)) {
    touchDragState.clone.style.left = `${x}px`;
    touchDragState.clone.style.top = `${y}px`;
  }

  if (touchDragState.cancelZone) {
    const zoneRect = touchDragState.cancelZone.getBoundingClientRect();
    const centerX = zoneRect.left + zoneRect.width / 2;
    const centerY = zoneRect.top + zoneRect.height / 2;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const activationRadius = zoneRect.width / 2 + 30;

    if (distance < activationRadius) {
      touchDragState.cancelZone.style.transform = "scale(1.2)";
      touchDragState.cancelZone.style.backgroundColor = "rgba(220, 38, 38, 0.95)";
    } else {
      touchDragState.cancelZone.style.transform = "scale(1)";
      touchDragState.cancelZone.style.backgroundColor = "rgba(239, 68, 68, 0.9)";
    }
  }

  const targetCell = findTargetCellUnderPoint(x, y);
  updateTargetCellHighlight(targetCell);
  
  // Всегда вызываем автопрокрутку
  handleAutoScroll(x, y);
  
  touchDragState.lastMoveTime = Date.now();
  console.log("[TouchDnD] Координаты:", x, y, "Направления:", 
  touchDragState.autoScrollDirection, touchDragState.autoScrollDirectionX);
}

function findTargetCellUnderPoint(x, y) {
  if (touchDragState.clone) {
    touchDragState.clone.style.display = "none";
  }

  let element;
  try {
    element = document.elementFromPoint(x, y);
  } catch (err) {
    return null;
  } finally {
    if (touchDragState.clone) {
      touchDragState.clone.style.display = "block";
    }
  }

  if (!element) return null;

  const cell = element.closest(".cell.droppable");
  if (!cell) return null;

  const scheduleEl = document.getElementById("schedule");
  if (!scheduleEl || !scheduleEl.contains(cell)) return null;

  return cell;
}

function updateTargetCellHighlight(targetCell) {
  if (touchDragState.targetCell && touchDragState.targetCell !== targetCell) {
    touchDragState.targetCell.classList.remove("drop-target-valid", "drop-target-invalid");
  }

  touchDragState.targetCell = targetCell;

  if (!targetCell) return;

  const currentEvents = targetCell.querySelectorAll(".event:not(.dragging-touch)").length;
  const maxPerCell = state.settings.schedule.maxPerCell || 2;

  if (currentEvents < maxPerCell) {
    targetCell.classList.add("drop-target-valid");
    targetCell.classList.remove("drop-target-invalid");

    if (touchDragState.eventData) {
      previewRowHeightForDrag(targetCell, touchDragState.eventData);
    }
  } else {
    targetCell.classList.add("drop-target-invalid");
    targetCell.classList.remove("drop-target-valid");
  }
}

function previewRowHeightForDrag(targetCell, eventData) {
    if (!targetCell) return;

    const slotIndex = targetCell.dataset.slotIndex;
    if (!slotIndex) return;

    // ДОБАВЛЯЕМ обратно обновление высоты строки
    touchDragState.pendingRowUpdates.add(parseInt(slotIndex));

    // Откладываем обновление для группировки
    if (touchDragState.rowUpdateTimeout) {
        clearTimeout(touchDragState.rowUpdateTimeout);
    }

    touchDragState.rowUpdateTimeout = setTimeout(() => {
        if (touchDragState.active && touchDragState.pendingRowUpdates.size > 0) {
            touchDragState.pendingRowUpdates.forEach(idx => {
                rerenderRowBySlotIndex(idx);
            });
            touchDragState.pendingRowUpdates.clear();
        }
    }, 30);
}

function handleAutoScroll(x, y) {
  if (!touchDragState.active) return;

  const edgeSize = 100;
  const scrollContainer = getAutoScrollContainer();

  touchDragState.autoScrollDirection = 0;
  touchDragState.autoScrollDirectionX = 0;

  if (scrollContainer) {
    const rect = scrollContainer.getBoundingClientRect();

    if (y < rect.top + edgeSize && scrollContainer.scrollTop > 0) {
      touchDragState.autoScrollDirection = -1;
    } else if (
      y > rect.bottom - edgeSize &&
      scrollContainer.scrollTop + scrollContainer.clientHeight < scrollContainer.scrollHeight
    ) {
      touchDragState.autoScrollDirection = 1;
    }

    if (x < rect.left + edgeSize && scrollContainer.scrollLeft > 0) {
      touchDragState.autoScrollDirectionX = -1;
    } else if (
      x > rect.right - edgeSize &&
      scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth
    ) {
      touchDragState.autoScrollDirectionX = 1;
    }
  } else {
    if (y < edgeSize && window.scrollY > 0) {
      touchDragState.autoScrollDirection = -1;
    } else if (
      y > window.innerHeight - edgeSize &&
      window.scrollY + window.innerHeight < document.documentElement.scrollHeight
    ) {
      touchDragState.autoScrollDirection = 1;
    }

    if (x < edgeSize && window.scrollX > 0) {
      touchDragState.autoScrollDirectionX = -1;
    } else if (
      x > window.innerWidth - edgeSize &&
      window.scrollX + window.innerWidth < document.documentElement.scrollWidth
    ) {
      touchDragState.autoScrollDirectionX = 1;
    }
  }

  if (touchDragState.autoScrollDirection !== 0 || touchDragState.autoScrollDirectionX !== 0) {
    startAutoScroll();
  } else {
    stopAutoScroll();
  }
}

function getAutoScrollContainer() {
  return document.querySelector(".schedule-wrap");
}

function startAutoScroll() {
  if (touchDragState.autoScrollInterval) return;
  
  console.log("[TouchDnD] Старт автопрокрутки");
  
  const speed = 20;
  const scrollContainer = getAutoScrollContainer();
  
  touchDragState.autoScrollInterval = setInterval(() => {
    if (!touchDragState.active || 
        (touchDragState.autoScrollDirection === 0 && touchDragState.autoScrollDirectionX === 0)) {
      stopAutoScroll();
      return;
    }
    
    try {
      if (scrollContainer) {
        scrollContainer.scrollBy({
          left: touchDragState.autoScrollDirectionX * speed,
          top: touchDragState.autoScrollDirection * speed,
          behavior: "auto",
        });
      } else {
        window.scrollBy({
          left: touchDragState.autoScrollDirectionX * speed,
          top: touchDragState.autoScrollDirection * speed,
          behavior: "auto",
        });
      }
    } catch (error) {
      console.error("[TouchDnD] Ошибка прокрутки:", error);
      stopAutoScroll();
    }
  }, 50); // Увеличить интервал для лучшей производительности
}

function completeTouchDrag() {
  if (!touchDragState.active) return;

  console.log("[TouchDnD] Завершение перетаскивания");

  // Проверяем зону отмены
  if (touchDragState.cancelZone) {
    const zoneRect = touchDragState.cancelZone.getBoundingClientRect();
    const centerX = zoneRect.left + zoneRect.width / 2;
    const centerY = zoneRect.top + zoneRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(touchDragState.currentX - centerX, 2) + 
      Math.pow(touchDragState.currentY - centerY, 2)
    );
    const activationRadius = zoneRect.width / 2 + 30;

    if (distance < activationRadius) {
      console.log("[TouchDnD] Отмена в зоне отмены");
      cancelTouchDrag();
      return;
    }
  }

  // Проверяем наличие данных для перемещения
  if (!touchDragState.eventId || !touchDragState.eventData) {
    console.error("[TouchDnD] Нет данных для перемещения");
    resetTouchDragState();
    return;
  }

  if (touchDragState.targetCell) {
    const dayIndex = touchDragState.targetCell.dataset.dayIndex;

    if (dayIndex !== undefined) {
      let slotStart = 0;
      const slotIndex = touchDragState.targetCell.dataset.slotIndex;

      if (slotIndex !== undefined) {
        const scheduleEl = document.getElementById("schedule");
        const timeCells = scheduleEl.querySelectorAll(".cell.time");

        for (let i = 0; i < timeCells.length; i++) {
          if (parseInt(timeCells[i].dataset.slotIndex) === parseInt(slotIndex)) {
            const timeText = timeCells[i].textContent;
            slotStart = parseHHMM(timeText) || 0;
            break;
          }
        }
      } else {
        slotStart = touchDragState.eventData.startMin;
      }

      const currentEvents = touchDragState.targetCell.querySelectorAll(".event:not(.dragging-touch)").length;
      const maxPerCell = state.settings.schedule.maxPerCell || 2;

      if (currentEvents < maxPerCell) {
        console.log("[TouchDnD] Перемещение разрешено, выполняем");
        
        const eventId = touchDragState.eventId;
        const dayIndexToMove = parseInt(dayIndex);
        const slotStartToMove = slotStart;
        
        cleanupDragVisuals();
        
        setTimeout(() => {
          smartMoveEvent(
            eventId,
            dayIndexToMove,
            slotStartToMove,
            "Перемещение drag&drop"
          );
          
          setTimeout(() => {
            resetTouchDragState();
          }, 100);
          
        }, 50);

        if (navigator.vibrate) {
          try {
            navigator.vibrate([50, 30, 50]);
          } catch (err) {}
        }
        return;
      } else {
        toast("ERR", "Ошибка", "В этой ячейке уже максимальное количество событий");
      }
    } else {
      toast("ERR", "Ошибка", "Не удалось определить целевую ячейку");
    }
  }

  console.log("[TouchDnD] Перемещение не удалось, возвращаем на место");
  cancelTouchDrag();
}

function cleanupDragVisuals() {
  console.log("[TouchDnD] Очистка визуальных элементов");
  
  if (touchDragState.clone && touchDragState.clone.parentNode) {
    const clone = touchDragState.clone;
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
    touchDragState.clone = null;
  }

  if (touchDragState.cancelZone && touchDragState.cancelZone.parentNode) {
    touchDragState.cancelZone.parentNode.removeChild(touchDragState.cancelZone);
    touchDragState.cancelZone = null;
  }

  document.body.classList.remove("drag-active");
  
  if (touchDragState.element) {
    touchDragState.element.classList.remove("dragging-touch", "touch-active");
  }

  if (touchDragState.originalCell) {
    touchDragState.originalCell.classList.remove("drag-source");
  }

  if (touchDragState.targetCell) {
    touchDragState.targetCell.classList.remove("drop-target-valid", "drop-target-invalid");
  }

  if (window.Sortable && touchDragState.hadSortableInstances && touchDragState.container) {
    touchDragState.container.classList.remove("touch-drag-active");
  }
}

function cancelTouchDrag() {
  console.log("[TouchDnD] Отмена перетаскивания");

  if (navigator.vibrate) {
    navigator.vibrate(TOUCH_DRAG_CONFIG.VIBRATION_CANCEL);
  }

  cleanupDragVisuals();
  setTimeout(() => {
    resetTouchDragState();
  }, 100);
}


function returnToOriginalPosition() {
  if (!touchDragState.element || !touchDragState.originalCell) return;

  const clone = touchDragState.clone;
  if (clone) {
    const rect = touchDragState.element.getBoundingClientRect();
    const originalX = rect.left;
    const originalY = rect.top;

    clone.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    clone.style.left = `${originalX}px`;
    clone.style.top = `${originalY}px`;
    clone.style.opacity = "0.7";
    clone.style.transform = "scale(0.9) translate(-50%, -50%)";
    
    setTimeout(() => {
      if (clone && clone.parentNode) {
        clone.style.opacity = "0";
      }
    }, 250);
  }
}

function resetTouchDragState() {
  console.log("[TouchDnD] Сброс состояния перетаскивания");

  // Останавливаем все таймеры и интервалы
  if (touchDragState.activationTimer) {
    clearTimeout(touchDragState.activationTimer);
    touchDragState.activationTimer = null;
  }

  if (touchDragState.rowUpdateTimeout) {
    clearTimeout(touchDragState.rowUpdateTimeout);
    touchDragState.rowUpdateTimeout = null;
  }

  stopAutoScroll();

  // Удаляем клон, если он еще есть
  if (touchDragState.clone && touchDragState.clone.parentNode) {
    console.log("[TouchDnD] Удаление клона");
    const clone = touchDragState.clone;
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
    touchDragState.clone = null;
  }

  // Удаляем зону отмены
  if (touchDragState.cancelZone && touchDragState.cancelZone.parentNode) {
    touchDragState.cancelZone.parentNode.removeChild(touchDragState.cancelZone);
    touchDragState.cancelZone = null;
  }

  // Отписываемся от глобальных обработчиков
  document.removeEventListener("touchmove", handleTouchMoveGlobal);
  document.removeEventListener("touchend", handleTouchEndGlobal);
  document.removeEventListener("touchcancel", handleTouchEndGlobal);
  
  document.removeEventListener("mousemove", handleMouseMoveInitial);
  document.removeEventListener("mouseup", handleMouseUpInitial);
  document.removeEventListener("mousemove", handleInitialMouseMove);

  // Снимаем классы
  document.body.classList.remove("drag-active");

  if (touchDragState.element) {
    touchDragState.element.classList.remove("dragging-touch", "touch-active");
  }

  if (touchDragState.originalCell) {
    touchDragState.originalCell.classList.remove("drag-source");
  }

  if (touchDragState.targetCell) {
    touchDragState.targetCell.classList.remove("drop-target-valid", "drop-target-invalid");
  }

  if (window.Sortable && touchDragState.hadSortableInstances && touchDragState.container) {
    touchDragState.container.classList.remove("touch-drag-active");
  }

  // Обновляем высоты строк после завершения перетаскивания
  setTimeout(() => {
    if (touchDragState.pendingRowUpdates.size > 0) {
      touchDragState.pendingRowUpdates.forEach(slotIndex => {
        rerenderRowBySlotIndex(slotIndex);
      });
      touchDragState.pendingRowUpdates.clear();
    }
    requestRowHeightSync();
  }, 100);

  // Отписываемся от дополнительных обработчиков
  document.removeEventListener("contextmenu", handleContextMenuCancel);
  document.removeEventListener("keydown", handleEscapeCancel);

  // Сбрасываем состояние
  touchDragState.active = false;
  touchDragState.isDragging = false;
  touchDragState.isProcessingTouch = false;
  touchDragState.element = null;
  touchDragState.eventId = null;
  touchDragState.eventData = null;
  touchDragState.targetCell = null;
  touchDragState.originalCell = null;
  touchDragState.feedback = null;
  touchDragState.startX = 0;
  touchDragState.startY = 0;
  touchDragState.currentX = 0;
  touchDragState.currentY = 0;
  touchDragState.autoScrollDirection = 0;
  touchDragState.autoScrollDirectionX = 0;

  console.log("[TouchDnD] Состояние сброшено");
}

function stopAutoScroll() {
  if (touchDragState.autoScrollInterval) {
    clearInterval(touchDragState.autoScrollInterval);
    touchDragState.autoScrollInterval = null;
  }
  touchDragState.autoScrollDirection = 0;
  touchDragState.autoScrollDirectionX = 0;
}

function rerenderRowBySlotIndex(slotIndex) {
    const scheduleEl = document.getElementById('schedule');
    if (!scheduleEl) return;

    const rowCells = scheduleEl.querySelectorAll(`.cell.droppable[data-slot-index="${slotIndex}"]`);
    if (!rowCells.length) return;

    const minRowH = getEffectiveMinRowHeight();
    let maxHeight = minRowH;
    const measured = [];

    rowCells.forEach(cell => {
        cell.style.minHeight = `${minRowH}px`;
        cell.style.height = "auto";

        const slotInner = cell.querySelector('.slot-inner');
        if (!slotInner) return;

        const events = Array.from(slotInner.querySelectorAll('.event:not(.touch-drag-clone)'));
        const isDouble = events.length === 2;

        const cs = getComputedStyle(cell);
        const padY =
          (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);

        if (isDouble) {
            slotInner.style.display = 'flex';
            slotInner.style.flexDirection = 'column';
            slotInner.style.gap = `${CELL_HEIGHT_CONFIG.EVENT_GAP}px`;
            slotInner.style.height = 'auto';
            slotInner.style.minHeight = 'auto';
        } else {
            slotInner.style.display = '';
            slotInner.style.flexDirection = '';
            slotInner.style.gap = '';
            slotInner.style.height = '';
            slotInner.style.minHeight = '';
        }

        events.forEach(ev => {
            ev.style.height = "auto";
            ev.style.minHeight = "auto";
            ev.style.maxHeight = "none";
        });

        let contentHeight = minRowH;
        if (events.length === 1) {
            const h = measureEventHeight(
              events[0],
              CELL_HEIGHT_CONFIG.TITLE_LINES,
              CELL_HEIGHT_CONFIG.META_LINES,
            );
            contentHeight = h + padY;
        } else if (events.length === 2) {
            const h1 = measureEventHeight(
              events[0],
              CELL_HEIGHT_CONFIG.DOUBLE_TITLE_LINES,
              CELL_HEIGHT_CONFIG.DOUBLE_META_LINES,
            );
            const h2 = measureEventHeight(
              events[1],
              CELL_HEIGHT_CONFIG.DOUBLE_TITLE_LINES,
              CELL_HEIGHT_CONFIG.DOUBLE_META_LINES,
            );
            const maxEv = Math.max(h1, h2, CELL_HEIGHT_CONFIG.MIN_EVENT_HEIGHT);
            contentHeight = (maxEv * 2) + CELL_HEIGHT_CONFIG.EVENT_GAP + padY;
        } else {
            contentHeight = minRowH;
        }

        if (contentHeight > maxHeight) {
            maxHeight = contentHeight;
        }

        measured.push({ slotInner, events, isDouble, padY });
    });

    // Гарантируем минимальную высоту строки
    maxHeight = Math.max(maxHeight, minRowH);

    // Устанавливаем высоту для всех ячеек в строке
    rowCells.forEach(cell => {
        cell.style.height = `${maxHeight}px`;
        cell.style.minHeight = `${maxHeight}px`;
    });

    const timeCell = scheduleEl.querySelector(
      `.cell.time[data-slot-index="${slotIndex}"]:not(.head)`
    );
    if (timeCell) {
        timeCell.style.height = `${maxHeight}px`;
        timeCell.style.minHeight = `${maxHeight}px`;
    }
    measured.forEach(({ slotInner, events, isDouble, padY }) => {
        if (!slotInner) return;

        if (isDouble && events.length === 2) {
            const available =
              Math.max(0, maxHeight - padY - CELL_HEIGHT_CONFIG.EVENT_GAP);
            const eventH = Math.max(
              CELL_HEIGHT_CONFIG.MIN_EVENT_HEIGHT,
              Math.floor(available / 2),
            );

            slotInner.style.display = 'flex';
            slotInner.style.flexDirection = 'column';
            slotInner.style.gap = `${CELL_HEIGHT_CONFIG.EVENT_GAP}px`;
            slotInner.style.height = '';
            slotInner.style.minHeight = '';

            events.forEach(ev => {
                applyTitleStyles(ev, CELL_HEIGHT_CONFIG.DOUBLE_TITLE_LINES);
                applyMetaStyles(ev, CELL_HEIGHT_CONFIG.DOUBLE_META_LINES);
                ev.style.height = `${eventH}px`;
                ev.style.minHeight = `${eventH}px`;
                ev.style.maxHeight = `${eventH}px`;
                ev.style.flex = "0 0 auto";
                ev.style.overflow = "hidden";
            });
        } else if (events.length === 1) {
            const ev = events[0];
            applyTitleStyles(ev, CELL_HEIGHT_CONFIG.TITLE_LINES);
            applyMetaStyles(ev, CELL_HEIGHT_CONFIG.META_LINES);
            ev.style.height = "";
            ev.style.minHeight = "";
            ev.style.maxHeight = "";
            ev.style.flex = "";
            ev.style.overflow = "";
        } else {
            slotInner.style.display = '';
            slotInner.style.flexDirection = '';
            slotInner.style.gap = '';
            slotInner.style.height = '';
            slotInner.style.minHeight = '';
        }
    });
    
    console.log(`[TouchDnD] Строка ${slotIndex}: высота=${maxHeight}px`);
}

function initializeAllRowHeights() {
  const scheduleEl = document.getElementById("schedule");
  if (!scheduleEl) return;
  const isCompactView =
    state.settings.display.cellView === "compact" ||
    scheduleEl.classList.contains("compact-mode");
  if (isCompactView) {
    const allCells = scheduleEl.querySelectorAll(".cell.droppable");
    allCells.forEach((cell) => {
      cell.style.removeProperty("height");
      cell.style.removeProperty("min-height");
    });
    const timeCells = scheduleEl.querySelectorAll(".cell.time");
    timeCells.forEach((cell) => {
      cell.style.removeProperty("height");
      cell.style.removeProperty("min-height");
    });
    return;
  }

  console.log("[TouchDnD] Инициализация высот строк");

  // Устанавливаем минимальную высоту всем ячейкам
  const allCells = scheduleEl.querySelectorAll(".cell.droppable");
  const minRowH = getEffectiveMinRowHeight();
  allCells.forEach(cell => {
    cell.style.minHeight = `${minRowH}px`;
    // Сначала ставим минимальную высоту
    cell.style.height = `${minRowH}px`;
  });

  // Собираем уникальные индексы строк
  const slotIndices = new Set();
  const cells = scheduleEl.querySelectorAll(".cell.droppable[data-slot-index]");

  cells.forEach(cell => {
    const slotIndex = cell.dataset.slotIndex;
    if (slotIndex !== undefined) {
      slotIndices.add(parseInt(slotIndex));
    }
  });

  console.log(`[TouchDnD] Найдено строк: ${slotIndices.size}`);

  // Вычисляем и устанавливаем реальные высоты строк
  slotIndices.forEach(slotIndex => {
    rerenderRowBySlotIndex(slotIndex);
  });

  // Применяем классы для двойных событий
  applyDoubleEventClasses();
}
function addEventToDOM(eventData) {
    renderSchedule();
}

function removeEventFromDOM(eventId) {
    renderSchedule();
}

function handleContextMenuCancel(e) {
  if (!touchDragState.active) return;

  e.preventDefault();
  e.stopPropagation();
  cancelTouchDrag();
  return false;
}

function handleEscapeCancel(e) {
  if (!touchDragState.active || e.key !== 'Escape') return;

  e.preventDefault();
  e.stopPropagation();
  cancelTouchDrag();
}

function handleWindowLeave(e) {
  if (!touchDragState.active) return;

  if (e.clientY < 0 || e.clientX < 0 ||
      e.clientX > window.innerWidth || e.clientY > window.innerHeight) {
    cancelTouchDrag();
  }
}

function handleWindowBlur() {
  if (touchDragState.active) {
    cancelTouchDrag();
  }
}

function handleBeforeUnload(e) {
  if (touchDragState.active) {
    returnToOriginalPosition();
    resetTouchDragState();
  }
}

function updateEventInDOM(eventData) {
    renderSchedule();
}

function getSlotIndexForTime(startMin) {
    const scheduleEl = document.getElementById('schedule');
    if (!scheduleEl) return -1;

    const timeCells = scheduleEl.querySelectorAll('.cell.time');
    for (let i = 0; i < timeCells.length; i++) {
        const timeText = timeCells[i].textContent;
        const cellStart = parseHHMM(timeText) || 0;
        const { step } = getBounds();

        if (startMin >= cellStart && startMin < cellStart + step) {
            return parseInt(timeCells[i].dataset.slotIndex || i);
        }
    }

    return -1;
}

function scheduleRowHeightUpdate(slotIndex) {
    if (touchDragState.active) {
        touchDragState.pendingRowUpdates.add(slotIndex);
        return;
    }

    // Используем requestAnimationFrame для плавного обновления
    requestAnimationFrame(() => {
        rerenderRowBySlotIndex(slotIndex);
    });
}

function debugScheduleStructure() {
    const scheduleEl = document.getElementById('schedule');
    if (!scheduleEl) {
        console.error('[TouchDnD] Элемент #schedule не найден');
        return;
    }

    const cells = scheduleEl.querySelectorAll('.cell.droppable');
    console.log(`[TouchDnD] Найдено ячеек: ${cells.length}`);

    cells.forEach((cell, index) => {
        const dayIndex = cell.dataset.dayIndex;
        const slotIndex = cell.dataset.slotIndex;
        const events = cell.querySelectorAll('.event').length;

        console.log(`[TouchDnD] Ячейка ${index}: day=${dayIndex}, slot=${slotIndex}, events=${events}`);
    });
}

function debugRowHeights(slotIndex) {
    const scheduleEl = document.getElementById('schedule');
    if (!scheduleEl) return;

    const rowCells = scheduleEl.querySelectorAll(`.cell.droppable[data-slot-index="${slotIndex}"]`);
    console.log(`[TouchDnD] Отладка строки ${slotIndex}: ${rowCells.length} ячеек`);

    rowCells.forEach((cell, index) => {
        const height = cell.offsetHeight;
        const styleHeight = cell.style.height;
        const events = cell.querySelectorAll('.event').length;

        console.log(`[TouchDnD] Ячейка ${index}: height=${height}px, style=${styleHeight}, events=${events}`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[TouchDnD] Загрузка системы Drag-and-Drop");
  setTimeout(() => {
    initTouchDragSafe();
    if (state.settings.display.cellView === "compact") {
      markGeometryDirty();
    } else {
      requestRowHeightSync(true);
    }
  }, 100);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (state.settings.display.cellView === "compact") {
        markGeometryDirty();
      } else {
        requestRowHeightSync(true);
      }
    });
  }
});

const originalRenderAll = window.renderAll;
window.renderAll = function() {
  if (originalRenderAll) {
    originalRenderAll.apply(this, arguments);
  }

  // Не инициализируем DnD при каждом рендере, только если нужно
  setTimeout(() => {
    const scheduleEl = document.getElementById("schedule");
    if (scheduleEl && !touchDragState.container) {
      initTouchDragSafe();
    }
    // Всегда обновляем высоты при рендере
    initializeAllRowHeights();
  }, 50);
};

window.TouchDragSystem = {
    init: initTouchDragSafe,
    reset: resetTouchDragState,
    debug: () => console.log(touchDragState),
    addEvent: addEventToDOM,
    removeEvent: removeEventFromDOM,
    updateEvent: updateEventInDOM,
    getRowHeight: rerenderRowBySlotIndex,
    initializeHeights: initializeAllRowHeights
};

console.log('[TouchDnD] Система Drag-and-Drop загружена');

function smartMoveEvent(id, toDay, toSlotStart, reason) {
    if (!id) {
        console.error("[smartMoveEvent] ID события не указан");
        return;
    }
    
    console.log(`[smartMoveEvent] Начало: id=${id}, toDay=${toDay}, toSlotStart=${toSlotStart}, reason=${reason}`);

    const eventIndex = state.events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
        console.error("[smartMoveEvent] Событие не найдено");
        toast("ERR", "Ошибка", "Событие не найдено", 2000);
        return;
    }

    const ev = state.events[eventIndex];

    if (ev.dayIndex === toDay && ev.startMin === toSlotStart) {
        console.log("[smartMoveEvent] Событие уже находится на этом месте");
        toast("INFO", "Без изменений", "Событие уже находится на этом месте", 1500);
        return;
    }

    const view = state.settings.display.cellView;
    if (view !== "compact") {
        const { step } = getBounds();
        const slotEnd = toSlotStart + step;

        const eventsInTargetCell = state.events.filter(e =>
            e.id !== id &&
            e.dayIndex === toDay &&
            e.startMin >= toSlotStart &&
            e.startMin < slotEnd
        );

        const maxPerCell = state.settings.schedule.maxPerCell || 2;
        if (eventsInTargetCell.length >= maxPerCell) {
            console.error("[smartMoveEvent] Ячейка переполнена");
            toast("ERR", "Ошибка", "Ячейка переполнена", 3000);
            return;
        }
    }

    const oldDayIndex = ev.dayIndex;
    const oldStartMin = ev.startMin;

    try {
        state.events[eventIndex].dayIndex = toDay;
        state.events[eventIndex].startMin = toSlotStart;

        saveState(true);

        const movedInDom = moveEventInDOM(id, toDay, toSlotStart);
        if (!movedInDom) {
            // Fallback: если не удалось локально обновить DOM, делаем полную перерисовку.
            renderSchedule();
        } else {
            clearFilterCache();

            const movedEl = document.querySelector(`.event[data-eid="${id}"]`);
            if (movedEl) {
                movedEl.classList.toggle("dim", !eventVisible(ev));
            }

            const scheduleEl = document.getElementById("schedule");
            if (scheduleEl) {
                refreshSlotInnerLayoutClasses(scheduleEl);
            }

            if (view !== "compact") {
                const fromSlotIndex = getSlotIndexForTime(oldStartMin);
                const toSlotIndex = getSlotIndexForTime(toSlotStart);

                if (fromSlotIndex >= 0) scheduleRowHeightUpdate(fromSlotIndex);
                if (toSlotIndex >= 0 && toSlotIndex !== fromSlotIndex) {
                    scheduleRowHeightUpdate(toSlotIndex);
                }

                if (scheduleEl) {
                    updateEmptyTimeRowsVisibility(scheduleEl, {
                        respectFilters: false,
                        keepNowRow: true,
                    });
                }
            }

            renderStats();
            markGeometryDirtyIfNeeded();
        }

        const dayName = DAYS[toDay] || `День ${toDay + 1}`;
        const timeStr = minToHHMM(toSlotStart);
        toast("OK", "Перемещено", `${ev.name} → ${dayName} ${timeStr}`, 2000);

        console.log(`[smartMoveEvent] Успешно перемещено: ${ev.name}`);

    } catch (error) {
        console.error("[smartMoveEvent] Ошибка:", error);
        state.events[eventIndex].dayIndex = oldDayIndex;
        state.events[eventIndex].startMin = oldStartMin;
        toast("ERR", "Ошибка", "Не удалось переместить событие", 2000);
    }
}

function getTargetCellForMove(toDay, toSlotStart) {
    const scheduleEl = document.getElementById("schedule");
    if (!scheduleEl) return null;

    const view = state.settings.display.cellView;
    if (view === "compact") {
        return scheduleEl.querySelector(`.cell.droppable[data-day-index="${toDay}"]`);
    }

    const slotIndex = getSlotIndexForTime(toSlotStart);
    if (slotIndex === -1) return null;

    return scheduleEl.querySelector(
        `.cell.droppable[data-day-index="${toDay}"][data-slot-index="${slotIndex}"]`
    );
}

function replaceChildrenCompat(node) {
    if (!node) return;
    if (typeof node.replaceChildren === "function") {
        node.replaceChildren();
        return;
    }
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function getDirectSlotEvents(slotInner) {
    if (!slotInner) return [];
    return Array.from(slotInner.children).filter(
        (el) =>
            el.classList &&
            el.classList.contains("event") &&
            !el.classList.contains("touch-drag-clone")
    );
}

function updateSlotInnerLayoutClasses(slotInner) {
    if (!slotInner || SUPPORTS_HAS_SELECTOR) return;

    const events = getDirectSlotEvents(slotInner);
    const hasSingle = events.length === 1 && !events[0].classList.contains("double");
    const hasDouble = events.length >= 2 && events.some((ev) => ev.classList.contains("double"));

    slotInner.classList.toggle("has-single-event", hasSingle);
    slotInner.classList.toggle("has-double-event", hasDouble);
}

function refreshSlotInnerLayoutClasses(root) {
    if (SUPPORTS_HAS_SELECTOR) return;
    const scope = root || document;
    scope.querySelectorAll(".slot-inner").forEach((slotInner) => {
        updateSlotInnerLayoutClasses(slotInner);
    });
}

function sortEventsInSlotInner(slotInner) {
    if (!slotInner) return;
    const events = Array.from(slotInner.children).filter(
        (el) =>
            el.classList &&
            el.classList.contains("event") &&
            !el.classList.contains("touch-drag-clone")
    );
    if (events.length <= 1) return;

    events.sort((a, b) => {
        const aId = a.dataset.eid || "";
        const bId = b.dataset.eid || "";
        const aEvent = state.events.find((ev) => ev.id === aId);
        const bEvent = state.events.find((ev) => ev.id === bId);

        const aStart = Number(aEvent?.startMin ?? 0);
        const bStart = Number(bEvent?.startMin ?? 0);
        if (aStart !== bStart) return aStart - bStart;
        return aId.localeCompare(bId);
    });

    events.forEach((el) => slotInner.appendChild(el));
}

function ensureEmptyHintForCell(cell) {
    if (!cell) return;
    const slotInner = cell.querySelector(".slot-inner") || createSlotInner(cell);
    const events = slotInner.querySelectorAll(".event:not(.touch-drag-clone)");
    slotInner.querySelectorAll(".empty-slot").forEach((el) => el.remove());

    if (events.length === 0 && state.settings.display.showEmptyHint) {
        const hint = document.createElement("div");
        hint.className = "empty-slot";
        hint.textContent =
            state.settings.display.cellView === "compact"
                ? "Нет занятий"
                : "Клик для добавления";
        slotInner.appendChild(hint);
    }
    updateSlotInnerLayoutClasses(slotInner);
}

function updateCellDoubleState(cell) {
    if (!cell) return;
    const slotInner = cell.querySelector(".slot-inner");
    if (!slotInner) return;

    const events = slotInner.querySelectorAll(".event:not(.touch-drag-clone)");
    const slot = cell.querySelector(".slot");

    if (events.length === 2) {
        cell.dataset.double = "1";
        if (slot) slot.classList.add("two");
        events.forEach((ev) => ev.classList.add("double"));
    } else {
        cell.dataset.double = "";
        if (slot) slot.classList.remove("two");
        events.forEach((ev) => ev.classList.remove("double"));
    }

    updateDoubleEventClassesForCell(cell);
    updateSlotInnerLayoutClasses(slotInner);
}

function moveEventInDOM(eventId, toDay, toSlotStart) {
    const scheduleEl = document.getElementById("schedule");
    if (!scheduleEl) return false;

    const eventEl = scheduleEl.querySelector(`.event[data-eid="${eventId}"]`);
    if (!eventEl) return false;

    const sourceCell = eventEl.closest(".cell.droppable");
    if (!sourceCell) return false;

    const targetCell = getTargetCellForMove(toDay, toSlotStart);
    if (!targetCell) return false;

    if (sourceCell === targetCell) return true;

    const targetInner = targetCell.querySelector(".slot-inner") || createSlotInner(targetCell);
    targetInner.querySelectorAll(".empty-slot").forEach((el) => el.remove());
    eventEl.remove();
    targetInner.appendChild(eventEl);
    sortEventsInSlotInner(targetInner);

    ensureEmptyHintForCell(sourceCell);
    ensureEmptyHintForCell(targetCell);
    updateCellDoubleState(sourceCell);
    updateCellDoubleState(targetCell);

    return true;
}













































// ==================== ПЕРЕНОС_СКРОЛЛ ====================

// ==================== ФУНКЦИИ_ГЕОМЕТРИИ ====================

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

function getScheduleStructureKey() {
  const d = state.settings.display;
  const s = state.settings.schedule;
  return [
    d.cellView,
    s.start,
    s.end,
    s.slotMinutes
  ].join("|");
}

function getRowHeightSignature(structureKey) {
  let hash = 0;
  for (const ev of state.events) {
    const day = Number(ev.dayIndex) || 0;
    const start = Number(ev.startMin) || 0;
    const dur = Number(ev.durationMin) || 0;
    const nameLen = ev.name ? ev.name.length : 0;
    const coachLen = ev.coach ? ev.coach.length : 0;
    const roomLen = ev.room ? ev.room.length : 0;
    hash = (hash * 31 + day + start + dur + nameLen + coachLen + roomLen) >>> 0;
  }

  return [
    getGeomKey(),
    structureKey,
    state.events.length,
    hash
  ].join("|");
}

function getEventRenderKey(ev, view, isDouble) {
  const coach = ev.coach || "";
  const room = ev.room || "";
  const notes = ev.notes || "";
  const dirId = ev.directionId || "";
  const mode = state.settings.display.cardMode || "";
  return [
    ev.id,
    ev.name || "",
    coach,
    room,
    ev.startMin || 0,
    ev.durationMin || 0,
    dirId,
    notes,
    view,
    isDouble ? 1 : 0,
    mode,
  ].join("|");
}

function requestRowHeightSync(force = false) {
  if (force) pendingRowHeightSync = true;
  if (rowHeightSyncRaf) return;

  rowHeightSyncRaf = requestAnimationFrame(() => {
    rowHeightSyncRaf = 0;
    if (!pendingRowHeightSync) return;

    if (state.settings.display.cellView === "compact") {
      pendingRowHeightSync = false;
      return;
    }

    const scheduleEl = document.getElementById("schedule");
    if (!scheduleEl) return;

    pendingRowHeightSync = false;
    initializeAllRowHeights();
  });
}

function markGeometryDirty() {
  if (geometryDirty && geometrySyncRaf) return;

  geometryDirty = true;
  requestGeometrySync();
}

function markGeometryDirtyIfNeeded() {
  const key = getGeomKey();
  if (key === lastGeomKey) return;
  lastGeomKey = key;
  markGeometryDirty();
}

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


  if (view === "list") return;


  if (view === 'compact') {
    const allCells = Array.from(scheduleEl.querySelectorAll('.cell.droppable'));
    if (!allCells.length) return;

    const allCards = Array.from(scheduleEl.querySelectorAll('.event.compact-card'));


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


      let maxCardH = 0;
      for (const card of allCards) {
        const h = card.getBoundingClientRect().height;
        if (h > maxCardH) maxCardH = h;
      }

      const cardH = Math.ceil(maxCardH) + 'px';
      for (const card of allCards) {
        card.style.removeProperty("height");
        card.style.setProperty("min-height", cardH, "important");
      }


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
      for (const cell of allCells) {
        cell.style.removeProperty("height");
        cell.style.minHeight = cellH;
      }
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

    for (const c of cells) {
      c.style.removeProperty("height");
      c.style.removeProperty("min-height");
    }


    let maxCellW = 0;
    for (const c of cells) {
      const w = c.getBoundingClientRect().width;
      if (w > maxCellW) maxCellW = w;
    }


    const events = Array.from(
      scheduleEl.querySelectorAll(".cell.droppable .event")
    ).slice(0, 24);

    let maxEventW = 0;
    for (const ev of events) {
      const w = Math.max(ev.getBoundingClientRect().width, ev.scrollWidth);
      if (w > maxEventW) maxEventW = w;
    }


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


    scheduleEl.classList.remove("measuring");


    scheduleEl.classList.add("measuring-h");


    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (state.settings.display.cellView !== "timeline") {
          scheduleEl.classList.remove("measuring-h");
          return;
        }

        try {
          syncRowHeights(scheduleEl);
        } finally {
          scheduleEl.classList.remove("measuring-h");
        }
      });
    });
  });
}

function syncCompactGeometry(scheduleEl) {

  const cells = scheduleEl.querySelectorAll(".cell.droppable");
  cells.forEach((cell) => {
    cell.style.height = "";
  });


  let maxHeight = 0;
  cells.forEach((cell) => {
    const rect = cell.getBoundingClientRect();
    maxHeight = Math.max(maxHeight, rect.height);
  });


  cells.forEach((cell) => {
    cell.style.height = `${maxHeight}px`;
  });

  console.log("Compact geometry synced:", maxHeight);
}

function syncTimelineGeometry(scheduleEl) {

  scheduleEl.classList.add("measuring");

  requestAnimationFrame(() => {
    const fixedW = Number(state.settings.display?.dayWidthPx ?? 0);
    if (fixedW > 0) {
      document.documentElement.style.setProperty(
        "--dayW",
        `${clamp(Math.round(fixedW), 60, 800)}px`,
      );
    } else {
      const maxWidth = getMaxContentWidth(scheduleEl);
      if (maxWidth > 0) {
        document.documentElement.style.setProperty("--dayW", `${maxWidth}px`);
      }
    }

    scheduleEl.classList.remove("measuring");


    scheduleEl.classList.add("measuring-h");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        syncRowHeights(scheduleEl);
        scheduleEl.classList.remove("measuring-h");
      });
    });
  });
}

function syncListGeometry(scheduleEl) {
  syncTimelineGeometry(scheduleEl);
}

function getMaxContentWidth(scheduleEl) {
  const cells = scheduleEl.querySelectorAll(".cell.droppable");
  let maxWidth = 0;

  cells.forEach((cell) => {

    const slotInner = cell.querySelector(".slot-inner");
    if (slotInner) {
      const rect = slotInner.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, rect.width);
    }
  });


  const cellPad =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--cellPad"),
    ) || 6;

  maxWidth += cellPad * 2;


  const minW =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--dayMinW"),
    ) || 120;

  return Math.max(maxWidth, minW);
}

function syncRowHeights(scheduleEl) {
    if (!scheduleEl || scheduleEl.classList.contains("compact-mode")) return;

    const slotIndices = new Set();
    scheduleEl
      .querySelectorAll(".cell.droppable[data-slot-index]")
      .forEach((cell) => {
        const slotIndex = cell.dataset.slotIndex;
        if (slotIndex !== undefined) slotIndices.add(parseInt(slotIndex));
      });

    slotIndices.forEach((slotIndex) => {
      rerenderRowBySlotIndex(slotIndex);
    });
}

function calculateAndSetDoubleEventsHeight(cell, slotInner, eventElements) {
  if (!cell || !slotInner || !eventElements || eventElements.length !== 2)
    return;


  const originalCellHeight = cell.style.height;
  const originalSlotHeight = slotInner.style.height;


  eventElements.forEach((el) => {
    el.style.height = "auto";
    el.style.minHeight = "auto";
    el.style.overflow = "hidden";
  });

  slotInner.style.height = "auto";
  slotInner.style.minHeight = "auto";
  cell.style.height = "auto";


  void cell.offsetHeight;


  const heights = [];
  eventElements.forEach((el) => {

    const title = el.querySelector(".t");
    const meta = el.querySelector(".m");

    const originalTitleDisplay = title?.style.display;
    const originalMetaWhiteSpace = meta?.style.whiteSpace;

    if (title) {
      title.style.display = "block";
      title.style.webkitLineClamp = "unset";
      title.style.maxHeight = "none";
    }
    if (meta) {
      meta.style.whiteSpace = "normal";
    }

    const scrollHeight = el.scrollHeight;
    heights.push(scrollHeight);


    if (title) {
      title.style.display = originalTitleDisplay || "";
      title.style.webkitLineClamp = "";
    }
    if (meta) {
      meta.style.whiteSpace = originalMetaWhiteSpace || "";
    }
  });


  const maxHeight = Math.max(...heights);


  const gap = 2;
  const totalHeight = maxHeight * 2 + gap;

  eventElements.forEach((el) => {
    el.style.height = `${maxHeight}px`;
    el.style.minHeight = `${maxHeight}px`;
  });

  slotInner.style.minHeight = `${totalHeight}px`;
  slotInner.style.height = `${totalHeight}px`;


  const cellStyle = getComputedStyle(cell);
  const slotStyle = getComputedStyle(cell.querySelector(".slot"));

  const cellPadding =
    parseFloat(cellStyle.paddingTop) + parseFloat(cellStyle.paddingBottom);
  const slotPadding =
    parseFloat(slotStyle.paddingTop) + parseFloat(slotStyle.paddingBottom);
  const borders =
    parseFloat(cellStyle.borderTopWidth) +
    parseFloat(cellStyle.borderBottomWidth);

  const cellTotalHeight = totalHeight + cellPadding + slotPadding + borders;


  cell.style.height = `${cellTotalHeight}px`;
  cell.style.minHeight = `${cellTotalHeight}px`;


  eventElements.forEach((el) => {
    const title = el.querySelector(".t");
    const meta = el.querySelector(".m");

    if (title) {
      title.style.display = "-webkit-box";
      title.style.webkitBoxOrient = "vertical";
      title.style.webkitLineClamp = "2";
      title.style.overflow = "hidden";
      title.style.maxHeight = `${maxHeight - 20}px`;
    }

    if (meta) {
      meta.style.whiteSpace = "nowrap";
      meta.style.textOverflow = "ellipsis";
      meta.style.overflow = "hidden";
    }


    el.style.overflow = "hidden";
  });
}

function recalculateAllDoubleEventsHeights() {
  const doubleCells = document.querySelectorAll(
    '.cell.droppable[data-double="1"]',
  );

  doubleCells.forEach((cell) => {
    const slotInner = cell.querySelector(".slot-inner");
    if (!slotInner) return;

    const eventElements = Array.from(
      slotInner.querySelectorAll(".event.double"),
    );
    if (eventElements.length !== 2) return;

    calculateAndSetDoubleEventsHeight(cell, slotInner, eventElements);
  });
}

// ==================== ФУНКЦИИ_ГЕОМЕТРИИ ====================

// ==================== ФУНКЦИИ_РЕНДЕРА_ТАБЛИЦЫ_ИЗНАЧАЛЬНОЙ ====================


function getEffectiveMinRowHeight() {
  const root = document.documentElement;
  const cssVal = parseFloat(getComputedStyle(root).getPropertyValue("--slotH"));
  if (Number.isFinite(cssVal) && cssVal > 0) return cssVal;

  const settingVal = Number(state.settings?.schedule?.slotHeight);
  if (Number.isFinite(settingVal) && settingVal > 0) return settingVal;

  return CELL_HEIGHT_CONFIG.MIN_CELL_HEIGHT;
}

function updateTodayHighlight(cell, dayIndex, todayIndex) {
  if (!cell) return;
  const shouldHighlight =
    dayIndex === todayIndex && state.settings.display.showTodayHighlight;
  cell.classList.toggle("col-today", shouldHighlight);
}

function createCompactEventCard(ev) {
  const dir = getDir(ev.directionId);
  const color = dir ? dir.color : "#64748b";
  const el = document.createElement("div");
  el.className = "event compact-card";
  if (!eventVisible(ev)) el.classList.add("dim");

  el.style.setProperty("--ev-bg", color);

  el.dataset.eid = ev.id;

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

  applyTitleStyles(el, CELL_HEIGHT_CONFIG.TITLE_LINES);
  applyMetaStyles(el, CELL_HEIGHT_CONFIG.META_LINES);

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
    if (ev.notes) tt.push(`Заметка: ${ev.notes}`);
    el.title = tt.join(" | ");
  }

  return el;
}

function createListEventElement(ev, count) {
  const dir = getDir(ev.directionId);
  const color = dir ? dir.color : "#64748b";
  const el = document.createElement("div");
  el.className = "event list" + (count === 2 ? " double" : "");
  if (!eventVisible(ev)) el.classList.add("dim");
  el.style.setProperty("--ev-bg", color);

  el.dataset.eid = ev.id;

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

  const isDouble = count >= 2;
  applyTitleStyles(
    el,
    isDouble ? CELL_HEIGHT_CONFIG.DOUBLE_TITLE_LINES : CELL_HEIGHT_CONFIG.TITLE_LINES,
  );
  applyMetaStyles(
    el,
    isDouble ? CELL_HEIGHT_CONFIG.DOUBLE_META_LINES : CELL_HEIGHT_CONFIG.META_LINES,
  );

  if (state.settings.display.showNotes) {
    const tt = [];
    tt.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
    if (ev.coach) tt.push(ev.coach);
    if (ev.room) tt.push(ev.room);
    if (dir) tt.push(dir.name);
    if (ev.notes) tt.push("— " + ev.notes);
    el.title = tt.join("\n");
  }

  return el;
}

function createTimelineEventElement(ev, isDouble) {
  const dir = getDir(ev.directionId);
  const color = dir ? dir.color : "#64748b";
  const el = document.createElement("div");
  el.className = isDouble ? "event double" : "event";
  if (!eventVisible(ev)) el.classList.add("dim");
  el.style.setProperty("--ev-bg", color);

  el.dataset.eid = ev.id;

  const title = document.createElement("div");
  title.className = "t";
  title.textContent = fixTypography(ev.name);
  el.appendChild(title);

  const metaText = metaFullByMode(ev);
  if (metaText) {
    if (isDouble) el.classList.add("title-3");
    const meta = document.createElement("div");
    meta.className = "m";
    meta.textContent = metaText;
    el.appendChild(meta);
  }

  const titleLines = isDouble
    ? CELL_HEIGHT_CONFIG.DOUBLE_TITLE_LINES
    : CELL_HEIGHT_CONFIG.TITLE_LINES;
  const metaLines = isDouble
    ? CELL_HEIGHT_CONFIG.DOUBLE_META_LINES
    : CELL_HEIGHT_CONFIG.META_LINES;
  applyTitleStyles(el, titleLines);
  applyMetaStyles(el, metaLines);

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
    if (ev.notes) tt.push(`Заметка: ${ev.notes}`);
    el.title = tt.join(" | ");
  }

  return el;
}

function renderScheduleLegacy() {
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
    const label = getScheduleDayLabel(dayIndex);
    c.innerHTML = `<span class="day-label">${label}</span> <span class="day-actions" title="Действия">⋯</span>`;
    c.querySelector(".day-actions").addEventListener("click", (e) => {
      e.stopPropagation();
      dayMenu(dayIndex);
    });
    scheduleEl.appendChild(c);
  });

  updateDayHeaders(scheduleEl);

  // ===== helpers (compact) =====
  function createCompactEventCard(ev) {
    const dir = getDir(ev.directionId);
    const color = dir ? dir.color : "#64748b";
    const el = document.createElement("div");
    el.className = "event compact-card";
    if (!eventVisible(ev)) el.classList.add("dim");

    el.style.setProperty("--ev-bg", color);

    // Добавляем атрибут для идентификации события
    el.dataset.eid = ev.id;

    // Удален обработчик клика, так как он будет обрабатываться системой Drag-and-Drop
    // Клик обрабатывается в handleTouchEnd и handleMouseUp

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

    applyTitleStyles(el, CELL_HEIGHT_CONFIG.TITLE_LINES);
    applyMetaStyles(el, CELL_HEIGHT_CONFIG.META_LINES);

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
      if (ev.notes) tt.push(`Заметка: ${ev.notes}`);
      el.title = tt.join(" | ");
    }

    return el;
  }

  // ===== КОМПАКТНЫЙ РЕЖИМ =====
  if (view === "compact") {
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const cell = mkCell("cell droppable", "");
      cell.dataset.dayIndex = dayIndex;
      
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
        handleCellClickOpen(e, cell, dayIndex, null, null, true);
      });

      cell.appendChild(slot);
      scheduleEl.appendChild(cell);
    }
  } else {
    // ===== timeline / list =====
    slots.forEach((slotStart, slotIndex) => {
      const isNow = minToHHMM(slotStart).startsWith(nowHour + ":");
      const showToday = !!state.settings.display.showTodayHighlight;
      const tCell = mkCell("cell time", minToHHMM(slotStart));
      tCell.dataset.slotIndex = slotIndex;
      if (isNow && showToday) tCell.classList.add("now");
      scheduleEl.appendChild(tCell);

      const slotEnd = slotStart + step;

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cell = mkCell("cell droppable", "");
        cell.dataset.dayIndex = dayIndex;
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

        cell.addEventListener("click", (e) =>
          handleCellClickOpen(e, cell, dayIndex, slotStart, slotEnd, false)
        );

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
            const el = document.createElement("div");
            el.className = "event list" + (count === 2 ? " double" : "");
            if (!eventVisible(ev)) el.classList.add("dim");
            el.style.setProperty("--ev-bg", color);

            // Добавляем атрибут для идентификации события
            el.dataset.eid = ev.id;

            // Удален обработчик клика, так как он будет обрабатываться системой Drag-and-Drop
            // Клик обрабатывается в handleTouchEnd и handleMouseUp

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

            const sortedEvents = [...eventsInCell].sort((a, b) => a.startMin - b.startMin);
            sortedEvents.forEach((ev) => {
              const dir = getDir(ev.directionId);
              const color = dir ? dir.color : "#64748b";
              const el = document.createElement("div");
              el.className = "event double";
              if (!eventVisible(ev)) el.classList.add("dim");
              el.style.setProperty("--ev-bg", color);

              // Добавляем атрибут для идентификации события
              el.dataset.eid = ev.id;

              // Удален обработчик клика, так как он будет обрабатываться системой Drag-and-Drop
              // Клик обрабатывается в handleTouchEnd и handleMouseUp

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
                tt.push(`${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`);
                if (ev.coach) tt.push(ev.coach);
                if (ev.room) tt.push(ev.room);
                if (dir) tt.push(dir.name);
                if (ev.notes) tt.push(`Заметка: ${ev.notes}`);
                el.title = tt.join(" | ");
              }

              slotInner.appendChild(el);
            });
          } else {
            cell.dataset.double = "";
            eventsInCell.forEach((ev) => {
              const dir = getDir(ev.directionId);
              const color = dir ? dir.color : "#64748b";
              const el = document.createElement("div");
              el.className = "event";
              if (!eventVisible(ev)) el.classList.add("dim");
              el.style.setProperty("--ev-bg", color);

              // Добавляем атрибут для идентификации события
              el.dataset.eid = ev.id;

              // Удален обработчик клика, так как он будет обрабатываться системой Drag-and-Drop
              // Клик обрабатывается в handleTouchEnd и handleMouseUp

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
                if (ev.notes) tt.push(`Заметка: ${ev.notes}`);
                el.title = tt.join(" | ");
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

  refreshSlotInnerLayoutClasses(scheduleEl);
  $("emptyHint").hidden = state.events.length !== 0;
  const heightSig = getRowHeightSignature(structureKey);
  if (heightSig !== lastHeightSyncKey) {
    lastHeightSyncKey = heightSig;
    pendingRowHeightSync = true;
  }
  requestRowHeightSync();
  markGeometryDirty();
  
  // Инициализируем систему Drag-and-Drop после рендера
  setTimeout(() => {
    if (window.TouchDragSystem && window.TouchDragSystem.init) {
      window.TouchDragSystem.init();
    }
  }, 100);
}

// ================================================================================================================================================ ЕБАННОЕ_ОТОБРАЖЕНИЕ ========
function renderSchedule() {
  const scheduleEl = $("schedule");
  if (!scheduleEl) return;

  const { step, start } = getBounds();
  const slots = buildSlots();
  const view = state.settings.display.cellView;
  const scheduleWrap = scheduleEl.closest(".schedule-wrap");
  if (scheduleWrap) {
    scheduleWrap.classList.toggle("compact-view", view === "compact");
  }

  const todayIndex = (new Date().getDay() + 6) % 7;
  const nowHour = pad2(new Date().getHours());

  if (view !== lastCellView) {
    lastCellView = view;
    markGeometryDirtyIfNeeded();
  }

  const structureKey = getScheduleStructureKey();
  const needsRebuild =
    scheduleEl.dataset.structureKey !== structureKey ||
    !scheduleEl.firstElementChild;
  if (needsRebuild) {
    scheduleEl.dataset.structureKey = structureKey;
    scheduleEl.innerHTML = "";

    if (view === "compact") scheduleEl.classList.add("compact-mode");
    else scheduleEl.classList.remove("compact-mode");

    if (view !== "compact") {
      scheduleEl.appendChild(mkCell("cell head time", ""));
    }

    DAYS.forEach((d, dayIndex) => {
      const c = mkCell("cell head", "");
      const label = getScheduleDayLabel(dayIndex);
      c.innerHTML = `<span class="day-label">${label}</span><span class="day-actions" title="Действия">⋯</span>`;
      c.querySelector(".day-actions").addEventListener("click", (e) => {
        e.stopPropagation();
        dayMenu(dayIndex);
      });
      scheduleEl.appendChild(c);
    });

    if (view === "compact") {
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cell = mkCell("cell droppable", "");
        cell.dataset.dayIndex = dayIndex;

        const slot = document.createElement("div");
        slot.className = "slot compact-mode";

        const slotInner = document.createElement("div");
        slotInner.className = "slot-inner";
        slot.appendChild(slotInner);

        cell.addEventListener("click", (e) => {
          handleCellClickOpen(e, cell, dayIndex, null, null, true);
        });

        cell.appendChild(slot);
        scheduleEl.appendChild(cell);
      }
    } else {
      slots.forEach((slotStart, slotIndex) => {
        const tCell = mkCell("cell time", minToHHMM(slotStart));
        tCell.dataset.slotIndex = slotIndex;
        scheduleEl.appendChild(tCell);

        const slotEnd = slotStart + step;

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          const cell = mkCell("cell droppable", "");
          cell.dataset.dayIndex = dayIndex;
          cell.dataset.slotIndex = String(slotIndex);

          const slot = document.createElement("div");
          slot.className = "slot";
          if (view === "list") slot.classList.add("list-mode");
          if (view === "timeline") slot.classList.add("tl-fill");

          const slotInner = document.createElement("div");
          slotInner.className = "slot-inner";
          slot.appendChild(slotInner);

          cell.addEventListener("click", (e) =>
            handleCellClickOpen(e, cell, dayIndex, slotStart, slotEnd, false)
          );

          cell.appendChild(slot);
          scheduleEl.appendChild(cell);
        }
      });
    }
  } else {
    if (view === "compact") scheduleEl.classList.add("compact-mode");
    else scheduleEl.classList.remove("compact-mode");
  }

  updateDayHeaders(scheduleEl);

  const changedSlots = new Set();
  let anyChanged = false;

  if (view === "compact") {
    const eventsByDay = Array.from({ length: 7 }, () => []);
    state.events.forEach((ev) => {
      if (ev.dayIndex >= 0 && ev.dayIndex < 7) {
        eventsByDay[ev.dayIndex].push(ev);
      }
    });
    eventsByDay.forEach((arr) => arr.sort((a, b) => a.startMin - b.startMin));

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const cell = scheduleEl.querySelector(
        `.cell.droppable[data-day-index="${dayIndex}"]`
      );
      if (!cell) continue;

      updateTodayHighlight(cell, dayIndex, todayIndex);

      const slotInner = cell.querySelector(".slot-inner") || createSlotInner(cell);
      const dayEvents = eventsByDay[dayIndex] || [];
      const renderKey = [
        "compact",
        state.settings.display.showEmptyHint ? 1 : 0,
        ...dayEvents.map((ev) => getEventRenderKey(ev, "compact", false)),
      ].join(";");

      if (slotInner.dataset.renderKey !== renderKey) {
        slotInner.dataset.renderKey = renderKey;
        replaceChildrenCompat(slotInner);

        if (!dayEvents.length) {
          if (state.settings.display.showEmptyHint) {
            const hint = document.createElement("div");
            hint.className = "empty-slot";
            hint.textContent = "Нет занятий";
            slotInner.appendChild(hint);
          }
        } else {
          dayEvents.forEach((ev) =>
            slotInner.appendChild(createCompactEventCard(ev))
          );
        }
        anyChanged = true;
      }
    }
  } else {
    const timeCells = scheduleEl.querySelectorAll(".cell.time");
    timeCells.forEach((tCell) => {
      const isNow = tCell.textContent.startsWith(nowHour + ":");
      tCell.classList.toggle("now", isNow && state.settings.display.showTodayHighlight);
    });

    const eventsByCell = new Map();
    state.events.forEach((ev) => {
      if (ev.dayIndex == null) return;
      const slotIndex = Math.floor((ev.startMin - start) / step);
      if (!Number.isFinite(slotIndex)) return;
      if (slotIndex < 0 || slotIndex >= slots.length) return;
      const slotStart = slots[slotIndex];
      if (ev.startMin < slotStart || ev.startMin >= slotStart + step) return;

      const key = `${slotIndex}|${ev.dayIndex}`;
      let arr = eventsByCell.get(key);
      if (!arr) {
        arr = [];
        eventsByCell.set(key, arr);
      }
      arr.push(ev);
    });
    eventsByCell.forEach((arr) => arr.sort((a, b) => a.startMin - b.startMin));

    for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cell = scheduleEl.querySelector(
          `.cell.droppable[data-day-index="${dayIndex}"][data-slot-index="${slotIndex}"]`
        );
        if (!cell) continue;

        updateTodayHighlight(cell, dayIndex, todayIndex);

        const slot = cell.querySelector(".slot");
        if (slot) {
          slot.classList.toggle("list-mode", view === "list");
          slot.classList.toggle("tl-fill", view === "timeline");
          if (view !== "timeline") slot.classList.remove("two");
        }

        const slotInner = cell.querySelector(".slot-inner") || createSlotInner(cell);
        const key = `${slotIndex}|${dayIndex}`;
        const eventsInCell = eventsByCell.get(key) || [];
        const count = eventsInCell.length;
        const renderKey = [
          view,
          state.settings.display.showEmptyHint ? 1 : 0,
          count,
          ...eventsInCell.map((ev) => getEventRenderKey(ev, view, count === 2)),
        ].join(";");

        if (slotInner.dataset.renderKey !== renderKey) {
          slotInner.dataset.renderKey = renderKey;
          replaceChildrenCompat(slotInner);

          if (!count) {
            if (state.settings.display.showEmptyHint) {
              const hint = document.createElement("div");
              hint.className = "empty-slot";
              hint.textContent = "Клик для добавления";
              slotInner.appendChild(hint);
            }
            if (slot && view === "timeline") slot.classList.remove("two");
            cell.dataset.double = "";
          } else if (view === "list") {
            eventsInCell.forEach((ev) =>
              slotInner.appendChild(createListEventElement(ev, count))
            );
            cell.dataset.double = "";
          } else {
            if (count === 2) {
              if (slot) slot.classList.add("two");
              cell.dataset.double = "1";
              eventsInCell.forEach((ev) =>
                slotInner.appendChild(createTimelineEventElement(ev, true))
              );
            } else {
              if (slot) slot.classList.remove("two");
              cell.dataset.double = "";
              eventsInCell.forEach((ev) =>
                slotInner.appendChild(createTimelineEventElement(ev, false))
              );
            }
          }

          if (count) updateDoubleEventClassesForCell(cell);
          anyChanged = true;
          changedSlots.add(slotIndex);
        }
      }
    }
  }

  refreshSlotInnerLayoutClasses(scheduleEl);
  $("emptyHint").hidden = state.events.length !== 0;
  if (view !== "compact") {
    if (needsRebuild) {
      pendingRowHeightSync = true;
      requestRowHeightSync(true);
    } else if (changedSlots.size) {
      changedSlots.forEach((idx) => scheduleRowHeightUpdate(idx));
    }
  }

  if (needsRebuild || anyChanged) {
    markGeometryDirty();
  }

  if (view !== "compact") {
    updateEmptyTimeRowsVisibility(scheduleEl, {
      respectFilters: false,
      keepNowRow: true,
    });
  }

  if (needsRebuild || !touchDragState.container) {
    setTimeout(() => {
      if (window.TouchDragSystem && window.TouchDragSystem.init) {
        window.TouchDragSystem.init();
      }
    }, 100);
  }
}

function renderAll() {
  applyTheme();
  renderFilterBar();
  renderSchedule();
  renderStats();

  // Обновляем логотип после рендеринга расписания
  if (window.logoManager) {
    try {
      window.logoManager.update();
    } catch (error) {
      console.error("Ошибка при обновлении логотипа в renderAll():", error);
    }
  }
  markGeometryDirtyIfNeeded();
}


function memoizedEventVisible(ev) {
  const q = (filters.q || "").trim().toLowerCase();
  const dirKey = Array.from(filters.dir || [])
    .map(String)
    .sort()
    .join(",");
  const hash = `${filters.day}|${filters.time}|${dirKey}|${q}`;

  if (hash !== lastFilterHash) {
    lastFilterHash = hash;
    filterCache = new Map();
  }

  const key = ev && ev.id ? ev.id : ev;
  if (filterCache.has(key)) return filterCache.get(key);

  const visible = eventVisible(ev);
  filterCache.set(key, visible);
  return visible;
}

function clearFilterCache() {
  filterCache = new Map();
  lastFilterHash = "";
}

function onFiltersChanged() {
  clearFilterCache();
  renderFilterBar();
  applyEventVisibilityOnly();
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

  const statsEl = $("stats");
  if (statsEl) {
    statsEl.textContent = total ? `Показано: ${shown}/${total}` : "Нет занятий";
  }

  updateFilterChips();
}

function updateStats(visibleCount = null) {
  renderStats(visibleCount);
}

function updateFilterChips() {
  // Обновление чипсов фильтров
  console.log("[updateFilterChips] Обновление чипсов фильтров");
}

// ==================== ФУНКЦИИ_РЕНДЕРА_ТАБЛИЦЫ_ИЗНАЧАЛЬНОЙ ====================

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

function handleCellClickOpen(e, cell, dayIndex, slotStart, slotEnd, isCompact) {
  if (!cell) return;

  const clickedEvent = e?.target?.closest?.(".event[data-eid]");
  if (clickedEvent && clickedEvent.dataset?.eid) {
    openEdit(clickedEvent.dataset.eid);
    return;
  }

  const eventsInCell = Array.from(cell.querySelectorAll(".event[data-eid]"));
  if (eventsInCell.length === 1) {
    openEdit(eventsInCell[0].dataset.eid);
    return;
  }

  if (eventsInCell.length > 1) {
    toast(
      "INFO",
      "Выберите занятие",
      "В этой ячейке несколько занятий. Нажмите на нужное.",
      1600,
    );
    return;
  }

  if (isCompact) {
    const startMin = parseHHMM(state.settings.schedule.start) || 540;
    smartOpenCreate(dayIndex, startMin);
  } else {
    smartOpenCreate(dayIndex, slotStart, slotEnd);
  }
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
  separator.textContent = "--------------------";
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
  separator.textContent = "--------------------";
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

function clearNewDirForm() {
  newDirName.value = "";
  newDirColor.value = "#ef4444";
  updateNewDirPreview();
  renderDirSwatches();
}

function createDirectionFromForm({ select = true } = {}) {
  const name = newDirName.value.trim();
  if (!name) {
    toast("WARN", "⚠️", "Укажите название направления.");
    newDirName.focus();
    return null;
  }

  const existing = state.directions.find(
    (d) => d.name.toLowerCase() === name.toLowerCase(),
  );
  let directionId;

  if (existing) {
    directionId = existing.id;
    toast("INFO", "ℹ️", "Такое направление уже есть.");
  } else {
    const ndId = generateDirectionId(name);
    const color = newDirColor.value || "#ef4444";
    state.directions.push({ id: ndId, name, color });
    directionId = ndId;
    pushHistory(`➕ Новое направление: ${name}`);
    saveState();
    toast("OK", "Сохранено", `Направление "${name}" добавлено`);
  }

  renderDirSelect(directionId);
  renderFilterBar();
  if (select && directionId) {
    evDir.value = directionId;
    renderDirPreview();
  }

  clearNewDirForm();
  return directionId;
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

  setBackdropVisible(eventBackdrop, true);
  setTimeout(() => evName.focus(), 20);
  updateConflictsLive();
}

function closeEventModal() {
  setBackdropVisible(eventBackdrop, false);
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
  const isNew = idx < 0;

  pushHistory(isNew ? "➕ Новое занятие" : "✏️ Редактирование");

  if (idx >= 0) {
    // Обновляем существующее событие
    state.events[idx] = next;
    updateEventInDOM(next);
  } else {
    // Добавляем новое событие
    state.events.push(next);
    addEventToDOM(next);
  }

  saveState();
  updateStats();
  closeEventModal();

  toast(
    "OK",
    isNew ? "Добавлено" : "Обновлено",
    `${isNew ? "Занятие добавлено" : "Занятие обновлено"}`,
  );
}

function deleteEventFromModal() {
  const id = evId.value;
  if (!id) return;

  if (!confirm("Удалить занятие?")) return;

  const event = state.events.find((e) => e.id === id);
  if (!event) return;

  pushHistory("Удаление занятия");

  // Удаляем из состояния
  state.events = state.events.filter((e) => e.id !== id);

  // Удаляем из DOM
  removeEventFromDOM(id);

  saveState();
  updateStats();
  closeEventModal();

  toast("OK", "Удалено", `Занятие "${event.name}" удалено`);
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
  addEventToDOM(copy);
  closeEventModal();
  toast("OK", "Дублировано", "Копия добавлена.");
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

function initFontPicker(cfg) {
  const wrap = $(cfg.wrapId);
  const btn = $(cfg.btnId);
  const pop = $(cfg.popId);
  const list = $(cfg.listId);
  const search = $(cfg.searchId);
  const title = $(cfg.titleId);
  const sample = $(cfg.sampleId);

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

    const hasMoreItems = filtered.length > visible.length;
    list.classList.toggle("has-font-more", hasMoreItems);

    if (hasMoreItems) {
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

function renderThemePresetUI() {
  themePreset.innerHTML = "";

  // Сначала добавляем пустой вариант или "custom"
  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = "Пользовательская";
  themePreset.appendChild(customOption);

  // Затем добавляем все пресеты
  THEME_PRESETS.forEach((p) => {
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.name;
    themePreset.appendChild(o);
  });

  // Определяем, какой пресет выбран
  const currentTokens =
    state.settings.theme.customTokens || deepCopy(THEME_PRESETS[0].tokens);
  const matchingPreset = THEME_PRESETS.find((preset) =>
    Object.keys(preset.tokens).every(
      (key) =>
        normalizeHex(preset.tokens[key]) === normalizeHex(currentTokens[key]),
    ),
  );

  // Устанавливаем значение, если нашли совпадение
  themePreset.value = matchingPreset ? matchingPreset.id : "custom";

  paletteGrid.innerHTML = "";
  THEME_PRESETS.forEach((p) => {
    const el = document.createElement("div");
    el.className = "palette";
    el.innerHTML = `
      <div class="name">${p.name}</div>
      <div class="bar">
        <span class="c" style="background:${p.tokens.bg}"></span>
        <span class="c" style="background:${p.tokens.card}"></span>
        <span class="c" style="background:${p.tokens.accent}"></span>
        <span class="c" style="background:${p.tokens.gridHead}"></span>
        <span class="c" style="background:${p.tokens.today}"></span>
      </div>
      <div class="mini">Акцент: ${p.tokens.accent}</div>
    `;
    el.addEventListener("click", () => applyPresetToCustom(p.id));
    paletteGrid.appendChild(el);
  });

  // ✅ ИСПРАВЛЕННЫЕ ВЫЗОВЫ fillDots:
  // Второй аргумент - функция, которая ВОЗВРАЩАЕТ текущее значение
  // Третий аргумент - функция, которая УСТАНАВЛИВАЕТ значение
  fillDots(
    DOTS.accent,
    () => tAccent.value, // Функция получения текущего значения
    (c) => {
      // Функция установки нового значения
      tAccent.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.bg,
    () => tBg.value,
    (c) => {
      tBg.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.card,
    () => tCard.value,
    (c) => {
      tCard.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.text,
    () => tText.value,
    (c) => {
      tText.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.border,
    () => tBorder.value,
    (c) => {
      tBorder.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.gridHead,
    () => tGridHead.value,
    (c) => {
      tGridHead.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.now,
    () => tNowRow.value,
    (c) => {
      tNowRow.value = c;
      onThemeInput();
    },
  );

  fillDots(
    DOTS.today,
    () => tTodayCol.value,
    (c) => {
      tTodayCol.value = c;
      onThemeInput();
    },
  );
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
  message += "\n--------------------\n";
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

  // Не изменяем themeMode здесь, это делается в openSettings()
}

function updateThemePresetSelection() {
    const currentTokens = state.settings.theme.customTokens || deepCopy(THEME_PRESETS[0].tokens);
    const matchingPreset = THEME_PRESETS.find((preset) =>
        Object.keys(preset.tokens).every(
            (key) =>
                normalizeHex(preset.tokens[key]) === normalizeHex(currentTokens[key]),
        ),
    );
    if (themePreset) {
        themePreset.value = matchingPreset ? matchingPreset.id : "custom";
    }
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
    state.settings.theme.mode = "custom";
    fillThemeInputsFromState();
    previewThemeWarnings();
    // Обновляем значение селектора
    if (themePreset) themePreset.value = presetId;
    // Обновляем режим темы
    if (themeMode) themeMode.value = "custom";
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

    if (themeMode && themeMode.value === "custom") {
        state.settings.theme.mode = "custom";
    }

    // Обновляем пресет при ручной смене цветов
    updateThemePresetSelection();
    applyTheme();
}

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
  invalidateExportPreview();
});

expPreset.addEventListener("change", () => {
  if (exportMode === EXPORT_MODE_WEEK) {
    exportWeekPresetId = expPreset.value || exportWeekPresetId;
  }
  invalidateExportPreview();
});
expBg.addEventListener("change", () => {
  invalidateExportPreview();
});

expQuality.addEventListener("input", () => {
  expQualityVal.textContent = String(expQuality.value);
  invalidateExportPreview();
});

if (expTabWeek) {
  expTabWeek.addEventListener("click", () => {
    setExportMode(EXPORT_MODE_WEEK);
  });
}
if (expTabDay) {
  expTabDay.addEventListener("click", () => {
    setExportMode(EXPORT_MODE_DAY);
  });
}
if (expDaySelect) {
  expDaySelect.addEventListener("change", () => {
    persistExportDaySettings();
    invalidateExportPreview();
  });
}
if (expDayOverlay) {
  expDayOverlay.addEventListener("input", () => {
    persistExportDaySettings({ save: false });
    updateExportDayOverlayLabel();
    invalidateExportPreview();
  });
  expDayOverlay.addEventListener("change", () => {
    persistExportDaySettings();
  });
}
if (expDayTopOffset) {
  expDayTopOffset.addEventListener("input", () => {
    persistExportDaySettings({ save: false });
    invalidateExportPreview();
  });
  expDayTopOffset.addEventListener("change", () => {
    persistExportDaySettings();
    invalidateExportPreview();
  });
}
if (expDayTitleColor) {
  expDayTitleColor.addEventListener("input", () => {
    persistExportDaySettings({ save: false });
    invalidateExportPreview();
  });
  expDayTitleColor.addEventListener("change", () => {
    persistExportDaySettings();
    invalidateExportPreview();
  });
}
if (expDayBgFile) {
  expDayBgFile.addEventListener("change", () => {
    const file = expDayBgFile.files && expDayBgFile.files[0];
    if (!file) {
      syncExportDayBackgroundFromSettings();
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || "");
      if (!dataUrl.startsWith("data:")) {
        toast("ERR", "Экспорт", "Не удалось прочитать выбранное изображение.");
        syncExportDayBackgroundFromSettings();
        return;
      }
      const preparedDataUrl = await prepareDayBackgroundForExport(dataUrl);
      exportDayBackgroundDataUrl = preparedDataUrl;
      const exportDaySettings = getExportDaySettings();
      exportDaySettings.backgroundDataUrl = preparedDataUrl || "";
      exportDaySettings.backgroundName = file.name || "";
      saveState(true);
      setExportDayBackgroundStatus(`Файл: ${file.name}`);
      invalidateExportPreview();
    };
    reader.onerror = () => {
      toast("ERR", "Экспорт", "Ошибка чтения изображения.");
      syncExportDayBackgroundFromSettings();
    };
    reader.readAsDataURL(file);
  });
}

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

// Обработчик кнопки обновления кэша
async function getAppServiceWorkerRegistrations() {
  if (!("serviceWorker" in navigator)) return [];
  const registrations = await navigator.serviceWorker.getRegistrations();
  return registrations.filter((registration) => {
    const workerUrl =
      registration.active?.scriptURL ||
      registration.waiting?.scriptURL ||
      registration.installing?.scriptURL ||
      "";
    return workerUrl === SW_SCRIPT_URL;
  });
}

async function getServiceWorkerDiagnostics() {
  if (!("serviceWorker" in navigator)) {
    return { supported: false };
  }

  const registrations = await navigator.serviceWorker.getRegistrations();
  const appRegistrations = await getAppServiceWorkerRegistrations();
  const cacheNames = "caches" in window ? await caches.keys() : [];

  return {
    supported: true,
    scope: SW_EXPECTED_SCOPE,
    scriptURL: SW_SCRIPT_URL,
    controller: !!navigator.serviceWorker.controller,
    registrationCount: registrations.length,
    appRegistrationCount: appRegistrations.length,
    registrations: registrations.map((registration) => ({
      scope: registration.scope,
      scriptURL:
        registration.active?.scriptURL ||
        registration.waiting?.scriptURL ||
        registration.installing?.scriptURL ||
        null,
      active: !!registration.active,
      waiting: !!registration.waiting,
      installing: !!registration.installing,
    })),
    cacheNames,
  };
}

window.getServiceWorkerDiagnostics = getServiceWorkerDiagnostics;

function hardReloadPage() {
  const url = new URL(window.location.href);
  url.searchParams.set("_cb", String(Date.now()));
  window.location.replace(url.toString());
}

async function clearAppCacheAndReload() {
  const appRegistrations = await getAppServiceWorkerRegistrations();

  for (const registration of appRegistrations) {
    [registration.waiting, registration.active, registration.installing]
      .filter(Boolean)
      .forEach((worker) => {
        try {
          worker.postMessage({ type: "CLEAR_APP_CACHE" });
        } catch (error) {
          console.warn("Service Worker CLEAR_APP_CACHE message failed:", error);
        }
      });
  }

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    const appCacheNames = cacheNames.filter((name) =>
      name.startsWith(SW_CACHE_PREFIX),
    );
    await Promise.all(appCacheNames.map((name) => caches.delete(name)));
  }

  for (const registration of appRegistrations) {
    await registration.unregister();
  }

  clearPreviewCache();
  hardReloadPage();
}

async function forceServiceWorkerRefreshOnce() {
  if (!isServiceWorkerAllowed()) return false;
  if (localStorage.getItem(SW_FORCE_REFRESH_MARK) === SW_FORCE_REFRESH_VERSION) {
    return false;
  }

  try {
    localStorage.setItem(SW_FORCE_REFRESH_MARK, SW_FORCE_REFRESH_VERSION);
    await clearAppCacheAndReload();
    return true;
  } catch (error) {
    localStorage.removeItem(SW_FORCE_REFRESH_MARK);
    console.warn("One-time Service Worker refresh failed:", error);
    return false;
  }
}

const btnClearCache = document.getElementById("btnClearCache");
if (btnClearCache) {
  btnClearCache.addEventListener("click", async () => {
    if (!confirm("Обновить кэш приложения? Страница будет перезагружена.")) {
      return;
    }

    try {
      await clearAppCacheAndReload();
    } catch (error) {
      console.error("Cache refresh failed:", error);
      toast(
        "ERR",
        "Кэш",
        "Не удалось обновить кэш: " + (error?.message || String(error)),
      );
    }
  });
}
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
    onFiltersChanged();
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
        saveState();
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
newDirName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    createDirectionFromForm({ select: true });
  }
});
newDirColor.addEventListener("input", () => {
  renderDirSwatches();
  updateNewDirPreview();
});
if (btnSaveNewDir) {
  btnSaveNewDir.addEventListener("click", () => {
    createDirectionFromForm({ select: true });
  });
}
if (btnClearNewDir) {
  btnClearNewDir.addEventListener("click", clearNewDirForm);
}

// Временно отключаем флаг, чтобы предотвратить рекурсию
let themeModeUpdating = false;

if (themeMode) {
  themeMode.addEventListener("change", () => {
    if (themeModeUpdating) return;

    try {
      themeModeUpdating = true;
      console.log("themeMode изменен на:", themeMode.value);
      state.settings.theme.mode = themeMode.value;
      applyTheme();

      // Если выбран custom режим, обновляем пресет
      if (themeMode.value === "custom") {
        renderThemePresetUI();
      }
    } finally {
      setTimeout(() => {
        themeModeUpdating = false;
      }, 0);
    }
  });
}

const systemThemeMedia =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
const handleSystemThemeChange = () => {
  if (state?.settings?.theme?.mode !== "auto") return;
  applyTheme();
};
if (systemThemeMedia) {
  if (typeof systemThemeMedia.addEventListener === "function") {
    systemThemeMedia.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemThemeMedia.addListener === "function") {
    systemThemeMedia.addListener(handleSystemThemeChange);
  }
}

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
    if (exportBackdrop.classList.contains("show")) closeExportModal();
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
  message += "\n--------------------\n";
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

  const details = $("dirDetails");
  const summary = $("dirDetailsSummary");
  const createMode = $("dirCreateMode");
  const editMode = $("dirEditMode");

  summary.textContent = `✏️ Редактирование: ${dir.name}`;
  createMode.style.display = "none";
  editMode.style.display = "block";
  details.open = true;

  const editName = $("editDirName");
  const editColor = $("editDirColor");
  editName.value = dir.name;
  editColor.value = dir.color;

  const btnSave = $("btnSaveEditDir");
  const btnCancel = $("btnCancelEditDir");

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

function syncInitialValues() {
  console.log("Syncing initial logo values...");

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

  console.log("Initial logo values synced.");
}

// Также добавьте эту вспомогательную функцию для обновления логотипа
let logoUpdateDebounceTimer;

// Вспомогательная функция для обновления списка вариантов логотипа

function resetDirDetailsMode() {
  const details = $("dirDetails");
  const summary = $("dirDetailsSummary");
  const createMode = $("dirCreateMode");
  const editMode = $("dirEditMode");

  summary.textContent = "➕ Создать новое направление";
  createMode.style.display = "block";
  editMode.style.display = "none";
  details.open = false;
}

// Добавляем CSS-стили для экспорта
function addExportStyles() {
  if (document.querySelector("#export-styles")) return;

  const style = document.createElement("style");
  style.id = "export-styles";
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

// ============ Загрузка ==============

function bootstrapCore() {
  loadState();
  state.version = 13;
  hardenState();

  // Инициализация состояния логотипа, если его нет
  if (!state.settings.logo) {
    state.settings.logo = {
      enabled: false,
      variant: 1,
      opacity: LOGO_CONSTANTS.DEFAULT_OPACITY,
      recolor: false,
      color: LOGO_CONSTANTS.DEFAULT_COLOR,
      layout: LOGO_CONSTANTS.DEFAULT_LAYOUT,
      tileSize: LOGO_CONSTANTS.DEFAULT_TILE_SIZE,
      horizontalGap: LOGO_CONSTANTS.DEFAULT_GAP,
      verticalGap: LOGO_CONSTANTS.DEFAULT_GAP,
      rotation: LOGO_CONSTANTS.DEFAULT_ROTATION,
      tileOffsetX: LOGO_CONSTANTS.DEFAULT_OFFSET,
      tileOffsetY: LOGO_CONSTANTS.DEFAULT_OFFSET,
      uploadedFileData: null,
    };
  }
  cachedMetrics = null;
  metricsTimestamp = 0;

  updateUndoRedoButtons();
  renderDirSwatches();

  if (!$("schedule")) {
    console.error("Элемент #schedule не найден!");
    toast("ERR", "Ошибка", "Не найден элемент таблицы");
    return;
  }

  // Добавляем стили для экспорта
  addExportStyles();

  // ========== НОВАЯ АРХИТЕКТУРА ЛОГОТИПА ==========

  try {
    // Инициализация менеджера логотипа
    window.logoManager = new LogoManager();
    window.logoManager.init();

    console.log("LogoManager успешно инициализирован");
  } catch (error) {
    console.error("Ошибка инициализации LogoManager:", error);
    toast("ERR", "Ошибка", "Не удалось инициализировать логотип");
  }

  applyTheme();

  // Рендерим все
  renderAll();

  toast("OK", "Готово", "Данные загружены. Автосохранение включено.");

  // Инициализация обработки ошибок
  initErrorHandling();
}

function bootstrap() {
  if (isAuthorized()) {
    authorized = true;

    const appRoot = $("appRoot");
    if (appRoot) appRoot.style.display = "";

    const gate = $("authGate");
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

// ============ Загрузка ==============

function updateLogoCSSVariables() {
  const style = document.documentElement.style;

  // Получаем реальные размеры из CSS
  const computedStyle = getComputedStyle(document.documentElement);
  let timeColWidth = computedStyle.getPropertyValue("--timeCol") || "46px";
  const scheduleEl = document.querySelector(".schedule");
  if (scheduleEl && scheduleEl.classList.contains("compact-mode")) {
    timeColWidth = "0px";
  }
  const dayHeadHeight =
    computedStyle.getPropertyValue("--dayHeadHeight") || "26px";

  // Устанавливаем CSS переменные для логотипа
  style.setProperty("--time-col-width", timeColWidth);
  style.setProperty("--day-head-height", dayHeadHeight);
}

function invalidateExportPreview() {
  clearPreviewCache();
}

function getExportDaySettings() {
  if (!state.settings.exportDay) {
    state.settings.exportDay = deepCopy(DEFAULT_STATE().settings.exportDay);
  }
  return state.settings.exportDay;
}

function setExportDayBackgroundStatus(text) {
  if (!expDayBgStatus) return;
  expDayBgStatus.textContent = text || "Файл не выбран";
}

function syncExportDayBackgroundFromSettings() {
  const exportDaySettings = getExportDaySettings();
  const savedDataUrl =
    typeof exportDaySettings.backgroundDataUrl === "string"
      ? exportDaySettings.backgroundDataUrl
      : "";
  const savedName =
    typeof exportDaySettings.backgroundName === "string"
      ? exportDaySettings.backgroundName.trim()
      : "";

  exportDayBackgroundDataUrl = savedDataUrl.startsWith("data:image/")
    ? savedDataUrl
    : "";
  if (expDayBgFile) {
    expDayBgFile.value = "";
  }
  if (exportDayBackgroundDataUrl) {
    setExportDayBackgroundStatus(
      savedName ? `Файл: ${savedName}` : "Фон из памяти",
    );
  } else {
    setExportDayBackgroundStatus("Файл не выбран");
  }
}

function resetExportDayBackground({ save = true } = {}) {
  exportDayBackgroundDataUrl = "";
  const exportDaySettings = getExportDaySettings();
  exportDaySettings.backgroundDataUrl = "";
  exportDaySettings.backgroundName = "";
  if (expDayBgFile) {
    expDayBgFile.value = "";
  }
  setExportDayBackgroundStatus("Файл не выбран");
  if (save) {
    saveState(true);
  }
}

function updateExportDayOverlayLabel() {
  if (!expDayOverlay || !expDayOverlayVal) return;
  expDayOverlayVal.textContent = `${expDayOverlay.value}%`;
}

function toFiniteNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeHexColor(value, fallback = "#ff7ccc") {
  const normalized = normalizeHex(value);
  return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : fallback;
}

function getActiveExportMode() {
  if (expDayOptions && !expDayOptions.hidden) return EXPORT_MODE_DAY;
  return exportMode === EXPORT_MODE_DAY ? EXPORT_MODE_DAY : EXPORT_MODE_WEEK;
}

function persistExportDaySettings({ save = true } = {}) {
  const exportDaySettings = getExportDaySettings();
  const dayIndex = clamp(
    Math.round(
      toFiniteNumber(expDaySelect?.value ?? exportDaySettings.dayIndex ?? 0, 0),
    ),
    0,
    DAYS.length - 1,
  );
  const overlay = clamp(
    Math.round(
      toFiniteNumber(expDayOverlay?.value ?? exportDaySettings.overlay ?? 45, 45),
    ),
    0,
    90,
  );
  const topOffset = clamp(
    Math.round(
      toFiniteNumber(
        expDayTopOffset?.value ?? exportDaySettings.topOffset ?? 190,
        190,
      ),
    ),
    0,
    900,
  );
  const titleColor = normalizeHexColor(
    expDayTitleColor?.value ?? exportDaySettings.titleColor ?? "#ff7ccc",
    "#ff7ccc",
  );

  exportDaySettings.dayIndex = dayIndex;
  exportDaySettings.overlay = overlay;
  exportDaySettings.topOffset = topOffset;
  exportDaySettings.titleColor = titleColor;
  if (expDayTopOffset) {
    expDayTopOffset.value = String(topOffset);
  }
  if (expDayTitleColor) {
    expDayTitleColor.value = titleColor;
  }
  if (save) {
    saveState(true);
  }
}

function buildExportDaySelectLabel(dayIndex) {
  const dayName = DAYS[dayIndex] || `День ${dayIndex + 1}`;
  const showDate = state.settings.schedule?.showDate !== false;
  if (!showDate) return dayName;
  const date = getScheduleDayDate(dayIndex);
  if (!date) return dayName;
  return `${dayName} (${formatDateDDMM(date)})`;
}

function populateExportDaySelect() {
  if (!expDaySelect) return;
  const selected = clamp(
    Math.round(Number(getExportDaySettings().dayIndex ?? 0)),
    0,
    DAYS.length - 1,
  );
  expDaySelect.innerHTML = "";
  DAYS.forEach((_, dayIndex) => {
    const option = document.createElement("option");
    option.value = String(dayIndex);
    option.textContent = buildExportDaySelectLabel(dayIndex);
    expDaySelect.appendChild(option);
  });
  expDaySelect.value = String(selected);
}

function getDefaultWeekExportPresetId() {
  const preferredPresetIds = [];
  if (IS_IOS_DEVICE) {
    preferredPresetIds.push("mobile_land");
  }
  preferredPresetIds.push("a4_land");

  for (const presetId of preferredPresetIds) {
    if (EXPORT_PRESETS.some((p) => p.id === presetId)) {
      return presetId;
    }
  }
  return EXPORT_PRESETS[0]?.id || "";
}

function populateExportPresetOptions(mode) {
  if (!expPreset) return;
  const isDayMode = mode === EXPORT_MODE_DAY;
  const presets = isDayMode ? [DAY_EXPORT_PRESET] : EXPORT_PRESETS;

  expPreset.innerHTML = "";
  presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.name;
    expPreset.appendChild(option);
  });

  if (isDayMode) {
    expPreset.value = DAY_EXPORT_PRESET.id;
    return;
  }

  const fallbackWeekPresetId = getDefaultWeekExportPresetId();
  const savedWeekPresetId = exportWeekPresetId || fallbackWeekPresetId;
  const resolvedWeekPresetId = EXPORT_PRESETS.some((p) => p.id === savedWeekPresetId)
    ? savedWeekPresetId
    : fallbackWeekPresetId;
  expPreset.value = resolvedWeekPresetId;
  exportWeekPresetId = resolvedWeekPresetId;
}

function syncExportModeTabs() {
  const isWeek = exportMode === EXPORT_MODE_WEEK;
  if (expTabWeek) {
    expTabWeek.classList.toggle("active", isWeek);
    expTabWeek.setAttribute("aria-selected", isWeek ? "true" : "false");
  }
  if (expTabDay) {
    expTabDay.classList.toggle("active", !isWeek);
    expTabDay.setAttribute("aria-selected", isWeek ? "false" : "true");
  }
}

function setExportMode(mode, { preservePreview = false } = {}) {
  const nextMode = mode === EXPORT_MODE_DAY ? EXPORT_MODE_DAY : EXPORT_MODE_WEEK;
  if (nextMode === EXPORT_MODE_WEEK && exportMode === EXPORT_MODE_DAY) {
    populateExportPresetOptions(EXPORT_MODE_WEEK);
  } else if (nextMode === EXPORT_MODE_DAY) {
    if (exportMode === EXPORT_MODE_WEEK && expPreset?.value) {
      exportWeekPresetId = expPreset.value;
    }
    populateExportPresetOptions(EXPORT_MODE_DAY);
  }

  exportMode = nextMode;
  syncExportModeTabs();
  syncExportModalUI();
  if (!preservePreview) {
    invalidateExportPreview();
  }
}

function openExportModal() {
  const fallbackWeekPresetId = getDefaultWeekExportPresetId();
  if (!exportWeekPresetId) {
    exportWeekPresetId = fallbackWeekPresetId;
  }
  populateExportPresetOptions(EXPORT_MODE_WEEK);
  expFormat.value = "png";
  expBg.value = "white";
  expQuality.value = "92";
  expQualityVal.textContent = "92";

  // Устанавливаем значение по умолчанию для скрытия пустых слотов
  if (expHideEmpty) {
    expHideEmpty.value = "no"; // По умолчанию НЕ скрывать
  }

  const exportDaySettings = getExportDaySettings();
  populateExportDaySelect();
  if (expDaySelect) {
    expDaySelect.value = String(
      clamp(Math.round(Number(exportDaySettings.dayIndex ?? 0)), 0, DAYS.length - 1),
    );
  }
  if (expDayOverlay) {
    expDayOverlay.value = String(
      clamp(Math.round(Number(exportDaySettings.overlay ?? 45)), 0, 90),
    );
  }
  if (expDayTopOffset) {
    expDayTopOffset.value = String(
      clamp(Math.round(Number(exportDaySettings.topOffset ?? 190)), 0, 900),
    );
  }
  if (expDayTitleColor) {
    expDayTitleColor.value = normalizeHexColor(
      exportDaySettings.titleColor ?? "#ff7ccc",
      "#ff7ccc",
    );
  }
  updateExportDayOverlayLabel();
  syncExportDayBackgroundFromSettings();

  setExportMode(EXPORT_MODE_WEEK, { preservePreview: true });
  invalidateExportPreview();
  syncExportModalUI();
  setBackdropVisible(exportBackdrop, true);
  setTimeout(() => {
    const firstControl = expPreset || expFormat || $("btnExpPreview");
    if (firstControl && typeof firstControl.focus === "function") {
      firstControl.focus({ preventScroll: true });
    }
  }, 20);
  setTimeout(() => {
    if (!exportBackdrop.classList.contains("show")) return;
    if (typeof buildExportPreview === "function") {
      buildExportPreview().catch((error) => {
        console.error("Auto export preview build failed:", error);
      });
    }
  }, 80);
}

function closeExportModal() {
  setBackdropVisible(exportBackdrop, false);
  invalidateExportPreview();
}

function syncExportModalUI() {
  const fmt = expFormat.value;
  const isJpeg = fmt === "jpeg";
  const isDayMode = exportMode === EXPORT_MODE_DAY;

  if (expWeekOptions) expWeekOptions.hidden = isDayMode;
  if (expDayOptions) expDayOptions.hidden = !isDayMode;
  if (expPresetWrap) expPresetWrap.hidden = false;
  if (expPreset) expPreset.disabled = false;
  if (expHideEmptyWrap) expHideEmptyWrap.hidden = isDayMode;
  if (expHint) expHint.hidden = isDayMode;

  if (expBgWrap) expBgWrap.style.display = isDayMode ? "none" : "";
  if (expJpegWrap) expJpegWrap.style.display = isJpeg ? "block" : "none";
  if (expRasterOptions) {
    if (isDayMode) {
      expRasterOptions.style.display = isJpeg ? "block" : "none";
    } else {
      expRasterOptions.style.display = "grid";
    }
  }

  const optTransparent = expBg.querySelector('option[value="transparent"]');
  if (!optTransparent) return;
  if (isDayMode) return;

  optTransparent.hidden = isJpeg;
  optTransparent.disabled = isJpeg;

  if (isJpeg) {
    expBg.dataset.prevBg = expBg.value;
    expBg.value = "white";
  } else {
    expBg.value = expBg.dataset.prevBg || "white";
    delete expBg.dataset.prevBg;
  }
}

// Шрифты

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

function _firstFontFamily(fontFamily) {
  const first = (fontFamily || "").split(",")[0].trim();
  return first.replace(/^["']|["']$/g, "");
}

function isGenericFamily(family) {
  const generic = [
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
  ];
  return generic.includes(family.toLowerCase());
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
      weight: parseInt(weight, 10) || 1000,
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
      const ruleWeight = rule.style.getPropertyValue("font-weight") || "1000";

      const matched = wanted.some((w) => {
        if (w.fam !== fam) return false;
        if (w.style !== style) return false;
        return matchWeight(ruleWeight, w.weight);
      });

      if (!matched) continue;

      if (embedData) {
        // Пытаемся встроить шрифт как data URI
        const fontCss = await embedFontAsDataUri(rule.cssText, baseHref);
        css += fontCss + "\n";
      } else {
        css += absolutizeCssUrls(rule.cssText, baseHref) + "\n";
      }
    }
  }

  return css;
}

function matchWeight(ruleWeight, wantedWeight) {
  const s = String(ruleWeight || "").trim();

  const parts = s
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter(Number.isFinite);
  if (!parts.length) return wantedWeight === 1000;
  if (parts.length === 1) return parts[0] === wantedWeight;
  const [a, b] = parts;
  return wantedWeight >= Math.min(a, b) && wantedWeight <= Math.max(a, b);
}

// Выгрузка изображения

function updateExportZoomLabel() {
  if (!expZoomVal) return;
  const scale = Number(exportPreviewView.scale) || 1;
  expZoomVal.textContent = `${Math.round(scale * 100)}%`;
}

function getExportPreviewFitScale(width, height) {
  if (!expPreviewFrame || !width || !height) return 1;
  const fitX = expPreviewFrame.clientWidth / width;
  const fitY = expPreviewFrame.clientHeight / height;
  const fit = Math.min(fitX, fitY);
  if (!Number.isFinite(fit) || fit <= 0) return 1;
  return fit;
}

function applyExportPreviewScale(nextScale, { anchorX = null, anchorY = null } = {}) {
  const viewEl = exportPreviewView.element;
  if (!viewEl || !expPreviewFrame) return;
  if (!exportPreviewView.width || !exportPreviewView.height) return;

  const oldScale = Number(exportPreviewView.scale) || 1;
  const minScale = Number(exportPreviewView.minScale) || 0.1;
  const maxScale = Number(exportPreviewView.maxScale) || 8;
  const clamped = Math.max(minScale, Math.min(maxScale, Number(nextScale) || oldScale));

  const oldW = exportPreviewView.width * oldScale;
  const oldH = exportPreviewView.height * oldScale;

  const focusOffsetX =
    anchorX == null ? expPreviewFrame.clientWidth / 2 : Number(anchorX);
  const focusOffsetY =
    anchorY == null ? expPreviewFrame.clientHeight / 2 : Number(anchorY);

  const focusX = expPreviewFrame.scrollLeft + focusOffsetX;
  const focusY = expPreviewFrame.scrollTop + focusOffsetY;

  const ratioX = oldW > 0 ? focusX / oldW : 0.5;
  const ratioY = oldH > 0 ? focusY / oldH : 0.5;

  exportPreviewView.scale = clamped;

  const newW = Math.max(1, Math.round(exportPreviewView.width * clamped));
  const newH = Math.max(1, Math.round(exportPreviewView.height * clamped));
  viewEl.style.width = `${newW}px`;
  viewEl.style.height = `${newH}px`;

  const nextScrollLeft = Math.max(0, newW * ratioX - focusOffsetX);
  const nextScrollTop = Math.max(0, newH * ratioY - focusOffsetY);
  expPreviewFrame.scrollLeft = nextScrollLeft;
  expPreviewFrame.scrollTop = nextScrollTop;

  updateExportZoomLabel();
}

function fitExportPreviewToFrame(width, height) {
  const viewEl = exportPreviewView.element;
  if (!viewEl) return;

  exportPreviewView.width = Math.max(1, Math.ceil(Number(width) || 1));
  exportPreviewView.height = Math.max(1, Math.ceil(Number(height) || 1));
  exportPreviewView.fitScale = getExportPreviewFitScale(
    exportPreviewView.width,
    exportPreviewView.height,
  );
  exportPreviewView.minScale = Math.max(0.05, exportPreviewView.fitScale * 0.5);
  exportPreviewView.maxScale = Math.max(2, exportPreviewView.fitScale * 12);
  applyExportPreviewScale(exportPreviewView.fitScale, { anchorX: 0, anchorY: 0 });
  if (expPreviewFrame) {
    expPreviewFrame.scrollLeft = 0;
    expPreviewFrame.scrollTop = 0;
  }
}

function getTouchDistance(a, b) {
  const dx = Number(b?.clientX || 0) - Number(a?.clientX || 0);
  const dy = Number(b?.clientY || 0) - Number(a?.clientY || 0);
  if (typeof Math.hypot === "function") {
    return Math.hypot(dx, dy);
  }
  return Math.sqrt(dx * dx + dy * dy);
}

function setupExportPreviewZoomControls() {
  if (exportPreviewZoomBound) return;
  exportPreviewZoomBound = true;

  if (btnExpZoomIn) {
    btnExpZoomIn.addEventListener("click", () => {
      const current = Number(exportPreviewView.scale) || 1;
      applyExportPreviewScale(current * 1.2);
    });
  }
  if (btnExpZoomOut) {
    btnExpZoomOut.addEventListener("click", () => {
      const current = Number(exportPreviewView.scale) || 1;
      applyExportPreviewScale(current / 1.2);
    });
  }
  if (btnExpZoomFit) {
    btnExpZoomFit.addEventListener("click", () => {
      applyExportPreviewScale(exportPreviewView.fitScale || 1, {
        anchorX: 0,
        anchorY: 0,
      });
      if (expPreviewFrame) {
        expPreviewFrame.scrollLeft = 0;
        expPreviewFrame.scrollTop = 0;
      }
    });
  }

  if (!expPreviewFrame) return;

  expPreviewFrame.addEventListener(
    "wheel",
    (e) => {
      if (!exportPreviewView.element) return;
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      const rect = expPreviewFrame.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * 0.002);
      const current = Number(exportPreviewView.scale) || 1;
      applyExportPreviewScale(current * factor, {
        anchorX: e.clientX - rect.left,
        anchorY: e.clientY - rect.top,
      });
    },
    { passive: false },
  );

  expPreviewFrame.addEventListener(
    "touchstart",
    (e) => {
      if (!exportPreviewView.element) return;
      if (e.touches.length !== 2) return;
      exportPreviewPinch.active = true;
      exportPreviewPinch.startDistance = getTouchDistance(e.touches[0], e.touches[1]);
      exportPreviewPinch.startScale = Number(exportPreviewView.scale) || 1;
      e.preventDefault();
    },
    { passive: false },
  );

  expPreviewFrame.addEventListener(
    "touchmove",
    (e) => {
      if (!exportPreviewPinch.active || e.touches.length !== 2) return;
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      if (!distance || !exportPreviewPinch.startDistance) return;

      const rect = expPreviewFrame.getBoundingClientRect();
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
      const ratio = distance / exportPreviewPinch.startDistance;
      applyExportPreviewScale(exportPreviewPinch.startScale * ratio, {
        anchorX: centerX,
        anchorY: centerY,
      });
      e.preventDefault();
    },
    { passive: false },
  );

  const stopPinch = () => {
    exportPreviewPinch.active = false;
    exportPreviewPinch.startDistance = 0;
  };
  expPreviewFrame.addEventListener("touchend", stopPinch);
  expPreviewFrame.addEventListener("touchcancel", stopPinch);

  let gestureStartScale = 1;
  expPreviewFrame.addEventListener(
    "gesturestart",
    (e) => {
      if (!exportPreviewView.element) return;
      gestureStartScale = Number(exportPreviewView.scale) || 1;
      e.preventDefault();
    },
    { passive: false },
  );
  expPreviewFrame.addEventListener(
    "gesturechange",
    (e) => {
      if (!exportPreviewView.element) return;
      const rect = expPreviewFrame.getBoundingClientRect();
      applyExportPreviewScale(gestureStartScale * Number(e.scale || 1), {
        anchorX: (e.clientX || rect.width / 2) - rect.left,
        anchorY: (e.clientY || rect.height / 2) - rect.top,
      });
      e.preventDefault();
    },
    { passive: false },
  );
  expPreviewFrame.addEventListener("gestureend", () => {
    gestureStartScale = Number(exportPreviewView.scale) || 1;
  });

  window.addEventListener("resize", () => {
    if (!exportPreviewView.element || !expPreviewFrame) return;
    const oldFit = exportPreviewView.fitScale || 1;
    const oldScale = exportPreviewView.scale || oldFit;
    const wasFitted = Math.abs(oldScale - oldFit) < 0.02;

    exportPreviewView.fitScale = getExportPreviewFitScale(
      exportPreviewView.width,
      exportPreviewView.height,
    );
    exportPreviewView.minScale = Math.max(0.05, exportPreviewView.fitScale * 0.5);
    exportPreviewView.maxScale = Math.max(2, exportPreviewView.fitScale * 12);

    if (wasFitted) {
      applyExportPreviewScale(exportPreviewView.fitScale, { anchorX: 0, anchorY: 0 });
    } else {
      applyExportPreviewScale(oldScale);
    }
  });

  updateExportZoomLabel();
}

async function embedFontAsDataUri(cssText, baseHref) {
  // Извлекаем URL шрифта из CSS
  const urlMatch = cssText.match(/url\(['"]?([^'")]+)['"]?\)/);

  if (!urlMatch) return cssText;

  const fontUrl = urlMatch[1];
  let absoluteUrl;

  try {
    absoluteUrl = new URL(fontUrl, baseHref).href;
  } catch (e) {
    console.warn("Не удалось создать абсолютный URL для шрифта:", fontUrl);
    return cssText;
  }

  try {
    // Загружаем шрифт как blob
    const response = await fetch(absoluteUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const mimeType = blob.type;

    // Конвертируем blob в data URI
    const dataUri = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    // Заменяем URL на data URI в CSS
    return cssText.replace(/url\(['"]?([^'")]+)['"]?\)/, `url("${dataUri}")`);
  } catch (error) {
    console.warn("Не удалось встроить шрифт как data URI:", error.message);
    // Возвращаем оригинальный CSS с абсолютным URL
    return cssText.replace(fontUrl, absoluteUrl);
  }
}

async function buildExportPreview() {
  const opts = getExportOptsFromUI();
  toast("INFO", "Экспорт", "Генерация предпросмотра…");

  try {
    // Генерируем SVG для предпросмотра
    const svgOpts = { ...opts, fmt: "svg" };
    const exportResult = await executeExport(svgOpts);

    if (!exportResult) {
      toast("ERR", "Экспорт", "Не удалось сгенерировать предпросмотр");
      return;
    }

    // Сохраняем для скачивания
    lastPreview = {
      dataUrl: exportResult.dataUrl,
      originalOpts: opts,
      ...svgOpts,
    };

    // Отображаем SVG предпросмотр
    displaySvgPreview(exportResult.dataUrl);

    toast("OK", "Экспорт", "Предпросмотр готов");
  } catch (error) {
    console.error("Export preview error:", error);
    toast("ERR", "Экспорт", error?.message || "Ошибка генерации предпросмотра");
  }
}

function decodeSvgDataUrl(svgDataUrl) {
  if (typeof svgDataUrl !== "string" || !svgDataUrl.startsWith("data:")) {
    throw new Error("Invalid SVG data URL");
  }

  const commaIndex = svgDataUrl.indexOf(",");
  if (commaIndex < 0) {
    throw new Error("Malformed SVG data URL");
  }

  const meta = svgDataUrl.slice(0, commaIndex);
  const payload = svgDataUrl.slice(commaIndex + 1);

  if (/;base64/i.test(meta)) {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    if (typeof TextDecoder !== "undefined") {
      return new TextDecoder("utf-8").decode(bytes);
    }
    let text = "";
    for (let i = 0; i < bytes.length; i++) {
      text += String.fromCharCode(bytes[i]);
    }
    return text;
  }

  return decodeURIComponent(payload);
}

function getSvgPreviewSize(svgText) {
  let svgWidth = 800;
  let svgHeight = 600;

  const sizeMatchW = svgText.match(/width="([\d.]+)(px)?"/i);
  const sizeMatchH = svgText.match(/height="([\d.]+)(px)?"/i);
  if (sizeMatchW && sizeMatchH) {
    svgWidth = Number(sizeMatchW[1]) || svgWidth;
    svgHeight = Number(sizeMatchH[1]) || svgHeight;
    return {
      width: Math.ceil(svgWidth),
      height: Math.ceil(svgHeight),
    };
  }

  const viewBoxMatch = svgText.match(/viewBox="([\d.\s-]+)"/i);
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1]
      .trim()
      .split(/\s+/)
      .map((part) => Number(part));
    if (parts.length === 4) {
      svgWidth = parts[2] || svgWidth;
      svgHeight = parts[3] || svgHeight;
    }
  }

  return {
    width: Math.ceil(svgWidth),
    height: Math.ceil(svgHeight),
  };
}

function displaySvgPreview(svgDataUrl) {
  const previewFrame = expPreviewFrame || document.querySelector(".export-preview-frame");
  if (!previewFrame) return;
  if (expPreviewImg) expPreviewImg.style.display = "none";

  const oldPreview = previewFrame.querySelector("#expPreviewObject");
  if (oldPreview) {
    if (oldPreview.data && currentPreviewObjectUrl) {
      URL.revokeObjectURL(currentPreviewObjectUrl);
      currentPreviewObjectUrl = null;
    }
    oldPreview.remove();
  }

  try {
    const svgText = decodeSvgDataUrl(svgDataUrl);
    const svgBlob = new Blob([svgText], {
      type: "image/svg+xml;charset=utf-8",
    });
    currentPreviewObjectUrl = URL.createObjectURL(svgBlob);

    const previewObject = document.createElement("object");
    previewObject.id = "expPreviewObject";
    previewObject.type = "image/svg+xml";
    previewObject.data = currentPreviewObjectUrl;

    const { width, height } = getSvgPreviewSize(svgText);
    previewObject.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      display: block;
    `;

    exportPreviewView.element = previewObject;
    previewFrame.appendChild(previewObject);
    fitExportPreviewToFrame(width, height);
  } catch (error) {
    console.error("Ошибка отображения предпросмотра:", error);

    if (expPreviewImg) {
      expPreviewImg.src = svgDataUrl;
      expPreviewImg.style.display = "block";
      expPreviewImg.onload = () => {
        const imgW = expPreviewImg.naturalWidth || expPreviewImg.width || 1;
        const imgH = expPreviewImg.naturalHeight || expPreviewImg.height || 1;
        exportPreviewView.element = expPreviewImg;
        fitExportPreviewToFrame(imgW, imgH);
      };
      return;
    }

    previewFrame.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
                Не удалось загрузить предпросмотр
            </div>
        `;
  }
}

function clearPreviewCache() {
  // Освобождаем object URL если он существует
  if (currentPreviewObjectUrl) {
    URL.revokeObjectURL(currentPreviewObjectUrl);
    currentPreviewObjectUrl = null;
  }

  // Очищаем предпросмотр из DOM
  const previewFrame = document.querySelector(".export-preview-frame");
  if (previewFrame) {
    const oldPreview = previewFrame.querySelector("#expPreviewObject");
    if (oldPreview) {
      if (oldPreview.data && oldPreview.data.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(oldPreview.data);
        } catch (e) {
          // Игнорируем ошибки при освобождении
        }
      }
      oldPreview.remove();
    }
  }

  if (expPreviewImg) {
    expPreviewImg.removeAttribute("src");
    expPreviewImg.style.display = "";
  }

  exportPreviewView = {
    element: null,
    width: 0,
    height: 0,
    fitScale: 1,
    scale: 1,
    minScale: 0.1,
    maxScale: 8,
  };
  updateExportZoomLabel();

  // Очищаем данные предпросмотра
  lastPreview = null;

  console.log("Кэш предпросмотра очищен");
}

function setupExportModalEventListeners() {
  const exportModal = document.querySelector("#exportBackdrop .modal");
  if (!exportModal) return;
  if (exportModal.getAttribute("data-cleanup-bound") === "1") return;
  exportModal.setAttribute("data-cleanup-bound", "1");

  const handleModalClose = () => {
    clearPreviewCache();
  };

  const closeButtons = exportModal.querySelectorAll(
    '#btnCloseExport, #btnExpCancel, [data-dismiss="modal"], .modal-close, .btn-close',
  );
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", handleModalClose);
  });

  if (typeof window.jQuery === "function") {
    const jqModal = window.jQuery(exportModal);
    if (jqModal && typeof jqModal.on === "function") {
      jqModal.on("hidden.bs.modal", handleModalClose);
    }
  }
}

function escapeSvgText(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeSvgFontFamily(fontFamily) {
  const fallback = "sans-serif";
  const value = String(fontFamily || "").trim();
  if (!value) return fallback;
  return value.replace(/"/g, "'");
}

function truncateDayExportText(text, maxChars) {
  const value = String(text || "").trim();
  if (!value) return "";
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(1, maxChars - 1)).trim()}…`;
}

function buildDayExportRows(dayIndex) {
  const events = state.events
    .filter((ev) => Number(ev.dayIndex) === dayIndex)
    .sort((a, b) => {
      const startDiff = Number(a.startMin) - Number(b.startMin);
      if (startDiff !== 0) return startDiff;
      return String(a.name || "").localeCompare(String(b.name || ""), "ru");
    });

  const rows = [];
  let prevStart = null;
  for (const ev of events) {
    const startMin = Number(ev.startMin);
    if (!Number.isFinite(startMin)) continue;
    const title = truncateDayExportText(fixTypography(ev.name) || "Без названия", 34);
    const coach = truncateDayExportText(fixTypography(ev.coach || ev.room || ""), 30);
    rows.push({
      time: startMin === prevStart ? "" : minToHHMM(startMin),
      title,
      coach,
    });
    prevStart = startMin;
  }
  return rows;
}

function encodeSvgToDataUrl(svgText) {
  const base64 = btoa(unescape(encodeURIComponent(svgText)));
  return `data:image/svg+xml;base64,${base64}`;
}

async function prepareDayBackgroundForExport(rawDataUrl) {
  if (!rawDataUrl || typeof rawDataUrl !== "string") return "";
  const targetW = DAY_EXPORT_PRESET.w;
  const targetH = DAY_EXPORT_PRESET.h;

  try {
    const img = await loadImageFromDataUrl(rawDataUrl);
    const srcW = img.naturalWidth || img.width;
    const srcH = img.naturalHeight || img.height;
    if (!srcW || !srcH) return rawDataUrl;

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = getCanvas2dContext(canvas, { alpha: false });
    if (!ctx) return rawDataUrl;

    const scale = Math.max(targetW / srcW, targetH / srcH);
    const drawW = srcW * scale;
    const drawH = srcH * scale;
    const dx = (targetW - drawW) / 2;
    const dy = (targetH - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) {
      ctx.imageSmoothingQuality = "high";
    }
    ctx.fillStyle = "#10141d";
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(img, dx, dy, drawW, drawH);

    return canvas.toDataURL("image/jpeg", 0.92);
  } catch (error) {
    console.warn("Day export background preprocess failed:", error);
    return rawDataUrl;
  }
}

function applySvgTextTransform(text, transformMode) {
  const textValue = String(text || "");
  const mode = String(transformMode || "none").toLowerCase();
  if (mode === "uppercase") return textValue.toLocaleUpperCase("ru-RU");
  if (mode === "lowercase") return textValue.toLocaleLowerCase("ru-RU");
  if (mode === "capitalize") {
    return textValue.replace(
      /(^|[\s-])[^\s-]/g,
      (match) => match.toLocaleUpperCase("ru-RU"),
    );
  }
  return textValue;
}

function buildDayExportSvg(opts) {
  const width = DAY_EXPORT_PRESET.w;
  const height = DAY_EXPORT_PRESET.h;
  const dayIndex = clamp(
    Math.round(toFiniteNumber(opts.dayIndex ?? 0, 0)),
    0,
    DAYS.length - 1,
  );
  const overlayOpacity = clamp(toFiniteNumber(opts.dayOverlay ?? 0.45, 0.45), 0, 0.9);
  const bgDataUrl =
    typeof opts.dayBackgroundDataUrl === "string" ? opts.dayBackgroundDataUrl : "";

  const dayDate = getScheduleDayDate(dayIndex) || new Date();
  const dayName = (DAYS[dayIndex] || "").toLocaleLowerCase("ru-RU");
  const dateLabel = formatDayMonthRu(dayDate);
  const rows = buildDayExportRows(dayIndex);

  const rootStyle = getComputedStyle(document.documentElement);
  const titleFont = normalizeSvgFontFamily(
    rootStyle.getPropertyValue("--evTitleFont") ||
      rootStyle.getPropertyValue("--tableFont") ||
      "sans-serif",
  );
  const metaFont = normalizeSvgFontFamily(
    rootStyle.getPropertyValue("--evMetaFont") ||
      rootStyle.getPropertyValue("--tableFont") ||
      "sans-serif",
  );
  const accentColor = normalizeHexColor(
    opts.dayTitleColor || rootStyle.getPropertyValue("--accent") || "#ff7ccc",
    "#ff7ccc",
  );
  const textColor = "#ffffff";

  const fontSettings = state.settings.font || {};
  const headerTitleSize = 112;
  const headerDateSize = 78;
  const headerDaySize = 30;
  const headerTitleWeight = clamp(
    Math.round(Number(fontSettings.weightTitle || 900)),
    100,
    900,
  );
  const headerMetaWeight = clamp(
    Math.round(Number(fontSettings.weightMeta || 600)),
    100,
    900,
  );
  const titleTextTransform = String(fontSettings.textTransform || "none");
  const titleLetterSpacing = Number(fontSettings.letterSpacing || 0);
  const titleLetterSpacingPx = Number.isFinite(titleLetterSpacing)
    ? Math.round(headerTitleSize * titleLetterSpacing * 100) / 100
    : 1;

  const headTitleY = clamp(
    Math.round(toFiniteNumber(opts.dayTopOffset ?? 190, 190)),
    0,
    900,
  );
  const headDateY = headTitleY + 130;
  const headDayY = headTitleY + 200;
  const listStartY = Math.max(610, headDayY + 220);
  const listBottomPadding = 120;
  const availableHeight = Math.max(120, height - listStartY - listBottomPadding);
  const rowHeight = rows.length
    ? clamp(Math.floor(availableHeight / rows.length), 54, 112)
    : 72;

  const timeFontSize = clamp(Math.round(rowHeight * 0.34), 18, 34);
  const rowTitleSize = clamp(Math.round(rowHeight * 0.35), 19, 36);
  const rowMetaSize = clamp(Math.round(rowHeight * 0.3), 16, 30);
  const metaOffset = Math.round(rowHeight * 0.5);

  const dividerX = 288;
  const timeX = 192;
  const textX = 358;

  const rowSvg = [];
  rows.forEach((row, index) => {
    const y = listStartY + index * rowHeight;
    if (row.time) {
      rowSvg.push(
        `<text x="${timeX}" y="${y}" class="day-time">${escapeSvgText(row.time)}</text>`,
      );
    }
    rowSvg.push(
      `<text x="${textX}" y="${y}" class="day-row-title">${escapeSvgText(row.title)}</text>`,
    );
    if (row.coach) {
      rowSvg.push(
        `<text x="${textX}" y="${y + metaOffset}" class="day-row-meta">${escapeSvgText(row.coach)}</text>`,
      );
    }
  });

  const dividerTop = listStartY - 20;
  const dividerBottom = rows.length
    ? Math.min(height - 90, listStartY + rows.length * rowHeight - 8)
    : listStartY + 120;

  const emptyStateSvg = rows.length
    ? ""
    : `<text x="${width / 2}" y="${listStartY + 40}" class="day-empty">Нет занятий на выбранный день</text>`;
  const imageLayer = bgDataUrl
    ? `<image href="${escapeSvgText(bgDataUrl)}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" />`
    : "";
  const headingTitleText = applySvgTextTransform("РАСПИСАНИЕ", titleTextTransform);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style><![CDATA[
      .day-head-title { font-family: ${titleFont}; font-size: ${headerTitleSize}px; font-weight: ${headerTitleWeight}; letter-spacing: ${titleLetterSpacingPx}px; text-anchor: middle; fill: ${accentColor}; }
      .day-head-date { font-family: ${titleFont}; font-size: ${headerDateSize}px; font-weight: ${headerTitleWeight}; text-anchor: middle; fill: ${accentColor}; }
      .day-head-weekday { font-family: ${metaFont}; font-size: ${headerDaySize}px; font-weight: ${headerMetaWeight}; text-anchor: middle; fill: ${accentColor}; }
      .day-time { font-family: ${titleFont}; font-size: ${timeFontSize}px; font-weight: 700; text-anchor: end; dominant-baseline: hanging; fill: ${textColor}; }
      .day-row-title { font-family: ${titleFont}; font-size: ${rowTitleSize}px; font-weight: 700; dominant-baseline: hanging; fill: ${textColor}; }
      .day-row-meta { font-family: ${metaFont}; font-size: ${rowMetaSize}px; font-weight: 500; dominant-baseline: hanging; fill: ${textColor}; }
      .day-empty { font-family: ${metaFont}; font-size: ${rowMetaSize + 6}px; font-weight: 600; text-anchor: middle; fill: ${textColor}; }
    ]]></style>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" fill="#151b25" />
  ${imageLayer}
  <rect x="0" y="0" width="${width}" height="${height}" fill="#000000" opacity="${overlayOpacity.toFixed(2)}" />
  <text x="${width / 2}" y="${headTitleY}" class="day-head-title">${escapeSvgText(headingTitleText)}</text>
  <text x="${width / 2}" y="${headDateY}" class="day-head-date">${escapeSvgText(dateLabel)}</text>
  <text x="${width / 2}" y="${headDayY}" class="day-head-weekday">(${escapeSvgText(dayName)})</text>
  <line x1="${dividerX}" y1="${dividerTop}" x2="${dividerX}" y2="${dividerBottom}" stroke="${textColor}" stroke-width="3" opacity="0.85" />
  ${rowSvg.join("\n  ")}
  ${emptyStateSvg}
</svg>`;
}

async function exportDayToSvg(opts) {
  const svgText = buildDayExportSvg(opts);
  return {
    dataUrl: encodeSvgToDataUrl(svgText),
  };
}

async function executeExport(opts) {
  if (opts.mode === EXPORT_MODE_DAY) {
    return await exportDayToSvg(opts);
  }
  return await exportToSvg(opts);
}

async function prepareDomForExport({
  compact = false,
  format = "canvas",
  hideEmpty = false, // Новый параметр
} = {}) {
  // Принудительно обновляем метрики
  const metrics = getExportMetrics(true);
  const { clone, cleanup } = makeExportClone({ compact });

  if (!clone) {
    throw new Error("Не удалось создать клон расписания");
  }

  // 1. Удаляем интерактивные элементы
  removeInteractiveElements(clone);

  // 2. Применяем базовые стили к событиям
  applyCssVariablesToEvents(clone);

  // 2.1. Применяем стили для заголовков/времени (чтобы корректно попадали в SVG)
  applyHeaderStylesForExport(clone);
  applyCellSpacingForExport(clone);

  // 2.2. Синхронизируем скрытие пустых строк как в основном расписании
  updateEmptyTimeRowsVisibility(clone, {
    respectFilters: false,
    keepNowRow: true,
  });

  // 3. Скрываем пустые строки (только если параметр включен)
  const hiddenRows = hideEmpty
    ? hideEmptyTimeRows(clone, {
        respectFilters: false,
        keepNowRow: false,
      })
    : [];

  // 4. Фиксируем шапку
  const headEls = Array.from(clone.querySelectorAll(".cell.head"));
  headEls.forEach((el) => {
    el.style.position = "static";
    el.style.top = "auto";
    el.style.zIndex = "auto";
  });

  // 5. Создаем элементы логотипа
  const lg = state.settings.logo;
  const scheduleWrap =
    clone?.classList?.contains("schedule-wrap")
      ? clone
      : clone.querySelector(".schedule-wrap");

  let logoLayer = null;
  let logoMark = null;

  if (scheduleWrap) {
    const layers = Array.from(scheduleWrap.querySelectorAll("#logoLayer"));
    logoLayer = layers[0] || null;
    if (layers.length > 1) {
      layers.slice(1).forEach((dup) => dup.remove());
    }

    const allMarks = Array.from(scheduleWrap.querySelectorAll("#logoMark"));
    logoMark =
      (logoLayer && logoLayer.querySelector("#logoMark")) ||
      allMarks[0] ||
      null;

    if (logoLayer && logoMark && logoMark.parentElement !== logoLayer) {
      logoLayer.appendChild(logoMark);
    }

    allMarks.forEach((m) => {
      if (m !== logoMark) m.remove();
    });
  }

  if (lg.enabled) {
    if (!logoLayer && scheduleWrap) {
      logoLayer = document.createElement("div");
      logoLayer.id = "logoLayer";
      scheduleWrap.prepend(logoLayer);
    }
    if (!logoMark && logoLayer) {
      logoMark = document.createElement("div");
      logoMark.id = "logoMark";
      logoLayer.appendChild(logoMark);
    }
  } else {
    if (logoLayer) logoLayer.style.display = "none";
    if (logoMark) logoMark.style.display = "none";
  }

  // 6. Даем браузеру пересчитать layout
  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => setTimeout(r, 50));

  // 7. Измеряем размеры
  const scheduleEl = clone.querySelector(".schedule");
  let width, height;

  if (scheduleEl) {
    const rect = scheduleEl.getBoundingClientRect();
    const fullWidth = scheduleEl.scrollWidth || rect.width || 800;
    const fullHeight = scheduleEl.scrollHeight || rect.height || 600;
    width = Math.max(100, Math.ceil(fullWidth));
    height = Math.max(100, Math.ceil(fullHeight));

    // Устанавливаем размеры НА КОНТЕЙНЕР
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.overflow = "visible";

    // Расписание растягивается на контейнер
    scheduleEl.style.width = `${width}px`;
    scheduleEl.style.height = `${height}px`;
    scheduleEl.style.position = "relative";
  } else {
    width = Math.max(100, Math.ceil(metrics.scheduleWidth || 800));
    height = Math.max(100, Math.ceil(metrics.scheduleHeight || 600));
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
  }

  // 8. ПРИМЕНЯЕМ ПОЛНЫЕ СТИЛИ ДЛЯ ЭКСПОРТА (после измерений!)
  applyCssVariablesToEventsForExport(clone);
  applyHeaderStylesForExport(clone);
  applyCellSpacingForExport(clone);

  if (hideEmpty) {
    // Дополнительно, по DOM: если строка пустая визуально — скрываем
    hideEmptyTimeRowsByDom(clone, { keepNowRow: false });
  }

  if (hideEmpty && scheduleEl) {
    clone.style.height = "auto";
    clone.style.minHeight = "0";
    scheduleEl.style.height = "auto";

    await new Promise((r) => requestAnimationFrame(r));

    const reRect = scheduleEl.getBoundingClientRect();
    const reWidth = scheduleEl.scrollWidth || reRect.width || width;
    const reHeight = scheduleEl.scrollHeight || reRect.height || height;
    width = Math.max(100, Math.ceil(reWidth));
    height = Math.max(100, Math.ceil(reHeight));

    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    scheduleEl.style.width = `${width}px`;
    scheduleEl.style.height = `${height}px`;
  }

  
  // 9. Дополнительная фиксация для двойных ячеек
  clone.querySelectorAll('.cell[data-double="1"]').forEach((cell) => {
    const slot = cell.querySelector(".slot");
    if (slot) {
      slot.style.minHeight = "auto";
      slot.style.height = "100%";
      slot.style.alignItems = "stretch";
    }
  });

  return {
    clone,
    cleanup,
    metrics,
    hiddenRows,
    width,
    height,
  };
}

async function exportToSvg(opts) {
  if (
    typeof htmlToImage === "undefined" ||
    typeof htmlToImage.toSvg !== "function"
  ) {
    toast("WARN", "SVG", "html-to-image не найден (проверь подключение).");
    return null;
  }

  // 1. Принудительно обновляем рендер перед экспортом
  await new Promise((resolve) => {
    renderAll();
    setTimeout(resolve, 100);
  });

  // 2. Получаем подготовленный DOM с учетом параметра скрытия пустых слотов
  const prepared = await prepareDomForExport({
    compact: opts.compact,
    format: "svg",
    hideEmpty: opts.hideEmpty, // ← ПЕРЕДАЕМ ПАРАМЕТР
  });

  if (!prepared) {
    toast("ERR", "SVG", "Не удалось подготовить DOM для экспорта");
    return null;
  }

  const { clone, cleanup, width, height, metrics } = prepared;
  let exportWidth = width;
  let exportHeight = height;

  try {
    // 3. Проверяем, что расписание видно
    const scheduleEl = clone.querySelector(".schedule");
    if (!scheduleEl) {
      console.error("Расписание не найдено в клоне для SVG экспорта");
      toast("ERR", "SVG", "Расписание не найдено");
      throw new Error("Расписание не найдено");
    }

    // 4. Применяем стили к событиям в клоне
    applyCssVariablesToEventsForExport(clone);

    // 5. Собираем используемые шрифты
    const usedFonts = collectUsedFontVariantsFromDom(clone);
    console.log("Собраны шрифты для экспорта:", usedFonts);

    // 6. Загружаем шрифты (это важно!)
    await ensureFontsLoaded(3000, usedFonts);

    // 7. Ждем перерисовки
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r)),
    );

    const exportSchedule = clone.querySelector(".schedule");
    if (exportSchedule) {
      const rect = exportSchedule.getBoundingClientRect();
      const fullWidth = exportSchedule.scrollWidth || rect.width || exportWidth;
      const fullHeight =
        exportSchedule.scrollHeight || rect.height || exportHeight;
      exportWidth = Math.max(100, Math.ceil(fullWidth));
      exportHeight = Math.max(100, Math.ceil(fullHeight));
      clone.style.width = `${exportWidth}px`;
      clone.style.height = `${exportHeight}px`;
      exportSchedule.style.width = `${exportWidth}px`;
      exportSchedule.style.height = `${exportHeight}px`;
    }

    const lg = state.settings.logo;
    if (lg?.enabled) {
      await applyLogoToExport(clone, lg, metrics, "svg");
      await new Promise((r) => requestAnimationFrame(r));
    }

    // 8. Собираем CSS для встраивания шрифтов (с data URI если возможно)
    const fontEmbedCSS = await buildFontFaceCssForVariants(usedFonts, {
      embedData: true, // Пытаемся встроить шрифты как data URI
    });

    console.log(
      "CSS для встраивания шрифтов:",
      fontEmbedCSS.substring(0, 200) + "...",
    );

    // 9. Получаем цвет фона из темы
    const bgColor = getThemeBgCssColor() || "#ffffff";

    console.log(`SVG экспорт: размеры ${exportWidth}x${exportHeight}, фон ${bgColor}`);

    // 10. Генерируем SVG
    const dataUrl = await htmlToImage.toSvg(clone, {
      backgroundColor: bgColor,
      width: exportWidth,
      height: exportHeight,
      pixelRatio: 1,
      cacheBust: true,
      quality: 1.0,
      fontEmbedCSS: fontEmbedCSS,
      style: {
        visibility: "visible",
        opacity: "1",
      },
    });

    return { dataUrl };
  } catch (e) {
    console.error("SVG export error:", e);
    toast("ERR", "SVG", e?.message || "Ошибка генерации SVG");
    throw new Error(e?.message || "Ошибка генерации SVG");
  } finally {
    cleanup();
  }
}

function getExportOptsFromUI() {
  const fmt = expFormat.value;
  const mode = getActiveExportMode();
  const imageFormat = fmt === "jpeg" ? "image/jpeg" : "image/png";
  const quality =
    fmt === "jpeg"
      ? Math.min(1, Math.max(0.6, Number(expQuality.value || 92) / 100))
      : 1.0;

  if (mode === EXPORT_MODE_DAY) {
    const exportDaySettings = getExportDaySettings();
    const dayIndex = clamp(
      Math.round(
        toFiniteNumber(expDaySelect?.value ?? exportDaySettings.dayIndex ?? 0, 0),
      ),
      0,
      DAYS.length - 1,
    );
    const overlayPercent = clamp(
      Math.round(
        toFiniteNumber(expDayOverlay?.value ?? exportDaySettings.overlay ?? 45, 45),
      ),
      0,
      90,
    );
    const topOffset = clamp(
      Math.round(
        toFiniteNumber(
          expDayTopOffset?.value ?? exportDaySettings.topOffset ?? 190,
          190,
        ),
      ),
      0,
      900,
    );
    const dayTitleColor = normalizeHexColor(
      expDayTitleColor?.value ?? exportDaySettings.titleColor ?? "#ff7ccc",
      "#ff7ccc",
    );

    return {
      mode,
      preset: DAY_EXPORT_PRESET,
      fmt,
      imageFormat,
      quality,
      background: null,
      compact: false,
      hideEmpty: false,
      dayIndex,
      dayOverlay: overlayPercent / 100,
      dayTopOffset: topOffset,
      dayTitleColor,
      dayBackgroundDataUrl:
        exportDayBackgroundDataUrl ||
        (typeof exportDaySettings.backgroundDataUrl === "string"
          ? exportDaySettings.backgroundDataUrl
          : ""),
    };
  }

  const preset = getExportPresetById(expPreset.value);
  const background = fmt === "svg" ? null : resolveExportBackground(expBg.value);
  const compact = state.settings.display.cellView === "compact";

  const hideEmpty = expHideEmpty.value === "yes";

  return {
    mode,
    preset,
    fmt,
    imageFormat,
    quality,
    background,
    compact,
    hideEmpty,
  };
}

function makeExportClone({ compact = false } = {}) {
  const node = document.querySelector(".schedule-wrap");
  if (!node) return { clone: null, cleanup: () => {} };

  // Обёртка вне экрана
  const wrap = document.createElement("div");
  wrap.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    width: max-content;
    height: max-content;
    overflow: visible;
    pointer-events: none;
    z-index: -1;
    opacity: 1;
    visibility: visible;
  `;
  wrap.setAttribute("aria-hidden", "true");
  wrap.setAttribute("data-export-clone", "true");

  // Клонируем с глубоким копированием
  const clone = node.cloneNode(true);
  clone.classList.add("export-mode");
  if (compact) clone.classList.add("compact-export");

  // Сбрасываем ТОЛЬКО позиционирование, НЕ сетку!
  // Удаляем !important, чтобы не переопределять важные стили ниже
  clone.style.position = "relative";
  clone.style.left = "auto";
  clone.style.top = "auto";
  clone.style.right = "auto";
  clone.style.bottom = "auto";
  clone.style.transform = "none";
  clone.style.margin = "0";
  clone.style.display = "block"; // Важно для .schedule-wrap

  // 🔑 КРИТИЧЕСКИ ВАЖНО: сохранить структуру сетки .schedule
  const scheduleEl = clone.querySelector(".schedule");
  if (scheduleEl) {
    const origSchedule = document.querySelector(".schedule");
    if (origSchedule) {
      const cs = getComputedStyle(origSchedule);
      scheduleEl.style.display = "grid";
      scheduleEl.style.gridTemplateColumns = cs.gridTemplateColumns; // ← КОПИРУЕМ СЕТКУ!
      scheduleEl.style.width = "max-content";
      scheduleEl.style.minWidth = "100%";
    }

    // Принудительно показываем все элементы
    // ВАЖНО: Установка visibility/opacity после сброса display из clone.style
    scheduleEl.querySelectorAll(".cell, .slot, .slot-inner, .event").forEach((el) => {
      el.style.removeProperty("display");
      el.style.visibility = "visible";
      el.classList.remove("dim");
      el.style.opacity = "1";
    });
  }

  wrap.appendChild(clone);
  document.body.appendChild(wrap);

  return {
    clone,
    cleanup: () => {
      if (wrap.parentNode) wrap.remove();
    },
  };
}



function getExportMetrics(force = false) {
  const now = Date.now();
  if (!force && cachedMetrics && now - metricsTimestamp < METRICS_CACHE_TIME) {
    return cachedMetrics;
  }

  const scheduleWrap = document.querySelector(".schedule-wrap");
  if (!scheduleWrap) {
    cachedMetrics = {
      scheduleWidth: 800,
      scheduleHeight: 600,
      contentWidth: 700,
      contentHeight: 550,
      timeColWidth: 46,
      dayHeadHeight: 42,
    };
    metricsTimestamp = now;
    return cachedMetrics;
  }

  // Принудительно показываем все для измерений
  scheduleWrap.style.display = "";
  scheduleWrap.style.visibility = "visible";

  const schedule = scheduleWrap.querySelector(".schedule");
  if (!schedule) {
    cachedMetrics = {
      scheduleWidth: scheduleWrap.offsetWidth,
      scheduleHeight: scheduleWrap.offsetHeight,
      contentWidth: scheduleWrap.offsetWidth - 46,
      contentHeight: scheduleWrap.offsetHeight - 42,
      timeColWidth: 46,
      dayHeadHeight: 42,
    };
    metricsTimestamp = now;
    return cachedMetrics;
  }

  const rect = schedule.getBoundingClientRect();
  const timeCell = schedule.querySelector(".cell.time");
  const headCell = schedule.querySelector(".cell.head");

  cachedMetrics = {
    scheduleWidth: Math.max(100, rect.width || schedule.offsetWidth || 800),
    scheduleHeight: Math.max(100, rect.height || schedule.offsetHeight || 600),
    contentWidth: Math.max(
      100,
      (rect.width || 800) - (timeCell?.offsetWidth || 46),
    ),
    contentHeight: Math.max(
      100,
      (rect.height || 600) - (headCell?.offsetHeight || 42),
    ),
    timeColWidth: timeCell?.offsetWidth || 46,
    dayHeadHeight: headCell?.offsetHeight || 42,
  };

  metricsTimestamp = now;
  return cachedMetrics;
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
      el.style.pointerEvents = "none";
    });
  });
}

function hideEmptyTimeRows(rootEl, options = {}) {
  const { respectFilters = true, keepNowRow = true } = options;
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

    if (keepNowRow && timeCell && timeCell.classList.contains("now")) continue;

    for (let i = 0; i < COLS; i++) {
      const cell = allCells[rowStartIndex + i];
      if (cell) hideCell(cell);
    }
  }

  return changed;
}

function hideEmptyTimeRowsByDom(rootEl, options = {}) {
  const { keepNowRow = true } = options;
  const scheduleEl =
    rootEl?.classList?.contains("schedule")
      ? rootEl
      : rootEl?.querySelector
        ? rootEl.querySelector(".schedule")
        : null;
  if (!scheduleEl) return [];
  if (scheduleEl.classList.contains("compact-mode")) return [];

  const slots = buildSlots();
  if (!slots.length) return [];

  const allCells = Array.from(scheduleEl.children);
  if (!allCells.length) return [];

  const COLS = scheduleEl.querySelectorAll(".cell.head").length || 8;
  const headerCount = COLS;
  const rowCount = Math.min(
    slots.length,
    Math.floor((allCells.length - headerCount) / COLS),
  );

  const changed = [];
  const hideCell = (el) => {
    const prevDisplay = el.style.display;
    if (prevDisplay === "none") return;
    changed.push({ el, prevDisplay });
    el.style.display = "none";
  };

  for (let slotIndex = 0; slotIndex < rowCount; slotIndex++) {
    const rowStartIndex = headerCount + slotIndex * COLS;
    const timeCell = allCells[rowStartIndex];

    if (keepNowRow && timeCell && timeCell.classList.contains("now")) continue;

    let hasEvent = false;
    for (let i = 0; i < COLS; i++) {
      const cell = allCells[rowStartIndex + i];
      if (!cell) continue;
      if (cell.querySelector?.(".event[data-eid]")) {
        hasEvent = true;
        break;
      }
    }

    if (!hasEvent) {
      for (let i = 0; i < COLS; i++) {
        const cell = allCells[rowStartIndex + i];
        if (cell) hideCell(cell);
      }
    }
  }

  return changed;
}

function updateEmptyTimeRowsVisibility(rootEl, options = {}) {
  const { respectFilters = false, keepNowRow = true } = options;
  const scheduleEl =
    rootEl?.classList?.contains("schedule")
      ? rootEl
      : rootEl?.querySelector
        ? rootEl.querySelector(".schedule")
        : null;
  if (!scheduleEl) return;
  if (scheduleEl.classList.contains("compact-mode")) return;

  const { step } = getBounds();
  const slots = buildSlots();
  if (!slots.length || !step) return;

  const allCells = Array.from(scheduleEl.children);
  if (!allCells.length) return;

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
    ) {
      continue;
    }

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

  for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
    const rowStartIndex = headerCount + slotIndex * COLS;
    const timeCell = allCells[rowStartIndex];
    const shouldShow =
      (keepNowRow && timeCell && timeCell.classList.contains("now")) ||
      has[slotIndex];

    for (let i = 0; i < COLS; i++) {
      const cell = allCells[rowStartIndex + i];
      if (!cell) continue;
      cell.style.display = shouldShow ? "" : "none";
    }
  }
}

function setupDownloadButtons() {
  // Находим кнопку скачивания в модальном окне
  const downloadBtn = document.querySelector("#btnExpDownload");
  if (downloadBtn) {
    // Удаляем старый обработчик если есть
    downloadBtn.removeEventListener("click", downloadFromExportModal);
    // Добавляем новый обработчик
    downloadBtn.addEventListener("click", downloadFromExportModal);
  }

  // Также можно добавить кнопку "Скачать без предпросмотра" если нужно
  const quickDownloadBtn = document.querySelector("#btnQuickDownload");
  if (quickDownloadBtn) {
    quickDownloadBtn.addEventListener("click", async function () {
      // Сразу начинаем скачивание, предпросмотр будет создан автоматически если нужно
      await downloadFromExportModal();
    });
  }
}

function initExportModule() {
  console.log("Инициализация модуля экспорта...");

  // Устанавливаем обработчики для модального окна
  setupExportModalEventListeners();
  setupExportPreviewZoomControls();

  // Настраиваем кнопки скачивания
  setupDownloadButtons();

  // Очищаем кэш при обновлении страницы
  window.addEventListener("beforeunload", clearPreviewCache);

  // Очищаем кэш при переходе на другую страницу (если это SPA)
  if (window.history && window.history.pushState) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      clearPreviewCache();
      return originalPushState.apply(this, arguments);
    };
  }

  console.log("Модуль экспорта инициализирован");
}

async function applyLogoToExport(element, lg, metrics, format = "canvas") {
  let logoLayer = element.querySelector("#logoLayer");
  let logoMark = element.querySelector("#logoMark");

  if (!logoLayer || !logoMark) {
    console.warn("Элементы логотипа не найдены в DOM для экспорта.");
    return;
  }

  // Устанавливаем ВСЕ стили напрямую, чтобы html2canvas/html-to-image их увидел
  // ЛОГОТИП ПОД расписанием (ключевое!)
  logoLayer.style.position = "absolute";
  logoLayer.style.top = "0";
  logoLayer.style.left = "0";
  logoLayer.style.width = "100%";
  logoLayer.style.height = "100%";
  logoLayer.style.pointerEvents = "none";
  logoLayer.style.zIndex = "1"; // под расписанием, как в живом рендере
  logoLayer.style.overflow = "hidden";
  logoLayer.style.display = "block";

  // В экспорте не используем фоновые изображения (в живом рендере их нет)
  logoLayer.style.backgroundColor = "transparent";
  logoLayer.style.backgroundImage = "none";

  logoMark.style.position = "absolute";
  logoMark.style.pointerEvents = "none";
  logoMark.style.zIndex = "1"; // под расписанием
  logoMark.style.opacity = (lg.opacity || 12) / 100;
  logoMark.style.display = "block";

  // Расписание НАД логотипом
  const scheduleEl = element.querySelector(".schedule");
  if (scheduleEl) {
    scheduleEl.style.position = "relative";
    scheduleEl.style.zIndex = "2"; // Над логотипом
  }

  // Применяем содержимое логотипа (центральный, тайловый и т.д.)
  try {
    const localMetrics = new LogoMetrics().calculate(element);
    const exportMetrics = localMetrics || metrics;
    const variant = getLogoVariant();
    const layout = lg.layout || "center";
    const opacity = (lg.opacity || 12) / 100;

    if (layout === "center") {
      await applyCenteredLogo(logoMark, lg, exportMetrics, variant, opacity);
    } else if (layout === "tile" || layout === "diagonal") {
      await applyTiledLogo(logoMark, lg, exportMetrics, variant, opacity, layout);
    }
  } catch (error) {
    console.error("Ошибка применения логотипа:", error);
    logoLayer.style.display = "none";
    logoMark.style.display = "none";
  }
}

function calculateCenteredLogoSizePx(tileSizePercent, metrics) {
  const safePercent = clamp(Number(tileSizePercent), 0, 1000);
  if (!metrics || !metrics.contentWidth || !metrics.contentHeight) {
    const fallback = Math.round((safePercent / 100) * 300);
    return Math.max(LOGO_CONSTANTS.MIN_TILE_SIZE, fallback);
  }
  const minContent = Math.min(metrics.contentWidth, metrics.contentHeight);
  const pixelSize = Math.round((safePercent / 100) * minContent);
  return Math.max(LOGO_CONSTANTS.MIN_TILE_SIZE, pixelSize);
}

async function applyCenteredLogo(logoMark, lg, metrics, variant, opacity) {
  const tileSize = calculateCenteredLogoSizePx(
    Number(lg.tileSize || LOGO_CONSTANTS.DEFAULT_TILE_SIZE),
    metrics,
  );
  const halfSize = tileSize / 2;

  const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
  const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;

  const leftBoundary = metrics.timeColWidth;
  const rightBoundary = metrics.timeColWidth + metrics.contentWidth;
  const topBoundary = metrics.dayHeadHeight;
  const bottomBoundary = metrics.dayHeadHeight + metrics.contentHeight;

  let left = centerX - halfSize;
  let top = centerY - halfSize;

  if (left < leftBoundary) left = leftBoundary;
  if (left + tileSize > rightBoundary) left = rightBoundary - tileSize;
  if (top < topBoundary) top = topBoundary;
  if (top + tileSize > bottomBoundary) top = bottomBoundary - tileSize;

  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${opacity};
    width: ${tileSize}px;
    height: ${tileSize}px;
    left: ${left}px;
    top: ${top}px;
    transform: rotate(${lg.rotation || 0}deg);
  `;

  const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null);
  applyLogoStyle(
    logoMark,
    src,
    lg.recolor && variant === 3 ? lg.color : null,
    opacity,
    false,
  );
}

async function applyTiledLogo(logoMark, lg, metrics, variant, opacity, layout) {
  const tileSize = Math.max(20, Math.min(1000, Number(lg.tileSize) || 140));
  const horizontalGap = Number(lg.horizontalGap || 180);
  const verticalGap = Number(lg.verticalGap || 180);
  const offsetX = Number(lg.tileOffsetX || 0);
  const offsetY = Number(lg.tileOffsetY || 0);

  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${opacity};
    left: ${metrics.timeColWidth}px;
    top: ${metrics.dayHeadHeight}px;
    width: ${metrics.contentWidth}px;
    height: ${metrics.contentHeight}px;
  `;

  const src =
    window.getTileSrc?.(
      variant,
      tileSize,
      horizontalGap,
      verticalGap,
      lg.rotation || 0,
      layout,
      lg.recolor ? lg.color : null,
      lg.opacity,
    ) || getLogoDataUrl(variant, lg.recolor ? lg.color : null, lg.opacity);

  if (lg.recolor && variant === 3) {
    logoMark.style.backgroundColor = lg.color || "#0ea5e9";
    logoMark.style.webkitMaskImage = `url(${src})`;
    logoMark.style.maskImage = `url(${src})`;
    logoMark.style.webkitMaskRepeat = "repeat";
    logoMark.style.maskRepeat = "repeat";

    const patternSize =
      layout === "diagonal"
        ? `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`
        : `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;

    logoMark.style.webkitMaskSize = patternSize;
    logoMark.style.maskSize = patternSize;
    logoMark.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
    logoMark.style.maskPosition = `${offsetX}px ${offsetY}px`;
  } else {
    logoMark.style.backgroundImage = `url(${src})`;
    logoMark.style.backgroundRepeat = "repeat";

    const patternSize =
      layout === "diagonal"
        ? `${(tileSize + horizontalGap) * 2}px ${(tileSize + verticalGap) * 2}px`
        : `${tileSize + horizontalGap}px ${tileSize + verticalGap}px`;

    logoMark.style.backgroundSize = patternSize;
    logoMark.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
  }
}

function getLogoVariant() {
  const variant = state.settings.logo?.variant;
  if (variant === 3 && !state.settings.logo.uploadedFileData) {
    return 1;
  }
  return clamp(Math.round(Number(variant ?? 1)), 1, 3);
}

window.getLogoDataUrl = function getLogoDataUrl(
  variant,
  recolorColor = null,
  opacity = 100,
) {
  variant = Number(variant);

  if (variant === 3) {
    const fileData = state.settings.logo?.uploadedFileData;
    if (fileData && fileData.startsWith("data:")) {
      if (recolorColor || opacity < 100) {
        const base64 = fileData.split(",")[1];
        let svgText = atob(base64);

        if (recolorColor && fileData.includes("image/svg+xml")) {
          svgText = svgText.replace(
            /(fill|stroke)="[^"]*"/g,
            `$1="${recolorColor}"`,
          );
        }

        if (opacity < 100) {
          const opacityValue = opacity / 100;
          const svgStart = svgText.indexOf("<svg");
          if (svgStart !== -1) {
            const svgEnd = svgText.indexOf(">", svgStart);
            const svgTag = svgText.substring(svgStart, svgEnd + 1);

            if (svgTag.includes('style="')) {
              svgText = svgText.replace(
                /style="([^"]*)"/,
                `style="$1;opacity:${opacityValue}"`,
              );
            } else {
              svgText = svgText.replace(
                svgTag,
                svgTag.replace(">", ` style="opacity:${opacityValue}">`),
              );
            }
          }
        }

        return `data:image/svg+xml;base64,${btoa(svgText)}`;
      }
      return fileData;
    }
    variant = 1;
  }

  let svgString;
  if (variant === 1) {
    svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>';
  } else if (variant === 2) {
    svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="15" fill="currentColor"/></svg>';
  } else {
    svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>';
  }

  if (recolorColor && (variant === 1 || variant === 2)) {
    svgString = svgString.replace(
      /fill="currentColor"/g,
      `fill="${recolorColor}"`,
    );
  }

  if (opacity < 100 && (variant === 1 || variant === 2)) {
    const opacityValue = opacity / 100;
    if (variant === 1) {
      svgString = svgString.replace(
        "<circle ",
        `<circle style="opacity:${opacityValue}" `,
      );
    } else if (variant === 2) {
      svgString = svgString.replace(
        "<rect ",
        `<rect style="opacity:${opacityValue}" `,
      );
    }
  }

  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
};

function applyLogoStyle(
  element,
  src,
  recolorColor = null,
  opacity = 1,
  isTile = false,
) {
  element.style.opacity = opacity;

  if (recolorColor && src) {
    element.style.backgroundColor = recolorColor;
    element.style.webkitMaskImage = `url(${src})`;
    element.style.maskImage = `url(${src})`;
    element.style.webkitMaskRepeat = isTile ? "repeat" : "no-repeat";
    element.style.maskRepeat = isTile ? "repeat" : "no-repeat";
    element.style.webkitMaskPosition = "center";
    element.style.maskPosition = "center";
    element.style.webkitMaskSize = isTile ? "contain" : "contain";
    element.style.maskSize = isTile ? "contain" : "contain";
    element.style.backgroundImage = "none";
  } else if (src) {
    element.style.backgroundImage = `url(${src})`;
    element.style.backgroundRepeat = isTile ? "repeat" : "no-repeat";
    element.style.backgroundPosition = "center";
    element.style.backgroundSize = "contain";
  }
}

function getCanvas2dContext(canvas, options = null) {
  if (!canvas || typeof canvas.getContext !== "function") return null;
  if (options) {
    try {
      const ctxWithOptions = canvas.getContext("2d", options);
      if (ctxWithOptions) return ctxWithOptions;
    } catch (_) {}
  }
  try {
    return canvas.getContext("2d");
  } catch (_) {
    return null;
  }
}

function getSafeMaxCanvasArea() {
  if (IS_IPHONE_DEVICE) return 5000000;
  if (IS_IPAD_DEVICE) return 8000000;
  if (IS_IOS_DEVICE) return 7000000;
  if (IS_WEBKIT_ENGINE) return 14000000;
  if (/Firefox/i.test(USER_AGENT)) return 18000000;
  return 26000000;
}

function fitCanvasSizeToLimit(width, height, maxArea = getSafeMaxCanvasArea()) {
  const w = Math.max(1, Math.floor(Number(width) || 1));
  const h = Math.max(1, Math.floor(Number(height) || 1));
  const area = w * h;
  if (!Number.isFinite(area) || area <= 0) {
    return { width: 1, height: 1, scaled: false, ratio: 1 };
  }
  if (area <= maxArea) {
    return { width: w, height: h, scaled: false, ratio: 1 };
  }
  const ratio = Math.sqrt(maxArea / area);
  return {
    width: Math.max(1, Math.floor(w * ratio)),
    height: Math.max(1, Math.floor(h * ratio)),
    scaled: true,
    ratio,
  };
}

function canvasToDataUrlWithFallback(canvas, mimeType, quality = 1) {
  let currentCanvas = canvas;
  let totalScale = 1;
  let lastError = null;

  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      return {
        dataUrl: currentCanvas.toDataURL(mimeType, quality),
        scaled: totalScale < 1,
        scale: totalScale,
      };
    } catch (error) {
      lastError = error;
    }

    const ratio = attempt === 0 ? 0.85 : 0.72;
    const nextScale = totalScale * ratio;
    const nextW = Math.max(1, Math.floor(canvas.width * nextScale));
    const nextH = Math.max(1, Math.floor(canvas.height * nextScale));
    if (nextW === currentCanvas.width && nextH === currentCanvas.height) {
      break;
    }

    const reduced = document.createElement("canvas");
    reduced.width = nextW;
    reduced.height = nextH;
    const reducedCtx = getCanvas2dContext(reduced, {
      alpha: mimeType !== "image/jpeg",
    });
    if (!reducedCtx) break;
    reducedCtx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in reducedCtx) {
      reducedCtx.imageSmoothingQuality = "high";
    }
    reducedCtx.drawImage(canvas, 0, 0, nextW, nextH);
    currentCanvas = reduced;
    totalScale = nextScale;
  }

  throw lastError || new Error("Canvas toDataURL failed");
}

function createFinalCanvas(sourceCanvas, fmt, background = null) {
  const final = document.createElement("canvas");
  final.width = fmt.w;
  final.height = fmt.h;

  const ctx = getCanvas2dContext(final, {
    alpha: background === null,
    willReadFrequently: false,
  });
  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }

  // Заливаем фон если нужно
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, fmt.w, fmt.h);
  }

  const srcW = sourceCanvas.width;
  const srcH = sourceCanvas.height;

  // Масштабируем с сохранением пропорций
  const scale = Math.min(fmt.w / srcW, fmt.h / srcH);
  const dw = srcW * scale;
  const dh = srcH * scale;
  const x = (fmt.w - dw) / 2;
  const y = (fmt.h - dh) / 2;

  // Включаем сглаживание
  ctx.imageSmoothingEnabled = true;
  if ("imageSmoothingQuality" in ctx) {
    ctx.imageSmoothingQuality = "high";
  }

  // Рисуем исходный canvas на целевом
  ctx.drawImage(sourceCanvas, x, y, dw, dh);

  return final;
}

function getExportPresetById(id) {
  return EXPORT_PRESETS.find((p) => p.id === id) || EXPORT_PRESETS[0];
}

function resolveExportBackground(expBg) {
  if (expBg === "transparent") {
    return expFormat.value === "jpeg" ? "#ffffff" : null;
  }
  if (expBg === "white") return "#ffffff";
  return getThemeBgCssColor();
}

function getThemeBgCssColor() {
  const cs = getComputedStyle(document.documentElement);
  let bg = (cs.getPropertyValue("--bg") || "").trim();
  if (!bg) return "#ffffff";
  if (bg.startsWith("#")) return bg;
  return `#${bg}`;
}

function openPendingIosDownloadWindow() {
  if (!IS_IOS_WEBKIT) return null;
  if (pendingIosDownloadWindow && !pendingIosDownloadWindow.closed) {
    return pendingIosDownloadWindow;
  }
  try {
    pendingIosDownloadWindow = window.open("", "_blank");
    return pendingIosDownloadWindow || null;
  } catch (_) {
    pendingIosDownloadWindow = null;
    return null;
  }
}

function resetPendingIosDownloadWindow({ close = false } = {}) {
  if (!pendingIosDownloadWindow) return;
  if (close) {
    try {
      if (!pendingIosDownloadWindow.closed) pendingIosDownloadWindow.close();
    } catch (_) {}
  }
  pendingIosDownloadWindow = null;
}

async function downloadFromExportModal() {
  const opts = getExportOptsFromUI();
  if (IS_IOS_WEBKIT) {
    openPendingIosDownloadWindow();
  }

  try {
    toast("INFO", "Export", "Preparing file...");

    const svgOpts = { ...opts, fmt: "svg" };
    const exportResult = await executeExport(svgOpts);

    if (!exportResult || !exportResult.dataUrl) {
      toast("ERR", "Export", "Failed to render export image");
      resetPendingIosDownloadWindow({ close: true });
      return;
    }

    lastPreview = {
      dataUrl: exportResult.dataUrl,
      originalOpts: opts,
      ...svgOpts,
      timestamp: Date.now(),
    };

    displaySvgPreview(exportResult.dataUrl);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    let finalDataUrl;
    let fileName;
    const stamp = new Date().toISOString().slice(0, 10);
    const timestamp = new Date().toISOString().slice(11, 19).replace(/:/g, "-");

    if (opts.fmt === "svg") {
      finalDataUrl = lastPreview.dataUrl;
      fileName = `schedule-${opts.preset.id}-${stamp}_${timestamp}.svg`;
    } else {
      try {
        const canvas = await svgToCanvas(lastPreview.dataUrl, opts);

        let finalCanvas = canvas;
        const isDownscaledByLimit =
          canvas.__downscaledByLimit === true ||
          (canvas.dataset && canvas.dataset.downscaledByLimit === "1");
        if (
          opts.preset.id !== "auto" &&
          !isDownscaledByLimit &&
          (canvas.width !== opts.preset.w || canvas.height !== opts.preset.h)
        ) {
          const target = {
            w: opts.preset.w,
            h: opts.preset.h,
            rotate: false,
          };
          finalCanvas = createFinalCanvas(
            canvas,
            target,
            opts.fmt === "jpeg" ? opts.background : null,
          );
        }

        const converted = canvasToDataUrlWithFallback(
          finalCanvas,
          opts.imageFormat,
          opts.quality,
        );
        finalDataUrl = converted.dataUrl;
        fileName = `schedule-${opts.preset.id}-${stamp}_${timestamp}.${opts.fmt === "jpeg" ? "jpg" : "png"}`;

        if (isDownscaledByLimit || converted.scaled) {
          toast(
            "WARN",
            "Export",
            "Image saved with reduced resolution for compatibility.",
            3200,
          );
        }
      } catch (error) {
        console.error("Export conversion error:", error);
        finalDataUrl = lastPreview.dataUrl;
        fileName = `schedule-${opts.preset.id}-${stamp}_${timestamp}.svg`;
        toast(
          "WARN",
          "Export",
          "PNG/JPEG conversion failed in this browser. Downloaded SVG instead.",
          3800,
        );
      }
    }

    const mode = downloadFile(finalDataUrl, fileName);
    if (mode === "new-tab") {
      toast(
        "INFO",
        "Safari",
        "Файл открыт в новой вкладке. Для сохранения используйте меню «Поделиться».",
      );
    } else {
      toast("OK", "Export", `File \"${fileName}\" downloaded`);
    }

    setTimeout(() => {
      closeExportModal();
    }, 500);
  } catch (error) {
    console.error("Download error:", error);
    toast("ERR", "Download", error?.message || "Download failed");
    resetPendingIosDownloadWindow({ close: true });
  }
}
async function svgToCanvas(svgDataUrl, opts) {
  try {
    const img = await loadImageFromDataUrl(svgDataUrl);

    let svgWidth = img.naturalWidth || img.width;
    let svgHeight = img.naturalHeight || img.height;
    if (svgWidth === 0 || svgHeight === 0) {
      svgWidth = 800;
      svgHeight = 600;
    }

    const targetWidth = opts.preset.id === "auto" ? svgWidth : opts.preset.w;
    const targetHeight = opts.preset.id === "auto" ? svgHeight : opts.preset.h;
    const limitedSize = fitCanvasSizeToLimit(targetWidth, targetHeight);

    const canvas = document.createElement("canvas");
    canvas.width = limitedSize.width;
    canvas.height = limitedSize.height;
    canvas.__downscaledByLimit = !!limitedSize.scaled;
    if (limitedSize.scaled && canvas.dataset) {
      canvas.dataset.downscaledByLimit = "1";
    }

    const ctx = getCanvas2dContext(canvas, {
      alpha: opts.fmt !== "jpeg",
      willReadFrequently: false,
    });
    if (!ctx) {
      throw new Error("Canvas 2D context unavailable");
    }

    if (opts.fmt === "jpeg") {
      ctx.fillStyle = opts.background || "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) {
      ctx.imageSmoothingQuality = "high";
    }

    const scale = Math.min(canvas.width / svgWidth, canvas.height / svgHeight);
    const drawWidth = svgWidth * scale;
    const drawHeight = svgHeight * scale;
    const drawX = (canvas.width - drawWidth) / 2;
    const drawY = (canvas.height - drawHeight) / 2;
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    return canvas;
  } catch (error) {
    console.error("Ошибка в svgToCanvas:", error);

    const fallback = document.createElement("canvas");
    fallback.width = 800;
    fallback.height = 600;
    const fallbackCtx = getCanvas2dContext(fallback, {
      alpha: opts.fmt !== "jpeg",
    });
    if (!fallbackCtx) {
      throw new Error("Не удалось создать изображение: " + error.message);
    }

    fallbackCtx.fillStyle =
      opts.fmt === "jpeg" ? opts.background || "#ffffff" : "transparent";
    fallbackCtx.fillRect(0, 0, fallback.width, fallback.height);
    fallbackCtx.fillStyle = "#ff0000";
    fallbackCtx.font = "20px Arial";
    fallbackCtx.fillText("Ошибка конвертации SVG", 50, 50);
    fallbackCtx.fillStyle = "#000000";
    fallbackCtx.font = "16px Arial";
    fallbackCtx.fillText(
      "Не удалось преобразовать SVG в изображение",
      50,
      100,
    );
    fallbackCtx.fillText("Попробуйте экспорт в формат SVG", 50, 130);
    return fallback;
  }
}

function downloadFile(dataUrl, fileName) {
  if (IS_IOS_WEBKIT) {
    let openUrl = dataUrl;
    if (typeof dataUrl === "string" && dataUrl.startsWith("data:")) {
      const objectUrl = dataUrlToObjectUrl(dataUrl);
      if (objectUrl) {
        openUrl = objectUrl;
      }
    }

    let opened = null;
    if (pendingIosDownloadWindow && !pendingIosDownloadWindow.closed) {
      try {
        pendingIosDownloadWindow.location.href = openUrl;
        opened = pendingIosDownloadWindow;
      } catch (_) {
        opened = null;
      }
    }
    if (!opened) {
      opened = window.open(openUrl, "_blank");
    }
    if (!opened) {
      window.location.href = openUrl;
    }

    resetPendingIosDownloadWindow();
    if (typeof openUrl === "string" && openUrl.startsWith("blob:")) {
      setTimeout(() => URL.revokeObjectURL(openUrl), 60000);
    }
    return "new-tab";
  }

  const a = document.createElement("a");
  a.download = fileName;
  a.href = dataUrl;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();

  // Удаляем ссылку после клика
  setTimeout(() => {
    document.body.removeChild(a);
    // Освобождаем память от data URL
    if (dataUrl.startsWith("blob:")) {
      URL.revokeObjectURL(dataUrl);
    }
  }, 100);
  return "download";
}

function isSvgDataUrl(value) {
  return /^data:image\/svg\+xml/i.test(String(value || ""));
}

function dataUrlToObjectUrl(dataUrl) {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) return "";
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex < 0) return "";

  const meta = dataUrl.slice(0, commaIndex);
  const payload = dataUrl.slice(commaIndex + 1);
  const mimeMatch = meta.match(/^data:([^;,]+)/i);
  const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";

  try {
    if (/;base64/i.test(meta)) {
      const binary = atob(payload);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
    }
    const decoded = decodeURIComponent(payload);
    return URL.createObjectURL(new Blob([decoded], { type: mimeType }));
  } catch (_) {
    return "";
  }
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let settled = false;
    let timeoutId = 0;
    let objectUrl = "";

    const settle = (resolver, value) => {
      if (settled) return;
      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (_) {}
      }
      resolver(value);
    };

    if (typeof dataUrl !== "string" || !dataUrl) {
      reject(new Error("Некорректный URL изображения"));
      return;
    }

    let src = dataUrl;
    if (isSvgDataUrl(dataUrl)) {
      objectUrl = dataUrlToObjectUrl(dataUrl);
      if (objectUrl) src = objectUrl;
    }

    // Для не data/blob URL устанавливаем crossOrigin
    if (!/^data:|^blob:/i.test(src)) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        console.warn("Изображение имеет нулевой размер, но загружено");
      }
      settle(resolve, img);
    };

    img.onerror = (err) => {
      console.error(
        "Ошибка загрузки изображения:",
        err,
        dataUrl.substring(0, 100),
      );
      settle(reject, new Error("Не удалось загрузить изображение"));
    };

    timeoutId = setTimeout(() => {
      if (settled) return;
      if (img.complete && (img.width > 0 || img.height > 0)) {
        settle(resolve, img);
      } else {
        settle(reject, new Error("Таймаут загрузки изображения"));
      }
    }, 15000);

    img.src = src;
  });
}

function applyCssVariablesToEvents(clone) {
    const eventEls = clone.querySelectorAll(".event");
    eventEls.forEach((el) => {
        el.style.removeProperty("display");
        el.style.visibility = "visible";
        el.classList.remove("dim");
        el.style.opacity = "1";

        const originalId = el.dataset.eid;
        if (!originalId) return;
        const original = document.querySelector(`.event[data-eid="${originalId}"]`);
        if (!original) return;
        const cs = getComputedStyle(original);


        const bgColor = cs.backgroundColor;
        if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
            el.style.backgroundColor = bgColor;
        }


        const evText = cs.color;
        if (evText) {
            el.style.color = evText;
        }

        const borderColor = cs.borderColor;
        if (borderColor && borderColor !== "rgba(0, 0, 0, 0)") {
            el.style.borderColor = borderColor;
            el.style.borderStyle = cs.borderStyle || "solid";
            el.style.borderWidth = cs.borderWidth || "1px";
        }

        const boxShadow = cs.boxShadow;
        if (boxShadow && boxShadow !== "none") {
            el.style.boxShadow = boxShadow;
        }
    });
}

function applyCssVariablesToEventsForExport(targetElement) {
    const eventEls = targetElement.querySelectorAll(".event");
    const rootStyle = getComputedStyle(document.documentElement);
    const lineHeight =
      rootStyle.getPropertyValue("--evLineHeight").trim() || "1.12";
    const titleClamp =
      rootStyle.getPropertyValue("--evTitleClamp").trim() || "3";

    eventEls.forEach((el) => {
        const originalId = el.dataset.eid;
        if (!originalId) return;
        const original = document.querySelector(`.event[data-eid="${originalId}"]`);
        if (!original) return;
        const cs = getComputedStyle(original);


        el.style.opacity = "1";
        el.classList.remove("dim");


        const isDouble = el.classList.contains("double");
        const isCompact = el.classList.contains("compact-card");
        const isList = el.classList.contains("list");

        if (isDouble) {
            el.style.padding = "6px 7px";
            el.style.gap = "2px";
            el.style.lineHeight = lineHeight;
        } else if (isCompact) {
            el.style.padding = `${rootStyle.getPropertyValue("--evCardPadY").trim() || "7px"} 8px`;
        } else {
            el.style.padding = "7px 8px";
            el.style.paddingTop = rootStyle.getPropertyValue("--evCardPadY").trim() || "7px";
            el.style.paddingBottom = rootStyle.getPropertyValue("--evCardPadY").trim() || "7px";
        }

        el.style.lineHeight = lineHeight;

        el.style.borderRadius = rootStyle.getPropertyValue("--evCardRadius").trim() || "12px";


        const titleEl = el.querySelector(".t");
        const metaEl = el.querySelector(".m");
        const grabEl = el.querySelector(".grab");

        if (titleEl) {
            const originalTitle = original.querySelector(".t");
            if (originalTitle) {
                const titleCs = getComputedStyle(originalTitle);
                titleEl.style.fontWeight = rootStyle.getPropertyValue("--evTitleW").trim() || "900";
                titleEl.style.fontFamily = rootStyle.getPropertyValue("--evTitleFont").trim() || rootStyle.getPropertyValue("--tableFont").trim();
                titleEl.style.lineHeight = lineHeight;
                titleEl.style.letterSpacing = rootStyle.getPropertyValue("--evLetterSpacing").trim() || "0em";
                titleEl.style.textTransform = rootStyle.getPropertyValue("--evTextTransform").trim() || "none";
                titleEl.style.color = titleCs.color;
                titleEl.style.margin = "0";
                titleEl.style.padding = "0";
                titleEl.style.display = "-webkit-box";
                titleEl.style.webkitBoxOrient = "vertical";
                titleEl.style.webkitLineClamp = isDouble
                  ? String(CELL_HEIGHT_CONFIG.DOUBLE_TITLE_LINES)
                  : titleClamp;
                titleEl.style.overflow = "hidden";
                titleEl.style.textOverflow = "ellipsis";
                titleEl.style.whiteSpace = "pre-wrap";
                titleEl.style.wordBreak = "break-word";
                titleEl.style.overflowWrap = "anywhere";

                if (isDouble) {
                    titleEl.style.fontSize = rootStyle.getPropertyValue("--evTitleSize2").trim() || "10px";
                } else {
                    titleEl.style.fontSize = rootStyle.getPropertyValue("--evTitleSize1").trim() || "12px";
                }
            }
        }

        if (metaEl) {
            const originalMeta = original.querySelector(".m");
            if (originalMeta) {
                const metaCs = getComputedStyle(originalMeta);
                metaEl.style.fontWeight = rootStyle.getPropertyValue("--evMetaW").trim() || "600";
                metaEl.style.fontFamily = rootStyle.getPropertyValue("--evMetaFont").trim() || rootStyle.getPropertyValue("--tableFont").trim();
                metaEl.style.lineHeight = lineHeight;
                metaEl.style.color = metaCs.color;
                metaEl.style.opacity = "0.95";
                metaEl.style.margin = "0";
                metaEl.style.padding = "0";
                metaEl.style.whiteSpace = "pre-wrap";
                metaEl.style.wordBreak = "break-word";
                metaEl.style.overflowWrap = "anywhere";

                if (isDouble) {
                    metaEl.style.fontSize = rootStyle.getPropertyValue("--evMetaSize2").trim() || "9px";
                } else {
                    metaEl.style.fontSize = rootStyle.getPropertyValue("--evMetaSize1").trim() || "11px";
                }
            }
        }

        if (grabEl) {
            grabEl.style.position = "absolute";
            grabEl.style.right = isDouble ? "6px" : "8px";
            grabEl.style.top = isDouble ? "6px" : "8px";
            grabEl.style.opacity = "0";
            grabEl.style.pointerEvents = "none";
            grabEl.style.fontSize = isDouble ? "11px" : "12px";
        }


        const borderColor = cs.borderColor;
        if (borderColor && borderColor !== "rgba(0, 0, 0, 0)") {
            el.style.borderColor = borderColor;
            el.style.borderStyle = cs.borderStyle || "solid";
            el.style.borderWidth = cs.borderWidth || "1px";
        }
        const boxShadow = cs.boxShadow;
        if (boxShadow && boxShadow !== "none") {
            el.style.boxShadow = boxShadow;
        }


        if (isList || isCompact) {
            el.style.position = "relative";
            el.style.left = "auto";
            el.style.top = "auto";
            el.style.width = "100%";
            el.style.height = "auto";
            el.style.flex = "0 0 auto";
        } else if (!isDouble) {
            el.style.position = "absolute";
            el.style.flex = "1 1 auto";
        }
    });


    targetElement.querySelectorAll(".slot-inner").forEach((inner) => {
        const originalInner = document.querySelector(".slot-inner");
        if (!originalInner) return;
        const innerCs = getComputedStyle(originalInner);

        if (inner.closest(".slot")?.classList.contains("two")) {
            inner.style.display = "grid";
            inner.style.gridTemplateRows = "1fr 1fr";
            inner.style.gap = "2px";
            inner.style.alignItems = "stretch";
            inner.style.justifyItems = "stretch";
            inner.style.height = "100%";
        } else {
            inner.style.display = innerCs.display;
            inner.style.flexDirection = innerCs.flexDirection;
            inner.style.gap = innerCs.gap;
        }
        inner.style.position = "relative";
        inner.style.boxSizing = "border-box";
        inner.style.minHeight = "0";
    });


    targetElement.querySelectorAll(".slot").forEach((slot) => {
        const originalSlot = document.querySelector(".slot");
        if (!originalSlot) return;
        const slotCs = getComputedStyle(originalSlot);
        slot.style.position = "relative";
        slot.style.width = "100%";
        slot.style.fontFamily = slotCs.fontFamily;
        slot.style.boxSizing = "border-box";

        if (slot.classList.contains("two") && slot.classList.contains("tl-fill")) {
            slot.style.height = "100%";
            slot.style.minHeight = "0";
        }
    });
}

function applyHeaderStylesForExport(targetElement) {
    const origSchedule = document.querySelector(".schedule");
    if (!origSchedule) return;

    const props = [
        "font-family",
        "font-size",
        "font-weight",
        "color",
        "background-color",
        "padding",
        "text-align",
        "line-height",
        "writing-mode",
        "transform",
        "align-items",
        "justify-content",
    ];

    const origHeads = origSchedule.querySelectorAll(".cell.head");
    const cloneHeads = targetElement.querySelectorAll(".cell.head");
    const headLen = Math.min(origHeads.length, cloneHeads.length);
    for (let i = 0; i < headLen; i++) {
        const cs = getComputedStyle(origHeads[i]);
        props.forEach((p) => {
            cloneHeads[i].style.setProperty(p, cs.getPropertyValue(p));
        });
    }

    const origTimes = origSchedule.querySelectorAll(".cell.time");
    const cloneTimes = targetElement.querySelectorAll(".cell.time");
    const timeLen = Math.min(origTimes.length, cloneTimes.length);
    for (let i = 0; i < timeLen; i++) {
        const cs = getComputedStyle(origTimes[i]);
        props.forEach((p) => {
            cloneTimes[i].style.setProperty(p, cs.getPropertyValue(p));
        });
    }
}

function applyCellSpacingForExport(targetElement) {
    const origSchedule = document.querySelector(".schedule");
    if (!origSchedule) return;

    const copyBoxStyles = (src, dst) => {
        const cs = getComputedStyle(src);
        dst.style.boxSizing = cs.boxSizing;
        dst.style.paddingTop = cs.paddingTop;
        dst.style.paddingRight = cs.paddingRight;
        dst.style.paddingBottom = cs.paddingBottom;
        dst.style.paddingLeft = cs.paddingLeft;
        // УСТАНАВЛИВАЕМ gap: 0 для устранения интервалов между ячейками при экспорте
        dst.style.gap = "0";
        // УБИРАЕМ border для устранения интервалов между ячейками при экспорте
        dst.style.borderTopWidth = "0";
        dst.style.borderRightWidth = "0";
        dst.style.borderBottomWidth = "0";
        dst.style.borderLeftWidth = "0";
        dst.style.borderStyle = cs.borderStyle;
        dst.style.borderColor = cs.borderColor;
    };

    const origCells = origSchedule.querySelectorAll(".cell");
    const cloneCells = targetElement.querySelectorAll(".cell");
    const cellLen = Math.min(origCells.length, cloneCells.length);
    for (let i = 0; i < cellLen; i++) {
        copyBoxStyles(origCells[i], cloneCells[i]);
    }

    const origSlots = origSchedule.querySelectorAll(".slot");
    const cloneSlots = targetElement.querySelectorAll(".slot");
    const slotLen = Math.min(origSlots.length, cloneSlots.length);
    for (let i = 0; i < slotLen; i++) {
        copyBoxStyles(origSlots[i], cloneSlots[i]);
    }

    const origInners = origSchedule.querySelectorAll(".slot-inner");
    const cloneInners = targetElement.querySelectorAll(".slot-inner");
    const innerLen = Math.min(origInners.length, cloneInners.length);
    for (let i = 0; i < innerLen; i++) {
        copyBoxStyles(origInners[i], cloneInners[i]);
    }
}

function parseRgba(colorString) {
  if (!colorString) return null;

  // Регулярное выражение для rgb(r, g, b)
  const rgbMatch = colorString.match(
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    // Проверка на корректность значений
    if (
      isNaN(r) ||
      isNaN(g) ||
      isNaN(b) ||
      r < 0 ||
      r > 255 ||
      g < 0 ||
      g > 255 ||
      b < 0 ||
      b > 255
    ) {
      return null;
    }
    return { r, g, b, a: 1.0 }; // Устанавливаем a=1, потому что в rgb() нет альфы
  }

  // Регулярное выражение для rgba(r, g, b, a)
  const rgbaMatch = colorString.match(
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/i,
  );
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    const a = parseFloat(rgbaMatch[4]); // Это может быть 0.5, 0.8 и т.д.
    // Проверка на корректность значений
    if (
      isNaN(r) ||
      isNaN(g) ||
      isNaN(b) ||
      isNaN(a) ||
      r < 0 ||
      r > 255 ||
      g < 0 ||
      g > 255 ||
      b < 0 ||
      b > 255 ||
      a < 0 ||
      a > 1
    ) {
      return null;
    }
    return { r, g, b, a };
  }

  return null;
}

// Конец выгрузки

function updateCharCounter() {
  const maxLength = MAX_NAME_CHARS;
  const currentLength = evName.value.length;

  let counter = $("evNameCounter");
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

function isServiceWorkerAllowed() {
  if (!("serviceWorker" in navigator)) return false;
  if (window.location.protocol === "https:") return true;
  return ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
}

async function cleanupDuplicateAppServiceWorkers() {
  const appRegistrations = await getAppServiceWorkerRegistrations();
  if (appRegistrations.length <= 1) {
    return { total: appRegistrations.length, removed: 0 };
  }

  const currentRegistration = await navigator.serviceWorker.getRegistration();
  const keepScope = currentRegistration?.scope || SW_EXPECTED_SCOPE;
  let removed = 0;

  for (const registration of appRegistrations) {
    if (registration.scope === keepScope) continue;
    try {
      const ok = await registration.unregister();
      if (ok) removed += 1;
    } catch (error) {
      console.warn("Failed to unregister duplicate Service Worker:", error);
    }
  }

  return { total: appRegistrations.length, removed };
}

async function registerServiceWorker() {
  if (!isServiceWorkerAllowed()) return;
  sessionStorage.removeItem(SW_RELOAD_MARK);

  const hadController = !!navigator.serviceWorker.controller;
  let reloadedAfterUpdate = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController) return;
    if (reloadedAfterUpdate) return;
    if (sessionStorage.getItem(SW_RELOAD_MARK) === "1") return;
    sessionStorage.setItem(SW_RELOAD_MARK, "1");
    reloadedAfterUpdate = true;
    window.location.reload();
  });

  try {
    const registration = await navigator.serviceWorker.register("./sw.js", {
      scope: "./",
    });

    const duplicateInfo = await cleanupDuplicateAppServiceWorkers();
    if (duplicateInfo.removed > 0) {
      console.warn(
        "Removed duplicate Service Worker registrations:",
        duplicateInfo.removed,
      );
    }
    if (duplicateInfo.total > 1) {
      console.warn(
        "Multiple Service Worker registrations detected for this app:",
        duplicateInfo.total,
      );
    }

    registration.addEventListener("updatefound", () => {
      const installing = registration.installing;
      if (!installing) return;
      installing.addEventListener("statechange", () => {
        if (
          installing.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          installing.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });

    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    registration.update().catch((error) => {
      console.warn("Service Worker update check failed:", error);
    });
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
}

if (isServiceWorkerAllowed()) {
  window.addEventListener("load", async () => {
    const refreshed = await forceServiceWorkerRefreshOnce();
    if (refreshed) return;
    registerServiceWorker();
  });
}


