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
        <Link href={"todo:"}>
          <DropdownMenuItem>
            <DownloadCloud className="size-4 mr-2" />
            Download
          </DropdownMenuItem>
        </Link>
        <Link href={"todo:"}>
          <DropdownMenuItem>
            <MailIcon className="size-4 mr-2" />
            Remainder Email
          </DropdownMenuItem>
        </Link>

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
