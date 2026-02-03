// Шрифты - модифицируем для использования шрифтов из настроек
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

// 🔴 ИЗМЕНЕНО: Собираем шрифты из настроек, а не из DOM
function getFontsFromSettings() {
  const set = new Set();
  const fontSettings = state.settings.font;

  // Собираем все уникальные шрифты из настроек
  const fonts = [
    fontSettings.titleFamily,
    fontSettings.metaFamily,
    fontSettings.family
  ];

  fonts.forEach(font => {
    const fam = _firstFontFamily(font);
    if (fam && !isGenericFamily(fam)) {
      // Для каждого шрифта собираем комбинации стилей и весов
      const weights = [fontSettings.weightTitle, fontSettings.weightMeta];
      const styles = ['normal']; // По умолчанию normal
      
      weights.forEach(weight => {
        styles.forEach(style => {
          set.add(`${fam}||${normalizeFontWeight(weight)}||${style}`);
        });
      });
    }
  });

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

// 🔴 ИЗМЕНЕНО: Собираем CSS только для шрифтов из настроек
async function buildFontFaceCssForSettings() {
  let css = "";
  const wantedFonts = getFontsFromSettings();
  
  if (!wantedFonts.size) return css;

  const wanted = Array.from(wantedFonts).map((k) => {
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

  return css;
}

function matchWeight(ruleWeight, wantedWeight) {
  if (ruleWeight === "normal") ruleWeight = "400";
  if (ruleWeight === "bold") ruleWeight = "700";
  
  if (ruleWeight.includes("-")) {
    const [min, max] = ruleWeight.split("-").map(s => parseInt(s, 10));
    return wantedWeight >= min && wantedWeight <= max;
  }
  
  const ruleW = parseInt(ruleWeight, 10);
  return ruleW === wantedWeight;
}

// Выгрузка изображения
async function buildExportPreview() {
  const opts = getExportOptsFromUI();

  toast("OK", "Экспорт", "Генерация предпросмотра…");

  try {
    const exportResult = await executeExport(opts);
    if (!exportResult) return;

    const { dataUrl } = exportResult;
    expPreviewImg.src = dataUrl;
    lastPreview = { dataUrl, ...opts };

    toast("OK", "Экспорт", "Предпросмотр готов.");
  } catch (error) {
    console.error("Export error:", error);
    toast("ERR", "Экспорт", error?.message || "Ошибка экспорта");
  }
}

async function executeExport(opts) {
  const { fmt } = opts;

  if (fmt === "svg") {
    return await exportToSvg(opts);
  } else {
    return await exportToCanvas(opts);
  }
}

async function prepareDomForExport({ compact = false, format = 'canvas' } = {}) {
  const metrics = getExportMetrics(true);
  const { clone, cleanup } = makeExportClone({ compact });

  if (!clone) {
    throw new Error("Не удалось создать клон расписания");
  }

  // 1. Удаляем интерактивные элементы
  removeInteractiveElements(clone);

  // 2. Применяем стили к событиям (важно: устанавливает прямые стили!)
  applyCssVariablesToEvents(clone);

  // 3. Скрываем пустые строки
  const hiddenRows = hideEmptyTimeRows(clone, {
    respectFilters: true,
    keepNowRow: true
  });

  // 4. Фиксируем шапку
  const headEls = Array.from(clone.querySelectorAll(".cell.head"));
  headEls.forEach(el => {
    el.style.position = "static";
    el.style.top = "auto";
    el.style.zIndex = "auto";
  });

  // 5. Создаём элементы логотипа
  const lg = state.settings.logo;
  let logoLayer = clone.querySelector("#logoLayer");
  let logoMark = clone.querySelector("#logoMark");

  if (lg.enabled) {
    if (!logoLayer) {
      logoLayer = document.createElement('div');
      logoLayer.id = 'logoLayer';
      clone.querySelector('.schedule-wrap')?.prepend(logoLayer);
    }
    if (!logoMark) {
      logoMark = document.createElement('div');
      logoMark.id = 'logoMark';
      logoLayer.appendChild(logoMark);
    }
  }

  // 6. Даем браузеру пересчитать layout
  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => setTimeout(r, 50));

  // 7. Измеряем размеры
  const scheduleEl = clone.querySelector('.schedule');
  let width, height;
  
  if (scheduleEl) {
    const rect = scheduleEl.getBoundingClientRect();
    width = Math.max(100, Math.ceil(rect.width || scheduleEl.scrollWidth || 800));
    height = Math.max(100, Math.ceil(rect.height || scheduleEl.scrollHeight || 600));
    
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.overflow = "visible";
    
    scheduleEl.style.width = '100%';
    scheduleEl.style.height = '100%';
    scheduleEl.style.position = 'relative';
  } else {
    width = Math.max(100, Math.ceil(metrics.scheduleWidth || 800));
    height = Math.max(100, Math.ceil(metrics.scheduleHeight || 600));
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
  }

  // 8. Применяем стили ЭКСПОРТА (с обрезкой текста) ПЕРЕД логотипом
  applyCssVariablesToEventsForExport(clone);

  // 9. Применяем логотип
  if (lg.enabled) {
    await applyLogoToExport(clone, lg, metrics, format);
  }

  return {
    clone,
    cleanup,
    metrics,
    hiddenRows,
    width,
    height
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

  // 2. Получаем подготовленный DOM
  const prepared = await prepareDomForExport({
    compact: opts.compact,
    format: "svg",
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

    // 4. Применяем стили и ограничения к событиям в клоне
    applyCssVariablesToEventsForExport(clone);

    // 5. 🔴 ИЗМЕНЕНО: Загружаем шрифты из настроек
    const fontsFromSettings = getFontsFromSettings();
    await ensureFontsLoaded(2500, fontsFromSettings);

    // 6. Ждем перерисовки
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r)),
    );

    // 7. 🔴 ИЗМЕНЕНО: Собираем CSS только для шрифтов из настроек
    const fontEmbedCSS = await buildFontFaceCssForSettings();

    // 8. Получаем цвет фона из темы
    const bgColor = getThemeBgCssColor() || "#ffffff";

    console.log(`SVG экспорт: размеры ${width}x${height}, фон ${bgColor}`);

    // 9. Генерируем SVG
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

    toast("OK", "SVG", "SVG предпросмотр готов.");
    return { dataUrl };
  } catch (e) {
    console.error("SVG export error:", e);
    toast("ERR", "SVG", e?.message || "Ошибка генерации SVG");
    throw new Error(e?.message || "Ошибка генерации SVG");
  } finally {
    cleanup();
  }
}

async function exportToCanvas(opts) {
  if (typeof window.html2canvas !== "function") {
    toast(
      "WARN",
      "Экспорт",
      "html2canvas не найден. Проверьте подключение библиотеки.",
    );
    return null;
  }

  // 1. Принудительно обновляем рендер перед экспортом
  await new Promise((resolve) => {
    renderAll();
    setTimeout(resolve, 100);
  });

  // 2. Получаем подготовленный DOM
  const prepared = await prepareDomForExport({
    compact: opts.compact,
    format: "canvas",
  });

  if (!prepared) {
    toast("ERR", "Экспорт", "Не удалось подготовить DOM для экспорта");
    return null;
  }

  const { clone, cleanup, width, height } = prepared;

  try {
    // 3. Убедимся, что все ресурсы загружены
    await waitForResources(clone, 3000);

    // 4. Проверяем, что расписание видно в клоне
    const scheduleEl = clone.querySelector(".schedule");
    if (!scheduleEl) {
      console.error("Расписание не найдено в клоне для экспорта");
      toast("ERR", "Экспорт", "Расписание не найдено");
      throw new Error("Расписание не найдено в клоне");
    }

    // 5. Подсчитываем видимые события для отладки
    const visibleEvents = clone.querySelectorAll(".event:not(.dim)").length;
    const allEvents = clone.querySelectorAll(".event").length;
    console.log(`Экспорт: ${visibleEvents}/${allEvents} событий видимы`);

    // 6. Создаем опции для html2canvas
    const html2canvasOptions = {
      backgroundColor: opts.background,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: width,
      height: height,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 5000,
      removeContainer: true,
      onclone: async (clonedDoc) => {
        // Критически важно: применяем стили и ограничения к событиям в клоне
        applyCssVariablesToEventsForExport(clonedDoc);

        // Применяем логотип
        const lg = state.settings.logo;
        if (lg.enabled) {
          const clonedLogoLayer = clonedDoc.querySelector("#logoLayer");
          const clonedLogoMark = clonedDoc.querySelector("#logoMark");
          if (clonedLogoLayer && clonedLogoMark) {
            try {
              const metrics = getExportMetrics();
              clonedLogoLayer.style.position = "absolute";
              clonedLogoLayer.style.top = "0";
              clonedLogoLayer.style.left = "0";
              clonedLogoLayer.style.width = "100%";
              clonedLogoLayer.style.height = "100%";
              clonedLogoLayer.style.pointerEvents = "none";
              clonedLogoLayer.style.zIndex = "0";
              clonedLogoLayer.style.overflow = "hidden";
              clonedLogoLayer.style.display = "block";
              clonedLogoLayer.style.backgroundColor = lg.bg || "transparent";

              clonedLogoMark.style.position = "absolute";
              clonedLogoMark.style.pointerEvents = "none";
              clonedLogoMark.style.zIndex = "0";
              clonedLogoMark.style.opacity = (lg.opacity || 12) / 100;
              clonedLogoMark.style.display = "block";

              const clonedSchedule = clonedDoc.querySelector(".schedule");
              if (clonedSchedule) {
                clonedSchedule.style.position = "relative";
                clonedSchedule.style.zIndex = "1";
              }
            } catch (error) {
              console.warn("Ошибка применения логотипа в onclone:", error);
            }
          }
        }
      },
    };

    // 7. Захватываем canvas с таймаутом
    const capturePromise = window.html2canvas(clone, html2canvasOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Таймаут захвата canvas (10 секунд)")),
        10000,
      ),
    );

    const canvas = await Promise.race([capturePromise, timeoutPromise]);

    toast("OK", "Экспорт", "Изображение готово");

    let finalCanvas = canvas;

    // 8. Применяем пресет если нужно
    if (opts.preset.id !== "auto") {
      const p = opts.preset;
      const target = {
        w: p.w,
        h: p.h,
        rotate: false,
      };
      finalCanvas = createFinalCanvas(canvas, target);
    }

    // 9. Конвертируем в dataURL с учетом качества
    const dataUrl = finalCanvas.toDataURL(opts.imageFormat, opts.quality);
    return { dataUrl };
  } catch (e) {
    console.error("Canvas export error:", e);

    // Fallback: пробуем упрощенный захват
    try {
      console.log("Пробуем fallback capture...");
      const fallbackCanvas = await fallbackCapture(clone, opts.background);
      toast("WARN", "Экспорт", "Использован упрощённый экспорт");

      let finalCanvas = fallbackCanvas;
      if (opts.preset.id !== "auto") {
        const p = opts.preset;
        finalCanvas = createFinalCanvas(fallbackCanvas, {
          w: p.w,
          h: p.h,
          rotate: false,
        });
      }

      const dataUrl = finalCanvas.toDataURL(opts.imageFormat, opts.quality);
      return { dataUrl };
    } catch (fallbackError) {
      console.error("Fallback также не удался:", fallbackError);
      toast("ERR", "Экспорт", e?.message || "Ошибка при создании изображения");
      throw new Error("Ошибка при создании изображения");
    }
  } finally {
    // 10. Всегда очищаем
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

  return { preset, fmt, imageFormat, quality, background, compact };
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
  clone.style.position = "static";
  clone.style.left = "auto";
  clone.style.top = "auto";
  clone.style.right = "auto";
  clone.style.bottom = "auto";
  clone.style.transform = "none";
  clone.style.margin = "0";
  clone.style.display = "block";

  // Сохраняем структуру сетки .schedule
  const scheduleEl = clone.querySelector(".schedule");
  if (scheduleEl) {
    const origSchedule = document.querySelector(".schedule");
    if (origSchedule) {
      const cs = getComputedStyle(origSchedule);
      scheduleEl.style.display = "grid";
      scheduleEl.style.gridTemplateColumns = cs.gridTemplateColumns;
      scheduleEl.style.width = "max-content";
      scheduleEl.style.minWidth = "100%";
    }

    // Принудительно показываем все элементы
    scheduleEl.querySelectorAll(".cell, .slot, .event").forEach((el) => {
      el.style.display = "block";
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

// 🔴 ИЗМЕНЕНО: Функция теперь только для предпросмотра, без скачивания
async function previewFromExportModal() {
  const opts = getExportOptsFromUI();

  // Определяем, нужно ли перестраивать изображение
  const needsRebuild =
    !lastPreview ||
    lastPreview.fmt !== opts.fmt ||
    lastPreview.preset?.id !== opts.preset?.id ||
    lastPreview.imageFormat !== opts.imageFormat ||
    lastPreview.quality !== opts.quality ||
    lastPreview.background !== opts.background ||
    lastPreview.compact !== opts.compact;

  try {
    // Если нужно перестроить или нет предпросмотра
    if (needsRebuild || !lastPreview?.dataUrl) {
      toast("OK", "Экспорт", "Подготовка предпросмотра…");
      const exportResult = await executeExport(opts);

      if (!exportResult) {
        toast("ERR", "Экспорт", "Не удалось подготовить предпросмотр");
        return;
      }

      // Сохраняем результат в lastPreview
      lastPreview = { dataUrl: exportResult.dataUrl, ...opts };
    }

    // Проверяем, что данные для предпросмотра есть
    if (!lastPreview?.dataUrl) {
      toast("ERR", "Предпросмотр", "Нет данных для предпросмотра");
      return;
    }

    // Устанавливаем изображение в предпросмотр
    expPreviewImg.src = lastPreview.dataUrl;

    toast("OK", "Предпросмотр", "Предпросмотр обновлен.");
  } catch (error) {
    console.error("Preview error:", error);
    toast("ERR", "Предпросмотр", error?.message || "Ошибка при создании предпросмотра");
  }
}

function setupExportPreviewButton() {
  const previewBtn = document.querySelector("#btnExpDownload");
  if (previewBtn) {
    // Удаляем старый обработчик скачивания
    previewBtn.removeEventListener("click", downloadFromExportModal);
    // Добавляем новый обработчик предпросмотра
    previewBtn.addEventListener("click", previewFromExportModal);
    // Меняем текст кнопки для ясности
    previewBtn.textContent = "Предпросмотр";
  }
}

window.previewFromExportModal = previewFromExportModal;
window.setupExportPreviewButton = setupExportPreviewButton;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupExportPreviewButton);
} else {
  setupExportPreviewButton();
}

// Остальные функции (applyCssVariablesToEvents, applyCssVariablesToEventsForExport, 
// clampTextToLines, applyTextClampingToEvent, applyTextClamp, isDoubleEvent, parseRgba)
// остаются без изменений...