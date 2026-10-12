import { site } from "@/lib/site";
import { BrandLockup } from "./BrandMark";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="bg-navy-950 pb-28 pt-12 text-mist max-lg:pt-8 lg:pb-12">
      <Container className="grid grid-cols-2 gap-8 max-sm:gap-x-4 max-sm:gap-y-5 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-1">
          <BrandLockup tone="dark" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed max-sm:mt-3">
            Family dentistry by {site.doctor}. Open since {site.opened}.
          </p>
        </div>
        <div className="text-sm">
          <p className="kicker text-[0.6rem] text-aqua">Call</p>
          <a href={site.phone.href} className="mt-2.5 block text-lg font-semibold tabular-nums text-paper hover:text-aqua max-sm:text-base">
            {site.phone.display}
          </a>
          <p className="mt-1">
            {site.hours.short}
            <br />
            {site.hours.closed}
          </p>
        </div>
        <div className="text-sm">
          <p className="kicker text-[0.6rem] text-aqua">Visit</p>
          <address className="mt-2.5 not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.zip}
          </address>
          <p className="mt-2 flex gap-3">
            <a href={site.links.facebook} target="_blank" rel="noopener" className="underline decoration-white/20 underline-offset-4 hover:text-paper">
              Facebook
            </a>
            <a href={site.links.instagram} target="_blank" rel="noopener" className="underline decoration-white/20 underline-offset-4 hover:text-paper">
              Instagram
            </a>
          </p>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-1.5 border-t border-white/[0.07] pt-6 text-xs text-mist/70 max-sm:mt-6 max-sm:pt-4 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        {site.spec && <p>Proposed site by T3KDesigns</p>}
      </Container>
    </footer>
  );
}
