import GraphBlock from "@/components/page/dashboard/dashboard-blocks/graph-block";
import RecentBlock from "@/components/page/dashboard/dashboard-blocks/recent-block";
import SummaryBlock from "@/components/page/dashboard/dashboard-blocks/summary-block";
import { getSession } from "@/utils/hooks/use-session.hook";

async function Page() {
  await getSession();

  return (
    <main className="space-y-2 md:space-y-4">
      <SummaryBlock />

      <div className="grid gap-2 md:gap-4 xl:grid-cols-3">
        <GraphBlock />
        <RecentBlock />
      </div>
    </main>
  );
}
export default Page;
