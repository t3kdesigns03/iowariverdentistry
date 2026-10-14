"use client";

import { useSyncExternalStore } from "react";
import { statusAt } from "@/lib/hours";
import { site } from "@/lib/site";

// Snapshot must be a stable primitive for useSyncExternalStore, so flatten to a string.
function snapshot() {
  const s = statusAt(new Date(), site.hours);
  return s.open ? `open|${s.closesLabel}` : `closed|${s.opensLabel}`;
}

// Re-check every minute, and immediately when a backgrounded phone tab comes back.
function subscribe(cb: () => void) {
  const t = setInterval(cb, 60_000);
  const onVisible = () => document.visibilityState === "visible" && cb();
  document.addEventListener("visibilitychange", onVisible);
  window.addEventListener("focus", cb);
  return () => {
    clearInterval(t);
    document.removeEventListener("visibilitychange", onVisible);
    window.removeEventListener("focus", cb);
  };
}

/**
 * Live open/closed badge, computed in the visitor's browser against the real hours
 * (Mon–Thu 7:30am–4:30pm, Iowa time). Renders nothing in the static HTML so it can
 * never show a stale build-time answer.
 */
export default function OpenStatus({
  className = "",
  detail = true,
  stacked = false,
}: {
  className?: string;
  detail?: boolean;
  /** Put the "Until 4:30pm" / "Opens Mon 7:30am" part on its own line. */
  stacked?: boolean;
}) {
  const snap = useSyncExternalStore(subscribe, snapshot, () => null);
  if (!snap) return null;
  const [state, label] = snap.split("|");
  const open = state === "open";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title={`Hours: ${site.hours.short}, Iowa time`}>
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${open ? "pulse-dot bg-teal" : "bg-sun"}`} />
      <span>
        {open ? "Open now" : "Closed"}
        {detail && stacked && <span className="block opacity-75">{label}</span>}
        {detail && !stacked && <span className="opacity-75">{` · ${label}`}</span>}
      </span>
    </span>
  );
}
