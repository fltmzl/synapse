import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  currentPage: "terms-of-service" | "privacy-policy" | "cookie-policy";
};

export default function HeaderLegal({ currentPage }: Props) {
  const menus = [
    {
      title: "Terms of Service",
      href: "/legal/terms-of-service",
      isActive: currentPage === "terms-of-service"
    },
    {
      title: "Privacy policy",
      href: "/legal/privacy-policy",
      isActive: currentPage === "privacy-policy"
    },
    {
      title: "Cookie policy",
      href: "/legal/cookie-policy",
      isActive: currentPage === "cookie-policy"
    }
  ];

  return (
    <header className="flex gap-3 mb-4 lg:mb-2 overflow-x-auto hide-scrollbar">
      {menus.map((menu) => (
        <Button
          key={menu.href}
          size="xl"
          variant={menu.isActive ? "secondary" : "outline-hover-primary"}
          asChild
        >
          <Link href={menu.href}>{menu.title}</Link>
        </Button>
      ))}
    </header>
  );
}
