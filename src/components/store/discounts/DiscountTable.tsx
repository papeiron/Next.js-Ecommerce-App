import { CustomTableHead } from '@/components/shared/ui';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import { currentStore } from '@/lib/helpers';
import { fetchDiscountsByStoreId } from '@/lib/services/discount';
import DiscountTableRow from './DiscountTableRow';
import { Suspense } from 'react';

const discountTableHeads = [
  { value: 'id', label: ' ' },
  { value: 'name', label: 'Discount Name' },
  { value: 'description', label: 'Description' },
  { value: 'category', label: 'Category' },
  { value: 'product', label: 'Product' },
  { value: 'discount_percent', label: 'Discount' },
  { value: 'active', label: 'Status' },
  { value: 'start_date', label: 'Start date' },
  { value: 'end_date', label: 'End date' },
  { value: 'created_at', label: 'Created' },
];

async function DiscountTable() {
  const store = await currentStore();

  const discounts = await fetchDiscountsByStoreId(store?.id || '');

  return (
    <div>
      <Table className="overflow-hidden">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-none">
            {discountTableHeads.map((head, index) => (
              <Suspense key={index}>
                <CustomTableHead tableHead={head} key={index} />
              </Suspense>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts?.map((discount, index) => (
            <DiscountTableRow key={discount.id} discount={discount} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DiscountTable;
