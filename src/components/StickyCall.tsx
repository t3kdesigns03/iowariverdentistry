"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import OpenStatus from "./OpenStatus";
import { PhoneIcon } from "./icons";

/**
 * Tap-to-call bar on phones/tablets (desktop has the number in the header). It slides away
 * while the big call card in Visit is on screen, so you never see three call buttons at once.
 */
export default function StickyCall() {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const big = document.getElementById("big-call");
    if (!big) return;
    const io = new IntersectionObserver(([e]) => setAway(e.isIntersecting), { threshold: 0.5 });
    io.observe(big);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/92 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        away ? "translate-y-full" : ""
      }`}
      aria-hidden={away || undefined}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <OpenStatus
          stacked
          className="kicker w-[7.1rem] shrink-0 items-start whitespace-nowrap text-[0.54rem] leading-snug tracking-[0.12em] text-slate [&>span:first-child]:mt-1"
        />
        <a
          href={site.phone.href}
          tabIndex={away ? -1 : undefined}
          className="btn-navy tap flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-xl px-3"
        >
          <PhoneIcon className="h-5 w-5 shrink-0" />
          <span className="leading-tight">
            <span className="block font-semibold tabular-nums">{`Call ${site.phone.display}`}</span>
            <span className="block text-[0.7rem] opacity-80">{`${site.frontDesk} probably answers.`}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
