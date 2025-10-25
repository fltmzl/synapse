import { Button } from "@/components/ui/button";
import React from "react";

export default function LegalLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full max-w-7xl px-10 mx-auto">
      <header>
        <Button>Terms of Service</Button>
        <Button>Privacy policy</Button>
        <Button>Cookie policy</Button>
      </header>
      <main>{children}</main>
    </div>
  );
}
