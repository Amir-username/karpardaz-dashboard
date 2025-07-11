import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fetchGenderChart } from "@/fetch/chart/fetchGenderChart";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export default function ChartPage() {
  const [chartData, setChartData] = useState<ChartDataType[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGenderChart();
      console.log(data);

      if (data) {
        setChartData([data]);
      }
    };

    getData();
  }, []);

  return (
    <main className="flex w-full h-full py-16 gap-8 items-center justify-center flex-col">
      <h1 className="text-center">نمودار</h1>
      <div className="">
        <ChartContainer config={chartConfig} className="min-h-[400px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              dataKey="gender"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <Bar dataKey="male" barSize={40} fill="#ccc" radius={6} />
            <Bar barSize={40} dataKey="female" fill="#2563eb" radius={6} />
          </BarChart>
        </ChartContainer>
      </div>
    </main>
  );
}
