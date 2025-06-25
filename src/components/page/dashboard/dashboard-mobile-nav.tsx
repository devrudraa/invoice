import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteDetails } from "@/lib/data";
import { MenuIcon } from "lucide-react";
import { DashboardLinks } from "./dashboard-sidebar";

const DashboardMobileNav = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="md:hidden">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby="link for different pages of dashboard">
        <SheetTitle>
          <span className="font-semibold text-blue-600 text-xl">
            {siteDetails.siteName}
          </span>
        </SheetTitle>
        <nav className="grid gap-2 mt-10">
          <DashboardLinks />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default DashboardMobileNav;
