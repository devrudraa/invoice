"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloud,
  MailIcon,
  MoreHorizontalIcon,
  Pencil,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteInvoice from "./delete";
import PaidInvoice from "./paid";
import { reminderInvoiceBtnHandler } from "./resend-invoice";

export default function InvoiceAction({
  id,
  isPaid,
}: {
  id: string;
  isPaid: boolean;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [paidOpen, setPaidOpen] = useState(false);

  return (
    <>
      <DeleteInvoice id={id} open={deleteOpen} setOpen={setDeleteOpen} />
      <PaidInvoice id={id} open={paidOpen} setOpen={setPaidOpen} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant="ghost">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isPaid ? (
            <Link href={`/dashboard/invoice/edit/${id}`}>
              <DropdownMenuItem>
                <Pencil className="size-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem disabled>
              <Pencil className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
          )}
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DropdownMenuItem>
              <DownloadCloud className="size-4 mr-2" />
              Download
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            disabled={isPaid}
            onClick={() => {
              if (!isPaid) reminderInvoiceBtnHandler(id);
            }}
          >
            <MailIcon className="size-4 mr-2" />
            Reminder Email
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setPaidOpen(true)} disabled={isPaid}>
            <CheckCircle className="size-4 mr-2" />
            Mark as Paid
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <Trash2Icon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
