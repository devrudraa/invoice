import { getInvoices } from "../get-invoice";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function InvoiceTable() {
  const data = await getInvoices();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
