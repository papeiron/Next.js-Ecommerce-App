import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

function EmptyProductCarousel({ length }: { length: number }) {
  return (
    <Carousel>
      <CarouselContent className="grid h-[360px] auto-cols-[180px] grid-flow-col gap-2 p-4">
        {Array.from({ length }).map((_, index) => (
          <CarouselItem
            key={index}
            className="flex h-full flex-col gap-2 rounded-xl border pl-0"
          >
            <div className="relative flex-1">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5 px-3">
              <div>
                <Skeleton className="h-5 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-16" />
              </div>
              <div>
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}

export default EmptyProductCarousel;
