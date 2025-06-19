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
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";
import { _action } from "./_action";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

interface DeleteInvoiceProps {
  id: string;
  open: boolean;
  setOpen: (e: boolean) => void;
}

const DeleteInvoice: FC<DeleteInvoiceProps> = ({ id, open, setOpen }) => {
  const router = useRouter();

  async function deleteInvoice() {
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
            This action cannot be undone. This will permanently delete the
            invoice and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Image
          src={"/warning-gif.gif"}
          alt="logo"
          width={300}
          height={300}
          className="mx-auto rounded-lg"
        />

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteInvoice}
            className={buttonVariants({ variant: "destructive" })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteInvoice;
