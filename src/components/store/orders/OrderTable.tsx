import Seperator from '@/components/shared/ui/Seperator';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import { currentStore } from '@/lib/helpers';
import { fetchOrdersByStoreId } from '@/lib/services/order';
import { SortableProductFields } from '@/types';
import { CustomTableHead, Pagination } from '../../shared/ui';
import { Table, TableBody, TableHeader, TableRow } from '../../ui/table';
import OrderTableRow from './OrderTableRow';
import { OrderStatusType, ShipmentStatus } from '@prisma/client';
import { Suspense } from 'react';

const productTableHeads = [
  { value: 'id', label: 'ID' },
  { value: 'order_no', label: 'Order No' },
  { value: 'orderItems', label: 'Ordered Items' },
  { value: 'user_id', label: 'Customer', sortable: true },
  { value: 'delivery_status', label: 'Delivery Status', sortable: true },
  { value: 'order_status', label: 'Order Status', sortable: true },
  { value: 'total_price', label: 'Price', sortable: true },
  { value: 'created_at', label: 'Created', sortable: true },
  { value: 'updated_at', label: 'Updated', sortable: true },
];

type StoreProductTableProps = {
  searchParams?: {
    search?: string;
    page?: string;
    sort: SortableProductFields;
    order: 'asc' | 'desc';
    orderStatus: string | string[];
    deliveryStatus: string | string[];
  };
};

async function OrderTable({ searchParams }: StoreProductTableProps) {
  const store = await currentStore();

  // sort
  const sortBy = {
    sort: searchParams?.sort || '',
    order: searchParams?.order || 'asc',
  };

  // search
  const query = searchParams?.search || '';

  // filter
  const filterByOrder = (
    typeof searchParams?.orderStatus === 'string'
      ? [searchParams?.orderStatus]
      : searchParams?.orderStatus || []
  ).filter((status): status is OrderStatusType =>
    Object.values(OrderStatusType).includes(status as OrderStatusType),
  );

  const filterByShipment = (
    Array.isArray(searchParams?.deliveryStatus)
      ? searchParams.deliveryStatus
      : searchParams?.deliveryStatus
        ? [searchParams.deliveryStatus]
        : []
  ).filter((status): status is ShipmentStatus =>
    Object.values(ShipmentStatus).includes(status as ShipmentStatus),
  );

  const currentPage = Number(searchParams?.page) || 1;

  const { orders, totalCount } = await fetchOrdersByStoreId({
    storeId: store?.id || '',
    sortBy,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    querySearch: query,
    filter: { filterByOrder, filterByShipment },
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (sortBy.sort === 'total_price') {
    orders.sort((a, b) => {
      return sortBy.order === 'asc'
        ? a.total_price - b.total_price
        : b.total_price - a.total_price;
    });
  }

  return (
    <div>
      <Suspense>
        <Pagination totalPages={totalPages} countOfProducts={totalCount} />
      </Suspense>

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
            <OrderTableRow key={order.id} order={order} index={index} />
          ))}
        </TableBody>
      </Table>
      <Seperator />

      <Suspense>
        <Pagination totalPages={totalPages} countOfProducts={totalCount} />
      </Suspense>
    </div>
  );
}

export default OrderTable;
