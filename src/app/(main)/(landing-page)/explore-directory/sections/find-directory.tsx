"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import SearchDirectory from "../components/search-directory";
import useTerritoriesDropdown from "@/queries/use-territories-dropdown";
import useCategoriesDropdown from "@/queries/use-categories-dropdown";

export default function FindDirectory() {
  const [query, setQuery] = useState("");
  const { data: categoriesItems } = useCategoriesDropdown();
  const { data: territoriesItems } = useTerritoriesDropdown();

  const filters = {
    territory: territoriesItems,
    category: categoriesItems
  };

  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  return (
    <section className="py-12 lg:py-20 max-w-7xl mx-auto flex flex-col gap-10 items-center px-6">
      <div className="flex items-center text-center flex-col justify-center w-full gap-2 lg:gap-4">
        <h1 className="text-3xl lg:text-5xl font-medium text-center items-center leading-[110%] tracking-[-0.03em]">
          Cartographie des entreprises, structures et administrations
        </h1>
        <p className="text-sm lg:text-base font-regular text-muted-foreground leading-[140%] tracking-[-0.01em] lg:leading-[110%]">
          Je recherche une administration
        </p>
      </div>
      <div className="w-full lg:max-w-[840px] h-16 rounded-md">
        <SearchDirectory onSearch={setQuery} />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full">
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
