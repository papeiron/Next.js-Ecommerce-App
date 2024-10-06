import { Box, Heading } from '@/components/shared/ui';
import { IoAnalytics } from 'react-icons/io5';
import { MdArrowDropUp } from 'react-icons/md';

const bgColorClasses = ['bg-statistic-1', 'bg-statistic-2', 'bg-statistic-3'];

const iconColorClasses = ['fill-red-600', 'fill-purple-600', 'fill-green-600'];

export type Stat = {
  title: string;
  value: string;
  percentageChange: string;
};

type StatCardProps = {
  stat: Stat;
  ind: number;
};

function StatCard({ stat, ind }: StatCardProps) {
  return (
    <Box
      className={`flex flex-1 flex-col justify-between ${bgColorClasses[ind]} px-5 py-5 text-white`}
      key={stat.title}
    >
      <Heading type="heading-2" className="text-gray-100">
        {stat.title}
      </Heading>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold">{stat.value}</p>
        <IoAnalytics className={`h-12 w-12 ${iconColorClasses[ind]}`} />
      </div>
      <div className="flex gap-3">
        <p className="inline-block">Since last week</p>
        <span className="rounded-sm bg-white p-0.5 text-gray-custom-1">
          {isNaN(Number(stat.percentageChange)) ? 0 : stat.percentageChange}%
          <MdArrowDropUp className="inline-block" />
        </span>
      </div>
    </Box>
  );
}

export default StatCard;
