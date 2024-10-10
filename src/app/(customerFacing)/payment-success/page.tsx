import Link from 'next/link';

import { deleteCart } from '@/actions/cart';
import OrderDetailsShow from '@/components/main/payment-success/OrderDetailsShow';
import { currentUser } from '@/lib/helpers';
import { fetchOrderByOrderNo } from '@/lib/services/order';
import { MiniSpinner } from '@/components/shared/ui';

async function PaymentSuccessPage({
  searchParams: { order },
}: {
  searchParams: { order: string };
}) {
  const user = await currentUser();

  // if (order) {
  //   await deleteCart(user?.id as string);
  // }

  const orderToShow = await fetchOrderByOrderNo(order);

  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      {orderToShow ? <OrderDetailsShow order={orderToShow} /> : <MiniSpinner />}
      <Link href="/" className="text-gray-500">
        Return to Homepage
      </Link>
    </div>
  );
}

export default PaymentSuccessPage;
