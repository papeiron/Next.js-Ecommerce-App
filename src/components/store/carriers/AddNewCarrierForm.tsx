'use client';

import { useFormState } from 'react-dom';

import { Form, Input, SubmitButton } from '@/components/shared/ui';
import { createNewCarrier } from '@/actions/store';

function AddNewCarrierForm() {
  const [formState, action] = useFormState(createNewCarrier, { errors: {} });

  return (
    <Form action={action}>
      <Input
        type="text"
        name="name"
        label="Carrier name"
        error={formState?.errors?.name}
      />

      <Input
        type="text"
        name="code"
        label="Carrier code"
        error={formState?.errors?.code}
      />

      <Input
        type="text"
        name="url"
        label="Base Tracking URL"
        error={formState?.errors?.url}
      />

      <Input
        type="text"
        name="shipping_rate_name"
        label="Shipping Rate Name"
        error={formState?.errors?.shipping_rate_name}
      />

      <Input
        type="text"
        name="shipping_rate_description"
        label="Shipping Rate Description"
        error={formState?.errors?.shipping_rate_description}
      />

      <Input
        type="number"
        name="base_rate"
        label="Base Rate $"
        error={formState?.errors?.base_rate}
      />

      <Input
        type="number"
        name="per_kg_rate"
        label="Per Kg Rate $"
        error={formState?.errors?.per_kg_rate}
      />

      <Input
        type="number"
        name="min_weight"
        label="Min Weight"
        step="0.01"
        error={formState?.errors?.min_weight}
      />

      <Input
        type="number"
        name="max_weight"
        label="Max Weight"
        error={formState?.errors?.max_weight}
      />

      {/* {form} */}

      <SubmitButton>Add</SubmitButton>
    </Form>
  );
}

export default AddNewCarrierForm;
