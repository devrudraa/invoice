import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { getInvoices } from "./get-invoice";
import InvoiceAction from "./invoice-action";
import Image from "next/image";

export default async function InvoiceTable() {
  const data = await getInvoices();

  return (
    <>
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
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>#{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>
                {formatCurrency({
                  amount: invoice.invoiceItemTotal,
                  currency: invoice.currency,
                })}
              </TableCell>
              <TableCell>
                <Badge>{invoice.status}</Badge>
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-IN", {
                  dateStyle: "medium",
                }).format(invoice.createdAt)}
              </TableCell>
              <TableCell className="flex justify-end">
                <InvoiceAction
                  id={invoice.id}
                  isPaid={invoice.status === "PAID"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && (
        <Image
          className="mx-auto my-5"
          src={"/undraw_taken.svg"}
          width={200}
          height={200}
          alt="undraw_taken.svg"
        />
      )}
    </>
  );
}
