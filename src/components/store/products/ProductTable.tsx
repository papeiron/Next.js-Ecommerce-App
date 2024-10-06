import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import { fetchProductsByStore } from '@/lib/services/product';
import { SortableProductFields } from '@/types';
import { CustomTableHead } from '@/components/shared/ui';
import CustomPagination from '@/components/shared/ui/Pagination';
import Seperator from '@/components/shared/ui/Seperator';
import { currentStore } from '@/lib/helpers';
import ProductTableRow from './ProductTableRow';
import { Suspense } from 'react';

const productTableHeads = [
  { value: 'id', label: 'ID' },
  { value: 'image', label: 'Image' },
  { value: 'status', label: 'Status', sortable: true },
  { value: 'stock', label: 'Stock', sortable: true },
  { value: 'name', label: 'Name', sortable: true },
  { value: 'category', label: 'Category', sortable: false },
  { value: 'rating', label: 'Rating' },
  { value: 'price', label: 'Price', sortable: true },
  { value: 'favorites', label: 'Favorites', sortable: true },
  { value: 'brand', label: 'Brand', sortable: true },
  { value: 'created_at', label: 'Created', sortable: true },
  { value: 'updated_at', label: 'Updated', sortable: true },
  { value: ' ', label: ' ' },
];

type StoreProductTableProps = {
  searchParams?: {
    search?: string;
    page?: string;
    sort: SortableProductFields;
    order: 'asc' | 'desc';
  };
};

async function ProductTable({ searchParams }: StoreProductTableProps) {
  const store = await currentStore();

  const sortBy = {
    sort: searchParams?.sort || '',
    order: searchParams?.order || 'asc',
  };
  const query = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;

  const res =
    (await fetchProductsByStore({
      storeId: store?.id || '',
      sortBy,
      currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
      querySearch: query,
      includeUnapprovedStores: true,
    })) || [];

  const { countOfProducts, products } = res;

  const totalPages = Math.ceil(countOfProducts! / ITEMS_PER_PAGE); // TODO: fix

  return (
    <div>
      <Suspense>
        <CustomPagination totalPages={totalPages} countOfProducts={countOfProducts} />
      </Suspense>

      <Table className="overflow-hidden">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-none">
            {productTableHeads.map((head, index) => (
              <Suspense key={index}>
                <CustomTableHead tableHead={head} />
              </Suspense>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <ProductTableRow key={product.id} product={product} index={index} />
          ))}
        </TableBody>
      </Table>
      <Seperator />
      <Suspense>
        <CustomPagination totalPages={totalPages} countOfProducts={countOfProducts} />
      </Suspense>
    </div>
  );
}

export default ProductTable;
