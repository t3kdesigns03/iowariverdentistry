import type { CSSProperties } from "react";
import { reviews, site } from "@/lib/site";
import { ArrowIcon } from "./icons";
import { Container, SectionLabel, Stars } from "./ui";

/** Radical-transparency block + what patients actually say. */
export default function Trust() {
  return (
    <section id="reviews" aria-labelledby="trust-title" className="grain grain-dark relative overflow-hidden bg-navy-900 py-12 text-paper sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_100%_0%,rgb(127_211_203/0.14),transparent_60%)]"
      />
      <Container>
        <SectionLabel tone="dark">The honest part</SectionLabel>
        <h2 id="trust-title" data-reveal="" className="display max-w-5xl text-[2.6rem] text-paper sm:text-6xl lg:text-[5.2rem]">
          Nobody loves the dentist. <em className="text-aqua">We know.</em>
        </h2>
        <p data-reveal="" style={{ "--d": 2 } as CSSProperties} className="mt-6 max-w-3xl text-xl leading-snug text-mist max-sm:mt-4 max-sm:text-[1.05rem] sm:text-2xl">
          Here&apos;s what we&apos;re like anyway: <span className="text-paper">we explain everything, we judge nothing, and
          we&apos;re gentle.</span>
        </p>

        <div data-reveal="" style={{ "--d": 3 } as CSSProperties} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 max-sm:mt-4">
          <p className="flex items-baseline gap-3">
            <span className="display text-7xl leading-none text-paper max-sm:text-6xl">{site.rating.score}</span>
            <span>
              <Stars className="text-xl" />
              <span className="block text-sm text-mist">from {site.rating.count} neighbors · Birdeye + Google</span>
            </span>
          </p>
          <a
            href={site.links.reviews}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-aqua underline decoration-aqua/40 underline-offset-4 hover:decoration-aqua"
          >
            Read them yourself
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Desktop: a loose grid; phones: one swipe row */}
        <ul className="swipe mt-10 grid gap-4 max-sm:-mx-4 max-sm:mt-5 max-sm:flex max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-1 sm:grid-cols-2 lg:grid-cols-6">
          {reviews.map((r, i) => (
            <li
              key={r.theme}
              className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-6 max-sm:w-[82%] max-sm:shrink-0 max-sm:p-5 ${
                i < 2 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <blockquote>
                <p className={`display leading-snug text-paper ${i === 0 ? "text-[1.4rem] sm:text-3xl" : "text-[1.3rem] sm:text-[1.7rem]"}`}>
                  &ldquo;{r.quote}&rdquo;
                </p>
              </blockquote>
              <p className="kicker mt-5 flex items-center gap-2 text-[0.58rem] text-aqua">
                <span aria-hidden="true" className="h-px w-6 bg-aqua/60" />
                {r.theme}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-mist/70 sm:hidden">Swipe for more →</p>
      </Container>
    </section>
  );
}
