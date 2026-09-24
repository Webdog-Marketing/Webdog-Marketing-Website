'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { applyForJob, type FormState } from '@/app/actions';
import { track } from '@/lib/analytics';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--fluro btn--lg" type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Send application'}
    </button>
  );
}

export default function JobForm({ positions }: { positions: string[] }) {
  const [state, action] = useFormState<FormState, FormData>(applyForJob, { status: 'idle' });
  useEffect(() => {
    if (state.status === 'ok') track({ event: 'job_application' });
  }, [state.status]);

  if (state.status === 'ok') {
    return (
      <div className="form-done" role="status">
        <p className="form-done__title">Application sent</p>
        <p>{state.message}</p>
      </div>
    );
  }
  return (
    <form action={action} className="form" noValidate>
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
      <div className="form__row">
        <label>
          Position
          <select name="position" defaultValue="">
            <option value="" disabled>
              Choose a role
            </option>
            {positions.map((p) => (
              <option key={p}>{p}</option>
            ))}
            <option>Speculative application</option>
          </select>
        </label>
        <label>
          Available start date
          <input name="start" type="date" required />
        </label>
      </div>
      <label>
        <span>
          Link to your CV or portfolio<span className="form__opt">LinkedIn, Google Drive, Dropbox…</span>
        </span>
        <input name="cv" type="url" inputMode="url" placeholder="https://" />
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
