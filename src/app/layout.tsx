import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import MobileMotion from "@/components/MobileMotion";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted (SIL OFL) so builds never depend on reaching Google Fonts.
const serif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const sans = localFont({
  src: "../fonts/instrument-sans-latin-wght-normal.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-instrument-sans",
  display: "swap",
});

// Absolute base for og:image etc. SITE_URL wins (set it for CLI deploys built locally); on Netlify
// builds, deploy previews use their own URL and production uses the site's main URL.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ??
  process.env.URL ??
  "https://iowariverdentistry.t3kdesigns.app";

const description = `Family dentist in Iowa Falls, IA. Dr. Bryn Johnson Ealy explains everything, judges nothing, and is gentle. ${site.rating.score} stars from ${site.rating.count} reviews. Mon–Thu 7:30–4:30. Call ${site.phone.display}.`;
const ogAlt = `Nobody loves the dentist. We know. ${site.name}, Iowa Falls. ${site.phone.display}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} | Dr. Bryn Ealy, Family Dentist in Iowa Falls`,
  description,
  openGraph: {
    type: "website",
    title: "Nobody loves the dentist. We know.",
    description: `We explain everything, judge nothing, and we're gentle. ${site.rating.score} stars from ${site.rating.count} neighbors.`,
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ogAlt, type: "image/png" }],
  },
  twitter: { card: "summary_large_image", images: [{ url: "/og-image.png", alt: ogAlt }] },
  formatDetection: { telephone: true },
  robots: site.spec ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.name,
  telephone: site.phone.e164,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHours: site.hours.schema,
  founder: { "@type": "Person", name: site.doctor },
  foundingDate: "2018-09",
  areaServed: site.towns.map((n) => ({ "@type": "City", name: `${n}, IA` })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.score,
    reviewCount: site.rating.countNumber,
  },
  sameAs: [site.links.facebook, site.links.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-3 focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <MobileMotion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
