"use client";
import { editInvoiceAction } from "@/actions/edit-invoice.action";
import {
  DateForm,
  NameForm,
  ProductForm,
  UserDetailsForm,
} from "@/components/page/dashboard/invoices/forms-chunk";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { setFormServerErrors } from "@/lib/utils";
import {
  InvoiceFormSchemaType,
  invoiceSchema,
} from "@/schema/invoice-schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditInvoice {
  data: Prisma.InvoiceGetPayload<true>;
}

export default function EditInvoice({ data: pData }: EditInvoice) {
  const router = useRouter();
  const methods = useForm<InvoiceFormSchemaType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientAddress: pData.clientAddress,
      clientEmail: pData.clientEmail,
      clientName: pData.clientName,
      fromAddress: pData.fromAddress,
      fromEmail: pData.fromEmail,
      fromName: pData.fromName,
      invoiceItemDescription: pData.invoiceItemDescription,
      invoiceItemQuantity: String(pData.invoiceItemQuantity),
      invoiceItemRate: String(pData.invoiceItemRate),
      invoiceName: pData.invoiceName,
      invoiceNumber: String(pData.invoiceNumber),
      note: pData.note || "",
      status: pData.status,
      currency: pData.currency,
      dueDate: pData.dueDate,
      date: pData.date,
      total: pData.invoiceItemTotal,
    },
  });

  const formSubmit = async (data: InvoiceFormSchemaType) => {
    if (isNaN(Number(data.invoiceNumber))) {
      methods.setError("invoiceNumber", { message: "Please enter a number" });
      methods.setFocus("invoiceNumber");
      return;
    }
    if (isNaN(Number(data.invoiceItemQuantity))) {
      methods.setError("invoiceItemQuantity", {
        message: "Please enter a number",
      });
      methods.setFocus("invoiceItemQuantity");
      return;
    }
    if (isNaN(Number(data.invoiceItemRate))) {
      methods.setError("invoiceItemRate", { message: "Please enter a number" });
      methods.setFocus("invoiceItemRate");
      return;
    }

    const response = await editInvoiceAction(data, pData.id);

    if (response?.type === "error") {
      setFormServerErrors<InvoiceFormSchemaType>(methods.setError, response);
      return;
    } else if (response.type === "success") {
      toast.success(response.message);
      router.push("/dashboard/invoice");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="space-y-3 max-w-4xl w-full mx-auto">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Updating the invoice will trigger another notification email to the
          client.
        </AlertDescription>
      </Alert>
      <Card>
        <CardContent className="p-5">
          <FormProvider {...methods}>
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(formSubmit)}>
                {/* Name Form ✅ */}
                <NameForm />
                <Separator className="my-5" />
                {/* User Form ✅*/}
                <UserDetailsForm changeDefaultValue={false} isEditing />
                <Separator className="my-5" />
                {/* Date form ✅*/}
                <DateForm />
                <Separator className="my-5" />
                {/* product form ✅*/}
                <ProductForm />
                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    loading={methods.formState.isSubmitting}
                  >
                    Update Invoice
                  </Button>
                </div>
              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
