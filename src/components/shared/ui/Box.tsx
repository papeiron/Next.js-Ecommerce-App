import { cn } from '@/lib/utils';

function Box({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border bg-white shadow-sm', className)}>
      {children}
    </div>
  );
}

export default Box;
