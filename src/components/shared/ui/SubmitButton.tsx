'use client';

import { useFormStatus } from 'react-dom';

import MiniSpinner from './MiniSpinner';
import Button from './Button';
import { cn } from '@/lib/utils';

export default function SubmitButton({
  children,
  className,
  noValue,
}: {
  children: string | React.ReactNode;
  className?: string;
  noValue?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      el="button"
      type="submit"
      disabled={pending || noValue}
      className={cn(`${pending ? 'cursor-not-allowed opacity-60' : ''} `, className)}
    >
      {pending ? <MiniSpinner /> : children}
    </Button>
  );
}
