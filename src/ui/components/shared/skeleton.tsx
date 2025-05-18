import { cn } from '@/app/lib/utils/styles';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-zinc-200/80', className)} {...props} />;
}

export { Skeleton };
