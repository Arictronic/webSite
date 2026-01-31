







      updateLogoAndSave();
      console.log(`Вариант логотипа изменен на: ${newVariant}`);
    }


Num.tagName === "INPUT") {
          logoRotationNum.value = String(value);
        }


 topBoundary < finalSize) {
        finalSize = Math.min(finalSize, bottomBoundary - topBoundary);
        finalTop = topBoundary;
    }


t = atob(base64);
        const opacityValue = opacity / 100;


        const svgStart = svgText.indexOf('<svg');
        if (svgStart !== -1) {

          const svgEnd = svgText.indexOf('>', svgStart);
          const svgTag = svgText.substring(svgStart, svgEnd + 1);


          if (svgTag.includes('style="')) {

            svgText = svgText.replace(
              /style="([^"]*)"/,
              `style="$1;opacity:${opacityValue}"`
            );
          } else {

            svgText = svgText.replace(
              svgTag,
              svgTag.replace('>', ` style="opacity:${opacityValue}">`)
            );
          }
        }

        return `data:image/svg+xml;base64,${btoa(svgText)}`;
      }


 summary = document.getElementById("dirDetailsSummary");
  const createMode = document.getElementById("dirCreateMode");
  const editMode = document.getElementById("dirEditMode");

  summary.textContent = "➕ Создать новое направление";
  createMode.style.display = "block";
  editMode.style.display = "none";
  details.open = false;
}


ber(s.slotHeight),
    snap: Number(s.snapMinutes),
    max: 2,
    defDur: Number(s.defaultDuration),
  }


уществующему стилю
                svgText = svgText.replace(
                  /style="([^"]*)"/,
                  `style="$1;opacity:${opacityValue}"`
                );
              }


function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}


function deepCopy(o) {
  return JSON.parse(JSON.stringify(o));
}


  clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      applyLogo();
    }, 250);
  }


 ${weight} 16px "${fam}"`));
        }
        await Promise.allSettled(loads);
      }


imeout(resolve, 50));


  if (Date.now() - startTime > timeout) {
    console.warn("Время ожидания ресурсов истекло");
  }
}


idden !important;
    }
    .export-mode .schedule-wrap {
      overflow: hidden !important;
    }


области контента (без заголовков)
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


высоту на основе содержимого
      scheduleHeight = schedule.scrollHeight;
    }


.color || "#0ea5e9";
    logoMark.style.webkitMaskImage = `url(${src})`;
    logoMark.style.maskImage = `url(${src})`;
    logoMark.style.webkitMaskRepeat = 'no-repeat';
    logoMark.style.maskRepeat = 'no-repeat';
    logoMark.style.webkitMaskPosition = 'center';
    logoMark.style.maskPosition = 'center';
    logoMark.style.webkitMaskSize = 'contain';
    logoMark.style.maskSize = 'contain';
    logoMark.style.backgroundImage = 'none';
  }


то .schedule-wrap имеет position: relative
  if (scheduleWrap.style.position !== "relative") {
    scheduleWrap.style.position = "relative";
  }

  return layer;
}


svg1 = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http:
      <circle cx="50" cy="50" r="45" fill="#000000" stroke="none"/>
    </svg>`;
    const blob1 = new Blob([svg1], { type: "image/svg+xml;charset=utf-8" });
    window._logoSvgBlobUrls[1] = URL.createObjectURL(blob1);
  }


adedFile) {
    targetValue = '1';
    state.settings.logo.variant = 1;
    console.log("Вариант 3 выбран, но файл не загружен. Переключено на вариант 1.");
  }


ontent += ' (не загружен)';
    }


 = `${value}°`;
        }

        updateLogoAndSave();
      }


ze) {
    finalTileSize = rightBoundary - leftBoundary;
    left = leftBoundary;
  }


function minToHHMM(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${pad2(h)}:${pad2(m)}`;
}


!important;
    }

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


function pad2(n) {
  return String(n).padStart(2, "0");
}


function parseHHMM(s) {
  const [h, m] = (s || "").split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}


   label: 'Загруженный файл',
      description: 'Пользовательский логотип',
      isCustom: true
    }


function quoteCssString(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}


turn 0;
  };
  urls.sort((a, b) => score(b) - score(a));
  return urls[0] || null;
}


tle",
  sampleId: "fontPickerSample",
  getValue: () => fontFamily.value,
  setValue: (id) => {
    fontFamily.value = id;
    state.settings.font.family = id;
  },
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


ent.querySelectorAll("#schedule .event[data-eid]");
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


 выходит за границы
    if (finalLeft < leftBoundary) finalLeft = leftBoundary;
    if (finalLeft + finalSize > rightBoundary) finalLeft = rightBoundary - finalSize;
    if (finalTop < topBoundary) finalTop = topBoundary;
    if (finalTop + finalSize > bottomBoundary) finalTop = bottomBoundary - finalSize;


    if (rightBoundary - leftBoundary < finalSize) {
        finalSize = rightBoundary - leftBoundary;
        finalLeft = leftBoundary;
    }
    if (bottomBoundary - topBoundary < finalSize) {
        finalSize = Math.min(finalSize, bottomBoundary - topBoundary);
        finalTop = topBoundary;
    }

    const finalCenterX = finalLeft + finalSize / 2;
    const finalCenterY = finalTop + finalSize / 2;
    const color = lg.recolor ? (lg.color || "#0ea5e9") : "#000000";


    return `
<defs>
<clipPath id="contentClip">
<rect x="${timeColWidth}" y="${dayHeadHeight}" width="${contentWidth}" height="${contentHeight}"/>
</clipPath>
</defs>
<g clip-path="url(#contentClip)" opacity="${opacity}" transform="rotate(${rotation || 0}, ${finalCenterX}, ${finalCenterY})">
${variant === 1 ?
    `<circle cx="${finalCenterX}" cy="${finalCenterY}" r="${finalSize/2}" fill="${color}" stroke="none"/>` :
 variant === 2 ?
    `<rect x="${finalLeft}" y="${finalTop}" width="${finalSize}" height="${finalSize}" fill="${color}" stroke="none"/>` :
 variant === 3 && lg.uploadedFileData ?
    `<image href="${lg.uploadedFileData}" x="${finalLeft}" y="${finalTop}" width="${finalSize}" height="${finalSize}" preserveAspectRatio="xMidYMid meet"/>` : ''}
</g>`;
}


yle.webkitMaskSize = `${(tileSize + horizontalGap) * 2}



