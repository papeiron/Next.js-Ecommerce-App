import { cn } from '@/lib/utils';

function Seperator({ className }: { className?: string }) {
  return <div className={cn('w-full border-t', className)}></div>;
}

export default Seperator;
