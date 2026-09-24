// Hero illustration: a funnel with leaks between stages — the thing Webdog sniffs out.
const bands = [
  { label: 'Visit', y: 40, x1: 30, x2: 490, fill: '#1F5A43', text: '#F3F7EF' },
  { label: 'Sign-up', y: 122, x1: 82, x2: 438, fill: '#2B7355', text: '#F3F7EF' },
  { label: 'Activate', y: 204, x1: 134, x2: 386, fill: '#3F8C67', text: '#F3F7EF' },
  { label: 'Pay', y: 286, x1: 186, x2: 334, fill: '#CEFF00', text: '#0E3526' },
];
const H = 72;
const SLOPE = 52 * (H / 82); // matches narrowing between bands

export default function FunnelArt() {
  return (
    <svg className="funnel" viewBox="0 0 520 470" role="img" aria-labelledby="funnel-title">
      <title id="funnel-title">A marketing funnel from visit to pay, with leaks between the stages</title>
      {bands.map((b) => (
        <g key={b.label}>
          <path
            d={`M${b.x1} ${b.y} H${b.x2} L${b.x2 - SLOPE} ${b.y + H} H${b.x1 + SLOPE} Z`}
            fill={b.fill}
          />
          <text x={b.x1 + SLOPE + 18} y={b.y + H / 2 + 7} fill={b.text} className="funnel__label">
            {b.label}
          </text>
        </g>
      ))}
      {/* spout */}
      <path d="M238 368 H282 V430 Q260 446 238 430 Z" fill="#CEFF00" />

      {/* leaks */}
      <g className="funnel__leak" fill="#A8E6C4">
        <circle cx="444" cy="126" r="6" />
        <circle cx="444" cy="126" r="6" />
        <circle cx="444" cy="126" r="6" />
      </g>
      <g className="funnel__leak funnel__leak--late" fill="#A8E6C4">
        <circle cx="96" cy="208" r="5" />
        <circle cx="96" cy="208" r="5" />
        <circle cx="96" cy="208" r="5" />
      </g>

      {/* callouts */}
      <g transform="translate(360 168)">
        <rect width="150" height="34" rx="17" fill="#F3F7EF" />
        <circle cx="18" cy="17" r="5" fill="#E2553F" />
        <text x="32" y="22" className="funnel__chip">Leak: sign-up</text>
      </g>
      <g transform="translate(0 250)">
        <rect width="132" height="34" rx="17" fill="#F3F7EF" />
        <circle cx="18" cy="17" r="5" fill="#E2A13F" />
        <text x="32" y="22" className="funnel__chip">Leak: day 1</text>
      </g>
      <g transform="translate(300 400)">
        <rect width="170" height="34" rx="17" fill="#0E3526" stroke="#CEFF00" strokeWidth="1.5" />
        <path d="M16 17l5 5 9-10" stroke="#CEFF00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="38" y="22" className="funnel__chip funnel__chip--light">Paying customers</text>
      </g>
    </svg>
  );
}
