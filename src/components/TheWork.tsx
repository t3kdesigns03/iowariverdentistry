"use client";

import type { CSSProperties } from "react";
import { pickSymptom } from "@/lib/pick";
import { extras, services, symptoms } from "@/lib/site";
import { ArrowIcon, SymptomIcon } from "./icons";
import { Container, SectionLabel, SectionTitle } from "./ui";

const label = (id: string) => symptoms.find((s) => s.id === id)?.short ?? id;

export default function TheWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-paper py-10 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <SectionLabel n="03">The work</SectionLabel>
            <SectionTitle id="work-title">
              Everything, <em className="text-teal-deep">in one honest line.</em>
            </SectionTitle>
          </div>
          <p data-reveal="" style={{ "--d": 2 } as CSSProperties} className="max-w-md text-lg leading-snug text-slate max-sm:text-[0.95rem] lg:pb-2">
            <span className="max-sm:hidden">
              Not sure which one you need? Tap the problem under any of these and the picker up top explains it.
            </span>
            <span className="sm:hidden">Tap the little tooth on any card to see it in the picker.</span>
          </p>
        </div>

        {/* Phones: one tight list inside a single card; tablets/desktop: a grid of cards */}
        <ul className="mt-10 grid gap-3 max-sm:mt-5 max-sm:gap-0 max-sm:divide-y max-sm:divide-line max-sm:overflow-hidden max-sm:rounded-2xl max-sm:border max-sm:border-line max-sm:bg-white sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.id}
              id={`work-${s.id}`}
              data-reveal=""
              style={{ "--d": i % 3 } as CSSProperties}
              className={`group flex scroll-mt-32 flex-col rounded-2xl border p-6 transition max-sm:rounded-none max-sm:border-0 max-sm:px-4 max-sm:py-3 ${
                s.id === "emergency"
                  ? "border-ember/25 bg-[#fbeee6]"
                  : "border-line bg-white hover:border-teal/40 hover:shadow-[0_20px_50px_-36px_rgb(14_42_64/0.55)]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-[2rem] leading-none text-ink max-sm:text-[1.5rem]">{s.name}</h3>
                <span className="display text-lg italic text-teal/80 max-sm:hidden">{String(i + 1).padStart(2, "0")}</span>
                {/* Phones: one tap opens the matching picker tile */}
                <button
                  type="button"
                  onClick={() => pickSymptom(s.picks[0])}
                  aria-label={`Open the picker: ${label(s.picks[0])}`}
                  className="tap -my-1 inline-flex h-9 shrink-0 items-center gap-1 self-center rounded-full bg-aqua-mist pl-2 pr-2.5 text-teal-deep sm:hidden"
                >
                  <SymptomIcon id={s.picks[0]} className="h-5 w-5" />
                  <ArrowIcon className="h-3.5 w-3.5 -rotate-90" />
                </button>
              </div>
              <p className="mt-2.5 flex-1 leading-snug text-slate max-sm:mt-1 max-sm:text-[0.9rem]">{s.line}</p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5 max-sm:hidden">
                <span className="kicker mr-1 text-[0.56rem] text-slate/80 max-sm:mr-0">Bugged by</span>
                {s.picks.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => pickSymptom(p)}
                    className="tap inline-flex min-h-8 items-center gap-1 rounded-full bg-aqua-mist px-3 text-[0.82rem] max-sm:px-2.5 max-sm:text-[0.78rem] font-semibold text-teal-deep transition hover:bg-aqua-soft"
                  >
                    {label(p)}
                    <ArrowIcon className="h-3.5 w-3.5 -rotate-90" />
                  </button>
                ))}
              </div>
            </li>
          ))}
          <li data-reveal="" className="flex flex-col justify-center rounded-2xl border border-dashed border-teal/40 p-6 max-sm:rounded-none max-sm:border-0 max-sm:bg-aqua-mist max-sm:px-4 max-sm:py-3 lg:col-span-2">
            <p className="kicker text-[0.6rem] text-teal-deep">Also on the list</p>
            <p className="mt-2 leading-relaxed text-ink max-sm:text-[0.95rem]">{extras.join(" · ")}</p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
