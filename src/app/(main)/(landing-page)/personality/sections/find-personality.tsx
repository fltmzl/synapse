"use client";


import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import SearchPersonality from "../card/search-personality";
import { useState } from "react";

export default function FindPersonality() {
  const [query, setQuery] = useState("");

  const filter = {
    categories: [
      { label: "Tax Law", value: "Tax Law" },
      { label: "Labor Law", value: "Labor Law" },
      { label: "Environment", value: "Environment" },
      { label: "Immigration", value: "Immigration" },
      { label: "Indigenous Rights", value: "Indigenous Rights" }
    ],
    territories: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "French Guiana", value: "French Guiana" }
    ],
    persons: [
      { label: "Éric Dubois", value: "Éric Dubois" },
      { label: "Sophie Laurent", value: "Sophie Laurent" },
      { label: "Marc Rivière", value: "Marc Rivière" },
      { label: "Jean-Paul Lévy", value: "Jean-Paul Lévy" },
      { label: "Louise Morel", value: "Louise Morel" }
    ]
  };

  const [territories, setTerritories] = useQueryState(
    "territories",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [positions, setPositions] = useQueryState(
    "positions",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  return (
    <section className="py-12 lg:py-[164px] max-w-7xl mx-auto flex flex-col gap-10 items-center px-6">
      <div className="flex items-center flex-col justify-center w-full gap-4">
        <h1 className="text-3xl lg:text-5xl font-medium leading-[110%] tracking-[-0.03em]">
          Les principaux acteurs
        </h1>
        <p className="text-sm lg:text-base font-regular text-muted-foreground leading-[150%] tracking-[-0.01em]">
          Use AI to discover profiles, connections, and organizational roles
          instantly.
        </p>
      </div>
      <div className="w-full lg:max-w-[840px] h-16 rounded-md">
        <SearchPersonality onSearch={setQuery} />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <span className="text-md text-muted-foreground font-medium ">
         Recherche par
        </span>

        
      </div>
    </section>
  );
}
