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
import { reminderInvoiceBtnHandler } from "./resend-invoice";

export default function InvoiceAction({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant="ghost">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/dashboard/invoice/edit/${id}`}>
          <DropdownMenuItem>
            <Pencil className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </Link>
        <Link href={`/api/invoice/${id}`} target="_blank">
          <DropdownMenuItem>
            <DownloadCloud className="size-4 mr-2" />
            Download
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onClick={() => {
            reminderInvoiceBtnHandler(id);
          }}
        >
          <MailIcon className="size-4 mr-2" />
          Reminder Email
        </DropdownMenuItem>

        <Link href={"todo:"}>
          <DropdownMenuItem>
            <CheckCircle className="size-4 mr-2" />
            Mark as Paid
          </DropdownMenuItem>
        </Link>

        <Link href={"todo:"}>
          <DropdownMenuItem>
            <Trash2Icon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
