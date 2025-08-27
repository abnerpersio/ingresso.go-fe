import { Skeleton } from '@/ui/components/shared/skeleton';

export function MovieDetailsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-5 w-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Skeleton className="md:max-h-[400px] aspect-[2/3] w-full rounded-lg shadow-xl" />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-10 w-4/5" />
                  <Skeleton className="h-6 w-3/5" />
                </div>
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Skeleton className="size-5 rounded-sm" />
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-4 w-6" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded-sm" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded-sm" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }, (_, index) => (
                  <Skeleton key={`genre-${index + 1}`} className="h-6 w-16 rounded-full" />
                ))}
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div className="border-0 bg-card/80 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded-sm" />
                  <Skeleton className="h-5 w-48" />
                </div>

                <div className="grid w-fit grid-cols-1 sm:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={`session-${index + 1}`} className="h-12 w-24" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
