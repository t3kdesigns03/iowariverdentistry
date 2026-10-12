"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { BrandLockup } from "./BrandMark";
import NavLink from "./NavLink";
import OpenStatus from "./OpenStatus";
import { PhoneIcon } from "./icons";
import { Container } from "./ui";

const jumps = [
  { href: "#bugging", label: "What's bugging you?" },
  { href: "#dr-bryn", label: "Dr. Bryn" },
  { href: "#first-visit", label: "First visit" },
  { href: "#work", label: "The work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      {/* Phones/tablets: logo + call, then a jump bar */}
      <div className="lg:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <NavLink href="#top" aria-label={`${site.name}, back to top`} className="min-w-0 rounded-full py-1 pr-1">
            <BrandLockup className="[&_svg]:h-9 [&_svg]:w-9" />
          </NavLink>
          <a href={site.phone.href} className="btn-navy tap inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 font-semibold">
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            Call
          </a>
        </div>
        <JumpBar />
      </div>

      {/* Desktop */}
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 max-lg:hidden">
        <NavLink href="#top" aria-label={`${site.name}, back to top`} className="rounded-md">
          <BrandLockup />
        </NavLink>
        <nav aria-label="Sections">
          <ul className="flex items-center gap-0.5">
            {nav.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[0.9rem] font-medium text-slate transition hover:bg-aqua-mist hover:text-ink"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden whitespace-nowrap xl:block">
            <OpenStatus detail={false} className="kicker text-[0.62rem] text-slate" />
          </span>
          <a href={site.phone.href} className="btn-navy inline-flex min-h-11 items-center gap-2 rounded-xl px-4 font-semibold">
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            <span className="whitespace-nowrap tabular-nums">{site.phone.display}</span>
          </a>
        </div>
      </Container>
    </header>
  );
}

/** Jump bar with a sliding navy pill that follows the section you're in. */
function JumpBar() {
  const [active, setActive] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ids = ["top", ...jumps.map((j) => j.href.slice(1))];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === "top" ? null : `#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Slide the pill under the active chip and keep that chip in view. Re-measured on resize too:
  // the bar is display:none on desktop, so a measurement taken there would be zero-width.
  useEffect(() => {
    const box = scroller.current;
    const p = pill.current;
    if (!box || !p) return;
    function place(scroll: boolean) {
      if (!box || !p) return;
      const chip = active ? box.querySelector<HTMLElement>(`[data-jump="${active}"]`) : null;
      if (!chip || !chip.offsetWidth) {
        p.style.opacity = "0";
        if (scroll) box.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      p.style.opacity = "1";
      p.style.width = `${chip.offsetWidth}px`;
      p.style.transform = `translateX(${chip.offsetLeft}px)`;
      if (scroll) box.scrollTo({ left: chip.offsetLeft - box.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
    }
    place(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(box);
    return () => ro.disconnect();
  }, [active]);

  return (
    <nav aria-label="Jump to section" className="border-t border-line/60">
      <div
        ref={scroller}
        className="relative mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-1.5 [scrollbar-width:none] [mask-image:linear-gradient(90deg,#000_88%,transparent)] sm:px-5 [&::-webkit-scrollbar]:hidden"
      >
        <span
          ref={pill}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1.5 h-8 rounded-full bg-navy-900 opacity-0 transition-[transform,width,opacity] duration-300 ease-out"
        />
        {jumps.map((j) => {
          const on = active === j.href;
          return (
            <NavLink
              key={j.href}
              href={j.href}
              data-jump={j.href}
              aria-current={on ? "true" : undefined}
              className={`tap relative inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-[0.82rem] font-semibold transition-colors duration-300 ${
                on ? "text-paper" : "text-slate"
              }`}
            >
              {j.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
