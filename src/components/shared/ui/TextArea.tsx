'use client';

import { ComponentPropsWithoutRef } from 'react';
import { useFormStatus } from 'react-dom';
import FormError from './FormError';

type TextAreaProps = {
  label: string;
  error?: string[];
} & ComponentPropsWithoutRef<'textarea'>;

function TextArea({ children, id, label, error, ...props }: TextAreaProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        className={`h-28 resize-none rounded-md border bg-gray-50 p-2 outline-none focus:border-gray-300 focus:bg-gray-100 ${pending ? 'opacity-60' : ''}`}
        id={id}
        {...props}
      />
      {error && <FormError>{error[0]}</FormError>}
    </div>
  );
}

export default TextArea;
