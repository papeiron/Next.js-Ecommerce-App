'use client';

import { useFormStatus } from 'react-dom';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';
import FormError from './FormError';

type InputProps = {
  label?: string;
  id?: string;
  view?: string;
  className?: string;
  error?: string[];
} & ComponentPropsWithoutRef<'input'>;

function Input({ label, id, view, className, error, ...props }: InputProps) {
  const { pending } = useFormStatus();
  const isRadio = props.type === 'radio';

  return (
    <label
      className={cn(
        `flex ${isRadio && 'items-center'} ${view === 'row' ? 'flex-row' : 'flex-col'} gap-2`,
        className,
      )}
      htmlFor={id}
    >
      {isRadio && (
        <input
          id={id}
          {...props}
          disabled={pending}
          className={cn(
            'form-radio h-4 w-4 flex-nowrap border-gray-300 text-orange-600 focus:ring-orange-500',
            pending ? 'opacity-60' : '',
            className,
          )}
        />
      )}
      {label && <span className={cn(isRadio ? 'ml-2' : '')}>{label}</span>}
      {!isRadio && (
        <input
          id={id}
          {...props}
          disabled={pending}
          className={cn(
            'rounded-md border bg-gray-50 p-2 outline-none focus:border-gray-300 focus:bg-gray-100',
            pending ? 'opacity-60' : '',
            className,
          )}
        />
      )}
      {error && <FormError>{error[0]}</FormError>}
    </label>
  );
}

export default Input;
