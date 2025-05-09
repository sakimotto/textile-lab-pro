import { PieChart } from '@mui/x-charts/PieChart';
import { TASK_STATUSES } from '@/lib/schemas/task';

export default function TaskStatusPie({ data }: { data: { status: string; count: number }[] }) {
  const chartData = data.map((d, i) => ({
    id: d.status,
    value: d.count,
    label: d.status,
  }));
  return (
    <PieChart
      series={[{
        data: chartData,
        innerRadius: 18,
        outerRadius: 32,
        paddingAngle: 2,
        cornerRadius: 3,
      }]}
      width={140}
      height={80}
      legend={{ hidden: true }}
    />
  );
}
