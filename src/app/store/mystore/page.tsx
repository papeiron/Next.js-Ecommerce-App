import { Box, Heading, Map } from '@/components/shared/ui';
import LatestOrdersTable from '@/components/store/mystore/LatestOrdersTable';
import OrderLineChart from '@/components/store/mystore/OrderLineChart';
import OrderPieChart from '@/components/store/mystore/OrderPieChart';
import PerformanceStatsPanel from '@/components/store/mystore/PerformanceStatsPanel';

async function MyStorePage() {
  return (
    <div className="grid-row-12 grid h-full grid-cols-5 gap-8 pb-5">
      <PerformanceStatsPanel />

      <Box className="col-span-3 row-start-2 row-end-4 flex flex-col px-5 pb-3 pt-5">
        <Heading type="heading-2">Sales</Heading>
        <div className="h-[300px]">
          <OrderLineChart />
        </div>
      </Box>

      <Box className="col-span-2 row-start-1 row-end-3 p-5">
        <Heading type="heading-2">Top Selling Categories</Heading>

        <OrderPieChart />
      </Box>

      <Box className="col-span-3 row-start-4 row-end-13 overflow-y-auto p-5">
        <LatestOrdersTable />
      </Box>

      <Box className="col-span-2 row-start-3 row-end-8 flex h-full flex-col p-5">
        <Heading type="heading-2">Customers</Heading>

        <div className="flex-grow">
          <Map />
        </div>
      </Box>
    </div>
  );
}

export default MyStorePage;
