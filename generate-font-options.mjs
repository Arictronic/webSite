#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CSS_PATH = path.join(ROOT, "fonts", "fonts.css");
const OUT_MODULE = path.join(ROOT, "fonts.generated.js");

// категории фолбэков
const SERIF = new Set(["PT Serif", "Noto Serif", "Playfair Display", "Merriweather"]);
const MONO = new Set(["JetBrains Mono"]);
const CURSIVE = new Set(["Caveat"]);

// Важно: этот генератор НЕ читает FONTOPTIONS и НЕ пытается угадать старые id.
// Он генерирует список исключительно из fonts/fonts.css.
// Старые/неизвестные id лучше обрабатывать в приложении: если нет в FONT_FAMILY_BY_ID -> 'system'.

// (опционально) точные id для некоторых семейств (если хочешь фиксировать id)
// Если не нужно — оставь пустым объектом.
const ID_OVERRIDES_BY_FAMILY = {
  // "Noto Sans": "notosans",
  // "Open Sans": "opensans",
};

function makeIdFromFamily(name) {
  return String(name)
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .toLowerCase();
}

function idForFamily(name) {
  return ID_OVERRIDES_BY_FAMILY[name] || makeIdFromFamily(name);
}

function cssFallback(name) {
  if (MONO.has(name)) {
    return `${name}, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  }
  if (CURSIVE.has(name)) {
    return `${name}, system-ui, -apple-system, cursive`;
  }
  if (SERIF.has(name)) {
    return `${name}, system-ui, -apple-system, serif`;
  }
  return `${name}, system-ui, -apple-system, sans-serif`;
}

function escJsSingle(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function main() {
  const css = await fs.readFile(CSS_PATH, "utf-8");

  // Достаём все font-family из @font-face
  const re = /@font-face\s*\{[\s\S]*?font-family\s*:\s*["']?([^;"'\n\r]+)["']?\s*;/gi;
  const familiesSet = new Set();
  let m;
  while ((m = re.exec(css)) !== null) {
    const fam = m[1].trim().replace(/\s+/g, " ");
    if (fam) familiesSet.add(fam);
  }

  const families = Array.from(familiesSet).sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" })
  );

  // 1) FONT_OPTIONS
  const rows = [];

  // system как дефолт
  rows.push({
    id: "system",
    name: "System UI",
    css: "system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif",
  });

  // все семьи из fonts.css
  for (const name of families) {
    const id = idForFamily(name);
    if (!id || id === "system" || id === "mono") continue;
    rows.push({ id, name, css: cssFallback(name) });
  }

  // моно как явная опция
  rows.push({
    id: "mono",
    name: "Monospace",
    css: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  });

  // дедуп по id (на случай коллизий)
  const seen = new Set();
  const unique = [];
  const collisions = [];

  for (const r of rows) {
    if (seen.has(r.id)) {
      collisions.push(r.id);
      continue;
    }
    seen.add(r.id);
    unique.push(r);
  }

  // 2) FONT_FAMILY_BY_ID
  const map = {};
  for (const r of unique) map[r.id] = r.css;

  await fs.mkdir(path.dirname(OUT_MODULE), { recursive: true });

  const out =
`// AUTO-GENERATED from fonts/fonts.css\n\n` +
`export const FONT_OPTIONS = [\n` +
unique.map((r) =>
  `  { id: '${escJsSingle(r.id)}', name: '${escJsSingle(r.name)}', css: '${escJsSingle(r.css)}' },`
).join("\n") +
`\n];\n\n` +
`export const FONT_FAMILY_BY_ID = {\n` +
Object.entries(map).map(([k, v]) =>
  `  '${escJsSingle(k)}': '${escJsSingle(v)}',`
).join("\n") +
`\n};\n\n` +
`// Optional: keep for compatibility layer in app.js (you can delete if unused)\n` +
`export const FONT_ID_ALIASES = {};\n`;

  await fs.writeFile(OUT_MODULE, out, "utf-8");

  console.log(`[ok] Found families: ${families.length}`);
  console.log(`[ok] Unique ids: ${unique.length}`);
  if (collisions.length) console.log(`[warn] Id collisions (dropped duplicates): ${[...new Set(collisions)].slice(0, 30).join(", ")}${collisions.length > 30 ? " ..." : ""}`);
  console.log(`[ok] Wrote: ${OUT_MODULE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
