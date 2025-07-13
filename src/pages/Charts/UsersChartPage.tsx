import MyChartBar from "@/components/app/Chart/MyChartBar";
import { type ChartConfig } from "@/components/ui/chart";
import { useFetchChart } from "@/hooks/useFetchChart";
import { Bar } from "recharts";

const chartConfig = {
  jobseeker: {
    label: "کارجو",
    color: "#60a5fa",
  },
  employer: {
    label: "کارفرما",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type ChartDataType = {
  title: string;
  jobseeker: number;
  employer: number;
};

export default function UsersChartPage() {
  const { chartData, error } = useFetchChart<ChartDataType>("charts/users");

  if (error) {
    return <div>{error}</div>;
  }

  if (chartData) {
    return (
      <MyChartBar
        title="نمودار کاربران"
        chartConfig={chartConfig}
        chartData={chartData}
        chartTitle="users"
      >
        <Bar
          dataKey={"employer"}
          barSize={40}
          fill="hsl(150, 100%, 30%)"
          radius={6}
        />
        <Bar
          dataKey="jobseeker"
          barSize={40}
          fill="hsl(150, 100%, 45%)"
          radius={6}
        />
      </MyChartBar>
    );
  }
}
