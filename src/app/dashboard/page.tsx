import { checkSession } from "@/utils/hooks/use-session.hook";

async function Page() {
  const session = await checkSession();

  return <div>{session.user?.email}</div>;
}
export default Page;
