import type { SVGProps } from "react";
import { TOOTH_PATH } from "@/lib/brand-mark";
import type { SymptomId } from "@/lib/site";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** The brand tooth, placed in icon space. Stroke stays crisp at any scale. */
function Tooth({ t, dashed = false }: { t: string; dashed?: boolean }) {
  return (
    <path
      d={TOOTH_PATH}
      transform={t}
      vectorEffect="non-scaling-stroke"
      strokeDasharray={dashed ? "2 2" : undefined}
    />
  );
}

export const PhoneIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 3.5h3.2l1.6 4-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 4 1.6V17a2.5 2.5 0 0 1-2.7 2.5C9.6 19 5 14.4 4.5 6.2A2.5 2.5 0 0 1 5 3.5z" />
  </Base>
);
export const ClockIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Base>
);
export const PinIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);
export const ArrowIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const ArrowDownIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Base>
);
export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
);
export const AlertIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4.5M12 17.5v.01" />
  </Base>
);
export const MailIcon = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="M4 7l8 6 8-6" />
  </Base>
);
export const FileIcon = (p: P) => (
  <Base {...p}>
    <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z" />
    <path d="M14 3.5V8h4M9.5 12.5h5M9.5 16h5" />
  </Base>
);
export const ChevronIcon = (p: P) => (
  <Base {...p}>
    <path d="M6 9l6 6 6-6" />
  </Base>
);

/** One drawn icon per picker tile. */
export function SymptomIcon({ id, ...p }: { id: SymptomId } & P) {
  switch (id) {
    case "hurts":
      return (
        <Base {...p}>
          <Tooth t="translate(1.2 2.6) scale(0.165)" />
          <path d="M19 5.5l2.2-1.6M19.6 10.6h2.6M19 15.6l2.2 1.6" />
        </Base>
      );
    case "crooked":
      return (
        <Base {...p}>
          <Tooth t="translate(-0.2 6.4) scale(0.095) rotate(-14 50 55)" />
          <Tooth t="translate(7.3 4.6) scale(0.095)" />
          <Tooth t="translate(14.8 7) scale(0.095) rotate(12 50 55)" />
        </Base>
      );
    case "missing":
      return (
        <Base {...p}>
          <Tooth t="translate(0 6.2) scale(0.095)" />
          <Tooth t="translate(7.3 6.2) scale(0.095)" dashed />
          <Tooth t="translate(14.6 6.2) scale(0.095)" />
        </Base>
      );
    case "stained":
      return (
        <Base {...p}>
          <Tooth t="translate(0.4 3) scale(0.175)" />
          <path d="M19.5 2.8v4M17.5 4.8h4M20.6 12.2v2.4M19.4 13.4h2.4" />
        </Base>
      );
    case "kid":
      return (
        <Base {...p}>
          <Tooth t="translate(2.4 1.4) scale(0.19)" />
          <path d="M9.6 9.2v.01M14.4 9.2v.01" strokeWidth={2.2} />
          <path d="M9.7 11.8q2.3 1.9 4.6 0" />
        </Base>
      );
    case "dentures":
      return (
        <Base {...p}>
          <path d="M3.5 7c0 7.6 3.8 12.3 8.5 12.3S20.5 14.6 20.5 7" />
          <path d="M6.8 7c0 5.4 2.3 8.6 5.2 8.6s5.2-3.2 5.2-8.6" />
          <path d="M4.3 11.3l3.2-.8M6.4 15.4l2.6-1.7M12 19.3v-3.7M17.6 15.4L15 13.7M19.7 11.3l-3.2-.8" />
          <path d="M9.5 3.6l-1-1.4M14.5 3.6l1-1.4" />
        </Base>
      );
  }
}
