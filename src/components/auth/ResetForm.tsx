'use client';

import { useFormState } from 'react-dom';

import * as actions from '@/actions/auth';
import { Form, FormError, FormSuccess, Input, SubmitButton } from '../shared/ui';

function ResetForm() {
  const [formState, action] = useFormState(actions.reset, { errors: {} });
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
    <Form action={action} className="rounded-b-md border-b border-l border-r">
      <Input type="email" id="email" name="email" label="Email" />

      {validationErrors ? (
        <div className="flex flex-col gap-3">{validationErrors}</div>
      ) : null}
      {formState?.errors?._form ? (
        <FormError>{formState.errors._form[0]}</FormError>
      ) : null}

      {formState?.success?.message ? (
        <FormSuccess>{formState?.success?.message}</FormSuccess>
      ) : null}
      <SubmitButton>Send reset email</SubmitButton>
    </Form>
  );
}

export default ResetForm;
