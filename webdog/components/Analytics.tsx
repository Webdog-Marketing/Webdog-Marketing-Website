import { CONSENT_KEY, CONSENT_MAX_AGE_DAYS, CONSENT_STRICT, CONSENT_VERSION, GTM_ID } from '@/lib/analytics';

/*
 * Google Tag Manager + Consent Mode v2.
 * - Everything defaults to "denied" (UK GDPR / PECR).
 * - A returning visitor's saved choice is applied before GTM loads.
 * - In strict mode GTM isn't loaded until the visitor allows analytics or marketing.
 */
export function GtmHead() {
  if (!GTM_ID) return null;
  const script = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
window.__wdLoadGtm=function(){if(window.__wdGtm)return;window.__wdGtm=1;(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');};
var c=null;try{c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');}catch(e){}
var ok=c&&c.v===${CONSENT_VERSION}&&(Date.now()-c.ts)<${CONSENT_MAX_AGE_DAYS}*864e5;
if(ok){var m=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:m,ad_user_data:m,ad_personalization:m});}
if(${CONSENT_STRICT ? 'ok&&(c.analytics||c.marketing)' : 'true'})window.__wdLoadGtm();
`;
  return <script id="gtm" dangerouslySetInnerHTML={{ __html: script }} />;
}

// The no-JavaScript fallback can't check consent, so it's only used in advanced mode.
export function GtmNoScript() {
  if (!GTM_ID || CONSENT_STRICT) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
