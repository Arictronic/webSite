#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;

// root рядом с index.html
const INDEX_HTML_A = path.join(ROOT, "index.html");
const INDEX_HTML_B = path.join(process.cwd(), "index.html");

const FONTS_DIR = path.join(ROOT, "fonts");
const OUT_CSS = path.join(FONTS_DIR, "fonts.css");

// В твоём UI реально используются веса (meta 400-700, title 600-900) => объединяем [file:1][file:2]
const ALLOWED_WEIGHTS = ["400", "500", "600", "700", "800", "900"];
const ALLOW_ITALIC = false;

// если у семейства найден только один вес (обычно 400) — создать алиасы для остальных весов
const CREATE_VIRTUAL_WEIGHTS_IF_SINGLE = true;

// что делать с “нужными” файлами: copy безопаснее, move разгружает диск
const MODE = "copy"; // "copy" | "move"

// чистить ли корень fonts/ от старых “собранных” файлов (рекомендуется true)
const CLEAN_ROOT_FONTS = true;
// префикс файлов, которые мы создаём в корне fonts/
const ROOT_PREFIX = "__local__-";

// выбор одного файла на (family, weight, style)
const EXT_PRIORITY = { ".woff2": 4, ".woff": 3, ".ttf": 2, ".otf": 1 };

function errExit(msg, code = 1) {
  console.error(`[fonts] ERROR: ${msg}`);
  process.exit(code);
}
function warn(msg) {
  console.warn(`[fonts] WARN: ${msg}`);
}
function info(msg) {
  console.log(`[fonts] ${msg}`);
}

async function fileExists(p) {
  try { await fsp.access(p, fs.constants.F_OK); return true; } catch { return false; }
}
function sha1(s) {
  return crypto.createHash("sha1").update(String(s)).digest("hex").slice(0, 10);
}

function extToFormat(ext) {
  const e = ext.toLowerCase();
  if (e === ".woff2") return "woff2";
  if (e === ".woff") return "woff";
  if (e === ".ttf") return "truetype";
  if (e === ".otf") return "opentype";
  return null;
}
function buildLocalFontFace({ family, weight, style, filename }) {
  const ext = path.extname(filename);
  const fmt = extToFormat(ext);
  if (!fmt) return null;
  return `@font-face{
  font-family:"${family}";
  font-style:${style};
  font-weight:${weight};
  font-display:swap;
  src:url("./${filename}") format("${fmt}");
}\n`;
}

function guessFamilyFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename));
  const cleaned = base
    .replace(/[_-](regular|italic|bold|medium|light|thin|black|heavy|extralight|ultralight|extrabold|ultrabold|semibold|demibold|\d{3})$/i, "")
    .replace(/(regular|italic|bold|medium|light|thin|black|heavy|extralight|ultralight|extrabold|ultrabold|semibold|demibold|\d{3})$/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
  const spaced = cleaned.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
  return spaced.replace(/\s+/g, " ");
}
function guessWeightStyleFromFilename(filename) {
  const low = filename.toLowerCase();
  let style = low.includes("italic") ? "italic" : "normal";
  let weight = "400";

  const m = low.match(/(^|[_-])(100|200|300|400|500|600|700|800|900)([_-]|\.|$)/);
  if (m) weight = m[2];

  if (low.includes("thin")) weight = "100";
  if (low.includes("extralight") || low.includes("ultralight")) weight = "200";
  if (low.includes("light")) weight = "300";
  if (low.includes("regular")) weight = "400";
  if (low.includes("medium")) weight = "500";
  if (low.includes("semibold") || low.includes("demibold")) weight = "600";
  if (low.includes("bold")) weight = "700";
  if (low.includes("extrabold") || low.includes("ultrabold")) weight = "800";
  if (low.includes("black") || low.includes("heavy")) weight = "900";

  return { weight, style };
}

async function walkDir(dir) {
  const out = [];
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkDir(p)));
    } else {
      out.push(p);
    }
  }
  return out;
}
function isFontFile(p) {
  const ext = path.extname(p).toLowerCase();
  return ext === ".woff2" || ext === ".woff" || ext === ".ttf" || ext === ".otf";
}
function normalizeFamilyName(s) {
  return String(s || "").trim().replace(/\s+/g, " ");
}
function pickBetter(existing, cand) {
  if (!existing) return cand;
  if (cand.extPrio !== existing.extPrio) return cand.extPrio > existing.extPrio ? cand : existing;
  // одинаковый формат: выбираем самый короткий путь (стабильно)
  return cand.absPath.length < existing.absPath.length ? cand : existing;
}
async function safeUnlink(p) {
  try { await fsp.unlink(p); } catch {}
}
async function emptyRootGeneratedFiles() {
  if (!(await fileExists(FONTS_DIR))) return;
  const entries = await fsp.readdir(FONTS_DIR, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!e.name.startsWith(ROOT_PREFIX)) continue;
    await safeUnlink(path.join(FONTS_DIR, e.name));
  }
}

async function main() {
  const indexPath = (await fileExists(INDEX_HTML_A)) ? INDEX_HTML_A : (await fileExists(INDEX_HTML_B)) ? INDEX_HTML_B : null;
  if (!indexPath) errExit(`Не найден index.html рядом со скриптом или в cwd. Ожидал: ${INDEX_HTML_A}`);

  await fsp.mkdir(FONTS_DIR, { recursive: true });

  if (CLEAN_ROOT_FONTS) {
    await emptyRootGeneratedFiles();
    info(`Очищены старые файлы в fonts/ с префиксом ${ROOT_PREFIX}`);
  }

  // 1) Собираем все шрифты из fonts/** (включая подпапки)
  const all = await walkDir(FONTS_DIR);
  const fontPaths = all.filter(isFontFile);

  info(`Найдено файлов шрифтов (fonts/**): ${fontPaths.length}`);

  // 2) Превращаем в кандидатов и фильтруем под твой UI [file:1][file:2]
  const candidates = [];
  for (const absPath of fontPaths) {
    const rel = path.relative(FONTS_DIR, absPath);

    // не трогаем уже “собранные” файлы в корне, чтобы не гонять по кругу
    if (path.dirname(rel) === "." && path.basename(rel).startsWith(ROOT_PREFIX)) continue;

    const ext = path.extname(absPath).toLowerCase();
    const extPrio = EXT_PRIORITY[ext] || 0;
    if (!extPrio) continue;

    const filename = path.basename(absPath);
    const family = normalizeFamilyName(guessFamilyFromFilename(filename));
    if (!family) continue;

    const { weight, style } = guessWeightStyleFromFilename(filename);

    if (!ALLOW_ITALIC && style !== "normal") continue;
    if (!ALLOWED_WEIGHTS.includes(String(weight))) continue;

    candidates.push({ absPath, rel, family, weight: String(weight), style, ext, extPrio });
  }

  info(`Кандидатов после фильтров: ${candidates.length}`);

  // 3) Выбираем один лучший файл на (family, weight, style)
  const best = new Map(); // key family|weight|style -> candidate
  for (const c of candidates) {
    const key = `${c.family}|${c.weight}|${c.style}`;
    best.set(key, pickBetter(best.get(key), c));
  }

  // 4) Копируем/перемещаем выбранные в корень fonts/
  const selected = []; // {family, weight, style, fileName}
  for (const [, c] of best.entries()) {
    const safeFam = c.family.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "");
    const outName = `${ROOT_PREFIX}${safeFam}-${c.weight}-${c.style}-${sha1(c.absPath)}${c.ext}`;
    const outAbs = path.join(FONTS_DIR, outName);

    if (!(await fileExists(outAbs))) {
      if (MODE === "move") await fsp.rename(c.absPath, outAbs);
      else await fsp.copyFile(c.absPath, outAbs);
    }
    selected.push({ family: c.family, weight: c.weight, style: c.style, fileName: outName });
  }

  info(`Оставлено/собрано в корне fonts/: ${selected.length}`);

  // 5) Виртуальные веса (алиасы) если у семейства только один вес [file:1][file:2]
  const byFamily = new Map();
  for (const s of selected) {
    const arr = byFamily.get(s.family) || [];
    arr.push(s);
    byFamily.set(s.family, arr);
  }

  const virtual = [];
  if (CREATE_VIRTUAL_WEIGHTS_IF_SINGLE) {
    for (const [family, arr] of byFamily.entries()) {
      const weights = new Set(arr.map((x) => x.weight));
      if (weights.size !== 1) continue;

      const base = arr[0]; // один файл
      for (const w of ALLOWED_WEIGHTS) {
        if (w === base.weight) continue;
        virtual.push({ family, weight: w, style: base.style, fileName: base.fileName });
      }
    }
    if (virtual.length) info(`Виртуальных @font-face (без новых файлов): ${virtual.length}`);
  }

  // 6) Генерация fonts/fonts.css
  const header = `/* AUTO-GENERATED: fonts/fonts.css (do not edit)
 * Source: fonts/** recursive scan; filtered to UI weights/style [file:1][file:2]
 * Files copied/moved into fonts/ root with prefix ${ROOT_PREFIX}
 */
`;
  let out = header + "\n";

  const faceSeen = new Set();
  function addFace(family, weight, style, fileName) {
    const k = `${family}|${weight}|${style}|${fileName}`;
    if (faceSeen.has(k)) return;
    faceSeen.add(k);
    const css = buildLocalFontFace({ family, weight, style, filename: fileName });
    if (css) out += css;
  }

  selected
    .sort((a, b) => (a.family + a.weight + a.style).localeCompare(b.family + b.weight + b.style))
    .forEach((s) => addFace(s.family, s.weight, s.style, s.fileName));

  virtual
    .sort((a, b) => (a.family + a.weight + a.style).localeCompare(b.family + b.weight + b.style))
    .forEach((s) => addFace(s.family, s.weight, s.style, s.fileName));

  await fsp.writeFile(OUT_CSS, out, "utf-8");
  info(`Готово: fonts/fonts.css`);
  info(`Подключи в index.html: <link rel="stylesheet" href="./fonts/fonts.css">`);
}

main().catch((e) => errExit(e?.stack || e?.message || String(e)));
