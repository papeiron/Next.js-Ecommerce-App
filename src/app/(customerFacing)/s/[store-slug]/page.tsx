import Image from 'next/image';
import { Suspense } from 'react';

import { fetchStoreBySlug, fetchStoreRatingByStore } from '@/lib/services/store';
import { MdOutlineVerified, MdStorefront, MdStar } from 'react-icons/md';
import ProductCarousel, {
  ProductCarouselProps,
} from '@/components/main/home/ProductCarousel';
import EmptyProductCarousel from '@/components/main/home/EmptyProductCarousel';
import { fetchProductsWithOptions } from '@/lib/services/product';
import { Heading } from '@/components/shared/ui';

type MainStorePage = {
  params: {
    'store-slug': string;
  };
};

async function MainStorePage({ params }: MainStorePage) {
  const storeSlug = params['store-slug'];
  const storeRating = await fetchStoreRatingByStore(storeSlug);
  const store = await fetchStoreBySlug(storeSlug);

  return (
    <div className="flex flex-col gap-12 bg-white p-6">
      <div className="flex items-start gap-6 rounded-lg border px-3 py-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-green-500 shadow-lg">
          <Image src={store?.img || ''} fill alt="store image" className="object-cover" />
        </div>
        <div className="flex-grow">
          <div className="mb-2 flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-800">{store?.store_name}</h1>
            {store?.isVerified && (
              <MdOutlineVerified
                className="h-6 w-6 text-green-500"
                title="Verified Seller"
              />
            )}
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <MdStar className="mr-1 h-5 w-5 text-yellow-400" />
              <span className="font-semibold">{storeRating?.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <MdStorefront className="mr-1 h-5 w-5 text-orange-1" title="store" />
            </div>
          </div>
        </div>
      </div>
      <section className="mt-6 flex flex-col gap-16 rounded-md p-4">
        <div>
          <Heading type="heading-3">Store latests</Heading>
          <Suspense fallback={<EmptyProductCarousel length={8} />}>
            <ProductCarousel
              fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
              term="latestProducts"
              store={store?.id}
            />
          </Suspense>
        </div>
        <div>
          <Heading type="heading-3">Store&apos;s top favorites</Heading>
          <Suspense fallback={<EmptyProductCarousel length={8} />}>
            <ProductCarousel
              fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
              term="sortByFavorite"
              store={store?.id}
            />
          </Suspense>
        </div>

        <div>
          <Heading type="heading-3">Store&apos;s best sellers</Heading>
          <Suspense fallback={<EmptyProductCarousel length={8} />}>
            <ProductCarousel
              fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
              term="mostSelling"
              store={store?.id}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default MainStorePage;
