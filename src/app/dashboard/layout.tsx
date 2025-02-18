import DashboardMobileNav from "@/components/page/dashboard/dashboard-mobile-nav";
import DashboardSidebar from "@/components/page/dashboard/dashboard-sidebar";
import DashboardUserDropdown from "@/components/page/dashboard/dashboard-user-dropdown";
import { checkSession } from "@/utils/hooks/use-session.hook";
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await checkSession();

  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <DashboardUserDropdown />
          <DashboardMobileNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
};
export default Layout;
