"use client";

import { useState } from "react";

import SearchCompany from "../components/search-company";

export default function FindCompany() {
  const [query, setQuery] = useState("");

  return (
    <section className="py-12 lg:py-20 max-w-7xl mx-auto flex flex-col gap-10 items-center px-6">
      <div className="flex items-center text-center flex-col justify-center w-full gap-2 lg:gap-4">
        <h1 className="text-3xl lg:text-5xl font-medium text-center items-center leading-[110%] tracking-[-0.03em]">
          Entreprises et organisations
        </h1>
        <p className="text-sm lg:text-base font-regular text-muted-foreground leading-[140%] tracking-[-0.01em] lg:leading-[110%]">
          Rechercher des informations relatives à une structure
        </p>
      </div>
      <div className="w-full lg:max-w-[840px] rounded-md">
        <SearchCompany onSearch={setQuery} />
      </div>
    </section>
  );
}
