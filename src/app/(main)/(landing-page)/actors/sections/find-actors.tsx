"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import SearchPersonality from "../components/search-actors";

export default function FindActors() {
  const [query, setQuery] = useState("");

  const filters = {
    territory: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "Guyane", value: "Guyane" }
    ],
    // role: [
    //   { label: "Government", value: "Government" },
    //   { label: "Business Leaders", value: "Business Leaders" }
    // ],
    category: [
      { label: "Administration", value: "Administration" },
      { label: "Artistique", value: "Artistique" },
      { label: "Associatif", value: "Associatif" },
      { label: "Economique", value: "Economique" },
      { label: "Judiciaire", value: "Judiciaire" },
      { label: "Médiatique", value: "Médiatique" },
      { label: "Politique", value: "Politique" }
    ]
  };

  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  // const [role, setRole] = useQueryState(
  //   "role",
  //   parseAsArrayOf(parseAsString).withDefault([])
  // );
  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  return (
    <section className="py-12 lg:py-[164px] max-w-7xl mx-auto flex flex-col gap-10 items-center px-6">
      <div className="flex items-center flex-col justify-center w-full gap-4">
        <h1 className="text-center text-3xl lg:text-5xl font-medium leading-[110%] tracking-[-0.03em]">
          Les principaux acteurs
        </h1>
        <p className="text-center text-sm lg:text-base font-regular text-muted-foreground leading-[150%] tracking-[-0.01em]">
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
          placeholder="Entrez recherche…"
          listItems={filters.territory}
        />
        {/* <FilterMultipleWithSearch
          buttonLabel="Role"
          setValue={setRole}
          value={role}
          placeholder="Entrez recherche…"
          listItems={filters.role}
        /> */}

        <FilterMultipleWithSearch
          buttonLabel="Catégorie"
          setValue={setCategory}
          value={category}
          placeholder="Entrez recherche…"
          listItems={filters.category}
        />
      </div>
    </section>
  );
}
