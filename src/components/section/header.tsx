"use client";
import { Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { siteDetails } from "@/lib/data";
import { menuItem } from "@/types/type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Container from "./container";

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
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent mx-auto w-full">
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* <IdCardIcon className="text-foreground min-w-fit w-7 h-7" /> */}
            <Image
              src={"/logo.svg"}
              width={40}
              height={40}
              alt="EzyInvoice logo"
            />
            <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-foreground-accent transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              {status != "authenticated" ? (
                <Link
                  href="/login"
                  className="text-white inline-flex h-10 animate-background-shine items-center justify-center border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 rounded-full"
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={
                    "text-white bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors"
                  }
                >
                  Dashboard
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-primary block"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#cta"
                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                onClick={toggleMenu}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
