"use client";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { siteDetails } from "@/lib/data";
import { cn } from "@/lib/utils";
import { menuItem } from "@/types/type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Container from "./container";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const menuItems: menuItem[] = [
  {
    text: "Features",
    url: "#features",
  },
  {
    text: "Testimonials",
    url: "#testimonials",
  },
  {
    text: "FAQs",
    url: "#faq",
  },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { status } = useSession();
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (currentY > lastScrollY) {
        setScrollDirection("up"); // hiding header
      } else {
        setScrollDirection("down"); // showing header
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 480);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={{
        y: scrollDirection === "up" ? "-100%" : "0%",
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(255, 255, 255, 0)",
        boxShadow: scrolled
          ? "0 2px 10px rgba(0, 0, 0, 0.05)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky top-0 right-0 w-full z-50 backdrop-blur-md transition-shadow`}
    >
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-transparent md:bg-transparent mx-auto flex justify-between items-center px-5 py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo.svg"}
              width={40}
              height={40}
              alt="EzyInvoice logo"
            />
            <span
              className={cn(
                `manrope text-xl font-semibold text-foreground cursor-pointer`,
                scrolled ? "text-black" : "text-white"
              )}
            >
              {siteDetails.siteName}
            </span>
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className={cn(
                    `text-foreground hover:text-foreground-accent transition-colors text-white`,
                    scrolled ? "text-black" : "text-white"
                  )}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              {status != "authenticated" ? (
                <Link
                  href="/login"
                  className="text-black inline-flex h-10 items-center justify-center border border-gray-300 bg-white px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 rounded-full"
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={
                    "text-secondary-foreground bg-secondary hover:bg-primary-accent px-5 py-2 rounded-full transition-colors"
                  }
                >
                  Dashboard
                </Link>
              )}
            </li>
          </ul>
          {/* Mobile Menu Button */}
          <MobileHeader
            scrolled={scrolled}
            authenticated={status === "authenticated"}
          />
        </nav>
      </Container>
    </motion.header>
  );
};

export default Header;

const MobileHeader = ({
  scrolled,
  authenticated,
}: {
  authenticated: boolean;
  scrolled: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="visible md:hidden" asChild>
        <Menu
          className={cn(`size-8`, scrolled ? "text-black" : "text-white")}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* Only for accessability */}
          <SheetTitle className="hidden">Nav Menu Items</SheetTitle>
          <ul className="text-start gap-10">
            <SheetDescription className="space-y-5">
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className="text-foreground hover:text-primary block text-lg font-semibold"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
              {authenticated ? (
                <li>
                  <Link
                    href={"/Dashboard"}
                    onClick={() => setOpen(false)}
                    className="text-foreground hover:text-primary block text-lg font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href={"/login"}
                    onClick={() => setOpen(false)}
                    className="text-foreground hover:text-primary block text-lg font-semibold"
                  >
                    Login
                  </Link>
                </li>
              )}
            </SheetDescription>
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
