// SVG flags: Windows doesn't render flag emojis (it shows "GB", "US" etc.),
// so these are drawn in code and look the same on every device.
type Code = 'GB' | 'US' | 'DE' | 'FR' | 'ES' | 'NL';

const flags: Record<Code, JSX.Element> = {
  GB: (
    <>
      <clipPath id="gb-c">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id="gb-t">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <g clipPath="url(#gb-c)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </>
  ),
  US: (
    <>
      <rect width="60" height="30" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 30) / 13} width="60" height={30 / 13} fill="#B22234" />
      ))}
      <rect width="26" height={(30 / 13) * 7} fill="#3C3B6E" />
    </>
  ),
  DE: (
    <>
      <rect width="60" height="10" fill="#000" />
      <rect y="10" width="60" height="10" fill="#DD0000" />
      <rect y="20" width="60" height="10" fill="#FFCE00" />
    </>
  ),
  FR: (
    <>
      <rect width="20" height="30" fill="#0055A4" />
      <rect x="20" width="20" height="30" fill="#fff" />
      <rect x="40" width="20" height="30" fill="#EF4135" />
    </>
  ),
  ES: (
    <>
      <rect width="60" height="30" fill="#AA151B" />
      <rect y="7.5" width="60" height="15" fill="#F1BF00" />
    </>
  ),
  NL: (
    <>
      <rect width="60" height="10" fill="#AE1C28" />
      <rect y="10" width="60" height="10" fill="#fff" />
      <rect y="20" width="60" height="10" fill="#21468B" />
    </>
  ),
};

export default function Flag({ code }: { code: Code }) {
  return (
    <svg className="flag" viewBox="0 0 60 30" width="24" height="12" aria-hidden="true">
      {flags[code]}
    </svg>
  );
}
