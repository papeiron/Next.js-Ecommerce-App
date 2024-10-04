import SimpleLineChart from '@/components/shared/ui/SimpleLineChart';
import { currentStore } from '@/lib/helpers';
import { fetchOrdersByStoreId } from '@/lib/services/order';

async function OrderLineChart() {
  const store = await currentStore();

  const { orders } = await fetchOrdersByStoreId({
    storeId: store?.id || '',
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const orderByMonths = orders.reduce(
    (acc, order) => {
      if (order.order_status === 'COMPLETED') {
        const month = new Date(order.created_at).getMonth();
        acc[month] = (acc[month] || 0) + +1;
      }
      return acc;
    },
    {} as Record<number, number>,
  );

  const chartData = months.map((month, index) => ({
    Months: month,
    Sales: orderByMonths[index] || 0,
  }));

  return (
    <SimpleLineChart
      data={chartData}
      xAxisDataKey="Months"
      lines={[{ dataKey: 'Sales', stroke: '#8884d8' }]}
    />
  );
}

export default OrderLineChart;
