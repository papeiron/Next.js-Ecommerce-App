import { Suspense } from 'react';

import { Box, EmptyTableBody } from '@/components/shared/ui';
import Filter from '@/components/shared/ui/Filter';
import Heading from '@/components/shared/ui/Heading';
import Search from '@/components/shared/ui/Search';
import Seperator from '@/components/shared/ui/Seperator';
import { CiDeliveryTruck } from 'react-icons/ci';
import { PiTagLight } from 'react-icons/pi';
import { RxCaretDown } from 'react-icons/rx';
import OrderTable from '@/components/store/orders/OrderTable';

const productTableHeaders = [
  'ID',
  'Order No',
  'Ordered Items',
  'Customer',
  'Delivery Status',
  'Order Status',
  'Price',
  'Created',
  'Updated',
];

const orderStatusFilters = [
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'In progress',
    value: 'INPROGRESS',
  },
  {
    label: 'Shipped',
    value: 'SHIPPED',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
  {
    label: 'Refunded',
    value: 'REFUNDED',
  },
];

const ShipmentStatusFilters = [
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Processing',
    value: 'PROCESSING',
  },
  {
    label: 'Shipped',
    value: 'SHIPPED',
  },
  {
    label: 'In Transit',
    value: 'IN_TRANSIT',
  },
  {
    label: 'Delivered',
    value: 'DELIVERED',
  },
  {
    label: 'Returned',
    value: 'RETURNED',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
];

function StoreOrdersPage({ searchParams }: any) {
  return (
    <Box className="px-4 py-8">
      <div className="flex flex-col gap-3">
        <Heading type="heading-3">Orders</Heading>
        <div className="flex w-full justify-between">
          <div className="w-[250px]">
            <Suspense>
              <Search placeholder="Search anything" />
            </Suspense>
          </div>
          <div className="flex items-center gap-4">
            <Suspense>
              <Filter
                filterName="orderStatus"
                filters={orderStatusFilters}
                label={
                  <p className="flex items-center justify-center gap-2">
                    <PiTagLight className="h-[1.1rem] w-[1.1rem]" />
                    Order Status
                    <RxCaretDown className="inline h-4 w-4" />
                  </p>
                }
              />
            </Suspense>
            <Suspense>
              <Filter
                filterName="deliveryStatus"
                filters={ShipmentStatusFilters}
                label={
                  <p className="flex items-center justify-center gap-2">
                    <CiDeliveryTruck className="h-[1.1rem] w-[1.1rem]" />
                    Delivery Status
                    <RxCaretDown className="inline h-4 w-4" />
                  </p>
                }
              />
            </Suspense>
          </div>
        </div>

        <Seperator />
        <Suspense
          key={searchParams?.query}
          fallback={
            <EmptyTableBody cols={10} rows={12} tableHeaders={productTableHeaders} />
          }
        >
          <OrderTable searchParams={searchParams} />
        </Suspense>
      </div>
    </Box>
  );
}

export default StoreOrdersPage;
