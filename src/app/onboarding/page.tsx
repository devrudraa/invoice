import OnboardingForm from "@/components/page/onboarding/onboarding-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/utils/hooks/use-session.hook";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();
  if (session.onboarded) {
    redirect("/dashboard");
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
          <OnboardingForm />
        </CardContent>
      </Card>
    </main>
  );
};
export default Page;
