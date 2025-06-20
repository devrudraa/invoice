import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { useDashboardBlocks } from "./action";
import { formatCurrency, ratesToUSD } from "@/lib/utils";
import { use } from "react";

export default function SummaryBlock() {
  const { summaryData } = use(useDashboardBlocks());

  const totalRevenue = summaryData.totalRevenue.reduce((acc, item) => {
    const rate = ratesToUSD[item.currency] ?? 0;
    return acc + item.invoiceItemTotal * rate;
  }, 0);

  return (
    <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {/* Revenue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSignIcon className="size-4 text-muted-foreground " />
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1">
            <h2 className="text-2xl font-bold">
              {formatCurrency({
                amount: totalRevenue,
                currency: "USD",
              })}
            </h2>
            <span className="text-[0.6rem] text-muted-foreground">Approx</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Based on the last 30 days!
          </p>
        </CardContent>
      </Card>

      {/* Total Invoice issued */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <UsersIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            +{summaryData.totalRevenue.length}
          </h2>
          <p className="text-xs text-muted-foreground">
            Total invoices issued!
          </p>
        </CardContent>
      </Card>

      {/* Total Paid invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCardIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            +{summaryData.paidInvoices.length}
          </h2>
          <p className="text-xs text-muted-foreground">
            Total invoices which has been paid!
          </p>
        </CardContent>
      </Card>

      {/* Pending Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <ActivityIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            +{summaryData.pendingInvoices.length}
          </h2>
          <p className="text-xs text-muted-foreground">
            Total pending invoices!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
