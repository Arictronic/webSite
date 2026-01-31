// При нажатии на кнопку btnExpPreview выполняется следующий код. Ты как веб программист с 30 летним стажем, архитектор, должен проанализировать есть ли тут ошибки и повторения, и понять что можно улчшить. Помни это веб страница запускается на локально, через файл HTML. Как я понимаю этот код больше не от чего не зависит, только от самого HTML тела которое он запрашивает в элементы. Проверь все, есть ли тут ошибки. Давай все унифицируем, главную функцию оставь buildExportPreview. Скинь только измененные или новые функции, в конце дай список что не изменилось и удалено. Сначала напиши свои размышления и что ты хочешь реализовать, а потом жди ответа от меня

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
      const eventEls = clone.querySelectorAll(".event");

      eventEls.forEach((el) => {
        const cs = getComputedStyle(el);

        const evBg = cs.getPropertyValue("--ev-bg").trim();
        const evText = cs.getPropertyValue("--ev-text").trim();

        if (evBg) {
          el.style.backgroundColor = evBg;
        }

        if (evText) {
          el.style.color = evText;
        }

        const borderColor = cs.borderColor;
        if (borderColor && borderColor !== "rgba(0, 0, 0, 0)") {
          el.style.borderColor = borderColor;
        }

        const boxShadow = cs.boxShadow;
        if (boxShadow && boxShadow !== "none") {
          el.style.boxShadow = boxShadow;
        }
      });


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

function makeExportClone({ compact = false } = {}) {
  const node = document.querySelector(".schedule-wrap");
  if (!node) return { clone: null, cleanup: () => {} };
  
  const wrap = document.createElement("div");
  wrap.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    width: auto;
    height: auto;
    overflow: visible;
    pointer-events: none;
    z-index: -1;
    opacity: 1;
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
  
  // Получаем реальные размеры из оригинального элемента
  const scheduleEl = node.querySelector('.schedule');
  let contentWidth = node.scrollWidth || node.offsetWidth;
  let contentHeight = node.scrollHeight || node.offsetHeight;
  
  // Если есть schedule элемент, используем его размеры
  if (scheduleEl) {
    contentWidth = Math.max(contentWidth, scheduleEl.scrollWidth || scheduleEl.offsetWidth);
    contentHeight = Math.max(contentHeight, scheduleEl.scrollHeight || scheduleEl.offsetHeight);
  }
  
  // Добавляем отступы для безопасности
  contentWidth = Math.max(contentWidth, 100);
  contentHeight = Math.max(contentHeight, 100);
  
  clone.style.width = `${contentWidth}px`;
  clone.style.height = `${contentHeight}px`;
  clone.style.minWidth = `${contentWidth}px`;
  clone.style.minHeight = `${contentHeight}px`;
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

function getThemeBgCssColor() {
  const cs = getComputedStyle(document.documentElement);
  let bg = (cs.getPropertyValue("--bg") || "").trim();
  if (!bg) return "#ffffff";
  if (bg.startsWith("#")) return bg;
  return `#${bg}`;
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

      css += absolutizeCssUrls(rule.cssText, baseHref) + "\n";
    }
  }

  void embedData;

  return css;
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
  
  // Получаем метрики из оригинального документа ДО создания клона
  const originalMetrics = getOriginalScheduleMetrics();
  console.log('Original metrics for export:', originalMetrics);
  
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
    
    // Обновляем логотип в клоне для ВСЕХ режимов
    if (lg.enabled) {
      // Для центрированного режима нужно создать специальный SVG
      if (lg.layout === "center") {
        await applyCenteredLogoToClone(clone, lg, originalMetrics);
      } else {
        // Для остальных режимов используем существующий подход
        await applyTileLogoToClone(clone, lg, originalMetrics);
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
    const w = Math.max(100, Math.ceil(originalMetrics.scheduleWidth || 1));
    const h = Math.max(100, Math.ceil(originalMetrics.scheduleHeight || 1));
    
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
            // Применяем логотип с учетом оригинальных метрик
            if (lg.layout === "center") {
              applyCenteredLogoToClonedDoc(clonedDoc, lg, originalMetrics);
            } else {
              applyLogoToClonedDoc(clonedDoc, lg, originalMetrics);
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

function getExportPresetById(id) {
  return EXPORT_PRESETS.find((p) => p.id === id) || EXPORT_PRESETS[0];
}

function resolveExportBackground(expBg) {
  if (expBg === "transparent") {
    if (expFormat.value === "jpeg") return "#ffffff";
    return null;
  }
  if (expBg === "white") return "#ffffff";
  return getThemeBgCssColor();
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

function parseHHMM(s) {
  const [h, m] = (s || "").split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function buildSlots() {
  const { start, end, step } = getBounds();
  const out = [];
  if (start == null || end == null || step <= 0) return out;
  for (let t = start; t < end; t += step) out.push(t);
  return out;
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

function _firstFontFamily(fontFamily) {
  const first = (fontFamily || "").split(",")[0].trim();
  return first.replace(/^["']|["']$/g, "");
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

function getOriginalScheduleMetrics() {
  const schedule = document.querySelector('.schedule');
  if (!schedule) {
    const computedStyle = getComputedStyle(document.documentElement);
    const timeColWidth = parseFloat(computedStyle.getPropertyValue('--timeCol')) || 76;
    const dayHeadHeight = 42;
    
    const scheduleWrap = document.querySelector('.schedule-wrap');
    let scheduleWidth = 0;
    let scheduleHeight = 0;
    
    if (scheduleWrap) {
      scheduleWidth = scheduleWrap.scrollWidth || scheduleWrap.offsetWidth;
      scheduleHeight = scheduleWrap.scrollHeight || scheduleWrap.offsetHeight;
    }
    
    const contentWidth = Math.max(0, scheduleWidth - timeColWidth);
    const contentHeight = Math.max(0, scheduleHeight - dayHeadHeight);
    
    return {
      timeColWidth,
      dayHeadHeight,
      scheduleWidth,
      scheduleHeight,
      contentWidth,
      contentHeight
    };
  }
  
  // Ищем колонку времени
  let timeColWidth = 76;
  const timeCell = schedule.querySelector('.cell.time');
  if (timeCell) {
    const rect = timeCell.getBoundingClientRect();
    timeColWidth = rect.width;
  } else {
    const computedStyle = getComputedStyle(schedule);
    const cssWidth = parseFloat(computedStyle.getPropertyValue('--timeCol')) || 76;
    timeColWidth = cssWidth;
  }
  
  // Ищем заголовок дня
  let dayHeadHeight = 42;
  const headCell = schedule.querySelector('.cell.head');
  if (headCell) {
    const rect = headCell.getBoundingClientRect();
    dayHeadHeight = rect.height;
  }
  
  // Полная ширина и высота расписания
  let scheduleWidth = schedule.scrollWidth || schedule.offsetWidth;
  let scheduleHeight = schedule.scrollHeight || schedule.offsetHeight;
  
  // Ширина и высота области контента (без заголовков)
  const contentWidth = Math.max(0, scheduleWidth - timeColWidth);
  const contentHeight = Math.max(0, scheduleHeight - dayHeadHeight);
  
  return {
    timeColWidth,
    dayHeadHeight,
    scheduleWidth,
    scheduleHeight,
    contentWidth,
    contentHeight
  };
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

async function applyCenteredLogoToClone(clone, lg, metrics) {
  const logoLayer = clone.querySelector("#logoLayer");
  const logoMark = clone.querySelector("#logoMark");
  if (!logoLayer || !logoMark) {
    console.warn('Logo layer or mark not found in clone');
    return;
  }
  
  const variant = getLogoVariant();
  const tileSize = Math.max(100, Math.min(1000, Number(lg.tileSize) || 140));
  const halfSize = tileSize / 2;
  
  // Рассчитываем центр области контента с учетом метрик
  const centerX = metrics.timeColWidth + metrics.contentWidth / 2;
  const centerY = metrics.dayHeadHeight + metrics.contentHeight / 2;
  
  // Ограничиваем границы области контента
  const leftBoundary = metrics.timeColWidth;
  const rightBoundary = metrics.timeColWidth + metrics.contentWidth;
  const topBoundary = metrics.dayHeadHeight;
  const bottomBoundary = metrics.dayHeadHeight + metrics.contentHeight;
  
  // Рассчитываем начальную позицию
  let left = centerX - halfSize;
  let top = centerY - halfSize;
  let finalTileSize = tileSize;
  
  // Проверяем и корректируем, если логотип выходит за границы
  if (left < leftBoundary) {
    left = leftBoundary;
  }
  if (left + finalTileSize > rightBoundary) {
    left = rightBoundary - finalTileSize;
  }
  if (top < topBoundary) {
    top = topBoundary;
  }
  if (top + finalTileSize > bottomBoundary) {
    top = bottomBoundary - finalTileSize;
  }
  
  // Если после корректировки логотип все еще не помещается, уменьшаем его размер
  if (rightBoundary - leftBoundary < finalTileSize) {
    finalTileSize = rightBoundary - leftBoundary;
    left = leftBoundary;
  }
  if (bottomBoundary - topBoundary < finalTileSize) {
    finalTileSize = Math.min(finalTileSize, bottomBoundary - topBoundary);
    top = topBoundary;
  }
  
  console.log('Centered logo positioning in clone:', {
    centerX, centerY,
    leftBoundary, rightBoundary, topBoundary, bottomBoundary,
    left, top, finalTileSize
  });
  
  // Устанавливаем границы контейнера для логотипа, чтобы он не выходил за область контента
  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
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
  const relativeLeft = left - metrics.timeColWidth;
  const relativeTop = top - metrics.dayHeadHeight;
  
  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 0;
    opacity: ${(lg.opacity || 12) / 100};
    width: ${finalTileSize}px;
    height: ${finalTileSize}px;
    left: ${relativeLeft}px;
    top: ${relativeTop}px;
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
  clone.style.setProperty('--time-col-width', `${metrics.timeColWidth}px`);
  clone.style.setProperty('--day-head-height', `${metrics.dayHeadHeight}px`);
  clone.style.setProperty('--content-width', `${metrics.contentWidth}px`);
  clone.style.setProperty('--content-height', `${metrics.contentHeight}px`);
  
  // Добавляем атрибут data-wm
  logoLayer.setAttribute('data-wm', 'center');
  
  // Принудительно показываем
  logoLayer.style.display = 'block';
  logoMark.style.display = 'block';
  
  // Добавляем CSS для границ
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .logo-container {
      position: absolute;
      top: var(--day-head-height, 42px);
      left: var(--time-col-width, 76px);
      width: var(--content-width, 100%);
      height: var(--content-height, 100%);
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
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
      z-index: 0 !important;
    }
    /* Убедимся, что область контента отрезает логотип */
    .schedule-wrap {
      position: relative;
      overflow: hidden;
    }
  `;
  
  if (!clone.querySelector('#logo-styles')) {
    styleEl.id = 'logo-styles';
    clone.appendChild(styleEl);
  }
}

async function applyTileLogoToClone(clone, lg, metrics) {
  const logoLayer = clone.querySelector("#logoLayer");
  const logoMark = clone.querySelector("#logoMark");
  if (!logoLayer || !logoMark) return;
  
  const variant = getLogoVariant();
  const layout = lg.layout || "center";
  
  // Показываем слой логотипа
  logoLayer.style.cssText = `
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
  logoMark.style.cssText = '';
  logoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${(lg.opacity || 12) / 100};
  `;
  
  if (layout === "center") {
    // Центральный режим
    const tileSize = Math.max(100, Math.min(1000, Number(lg.tileSize) || 140));
    
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
    applyLogoStyle(logoMark, src, lg.recolor && variant === 3 ? lg.color : null, false, lg.opacity, false);
  } else if (layout === "tile" || layout === "diagonal") {
    // Плиточные режимы
    const tileSize = Math.max(20, Math.min(1000, Number(lg.tileSize) || 140));
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

function applyLogoToClonedDoc(clonedDoc, lg, metrics = null) {
  const clonedLogoLayer = clonedDoc.querySelector("#logoLayer");
  const clonedLogoMark = clonedDoc.querySelector("#logoMark");
  if (!clonedLogoLayer || !clonedLogoMark) return;
  
  const variant = getLogoVariant();
  const layout = lg.layout || "center";
  
  // Если метрики не переданы, получаем из клонированного документа
  if (!metrics) {
    metrics = getScheduleMetrics(clonedDoc);
  }
  
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
  clonedLogoMark.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 1;
    opacity: ${(lg.opacity || 12) / 100};
  `;
  
  if (layout === "center") {
    // Центральный режим
    const tileSize = Math.max(100, Math.min(1000, Number(lg.tileSize) || 140));
    
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
  } else if (layout === "tile" || layout === "diagonal") {
    // Плиточные режимы
    const tileSize = Math.max(20, Math.min(1000, Number(lg.tileSize) || 140));
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
      lg.recolor ? lg.color : null,
      lg.opacity 
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

const EXPORT_PRESETS = [
  { id: "vk_square", name: "VK пост 1:1 (1080×1080)", w: 1080, h: 1080 },
  { id: "vk_wide", name: "VK обложка 1.91:1 (1200×630)", w: 1200, h: 630 },
  { id: "tg_16_9", name: "Telegram 16:9 (1280×720)", w: 1280, h: 720 },
  { id: "tg_square", name: "Telegram 1:1 (1080×1080)", w: 1080, h: 1080 },
  { id: "a4_portrait", name: "A4 портрет (2480×3508)", w: 2480, h: 3508 },
  { id: "a4_land", name: "A4 альбом (3508×2480)", w: 3508, h: 2480 },
  { id: "auto", name: "Auto (по размеру расписания)", w: 0, h: 0 },
];

function getLogoVariant() {
  const variant = state.settings.logo?.variant;
  // Если вариант 3 выбран, но файл не загружен, возвращаем вариант 1 как запасной
  if (variant === 3 && !state.settings.logo.uploadedFileData) {
    return 1;
  }
  return clamp(Math.round(Number(variant ?? 1)), 1, 3);
}

window.getLogoDataUrl = function getLogoDataUrl(variant, recolorColor = null, opacity = 100) {
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
          let svgText = atob(base64);
          
          // Простая замена fill и stroke цветов
          svgText = svgText.replace(/(fill|stroke)="[^"]*"/g, `$1="${recolorColor}"`);
          
          // Добавляем прозрачность для загруженного SVG
          if (opacity < 100) {
            const opacityValue = opacity / 100;
            // Ищем открывающий тег SVG
            const svgStart = svgText.indexOf('<svg');
            if (svgStart !== -1) {
              // Находим конец открывающего тега
              const svgEnd = svgText.indexOf('>', svgStart);
              const svgTag = svgText.substring(svgStart, svgEnd + 1);
              
              // Проверяем, есть ли уже атрибут style
              if (svgTag.includes('style="')) {
                // Добавляем opacity к существующему стилю
                svgText = svgText.replace(
                  /style="([^"]*)"/, 
                  `style="$1;opacity:${opacityValue}"`
                );
              } else {
                // Добавляем новый атрибут style
                svgText = svgText.replace(
                  svgTag, 
                  svgTag.replace('>', ` style="opacity:${opacityValue}">`)
                );
              }
            }
          }
          
          return `data:image/svg+xml;base64,${btoa(svgText)}`;
        }
      } else if (opacity < 100) {
        // Если не перекрашиваем, но нужна прозрачность
        const base64 = fileData.split(',')[1];
        let svgText = atob(base64);
        const opacityValue = opacity / 100;
        
        // Ищем открывающий тег SVG
        const svgStart = svgText.indexOf('<svg');
        if (svgStart !== -1) {
          // Находим конец открывающего тега
          const svgEnd = svgText.indexOf('>', svgStart);
          const svgTag = svgText.substring(svgStart, svgEnd + 1);
          
          // Проверяем, есть ли уже атрибут style
          if (svgTag.includes('style="')) {
            // Добавляем opacity к существующему стилю
            svgText = svgText.replace(
              /style="([^"]*)"/, 
              `style="$1;opacity:${opacityValue}"`
            );
          } else {
            // Добавляем новый атрибут style
            svgText = svgText.replace(
              svgTag, 
              svgTag.replace('>', ` style="opacity:${opacityValue}">`)
            );
          }
        }
        
        return `data:image/svg+xml;base64,${btoa(svgText)}`;
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
  
  // Добавляем прозрачность для вариантов 1 и 2
  if (opacity < 100 && (variant === 1 || variant === 2)) {
    const opacityValue = opacity / 100;
    // Добавляем атрибут opacity к фигуре
    if (variant === 1) {
      svgString = svgString.replace(
        '<circle ', 
        `<circle style="opacity:${opacityValue}" `
      );
    } else if (variant === 2) {
      svgString = svgString.replace(
        '<rect ', 
        `<rect style="opacity:${opacityValue}" `
      );
    }
  }
  
  // Кодируем в base64 для data URL
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
};

function applyLogoStyle(element, src, recolorColor = null, opacity = 100, isTile = false) {
  // Устанавливаем прозрачность через CSS (как fallback)
  const opacityValue = clamp(Number(opacity), 0, 100) / 100;
  element.style.opacity = opacityValue;
  
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

function getScheduleMetrics(context = document) {
  const schedule = context.querySelector('.schedule');
  if (!schedule) {
    // Пытаемся получить реальные значения из CSS переменных или вычисленных стилей
    const computedStyle = getComputedStyle(document.documentElement);
    const timeColWidth = parseFloat(computedStyle.getPropertyValue('--timeCol')) || 76;
    const dayHeadHeight = 42; // Фиксированная высота заголовков дней
    
    // Пытаемся получить размеры через запрос в DOM
    let scheduleWidth = 0;
    let scheduleHeight = 0;
    const scheduleWrap = context.querySelector('.schedule-wrap');
    if (scheduleWrap) {
      scheduleWidth = scheduleWrap.scrollWidth || scheduleWrap.offsetWidth;
      scheduleHeight = scheduleWrap.scrollHeight || scheduleWrap.offsetHeight;
    }
    
    const contentWidth = Math.max(0, scheduleWidth - timeColWidth);
    const contentHeight = Math.max(0, scheduleHeight - dayHeadHeight);
    
    console.log('Schedule not found, using computed metrics:', {
      timeColWidth,
      dayHeadHeight,
      scheduleWidth,
      scheduleHeight,
      contentWidth,
      contentHeight
    });
    
    return {
      timeColWidth,
      dayHeadHeight,
      scheduleWidth,
      scheduleHeight,
      contentWidth,
      contentHeight
    };
  }

  // Ищем колонку времени
  let timeColWidth = 76;
  const timeCell = schedule.querySelector('.cell.time');
  if (timeCell) {
    const rect = timeCell.getBoundingClientRect();
    timeColWidth = rect.width;
  } else {
    // Если не нашли колонку времени, пробуем получить из CSS переменных
    const computedStyle = getComputedStyle(schedule);
    const cssWidth = parseFloat(computedStyle.getPropertyValue('--timeCol')) || 76;
    timeColWidth = cssWidth;
  }
  
  // Ищем заголовок дня
  let dayHeadHeight = 42;
  const headCell = schedule.querySelector('.cell.head');
  if (headCell) {
    const rect = headCell.getBoundingClientRect();
    dayHeadHeight = rect.height;
  }
  
  // Полная ширина и высота расписания
  let scheduleWidth, scheduleHeight;
  
  // Для compact режима используем другие элементы для определения размеров
  if (schedule.classList.contains('compact-mode')) {
    const cells = schedule.querySelectorAll('.cell.droppable');
    if (cells.length > 0) {
      const firstCell = cells[0];
      const cellRect = firstCell.getBoundingClientRect();
      scheduleWidth = cellRect.width * 7; // 7 дней
      // Вычисляем высоту на основе содержимого
      scheduleHeight = schedule.scrollHeight;
    } else {
      scheduleWidth = schedule.scrollWidth;
      scheduleHeight = schedule.scrollHeight;
    }
  } else {
    scheduleWidth = schedule.scrollWidth;
    scheduleHeight = schedule.scrollHeight;
  }
  
  // Ширина и высота области контента (без заголовков)
  const contentWidth = Math.max(0, scheduleWidth - timeColWidth);
  const contentHeight = Math.max(0, scheduleHeight - dayHeadHeight);

  const metrics = {
    timeColWidth,
    dayHeadHeight,
    scheduleWidth,
    scheduleHeight,
    contentWidth,
    contentHeight
  };

  console.log('Schedule metrics calculated:', metrics);
  
  return metrics;
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

let state = DEFAULT_STATE();

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
      tileSize: 30,
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

function deepCopy(o) {
  return JSON.parse(JSON.stringify(o));
}

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

function getFilterHash() {
  const { day, time, dir, q } = filters;
  const dirStr = Array.from(dir).sort().join(",");
  return `${day}|${time}|${dirStr}|${q}`;
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

function matchesQuery(ev) {
  const q = (filters.q || "").trim().toLowerCase();
  if (!q) return true;
  const dir = getDir(ev.directionId);
  const hay = `${ev.name || ""} ${ev.coach || ""} ${ev.room || ""} ${
    dir?.name || ""
  }`.toLowerCase();
  return hay.includes(q);
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