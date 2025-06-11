import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceFormSchemaType } from "@/schema/invoice-schema.zod";
import React from "react";
import { useFormContext } from "react-hook-form";

export function UserDetailsForm() {
  const { control } = useFormContext<InvoiceFormSchemaType>();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Label>From</Label>
        <div className="space-y-2">
          <FormField
            control={control}
            name="fromName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="fromEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="fromAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <Label>To</Label>
        <div className="space-y-2">
          <FormField
            control={control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Client Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="clientAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Client Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
