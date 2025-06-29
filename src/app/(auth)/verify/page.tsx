import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="max-w-[450px] px-5">
        <CardHeader className="text-center space-y-2 flex items-center flex-col">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-100">
            <MailCheck className="size-8 text-blue-500" />
          </div>

          <CardTitle className="text-3xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We have send a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 px-4 py-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-800">
                Be sure to check your spam folder!
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href={"/"}
            className={buttonVariants({
              className: "w-full flex gap-2 items-center",
              variant: "secondary",
            })}
          >
            <ArrowLeft className="size-4" /> Back to home page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Page;
