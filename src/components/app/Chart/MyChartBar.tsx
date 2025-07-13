import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis } from "recharts";

type MyChartBarProps = {
  title: string;
  children: React.ReactNode;
  chartConfig: ChartConfig;
  chartData: object[];
  chartTitle: string;
};

export default function MyChartBar({
  children,
  chartData,
  chartConfig,
  title,
  chartTitle,
}: MyChartBarProps) {
  return (
    <main className="flex w-full h-full py-16 gap-8 items-center justify-center flex-col">
      <h1 className="text-center">{title}</h1>
      <div className="">
        <ChartContainer
          dir="ltr"
          config={chartConfig}
          className="min-h-[400px]"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              dataKey={chartTitle}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            {children}
          </BarChart>
        </ChartContainer>
      </div>
    </main>
  );
}
