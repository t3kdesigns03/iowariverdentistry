import type { CSSProperties } from "react";
import { site, year2018 } from "@/lib/site";
import { Crouton, Softball } from "./Art";
import TickOnView from "./TickOnView";
import { Container, SectionLabel, SectionTitle } from "./ui";

const facts = [
  { k: "Implants", big: "ICOI Fellow", text: "Implant fellowship. Placed 20 implants in training." },
  { k: "2019", big: "20+ local orgs", text: "Backed her for a Delta Dental loan-repayment award." },
  { k: "Special interests", big: "Older & special-needs patients", text: "Plus implants. Patience is the specialty." },
  { k: "Member", big: "ADA · IDA · AGD", text: "American, Iowa, and General dental associations." },
];

function SoftballCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-navy-900 p-5 text-paper ${className}`}>
      <Softball className="absolute -right-7 -top-7 h-24 w-24 rotate-12 opacity-95" />
      <p className="kicker pr-14 text-[0.58rem] text-aqua">Before the drill</p>
      <p className="display mt-2 text-[2rem] leading-none">4 seasons</p>
      <p className="mt-1 text-sm text-mist">College softball, Simpson College. Majored in biology.</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-sm">
        <div>
          <dt className="kicker text-[0.55rem] text-mist">Hometown</dt>
          <dd className="mt-0.5 font-semibold">Laurens, IA</dd>
        </div>
        <div>
          <dt className="kicker text-[0.55rem] text-mist">DDS, 2018</dt>
          <dd className="mt-0.5 font-semibold">U of Iowa</dd>
        </div>
      </dl>
    </div>
  );
}

function CroutonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-between rounded-2xl border border-line bg-white p-5 text-center ${className}`}>
      <Crouton className="h-28 w-28" />
      <div>
        <p className="display text-[2rem] leading-none text-ink">Crouton</p>
        <p className="mt-1 text-sm text-slate">The corgi. Ask her about Crouton.</p>
      </div>
    </div>
  );
}

export default function MeetBryn() {
  return (
    <section id="dr-bryn" aria-labelledby="bryn-title" className="grain bg-sand py-10 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionLabel n="01">Dr. Bryn</SectionLabel>
            <SectionTitle id="bryn-title">
              Graduated in May. <em className="text-teal-deep">Opened in September.</em>
            </SectionTitle>
            <p data-reveal="" style={{ "--d": 2 } as CSSProperties} className="mt-5 max-w-xl text-lg leading-relaxed text-slate max-sm:hidden">
              Same year: 2018. In between, she moved to Iowa Falls, bought a house, bought the practice, and married
              Reece. <span className="text-ink">All in one year.</span>
            </p>
            <p data-reveal="" style={{ "--d": 3 } as CSSProperties} className="mt-4 max-w-xl text-lg leading-relaxed text-slate max-sm:hidden">
              {site.doctor} grew up in Laurens, Iowa, played four years of college softball, then went to dental
              school at the University of Iowa. She&apos;s been on Washington Ave ever since.
            </p>

            <blockquote data-reveal="" className="mt-7 border-l-2 border-teal pl-5 max-sm:mt-4 max-sm:pl-4">
              <p className="display text-balance text-3xl italic text-ink max-sm:text-[1.65rem] sm:text-4xl">
                She explains everything. Twice if you need it.
              </p>
              <footer className="kicker mt-2 text-[0.6rem] text-slate">The house rule</footer>
            </blockquote>

            <div className="mt-10 grid gap-3 max-lg:hidden sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.big} className="rounded-2xl border border-line bg-paper p-5">
                  <p className="kicker text-[0.58rem] text-teal-deep">{f.k}</p>
                  <p className="display mt-1.5 text-2xl leading-tight text-ink">{f.big}</p>
                  <p className="mt-1 text-sm leading-snug text-slate">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-4">
            <TickOnView className="rounded-3xl border border-line bg-paper p-6 shadow-[0_24px_60px_-40px_rgb(14_42_64/0.5)] max-sm:p-5 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="display text-[4.5rem] leading-[0.8] text-ink max-sm:text-6xl">
                  20<em className="text-teal">18</em>
                </p>
                <p className="kicker text-right text-[0.6rem] text-slate">One year.<br />Six boxes.</p>
              </div>
              <ul className="mt-5 grid gap-0.5 max-sm:mt-3">
                {year2018.map((y, i) => (
                  <li key={y.what} className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0 max-sm:py-1.5">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0">
                      <rect x="2" y="2" width="20" height="20" rx="6" fill="#d6eeea" />
                      <path
                        data-tick=""
                        style={{ "--d": i } as CSSProperties}
                        d="M7 12.5l3.2 3.2L17.5 8"
                        fill="none"
                        stroke="#17706c"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="min-w-0 flex-1 leading-snug text-ink max-sm:text-[0.93rem]">{y.what}</span>
                    {y.when && <span className="kicker shrink-0 text-[0.58rem] text-teal-deep">{y.when}</span>}
                  </li>
                ))}
              </ul>
            </TickOnView>

            <div className="grid grid-cols-2 gap-4 max-sm:hidden">
              <SoftballCard />
              <CroutonCard />
            </div>
          </div>
        </div>

        {/* Phones: everything else in one swipe row instead of a long stack */}
        <div className="swipe -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1 sm:hidden" aria-label="More about Dr. Bryn" role="group">
          <SoftballCard className="w-[78%] shrink-0" />
          <CroutonCard className="w-[60%] shrink-0" />
          {facts.map((f) => (
            <div key={f.big} className="w-[70%] shrink-0 rounded-2xl border border-line bg-paper p-4">
              <p className="kicker text-[0.56rem] text-teal-deep">{f.k}</p>
              <p className="display mt-1 text-[1.6rem] leading-tight text-ink">{f.big}</p>
              <p className="mt-1 text-sm leading-snug text-slate">{f.text}</p>
            </div>
          ))}
        </div>
        {/* Tablets: facts as a 2×2 under everything */}
        <div className="mt-8 grid grid-cols-2 gap-3 max-sm:hidden lg:hidden">
          {facts.map((f) => (
            <div key={f.big} className="rounded-2xl border border-line bg-paper p-5">
              <p className="kicker text-[0.58rem] text-teal-deep">{f.k}</p>
              <p className="display mt-1.5 text-2xl leading-tight text-ink">{f.big}</p>
              <p className="mt-1 text-sm leading-snug text-slate">{f.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
