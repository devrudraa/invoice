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
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export function UserDetailsForm({
  changeDefaultValue = true,
  isEditing = false,
}: {
  changeDefaultValue?: boolean;
  isEditing?: boolean;
}) {
  const { control, setValue } = useFormContext<InvoiceFormSchemaType>();
  const { status, data } = useSession();

  if (status === "authenticated" && data && changeDefaultValue) {
    const name = `${data.user?.firstName as string} ${data.user?.lastName as string}`;
    setValue("fromName", name);
    setValue("fromEmail", `${data.user?.email}`);
    setValue("fromAddress", `${data.user?.address}`);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Label>From</Label>
        <div className="space-y-2">
          {(status != "authenticated" || !data) && changeDefaultValue ? (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </>
          ) : (
            <>
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
            </>
          )}
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
                  <Input
                    placeholder="Client Email"
                    type="email"
                    {...field}
                    disabled={isEditing}
                  />
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
