"use client";
import { cn } from "@/lib/utils";
import Logo from "@public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "./dashboard-links";

// interface DashboardSidebarProps {}
// const DashboardSidebar: FC<DashboardSidebarProps> = ({}) => {

const DashboardSidebar = () => {
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex flex-col max-h-screen h-full gap-2">
        <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={Logo} alt="logo" className="size-7" />
            <span className="font-semibold text-blue-600 text-xl">
              InvoiceEsy
            </span>
          </Link>
        </div>
        <div className="flex-1 ">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <DashboardLinks />
          </nav>
        </div>
      </div>
    </aside>
  );
};
export default DashboardSidebar;

export const DashboardLinks = () => {
  const pathname = usePathname();
  return dashboardLinks.map((link) => (
    <Link
      key={link.id}
      href={link.href}
      className={cn(
        "flex gap-2 items-center text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 transition-all ",
        pathname === link.href && "text-primary bg-primary/10"
      )}
    >
      <link.icon className="size-4" />
      {link.name}
    </Link>
  ));
};
