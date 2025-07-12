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

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fetchAdSalaryChart } from "@/fetch/chart/fetchAdSalaryChart";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Label, XAxis } from "recharts";

type ChartDataType = {
  title: string;
  intern: number;
  junior: number;
  midlevel: number;
  senior: number;
  neg: number;
};

export default function AdSalaryChartPage() {
  const [chartData, setChartData] = useState<ChartDataType[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAdSalaryChart();
      console.log(data);

      if (data) {
        setChartData([data]);
      }
    };

    getData();
  }, []);

  return (
    <main className="flex w-full h-full py-16 gap-8 items-center justify-center flex-col">
      <h1 className="text-center">نمودار دستمزد</h1>
      <div className="">
        <ChartContainer dir="ltr" config={chartConfig} className="min-h-[400px]">
          <BarChart accessibilityLayer data={chartData} barGap={20}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              reversed
              dataKey="advertise salary"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <Bar dataKey="intern" barSize={30} fill="#ccc" radius={6}>
              <Label
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="junior" barSize={30} fill="#2563eb" radius={6} />
            <Bar dataKey="midlevel" barSize={30} fill="#2563eb" radius={6} />
            <Bar dataKey="senior" barSize={30} fill="#2563eb" radius={6} />
            <Bar dataKey="neg" barSize={30} fill="#2563eb" radius={6} />
          </BarChart>
        </ChartContainer>
      </div>
    </main>
  );
}
