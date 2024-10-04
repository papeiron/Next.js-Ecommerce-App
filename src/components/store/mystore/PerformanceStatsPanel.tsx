import { currentStore } from '@/lib/helpers';
import { fetchOrdersByStoreId } from '@/lib/services/order';
import StatCard from './StatCard';

async function PerformanceStatsPanel() {
  const store = await currentStore();
  const { orders } = await fetchOrdersByStoreId({ storeId: store?.id as string });

  // sales
  const totalSales = orders.reduce((total, curr) => (total += curr.total_price), 0);

  const salesUntilLastWeek = orders.reduce((total, curr) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const orderDate = new Date(curr.created_at);

    if (orderDate < oneWeekAgo) {
      total += curr.total_price;
    }
    return total;
  }, 0);

  const salesLastWeek = totalSales - salesUntilLastWeek;

  // orders
  const totalOrders = orders.length;

  const ordersUntilLastWeek = orders
    .map((o) => {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      const orderDate = new Date(o.created_at);

      if (orderDate < oneWeekAgo) {
        return o;
      }
    })
    .filter((e) => e !== undefined).length;

  const ordersLastWeek = totalOrders - ordersUntilLastWeek;

  // customers
  const customers: { [key: string]: string } = {};

  orders.forEach((o) => {
    customers[o.user_id] = 'true';
  });

  const totalCustomers = Object.values(customers).length;

  const customers2 = orders
    .map((o) => {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      const orderDate = new Date(o.created_at);

      if (orderDate < oneWeekAgo) {
        return o.user;
      }
    })
    .filter((e) => e !== undefined);

  const customers3: { [key: string]: string } = {};

  customers2.forEach((u) => {
    if (u !== undefined) {
      customers3[u.id] = 'true';
    }
  });

  const customersUntilLastWeek = Object.values(customers3).length;

  const customersLastWeek = totalCustomers - customersUntilLastWeek;

  const statistics = [
    {
      title: 'Total Sales',
      value: '$' + totalSales.toFixed(2).toString(),
      percentageChange: ((salesLastWeek * 100) / salesUntilLastWeek).toFixed(2),
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      percentageChange: ((ordersLastWeek * 100) / ordersUntilLastWeek).toFixed(2),
    },
    {
      title: 'Total Customers',
      value: totalCustomers.toString(),
      percentageChange: ((customersLastWeek * 100) / customersUntilLastWeek).toFixed(2),
    },
  ];

  return (
    <div className="col-span-3 row-start-1 row-end-2 flex gap-4">
      {statistics.map((stat, ind) => (
        <StatCard key={ind} stat={stat} ind={ind} />
      ))}
    </div>
  );
}

export default PerformanceStatsPanel;
