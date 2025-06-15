import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import InvoiceTable from "./invoice-table";

export default function InvoicesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
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
      <CardContent>
        <Suspense fallback={<p>Todo: add skeleton loading</p>}>
          <InvoiceTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}
