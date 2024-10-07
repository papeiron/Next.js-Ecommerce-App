import ProductList from '@/components/main/products/ProductList';
import SearchLayout from '@/components/shared/ui/SearchLayout';
import { fetchProductsForList } from '@/lib/services/product';
import { MdOutlineSearchOff } from 'react-icons/md';

type PageProps = {
  searchParams: {
    [key: string]: string | string[];
  };
};

async function SearchPage({ searchParams }: PageProps) {
  const searchQuery = searchParams.q;
  const filter = searchParams.filter as string;

  const minPrice = searchParams.minPrice as string | undefined;
  const maxPrice = searchParams.maxPrice as string | undefined;

  const sort = searchParams.sort as string;

  const products = await fetchProductsForList({
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
    filter,
    sortBy: sort,
    searchQuery: searchQuery as string,
  });

  if (products.length === 0) {
    return (
      <div className="grid justify-center">
        <div className="mt-10 flex flex-col">
          <MdOutlineSearchOff className="h-36 w-36 text-orange-300" />
          <p className="text-orange-300">
            No results found for &apos;{searchQuery}&apos;
          </p>
        </div>
      </div>
    );
  }

  return (
    <SearchLayout searchParams={searchParams}>
      <div className="col-start-2 col-end-5 row-start-1 row-end-2 h-full">
        <ProductList
          searchQuery={searchQuery as string}
          minPrice={Number(minPrice)}
          maxPrice={Number(maxPrice)}
          filter={filter as string}
          sortBy={sort}
        />
      </div>
    </SearchLayout>
  );
}

export default SearchPage;
