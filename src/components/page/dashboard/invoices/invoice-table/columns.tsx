"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { Invoices } from "@drizzle/schema.drizzle";
import InvoiceAction from "../invoice-action";

export const columns: ColumnDef<Invoices>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceNumber",
    header: "ID",
    cell: ({ row }) => "INV-" + row.getValue("invoiceNumber"),
  },
  {
    accessorKey: "invoiceName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            Invoice Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            Client Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      );
    },
  },

  {
    accessorKey: "clientEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            Client Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",

    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      console.log(date, `row.getValue("date")`);

      const formatted = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "long",
      }).format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "invoiceItemTotal",
    header: () => <div className="text-right">Amount</div>,

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("invoiceItemTotal"));
      const formatted = formatCurrency({
        amount: amount,
        currency: row.original.currency,
      });

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <div className="flex items-center justify-end">
          <InvoiceAction id={invoice.id} isPaid={invoice.status === "PAID"} />
        </div>
      );
    },
  },
];
