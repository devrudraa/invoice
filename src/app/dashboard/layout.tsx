import DashboardMobileNav from "@/components/page/dashboard/dashboard-mobile-nav";
import DashboardSidebar from "@/components/page/dashboard/dashboard-sidebar";
import DashboardUserDropdown from "@/components/page/dashboard/dashboard-user-dropdown";
import { getSession } from "@/utils/hooks/use-session.hook";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "EzyInvoice Dashboard",
};

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await getSession();

  if (!session.onboarded) {
    redirect("/onboarding");
  }

  return (
    <SessionProvider>
      <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DashboardSidebar />
        <div className="flex flex-col">
          <header className="flex justify-between md:justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="visible md:hidden flex items-center gap-2"
            >
              <Image
                src={"/logo.svg"}
                width={40}
                height={40}
                alt="EzyInvoice logo"
              />
            </Link>
            <div className="flex gap-3">
              <DashboardUserDropdown />
              <DashboardMobileNav />
            </div>
          </header>
          <main className="max-w-[100dvw] flex flex-1 flex-col gap-4 lg:gap-6 p-2 lg:p-4">
            {children}
          </main>
        </div>
      </section>
    </SessionProvider>
  );
};
export default Layout;
