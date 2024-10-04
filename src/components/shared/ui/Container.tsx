import { cn } from '@/lib/utils';

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(`mx-auto w-[1200px]`, className)}>{children}</div>;
}

export default Container;
