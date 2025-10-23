import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 85 },
  { name: 'Aug', value: 90 },
  { name: 'Sep', value: 80 },
  { name: 'Oct', value: 95 },
  { name: 'Nov', value: 100 },
  { name: 'Dec', value: 98 },
];

export default function ChartSection() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-medium">Job Openings</h2>
        <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
