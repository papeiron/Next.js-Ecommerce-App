import { cn } from '@/lib/utils';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

type FormProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithRef<'form'>;

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        {...props}
        className={cn(
          'mx-auto flex flex-col gap-6 bg-white p-10',
          {
            'rounded-md border': !className,
          },
          className,
        )}
      >
        {children}
      </form>
    );
  },
);

Form.displayName = 'Form';

export default Form;
