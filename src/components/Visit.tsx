import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { RiverPostcard } from "./Art";
import OpenStatus from "./OpenStatus";
import { AlertIcon, ArrowIcon, MailIcon, PinIcon } from "./icons";
import { CallButton, Container, SectionLabel, SectionTitle } from "./ui";

const week = [
  { d: "Mon", open: true },
  { d: "Tue", open: true },
  { d: "Wed", open: true },
  { d: "Thu", open: true },
  { d: "Fri", open: false },
  { d: "Sat", open: false },
  { d: "Sun", open: false },
];

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-us-title" className="grain bg-paper py-10 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <SectionLabel>Come see us</SectionLabel>
            <SectionTitle id="visit-us-title">
              922 Washington Ave. <em className="text-teal-deep">Iowa Falls.</em>
            </SectionTitle>
            <p data-reveal="" style={{ "--d": 2 } as CSSProperties} className="mt-4 text-lg text-slate max-sm:text-base">
              Serving {site.towns.join(" and ")}, and the towns in between.
            </p>

            {/* Hours as a week strip */}
            <div data-reveal="" className="mt-8 max-sm:mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="kicker text-[0.62rem] text-teal-deep">Hours</p>
                <OpenStatus className="text-sm font-medium text-slate" />
              </div>
              <ul className="mt-3 grid grid-cols-7 gap-1.5">
                {week.map((w) => (
                  <li
                    key={w.d}
                    className={`flex flex-col items-center rounded-xl py-2.5 text-center ${
                      w.open ? "bg-navy-900 text-paper" : "border border-dashed border-line text-slate/70"
                    }`}
                  >
                    <span className="kicker text-[0.58rem] tracking-[0.14em]">{w.d}</span>
                    <span className={`mt-1 text-[0.7rem] leading-tight ${w.open ? "text-aqua" : ""}`}>
                      {w.open ? "7:30–4:30" : "Closed"}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-slate max-sm:sr-only">
                {site.hours.days}, {site.hours.time}. {site.hours.closed}.
              </p>
            </div>

            <div data-reveal="" className="mt-6 flex gap-3 rounded-2xl border border-ember/25 bg-[#fbeee6] p-4 max-sm:mt-4 max-sm:p-3 max-sm:text-[0.92rem]">
              <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
              <p className="leading-snug text-ink">
                <span className="font-semibold">Emergency?</span> {site.emergency}
              </p>
            </div>

            <div data-reveal="" className="mt-6 grid grid-cols-2 gap-2 text-ink max-sm:mt-3">
              <a
                href={site.links.directions}
                target="_blank"
                rel="noopener"
                className="tap flex items-center gap-3 rounded-2xl border border-line bg-white p-4 hover:border-teal/40 max-sm:gap-2 max-sm:p-3"
              >
                <PinIcon className="h-5 w-5 shrink-0 text-teal-deep" />
                <span className="min-w-0 flex-1 leading-snug">
                  <span className="block font-semibold">Directions</span>
                  <span className="block text-sm text-slate max-sm:hidden">{site.address.oneLine}</span>
                  <span className="block text-sm text-slate sm:hidden">Google Maps</span>
                </span>
                <ArrowIcon className="h-4 w-4 shrink-0 text-teal-deep" />
              </a>
              <a href={`mailto:${site.email}`} className="tap flex items-center gap-3 rounded-2xl border border-line bg-white p-4 hover:border-teal/40 max-sm:gap-2 max-sm:p-3">
                <MailIcon className="h-5 w-5 shrink-0 text-teal-deep" />
                <span className="min-w-0 flex-1 leading-snug">
                  <span className="block font-semibold">Rather write?</span>
                  <span className="block truncate text-sm text-slate max-sm:hidden">{site.email}</span>
                  <span className="block text-sm text-slate sm:hidden">Email us</span>
                </span>
                <ArrowIcon className="h-4 w-4 shrink-0 text-teal-deep" />
              </a>
            </div>
          </div>

          <div id="big-call" className="flex flex-col gap-4">
            <figure data-reveal="" className="overflow-hidden rounded-[1.4rem] border border-line bg-white p-2 shadow-[0_30px_60px_-40px_rgb(14_42_64/0.6)] max-sm:hidden">
              <RiverPostcard className="block h-auto w-full" />
              <figcaption className="flex items-center justify-between px-3 pb-1.5 pt-3">
                <span className="display text-2xl italic text-ink">Greetings from the Iowa River</span>
                <span className="kicker text-[0.56rem] text-slate">Iowa Falls, IA</span>
              </figcaption>
            </figure>
            <div data-reveal="" className="rounded-[1.4rem] bg-navy-900 p-6 text-paper max-sm:p-5 sm:p-7">
              <p className="kicker text-[0.6rem] text-aqua">The easy part</p>
              <p className="display mt-2 text-4xl leading-tight max-sm:text-[1.8rem]">
                Call. Say what&apos;s bugging you. <em className="text-aqua">That&apos;s it.</em>
              </p>
              <CallButton tone="aqua" size="lg" className="mt-5 w-full justify-center sm:w-auto" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
