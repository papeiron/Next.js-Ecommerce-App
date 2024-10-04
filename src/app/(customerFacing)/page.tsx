import { Suspense } from 'react';

import EmptyProductCarousel from '@/components/main/home/EmptyProductCarousel';
import HeroCarousel from '@/components/main/home/HeroCarousel';
import ProductCarousel, {
  ProductCarouselProps,
} from '@/components/main/home/ProductCarousel';
import { Heading } from '@/components/shared/ui';
import Container from '@/components/shared/ui/Container';
import { fetchProductsWithOptions } from '@/lib/services/product';
import StyledProductCarousel from '@/components/main/home/StyledProductCarousel';
import BrandCarousel from '@/components/main/home/BrandCarousel';
import { fetchAllDiscounts } from '@/lib/services/discount';

async function HomePage() {
  const discounts = await fetchAllDiscounts();

  return (
    <div className="max-w-full">
      <Container>
        <HeroCarousel discounts={discounts} />
        <section className="mb-44 mt-16 flex flex-col gap-16">
          <div>
            <Heading type="heading-3" className="mb-3">
              Special Offers
            </Heading>
            <Suspense fallback={<EmptyProductCarousel length={8} />}>
              <StyledProductCarousel
                fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
                term="discountedProducts"
              />
            </Suspense>
          </div>

          <div>
            <BrandCarousel />
          </div>

          <div>
            <Heading type="heading-3">Latest Products</Heading>
            <Suspense fallback={<EmptyProductCarousel length={8} />}>
              <ProductCarousel
                fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
                term="latestProducts"
              />
            </Suspense>
          </div>

          <div>
            <Heading type="heading-3">Most Favorited</Heading>
            <Suspense fallback={<EmptyProductCarousel length={8} />}>
              <ProductCarousel
                fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
                term="sortByFavorite"
              />
            </Suspense>
          </div>

          <div>
            <Heading type="heading-3">Most Selling</Heading>
            <Suspense fallback={<EmptyProductCarousel length={8} />}>
              <ProductCarousel
                fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
                term="mostSelling"
              />
            </Suspense>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default HomePage;
