import { cn } from '@/lib/utils';

function Heading({
  children,
  type,
  className,
}: {
  children: string | React.ReactNode;
  type: string;
  className?: string;
}) {
  if (type === 'heading-1')
    return <h1 className={cn(className, 'text-4xl font-semibold')}>{children}</h1>;

  if (type === 'heading-2')
    return <h1 className={cn('text-base font-semibold', className)}>{children}</h1>;

  if (type === 'heading-3')
    return <h1 className={cn('text-xl font-bold', className)}>{children}</h1>;

  if (type === 'heading-4')
    return <h1 className={cn('text-3xl font-bold', className)}>{children}</h1>;

  if (type === 'heading-5')
    return (
      <h1 className={cn('font-regular text-base font-semibold', className)}>
        {children}
      </h1>
    );

  if (type === 'heading-6')
    return <h1 className={cn('text-base font-bold', className)}>{children}</h1>;
}

export default Heading;
