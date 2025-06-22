import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardBlocks } from "./action";
import { use } from "react";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function RecentBlock() {
  const { recentData } = use(useDashboardBlocks());
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="w-full space-y-3">
        {recentData.length === 0 && (
          <Image
            className="mx-auto my-5"
            src={"/undraw_taken.svg"}
            width={200}
            height={200}
            alt="undraw_taken.svg"
          />
        )}
        {recentData.map((client) => {
          const clientName = client.clientName.split(" ");

          return (
            <div key={client.id} className="flex items-center gap-4">
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>
                  {clientName[0]?.[0].toUpperCase() ?? ""}
                  {clientName[1]?.[0].toUpperCase() ?? ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">
                  {client.clientName}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  style={{
                    width: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {client.clientEmail}
                </p>
              </div>
              <div className="ml-auto text-green-500">
                +
                {formatCurrency({
                  amount: client.invoiceItemTotal,
                  currency: client.currency,
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
