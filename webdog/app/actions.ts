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
  try {
    await createLead({ Type: 'Newsletter', Email: email, Source: 'Website' });
    return { status: 'ok', message: 'You’re subscribed.' };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'That didn’t go through. Try again in a minute.' };
  }
}

export async function sendContact(_: FormState, data: FormData): Promise<FormState> {
  if (data.get('company_fax')) return { status: 'ok' };
  const first = String(data.get('first') ?? '').trim();
  const last = String(data.get('last') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const topic = String(data.get('topic') ?? 'general');
  const type = topic === 'strategy' ? 'Strategy call' : topic === 'pricing' ? 'Pricing enquiry' : 'Contact';
  if (!first || !last || !emailOk(email)) {
    return { status: 'error', message: 'Add your first name, last name and a valid email address.' };
  }
  try {
    await createLead({ Type: type, Name: `${first} ${last}`, Email: email, Phone: phone, Notes: message, Source: 'Website' });
    return { status: 'ok', message: 'Thanks. We’ll get back to you within one working day.' };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'That didn’t send. Email hello@webdog.marketing instead.' };
  }
}

export async function applyForJob(_: FormState, data: FormData): Promise<FormState> {
  if (data.get('company_fax')) return { status: 'ok' };
  const first = String(data.get('first') ?? '').trim();
  const last = String(data.get('last') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const position = String(data.get('position') ?? '').trim();
  const start = String(data.get('start') ?? '').trim();
  const cv = String(data.get('cv') ?? '').trim();
  if (!first || !last || !emailOk(email) || !start) {
    return { status: 'error', message: 'Add your name, a valid email and your available start date.' };
  }
  try {
    await createLead({
      Type: 'Job application',
      Name: `${first} ${last}`,
      Email: email,
      Phone: phone,
      Notes: [`Position: ${position || 'Not specified'}`, `Available from: ${start}`, `CV: ${cv || 'Not provided'}`].join('\n'),
      Source: 'Website',
    });
    return { status: 'ok', message: 'Application received. We’ll be in touch if it’s a match.' };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'That didn’t send. Email your CV to hello@webdog.marketing instead.' };
  }
}
