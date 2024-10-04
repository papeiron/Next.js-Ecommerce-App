'use client';

import { useFormState } from 'react-dom';

import { createNewAddress } from '@/actions/account';
import { Form, FormSuccess, Input, SubmitButton } from '@/components/shared/ui';

function AddNewAddressForm() {
  const [formState, action] = useFormState(createNewAddress, { errors: {} });

  return (
    <Form action={action}>
      <Input type="text" name="title" label="Title" error={formState.errors?.title} />
      <Input
        type="text"
        name="address_line_1"
        label="Address Line 1"
        error={formState.errors?.address_line_1}
      />
      <Input
        type="text"
        name="address_line_2"
        label="Address Line 2"
        error={formState.errors?.address_line_2}
      />
      <Input
        type="text"
        name="country"
        label="Country"
        error={formState.errors?.country}
      />
      <Input type="text" name="city" label="City" error={formState.errors?.city} />
      <Input
        type="text"
        name="postal_code"
        label="Postal code"
        error={formState.errors?.postal_code}
      />
      <Input
        type="text"
        name="landmark"
        label="Landmark"
        error={formState.errors?.landmark}
      />
      <Input
        type="text"
        name="phone_number"
        label="Phone Number"
        error={formState.errors?.phone_number}
      />
      {formState.success && <FormSuccess>{formState.success?.message}</FormSuccess>}

      <SubmitButton>Add</SubmitButton>
    </Form>
  );
}

export default AddNewAddressForm;
