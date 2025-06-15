import { getSession } from "@/utils/hooks/use-session.hook";

async function Page() {
  const session = await getSession();

  return <div>{session.user?.email}</div>;
}
export default Page;
