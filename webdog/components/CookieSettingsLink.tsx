'use client';

export default function CookieSettingsLink({
  label = 'Cookie settings',
  className = 'footer__textbtn',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>
      {label}
    </button>
  );
}
