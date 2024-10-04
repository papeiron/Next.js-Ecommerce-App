import MyOrdersList from '@/components/protected/account/MyOrdersList';
import { EmptyTableBody } from '@/components/shared/ui';
import Heading from '@/components/shared/ui/Heading';
import { Suspense } from 'react';

function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <Heading type="heading-3">Orders</Heading>
      <Suspense fallback={<EmptyTableBody rows={4} cols={4} />}>
        <MyOrdersList />
      </Suspense>
    </div>
  );
}

export default OrdersPage;
