'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { uploadImageAppForm } from '@/lib/services/image';
import {
  Form,
  FormError,
  FormSuccess,
  Heading,
  ImageInput,
  Input,
  SubmitButton,
  TextArea,
} from '@/components/shared/ui';
import { newApplication } from '@/actions/store';

function ApplicationForm() {
  const [formState, action] = useFormState(newApplication, {
    errors: {},
  });
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const callbackAddedFn = useCallback(uploadImageAppForm, []);

  const resetForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);

  useEffect(() => {
    if (formState.success) {
      resetForm();
    }
  }, [formState.success, resetForm]);

  return (
    <div>
      <Heading type="heading-3">Store Application Form</Heading>
      <Form ref={formRef} action={action}>
        <div className="flex flex-col gap-2">
          <Input type="text" name="cellphone" id="cellphone" label="Cell Phone" />
          {formState.errors?.cellphone && (
            <FormError>{formState.errors?.cellphone}</FormError>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input type="text" name="address" id="address" label="Address" />
          {formState.errors?.address && (
            <FormError>{formState.errors?.address}</FormError>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Input type="text" name="storename" id="storename" label="Store Name" />
          {formState.errors?.storename && (
            <FormError>{formState.errors?.storename}</FormError>
          )}
        </div>

        <input type="hidden" name="img" value={uploadedImage} />

        <div className="flex flex-col gap-2">
          <TextArea name="description" id="description" label="Description" />
          {formState.errors?.description && (
            <FormError>{formState.errors?.description}</FormError>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <ImageInput
            uploadedImagesUrls={uploadedImage}
            setUploadedImages={setUploadedImage}
            label="Cover Image"
            maxFiles={1}
            fn={callbackAddedFn}
          />
          {formState.errors?.img && <FormError>{formState.errors?.img}</FormError>}
        </div>

        {formState.errors?._form && <FormError>{formState.errors?._form}</FormError>}
        {formState.success && <FormSuccess>{formState.success.message}</FormSuccess>}
        <SubmitButton>Apply</SubmitButton>
      </Form>
    </div>
  );
}

export default ApplicationForm;
