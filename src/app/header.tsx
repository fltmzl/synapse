"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Actualité", href: "/actualite" },
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
    <header className="flex flex-col w-full max-w-7xl mx-auto px-6 py-8">
      <div>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif">
            <Image src="/images/logo.png" alt="Logo" width={100} height={80} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 text-base">
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
              <Link href="/auth/login" passHref>
                <Button className="hidden md:block px-6 py-[10px]" size="md">
                  Login
                </Button>
              </Link>
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
          className="mt-4 md:hidden"
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
  );
}
