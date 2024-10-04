import { currentUser } from '@/lib/helpers';
import { fetchOrdersByUser } from '@/lib/services/order';
import OrderItem from './OrderItem';

async function MyOrdersList() {
  const user = await currentUser();

  const orders = await fetchOrdersByUser(user?.id as string);

  return (
    <section className="flex flex-col gap-6">
      {orders.map((order, index) => (
        <>
          <OrderItem key={order.id} order={order} />
        </>
      ))}
    </section>
  );
}

export default MyOrdersList;
