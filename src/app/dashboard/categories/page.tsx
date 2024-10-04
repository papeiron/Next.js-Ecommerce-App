import { Suspense } from 'react';

import CategoriesTable from '@/components/protected/dashboard/CategoriesTable';
import NewCategoryUpdateForm from '@/components/protected/dashboard/NewCategoryUpdateForm';
import { Box, EmptyTableBody } from '@/components/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { fetchCategories } from '@/lib/services/category';

const categoryTableHeads = [
  'id',
  'order_no',
  'orderItems',
  'user_id',
  'delivery_status',
  'order_status',
  'total_price',
  'created_at',
  'updated_at',
];

async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <Box className="flex flex-col gap-3 px-4 py-8">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger className="rounded-xl bg-orange-1 px-4 py-2 text-white active:bg-orange-400">
            New Category
          </DialogTrigger>
          <DialogContent
            className="max-h-[80vh] max-w-[60rem] overflow-y-auto"
            aria-describedby="create-product-description"
          >
            <DialogTitle>Create a category</DialogTitle>
            <div className="max-w-full">
              <NewCategoryUpdateForm categoriesData={categories} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Suspense
        fallback={
          <EmptyTableBody cols={10} rows={12} tableHeaders={categoryTableHeads} />
        }
      >
        <CategoriesTable />
      </Suspense>
    </Box>
  );
}

export default CategoriesPage;
