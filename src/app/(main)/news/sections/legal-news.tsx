import SectionContainer from "@/components/container/section-container";
import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import { Button } from "@/components/ui/button";
import { legalPost, newsData } from "@/data/news-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { LegalCard } from "../card/legal-news-card";
import PlatformFilter from "../components/platform-legal-filter";
import { SortLegal } from "../components/sort-legal";
import SelectSingleItem from "@/components/select-single-item";

export default function LegalNews() {
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

  const sortBy = [
    { label: "Newest", value: "Newest" },
    { label: "Oldest", value: "Oldest" },
    { label: "Most Relevant", value: "Most Relevant" },
    { label: "Most Popular", value: "Most Popular" },
    { label: "Editors Pick", value: "Editors Pick" }
  ];

  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [territories, setTerritories] = useQueryState(
    "territories",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [persons, setPersons] = useQueryState(
    "persons",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [platform, setPlatform] = useQueryState(
    "platform",
    parseAsString.withDefault("All")
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("Newest")
  );

  return (
    <SectionContainer className="px-4 py-6 lg:p-20 max-7xl">
      <div className="flex flex-col gap-6 lg:gap-16">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="flex flex-col gap-8 ">
            <h1 className="text-3xl font-semibold text-center">
              Veille réseaux sociaux
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <PlatformFilter selected={platform} onSelect={setPlatform} />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:gap-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex flex-col gap-3 w-full md:flex-row md:justify-between md:items-start">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <span className="text-md text-muted-foreground font-medium ">
                  Filter by
                </span>

                <FilterMultipleWithSearch
                  buttonLabel="Catégorie"
                  setValue={setCategories}
                  value={categories}
                  placeholder="Search category"
                  listItems={filter.categories}
                />
                <FilterMultipleWithSearch
                  buttonLabel="Territoire"
                  setValue={setTerritories}
                  value={territories}
                  placeholder="Search location"
                  listItems={filter.territories}
                />
                <FilterMultipleWithSearch
                  buttonLabel="Person"
                  setValue={setPersons}
                  value={persons}
                  placeholder="Search person"
                  listItems={filter.persons}
                />
              </div>

              <div className="flex items-center gap-4 justify-between">
                <span className="text-md font-medium leading-[140%] tracking-tighter whitespace-nowrap">
                  Filtrer par
                </span>
                <SelectSingleItem
                  listItems={sortBy}
                  selected={sort}
                  onChange={setSort}
                />
              </div>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {legalPost.map((news, index) => (
              <div
                key={index}
                className={cn("break-inside-avoid mb-4", {
                  "hidden sm:block": index >= 5
                })}
              >
                <LegalCard {...news} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 ">
          <Button variant="outline" size="default" className="w-full lg:w-max">
            More articles
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
