export default function Avatar({ src, name, size = 64 }: { src?: string; name: string; size?: number }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="avatar" src={src} alt={`Photo of ${name}`} width={size} height={size} loading="lazy" />;
  }
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
  return (
    <span className="avatar avatar--initials" style={{ width: size, height: size }} aria-hidden="true">
      {initials}
    </span>
  );
}
