'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendContact, type FormState } from '@/app/actions';
import { track } from '@/lib/analytics';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--fluro btn--lg" type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Send message'}
    </button>
  );
}

export default function ContactForm() {
  const [state, action] = useFormState<FormState, FormData>(sendContact, { status: 'idle' });
  const [topic, setTopic] = useState('general');
  const [message, setMessage] = useState('');

  // Links like /about?topic=strategy#contact or ?topic=pricing&plan=Startup preselect the form.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('topic');
    if (t === 'strategy' || t === 'pricing') setTopic(t);
    const plan = q.get('plan');
    if (plan) setMessage(`I'm interested in the ${plan} plan.`);
  }, []);
  useEffect(() => {
    if (state.status === 'ok') track({ event: 'generate_lead', form_name: topic === 'strategy' ? 'strategy_call' : 'contact' });
  }, [state.status, topic]);

  if (state.status === 'ok') {
    return (
      <div className="form-done" role="status">
        <p className="form-done__title">Message sent</p>
        <p>{state.message}</p>
      </div>
    );
  }
  return (
    <form action={action} className="form" noValidate>
      <label>
        What can we help with?
        <select name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="strategy">Book a strategy call</option>
          <option value="pricing">Ask about a pricing plan</option>
          <option value="general">General enquiry</option>
        </select>
      </label>
      <div className="form__row">
        <label>
          First name
          <input name="first" autoComplete="given-name" required />
        </label>
        <label>
          Last name
          <input name="last" autoComplete="family-name" required />
        </label>
      </div>
      <div className="form__row">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>
            Phone<span className="form__opt">Optional</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        {topic === 'strategy' ? 'What would you like to cover, and when suits you?' : 'Message'}
        <textarea name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <input className="hp" name="company_fax" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state.status === 'error' && (
        <p className="form__error" role="alert">
          {state.message}
        </p>
      )}
      <Submit />
    </form>
  );
}
