"use client";
import { createInvoiceAction } from "@/actions/invoice-form.action";
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
import { FormProvider, useForm } from "react-hook-form";
import {
  DateForm,
  NameForm,
  ProductForm,
  UserDetailsForm,
} from "@/components/page/dashboard/invoices/forms-chunk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateInvoice() {
  const router = useRouter();
  const methods = useForm<InvoiceFormSchemaType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientAddress: "",
      clientEmail: "",
      clientName: "",
      fromAddress: "",
      fromEmail: "",
      fromName: "",
      invoiceItemDescription: "",
      invoiceItemQuantity: "",
      invoiceItemRate: "",
      invoiceName: "",
      invoiceNumber: "",
      note: "",
      status: "PENDING",
      currency: "INR",
      dueDate: "",
      date: new Date(),
      total: 0,
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

    const response = await createInvoiceAction(data);

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
    <Card className="max-w-4xl w-full mx-auto">
      <CardContent className="p-5">
        <FormProvider {...methods}>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)}>
              {/* Name Form ✅ */}
              <NameForm />
              <Separator className="my-5" />
              {/* User Form ✅*/}
              <UserDetailsForm />
              <Separator className="my-5" />
              {/* Date form ✅*/}
              <DateForm />
              <Separator className="my-5" />
              {/* product form ✅*/}
              <ProductForm />
              <div className="flex justify-end mt-6">
                <Button type="submit" loading={methods.formState.isSubmitting}>
                  Send Invoice
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
