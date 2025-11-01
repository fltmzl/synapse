"use client";

import BrandLogo from "@/components/brand-logo";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProfileDekstop from "./(main)/(landing-page)/components/profile-dekstop";
import ProfileMobile from "./(main)/(landing-page)/components/profile-mobile";

// const NAV_ITEMS = [
//   { label: "Actualité", href: "/news" },
//   { label: "Base de données", href: "/database" },
//   { label: "Acteurs", href: "/personality" },
//   { label: "Structure", href: "/explore-directory" },
//   { label: "Le coin des affaires", href: "/business-corner" }
// ];

const NAV_ITEMS = [
  { label: "Actualité", href: "/news" },
  { label: "Base de données", href: "/database" },
  { label: "Acteurs", href: "/nav-3" },
  { label: "Structure", href: "/nav-4" },
  { label: "Le coin des affaires", href: "/nav-5" }
];

export default function Header() {
  const pathname = usePathname();
  const isLoggedIn = true;

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
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    pathname === item.href && "text-primary underline"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <ProfileDekstop image="/avatar.jpg" username="John Doe" />
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
                  <ProfileMobile image="/avatar.jpg" username="John Doe" />
                ) : (
                  <Button asChild>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
