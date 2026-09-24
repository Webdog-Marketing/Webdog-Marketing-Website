'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { track } from '@/lib/analytics';
import { requestAudit, type FormState } from '@/app/actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--fluro btn--lg" type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Get my free audit'}
    </button>
  );
}

export default function AuditForm() {
  const [state, action] = useFormState<FormState, FormData>(requestAudit, { status: 'idle' });
  useEffect(() => {
    if (state.status === 'ok') track({ event: 'generate_lead', form_name: 'funnel_audit' });
  }, [state.status]);

  if (state.status === 'ok') {
    return (
      <div className="form-done" role="status">
        <p className="form-done__title">Audit requested</p>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="form" noValidate>
      <div className="form__row">
        <label>
          Your name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        Website to audit
        <input name="website" type="url" inputMode="url" placeholder="https://" required />
      </label>
      <label>
        <span>
          Where do you think you’re losing people?<span className="form__opt">Optional</span>
        </span>
        <textarea name="leak" rows={3} />
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
