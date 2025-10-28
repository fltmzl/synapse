"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import SearchPersonality from "../components/search-personality";

export default function FindPersonality() {
  const [query, setQuery] = useState("");

  const filters = {
    territory: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "French Guiana", value: "French Guiana" }
    ],
    role: [
      { label: "Government", value: "Government" },
      { label: "Business Leaders", value: "Business Leaders" }
    ],
    category: [
      { label: "Economy", value: "Economy" },
      { label: "Government", value: "Government" },
      { label: "Health", value: "Health" },
      { label: "Education", value: "Education" },
      { label: "Environment", value: "Environment" }
    ]
  };

  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [role, setRole] = useQueryState(
    "role",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [category, setCategory] = useQueryState(
    "category",
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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-3 w-full">
        <span className="text-md text-muted-foreground font-regular leading-[150%] tracking-tighter ">
          Recherche par
        </span>
        <FilterMultipleWithSearch
          buttonLabel="Territoire"
          setValue={setTerritory}
          value={territory}
          placeholder="Search location"
          listItems={filters.territory}
        />
        <FilterMultipleWithSearch
          buttonLabel="Role"
          setValue={setRole}
          value={role}
          placeholder="Search role"
          listItems={filters.role}
        />

        <FilterMultipleWithSearch
          buttonLabel="Catégorie"
          setValue={setCategory}
          value={category}
          placeholder="Search category"
          listItems={filters.category}
        />
      </div>
    </section>
  );
}
