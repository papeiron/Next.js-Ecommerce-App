import ProductCard from '@/components/shared/ui/ProductCard';
import { fetchProductsForList } from '@/lib/services/product';

type ProductListProps = {
  slug?: string;
  minPrice?: number;
  maxPrice?: number;
  filter?: string;
  sortBy?: string;
  searchQuery?: string;
};

async function ProductList({
  slug,
  minPrice,
  maxPrice,
  filter,
  sortBy,
  searchQuery,
}: ProductListProps) {
  const products = await fetchProductsForList({
    categorySlug: slug,
    minPrice,
    maxPrice,
    filter,
    sortBy,
    searchQuery,
  });

  return (
    <section className="col-start-2 col-end-5 grid h-full w-full auto-rows-[350px] grid-cols-4 gap-6 py-4">
      {products?.map((product) => <ProductCard key={product.id} product={product} />)}
    </section>
  );
}

export default ProductList;
