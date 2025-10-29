"use client";

import { Suspense } from "react";
import AllNews from "./sections/all-news";
import LegalNews from "./sections/legal-news";
import SocialNetworkNews from "./sections/social-network";
export default function NewsPage() {
  return (
    <section className="min-h-screen p-4 flex flex-col gap-8 lg:gap-4">
      <Suspense fallback={null}>
        <AllNews />
        <SocialNetworkNews />
        <LegalNews />
      </Suspense>
    </section>
  );
}
