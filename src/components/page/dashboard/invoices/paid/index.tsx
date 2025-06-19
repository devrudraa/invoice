"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";
import { _action } from "./_action";

interface PaidInvoiceProps {
  id: string;
  open: boolean;
  setOpen: (e: boolean) => void;
}

const PaidInvoice: FC<PaidInvoiceProps> = ({ id, open, setOpen }) => {
  const router = useRouter();

  async function markAsPaid() {
    const promise = _action(id);
    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        if (data.type == "Custom-Error") {
          throw new Error(data.error);
        } else if (data.type === "error") {
          throw new Error("Something went wrong!");
        } else {
          return `${data.message}`;
        }
      },
      error: (e) => {
        return e.message;
      },
    });
    router.refresh();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. Marking the invoice as paid will lock
            it, and further changes will no longer be allowed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Image
          src={"/paid-gif.gif"}
          alt="logo"
          width={300}
          height={300}
          className="mx-auto rounded-lg"
        />

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={markAsPaid}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PaidInvoice;
