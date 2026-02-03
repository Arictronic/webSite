import {
  FONT_OPTIONS,
  FONT_FAMILY_BY_ID,
  FONT_ID_ALIASES,
} from "./fonts.generated.js";

// ===================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====================
const $ = (id) => document.getElementById(id);
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
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
  { id: "vk_square", name: "VK пост 1:1 (1080×1080)", w: 1080, h: 1080 },
  { id: "vk_wide", name: "VK обложка 1.91:1 (1200×630)", w: 1200, h: 630 },
  { id: "tg_16_9", name: "Telegram 16:9 (1280×720)", w: 1280, h: 720 },
  { id: "tg_square", name: "Telegram 1:1 (1080×1080)", w: 1080, h: 1080 },
  { id: "a4_portrait", name: "A4 портрет (2480×3508)", w: 2480, h: 3508 },
  { id: "a4_land", name: "A4 альбом (3508×2480)", w: 3508, h: 2480 },
  { id: "auto", name: "Auto (по размеру расписания)", w: 0, h: 0 },
];
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      }
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
let touchDragTimeout = null;        // Таймер для задержки 2 сек
let touchDragElement = null;        // Элемент, который перетаскиваем
let touchDragStartY = 0;            // Начальная позиция тача
let touchDragStartX = 0;
let touchDragActive = false;        // Флаг активного перетаскивания
let touchDragInitialPosition = null; // Исходная позиция элемента
let touchDragPlaceholder = null;    // Плейсхолдер для визуализации
let touchDragTargetCell = null;     // Ячейка, над которой находимся
let touchDragEventData = null;      // Данные события для перемещения
let touchDragStartTime = 0;         // Время начала удержания
let touchDragFeedback = null;       // Визуальная обратная связь (круг прогресса)
let touchLastX = 0;                 // Последняя позиция X
let touchLastY = 0;
let autoScrollInterval = null;      // Интервал для автоматической прокрутки
let autoScrollDirection = 0;        // Направление прокрутки: -1 (вверх), 0 (нет), 1 (вниз)
let autoScrollSpeed = 8;            // Скорость прокрутки в пикселях
let edgeThreshold = 80;             // Порог расстояния от края экрана для активации прокрутки
let scheduleContainer = null;  
  let autoScrollDirectionX = 0;       //нет), 1 (вправо)
let autoScrollIntervalX = null;

let saveIndicatorStyleAdded = false;
let filterCache = new Map();
let lastPreview = null;
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
let lastFilterHash = "";

let sortableInstances = [];
let sortableInitTimeout = null;
let lastValidDropCell = null; 
let lastValidDropCoords = { x: 0, y: 0 }; 
let lastValidDropIndices = { dayIndex: -1, slotIndex: -1 }; 

const SEARCH_DEBOUNCE_MS = 300;
const METRICS_CACHE_TIME = 1000;
const STORAGE_KEY = "studio_schedule_v13";
const AUTH_PASSWORD = "12345678";
const AUTH_OK_KEY = "studio_auth_ok";
const MAX_NAME_LINES = 3;
const MAX_NAME_CHARS = 150;
const MAX_NAME_LINE_LEN = 50;
const HISTORY_LIMIT = 60;

// ================== ID HTML элементы ============================
const exportBackdrop = $("exportBackdrop");
const expPreset = $("expPreset");
const expFormat = $("expFormat");
const expBg = $("expBg");
const expQuality = $("expQuality");
const expQualityVal = $("expQualityVal");
const expJpegWrap = $("expJpegWrap");
const expPreviewImg = $("expPreviewImg");
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

// ==================== DRAG ====================
 // renderSchedule

function initSortableJS() {
  // Очищаем старые инстансы
  if (sortableInstances && sortableInstances.length) {
    sortableInstances.forEach(instance => {
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
    });
  }
  sortableInstances = [];
  
  // 🔴 КРИТИЧЕСКИ ВАЖНО: определяем контейнер скролла ДО инициализации
  const scrollContainer = document.querySelector('.schedule-wrap');
  if (!scrollContainer) {
    console.error('[SortableJS] Контейнер .schedule-wrap не найден для автоскролла!');
    return;
  }
  
  // 🔴 Определяем браузер (более надёжный способ)
  const isFirefox = typeof InstallTrigger !== 'undefined' || 
                    navigator.userAgent.toLowerCase().includes('firefox');
  
  // 🔴 Настройки скролла в зависимости от браузера
  const scrollConfig = {
    scroll: scrollContainer, // ЯВНО указываем контейнер вместо `true`
    scrollSensitivity: isFirefox ? 60 : 40, // Увеличиваем зону активации для Firefox
    scrollSpeed: isFirefox ? 12 : 8,        // Повышаем скорость для Firefox
    bubbleScroll: true
  };
  
  console.log(`[SortableJS] Инициализация: Firefox=${isFirefox}, scrollContainer=${!!scrollContainer}`);
  
  const cells = document.querySelectorAll('.cell.droppable');
  
  cells.forEach(cell => {
    const slotInner = cell.querySelector('.slot-inner');
    if (!slotInner) return;
    
    const sortable = new Sortable(slotInner, {
      group: {
        name: 'schedule-events',
        put: true,
        pull: true
      },
      
      // 🔥 АВТО-СКРОЛЛ (ИСПРАВЛЕНО ДЛЯ FIREFOX)
      ...scrollConfig,
      
      // 🔥 КРИТИЧЕСКИ ВАЖНО ДЛЯ FIREFOX:
      forceFallback: isFirefox, // Отключаем нативный DnD Firefox
      fallbackTolerance: 5,     // Минимальное смещение для активации
      
      // Визуальные эффекты
      animation: 150,
      ghostClass: 'drag-ghost',
      dragClass: 'dragging',
      chosenClass: 'drag-chosen',
      swapThreshold: 0.65,
      invertSwap: true,
      
      // Фильтрация
      filter: '.empty-slot',
      preventOnFilter: false,
      
      // Тач-поддержка
      touchStartThreshold: 5,
      delay: 0,
      delayOnTouchOnly: false,
      
      // Обработчики событий
      onStart: function(evt) {
        console.log('[DnD] Started:', evt.item.dataset.eid);
        
        // 🔥 Убираем артефакты Firefox (outline при DnD)
        if (isFirefox && evt.item) {
          evt.item.style.outline = 'none';
          evt.item.style.MozUserSelect = 'none'; // Отключаем выделение
        }
        
        // Скрываем пустые слоты
        document.querySelectorAll('.empty-slot').forEach(el => {
          el.style.display = 'none';
        });
      },
      
      onEnd: function(evt) {
        console.log('[DnD] Ended');
        
        // 🔥 Восстанавливаем стили после DnD в Firefox
        if (isFirefox && evt.item) {
          evt.item.style.outline = '';
          evt.item.style.MozUserSelect = '';
        }
        
        // Восстанавливаем пустые слоты
        document.querySelectorAll('.empty-slot').forEach(el => {
          el.style.display = '';
        });
        
        // Обновляем позицию события
        updateEventPosition(evt);
      },
      
      onMove: function(evt) {
        return true;
      },
      
      setData: function(dataTransfer, dragEl) {
        dataTransfer.setData('text/plain', dragEl.dataset.eid);
      }
    });
    
    sortableInstances.push(sortable);
  });
  
  // 🔥 Дополнительная защита для Firefox
  if (isFirefox && scrollContainer) {
    // Предотвращаем проблемы с нативным dragover
    scrollContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, { passive: false });
    
    // Добавляем класс для визуальной индикации
    scrollContainer.classList.add('firefox-dnd-mode');
  }
  
  console.log(`[SortableJS] Initialized: ${sortableInstances.length} containers (Firefox mode: ${isFirefox})`);
}

function updateEventPosition(evt) {
  const eventId = evt.item.dataset.eid;
  if (!eventId) return;
  
  const newContainer = evt.to;
  
  // Находим ячейку по контейнеру
  const newCell = newContainer.closest('.cell.droppable');
  if (!newCell) {
    console.error('newCell не найден');
    return;
  }
  
  // ✅ ИСПРАВЛЕНИЕ: Находим таблицу расписания и все ячейки
  const schedule = document.querySelector('.schedule');
  if (!schedule) {
    console.error('schedule не найден');
    return;
  }
  
  const allCells = Array.from(schedule.querySelectorAll('.cell.droppable'));
  const cellIndex = allCells.indexOf(newCell);
  
  if (cellIndex === -1) {
    console.error('Ячейка не найдена в списке');
    return;
  }
  
  let newDayIndex;
  const view = state.settings.display.cellView;
  
  if (view === 'compact') {
    // В компактном режиме НЕТ колонки времени - первый элемент это Пн
    newDayIndex = cellIndex;
  } else {
    // В timeline/list есть колонка времени - вычитаем 1
    // ✅ ИСПРАВЛЕНИЕ: Учитываем количество строк
    const { step } = getBounds();
    const slots = buildSlots();
    const rowsCount = slots.length;
    
    // Определяем номер строки
    const rowIndex = Math.floor(cellIndex / 7);
    // Определяем номер дня в строке (0-6)
    const dayInRow = cellIndex % 7;
    
    newDayIndex = dayInRow;
  }
  
  if (newDayIndex < 0 || newDayIndex > 6) {
    console.error('Неверный день:', newDayIndex);
    return;
  }
  
  // Получаем время слота
  let newSlotStart;
  
  if (view === 'compact') {
    // В компактном режиме используем текущее время события
    const existingEvent = state.events.find(e => e.id === eventId);
    if (existingEvent) {
      newSlotStart = existingEvent.startMin;
    } else {
      newSlotStart = parseHHMM(state.settings.schedule.start) || 540;
    }
  } else {
    // В timeline/list режиме берем из данных ячейки
    const slotIndex = parseInt(newCell.dataset.slotIndex);
    const slots = buildSlots();
    newSlotStart = slots[slotIndex] || parseHHMM(state.settings.schedule.start) || 540;
  }
  
  // ✅ ИСПРАВЛЕНИЕ: Сохраняем состояние после перемещения
  const oldEvent = state.events.find(e => e.id === eventId);
  if (!oldEvent) {
    console.error('Событие не найдено в состоянии');
    return;
  }
  
  // Проверяем, изменилось ли положение
  if (oldEvent.dayIndex === newDayIndex && oldEvent.startMin === newSlotStart) {
    console.log('Позиция не изменилась');
    return;
  }
  
  // Перемещаем событие
  smartMoveEvent(eventId, newDayIndex, newSlotStart, "SortableJS DnD");
}

function destroySortableJS() {
  if (sortableInstances && sortableInstances.length) {
    sortableInstances.forEach(instance => {
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
    });
  }
  sortableInstances = [];
  console.log('SortableJS destroyed');
}

//==========================================================
// Загрузка пресета
btnLoadLogoPreset.addEventListener("click", () => {
  const presetId = logoPresetSelect.value;
  loadLogoPreset(presetId);
});

// Сохранение в пресет
btnSaveLogoPreset.addEventListener("click", () => {
  const presetId = logoPresetSelect.value;
  const presetName = logoPresetSelect.options[logoPresetSelect.selectedIndex].text;
  
  if (confirm(`Сохранить текущие настройки логотипа в "${presetName}"?`)) {
    saveLogoPreset(presetId);
    toast("OK", "Успех", `Настройки сохранены в "${presetName}"`);
  }
});

// Удаление пресета
btnDeleteLogoPreset.addEventListener("click", () => {
  const presetId = logoPresetSelect.value;
  const presetName = logoPresetSelect.options[logoPresetSelect.selectedIndex].text;
  
  if (confirm(`Удалить пресет "${presetName}"? Это действие нельзя отменить.`)) {
    deleteLogoPreset(presetId);
    toast("OK", "Успех", `Пресет "${presetName}" удален`);
  }
});

/**
 * Сохраняет текущие настройки логотипа в пресет
 */
function saveLogoPreset(presetId) {
  if (!state.exportPresets) {
    state.exportPresets = DEFAULT_STATE().exportPresets;
  }
  
  // Получаем текущие настройки логотипа
  const currentLogoSettings = {
    enabled: state.settings.logo.enabled,
    variant: state.settings.logo.variant,
    opacity: state.settings.logo.opacity,
    recolor: state.settings.logo.recolor,
    color: state.settings.logo.color,
    layout: state.settings.logo.layout,
    tileSize: state.settings.logo.tileSize,
    horizontalGap: state.settings.logo.horizontalGap,
    verticalGap: state.settings.logo.verticalGap,
    rotation: state.settings.logo.rotation,
    tileOffsetX: state.settings.logo.tileOffsetX,
    tileOffsetY: state.settings.logo.tileOffsetY,
    uploadedFileData: state.settings.logo.uploadedFileData,
  };
  
  // Сохраняем в пресет
  const presetName = logoPresetSelect.options[logoPresetSelect.selectedIndex].text;
  state.exportPresets[presetId] = {
    name: presetName,
    logo: currentLogoSettings
  };
  
  saveState(true);
}

/**
 * Загружает настройки логотипа из пресета
 */
function loadLogoPreset(presetId) {
  if (!state.exportPresets || !state.exportPresets[presetId]) {
    toast("WARN", "Внимание", "Пресет не найден");
    return;
  }
  
  const preset = state.exportPresets[presetId];
  
  if (preset.logo) {
    // Копируем настройки логотипа в текущие настройки
    state.settings.logo.enabled = preset.logo.enabled;
    state.settings.logo.variant = preset.logo.variant;
    state.settings.logo.opacity = preset.logo.opacity;
    state.settings.logo.recolor = preset.logo.recolor;
    state.settings.logo.color = preset.logo.color;
    state.settings.logo.layout = preset.logo.layout;
    state.settings.logo.tileSize = preset.logo.tileSize;
    state.settings.logo.horizontalGap = preset.logo.horizontalGap;
    state.settings.logo.verticalGap = preset.logo.verticalGap;
    state.settings.logo.rotation = preset.logo.rotation;
    state.settings.logo.tileOffsetX = preset.logo.tileOffsetX;
    state.settings.logo.tileOffsetY = preset.logo.tileOffsetY;
    state.settings.logo.uploadedFileData = preset.logo.uploadedFileData;
    
    // Обновляем UI настроек логотипа
    updateLogoSettingsUI();
    
    // Обновляем логотип на странице
    if (window.logoManager) {
      window.logoManager.update();
    }
    
    saveState(true);
    toast("OK", "Успех", `Пресет "${preset.name}" загружен`);
  }
}

/**
 * Удаляет пресет (сбрасывает к значениям по умолчанию)
 */
function deleteLogoPreset(presetId) {
  if (!state.exportPresets) {
    state.exportPresets = DEFAULT_STATE().exportPresets;
  }
  
  // Сбрасываем пресет к значениям по умолчанию
  const defaultState = DEFAULT_STATE();
  state.exportPresets[presetId] = defaultState.exportPresets[presetId];
  
  saveState(true);
}

/**
 * Обновляет UI элементов настроек логотипа
 */

function updateLogoSettingsUI() {
  const lg = state.settings.logo;
  
  if (logoEnabled) logoEnabled.checked = lg.enabled;
  if (logoVariant) logoVariant.value = lg.variant;
  if (logoOpacity) {
    logoOpacity.value = lg.opacity;
    logoOpacityVal.textContent = `${lg.opacity}%`;
    if (logoOpacityNum) logoOpacityNum.value = lg.opacity;
  }
  if (logoRecolor) logoRecolor.checked = lg.recolor;
  if (logoColor) logoColor.value = lg.color;
  if (logoColorWrap) logoColorWrap.style.display = lg.recolor ? "block" : "none";
  if (logoLayout) logoLayout.value = lg.layout;
  if (logoTileSize) {
    logoTileSize.value = lg.tileSize;
    if (logoTileSizeNum) logoTileSizeNum.value = lg.tileSize;
  }
  if (logoHorizontalGap) {
    logoHorizontalGap.value = lg.horizontalGap;
    if (logoHorizontalGapNum) logoHorizontalGapNum.value = lg.horizontalGap;
  }
  if (logoVerticalGap) {
    logoVerticalGap.value = lg.verticalGap;
    if (logoVerticalGapNum) logoVerticalGapNum.value = lg.verticalGap;
  }
  if (logoRotation) {
    logoRotation.value = lg.rotation;
    if (logoRotationNum) logoRotationNum.value = lg.rotation;
  }
  if (logoTileOffsetX) {
    logoTileOffsetX.value = lg.tileOffsetX;
    if (logoTileOffsetXNum) logoTileOffsetXNum.value = lg.tileOffsetX;
  }
  if (logoTileOffsetY) {
    logoTileOffsetY.value = lg.tileOffsetY;
    if (logoTileOffsetYNum) logoTileOffsetYNum.value = lg.tileOffsetY;
  }
  
  // Обновляем видимость блока загрузки файла
  const logoUploadWrap = $("logoUploadWrap");
  if (logoUploadWrap) {
    logoUploadWrap.style.display = lg.variant === 3 ? "block" : "none";
  }
  
  // Синхронизируем контролы логотипа
  if (window.logoManager && window.logoManager.controlSyncer) {
    window.logoManager.controlSyncer.syncInitialValues();
  }
}


// ================== Пусиые слоты (да нет) ============================

expHideEmpty.addEventListener("change", () => {
  lastPreview = null;
  expPreviewImg.removeAttribute("src");
});



if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExportModule);
} else {
  initExportModule();
}

window.clearPreviewCache = clearPreviewCache;
window.buildExportPreview = buildExportPreview;
window.downloadFromExportModal = downloadFromExportModal;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toast(kind, title, text) {
  const toasts = document.querySelector("#toasts");
  if (!toasts) {
    console.warn("Контейнер для тостов не найден");
    return;
  }

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
      // В режиме timeline разрешаем 2 занятия в одном слоте
      // Проверяем пересечение ТОЛЬКО если уже есть 2 занятия
      if (eventsInSameSlot.length >= maxInSlot) {
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

  r.setProperty(
    "--logoUploadBg",
    inferredDark ? "rgba(30, 41, 59, 0.6)" : "rgb(248, 250, 252)",
  );
  r.setProperty(
    "--logoUploadBorder",
    inferredDark ? "rgba(56, 70, 89, 0.8)" : "rgba(203, 213, 225, 0.6)",
  );

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
  if (w > 0) r.setProperty("--dayW", `${clamp(w, 120, 800)}px`);

  // Добавляем стили для скролла
  const scheduleWrap = document.querySelector(".schedule-wrap");
  if (scheduleWrap) {
    scheduleWrap.style.overflowX = "auto";
    scheduleWrap.style.overflowY = "hidden";
    scheduleWrap.style.width = "100%";
    scheduleWrap.style.maxWidth = "100%";
    scheduleWrap.style.boxSizing = "border-box";
  }

  const schedule = document.querySelector(".schedule");
  if (schedule) {
    schedule.style.minWidth = "fit-content";
    schedule.style.width = "auto";
  }

  const headHeight = 30; // или 20, или любое значение от 20 до 30
  r.setProperty("--dayHeadHeight", `${headHeight}px`);
    
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
// ==================== Алгоритмы сохранения ====================

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

function pushHistory(reason) {
  history.push({ snapshot: deepCopy(state), reason, ts: Date.now() });
  if (history.length > HISTORY_LIMIT) history.shift();
  future = [];
  updateUndoRedoButtons();
  scheduleAutoSave(`history: ${reason}`);
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

  settingsBackdrop.classList.add("show");

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
  settingsBackdrop.classList.remove("show");
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

// ==================== КЛАСС ДЛЯ КЭШИРОВАНИЯ ====================
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

// ==================== КЛАСС ДЛЯ РАСЧЕТА МЕТРИК ====================
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

    let timeColWidth = 46;
    const timeCell = schedule.querySelector(".cell.time");
    if (timeCell) {
      timeColWidth = timeCell.getBoundingClientRect().width;
    }

    let dayHeadHeight = 42;
    const headCell = schedule.querySelector(".cell.head");
    if (headCell) {
      dayHeadHeight = headCell.getBoundingClientRect().height;
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
    const timeColWidth =
      parseFloat(computedStyle.getPropertyValue("--timeCol")) || 46;
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

// ==================== КЛАСС ДЛЯ УПРАВЛЕНИЯ АКТИВАМИ ====================
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

// ==================== КЛАСС ДЛЯ РЕНДЕРИНГА ====================
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
      this.layer = document.createElement("div");
      this.layer.id = "logoLayer";
      this.layer.setAttribute("aria-hidden", "true");
      scheduleWrap.appendChild(this.layer);
    }

    if (!this.mark) {
      this.mark = document.createElement("div");
      this.mark.id = "logoMark";
      this.mark.setAttribute("aria-hidden", "true");
      this.layer.appendChild(this.mark);
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

// ==================== КЛАСС ДЛЯ СИНХРОНИЗАЦИИ КОНТРОЛОВ ====================
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

// ==================== КЛАСС ДЛЯ ПРЕДПРОСМОТРА ====================
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

// ==================== КЛАСС ДЛЯ УПРАВЛЕНИЯ СОБЫТИЯМИ ====================
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

// ==================== ОСНОВНОЙ КЛАСС УПРАВЛЕНИЯ ====================
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

      this.setupEventListeners();
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

      this.isInitialized = false;
      console.log("LogoManager уничтожен");
    } catch (error) {
      console.error("Ошибка при уничтожении LogoManager:", error);
    }
  }
}

// ==================== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ====================
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

// ==================== ФУНКЦИИ ГЕОМЕТРИИ ====================

/**
 * Генерирует ключ геометрии на основе текущих настроек
 */
function getGeomKey() {
  const view = state.settings.display.cellView;
  const font = state.settings.font;
  const layout = state.settings.display;

  return [
    view,
    font.lineHeight,
    font.titleSize1,
    font.metaSize1,
    font.titleClamp,
    layout.cellPadPx,
    layout.dayWidthPx,
  ].join("|");
}

/**
 * Помечает геометрию как "грязную" (требует синхронизации)
 */
function markGeometryDirty() {
  geometryDirty = true;
  requestGeometrySync();
}

/**
 * Помечает геометрию как "грязную" только если изменился ключ
 */
function markGeometryDirtyIfNeeded() {
  const newKey = getGeomKey();
  if (newKey !== lastGeomKey) {
    lastGeomKey = newKey;
    markGeometryDirty();
  }
}

/**
 * Запрашивает синхронизацию геометрии (с использованием RAF)
 */
function requestGeometrySync() {
  if (geometryRafId) return;

  geometryRafId = requestAnimationFrame(() => {
    if (geometryDirty) {
      syncGridGeometry();
      geometryDirty = false;
    }
    geometryRafId = null;
  });
}

/**
 * Синхронизирует геометрию таблицы (измерение размеров)
 */
function syncGridGeometry() {
  const scheduleEl = document.querySelector(".schedule");
  if (!scheduleEl) return;

  const view = state.settings.display.cellView;

  // Сохраняем предыдущий вид для сравнения
  if (lastCellView !== view) {
    lastCellView = view;
    geometryCache = new WeakMap(); // Сбрасываем кэш при смене режима
  }

  // Выбираем метод синхронизации в зависимости от режима
  if (view === "compact") {
    syncCompactGeometry(scheduleEl);
  } else if (view === "timeline") {
    syncTimelineGeometry(scheduleEl);
  } else if (view === "list") {
    syncListGeometry(scheduleEl);
  }
}

/**
 * Синхронизация для компактного режима
 */
function syncCompactGeometry(scheduleEl) {
  // Сбрасываем высоты
  const cells = scheduleEl.querySelectorAll(".cell.droppable");
  cells.forEach((cell) => {
    cell.style.height = "";
  });

  // Измеряем максимальную высоту ячеек
  let maxHeight = 0;
  cells.forEach((cell) => {
    const rect = cell.getBoundingClientRect();
    maxHeight = Math.max(maxHeight, rect.height);
  });

  // Применяем одинаковую высоту всем ячейкам
  cells.forEach((cell) => {
    cell.style.height = `${maxHeight}px`;
  });

  console.log("Compact geometry synced:", maxHeight);
}

/**
 * Синхронизация для режима Timeline (двухфазное измерение)
 */
function syncTimelineGeometry(scheduleEl) {
  // ===== ФАЗА 1: Измерение ширины (класс "measuring") =====
  scheduleEl.classList.add("measuring");

  requestAnimationFrame(() => {
    const maxWidth = getMaxContentWidth(scheduleEl);

    // Устанавливаем --dayW на основе измерений
    if (maxWidth > 0) {
      document.documentElement.style.setProperty("--dayW", `${maxWidth}px`);
    }

    scheduleEl.classList.remove("measuring");

    // ===== ФАЗА 2: Измерение высоты (класс "measuring-h") =====
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
  syncTimelineGeometry(scheduleEl); // Используем тот же метод, что и для timeline
}

function getMaxContentWidth(scheduleEl) {
  const cells = scheduleEl.querySelectorAll(".cell.droppable");
  let maxWidth = 0;

  cells.forEach((cell) => {
    // Измеряем ширину slot-inner (контейнера событий)
    const slotInner = cell.querySelector(".slot-inner");
    if (slotInner) {
      const rect = slotInner.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, rect.width);
    }
  });

  // Добавляем отступы и минимальную ширину
  const cellPad =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--cellPad"),
    ) || 6;

  maxWidth += cellPad * 2; // Отступы слева и справа

  // Учитываем минимальную ширину из настроек
  const minW =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--dayMinW"),
    ) || 120;

  return Math.max(maxWidth, minW);
}

function syncRowHeights(scheduleEl) {
  const { step } = getBounds();
  const slots = buildSlots();

  if (!slots.length || !step) return;

  // Находим все строки (временные слоты), исключая заголовки дней
  const timeCells = scheduleEl.querySelectorAll(".cell.time:not(.head)");

  timeCells.forEach((timeCell, slotIndex) => {
    const slotStart = slots[slotIndex];
    if (slotStart === undefined) return;

    // Находим все ячейки в этой строке (7 дней + 1 колонка времени)
    const rowCells = [timeCell];
    let current = timeCell.nextElementSibling;
    let dayCount = 0;

    // Собираем только ячейки данных, пока не встретим следующую ячейку времени
    while (current && !current.classList.contains("time") && dayCount < 7) {
      if (current.classList.contains("droppable")) {
        rowCells.push(current);
      }
      current = current.nextElementSibling;
      dayCount++;
    }

    // Вычисляем максимальную высоту в строке
    let maxRowHeight = 0;
    let hasDoubleCells = false;
    
    rowCells.forEach((cell) => {
      // Пропускаем ячейки заголовков
      if (cell.classList.contains("head")) return;
      
      if (cell.classList.contains("droppable") && cell.dataset.double === "1") {
        // Для двойных ячеек используем расчет из calculateAndSetDoubleEventsHeight
        const slotInner = cell.querySelector(".slot-inner");
        const eventElements = cell.querySelectorAll(".event.double");
        
        if (slotInner && eventElements.length === 2) {
          // Временно сбрасываем высоту для измерения
          eventElements.forEach(el => {
            el.style.height = 'auto';
            el.style.minHeight = 'auto';
          });
          
          slotInner.style.height = 'auto';
          slotInner.style.minHeight = 'auto';
          
          // Измеряем реальную высоту содержимого
          let maxEventHeight = 0;
          eventElements.forEach(el => {
            const height = el.scrollHeight;
            maxEventHeight = Math.max(maxEventHeight, Math.ceil(height));
          });
          
          // Добавляем gap между событиями
          const gap = 2;
          const totalContentHeight = (maxEventHeight * 2) + gap;
          
          // Учитываем отступы и границы ячейки
          const computedStyle = getComputedStyle(cell);
          const cellPaddingTop = parseFloat(computedStyle.paddingTop) || 0;
          const cellPaddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
          const cellPadding = cellPaddingTop + cellPaddingBottom;
          
          const slot = cell.querySelector('.slot');
          const slotComputedStyle = getComputedStyle(slot);
          const slotPaddingTop = parseFloat(slotComputedStyle.paddingTop) || 0;
          const slotPaddingBottom = parseFloat(slotComputedStyle.paddingBottom) || 0;
          const slotPadding = slotPaddingTop + slotPaddingBottom;
          
          const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
          const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
          const borders = borderTop + borderBottom;
          
          const cellTotalHeight = totalContentHeight + cellPadding + slotPadding + borders;
          
          maxRowHeight = Math.max(maxRowHeight, Math.ceil(cellTotalHeight));
          hasDoubleCells = true;
        }
      } else if (cell.classList.contains("droppable")) {
        // Обычные ячейки
        const slot = cell.querySelector(".slot");
        if (slot) {
          const slotInner = slot.querySelector(".slot-inner");
          if (slotInner) {
            const contentHeight = slotInner.scrollHeight;
            const computedStyle = getComputedStyle(cell);
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
            const padding = paddingTop + paddingBottom;
            
            const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
            const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
            const borders = borderTop + borderBottom;
            
            const cellHeight = contentHeight + padding + borders;
            maxRowHeight = Math.max(maxRowHeight, Math.ceil(cellHeight));
          }
        }
      } else if (cell.classList.contains("time") && !cell.classList.contains("head")) {
        // Только ячейки времени, которые не являются заголовками
        const height = cell.scrollHeight;
        maxRowHeight = Math.max(maxRowHeight, Math.ceil(height));
      }
    });
    
    // Добавляем минимальную высоту из настроек
    const minSlotH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--slotH"),
    ) || 72;
    
    maxRowHeight = Math.max(maxRowHeight, minSlotH);
    
    // Если есть двойные ячейки, увеличиваем высоту для лучшего отображения
    if (hasDoubleCells) {
      maxRowHeight = Math.max(maxRowHeight, minSlotH * 1.5);
    }
    
    // Устанавливаем высоту только для ячеек данных и времени (не заголовков)
    const roundedHeight = Math.ceil(maxRowHeight);
    rowCells.forEach((cell) => {
      // Пропускаем заголовки
      if (cell.classList.contains("head")) return;
      
      cell.style.height = `${roundedHeight}px`;
      cell.style.minHeight = `${roundedHeight}px`;
      
      // Для ячеек с двойными занятиями дополнительно настраиваем содержимое
      if (cell.dataset.double === "1") {
        const slotInner = cell.querySelector(".slot-inner");
        const eventElements = cell.querySelectorAll(".event.double");
        
        if (slotInner && eventElements.length === 2) {
          // Вычисляем доступную высоту для событий
          const computedStyle = getComputedStyle(cell);
          const cellPaddingTop = parseFloat(computedStyle.paddingTop) || 0;
          const cellPaddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
          const cellPadding = cellPaddingTop + cellPaddingBottom;
          
          const slot = cell.querySelector('.slot');
          const slotComputedStyle = getComputedStyle(slot);
          const slotPaddingTop = parseFloat(slotComputedStyle.paddingTop) || 0;
          const slotPaddingBottom = parseFloat(slotComputedStyle.paddingBottom) || 0;
          const slotPadding = slotPaddingTop + slotPaddingBottom;
          
          const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
          const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
          const borders = borderTop + borderBottom;
          
          const availableHeight = roundedHeight - cellPadding - slotPadding - borders;
          const gap = 2;
          const eventHeight = Math.floor((availableHeight - gap) / 2);
          
          // Устанавливаем высоту событий
          eventElements.forEach((el, index) => {
            el.style.height = `${eventHeight}px`;
            el.style.minHeight = `${eventHeight}px`;
            el.style.overflow = 'hidden';
            
            // Настраиваем заголовок
            const title = el.querySelector('.t');
            if (title) {
              const titleClamp = 2;
              title.style.webkitLineClamp = titleClamp;
              title.style.lineClamp = titleClamp;
              title.style.display = '-webkit-box';
              title.style.webkitBoxOrient = 'vertical';
              title.style.overflow = 'hidden';
              title.style.maxHeight = `calc(${eventHeight - 20}px)`;
            }
            
            // Настраиваем мета-информацию
            const meta = el.querySelector('.m');
            if (meta) {
              meta.style.whiteSpace = 'nowrap';
              meta.style.textOverflow = 'ellipsis';
              meta.style.overflow = 'hidden';
            }
          });
          
          // Настраиваем slotInner
          slotInner.style.height = `${availableHeight}px`;
          slotInner.style.minHeight = `${availableHeight}px`;
          slotInner.style.display = 'flex';
          slotInner.style.flexDirection = 'column';
          slotInner.style.gap = `${gap}px`;
        }
      }
    });
  });

  console.log("Высота строк синхронизирована (исключая заголовки)");
}

function calculateAndSetDoubleEventsHeight(cell, slotInner, eventElements) {
  if (!cell.isConnected || !slotInner.isConnected) return;
  
  // Сбрасываем высоты для точного измерения
  eventElements.forEach(el => {
    el.style.height = 'auto';
    el.style.minHeight = 'auto';
    el.style.overflow = 'visible';
    
    // Временно снимаем ограничения с заголовка
    const title = el.querySelector('.t');
    if (title) {
      title.style.webkitLineClamp = 'initial';
      title.style.lineClamp = 'initial';
      title.style.maxHeight = 'none';
      title.style.display = 'block';
    }
    
    // Временно снимаем ограничения с меты
    const meta = el.querySelector('.m');
    if (meta) {
      meta.style.whiteSpace = 'normal';
      meta.style.textOverflow = 'clip';
    }
  });
  
  slotInner.style.height = 'auto';
  slotInner.style.minHeight = 'auto';
  cell.style.height = 'auto';
  cell.style.minHeight = 'auto';
  
  // Принудительный reflow
  slotInner.offsetHeight;
  
  // Измеряем реальную высоту содержимого для каждого события
  let maxEventHeight = 0;
  eventElements.forEach(el => {
    const height = el.scrollHeight;
    maxEventHeight = Math.max(maxEventHeight, height);
  });
  
  // Округляем до целых пикселей
  maxEventHeight = Math.ceil(maxEventHeight);
  
  // Устанавливаем одинаковую высоту для обоих событий
  eventElements.forEach(el => {
    el.style.height = `${maxEventHeight}px`;
    el.style.minHeight = `${maxEventHeight}px`;
    el.style.overflow = 'hidden';
    
    // Восстанавливаем ограничения для заголовка
    const title = el.querySelector('.t');
    if (title) {
      const titleClamp = 2;
      title.style.webkitLineClamp = titleClamp;
      title.style.lineClamp = titleClamp;
      title.style.display = '-webkit-box';
      title.style.webkitBoxOrient = 'vertical';
      title.style.maxHeight = `calc(${maxEventHeight - 24}px)`;
    }
    
    // Восстанавливаем ограничения для меты
    const meta = el.querySelector('.m');
    if (meta) {
      meta.style.whiteSpace = 'nowrap';
      meta.style.textOverflow = 'ellipsis';
    }
  });
  
  // Учитываем gap между событиями
  const gap = 2;
  const totalContentHeight = (maxEventHeight * 2) + gap;
  
  // Устанавливаем высоту для slotInner
  slotInner.style.minHeight = `${Math.ceil(totalContentHeight)}px`;
  slotInner.style.height = `${Math.ceil(totalContentHeight)}px`;
  
  // Вычисляем полную высоту ячейки с учётом всех отступов и границ
  const computedStyle = getComputedStyle(cell);
  const cellPaddingTop = parseFloat(computedStyle.paddingTop) || 0;
  const cellPaddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
  const cellPadding = cellPaddingTop + cellPaddingBottom;
  
  const slotComputedStyle = getComputedStyle(cell.querySelector('.slot'));
  const slotPaddingTop = parseFloat(slotComputedStyle.paddingTop) || 0;
  const slotPaddingBottom = parseFloat(slotComputedStyle.paddingBottom) || 0;
  const slotPadding = slotPaddingTop + slotPaddingBottom;
  
  const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
  const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
  const borders = borderTop + borderBottom;
  
  const cellTotalHeight = totalContentHeight + cellPadding + slotPadding + borders;
  
  // Устанавливаем округлённую высоту ячейки
  cell.style.height = `${Math.ceil(cellTotalHeight)}px`;
  cell.style.minHeight = `${Math.ceil(cellTotalHeight)}px`;
}

function recalculateAllDoubleEventsHeights() {
  const doubleCells = document.querySelectorAll('.cell.droppable[data-double="1"]');
  
  doubleCells.forEach(cell => {
    const slotInner = cell.querySelector('.slot-inner');
    if (!slotInner) return;
    
    const eventElements = Array.from(slotInner.querySelectorAll('.event.double'));
    if (eventElements.length !== 2) return;
    
    calculateAndSetDoubleEventsHeight(cell, slotInner, eventElements);
  });
}

// ==================== ФУНКЦИИ РЕНДЕРА ТАБЛИЦЫ ИЗНАЧАЛЬНОЙ ====================

function renderSchedule() {
  // ✅ Сбрасываем сохраненные данные перед перерисовкой
  if (typeof lastValidDropCell !== 'undefined') {
    lastValidDropCell = null;
    lastValidDropCoords = { x: 0, y: 0 };
    lastValidDropIndices = { dayIndex: -1, slotIndex: -1 };
  }
  
  const scheduleEl = $("schedule");
  if (!scheduleEl) {
    console.error("Элемент schedule не найден!");
    return;
  }
  
  scheduleEl.innerHTML = "";

  const { step } = getBounds();
  const slots = buildSlots();
  const view = state.settings.display.cellView;
  const todayIndex = (new Date().getDay() + 6) % 7;
  const nowHour = pad2(new Date().getHours());

  // Отслеживаем изменение режима отображения
  if (view !== lastCellView) {
    lastCellView = view;
    markGeometryDirtyIfNeeded();
  }

  // Управление классом компактного режима
  scheduleEl.classList.toggle("compact-mode", view === "compact");
  
  const sw = document.querySelector(".schedule-wrap");
  if (sw) {
    sw.classList.toggle("is-compact", view === "compact");
  }

  // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
  
  /**
   * Создает карточку события для компактного режима
   */
  function createCompactEventCard(ev) {
    const dir = getDir(ev.directionId);
    const color = dir?.color || "#64748b";
    const text = bestTextOn(color);

    const el = document.createElement("div");
    el.className = "event compact-card";
    el.dataset.eid = ev.id;
    if (!memoizedEventVisible(ev)) el.classList.add("dim");

    el.style.setProperty("--ev-bg", color);
    el.style.setProperty("--ev-text", text);

    // Настройка перетаскивания
    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (de) => {
      de.dataTransfer.setData("text/event-id", ev.id);
      de.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    // Обработчик клика
    el.addEventListener("click", (ce) => {
      ce.stopPropagation();
      openEdit(ev.id);
    });

    // Показать/скрыть grab-иконку при наведении
    el.addEventListener('mouseenter', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'block';
    });
    
    el.addEventListener('mouseleave', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'none';
    });

    // Заголовок события
    const title = document.createElement("div");
    title.className = "t";
    title.textContent = fixTypography(ev.name) || "Без названия";
    el.appendChild(title);

    // Мета-информация (тренер, зал)
    const metaText = metaCoachRoom(ev, true);
    if (metaText) {
      const meta = document.createElement("div");
      meta.className = "m";
      meta.textContent = metaText;
      el.appendChild(meta);
    }

    // Grab-иконка для перетаскивания
    const grab = document.createElement("div");
    grab.className = "grab";
    grab.textContent = "↕";
    grab.style.display = 'none';
    el.appendChild(grab);

    // Подсказка при наведении
    if (state.settings.display.showNotes) {
      const tooltip = [
        `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
        ev.coach,
        ev.room,
        dir?.name,
        ev.notes && `📝 ${ev.notes}`
      ].filter(Boolean).join(" · ");
      
      el.title = tooltip;
    }

    return el;
  }

  /**
   * Создает событие для режима списка
   */
  function createListEvent(ev, isDouble = false) {
    const dir = getDir(ev.directionId);
    const color = dir?.color || "#64748b";
    const text = bestTextOn(color);

    const el = document.createElement("div");
    el.className = `event list${isDouble ? " double" : ""}`;
    el.dataset.eid = ev.id;
    if (!memoizedEventVisible(ev)) el.classList.add("dim");
    el.style.setProperty("--ev-bg", color);
    el.style.setProperty("--ev-text", text);

    // Настройка перетаскивания
    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (de) => {
      de.dataTransfer.setData("text/event-id", ev.id);
      de.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    // Обработчик клика
    el.addEventListener("click", (ce) => {
      ce.stopPropagation();
      openEdit(ev.id);
    });

    // Показать/скрыть grab-иконку при наведении
    el.addEventListener('mouseenter', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'block';
    });
    
    el.addEventListener('mouseleave', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'none';
    });

    // Заголовок
    const title = document.createElement("div");
    title.className = "t";
    const sanitizedTitle = sanitizeEventName(ev.name);
    title.textContent = fixTypography(sanitizedTitle) || "Без названия";
    el.appendChild(title);

    // Мета-информация
    const metaText = isDouble ? metaCoachRoom(ev, true) : metaFullByMode(ev);
    if (metaText) {
      const meta = document.createElement("div");
      meta.className = "m";
      meta.textContent = metaText;
      el.appendChild(meta);
    }

    // Grab-иконка
    const grab = document.createElement("div");
    grab.className = "grab";
    grab.textContent = "↕";
    grab.style.display = 'none';
    el.appendChild(grab);

    // Подсказка
    if (state.settings.display.showNotes) {
      const tooltip = [
        `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
        ev.coach,
        ev.room,
        dir?.name,
        ev.notes && "— " + ev.notes
      ].filter(Boolean).join("\n");
      
      el.title = tooltip;
    }

    return el;
  }

  /**
   * Создает событие для режима timeline (двойное)
   */
  function createTimelineDoubleEvent(ev, slotInner) {
    const dir = getDir(ev.directionId);
    const color = dir?.color || "#64748b";
    const text = bestTextOn(color);

    const el = document.createElement("div");
    el.className = "event double";
    el.dataset.eid = ev.id;
    if (!memoizedEventVisible(ev)) el.classList.add("dim");
    el.style.setProperty("--ev-bg", color);
    el.style.setProperty("--ev-text", text);

    // Flex-раскладка для двойных событий
    Object.assign(el.style, {
      display: "flex",
      flexDirection: "column",
      padding: "4px 6px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      flex: "1",
      minHeight: "0"
    });

    // Настройка перетаскивания
    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (de) => {
      de.dataTransfer.setData("text/event-id", ev.id);
      de.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    // Обработчик клика
    el.addEventListener("click", (ce) => {
      ce.stopPropagation();
      openEdit(ev.id);
    });

    // Показать/скрыть grab-иконку при наведении
    el.addEventListener('mouseenter', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'block';
    });
    
    el.addEventListener('mouseleave', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'none';
    });

    // Заголовок с ограничением в 2 строки
    const title = document.createElement("div");
    title.className = "t";
    title.textContent = fixTypography(ev.name);
    Object.assign(title.style, {
      webkitLineClamp: "2",
      lineClamp: "2",
      overflow: "hidden",
      display: "-webkit-box",
      webkitBoxOrient: "vertical",
      flexShrink: "0",
      marginBottom: "2px"
    });
    el.appendChild(title);

    // Мета-информация
    const metaText = metaCoachRoom(ev, true);
    if (metaText) {
      const meta = document.createElement("div");
      meta.className = "m";
      meta.textContent = metaText;
      Object.assign(meta.style, {
        flexShrink: "0",
        marginTop: "auto",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "calc(100% - 20px)"
      });
      el.appendChild(meta);
    }

    // Grab-иконка
    const grab = document.createElement("div");
    grab.className = "grab";
    grab.textContent = "↕";
    Object.assign(grab.style, {
      position: "absolute",
      right: "4px",
      bottom: "4px",
      fontSize: "12px",
      opacity: "0.5",
      cursor: "move",
      display: 'none'
    });
    el.appendChild(grab);

    // Подсказка
    if (state.settings.display.showNotes) {
      const tooltip = [
        `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
        ev.coach,
        ev.room,
        dir?.name,
        ev.notes && `📝 ${ev.notes}`
      ].filter(Boolean).join(" · ");
      
      el.title = tooltip;
    }

    return el;
  }

  /**
   * Создает событие для режима timeline (одиночное)
   */
  function createTimelineSingleEvent(ev) {
    const dir = getDir(ev.directionId);
    const color = dir?.color || "#64748b";
    const text = bestTextOn(color);

    const el = document.createElement("div");
    el.className = "event";
    el.dataset.eid = ev.id;
    if (!memoizedEventVisible(ev)) el.classList.add("dim");
    el.style.setProperty("--ev-bg", color);
    el.style.setProperty("--ev-text", text);

    // Настройка перетаскивания
    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (de) => {
      de.dataTransfer.setData("text/event-id", ev.id);
      de.dataTransfer.effectAllowed = "move";
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    // Обработчик клика
    el.addEventListener("click", (ce) => {
      ce.stopPropagation();
      openEdit(ev.id);
    });

    // Показать/скрыть grab-иконку при наведении
    el.addEventListener('mouseenter', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'block';
    });
    
    el.addEventListener('mouseleave', () => {
      const grab = el.querySelector('.grab');
      if (grab) grab.style.display = 'none';
    });

    // Заголовок
    const title = document.createElement("div");
    title.className = "t";
    title.textContent = fixTypography(ev.name);
    el.appendChild(title);

    // Мета-информация
    const metaText = metaFullByMode(ev);
    if (metaText) {
      const meta = document.createElement("div");
      meta.className = "m";
      meta.textContent = metaText;
      el.appendChild(meta);
    }

    // Grab-иконка
    const grab = document.createElement("div");
    grab.className = "grab";
    grab.textContent = "↕";
    grab.style.display = 'none';
    el.appendChild(grab);

    // Подсказка
    if (state.settings.display.showNotes) {
      const tooltip = [
        `${minToHHMM(ev.startMin)}–${minToHHMM(ev.startMin + ev.durationMin)}`,
        ev.coach,
        ev.room,
        dir?.name,
        ev.notes && `📝 ${ev.notes}`
      ].filter(Boolean).join(" · ");
      
      el.title = tooltip;
    }

    return el;
  }

  /**
   * Создает пустой слот с подсказкой
   */
  function createEmptySlot(isCompact = false) {
    const hint = document.createElement("div");
    hint.className = "empty-slot";
    hint.textContent = isCompact ? "Нет занятий" : "Клик для добавления";
    return hint;
  }

  /**
   * Создает ячейку с событиями
   */
  function createCellWithEvents(dayIndex, slotStart, slotEnd, slotIndex, isCompact = false) {
    const cell = mkCell("cell droppable", "");
    cell.dataset.slotIndex = String(slotIndex || 0);
    
    // ✅ ДОБАВЛЯЕМ атрибут с днём недели
    cell.dataset.dayIndex = String(dayIndex);

    // Подсветка сегодняшнего дня
    if (dayIndex === todayIndex && state.settings.display.showTodayHighlight) {
      cell.classList.add("col-today");
    }

    const slot = document.createElement("div");
    slot.className = `slot${isCompact ? " compact-mode" : ""}`;
    
    if (!isCompact) {
      const viewMode = state.settings.display.cellView;
      if (viewMode === "list") slot.classList.add("list-mode");
      if (viewMode === "timeline") slot.classList.add("tl-fill");
    }

    const slotInner = document.createElement("div");
    slotInner.className = "slot-inner";
    slot.appendChild(slotInner);

    // Фильтрация событий для ячейки
    const eventsInCell = state.events.filter(ev => {
      if (isCompact) {
        return ev.dayIndex === dayIndex;
      }
      return ev.dayIndex === dayIndex &&
             ev.startMin >= slotStart &&
             ev.startMin < slotEnd;
    }).sort((a, b) => a.startMin - b.startMin);

    const count = eventsInCell.length;

    // Пустая ячейка
    if (count === 0 && state.settings.display.showEmptyHint) {
      slotInner.appendChild(createEmptySlot(isCompact));
    } 
    // Компактный режим
    else if (isCompact) {
      eventsInCell.forEach(ev => slotInner.appendChild(createCompactEventCard(ev)));
    } 
    // Режим списка
    else if (state.settings.display.cellView === "list") {
      eventsInCell.forEach(ev => slotInner.appendChild(createListEvent(ev, count === 2)));
      
      // Настройка двойных ячеек
      if (count === 2) {
        cell.dataset.double = "1";
        Object.assign(slotInner.style, {
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          height: "100%",
          minHeight: "0"
        });
        
        // Настройка flex-распределения
        slotInner.querySelectorAll('.event.list.double').forEach(el => {
          el.style.flex = "1";
          el.style.minHeight = "0";
          el.style.overflow = "hidden";
          
          const title = el.querySelector('.t');
          if (title) {
            Object.assign(title.style, {
              webkitLineClamp: "2",
              lineClamp: "2",
              display: '-webkit-box',
              webkitBoxOrient: 'vertical',
              overflow: 'hidden'
            });
          }
          
          const meta = el.querySelector('.m');
          if (meta) {
            Object.assign(meta.style, {
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            });
          }
        });
      }
    } 
    // Режим timeline
    else {
      if (count === 2) {
        slot.classList.add("two");
        cell.dataset.double = "1";

        // Flex-раскладка для двойных событий
        Object.assign(slotInner.style, {
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          height: "100%",
          minHeight: "0"
        });

        const sortedEvents = [...eventsInCell].sort((a, b) => a.startMin - b.startMin);
        const eventElements = [];
        
        sortedEvents.forEach(ev => {
          const el = createTimelineDoubleEvent(ev, slotInner);
          eventElements.push(el);
          slotInner.appendChild(el);
        });

        // Вычисление высоты после рендеринга
        setTimeout(() => {
          calculateAndSetDoubleEventsHeight(cell, slotInner, eventElements);
        }, 10);
      } else {
        cell.dataset.double = "";
        eventsInCell.forEach(ev => slotInner.appendChild(createTimelineSingleEvent(ev)));
      }
    }

    // Обработчик клика по пустой области ячейки
    cell.addEventListener("click", (e) => {
      const isCompactMode = state.settings.display.cellView === "compact";
      
      if (isCompactMode && count === 0) {
        const start = parseHHMM(state.settings.schedule.start) || 540;
        smartOpenCreate(dayIndex, start);
      } else if (!isCompactMode) {
        smartOpenCreate(dayIndex, slotStart, slotEnd);
      }
    });

    // Обработчики drag & drop (только для timeline/list)
    if (!isCompact) {
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

        const ev = state.events.find(x => x.id === id);
        if (!ev) return;

        smartMoveEvent(id, dayIndex, slotStart, "Перемещение drag&drop");
      });
    }

    cell.appendChild(slot);
    return cell;
  }

  // ===== РЕНДЕРИНГ =====

  // Колонка времени (только если не компактный режим)
  if (view !== "compact") {
    scheduleEl.appendChild(mkCell("cell head time", ""));
  }

  // Заголовки дней — всегда
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

  // ===== КОМПАКТНЫЙ РЕЖИМ =====
  if (view === "compact") {
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const cell = createCellWithEvents(dayIndex, null, null, null, true);
      scheduleEl.appendChild(cell);
    }
  } 
  // ===== TIMELINE / LIST =====
  else {
    slots.forEach((slotStart, slotIndex) => {
      const slotEnd = slotStart + step;

      // Колонка времени
      const tCell = mkCell("cell time", minToHHMM(slotStart));
      scheduleEl.appendChild(tCell);

      // Ячейки дней
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cell = createCellWithEvents(dayIndex, slotStart, slotEnd, slotIndex);
        scheduleEl.appendChild(cell);
      }
    });
    
    // Синхронизация геометрии после рендеринга
    setTimeout(() => {
      if (view === "list") {
        syncListGeometry(scheduleEl);
      } else if (view === "timeline") {
        syncTimelineGeometry(scheduleEl);
      }
    }, 0);
  }

  // Инициализация SortableJS
  setTimeout(() => {
    initSortableJS();
  }, 100);

  // Скрытие подсказки о пустом расписании
  const emptyHint = $("emptyHint");
  if (emptyHint) {
    emptyHint.hidden = state.events.length !== 0;
  }

  // Обработчик для кнопок действий дней
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
}

function renderScheduleOnly() {
    renderSchedule();
    renderStats();
    updateFilterChips();
    markGeometryDirtyIfNeeded();
    
    // Обновляем логотип только если он включен
    if (window.logoManager && state.settings.logo?.enabled) {
        try {
            window.logoManager.update();
        } catch (error) {
            console.error("Ошибка обновления логотипа:", error);
        }
    }
}

function onLayoutSettingsChanged() {
  markGeometryDirtyIfNeeded();
}

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
    const shown = visibleCount !== null 
        ? visibleCount 
        : state.events.filter(memoizedEventVisible).length;
    
    const statsEl = $("stats");
    if (statsEl) {
        statsEl.textContent = total 
            ? `Показано: ${shown}/${total}` 
            : "Нет занятий";
    }
    
    updateFilterChips();
}

function updateFilterChips() {
    const counts = countByDirection();
    const chips = document.querySelectorAll("#dirGroup .chip");
    
    for (const chip of chips) {
        const dirId = chip.dataset.dirId;
        if (!dirId) continue;
        
        const countEl = chip.querySelector(".count");
        if (countEl && counts[dirId] !== undefined) {
            countEl.textContent = String(counts[dirId]);
        }
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
  renderScheduleOnly();
  closeEventModal();
}

function deleteEventFromModal() {
  const id = evId.value;
  if (!id) return;
  if (!confirm("Удалить занятие?")) return;
  pushHistory("Удаление занятия");
  state.events = state.events.filter((e) => e.id !== id);
  saveState();
  renderScheduleOnly();
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
  renderScheduleOnly();
  closeEventModal();
  toast("OK", "Дублировано", "Копия добавлена.");
}

function smartMoveEvent(id, toDay, toSlotStart, reason, durationMin = null) {
  const { start, end, step } = getBounds();
  const idx = state.events.findIndex((e) => e.id === id);
  if (idx < 0) {
    toast("ERR", "Ошибка", "Событие не найдено", 2000);
    return;
  }

  const ev = state.events[idx];
  
  // ✅ Используем переданную продолжительность или берем из события
  const eventDuration = durationMin !== null ? durationMin : ev.durationMin;

  if (toSlotStart < start || toSlotStart >= end) {
    toast(
      "WARN",
      "Нельзя переместить",
      "Целевое время вне диапазона расписания",
      2000,
    );
    return;
  }

  // ✅ Используем правильную продолжительность для валидации
  const validation = validateTimeSlot(toDay, toSlotStart, eventDuration, id);
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
      // ✅ СОХРАНЯЕМ ОТНОСИТЕЛЬНОЕ ВРЕМЯ ВНУТРИ СЛОТА
      const fromSlotStart = slotStartFor(ev.startMin);
      const relativeTime = ev.startMin - fromSlotStart;
      targetStartTime = slotStart + relativeTime;

      // Если время выходит за пределы слота, сбрасываем на начало
      // ✅ Используем правильную продолжительность
      if (targetStartTime + eventDuration > slotEnd) {
        targetStartTime = slotStart;
      }
    } else {
      targetStartTime = slotStart;
    }
  }

  pushHistory(reason || "Перемещение занятия");
  state.events[idx].dayIndex = toDay;
  state.events[idx].startMin = targetStartTime;
  
  // ✅ Обновляем продолжительность только если она была передана
  if (durationMin !== null) {
    state.events[idx].durationMin = durationMin;
  }
  
  clearFilterCache();
  saveState(true);
  renderScheduleOnly();

  const dayName = DAYS[toDay] || `День ${toDay + 1}`;
  toast(
    "OK",
    "Перемещено",
    `${ev.name} → ${dayName} ${minToHHMM(targetStartTime)}`,
    2000,
  );
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

  // Не изменяем themeMode здесь, это делается в openSettings()
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

  if (themeMode && themeMode.value === "custom") {
    state.settings.theme.mode = "custom";
  }

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

// Обновленная функция waitForResources с улучшенной обработкой изображений

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

function updateLogoCSSVariables() {
  const style = document.documentElement.style;

  // Получаем реальные размеры из CSS
  const computedStyle = getComputedStyle(document.documentElement);
  const timeColWidth = computedStyle.getPropertyValue("--timeCol") || "46px";
  const dayHeadHeight = "42px"; // Фиксированная высота заголовков из CSS

  // Устанавливаем CSS переменные для логотипа
  style.setProperty("--time-col-width", timeColWidth);
  style.setProperty("--day-head-height", dayHeadHeight);
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
  
  // Устанавливаем значение по умолчанию для скрытия пустых слотов
  if (expHideEmpty) {
    expHideEmpty.value = "no"; // По умолчанию НЕ скрывать
  }
  
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

let currentPreviewObjectUrl = null;

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

function displaySvgPreview(svgDataUrl) {
  const previewFrame = document.querySelector(".export-preview-frame");
  if (!previewFrame) return;

  // Удаляем старый предпросмотр и освобождаем память
  const oldPreview = previewFrame.querySelector("#expPreviewObject");
  if (oldPreview) {
    // Освобождаем object URL если он используется
    if (oldPreview.data && currentPreviewObjectUrl) {
      URL.revokeObjectURL(currentPreviewObjectUrl);
      currentPreviewObjectUrl = null;
    }
    oldPreview.remove();
  }

  // Для SVG создаем object URL для отображения
  try {
    // Декодируем SVG из data URL для создания чистого object URL
    if (svgDataUrl.startsWith("data:image/svg+xml;base64,")) {
      const base64Data = svgDataUrl.split(",")[1];
      const svgText = atob(base64Data);
      const svgBlob = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8",
      });
      const objectUrl = URL.createObjectURL(svgBlob);
      currentPreviewObjectUrl = objectUrl;

      // Создаем object для отображения SVG
      const previewObject = document.createElement("object");
      previewObject.id = "expPreviewObject";
      previewObject.type = "image/svg+xml";
      previewObject.data = objectUrl;
      previewObject.style.cssText = `
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                display: block;
                object-fit: contain;
            `;

      // Освобождаем object URL после загрузки
      previewObject.onload = function () {
        setTimeout(() => {
          // Мы сохраняем URL для последующего освобождения при закрытии
        }, 1000);
      };

      previewFrame.appendChild(previewObject);
    } else {
      // Если не base64, используем как есть (но это менее безопасно для памяти)
      const previewObject = document.createElement("object");
      previewObject.id = "expPreviewObject";
      previewObject.type = "image/svg+xml";
      previewObject.data = svgDataUrl;
      previewObject.style.cssText = `
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                display: block;
                object-fit: contain;
            `;

      previewFrame.appendChild(previewObject);
    }
  } catch (error) {
    console.error("Ошибка отображения предпросмотра:", error);
    // Fallback: отображаем сообщение
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

  // Очищаем данные предпросмотра
  lastPreview = null;

  console.log("Кэш предпросмотра очищен");
}

function setupExportModalEventListeners() {
  // Находим модальное окно экспорта
  const exportModal = document.querySelector('.modal[data-modal="export"]');
  if (!exportModal) {
    console.warn("Модальное окно экспорта не найдено");
    return;
  }

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    console.log("Модальное окно экспорта закрыто, очищаем кэш");
    clearPreviewCache();
  };

  // Находим кнопку закрытия
  const closeButtons = exportModal.querySelectorAll(
    '[data-dismiss="modal"], .modal-close, .btn-close',
  );
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", handleModalClose);
  });

  // Обработчик клика вне модального окна (если есть backdrop)
  exportModal.addEventListener("click", function (event) {
    if (event.target === this && this.classList.contains("modal")) {
      handleModalClose();
    }
  });

  // Также очищаем кэш при скрытии модального окна через Bootstrap (если используется)
  $(exportModal).on("hidden.bs.modal", handleModalClose);

  console.log("Обработчики очистки кэша установлены");
}

async function executeExport(opts) {
  // Всегда используем SVG экспорт
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

  // 3. Скрываем пустые строки (только если параметр включен)
  const hiddenRows = hideEmpty ? hideEmptyTimeRows(clone, {
    respectFilters: false,
    keepNowRow: false,
  }) : [];

  // 4. Фиксируем шапку
  const headEls = Array.from(clone.querySelectorAll(".cell.head"));
  headEls.forEach((el) => {
    el.style.position = "static";
    el.style.top = "auto";
    el.style.zIndex = "auto";
  });

  // 5. Создаем элементы логотипа
  const lg = state.settings.logo;
  let logoLayer = clone.querySelector("#logoLayer");
  let logoMark = clone.querySelector("#logoMark");

  if (lg.enabled) {
    if (!logoLayer) {
      logoLayer = document.createElement("div");
      logoLayer.id = "logoLayer";
      clone.querySelector(".schedule-wrap")?.prepend(logoLayer);
    }
    if (!logoMark) {
      logoMark = document.createElement("div");
      logoMark.id = "logoMark";
      logoLayer.appendChild(logoMark);
    }
  }

  // 6. Даем браузеру пересчитать layout
  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => setTimeout(r, 50));

  // 7. Измеряем размеры
  const scheduleEl = clone.querySelector(".schedule");
  let width, height;

  if (scheduleEl) {
    const rect = scheduleEl.getBoundingClientRect();
    width = Math.max(
      100,
      Math.ceil(rect.width || scheduleEl.scrollWidth || 800),
    );
    height = Math.max(
      100,
      Math.ceil(rect.height || scheduleEl.scrollHeight || 600),
    );

    // Устанавливаем размеры НА КОНТЕЙНЕР
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.overflow = "visible";

    // Расписание растягивается на контейнер
    scheduleEl.style.width = "100%";
    scheduleEl.style.height = "100%";
    scheduleEl.style.position = "relative";
  } else {
    width = Math.max(100, Math.ceil(metrics.scheduleWidth || 800));
    height = Math.max(100, Math.ceil(metrics.scheduleHeight || 600));
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
  }

  // 8. ПРИМЕНЯЕМ ПОЛНЫЕ СТИЛИ ДЛЯ ЭКСПОРТА (после измерений!)
  applyCssVariablesToEventsForExport(clone);

  // 9. Применяем логотип ПОСЛЕ измерений
  if (lg.enabled) {
    await applyLogoToExport(clone, lg, metrics, format);
  }

  // 10. Дополнительная фиксация для двойных ячеек
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
  
  const { clone, cleanup, width, height } = prepared;
  
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
    
    console.log(`SVG экспорт: размеры ${width}x${height}, фон ${bgColor}`);
    
    // 10. Генерируем SVG
    const dataUrl = await htmlToImage.toSvg(clone, {
      backgroundColor: bgColor,
      width: width,
      height: height,
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
  
  // Добавляем параметр скрытия пустых слотов
  const hideEmpty = expHideEmpty.value === "yes";

  return { preset, fmt, imageFormat, quality, background, compact, hideEmpty };
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
  clone.style.position = "static";
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
    scheduleEl.querySelectorAll(".cell, .slot, .event").forEach((el) => {
      el.style.display = "block"; // Убедиться, что отображается
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
  logoLayer.style.zIndex = "0"; // <-- КРИТИЧЕСКИ: Под расписанием
  logoLayer.style.overflow = "hidden";
  logoLayer.style.display = "block";

  // Применяем фоновые стили напрямую
  logoLayer.style.backgroundColor = lg.bg || "transparent";
  if (lg.url) {
    logoLayer.style.backgroundImage = `url("${lg.url}")`;
    logoLayer.style.backgroundRepeat = lg.repeat || "no-repeat";
    logoLayer.style.backgroundPosition = lg.pos || "center";
    logoLayer.style.backgroundSize = lg.size || "contain";
  } else {
    logoLayer.style.backgroundImage = "none";
  }

  logoMark.style.position = "absolute";
  logoMark.style.pointerEvents = "none";
  logoMark.style.zIndex = "0"; // <-- КРИТИЧЕСКИ: Под расписанием
  logoMark.style.opacity = (lg.opacity || 12) / 100;
  logoMark.style.display = "block";

  // Расписание НАД логотипом
  const scheduleEl = element.querySelector(".schedule");
  if (scheduleEl) {
    scheduleEl.style.position = "relative";
    scheduleEl.style.zIndex = "1"; // Над логотипом
  }

  // Применяем содержимое логотипа (центральный, тайловый и т.д.)
  try {
    const variant = getLogoVariant();
    const layout = lg.layout || "center";
    const opacity = (lg.opacity || 12) / 100;

    if (layout === "center") {
      await applyCenteredLogo(logoMark, lg, metrics, variant, opacity);
    } else if (layout === "tile" || layout === "diagonal") {
      await applyTiledLogo(logoMark, lg, metrics, variant, opacity, layout);
    }
  } catch (error) {
    console.error("Ошибка применения логотипа:", error);
    logoLayer.style.display = "none";
    logoMark.style.display = "none";
  }
}

async function applyCenteredLogo(logoMark, lg, metrics, variant, opacity) {
  const tileSize = Math.max(100, Math.min(1000, Number(lg.tileSize) || 140));
  const halfSize = tileSize / 2;

  const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
  const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;

  const leftBoundary = metrics.timeColWidth;
  const rightBoundary = metrics.timeColWidth + metrics.contentWidth;
  const topBoundary = metrics.dayHeadHeight;
  const bottomBoundary = metrics.dayHeadHeight + metrics.contentHeight;

  let left = centerX - halfSize;
  let top = centerY - halfSize;
  let finalTileSize = tileSize;

  if (left < leftBoundary) left = leftBoundary;
  if (left + finalTileSize > rightBoundary)
    left = rightBoundary - finalTileSize;
  if (top < topBoundary) top = topBoundary;
  if (top + finalTileSize > bottomBoundary)
    top = bottomBoundary - finalTileSize;

  if (rightBoundary - leftBoundary < finalTileSize) {
    finalTileSize = rightBoundary - leftBoundary;
    left = leftBoundary;
  }
  if (bottomBoundary - topBoundary < finalTileSize) {
    finalTileSize = Math.min(finalTileSize, bottomBoundary - topBoundary);
    top = topBoundary;
  }

  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${opacity};
    width: ${finalTileSize}px;
    height: ${finalTileSize}px;
    left: ${left}px;
    top: ${top}px;
    transform: rotate(${lg.rotation || 0}deg);
  `;

  const src = getLogoDataUrl(variant, lg.recolor ? lg.color : null, lg.opacity);
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

function createFinalCanvas(sourceCanvas, fmt, background = null) {
  const final = document.createElement("canvas");
  final.width = fmt.w;
  final.height = fmt.h;

  const ctx = final.getContext("2d", {
    alpha: background === null,
    willReadFrequently: false,
  });

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
  ctx.imageSmoothingQuality = "high";

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

async function downloadFromExportModal() {
  const opts = getExportOptsFromUI();

  try {
    toast("INFO", "Экспорт", "Создаем изображение…");

    // ВСЕГДА создаем новый SVG при скачивании (чтобы скачивалось актуальное)
    try {
      const svgOpts = { ...opts, fmt: "svg" };
      const exportResult = await executeExport(svgOpts);

      if (!exportResult || !exportResult.dataUrl) {
        toast("ERR", "Экспорт", "Не удалось создать изображение");
        return;
      }

      // Сохраняем для будущих скачиваний (кэш)
      lastPreview = {
        dataUrl: exportResult.dataUrl,
        originalOpts: opts,
        ...svgOpts,
        timestamp: Date.now(),
      };

      // КРИТИЧНО: ОТОБРАЖАЕМ предпросмотр перед скачиванием!
      displaySvgPreview(exportResult.dataUrl);

      toast("OK", "Экспорт", "Изображение создано, начинаем скачивание…");
    } catch (error) {
      console.error("Ошибка создания изображения:", error);
      toast("ERR", "Экспорт", "Не удалось создать изображение для скачивания");
      return;
    }

    // Даем время на отображение предпросмотра (один кадр анимации)
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Дальше идет процесс скачивания...
    toast("INFO", "Экспорт", "Подготовка скачивания…");

    let finalDataUrl;
    let fileName;
    const stamp = new Date().toISOString().slice(0, 10);
    const timestamp = new Date().toISOString().slice(11, 19).replace(/:/g, "-");

    if (opts.fmt === "svg") {
      // SVG — скачиваем как есть
      finalDataUrl = lastPreview.dataUrl;
      fileName = `schedule-${opts.preset.id}-${stamp}_${timestamp}.svg`;
      toast("INFO", "Экспорт", "Подготавливаем SVG файл…");
    } else {
      // PNG/JPEG — конвертируем из SVG
      toast("INFO", "Экспорт", `Конвертация в ${opts.fmt.toUpperCase()}…`);

      try {
        // Конвертируем SVG в Canvas
        const canvas = await svgToCanvas(lastPreview.dataUrl, opts);

        // Применяем пресет если нужно
        let finalCanvas = canvas;
        if (opts.preset.id !== "auto") {
          toast("INFO", "Экспорт", "Применяем размеры пресета…");
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

        // Конвертируем в нужный формат
        toast("INFO", "Экспорт", "Завершаем конвертацию…");
        finalDataUrl = finalCanvas.toDataURL(opts.imageFormat, opts.quality);
        fileName = `schedule-${opts.preset.id}-${stamp}_${timestamp}.${opts.fmt === "jpeg" ? "jpg" : "png"}`;
      } catch (error) {
        console.error("Ошибка конвертации:", error);
        toast("ERR", "Экспорт", "Ошибка конвертации изображения");
        return;
      }
    }

    // Скачиваем файл
    downloadFile(finalDataUrl, fileName);

    toast("OK", "Экспорт", `Файл "${fileName}" скачан.`);
  } catch (error) {
    console.error("Download error:", error);
    toast("ERR", "Скачивание", error?.message || "Ошибка при скачивании файла");
  }
}

async function svgToCanvas(svgDataUrl, opts) {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Загружаем SVG как изображение
      const img = await loadImageFromDataUrl(svgDataUrl);

      // 2. Получаем размеры SVG
      let svgWidth = img.naturalWidth || img.width;
      let svgHeight = img.naturalHeight || img.height;

      // Если размеры нулевые, устанавливаем значения по умолчанию
      if (svgWidth === 0 || svgHeight === 0) {
        svgWidth = 800;
        svgHeight = 600;
        console.warn(
          "SVG имеет нулевой размер, используем размеры по умолчанию",
        );
      }

      console.log(`Размеры SVG: ${svgWidth}x${svgHeight}`);

      // 3. Создаем Canvas
      const canvas = document.createElement("canvas");

      // Устанавливаем размеры в зависимости от пресета
      if (opts.preset.id === "auto") {
        canvas.width = svgWidth;
        canvas.height = svgHeight;
      } else {
        canvas.width = opts.preset.w;
        canvas.height = opts.preset.h;
      }

      const ctx = canvas.getContext("2d", {
        alpha: opts.fmt !== "jpeg",
        willReadFrequently: false,
      });

      // 4. Для JPEG заливаем фон
      if (opts.fmt === "jpeg") {
        ctx.fillStyle = opts.background || "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 5. Включаем сглаживание
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 6. Рисуем SVG на Canvas
      if (opts.preset.id === "auto") {
        // Если пресет "auto", рисуем в оригинальном размере
        ctx.drawImage(img, 0, 0);
      } else {
        // Если выбран пресет, масштабируем
        const scale = Math.min(
          canvas.width / svgWidth,
          canvas.height / svgHeight,
        );
        const width = svgWidth * scale;
        const height = svgHeight * scale;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        ctx.drawImage(img, x, y, width, height);
      }

      resolve(canvas);
    } catch (error) {
      console.error("Ошибка в svgToCanvas:", error);

      // Fallback: создаем простой canvas с сообщением об ошибке
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");

        // Фон
        ctx.fillStyle =
          opts.fmt === "jpeg" ? opts.background || "#ffffff" : "transparent";
        ctx.fillRect(0, 0, 800, 600);

        // Сообщение об ошибке
        ctx.fillStyle = "#ff0000";
        ctx.font = "20px Arial";
        ctx.fillText("Ошибка конвертации SVG", 50, 50);
        ctx.fillStyle = "#000000";
        ctx.font = "16px Arial";
        ctx.fillText("Не удалось преобразовать SVG в изображение", 50, 100);
        ctx.fillText(
          "Попробуйте сохранить как SVG или пересоздать предпросмотр",
          50,
          130,
        );

        resolve(canvas);
      } catch (fallbackError) {
        reject(new Error("Не удалось создать изображение: " + error.message));
      }
    }
  });
}

function downloadFile(dataUrl, fileName) {
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
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Для SVG устанавливаем crossOrigin, если это не data URL
    if (!dataUrl.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => {
      // Проверяем, загрузилось ли изображение
      if (img.width === 0 || img.height === 0) {
        console.warn("Изображение имеет нулевой размер, но загружено");
        resolve(img); // Все равно разрешаем, размер будет установлен позже
      } else {
        resolve(img);
      }
    };

    img.onerror = (err) => {
      console.error(
        "Ошибка загрузки изображения:",
        err,
        dataUrl.substring(0, 100),
      );
      reject(new Error("Не удалось загрузить изображение"));
    };

    img.src = dataUrl;

    // Таймаут 15 секунд для больших SVG
    setTimeout(() => {
      if (!img.complete) {
        console.warn(
          "Таймаут загрузки изображения, проверяем текущее состояние",
        );
        // Проверяем, загрузилось ли частично
        if (img.width > 0 || img.height > 0) {
          resolve(img); // Частично загружено
        } else {
          reject(new Error("Таймаут загрузки изображения"));
        }
      }
    }, 15000);
  });
}

function setupExportDownloadButton() {
  const downloadBtn = document.querySelector("#btnExpDownload");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadFromExportModal);
  }
}

window.downloadFromExportModal = downloadFromExportModal;
window.setupExportDownloadButton = setupExportDownloadButton;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupExportDownloadButton);
} else {
  setupExportDownloadButton();
}

// Добавляем обработчик для поля скрытия пустых слотов
if (expHideEmpty) {
  expHideEmpty.addEventListener("change", () => {
    lastPreview = null;
    expPreviewImg.removeAttribute("src");
  });
}

function applyCssVariablesToEvents(clone) {
  const eventEls = clone.querySelectorAll(".event");

  eventEls.forEach((el) => {
    // Показываем событие
    el.style.display = "block";
    el.style.visibility = "visible";
    el.classList.remove("dim");
    el.style.opacity = "1";

    // Копируем вычисленные стили из оригинала
    const originalId = el.dataset.eid;
    if (!originalId) return;

    const original = document.querySelector(`.event[data-eid="${originalId}"]`);
    if (!original) return;

    const cs = getComputedStyle(original);

    // 🔑 УБРАТЬ !important из переменных (ломает тему!)
    const evBg = cs.getPropertyValue("--ev-bg").trim();
    const evText = cs.getPropertyValue("--ev-text").trim();

    if (evBg) {
      el.style.backgroundColor = evBg;
      el.style.setProperty("--ev-bg", evBg); // ← БЕЗ !important
    }

    if (evText) {
      el.style.color = evText;
      el.style.setProperty("--ev-text", evText); // ← БЕЗ !important
    }

    // Копируем остальные стили
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
  const eventOpacity = state.settings.theme.alpha.event / 100;
  const rootStyle = getComputedStyle(document.documentElement);

  eventEls.forEach((el) => {
    const originalId = el.dataset.eid;
    if (!originalId) return;

    const original = document.querySelector(`.event[data-eid="${originalId}"]`);
    if (!original) return;

    const cs = getComputedStyle(original);
    let bgColor = cs.backgroundColor;
    let finalBackgroundColor = bgColor;

    // Обработка прозрачности фона
    if (bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)") {
      const parsedColor = parseRgba(bgColor);
      if (parsedColor) {
        const baseAlpha = parsedColor.a;
        const finalAlpha = baseAlpha * eventOpacity;
        finalBackgroundColor = `rgba(${parsedColor.r}, ${parsedColor.g}, ${parsedColor.b}, ${finalAlpha})`;
      }
    }

    // === 1. Базовые стили события ===
    if (finalBackgroundColor) {
      el.style.backgroundColor = finalBackgroundColor;
    }
    el.style.opacity = "1";
    el.classList.remove("dim");

    // === 2. Отступы и скругления ===
    const isDouble = el.classList.contains("double");
    const isCompact = el.classList.contains("compact-card");
    const isList = el.classList.contains("list");

    if (isDouble) {
      // Для двойных событий - свои отступы
      el.style.padding = "6px 7px";
      el.style.gap = "2px";
      el.style.lineHeight = "1.08";
    } else if (isCompact) {
      // Для компактного режима
      el.style.padding = `${rootStyle.getPropertyValue("--evCardPadY").trim() || "7px"} 8px`;
    } else {
      // Обычные события
      el.style.padding = "7px 8px";
      el.style.paddingTop =
        rootStyle.getPropertyValue("--evCardPadY").trim() || "7px";
      el.style.paddingBottom =
        rootStyle.getPropertyValue("--evCardPadY").trim() || "7px";
    }

    // Скругления
    el.style.borderRadius =
      rootStyle.getPropertyValue("--evCardRadius").trim() || "12px";

    // === 3. Стили для внутренних элементов (.t, .m, .grab) ===
    const titleEl = el.querySelector(".t");
    const metaEl = el.querySelector(".m");
    const grabEl = el.querySelector(".grab");

    if (titleEl) {
      const originalTitle = original.querySelector(".t");
      if (originalTitle) {
        const titleCs = getComputedStyle(originalTitle);

        titleEl.style.fontWeight =
          rootStyle.getPropertyValue("--evTitleW").trim() || "900";
        titleEl.style.fontFamily =
          rootStyle.getPropertyValue("--evTitleFont").trim() ||
          rootStyle.getPropertyValue("--tableFont").trim();
        titleEl.style.lineHeight = "1.3";
        titleEl.style.letterSpacing =
          rootStyle.getPropertyValue("--evLetterSpacing").trim() || "0em";
        titleEl.style.textTransform =
          rootStyle.getPropertyValue("--evTextTransform").trim() || "none";
        titleEl.style.color = titleCs.color;
        titleEl.style.margin = "0";
        titleEl.style.padding = "0";
        titleEl.style.display = "-webkit-box";
        titleEl.style.webkitBoxOrient = "vertical";
        titleEl.style.webkitLineClamp =
          rootStyle.getPropertyValue("--evTitleClamp").trim() || "3";
        titleEl.style.overflow = "hidden";
        titleEl.style.textOverflow = "ellipsis";
        titleEl.style.whiteSpace = "pre-wrap";
        titleEl.style.wordBreak = "break-word";
        titleEl.style.overflowWrap = "anywhere";

        // Размер шрифта зависит от типа события
        if (isDouble) {
          titleEl.style.fontSize =
            rootStyle.getPropertyValue("--evTitleSize2").trim() || "10px";
          titleEl.style.lineHeight = "1.25";
          titleEl.style.webkitLineClamp = "3";
        } else {
          titleEl.style.fontSize =
            rootStyle.getPropertyValue("--evTitleSize1").trim() || "12px";
        }
      }
    }

    if (metaEl) {
      const originalMeta = original.querySelector(".m");
      if (originalMeta) {
        const metaCs = getComputedStyle(originalMeta);

        metaEl.style.fontWeight =
          rootStyle.getPropertyValue("--evMetaW").trim() || "600";
        metaEl.style.fontFamily =
          rootStyle.getPropertyValue("--evMetaFont").trim() ||
          rootStyle.getPropertyValue("--tableFont").trim();
        metaEl.style.color = metaCs.color;
        metaEl.style.opacity = "0.95";
        metaEl.style.margin = "0";
        metaEl.style.padding = "0";
        metaEl.style.whiteSpace = "pre-wrap";
        metaEl.style.wordBreak = "break-word";
        metaEl.style.overflowWrap = "anywhere";

        // Размер шрифта зависит от типа события
        if (isDouble) {
          metaEl.style.fontSize =
            rootStyle.getPropertyValue("--evMetaSize2").trim() || "9px";
        } else {
          metaEl.style.fontSize =
            rootStyle.getPropertyValue("--evMetaSize1").trim() || "11px";
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

    // === 4. Бордер и тени ===
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

    // === 5. Позиционирование для разных режимов ===
    if (isList || isCompact) {
      // В list и compact режимах события не абсолютные
      el.style.position = "relative";
      el.style.left = "auto";
      el.style.top = "auto";
      el.style.width = "100%";
      el.style.height = "auto";
      el.style.flex = "0 0 auto";
    } else if (!isDouble) {
      // Обычные события в timeline
      el.style.position = "absolute";
      el.style.flex = "1 1 auto";
    }
  });

  // === 6. Стили для контейнеров слотов ===
  targetElement.querySelectorAll(".slot-inner").forEach((inner) => {
    const originalInner = document.querySelector(".slot-inner");
    if (!originalInner) return;

    const innerCs = getComputedStyle(originalInner);

    // Для двойных событий в timeline
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

  // === 7. Стили для слотов ===
  targetElement.querySelectorAll(".slot").forEach((slot) => {
    const originalSlot = document.querySelector(".slot");
    if (!originalSlot) return;

    const slotCs = getComputedStyle(originalSlot);

    slot.style.position = "relative";
    slot.style.width = "100%";
    slot.style.fontFamily = slotCs.fontFamily;
    slot.style.boxSizing = "border-box";

    // Для двойных слотов в timeline
    if (slot.classList.contains("two") && slot.classList.contains("tl-fill")) {
      slot.style.height = "100%";
      slot.style.minHeight = "0";
    }
  });
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}
