import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import ProductSidebar from '@/components/main/products/ProductSidebar';
import { BreadcrumbNavigation, Heading, SortBy } from '@/components/shared/ui';
import Container from '@/components/shared/ui/Container';
import { fetchCategoryBySlug, getCategoryWithParents } from '@/lib/services/category';

type LayoutProps = {
  children: React.ReactNode;
  params: {
    [key: string]: string | string[];
  };
};

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Reviews', value: 'review' },
];

export const dynamicParams = false;

async function Layout({ children, params }: LayoutProps) {
  const categorySlug = params['category-slug'];

  const [parentCategories, category] = await Promise.all([
    getCategoryWithParents(categorySlug as string),
    fetchCategoryBySlug(categorySlug as string),
  ]);

  if (!category) {
    notFound();
  }

  const editedParentCategories = parentCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <div className="flex h-full flex-col gap-8">
      {/* TODO: SLIDER */}

      <div className="flex flex-col gap-5">
        <Container>
          <Heading type="heading-4" className="mb-5">
            {category?.name || ''}
          </Heading>
          <div className="flex justify-between">
            <BreadcrumbNavigation links={editedParentCategories} />
            <Suspense>
              <SortBy options={sortOptions} />
            </Suspense>
          </div>
        </Container>
        <Container className="grid h-screen grid-cols-4 grid-rows-1 gap-x-6">
          <ProductSidebar
            slug={categorySlug as string}
            fn={fetchCategoryBySlug}
            showOnlyParents={false}
          />

          {children}
        </Container>
      </div>
    </div>
  );
}

export default Layout;
