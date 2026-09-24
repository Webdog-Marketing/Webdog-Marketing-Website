'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { track } from '@/lib/analytics';
import { subscribe, type FormState } from '@/app/actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--fluro" type="submit" disabled={pending}>
      {pending ? 'Subscribing…' : 'Subscribe'}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, action] = useFormState<FormState, FormData>(subscribe, { status: 'idle' });
  useEffect(() => {
    if (state.status === 'ok') track({ event: 'sign_up', method: 'newsletter' });
  }, [state.status]);
  if (state.status === 'ok') return <p className="news__done" role="status">{state.message}</p>;
  return (
    <form action={action} className="news__form" noValidate>
      <div className="news__field">
        <label htmlFor="news-email" className="sr-only">Email address</label>
        <input id="news-email" name="email" type="email" autoComplete="email" placeholder="Your email" required />
        <Submit />
      </div>
      <p className="news__consent">
        By subscribing you agree to receive our newsletter. Unsubscribe at any time. <a href="/privacy">Privacy policy</a>
      </p>
      <input className="hp" name="company_fax" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state.status === 'error' && <p className="form__error" role="alert">{state.message}</p>}
    </form>
  );
}
