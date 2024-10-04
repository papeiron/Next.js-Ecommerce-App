import { CustomTableHead } from '@/components/shared/ui';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import { fetchCategories } from '@/lib/services/category';
import CategoryTableRow from './CategoryTableRow';
import { Suspense } from 'react';

const categoryTableHeads = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Order No' },
  { value: 'isActive', label: 'Is Active' },
  { value: 'created_at', label: 'Created', sortable: true },
  { value: 'updated_at', label: 'Updated', sortable: true },
];

async function CategoriesTable() {
  const categories = await fetchCategories();

  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-none">
            {categoryTableHeads.map((head, index) => (
              <Suspense key={index}>
                <CustomTableHead tableHead={head} />
              </Suspense>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((order, index) => (
            <CategoryTableRow key={order.id} category={order} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoriesTable;
