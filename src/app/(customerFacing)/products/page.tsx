import ProductList from '@/components/main/products/ProductList';
import { EmptyTableBody } from '@/components/shared/ui';
import { Suspense } from 'react';

type PageProps = {
  searchParams: { sort?: string; filter?: string };
};

function ProductsPage({ searchParams }: PageProps) {
  const filter = searchParams['filter'];
  let maxPrice: number | undefined;
  let minPrice: number | undefined;

  if (typeof filter === 'string') {
    const filterParts = filter.split(',');
    filterParts.forEach((part) => {
      const [key, value] = part.split(':');
      if (key === 'MaxPrice') maxPrice = Number(value);
      if (key === 'MinPrice') minPrice = Number(value);
    });
  }

  const sort = searchParams.sort as string;

  return (
    <div className="col-start-2 col-end-5">
      <Suspense fallback={<EmptyTableBody rows={3} cols={3} />}>
        <ProductList
          minPrice={Number(minPrice)}
          maxPrice={Number(maxPrice)}
          sortBy={sort}
        />
      </Suspense>
    </div>
  );
}

export default ProductsPage;
