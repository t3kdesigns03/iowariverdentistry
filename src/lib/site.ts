// Single source of truth for business details. Every fact here comes from the practice's own site
// (iowariverdentistry.com, Oct 2026), Dr. Bryn's bio, or their Birdeye/Google reviews. Nothing invented.

export const site = {
  name: "Iowa River Dentistry",
  doctor: "Dr. Bryn Johnson Ealy, DDS",
  doctorShort: "Dr. Bryn",
  opened: "September 2018",
  // The assistant patients name in reviews ("Hailee"). Their current site spells it "Halee Aldinger".
  // Confirm the spelling with the office before launch; it's used in every call button.
  frontDesk: "Hailee",
  phone: {
    display: "(641) 648-4237",
    href: "tel:+16416484237",
    e164: "+16416484237",
  },
  email: "iowariverdds@gmail.com",
  address: {
    street: "922 Washington Ave",
    city: "Iowa Falls",
    region: "IA",
    zip: "50126",
    oneLine: "922 Washington Ave, Iowa Falls, IA 50126",
  },
  towns: ["Iowa Falls", "Eldora"],
  hours: {
    days: "Mon – Thu",
    time: "7:30am – 4:30pm",
    short: "Mon–Thu 7:30–4:30",
    closed: "Closed Fri – Sun",
    schema: "Mo-Th 07:30-16:30",
    // Used by the live open/closed badge. Minutes after midnight, Central time; 1 = Monday.
    open: 7 * 60 + 30,
    close: 16 * 60 + 30,
    workdays: [1, 2, 3, 4],
    tz: "America/Chicago",
  },
  // Birdeye + Google combined, Oct 2026. Re-check before launch.
  rating: { score: "4.9", count: "250+", countNumber: 250 },
  emergency: "Tooth pain, broken or knocked-out tooth? Call right away. Same-day when we can.",
  links: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Iowa+River+Dentistry%2C+922+Washington+Ave%2C+Iowa+Falls%2C+IA+50126",
    reviews: "https://www.google.com/maps/search/?api=1&query=Iowa+River+Dentistry+922+Washington+Ave+Iowa+Falls+IA",
    // New-patient paperwork, still hosted on their current site. Move it when that site goes away.
    forms: "https://www.iowariverdentistry.com/_files/ugd/a9990a_c2f1650c5c9942c69a497103f1df7dc8.pdf",
    facebook: "https://www.facebook.com/iowariverdentistry",
    instagram: "https://www.instagram.com/iowariverdentistry",
  },
  // Preview mode. While true: noindex/nofollow for search engines and the "Proposed site by
  // T3KDesigns" footer credit. Flip to false when the practice buys. That's the whole go-live switch.
  spec: true,
} as const;

export const nav = [
  { href: "#bugging", label: "What's bugging you?" },
  { href: "#dr-bryn", label: "Dr. Bryn" },
  { href: "#first-visit", label: "First visit" },
  { href: "#work", label: "The work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

/* ------------------------------------------------------------------
   "What's bugging you?" picker
   ------------------------------------------------------------------ */

export type SymptomId = "hurts" | "crooked" | "missing" | "stained" | "kid" | "dentures";
export type ServiceId = "preventive" | "fillings" | "crowns" | "implants" | "invisalign" | "dentures" | "emergency";

export type Symptom = {
  id: SymptomId;
  label: string;
  /** Chip label in section 03. */
  short: string;
  /** One calm line under the title. */
  calm: string;
  urgent?: string;
  checks: string[];
  path: { name: string; text: string }[];
  firstVisit: string;
  tip?: { title: string; text: string };
  services: ServiceId[];
};

export const symptoms: Symptom[] = [
  {
    id: "hurts",
    short: "Tooth pain",
    label: "My tooth hurts",
    calm: "Pain is your tooth asking for help. Most of the time, there's a fix that saves it.",
    urgent: "Bad pain, swelling, or a broken or knocked-out tooth? Call right away. Same-day when we can.",
    checks: [
      "Where it hurts and what sets it off: cold, hot, or biting down.",
      "An X-ray of that tooth, looking for decay, a crack, or infection.",
      "The gum around it. Sometimes it's the gum, not the tooth.",
    ],
    path: [
      { name: "Small cavity", text: "A filling. Usually one visit." },
      { name: "Cracked or broken", text: "A crown, a cap that holds it together." },
      { name: "Infected nerve", text: "A root canal to save the tooth. Pulling it is the last resort, not the first." },
    ],
    firstVisit:
      "We look, take an X-ray, and tell you what we see before we touch anything. Getting you comfortable comes first.",
    tip: {
      title: "Knocked-out tooth?",
      text: "Pick it up by the top, not the root. Keep it in milk. Call us on the way.",
    },
    services: ["emergency", "fillings", "crowns"],
  },
  {
    id: "crooked",
    short: "Crooked smile",
    label: "Crooked smile",
    calm: "Straighter teeth without metal brackets. Clear trays you can take out to eat.",
    checks: [
      "How your teeth bite together, not just how they look.",
      "Healthy gums and bone, so teeth can move safely.",
      "Whether clear aligners are a good fit for your teeth. Honest answer either way.",
    ],
    path: [
      { name: "Impressions", text: "We capture your teeth and map out the plan." },
      { name: "Clear trays", text: "Invisalign. A new set every week or two as teeth shift." },
      { name: "Check-ins", text: "Quick visits to make sure it's moving on track." },
      { name: "Retainer", text: "Keeps the new smile where it ended up." },
    ],
    firstVisit:
      "A look and a chat about what bugs you about your smile. Then a straight answer on whether Invisalign fits. No pressure to start.",
    services: ["invisalign"],
  },
  {
    id: "missing",
    short: "Missing tooth",
    label: "Missing tooth",
    calm: "Three good ways to fill a gap. You'll see all three, side by side.",
    checks: [
      "The bone where the tooth was. Implants need something to hold on to.",
      "The teeth on either side, in case a bridge makes more sense.",
      "Health stuff that affects healing, like smoking or diabetes. Asked without judgement.",
    ],
    path: [
      { name: "Implant", text: "A post in the bone, a crown on top. The closest thing to your own tooth." },
      { name: "Bridge", text: "A new tooth anchored to the teeth on either side." },
      { name: "Partial denture", text: "Removable. Often the gentlest on the budget." },
    ],
    firstVisit:
      "An exam and X-rays, then every option laid out: pros, cons, and cost. You pick. It doesn't matter how long it's been missing.",
    tip: {
      title: "Implants, specifically",
      text: "Dr. Bryn holds an implant fellowship (ICOI Fellow). It's one of her special interests.",
    },
    services: ["implants", "crowns", "dentures"],
  },
  {
    id: "stained",
    short: "Stains",
    label: "Stained or yellow",
    calm: "Coffee, tea, time. Some of it cleans right off. The rest has options.",
    checks: [
      "Surface stain or stain inside the tooth. They're fixed differently.",
      "Dark spots that are really cavities or old fillings wearing out.",
      "Whether whitening will even work. Crowns and fillings don't whiten.",
    ],
    path: [
      { name: "A cleaning", text: "Sometimes that's most of it." },
      { name: "Whitening", text: "For an even, brighter shade." },
      { name: "Veneers", text: "Thin covers for the stains whitening can't touch." },
    ],
    firstVisit:
      "A cleaning and exam. You'll see what a cleaning does before you decide on anything else.",
    services: ["preventive", "crowns"],
  },
  {
    id: "kid",
    short: "Kids",
    label: "My kid needs a dentist",
    calm: "Patient, kind, slow when they need slow. Parents say so in the reviews.",
    checks: [
      "How teeth are coming in, and whether there's room for the next ones.",
      "Soft spots before they turn into cavities.",
      "Brushing habits. Tips for home, never a lecture.",
    ],
    path: [
      { name: "Cleaning + exam", text: "Every six months. Count teeth, ride the chair." },
      { name: "Sealants", text: "A clear coat on back teeth that keeps cavities out." },
      { name: "If there's a cavity", text: "A filling, explained to them first in kid words." },
    ],
    firstVisit:
      "A slow, friendly first look. Meet the team, try the chair, count teeth. If they're nervous, we go at their speed.",
    tip: {
      title: "Bring the whole family",
      text: "Ask about booking the family together when you call.",
    },
    services: ["preventive", "fillings"],
  },
  {
    id: "dentures",
    short: "Loose dentures",
    label: "Dentures slipping",
    calm: "Gums change over time, so dentures stop fitting. It's fixable.",
    checks: [
      "How the denture sits on your gums now.",
      "Sore spots or rubbing that tell us where it's off.",
      "Whether implants could lock it in place for good.",
    ],
    path: [
      { name: "Reline", text: "Refit the denture you already have." },
      { name: "New denture", text: "When the old one's worn out." },
      { name: "Implant-held", text: "A few implants it snaps onto. Less adhesive guesswork." },
    ],
    firstVisit:
      "Bring your denture. We check the fit and your gums, then tell you whether a reline will do or it's time for something new.",
    tip: {
      title: "Older patients",
      text: "Geriatric dentistry is one of Dr. Bryn's special interests. Bring a family member along if you like.",
    },
    services: ["dentures", "implants"],
  },
];

/* ------------------------------------------------------------------
   03: The work. One honest line each, tied back to the picker.
   ------------------------------------------------------------------ */

export const services: { id: ServiceId; name: string; line: string; picks: SymptomId[] }[] = [
  {
    id: "preventive",
    name: "Preventive care",
    line: "Cleanings, exams, X-rays. The boring stuff that keeps the rest from happening.",
    picks: ["kid", "stained"],
  },
  {
    id: "fillings",
    name: "Fillings",
    line: "Catch a cavity while it's small. Usually one visit.",
    picks: ["hurts", "kid"],
  },
  {
    id: "crowns",
    name: "Crowns, bridges & veneers",
    line: "A cap for a cracked tooth, a bridge for a gap, veneers for stains that won't whiten.",
    picks: ["hurts", "missing", "stained"],
  },
  {
    id: "implants",
    name: "Implants",
    line: "A new root and a new tooth. Dr. Bryn is an ICOI Fellow, and it's one of her special interests.",
    picks: ["missing", "dentures"],
  },
  {
    id: "invisalign",
    name: "Invisalign",
    line: "Clear trays, no brackets. Straighter teeth, and nobody has to know.",
    picks: ["crooked"],
  },
  {
    id: "dentures",
    name: "Dentures & partials",
    line: "Full or partial, refit or brand new. The kind that stay put.",
    picks: ["dentures", "missing"],
  },
  {
    id: "emergency",
    name: "Emergency",
    line: "Tooth pain, broken or knocked-out tooth: call right away, same-day when we can.",
    picks: ["hurts"],
  },
];

export const extras = ["Whitening", "Nitrous (laughing gas)", "Sealants", "Night guards", "Root canals", "Extractions"];

/* ------------------------------------------------------------------
   Reviews. Representative quotes from their Birdeye/Google reviews.
   Verify exact wording against the live reviews before launch.
   ------------------------------------------------------------------ */

export const reviews: { theme: string; quote: string }[] = [
  {
    theme: "Explains everything",
    quote:
      "Dr. Bryn was incredibly caring and made me feel comfortable right away. She took the time to explain everything before, during, and after my appointment.",
  },
  {
    theme: "Zero judgement",
    quote: "Took the time to explain all my options with zero judgements.",
  },
  {
    theme: "Good with kids",
    quote: "Dr. Bryn and her staff are amazing with both me and my kids… so patient, kind.",
  },
  {
    theme: "The team, by name",
    quote: "Her assistant, Hailee, was also caring, gentle, and truly made sure I was comfortable.",
  },
  {
    theme: "Switched dentists",
    quote: "I recently switched… after having a bad experience at another dentist, and I am so glad I did.",
  },
];

/* ------------------------------------------------------------------
   01: Dr. Bryn
   ------------------------------------------------------------------ */

export const year2018 = [
  { when: "May", what: "Graduated from the University of Iowa College of Dentistry" },
  { when: "", what: "Moved to Iowa Falls" },
  { when: "", what: "Bought a house" },
  { when: "", what: "Bought the practice" },
  { when: "", what: "Married Reece" },
  { when: "Sept", what: "Opened Iowa River Dentistry" },
];
