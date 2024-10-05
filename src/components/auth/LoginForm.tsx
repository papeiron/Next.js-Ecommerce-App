'use client';

import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import * as actions from '@/actions/auth';
import { formatSeconds } from '@/lib/utils';

import { Form, FormError, FormSuccess, SubmitButton, Input, Socials } from '../shared/ui';

function LoginForm() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expires, setExpires] = useState<number>();
  let validationErrors;

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';
  const [formState, action] = useFormState(actions.login, { errors: {} });

  useEffect(() => {
    if (showTwoFactor && expires && expires > 0) {
      const interval = setInterval(() => {
        setExpires((prevExpires) => {
          if (prevExpires && prevExpires > 0) {
            return prevExpires - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showTwoFactor, expires]);

  if (
    formState?.errors &&
    Object.values(formState?.errors).length > 0 &&
    !formState?.errors._form
  ) {
    validationErrors = Object.values(formState?.errors).map((e) => (
      <FormError key={e[0]}>{e[0]}</FormError>
    ));
  }

  useEffect(() => {
    if (formState?.twoFactor && formState?.expires) {
      setShowTwoFactor(true);
      const remainingSeconds = Math.trunc(
        Number(formState.expires.getTime() - new Date().getTime()) / 1000,
      );
      setExpires(remainingSeconds);
    }
  }, [formState?.twoFactor, formState?.expires]);

  return (
    <Form
      action={(formData) => {
        if (showTwoFactor) {
          formData.append('email', email);
          formData.append('password', password);
        }
        return action(formData);
      }}
      className="rounded-b-md border-b border-l border-r"
    >
      {showTwoFactor && (
        <>
          <Input type="text" id="2FA" name="code" label="2FA Code" />
          {
            <p className="text-center">{`Time remaining: ${
              expires ? formatSeconds(expires) : 'expired'
            }`}</p>
          }
        </>
      )}

      <input type="hidden" value={callbackUrl as string} name="callbackurl" />

      {!showTwoFactor && (
        <>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}

      {validationErrors ? (
        <div className="flex flex-col gap-3">{validationErrors}</div>
      ) : null}
      {formState?.errors?._form ? (
        <FormError>{formState.errors._form[0]}</FormError>
      ) : null}
      {urlError ? <FormError>{urlError}</FormError> : null}
      {formState?.success?.message ? (
        <FormSuccess>{formState?.success?.message}</FormSuccess>
      ) : null}
      <div className="flex justify-end">
        <Link className="inline-block underline" href="/reset">
          Forgot Password?
        </Link>
      </div>

      <SubmitButton>{showTwoFactor ? 'Confirm' : 'Sign in'}</SubmitButton>
      <div className="text-border">
        <p className="text-center text-gray-700">or</p>
      </div>
      <Socials />
    </Form>
  );
}

export default LoginForm;
