'use client';

import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';

import * as actions from '@/actions/auth';
import Form from '../shared/ui/Form';
import Input from '../shared/ui/Input';
import SubmitButton from '@/components/shared/ui/SubmitButton';
import FormError from '../shared/ui/FormError';
import FormSuccess from '../shared/ui/FormSuccess';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '../shared/ui';

function NewPasswordForm() {
  const [formState, action] = useFormState(actions.newPassword, { errors: {} });
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  let validationErrors;

  if (
    formState?.errors &&
    Object.values(formState?.errors).length > 0 &&
    !formState?.errors._form
  ) {
    validationErrors = Object.values(formState?.errors).map((e) => (
      <FormError key={e[0]}>{e[0]}</FormError>
    ));
  }

  if (!token) {
    return (
      <div className="rounded-lg border bg-white p-8">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Invalid or Missing Token
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              A valid token is required for password reset. Please use the link from your
              password reset email or create a new password reset request.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button el="anchor" href="/reset" className="ml-12 mt-4">
            Create Password Reset Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form action={action}>
      <Input type="password" id="password" name="password" label="New Password" />
      <Input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm New Password"
      />
      <Input type="hidden" id="token" name="token" value={token || ''} />
      {validationErrors ? (
        <div className="flex flex-col gap-3">{validationErrors}</div>
      ) : null}
      {formState?.errors?._form ? (
        <FormError>{formState.errors._form[0]}</FormError>
      ) : null}
      {formState?.success?.message ? (
        <FormSuccess>{formState?.success?.message}</FormSuccess>
      ) : null}
      <SubmitButton>Reset</SubmitButton>
    </Form>
  );
}

export default NewPasswordForm;
