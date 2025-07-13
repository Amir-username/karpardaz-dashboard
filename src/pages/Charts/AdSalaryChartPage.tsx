const chartConfig = {
  intern: {
    label: "۵ تا ۱۰ میلیون تومان",
    color: "#fff",
  },
  junior: {
    label: "۱۰ تا ۲۰ میلیون تومان",
    color: "#fff",
  },
  midlevel: {
    label: "۲۰ تا ۴۰ میلیون تومان",
    color: "#fff",
  },
  senior: {
    label: "۴۰ میلیون به بالا",
    color: "#fff",
  },
  neg: {
    label: "توافقی",
    color: "#fff",
  },
} satisfies ChartConfig;

import MyChartBar from "@/components/app/Chart/MyChartBar";
import { type ChartConfig } from "@/components/ui/chart";
import { useFetchChart } from "@/hooks/useFetchChart";
import { Bar } from "recharts";

type ChartDataType = {
  title: string;
  intern: number;
  junior: number;
  midlevel: number;
  senior: number;
  neg: number;
};

export default function AdSalaryChartPage() {
  const { chartData, error } = useFetchChart<ChartDataType>(
    "charts/employer-salary"
  );

  if (error) {
    <div>{error}</div>;
  }

  if (chartData) {
    return (
      <MyChartBar
        title="نمودار دستمزد"
        chartConfig={chartConfig}
        chartData={chartData}
        chartTitle="advertise salary"
      >
        <Bar dataKey="intern" barSize={30} fill="#ccc" radius={6} />
        <Bar dataKey="junior" barSize={30} fill="#2563eb" radius={6} />
        <Bar dataKey="midlevel" barSize={30} fill="#2563eb" radius={6} />
        <Bar dataKey="senior" barSize={30} fill="#2563eb" radius={6} />
        <Bar dataKey="neg" barSize={30} fill="#2563eb" radius={6} />
      </MyChartBar>
    );
  }
}
