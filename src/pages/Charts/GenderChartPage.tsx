import MyChartBar from "@/components/app/Chart/MyChartBar";
import { type ChartConfig } from "@/components/ui/chart";
import { useFetchChart } from "@/hooks/useFetchChart";
import { Bar } from "recharts";

const chartConfig = {
  male: {
    label: "آقا",
    color: "#60a5fa",
  },
  female: {
    label: "خانم",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type ChartDataType = {
  title: string;
  female: number;
  male: number;
};

export default function GenderChartPage() {
  const { chartData, error } = useFetchChart<ChartDataType>("charts/gender");

  if (error) {
    return <div>{error}</div>;
  }

  if (chartData) {
    return (
      <MyChartBar
        title="نمودار جنسیت"
        chartTitle="gender"
        chartConfig={chartConfig}
        chartData={chartData}
      >
        <Bar dataKey="male" barSize={40} fill="#ccc" radius={6} />
        <Bar barSize={40} dataKey="female" fill="#2563eb" radius={6} />
      </MyChartBar>
    );
  }
}
