import { useId } from "react";

/** Crouton the corgi, drawn. Ears twitch every few seconds (motion allowed only). */
export function Crouton({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 124" aria-hidden="true" className={className}>
      {/* ears */}
      <g className="ear-l">
        <path d="M30 56L21 12Q23 4 31 8L58 40Z" fill="#d68645" />
        <path d="M33 48L27 19L50 41Z" fill="#f3b9a2" />
      </g>
      <g className="ear-r">
        <path d="M90 56L99 12Q97 4 89 8L62 40Z" fill="#d68645" />
        <path d="M87 48L93 19L70 41Z" fill="#f3b9a2" />
      </g>
      {/* head */}
      <path d="M60 30C85 30 99 48 99 69C99 93 82 110 60 110S21 93 21 69C21 48 35 30 60 30Z" fill="#e0934f" />
      {/* white blaze + muzzle */}
      <path
        d="M60 34C55 34 53.5 46 52.5 57C51 70 40 76 37.5 89C41 103 51 110 60 110S79 103 82.5 89C80 76 69 70 67.5 57C66.5 46 65 34 60 34Z"
        fill="#fff8ef"
      />
      {/* cheeks */}
      <circle cx="37" cy="83" r="5.5" fill="#f3a48a" opacity="0.55" />
      <circle cx="83" cy="83" r="5.5" fill="#f3a48a" opacity="0.55" />
      {/* eyes */}
      <circle cx="45" cy="65" r="4.6" fill="#1b2430" />
      <circle cx="75" cy="65" r="4.6" fill="#1b2430" />
      <circle cx="46.6" cy="63.4" r="1.5" fill="#fff" />
      <circle cx="76.6" cy="63.4" r="1.5" fill="#fff" />
      {/* nose + mouth */}
      <path d="M53 82Q60 78 67 82Q66 89 60 90Q54 89 53 82Z" fill="#1b2430" />
      <path d="M60 90V94M60 94Q55 98 51 95M60 94Q65 98 69 95" fill="none" stroke="#1b2430" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M57 96.5Q60 104 63 96.5Z" fill="#ef7f86" />
      {/* teal bandana, because of course */}
      <path d="M36 104Q60 114 84 104L60 123Z" fill="#2a9d97" />
      <path d="M36 104Q60 114 84 104" fill="none" stroke="#17706c" strokeWidth="2" />
    </svg>
  );
}

/** Optic-yellow softball with red stitching. */
export function Softball({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#f7f59a" />
          <stop offset="1" stopColor="#d9d43c" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${id}-b)`} />
      <path d="M12 10C22 20 22 44 12 54" fill="none" stroke="#c8402f" strokeWidth="1.6" />
      <path d="M52 10C42 20 42 44 52 54" fill="none" stroke="#c8402f" strokeWidth="1.6" />
      {[16, 22, 28, 34, 40, 46].map((y) => (
        <g key={y} stroke="#c8402f" strokeWidth="1.3" strokeLinecap="round">
          <path d={`M${y < 32 ? 15.5 + (y - 16) * 0.2 : 18.3 - (y - 34) * 0.25} ${y}l3.4 -1.6`} />
          <path d={`M${y < 32 ? 48.5 - (y - 16) * 0.2 : 45.7 + (y - 34) * 0.25} ${y}l-3.4 -1.6`} />
        </g>
      ))}
    </svg>
  );
}

/**
 * Postcard of a river town: an open-spandrel arch bridge over the Iowa River, trees on the
 * banks, a little main street beyond. A motif, not a survey drawing.
 */
export function RiverPostcard({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const cols = [148, 176, 204, 232, 368, 396, 424, 452];
  return (
    <svg viewBox="0 0 600 380" role="img" aria-label="Illustration: an arch bridge over the Iowa River" className={className}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf3e6" />
          <stop offset="1" stopColor="#d6eeea" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fbdb5" />
          <stop offset="1" stopColor="#1b6a74" />
        </linearGradient>
        <linearGradient id={`${id}-stone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf8f3" />
          <stop offset="1" stopColor="#e3dccf" />
        </linearGradient>
        <clipPath id={`${id}-card`}>
          <rect width="600" height="380" rx="22" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-card)`}>
        <rect width="600" height="380" fill={`url(#${id}-sky)`} />
        {/* sun */}
        <circle cx="468" cy="92" r="44" fill="#f6d7a6" opacity="0.8" />
        <circle cx="468" cy="92" r="30" fill="#f2c58a" opacity="0.9" />
        {/* far main street */}
        <g fill="#b9cfd0">
          <rect x="70" y="148" width="40" height="44" />
          <rect x="112" y="136" width="30" height="56" />
          <path d="M144 192V150L160 138L176 150V192Z" />
          <rect x="420" y="146" width="36" height="46" />
          <rect x="458" y="132" width="26" height="60" />
          <rect x="486" y="152" width="44" height="40" />
          <rect x="300" y="128" width="8" height="64" />
          <path d="M296 128L304 112L312 128Z" />
        </g>
        {/* tree lines */}
        <g fill="#7fb7a6">
          {[20, 60, 100, 190, 236, 270, 340, 380, 520, 560, 600].map((x, i) => (
            <circle key={x} cx={x} cy={196 - (i % 3) * 6} r={26 + (i % 2) * 8} />
          ))}
        </g>
        <g fill="#4f9a8a">
          {[0, 44, 548, 590].map((x, i) => (
            <circle key={x} cx={x} cy={222 - (i % 2) * 8} r={34} />
          ))}
        </g>
        {/* banks */}
        <path d="M0 214H600V236H0Z" fill="#9cc6b0" />
        {/* water */}
        <path d="M0 232H600V380H0Z" fill={`url(#${id}-water)`} />
        {/* arch reflection */}
        <path d="M110 238Q300 338 490 238" fill="none" stroke="#fbf8f3" strokeOpacity="0.25" strokeWidth="14" />
        {/* bridge: deck, arch, open spandrel columns */}
        <path d="M110 238Q300 120 490 238" fill="none" stroke={`url(#${id}-stone)`} strokeWidth="16" />
        <g fill="#efe8db">
          {cols.map((x) => {
            // column height follows the arch: deck at y=166, arch y from the quad curve
            const t = (x - 110) / 380;
            const archY = (1 - t) * (1 - t) * 238 + 2 * (1 - t) * t * 120 + t * t * 238;
            return <rect key={x} x={x - 4} y={166} width={8} height={Math.max(archY - 166 - 4, 0)} />;
          })}
        </g>
        <rect x="70" y="158" width="460" height="12" rx="2" fill="#fbf8f3" />
        <rect x="70" y="168" width="460" height="3" fill="#d4ccbd" />
        <rect x="60" y="164" width="20" height="74" fill="#efe8db" />
        <rect x="520" y="164" width="20" height="74" fill="#efe8db" />
        {/* lamp posts */}
        {[150, 250, 350, 450].map((x) => (
          <g key={x}>
            <rect x={x - 1.5} y="138" width="3" height="20" fill="#0a2236" />
            <circle cx={x} cy="136" r="4" fill="#f2c58a" />
          </g>
        ))}
        {/* ripples */}
        <g fill="none" stroke="#d6eeea" strokeWidth="2" strokeLinecap="round" opacity="0.75">
          <path className="flow-line" d="M30 284C70 278 110 290 150 284S230 278 270 284" />
          <path d="M330 300C370 294 410 306 450 300S530 294 570 300" />
          <path className="flow-line" d="M90 330C130 324 170 336 210 330S290 324 330 330" />
          <path d="M380 350C420 344 460 356 500 350" />
        </g>
      </g>
    </svg>
  );
}
