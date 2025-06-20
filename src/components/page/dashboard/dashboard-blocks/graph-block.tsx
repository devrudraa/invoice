import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { use } from "react";
import { useDashboardBlocks } from "./action";
import ChartGraph from "./chart-graph";

export default function GraphBlock() {
  const { graphData } = use(useDashboardBlocks());

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which has been paid in last 30 days!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartGraph data={graphData} />
      </CardContent>
    </Card>
  );
}
