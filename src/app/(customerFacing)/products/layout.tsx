import { Suspense } from 'react';

import ProductSidebar from '@/components/main/products/ProductSidebar';
import { Heading, SortBy } from '@/components/shared/ui';
import BreadcrumbNavigation from '@/components/shared/ui/BreadcrumbNavigation';
import Container from '@/components/shared/ui/Container';
import { fetchMainCategories } from '@/lib/services/category';

type LayoutProps = {
  children: React.ReactNode;
};

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Reviews', value: 'review' },
];

async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full flex-col gap-8">
      {/* <ProductsCarousel /> */}
      <div className="flex flex-col gap-5">
        <Container>
          <Heading type="heading-4" className="mb-5">
            All products
          </Heading>
          <div className="flex justify-between">
            <BreadcrumbNavigation />
            <Suspense>
              <SortBy options={sortOptions} />
            </Suspense>
          </div>
        </Container>

        <Container className="grid h-screen grid-cols-4 grid-rows-1 gap-x-6">
          <ProductSidebar fn={fetchMainCategories} showOnlyParents={false} />

          {children}
        </Container>
      </div>
    </div>
  );
}

export default Layout;
