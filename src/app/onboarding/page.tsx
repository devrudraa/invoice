"use client";
import { onboardUser } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  onboardingSchema,
  onboardingSchemaType,
} from "@/schema/onboarding-schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<onboardingSchemaType>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      address: "",
      first_name: "",
      last_name: "",
    },
  });

  async function onSubmit(values: onboardingSchemaType) {
    const response = await onboardUser(values);

    if (response?.type === "error") {
      Object.entries(response.errors).forEach(([field, messages]) => {
        form.setError(field as keyof onboardingSchemaType, {
          type: "server",
          message: Array.isArray(messages) ? messages[0] : messages,
        });
      });
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <main className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost there!</CardTitle>
          <CardDescription>
            Fill the details to complete your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dev" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Rudra" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="House 1, street XYZ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" loading={form.formState.isSubmitting}>
                Save Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};
export default Page;
