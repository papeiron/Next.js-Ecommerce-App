import PieChart from '@/components/shared/ui/PieChart';
import { currentUser } from '@/lib/helpers';
import { getTopSellingCategoriesByStore } from '@/lib/services/category';

const generateColor = (index: number) => {
  // const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const colors = ['#8056e6', '#d3d8f8', '#FFBB28', '#FF8042'];
  return colors[index % colors.length];
};

async function OrderPieChart() {
  const user = await currentUser();
  const categories = await getTopSellingCategoriesByStore(user?.store?.id || '');

  const categoryColorMap: Record<string, string> = {};
  categories.forEach((category, index) => {
    categoryColorMap[category.name] = generateColor(index);
  });

  const chartCategories = categories.map((category) => ({
    name: category.name,
    value: category.totalSales,
    color: categoryColorMap[category.name],
  }));

  return (
    <div className="flex h-[80%] w-full flex-col">
      <PieChart data={chartCategories} />
      <div className="flex flex-col gap-2 px-10">
        {chartCategories.map((category, index) => (
          <div className="flex gap-2" key={index}>
            <span
              className={`rounded-lg p-3`}
              style={{ backgroundColor: category.color }}
            ></span>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderPieChart;
