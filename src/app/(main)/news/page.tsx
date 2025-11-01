"use client";

import AllNews from "./sections/all-news";
import LegalNews from "./sections/legal-news";
import SocialNetworkNews from "./sections/social-network";
export default function NewsPage() {
  return (
    <section className="min-h-screen p-4 flex flex-col gap-8 lg:gap-4">
        <AllNews />
        <SocialNetworkNews />
        <LegalNews />
    </section>
  );
}
