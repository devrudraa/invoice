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
import Image from "next/image";

export default function GraphBlock() {
  const { graphData } = use(useDashboardBlocks());

  return (
    <Card className="lg:col-span-2 max-w-[100dvw]">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which has been paid in last 30 days!
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        {graphData.length === 0 ? (
          <div className="w-full h-full">
            <Image
              className="mx-auto my-5"
              src={"/undraw_growing.svg"}
              width={350}
              height={350}
              alt="undraw_taken.svg"
            />
          </div>
        ) : (
          <ChartGraph data={graphData} />
        )}
      </CardContent>
    </Card>
  );
}
