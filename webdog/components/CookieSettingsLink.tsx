'use client';

export default function CookieSettingsLink() {
  return (
    <button type="button" className="footer__textbtn" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>
      Cookie settings
    </button>
  );
}
