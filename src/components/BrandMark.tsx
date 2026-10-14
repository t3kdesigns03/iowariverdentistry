import { useId } from "react";
import { BRAND, RIVER_BAND, RIVER_RIPPLE, TOOTH_PATH, TOOTH_TRANSFORM } from "@/lib/brand-mark";
import { site } from "@/lib/site";

/** Tooth with the river running through it. The river drifts (gently, and only with motion allowed). */
export function BrandMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={`${id}-t`}>
          <path d={TOOTH_PATH} transform={TOOTH_TRANSFORM} />
        </clipPath>
        <radialGradient id={`${id}-d`} cx="35%" cy="25%" r="80%">
          <stop offset="0" stopColor="#14405e" />
          <stop offset="1" stopColor={BRAND.navy} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#${id}-d)`} />
      <path d={TOOTH_PATH} transform={TOOTH_TRANSFORM} fill={BRAND.paper} />
      <g clipPath={`url(#${id}-t)`}>
        <g className="drift">
          <path d={RIVER_BAND} fill={BRAND.teal} />
          <path d={RIVER_RIPPLE} fill={BRAND.aqua} />
        </g>
      </g>
    </svg>
  );
}

/** Mark + wordmark. `tone` picks text colours for light or dark backgrounds. */
export function BrandLockup({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <BrandMark className="h-10 w-10 shrink-0" />
      <span className="min-w-0 leading-none">
        <span className={`display block truncate text-[1.45rem] ${dark ? "text-paper" : "text-ink"}`}>
          Iowa River
        </span>
        <span className={`kicker mt-0.5 block truncate text-[0.58rem] ${dark ? "text-aqua" : "text-teal-deep"}`}>
          {`Dentistry · ${site.address.city}`}
        </span>
      </span>
    </span>
  );
}
