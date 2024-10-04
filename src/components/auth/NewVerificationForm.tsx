'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { newVerification } from '@/actions/auth';
import { FormError, FormSuccess, MiniSpinner } from '../shared/ui';

import { FcLock } from 'react-icons/fc';

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success?.message);
        setError(data.errors?._form[0]);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="mt-32">
      <div>
        <FcLock className="mx-auto h-[50px] w-[50px]" />
        <p>Confirming your verification...</p>
        <div>
          {!success && !error && <MiniSpinner />}
          {success && <FormSuccess>{success}</FormSuccess>}
          {error && <FormError>{error}</FormError>}
        </div>
        <Link href="/signin">Back to Login</Link>
      </div>
    </div>
  );
}

export default NewVerificationForm;
