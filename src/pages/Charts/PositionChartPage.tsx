import MyChartBar from "@/components/app/Chart/MyChartBar";
import { type ChartConfig } from "@/components/ui/chart";
import { useFetchChart } from "@/hooks/useFetchChart";
import { Bar } from "recharts";

const chartConfig = {
  junior: {
    label: "جونیور",
    color: "#fff",
  },
  midlevel: {
    label: "میدلول",
    color: "#fff",
  },
  senior: {
    label: "سنیور",
    color: "#fff",
  },
} satisfies ChartConfig;

type ChartDataType = {
  title: string;
  junior: number;
  midlevel: number;
  senior: number;
};

export default function PositionChartPage() {
  const { chartData, error } = useFetchChart<ChartDataType>("charts/position");

  if (error) {
    return <div>{error}</div>;
  }

  if (chartData) {
    return (
      <MyChartBar
        title="نمودار موقعیت شغلی"
        chartConfig={chartConfig}
        chartData={chartData}
        chartTitle="position"
      >
        <Bar
          dataKey="junior"
          barSize={30}
          fill="hsl(150, 100%, 50%)"
          radius={6}
        />
        <Bar
          dataKey="midlevel"
          barSize={30}
          fill="hsl(150, 100%, 40%)"
          radius={6}
        />
        <Bar
          dataKey="senior"
          barSize={30}
          fill="hsl(150, 100%, 30%)"
          radius={6}
        />
      </MyChartBar>
    );
  }
}
