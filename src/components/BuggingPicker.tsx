"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import { onPick } from "@/lib/pick";
import { services, site, symptoms, type Symptom, type SymptomId } from "@/lib/site";
import NavLink from "./NavLink";
import { AlertIcon, ChevronIcon, PhoneIcon, SymptomIcon } from "./icons";
import { CallButton } from "./ui";

const serviceName = (id: string) => services.find((s) => s.id === id)?.name ?? id;
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * "What's bugging you?" The site's centerpiece. Six tiles; tapping one shows what Dr. Bryn
 * checks first, the treatment path in plain words, what the first visit looks like, and a call
 * button. No prices: she quotes it straight after a look.
 * Phones get an accordion (each answer opens under its row); tablet/desktop get tiles + a panel.
 */
export default function BuggingPicker() {
  const [activeId, setActiveId] = useState<SymptomId | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Deep link: /#pick-missing opens that tile (handy for texting someone a specific answer).
  useEffect(() => {
    function fromHash() {
      const id = location.hash.match(/^#pick-(\w+)$/)?.[1];
      if (!id || !symptoms.some((s) => s.id === id)) return;
      setActiveId(id as SymptomId);
      card.current?.scrollIntoView({ block: "start" });
    }
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  // Other sections ("Bugged by: Missing tooth →") open a tile and bring the picker into view.
  useEffect(
    () =>
      onPick((id) => {
        setActiveId(id);
        requestAnimationFrame(() => {
          const phone = window.matchMedia("(max-width: 639.98px)").matches;
          const target = phone ? document.getElementById(`row-${id}`) : card.current;
          target?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
        });
      }),
    [],
  );

  return (
    <div
      ref={card}
      id="bugging"
      className="grain grain-dark relative scroll-mt-24 overflow-hidden rounded-[1.75rem] bg-navy-900 p-4 text-paper shadow-[0_40px_80px_-40px_rgb(10_34_54/0.7)] sm:p-7 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_100%_0%,rgb(127_211_203/0.16),transparent_60%),radial-gradient(60%_60%_at_0%_100%,rgb(42_157_151/0.12),transparent_60%)]"
      />
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <div>
          <p className="kicker text-[0.66rem] text-aqua">Tap the closest one</p>
          <h2 id="bugging-title" className="display mt-1.5 text-[2.35rem] text-paper sm:text-5xl lg:text-[3.4rem]">
            What&apos;s bugging you?
          </h2>
        </div>
        <p className="max-w-xs text-[0.95rem] leading-snug text-mist max-sm:text-sm">
          No fake instant prices. <span className="text-paper">Dr. Bryn quotes it straight after a look.</span>
        </p>
      </div>

      <MobilePicker activeId={activeId} setActiveId={setActiveId} />

      <DesktopPicker activeId={activeId} setActiveId={setActiveId} panelRef={panel} />
    </div>
  );
}

type PickerProps = { activeId: SymptomId | null; setActiveId: (id: SymptomId | null) => void };

function DesktopPicker({ activeId, setActiveId, panelRef }: PickerProps & { panelRef: RefObject<HTMLDivElement | null> }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = symptoms.find((s) => s.id === activeId) ?? null;
  const activeIdx = symptoms.findIndex((s) => s.id === activeId);

  function choose(id: SymptomId) {
    setActiveId(id);
    // Tablet: the panel sits under the tiles; bring it up if it's mostly offscreen.
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el || window.matchMedia("(min-width: 1024px)").matches) return;
      if (el.getBoundingClientRect().top > window.innerHeight * 0.6) {
        el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      }
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = tabRefs.current.findIndex((t) => t === document.activeElement);
    if (idx < 0) return;
    const last = symptoms.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? idx === last ? 0 : idx + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? idx === 0 ? last : idx - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    choose(symptoms[next].id);
  }

  return (
    <div className="mt-6 grid gap-4 max-sm:hidden lg:grid-cols-[minmax(0,19.5rem)_minmax(0,1fr)] lg:gap-6">
      <div
        role="tablist"
        aria-label="What's bugging you"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2.5 lg:grid-cols-2 lg:content-start"
      >
        {symptoms.map((s, i) => {
          const selected = s.id === activeId;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="bugging-panel"
              tabIndex={selected || (activeIdx < 0 && i === 0) ? 0 : -1}
              onClick={() => choose(s.id)}
              className={`group relative flex min-h-[7.25rem] flex-col items-start justify-between gap-3 rounded-2xl border p-4 text-left transition duration-200 ${
                selected
                  ? "border-aqua bg-aqua/[0.14] shadow-[0_0_0_1px_var(--color-aqua),0_16px_40px_-20px_rgb(127_211_203/0.8)]"
                  : "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-aqua/50 hover:bg-white/[0.07]"
              }`}
            >
              <SymptomIcon
                id={s.id}
                className={`h-9 w-9 transition ${selected ? "text-aqua" : "text-mist group-hover:text-aqua"}`}
              />
              <span className={`text-[1.02rem] font-semibold leading-tight ${selected ? "text-paper" : "text-paper/90"}`}>
                {s.label}
              </span>
              <span
                aria-hidden="true"
                className={`absolute right-3.5 top-3.5 h-2.5 w-2.5 rounded-full transition ${selected ? "bg-aqua" : "bg-white/10"}`}
              />
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id="bugging-panel"
        role="tabpanel"
        aria-labelledby={active ? `tab-${active.id}` : undefined}
        aria-label={active ? undefined : "Pick what's bugging you to see details"}
        tabIndex={-1}
        className="min-w-0 scroll-mt-28 rounded-2xl bg-paper text-ink shadow-2xl shadow-black/30"
      >
        {active ? <Panel key={active.id} s={active} /> : <Idle />}
      </div>
    </div>
  );
}

function Idle() {
  const steps = ["What Dr. Bryn checks first", "The treatment path, in plain words", "What your first visit looks like"];
  return (
    <div className="flex h-full min-h-80 flex-col justify-center gap-5 p-8 lg:p-10">
      <p className="display text-4xl text-ink lg:text-5xl">
        <span className="lg:hidden">Tap one above.</span>
        <span className="hidden lg:inline">
          Tap one on the left. <em className="text-teal-deep">We&apos;ll explain.</em>
        </span>
      </p>
      <ol className="grid gap-2.5">
        {steps.map((t, i) => (
          <li key={t} className="flex items-baseline gap-3 text-lg text-slate">
            <span className="display text-xl italic text-teal">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </li>
        ))}
      </ol>
      <p className="kicker mt-1 text-[0.64rem] text-slate/80">
        {`Or skip all this: ${site.phone.display}. ${site.frontDesk} probably answers.`}
      </p>
    </div>
  );
}

function Panel({ s }: { s: Symptom }) {
  return (
    <div className="panel-in p-6 lg:p-8">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-aqua-soft text-teal-deep">
          <SymptomIcon id={s.id} className="h-8 w-8" />
        </span>
        <div className="min-w-0">
          <h3 className="display text-4xl text-ink lg:text-[2.75rem]">{s.label}</h3>
          <p className="mt-1.5 text-[1.05rem] leading-snug text-slate">{s.calm}</p>
        </div>
      </div>

      {s.urgent && <Urgent text={s.urgent} className="mt-5" />}

      <div className="mt-7 grid gap-x-7 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h4 className="kicker text-[0.64rem] text-teal-deep">What Dr. Bryn checks first</h4>
          <ol className="mt-3 grid gap-2.5">
            {s.checks.map((c, i) => (
              <li key={c} className="flex gap-2.5 leading-snug">
                <span className="display mt-[-0.1rem] shrink-0 text-lg italic text-teal">{i + 1}</span>
                <span className="text-[0.95rem] text-ink/90">{c}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="kicker text-[0.64rem] text-teal-deep">The path, in plain words</h4>
          <PathList s={s} className="mt-3" />
        </div>
        <div className="md:col-span-2 xl:col-span-1">
          <h4 className="kicker text-[0.64rem] text-teal-deep">Your first visit</h4>
          <p className="mt-3 text-[0.95rem] leading-snug text-ink/90">{s.firstVisit}</p>
          {s.tip && <Tip s={s} className="mt-4" />}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div className="text-[0.95rem] leading-snug text-slate">
          <p>
            <span className="font-semibold text-ink">Price?</span> Dr. Bryn quotes it straight after a look.
          </p>
          <p className="mt-1 text-sm">
            More on{" "}
            {s.services.map((id, i) => (
              <span key={id}>
                {i > 0 && " · "}
                <NavLink href={`#work-${id}`} className="font-medium text-teal-deep underline decoration-teal/40 underline-offset-4 hover:decoration-teal">
                  {serviceName(id)}
                </NavLink>
              </span>
            ))}
          </p>
        </div>
        <CallButton size="lg" />
      </div>
    </div>
  );
}

function PathList({ s, className = "" }: { s: Symptom; className?: string }) {
  return (
    <ol className={`relative grid gap-3 ${className}`}>
      <span aria-hidden="true" className="absolute bottom-2 left-[0.3rem] top-2 w-px bg-teal/30" />
      {s.path.map((p) => (
        <li key={p.name} className="relative flex gap-3">
          <span aria-hidden="true" className="relative mt-[0.4rem] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-teal bg-paper" />
          <span className="text-[0.95rem] leading-snug">
            <span className="font-semibold text-ink">{`${p.name}.`}</span> <span className="text-ink/80">{p.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Tip({ s, className = "" }: { s: Symptom; className?: string }) {
  if (!s.tip) return null;
  return (
    <div className={`rounded-xl border border-dashed border-teal/40 bg-aqua-mist p-3.5 ${className}`}>
      <p className="kicker text-[0.6rem] text-teal-deep">{s.tip.title}</p>
      <p className="mt-1 text-[0.92rem] leading-snug text-ink/85">{s.tip.text}</p>
    </div>
  );
}

function Urgent({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex gap-3 rounded-xl border border-ember/30 bg-[#fbe9df] p-3.5 text-ink ${className}`}>
      <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
      <p className="text-[0.95rem] font-semibold leading-snug">{text}</p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Phones: one row per tile, the answer slides open beneath it.
   Inside, three small tabs keep each answer to about one screen.
   ------------------------------------------------------------------ */

const PARTS = [
  { id: "checks", label: "Checks first" },
  { id: "path", label: "The path" },
  { id: "visit", label: "First visit" },
] as const;
type Part = (typeof PARTS)[number]["id"];

function MobilePicker({ activeId, setActiveId }: PickerProps) {
  const [part, setPart] = useState<Part>("checks");
  const rows = useRef<Record<string, HTMLButtonElement | null>>({});

  function toggle(id: SymptomId) {
    const next = activeId === id ? null : id;
    setActiveId(next);
    setPart("checks");
    if (!next) return;
    navigator.vibrate?.(8);
    // Once the previously open answer has folded away, make sure this row's top is on screen.
    window.setTimeout(() => {
      const el = rows.current[id];
      if (!el) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = el.getBoundingClientRect().top;
      if (top < pad || top > window.innerHeight * 0.45) {
        el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      }
    }, 370);
  }

  return (
    <ul className="mt-4 grid gap-2 sm:hidden">
      {symptoms.map((s, i) => {
        const open = s.id === activeId;
        return (
          <li
            key={s.id}
            data-reveal=""
            style={{ "--d": i } as CSSProperties}
            className={`rounded-2xl border transition-colors ${open ? "border-aqua/80 bg-paper text-ink" : "border-white/10 bg-white/[0.05]"}`}
          >
            <button
              ref={(el) => {
                rows.current[s.id] = el;
              }}
              id={`row-${s.id}`}
              type="button"
              aria-expanded={open}
              aria-controls={`acc-${s.id}`}
              onClick={() => toggle(s.id)}
              className="tap flex min-h-[3.4rem] w-full scroll-mt-28 items-center gap-3 rounded-2xl px-3 py-2 text-left"
            >
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  open ? "bg-aqua-soft text-teal-deep" : "bg-white/[0.06] text-aqua"
                }`}
              >
                <SymptomIcon id={s.id} className="h-6 w-6" />
              </span>
              <span className={`min-w-0 flex-1 text-[1.02rem] font-semibold leading-tight ${open ? "text-ink" : "text-paper"}`}>
                {s.label}
              </span>
              <ChevronIcon
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-teal-deep" : "text-aqua"}`}
              />
            </button>

            <div id={`acc-${s.id}`} className="acc-panel" data-open={open} inert={!open}>
              <div>
                <div className="px-3 pb-3.5">
                  <p className="text-[0.94rem] leading-snug text-slate">{s.calm}</p>
                  {s.urgent && <Urgent text={s.urgent} className="mt-3 p-3 [&_p]:text-[0.88rem]" />}

                  <div role="tablist" aria-label={`${s.label}: details`} className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-aqua-mist p-1">
                    {PARTS.map((p) => {
                      const on = open && part === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="tab"
                          aria-selected={on}
                          aria-controls={`acc-${s.id}-${p.id}`}
                          onClick={() => setPart(p.id)}
                          className={`tap hit min-h-10 rounded-lg px-1 text-[0.8rem] font-semibold transition-colors ${
                            on ? "bg-navy-900 text-paper shadow" : "text-teal-deep"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  <div id={`acc-${s.id}-${part}`} role="tabpanel" key={part} className="panel-in mt-3 min-h-[8.5rem]">
                    {part === "checks" && (
                      <ol className="grid gap-2">
                        {s.checks.map((c, n) => (
                          <li key={c} className="flex gap-2.5 text-[0.92rem] leading-snug text-ink/90">
                            <span className="display shrink-0 text-lg italic leading-none text-teal">{n + 1}</span>
                            {c}
                          </li>
                        ))}
                      </ol>
                    )}
                    {part === "path" && <PathList s={s} />}
                    {part === "visit" && (
                      <>
                        <p className="text-[0.92rem] leading-snug text-ink/90">{s.firstVisit}</p>
                        {s.tip && <Tip s={s} className="mt-2.5 p-3" />}
                      </>
                    )}
                  </div>

                  <p className="mt-3 border-t border-line pt-3 text-[0.88rem] text-slate">
                    <span className="font-semibold text-ink">Price?</span> Dr. Bryn quotes it straight after a look.
                  </p>
                  <a
                    href={site.phone.href}
                    className="btn-navy tap mt-2.5 flex min-h-13 items-center justify-center gap-2.5 rounded-xl px-4 py-2"
                  >
                    <PhoneIcon className="h-5 w-5 shrink-0" />
                    <span className="leading-tight">
                      <span className="block font-semibold tabular-nums">{`Call ${site.phone.display}`}</span>
                      <span className="block text-xs opacity-80">{`${site.frontDesk} probably answers.`}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
