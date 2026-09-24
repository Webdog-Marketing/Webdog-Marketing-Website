// tone="light" for dark backgrounds (header, footer), "dark" for light backgrounds.
export default function Logo({ tone = 'light', height = 26 }: { tone?: 'light' | 'dark'; height?: number }) {
  const src = tone === 'light' ? '/brand/logo-white-fluro.svg' : '/brand/logo-green-fluro.svg';
  const width = Math.round(height * (425.2 / 74.26));
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="logo" src={src} alt="Webdog Marketing" width={width} height={height} />;
}
