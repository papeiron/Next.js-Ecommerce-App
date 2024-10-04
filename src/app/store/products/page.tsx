import { Suspense } from 'react';

import { fetchCategories } from '@/lib/services/category';

import { CategoriesProvider } from '@/contexts/CategoryContext';
import { EmptyTableBody } from '@/components/shared/ui';
import Heading from '@/components/shared/ui/Heading';
import { Search } from '@/components/shared/ui';
import ExcelButton from '@/components/store/ExcelButton';
import NewProductUpdateForm from '@/components/store/products/NewProductUpdateForm';
import ProductTable from '@/components/store/products/ProductTable';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Seperator from '@/components/shared/ui/Seperator';
import { Box } from '@/components/shared/ui';
import { SortableProductFields } from '@/types';

const productTableHeaders = [
  'ID',
  'Image',
  'Status',
  'Stock',
  'Product Name',
  'Category',
  'Price',
  'Brand',
  'Created',
  'Updated',
  '',
];

type PageProps = {
  searchParams?: {
    search?: string;
    page?: string;
    sort: SortableProductFields;
    order: 'asc' | 'desc';
  };
};

async function StoreProductsPage({ searchParams }: PageProps) {
  const categoriesData = await fetchCategories();

  return (
    <Box className="px-4 py-8">
      <div className="flex flex-col gap-3">
        <CategoriesProvider categories={categoriesData}>
          <Heading type="heading-3">Products</Heading>
          <div className="flex justify-between">
            <div className="w-[250px]">
              <Suspense>
                <Search placeholder="Search anything" />
              </Suspense>
            </div>
            <div className="flex items-center">
              <div>
                <ExcelButton />
                <Dialog>
                  <DialogTrigger className="ml-2 rounded-xl bg-orange-1 px-4 py-2 text-white active:bg-orange-400">
                    New Product
                  </DialogTrigger>
                  <DialogContent
                    className="max-h-[80vh] max-w-[60rem] overflow-y-auto"
                    aria-describedby="create-product-description"
                  >
                    <DialogTitle>Create a product</DialogTitle>
                    <div className="max-w-full">
                      <NewProductUpdateForm categoriesData={categoriesData} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <Seperator />

          <Suspense
            key={searchParams?.search}
            fallback={
              <EmptyTableBody cols={10} rows={12} tableHeaders={productTableHeaders} />
            }
          >
            <ProductTable searchParams={searchParams} />
          </Suspense>
        </CategoriesProvider>
      </div>
    </Box>
  );
}

export default StoreProductsPage;
