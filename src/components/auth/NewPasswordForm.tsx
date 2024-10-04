'use client';

import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';

import * as actions from '@/actions/auth';
import Form from '../shared/ui/Form';
import Input from '../shared/ui/Input';
import SubmitButton from '@/components/shared/ui/SubmitButton';
import FormError from '../shared/ui/FormError';
import FormSuccess from '../shared/ui/FormSuccess';

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
