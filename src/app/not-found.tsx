import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="grain flex min-h-svh flex-col items-center justify-center gap-6 bg-paper px-4 text-center">
      <BrandMark className="h-16 w-16" />
      <h1 className="display text-5xl text-ink sm:text-6xl">
        This page is <em className="text-teal-deep">missing.</em>
      </h1>
      <p className="max-w-sm text-slate">We can&apos;t fix this one. Missing teeth, though, we can.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line px-6 font-semibold text-ink hover:border-teal/50"
        >
          Back to home
        </Link>
        <a href={site.phone.href} className="btn-navy inline-flex min-h-12 items-center justify-center rounded-xl px-6 font-semibold">
          Call {site.phone.display}
        </a>
      </div>
    </main>
  );
}
