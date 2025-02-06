import { HomeIcon, LucideProps, User2 } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface dashboardLinks {
  id: number;
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const dashboardLinks: dashboardLinks[] = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoice",
    icon: User2,
  },
];
