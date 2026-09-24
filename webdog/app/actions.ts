'use server';

import { createLead } from '@/lib/airtable';

export type FormState = { status: 'idle' | 'ok' | 'error'; message?: string };

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function requestAudit(_: FormState, data: FormData): Promise<FormState> {
  // Honeypot: real people never fill this hidden field.
  if (data.get('company_fax')) return { status: 'ok' };

  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const website = String(data.get('website') ?? '').trim();
  const leak = String(data.get('leak') ?? '').trim();

  if (!name || !emailOk(email) || !website) {
    return { status: 'error', message: 'Add your name, a work email and your website so we know what to audit.' };
  }
  try {
    await createLead({ Type: 'Funnel audit', Name: name, Email: email, Website: website, Notes: leak, Source: 'Website' });
    return { status: 'ok', message: "Got it. Your audit lands in your inbox within 48 hours." };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'That didn’t send. Email hello@webdog.marketing and we’ll pick it up from there.' };
  }
}

export async function subscribe(_: FormState, data: FormData): Promise<FormState> {
  if (data.get('company_fax')) return { status: 'ok' };
  const email = String(data.get('email') ?? '').trim();
  if (!emailOk(email)) return { status: 'error', message: 'Enter a valid email address.' };
  if (!data.get('consent')) return { status: 'error', message: 'Tick the box to confirm you want the newsletter.' };
  try {
    await createLead({ Type: 'Newsletter', Email: email, Source: 'Website' });
    return { status: 'ok', message: 'You’re subscribed.' };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'That didn’t go through. Try again in a minute.' };
  }
}
