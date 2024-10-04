'use client';

import { ResponsiveContainer, PieChart as PieeChart, Pie, Cell } from 'recharts';

type PieChartPropsType = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

export default function PieChart({ data }: PieChartPropsType) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer maxHeight={300}>
        <PieeChart>
          <Pie dataKey="value" data={data} label>
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieeChart>
      </ResponsiveContainer>
    </div>
  );
}
