import ProductSidebar from '@/components/main/products/ProductSidebar';
import { SortBy } from '@/components/shared/ui';
import Container from '@/components/shared/ui/Container';
import { fetchCategorybyProduct } from '@/lib/services/category';
import { Suspense } from 'react';

type LayoutProps = {
  children: React.ReactNode;
  params?: {
    [key: string]: string | string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Reviews', value: 'review' },
];

function SearchLayout({ children, searchParams }: LayoutProps) {
  const searchQuery = searchParams.q;

  return (
    <div className="flex h-full flex-col gap-8">
      {/* TODO: SLIDER */}

      <div className="flex flex-col gap-5">
        <Container>
          <div className="flex justify-end">
            <Suspense>
              <SortBy options={sortOptions} />
            </Suspense>
          </div>
        </Container>
        <Container className="grid h-screen grid-cols-4 grid-rows-1 gap-x-6">
          <ProductSidebar
            fn={fetchCategorybyProduct}
            slug={searchQuery as string}
            showOnlyParents={true}
          />

          {children}
        </Container>
      </div>
    </div>
  );
}

export default SearchLayout;
