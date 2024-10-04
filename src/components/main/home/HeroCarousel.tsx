'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/shared/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { DiscountWith } from '@/types';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { discountCheckIfEnded } from '@/lib/utils';

type HeroCarouselProps = {
  discounts: DiscountWith<'category' | 'product'>[] | null;
};

function HeroCarousel({ discounts }: HeroCarouselProps) {
  const categoryDiscounts = discounts
    ?.map((d) => {
      if (d.category && discountCheckIfEnded(d.end_date)) return d;
    })
    .filter((d) => d !== undefined);
  const productDiscounts = discounts
    ?.map((d) => {
      if (d.product && discountCheckIfEnded(d.end_date)) {
        return d;
      }
    })
    .filter((d) => d !== undefined);

  return (
    <Carousel
      className="relative"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
    >
      <CarouselContent className="ml-0 h-[400px]">
        {categoryDiscounts &&
          categoryDiscounts.length > 0 &&
          categoryDiscounts?.map((item) => (
            <CarouselItem
              key={item?.id}
              className="flex justify-center overflow-hidden rounded-xl pl-0"
            >
              <Link href={`/c/${item?.category?.slug as string}`} className="flex w-full">
                <div className="relative h-full w-[75%]">
                  <Image
                    src={item?.image || ''}
                    alt={item?.category?.name || 'Category name'}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex h-full w-[25%] flex-col gap-3 rounded-r-xl bg-red-400 p-8 pr-14 text-white">
                  <p className="text-xl font-extrabold uppercase">{item?.name}</p>
                  <div className="flex items-center">
                    <span className="text-9xl">{item?.discount_percent}</span>
                    <span className="flex flex-col">
                      <p className="text-8xl">%</p>
                      <p className="text-3xl">OFF</p>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Button
                      el="button"
                      className="mt-6 flex items-center gap-2 py-3"
                      color="white"
                    >
                      <p>Start shopping</p>
                      <MdOutlineShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        {productDiscounts &&
          productDiscounts.length > 0 &&
          productDiscounts?.map((item) => (
            <CarouselItem
              key={item?.description}
              className="flex justify-center overflow-hidden rounded-xl pl-0"
            >
              <Link href={`p/${item?.product?.slug}`} className="flex w-full">
                <div className="relative h-full w-[75%]">
                  <Image
                    src={item?.image || '/placeholder-image.jpg'}
                    alt={item?.category?.name || 'Category name'}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex h-full w-[25%] flex-col gap-3 rounded-r-xl bg-red-400 p-8 pr-14 text-white">
                  <p className="text-xl font-extrabold uppercase">{item?.name}</p>
                  <div className="flex items-center">
                    <span className="text-9xl">{item?.discount_percent}</span>
                    <span className="flex flex-col">
                      <p className="text-8xl">%</p>
                      <p className="text-3xl">OFF</p>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Button
                      el="button"
                      className="mt-6 flex items-center gap-2 py-3"
                      color="white"
                    >
                      <p>Start shopping</p>
                      <MdOutlineShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 shadow-md transition-all hover:bg-white hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 active:scale-95" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 shadow-md transition-all hover:bg-white hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 active:scale-95" />
    </Carousel>
  );
}

export default HeroCarousel;
