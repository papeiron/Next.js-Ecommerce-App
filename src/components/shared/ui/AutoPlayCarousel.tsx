'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ProductImage } from '@prisma/client';
import ProductImageZoom from './ImageZoom';

interface AutoPlayCarouselProps {
  images: ProductImage[];
  className?: string;
  opts?: {
    loop?: boolean;
    autoplayInterval?: number;
  };
  showNavigation?: boolean;
  thumbnail?: boolean;
  imageHeight?: string;
  imageSettings?: string;
  imageZoom?: boolean;
  cursor?: string;
}

function AutoPlayCarousel({
  images,
  className,
  opts = {},
  showNavigation = false,
  thumbnail = false,
  imageHeight,
  imageSettings,
  imageZoom = false,
  cursor,
}: AutoPlayCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
      thumbnailApi?.scrollTo(api.selectedScrollSnap());
    });
  }, [api, thumbnailApi]);

  useEffect(() => {
    if (!api || !isPlaying || !opts?.autoplayInterval) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, opts.autoplayInterval);

    return () => clearInterval(interval);
  }, [api, isPlaying, opts?.autoplayInterval]);

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  const startPlaying = useCallback(() => {
    if (!api || !opts?.autoplayInterval) return;

    api.scrollNext();
    setIsPlaying(true);
  }, [api, opts?.autoplayInterval]);

  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <div className={cn('flex h-full flex-row-reverse gap-x-3', className)}>
      <Carousel
        className="flex-[80%]"
        setApi={setApi}
        opts={opts}
        onMouseEnter={startPlaying}
        onMouseLeave={stopPlaying}
      >
        <CarouselContent className="ml-0 pl-0">
          {images.map((img: ProductImage) => (
            <CarouselItem className={`relative ${imageHeight} pl-0`} key={img.id}>
              {imageZoom ? (
                <ProductImageZoom
                  src={img.url}
                  alt={img.alt || 'Product Image'}
                  className={`${imageSettings} `}
                />
              ) : (
                <Image
                  src={img.url}
                  alt={img.alt || 'Product Image'}
                  fill
                  className={`${imageSettings}`}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious className="left-2 border-none bg-white text-gray-200 hover:bg-gray-50 hover:text-gray-200" />
            <CarouselNext className="right-2 border-none bg-white text-gray-200 hover:bg-gray-50 hover:text-gray-200" />
          </>
        )}
      </Carousel>

      {thumbnail && (
        <Carousel className="mt-2 flex-[20%]" setApi={setThumbnailApi}>
          <CarouselContent className="ml-0 flex h-full flex-col gap-y-3">
            {images.map((img: ProductImage, index: number) => (
              <CarouselItem
                className={cn(
                  'h-full basis-[100px] cursor-pointer p-1',
                  index === current && 'rounded-full border',
                )}
                key={img.id}
                onClick={() => handleThumbnailClick(index)}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={img.url}
                    alt={img.alt || 'Product Image'}
                    fill
                    className="rounded-full object-center"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}

export default AutoPlayCarousel;
