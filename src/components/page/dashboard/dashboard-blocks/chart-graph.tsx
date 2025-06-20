"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface ChartGraph {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function ChartGraph({ data }: ChartGraph) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart data={data}>
          <XAxis dataKey={"date"} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <Line
            type={"monotone"}
            dataKey={"amount"}
            stroke="var(--color-amount)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
