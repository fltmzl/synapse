"use client";

import BrandLogo from "@/components/brand-logo";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Actualité", href: "/news" },
  { label: "Base de données", href: "/base-de-donnees" },
  { label: "Acteurs", href: "/acteurs" },
  { label: "Structure", href: "/structure" },
  { label: "Le coin des affaires", href: "/le-coin-des-affaires" }
];
export default function Header() {
  const isLoggedIn = false;

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) {
      const sh = el.scrollHeight;
      el.style.height = `${sh}px`;
    } else {
      el.style.height = "0px";
    }
  }, [open]);

  return (
    <div className="bg-background sticky top-0 z-10">
      <header className="flex flex-col w-full max-w-[1310px] mx-auto px-6 py-8">
        <div>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <BrandLogo />

            {/* Desktop nav */}
            <nav className="hidden md:flex md:gap-4 lg:gap-8 text-base">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Avatar className="hidden md:block w-8 h-8">
                  <AvatarImage src="/avatar.jpg" alt="User" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              ) : (
                <Button asChild className="hidden md:block py" size="md">
                  <Link href="/auth/login">Login</Link>
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              aria-label="open menu"
              onClick={() => setOpen((s) => !s)}
              className="md:hidden p-2 rounded-full border"
            >
              <Menu size={20} />
            </button>
          </div>

          <div
            ref={panelRef}
            style={{
              height: "0px",
              overflow: "hidden",
              transition: "height 280ms ease"
            }}
            className="md:hidden"
          >
            <div className="py-12 flex flex-col gap-10">
              <div className=" px-6 flex flex-col items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex justify-center ">
                {isLoggedIn ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatar.jpg" alt="User" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                ) : (
                  <Link href="/auth/login" passHref>
                    <Button>Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
