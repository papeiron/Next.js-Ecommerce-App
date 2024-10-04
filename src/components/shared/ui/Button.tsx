import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type AnchorProps = {
  el: 'anchor';
  children: React.ReactNode | string;
  className?: string;
  color?: string;
} & ComponentPropsWithoutRef<typeof Link>;

type ButtonProps = {
  el: 'button';
  children: React.ReactNode | string;
  className?: string;
  color?: string;
} & ComponentPropsWithoutRef<'button'>;

const colors: { [index: string]: string } = {
  blue: 'bg-blue-custom-1 active:bg-blue-custom-2',
  transparent: 'bg-transparent active:bg-gray-50 border border-orange-1 text-orange-1',
  orange: 'bg-orange-1 text-white active:bg-orange-400',
  white: 'bg-white active:bg-gray-100 text-gray-custom-1',
};

function Button({ el, children, className, color, ...props }: ButtonProps | AnchorProps) {
  if (el === 'anchor') {
    return (
      <Link
        {...(props as AnchorProps)}
        className={cn(
          `rounded-md px-4 py-2 ${color ? colors[color] : colors['orange']}`,
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...(props as ButtonProps)}
      className={cn(
        `rounded-md px-4 py-2 ${color ? colors[color] : colors['orange']}`,
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
