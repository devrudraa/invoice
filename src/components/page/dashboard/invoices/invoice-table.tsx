import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import InvoiceAction from "./invoice-action";

export default function InvoiceTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#1</TableCell>
          <TableCell>Dev</TableCell>
          <TableCell>$2000</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>25/12/25</TableCell>
          <TableCell className="flex justify-end">
            <InvoiceAction />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
