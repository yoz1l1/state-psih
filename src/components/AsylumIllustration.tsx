export default function AsylumIllustration({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 300"
      className={className}
      role="img"
      aria-label="Гравюра: фасад лечебницы имени Королёва"
    >
      <g
        fill="none"
        stroke="#3d2b1a"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        {/* hatched sky */}
        <g opacity="0.35" strokeWidth="0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="0" y1={20 + i * 16} x2="600" y2={20 + i * 16} />
          ))}
        </g>

        {/* ground */}
        <line x1="0" y1="248" x2="600" y2="248" />
        <g opacity="0.4" strokeWidth="0.6">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={i * 20} y1="248" x2={i * 20 - 8} y2="266" />
          ))}
        </g>

        {/* dead trees */}
        <g strokeWidth="1.3">
          <path d="M48 248 L48 170 M48 200 L34 178 M48 188 L62 168 M48 176 L40 158 M48 166 L58 150" />
          <path d="M556 248 L556 184 M556 206 L568 186 M556 196 L544 178 M556 186 L562 168" />
        </g>

        {/* main building: central block */}
        <rect x="210" y="110" width="180" height="138" />
        {/* roof */}
        <path d="M198 110 L300 58 L402 110" />
        <path d="M300 58 L300 110" strokeOpacity="0.4" />
        {/* central tower */}
        <rect x="276" y="40" width="48" height="20" />
        <path d="M270 40 L300 14 L330 40" />
        <line x1="300" y1="14" x2="300" y2="0" />
        <circle cx="300" cy="0" r="3" />
        {/* spire finial */}

        {/* side wings */}
        <rect x="80" y="150" width="130" height="98" />
        <path d="M72 150 L145 120 L218 150" />
        <rect x="390" y="150" width="130" height="98" />
        <path d="M382 150 L455 120 L528 150" />

        {/* central door */}
        <path d="M278 248 L278 200 Q300 184 322 200 L322 248" />
        <line x1="300" y1="200" x2="300" y2="248" strokeOpacity="0.4" />

        {/* windows — central block */}
        {[140, 170, 200, 260, 290, 320, 380].map((x) => (
          <g key={x}>
            <rect x={x} y="128" width="16" height="26" />
            <line x1={x + 8} y1="128" x2={x + 8} y2="154" strokeWidth="0.5" />
            <line x1={x} y1="141" x2={x + 16} y2="141" strokeWidth="0.5" />
            <rect x={x} y="170" width="16" height="30" />
            <line x1={x + 8} y1="170" x2={x + 8} y2="200" strokeWidth="0.5" />
            <line x1={x} y1="185" x2={x + 16} y2="185" strokeWidth="0.5" />
          </g>
        ))}

        {/* windows — wings */}
        {[98, 130, 162, 408, 440, 472].map((x) => (
          <g key={x}>
            <rect x={x} y="170" width="20" height="30" />
            <line x1={x + 10} y1="170" x2={x + 10} y2="200" strokeWidth="0.5" />
            <line x1={x} y1="185" x2={x + 20} y2="185" strokeWidth="0.5" />
            <rect x={x} y="210" width="20" height="30" />
            <line x1={x + 10} y1="210" x2={x + 10} y2="240" strokeWidth="0.5" />
            <line x1={x} y1="225" x2={x + 20} y2="225" strokeWidth="0.5" />
          </g>
        ))}

        {/* columns on central facade */}
        <line x1="228" y1="150" x2="228" y2="240" strokeOpacity="0.5" />
        <line x1="372" y1="150" x2="372" y2="240" strokeOpacity="0.5" />

        {/* steps */}
        <path d="M266 248 L334 248 M270 252 L330 252 M274 256 L326 256" />

        {/* cross-hatch shading on tower */}
        <g opacity="0.3" strokeWidth="0.4">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="276" y1={46 + i * 3} x2="324" y2={50 + i * 3} />
          ))}
        </g>
        {/* cross-hatch on roof */}
        <g opacity="0.25" strokeWidth="0.4">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={210 + i * 8} y1="110" x2={300 - i * 6} y2={62 + i * 4} />
          ))}
        </g>
      </g>

      {/* a single lit window (the "light" of the title) */}
      <rect x="284" y="170" width="16" height="30" fill="#c9a84c" opacity="0.55" />
    </svg>
  );
}
