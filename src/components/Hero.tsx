import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import BuggingPicker from "./BuggingPicker";
import OpenStatus from "./OpenStatus";
import { Container, Stars } from "./ui";

/** Soft river contour lines drifting across the top of the hero. Decorative only. */
function RiverLines({ className = "" }: { className?: string }) {
  const lines = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true" className={className}>
      {lines.map((i) => (
        <path
          key={i}
          d={`M-20 ${120 + i * 34} C 180 ${70 + i * 34}, 360 ${190 + i * 34}, 600 ${130 + i * 34} S 1000 ${60 + i * 34}, 1220 ${125 + i * 34}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 2 ? 2 : 1.2}
          className={i === 2 ? "flow-line" : undefined}
          opacity={1 - i * 0.12}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative overflow-hidden pb-10 pt-6 sm:pb-20 sm:pt-12 lg:pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_88%_0%,rgb(127_211_203/0.32),transparent_70%),radial-gradient(50%_50%_at_0%_30%,rgb(214_238_234/0.7),transparent_70%)]"
      />
      <RiverLines className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-64 w-full text-teal/25 max-sm:top-40 max-sm:h-40 sm:h-80" />

      <Container>
        <div className="relative">
          <p className="m-intro kicker text-[0.66rem] text-teal-deep sm:text-[0.72rem]">
            {`Family dentistry · ${site.address.city}, Iowa · Since ${site.opened}`}
          </p>
          <h1
            id="hero-title"
            style={{ "--d": 1 } as CSSProperties}
            className="m-intro display mt-3 text-[3.25rem] text-ink sm:text-[5.2rem] lg:text-[5.9rem] xl:text-[6.6rem]"
          >
            Nobody loves <br className="sm:hidden" />
            {"the dentist. "}
            <br />
            <em className="text-teal-deep">We know.</em>
          </h1>

          {/* Wide desktop: tucked into the empty space beside "We know." Below xl the headline runs too wide for it. */}
          <div
            style={{ "--d": 2 } as CSSProperties}
            className="m-intro mt-5 max-w-xl max-sm:mt-3 xl:absolute xl:bottom-1 xl:right-0 xl:mt-0 xl:w-[30rem] xl:max-w-none"
          >
            <p className="text-lg leading-snug text-slate max-sm:text-[1.02rem] sm:text-xl xl:text-[1.05rem]">
              Dr. Bryn explains everything, <span className="text-ink">twice if you need it.</span> Zero judgement.
              Gentle hands.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <a
                href="#reviews"
                className="hit inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 font-semibold text-ink backdrop-blur hover:border-teal/50"
              >
                <Stars className="text-[0.85rem]" />
                {`${site.rating.score} from ${site.rating.count} reviews`}
              </a>
              <span className="inline-flex min-h-[2.1rem] items-center rounded-full border border-line bg-white/70 px-3 py-1.5 font-medium text-slate backdrop-blur empty:hidden">
                <OpenStatus />
              </span>
            </div>
          </div>
        </div>

        <div style={{ "--d": 3 } as CSSProperties} className="m-intro mt-6 sm:mt-9" aria-labelledby="bugging-title" role="region">
          <BuggingPicker />
        </div>
      </Container>
    </section>
  );
}
