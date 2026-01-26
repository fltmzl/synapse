"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import useCategoriesDropdown from "@/queries/use-categories-dropdown";
import useTerritoriesDropdown from "@/queries/use-territories-dropdown";
import SearchPersonality from "../components/search-actors";

export default function FindActors() {
  const [query, setQuery] = useState("");
  const { data: categoriesItems } = useCategoriesDropdown();
  const { data: territoriesItems } = useTerritoriesDropdown();

  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
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
          listItems={territoriesItems}
        />

        <FilterMultipleWithSearch
          buttonLabel="Catégorie"
          setValue={setCategory}
          value={category}
          placeholder="Entrez recherche…"
          listItems={categoriesItems}
        />
      </div>
    </section>
  );
}
