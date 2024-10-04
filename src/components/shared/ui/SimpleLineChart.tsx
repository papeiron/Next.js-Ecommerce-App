'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type DataPoint = {
  [key: string]: string | number;
};

type SimpleLineChartProps = {
  data: DataPoint[];
  xAxisDataKey: string;
  lines: {
    dataKey: string;
    stroke: string;
  }[];
};

function SimpleLineChart({ data, xAxisDataKey, lines }: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 15,
          right: 60,
          left: 10,
          // bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
