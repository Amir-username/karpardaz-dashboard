import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fetchPositionChart } from "@/fetch/chart/fetchPositionChart";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  const [chartData, setChartData] = useState<ChartDataType[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPositionChart();
      console.log(data);

      if (data) {
        setChartData([data]);
      }
    };

    getData();
  }, []);

  return (
    <main className="flex w-full h-full py-16 gap-8 items-center justify-center flex-col">
      <h1 className="text-center">نمودار موقعیت شغلی</h1>
      <div className="">
        <ChartContainer dir="ltr" config={chartConfig} className="min-h-[400px]">
          <BarChart accessibilityLayer data={chartData} barGap={20} >
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              dataKey="position"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <Bar dataKey="junior" barSize={30} fill="#263eb" radius={6} />
            <Bar dataKey="midlevel" barSize={30} fill="#2563eb" radius={6} />
            <Bar dataKey="senior" barSize={30} fill="#2563eb" radius={6} />
          </BarChart>
        </ChartContainer>
      </div>
    </main>
  );
}
