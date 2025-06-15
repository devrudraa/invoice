import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { InvoiceFormSchemaType } from "@/schema/invoice-schema.zod";
import { useFormContext, useWatch } from "react-hook-form";

export function ProductForm() {
  const { control } = useFormContext<InvoiceFormSchemaType>();

  // Using watch for getting value because `useWatch` hook re-renders the component if the value
  // Of the given field is changed.
  const rate = useWatch({
    control,
    name: "invoiceItemRate",
  });
  const quantity = useWatch({
    control,
    name: "invoiceItemQuantity",
  });
  const currency = useWatch({
    control,
    name: "currency",
  });

  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  const calculatedCurrency = formatCurrency({
    amount: calculateTotal,
    currency: currency,
  });

  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
          <p className="col-span-6">Description</p>
          <p className="col-span-2">Quantity</p>
          <p className="col-span-2">Rate</p>
          <p className="col-span-2">Amount</p>
        </div>

        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-6">
            <FormField
              control={control}
              name="invoiceItemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="min-h-[40px]"
                      rows={1}
                      placeholder="Item name & Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={control}
              name="invoiceItemQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="0" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={control}
              name="invoiceItemRate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="0" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <Input value={calculatedCurrency} disabled />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex justify-between font-medium py-2">
            <span>Subtotal</span>
            <span>{calculatedCurrency}</span>
          </div>
          <div className="flex justify-between font-medium py-2 border-t">
            <span>Total ({currency})</span>
            <span>{calculatedCurrency}</span>
          </div>
        </div>
      </div>

      <Separator className="my-5" />
      <div>
        <FormField
          control={control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes or terms here"
                  className="mt-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
