// Builds the static brand assets from the same geometry the live header uses
// (src/lib/brand-mark.ts). Run: npm run brand
//
//   src/app/icon.svg, src/app/apple-icon.png    favicon + home-screen icon
//   public/og-image.png                          1200×630 share card
//   public/brand/iowa-river-lockup.svg / .png    mark + wordmark, transparent, for light backgrounds
//   public/brand/iowa-river-profile.png          1080×1080 profile picture for Facebook/Google
//
// Text is converted to outlines, so every file renders the same everywhere with no fonts installed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { BRAND, markInner, staticMarkSvg } from "../src/lib/brand-mark.ts";

const root = process.cwd();
const brandDir = join(root, "public", "brand");
mkdirSync(brandDir, { recursive: true });

const loadFont = (rel: string) => {
  const buf = readFileSync(join(root, "node_modules", rel));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const serif = loadFont("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff");
const serifItalic = loadFont("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff");
const sans = loadFont("@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff");
const sansReg = loadFont("@fontsource/instrument-sans/files/instrument-sans-latin-500-normal.woff");

/** Text as outlined path data, with letter-spacing (opentype's getPath has none). */
function outline(font: opentype.Font, text: string, x: number, y: number, size: number, tracking = 0) {
  let d = "";
  let cx = x;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += ((g.advanceWidth ?? 0) * size) / font.unitsPerEm + tracking;
  }
  return { d, width: cx - x - tracking };
}

// ---- Favicon + apple icon -------------------------------------------------
writeFileSync(join(root, "src", "app", "icon.svg"), staticMarkSvg(64));
await sharp(Buffer.from(staticMarkSvg(180, { square: true }))).png().toFile(join(root, "src", "app", "apple-icon.png"));

// ---- Lockup ---------------------------------------------------------------
{
  const TX = 78;
  const name = outline(serif, "Iowa River", TX, 40, 44);
  const sub = outline(sans, "DENTISTRY · IOWA FALLS", TX + 1, 58, 10.5, 2.6);
  const W = Math.ceil(TX + Math.max(name.width, sub.width) + 6);
  const H = 68;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * 4}" height="${H * 4}" viewBox="0 0 ${W} ${H}">
  <svg x="2" y="2" width="64" height="64" viewBox="0 0 100 100">${markInner("lk")}</svg>
  <path d="${name.d}" fill="${BRAND.navy}"/>
  <path d="${sub.d}" fill="#17706c"/>
</svg>`;
  writeFileSync(join(brandDir, "iowa-river-lockup.svg"), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(brandDir, "iowa-river-lockup.png"));
}

// ---- Profile picture ------------------------------------------------------
await sharp(Buffer.from(staticMarkSvg(1080, { square: true }))).png().toFile(join(brandDir, "iowa-river-profile.png"));

// ---- Share card (1200×630) -------------------------------------------------
{
  const l1 = outline(serif, "Nobody loves", 96, 250, 112);
  const l2 = outline(serif, "the dentist.", 96, 360, 112);
  const l3 = outline(serifItalic, "We know.", 96, 470, 112);
  const kicker = outline(sans, "IOWA RIVER DENTISTRY · IOWA FALLS, IA", 98, 132, 19, 4.2);
  const foot = outline(sansReg, "4.9 stars from 250+ neighbors  ·  (641) 648-4237", 98, 558, 26);
  const waves = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<path d="M640 ${360 + i * 38} C 760 ${320 + i * 38}, 880 ${410 + i * 38}, 1000 ${360 + i * 38} S 1160 ${320 + i * 38}, 1240 ${360 + i * 38}" fill="none" stroke="${BRAND.teal}" stroke-opacity="${0.45 - i * 0.07}" stroke-width="${i === 1 ? 3 : 2}"/>`,
    )
    .join("");
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="wash" cx="88%" cy="5%" r="70%"><stop offset="0" stop-color="#7fd3cb" stop-opacity="0.45"/><stop offset="1" stop-color="#7fd3cb" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BRAND.paper}"/>
  <rect width="1200" height="630" fill="url(#wash)"/>
  ${waves}
  <svg x="860" y="96" width="250" height="250" viewBox="0 0 100 100">${markInner("og")}</svg>
  <path d="${kicker.d}" fill="#17706c"/>
  <path d="${l1.d}" fill="${BRAND.navy}"/>
  <path d="${l2.d}" fill="${BRAND.navy}"/>
  <path d="${l3.d}" fill="#17706c"/>
  <path d="${foot.d}" fill="#4a5f72"/>
</svg>`;
  await sharp(Buffer.from(og)).png().toFile(join(root, "public", "og-image.png"));
}

console.log("brand assets -> src/app/icon.svg, apple-icon.png, public/og-image.png, public/brand/*");
