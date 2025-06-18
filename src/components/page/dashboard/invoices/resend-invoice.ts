import { resendInvoiceAction } from "@/actions/resend-invoice.action";
import { toast } from "sonner";

export async function reminderInvoiceBtnHandler(id: string) {
  const promise = resendInvoiceAction(id);

  toast.promise(promise, {
    loading: "Loading...",
    success: (data) => {
      console.log(data);

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
}
