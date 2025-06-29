import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import InvoiceTable from "./invoice-table";

export default function InvoicesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 md:justify-between flex-col md:flex-row justify-start md:items-center">
          <div>
            <CardTitle className="text-lg font-semibold">Invoices</CardTitle>
            <CardDescription>Manage your invoices! </CardDescription>
          </div>
          <Link
            href={"/dashboard/invoice/create"}
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex items-center gap-2"
            )}
          >
            <PlusIcon /> Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <Suspense fallback={<SkeletonTable />}>
          <InvoiceTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}

function SkeletonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left text-sm font-medium text-muted-foreground border-b">
            <th className="p-4">Invoice ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, i) => (
            <tr key={i} className="border-b">
              <td className="p-4">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="p-4">
                <Skeleton className="h-6 w-12 rounded-full" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="p-4 text-right">
                <Skeleton className="h-4 w-4 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
