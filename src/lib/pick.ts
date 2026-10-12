import type { SymptomId } from "./site";

// Lets any section ("Bugged by: Missing tooth →") open the picker on a tile.
const EVENT = "ird:pick";

export function pickSymptom(id: SymptomId) {
  window.dispatchEvent(new CustomEvent<SymptomId>(EVENT, { detail: id }));
}

export function onPick(cb: (id: SymptomId) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<SymptomId>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
