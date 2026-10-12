import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Numbered narrative label: italic serif number, a short river line, then the micro-label. */
export function SectionLabel({
  n,
  children,
  tone = "light",
  className = "",
}: {
  n?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <p data-reveal="" className={`mb-4 flex items-center gap-3 max-sm:mb-2.5 ${className}`}>
      {n && <span className={`display text-[1.9rem] italic leading-none ${dark ? "text-aqua" : "text-teal"}`}>{n}</span>}
      {n && (
        <svg viewBox="0 0 40 8" aria-hidden="true" className={`h-2 w-10 shrink-0 ${dark ? "text-aqua/70" : "text-teal/70"}`}>
          <path d="M0 4C7 0 13 8 20 4S33 0 40 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      <span className={`kicker ${dark ? "text-aqua" : "text-teal-deep"} max-sm:text-[0.66rem]`}>{children}</span>
    </p>
  );
}

export function SectionTitle({
  id,
  children,
  tone = "light",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <h2
      id={id}
      data-reveal=""
      style={{ "--d": 1 } as CSSProperties}
      className={`display text-[2.6rem] sm:text-6xl lg:text-7xl ${tone === "dark" ? "text-paper" : "text-ink"} ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * Call button that sounds like a person. `tone` = navy (on light) or aqua (on navy).
 * `size="lg"` puts "Hailee probably answers" on its own line under the number.
 */
export function CallButton({
  tone = "navy",
  size = "md",
  className = "",
  label,
}: {
  tone?: "navy" | "aqua";
  size?: "md" | "lg";
  className?: string;
  label?: string;
}) {
  const skin = tone === "aqua" ? "btn-aqua" : "btn-navy";
  if (size === "lg") {
    return (
      <a
        href={site.phone.href}
        className={`${skin} tap inline-flex min-h-16 items-center gap-3.5 rounded-2xl px-6 py-3 text-left transition active:translate-y-px ${className}`}
      >
        <PhoneIcon className="h-6 w-6 shrink-0" />
        <span className="leading-tight">
          <span className="block text-xl font-semibold tabular-nums sm:text-2xl">
            {label ?? "Call"} {site.phone.display}
          </span>
          <span className="block text-sm opacity-80">{site.frontDesk} probably answers.</span>
        </span>
      </a>
    );
  }
  return (
    <a
      href={site.phone.href}
      className={`${skin} tap inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-5 font-semibold transition active:translate-y-px ${className}`}
    >
      <PhoneIcon className="h-5 w-5 shrink-0" />
      <span className="tabular-nums">
        {label ?? "Call"} {site.phone.display}
      </span>
    </a>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-sun ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em]" fill="currentColor">
          <path d="M10 1.5l2.6 5.5 6 .7-4.5 4.1 1.2 6L10 14.8 4.7 17.8l1.2-6L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </span>
  );
}
