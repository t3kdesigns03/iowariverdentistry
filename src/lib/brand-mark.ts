// The Iowa River Dentistry mark: a tooth with the river running through it, on a deep navy disc.
// Geometry lives here once; BrandMark.tsx renders it live and scripts/build-brand.mts writes the static files.

export const MARK_VIEWBOX = "0 0 100 100";

/** Molar silhouette in a 100×100 box (x 11–89, y 14–98). Reused, scaled, by the picker icons. */
export const TOOTH_PATH =
  "M30 14C18 14 11 24 11 37C11 49 16 57 19 66C22 76 23 86 27 93C29 97 32 98 35 97C39 96 40 91 41 86L44 72C45 66 47 63 50 63C53 63 55 66 56 72L59 86C60 91 61 96 65 97C68 98 71 97 73 93C77 86 78 76 81 66C84 57 89 49 89 37C89 24 82 14 70 14C61 14 56 19 50 19C44 19 39 14 30 14Z";

/** Where the tooth sits inside the mark disc. */
export const TOOTH_TRANSFORM = "translate(19 15) scale(0.62)";

/** The river: a soft band, then a thinner ripple under it. In mark coordinates. */
export const RIVER_BAND = "M4 45C18 39 30 51 50 45S82 39 96 45V53C82 47 70 59 50 53S18 47 4 53Z";
export const RIVER_RIPPLE = "M4 58C18 53 30 63 50 58S82 53 96 58V61.5C82 56.5 70 66.5 50 61.5S18 56.5 4 61.5Z";

export const BRAND = {
  navy: "#0a2236",
  navyDeep: "#061624",
  paper: "#fbf8f3",
  teal: "#2a9d97",
  aqua: "#7fd3cb",
};

/** Self-contained SVG of the mark (favicon, profile picture, share card). */
export function staticMarkSvg(size: number, { square = false }: { square?: boolean } = {}) {
  const bg = square ? `<rect width="100" height="100" fill="${BRAND.navyDeep}"/>` : "";
  const disc = square ? 46 : 50;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${MARK_VIEWBOX}">
  ${bg}${markInner("m", disc)}
</svg>`;
}

/** The mark's drawing without the outer <svg>, for embedding. */
export function markInner(id: string, r = 50) {
  return `<defs>
    <clipPath id="${id}-tooth"><path d="${TOOTH_PATH}" transform="${TOOTH_TRANSFORM}"/></clipPath>
    <radialGradient id="${id}-disc" cx="35%" cy="25%" r="80%">
      <stop offset="0" stop-color="#14405e"/><stop offset="1" stop-color="${BRAND.navy}"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="${r}" fill="url(#${id}-disc)"/>
  <path d="${TOOTH_PATH}" transform="${TOOTH_TRANSFORM}" fill="${BRAND.paper}"/>
  <g clip-path="url(#${id}-tooth)">
    <path d="${RIVER_BAND}" fill="${BRAND.teal}"/>
    <path d="${RIVER_RIPPLE}" fill="${BRAND.aqua}"/>
  </g>`;
}
