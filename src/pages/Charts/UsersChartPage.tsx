import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useFetchChart } from "@/hooks/useFetchChart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

  return (
    <main className="flex w-full h-full py-16 gap-8 items-center justify-center flex-col">
      <h1 className="text-center">نمودار کاربران</h1>
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
              dataKey="users"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <Bar dataKey={"employer"} barSize={40} fill="#2563eb" radius={6} />
            <Bar dataKey="jobseeker" barSize={40} fill="#ccc" radius={6} />
          </BarChart>
        </ChartContainer>
      </div>
    </main>
  );
}
