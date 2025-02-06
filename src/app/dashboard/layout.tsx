import { actionLogout } from "@/actions/auth.action";
import DashboardSidebar, {
  DashboardLinks,
} from "@/components/page/dashboard/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { checkSession } from "@/utils/hooks/use-session.hook";
import { MenuIcon, User2 } from "lucide-react";
import Link from "next/link";
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
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full"
                  variant={"outline"}
                  size={"icon"}
                >
                  <User2 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/dashboard/invoices"}>Invoices</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={actionLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"} className="md:hidden">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent aria-describedby="link for different pages of dashboard">
              <SheetTitle>
                <span className="font-semibold text-blue-600 text-xl">
                  InvoiceEsy
                </span>
              </SheetTitle>
              <nav className="grid gap-2 mt-10">
                <DashboardLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        {children}
      </div>
    </section>
  );
};
export default Layout;
