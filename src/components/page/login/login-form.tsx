"use client";
import { actionLogin } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginSchemaType } from "@/schema/login-schema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function formSubmit(data: LoginSchemaType) {
    const redirectUrl = await actionLogin(data);
    redirect(redirectUrl);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(formSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="hello@hello.com"
                  type="email"
                  {...field}
                  suppressHydrationWarning
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" loading={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
