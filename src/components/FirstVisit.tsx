import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { FileIcon } from "./icons";
import { CallButton, Container, SectionLabel, SectionTitle } from "./ui";

const steps = [
  {
    n: "01",
    title: "Call",
    lead: `${site.frontDesk} probably answers.`,
    lines: [
      "Tell her what's going on. If you're nervous, say that too.",
      "Want to skip the clipboard? Fill out the forms at home.",
    ],
    forms: true,
  },
  {
    n: "02",
    title: "Visit",
    lead: "We explain everything. Zero judgement.",
    lines: [
      "Before, during, and after. Nobody asks how long it's been in that tone.",
      "Need a break? Raise a hand. Nervous? Ask about nitrous (laughing gas).",
    ],
  },
  {
    n: "03",
    title: "Plan",
    lead: "A straight quote after a look.",
    lines: [
      "Your options side by side, cost included. You decide. No pressure.",
      "Most insurance plans accepted, with flexible payment options.",
    ],
  },
];

export default function FirstVisit() {
  return (
    <section id="first-visit" aria-labelledby="visit-title" className="relative overflow-hidden bg-aqua-mist py-10 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <SectionLabel n="02">Your first visit</SectionLabel>
            <SectionTitle id="visit-title">
              Built for people who&apos;d <em className="text-teal-deep">rather not.</em>
            </SectionTitle>
          </div>
          <p data-reveal="" style={{ "--d": 2 } as CSSProperties} className="max-w-md text-lg leading-snug text-slate max-sm:hidden lg:pb-2">
            If the dentist makes your palms sweat, you&apos;re in good company. Here&apos;s exactly how it goes.
          </p>
        </div>

        {/* Phones: the three steps swipe sideways instead of stacking */}
        <ol className="swipe relative mt-10 grid gap-4 max-sm:-mx-4 max-sm:mt-5 max-sm:flex max-sm:gap-2.5 max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-1 md:grid-cols-3 md:gap-5">
          {steps.map((s, i) => (
            <li
              key={s.n}
              data-reveal=""
              style={{ "--d": i } as CSSProperties}
              className="relative flex flex-col rounded-3xl border border-teal/15 bg-paper p-6 shadow-[0_20px_50px_-40px_rgb(14_42_64/0.6)] max-sm:w-[82%] max-sm:shrink-0 max-sm:rounded-2xl max-sm:p-4 sm:p-7"
            >
              <span className="display relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-2xl italic text-aqua max-sm:h-11 max-sm:w-11 max-sm:text-xl">
                {s.n}
              </span>
              <div className="min-w-0">
                <h3 className="display mt-5 text-4xl text-ink max-sm:mt-3 max-sm:text-[1.9rem]">{s.title}</h3>
                <p className="mt-1 font-semibold text-teal-deep max-sm:text-[0.95rem]">{s.lead}</p>
                <ul className="mt-3 grid gap-2 text-slate max-sm:mt-1.5 max-sm:gap-1 max-sm:text-[0.9rem] max-sm:leading-snug">
                  {s.lines.map((l) => (
                    <li key={l} className="leading-snug">
                      {l}
                    </li>
                  ))}
                </ul>
                {s.forms && (
                  <a
                    href={site.links.forms}
                    target="_blank"
                    rel="noopener"
                    className="hit mt-3 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-teal-deep underline decoration-teal/40 underline-offset-4 hover:decoration-teal"
                  >
                    <FileIcon className="h-4 w-4" />
                    New-patient forms (PDF)
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-slate/80 sm:hidden">Swipe: call → visit → plan</p>

        <div data-reveal="" className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-navy-900 p-6 text-paper max-sm:mt-3 max-sm:rounded-2xl max-sm:p-4 sm:flex-row sm:items-center sm:p-8">
          <p className="display text-3xl leading-tight max-sm:text-[1.6rem] sm:text-4xl">
            Zero judgement. Zero lectures. <em className="text-aqua">Zero rush.</em>
          </p>
          <CallButton tone="aqua" size="lg" className="max-sm:hidden" />
        </div>
      </Container>
    </section>
  );
}
