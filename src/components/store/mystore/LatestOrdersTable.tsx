import { CustomTableHead } from '@/components/shared/ui';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import { currentUser } from '@/lib/helpers';
import { fetchOrdersByStoreId } from '@/lib/services/order';
import LatestOrderTableRow from './LatestOrderTableRow';
import { Suspense } from 'react';

const productTableHeads = [
  { value: 'orderItems', label: 'Ordered Items' },
  { value: 'user_id', label: 'Customer' },
  { value: 'created_at', label: 'Created' },
  { value: 'order_status', label: 'Order Status' },
  { value: 'total_price', label: 'Price' },
];

async function LatestOrdersTable() {
  const user = await currentUser();

  const { orders } = await fetchOrdersByStoreId({ storeId: user?.store?.id || '' });

  return (
    <Table>
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
        {orders?.map((order, index) => (
          <LatestOrderTableRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}

export default LatestOrdersTable;
