import SectionContainer from "@/components/container/section-container";
import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import SelectSingleItem from "@/components/select-single-item";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { legalPost } from "@/data/news-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import LegalCard from "../card/legal-news-card";
import PlatformFilter from "../components/platform-legal-filter";
import SearchSocialNetwork from "../components/search-social-news";
import { useState } from "react";

export default function LegalNews() {
  const [query, setQuery] = useState("");

  const filter = {
    categories: [
      { label: "Politique", value: "Politique" },
      { label: "Economique", value: "Economique" },
      { label: "Militant", value: "Militant" },
      { label: "Citoyen", value: "Citoyen" },
      { label: "Tendance", value: "Tendance" }
    ],
    territories: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "Guyane", value: "Guyane" }
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
    { label: "Nouveauté", value: "Nouveauté" },
    { label: "Durée", value: "Durée" },
    { label: "Popularité", value: "Popularité" },
    { label: "Pertinence", value: "Pertinence" }
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
    parseAsString.withDefault("Nouveauté")
  );

  return (
    <SectionContainer className="px-4 py-6 lg:px-20 lg:py-20">
      <div className="flex flex-col max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="flex flex-col gap-8">
            <SectionTitle className="text-center">
              Actualité citoyenne
            </SectionTitle>
          </div>
          <div className="flex justify-center w-full">
            <SearchSocialNetwork onSearch={setQuery} />
          </div>

          {/* <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <PlatformFilter selected={platform} onSelect={setPlatform} />
          </div> */}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col gap-3 lg:gap-10 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex flex-col gap-3 w-full md:flex-row md:justify-between md:items-start">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <span className="text-md text-muted-foreground font-medium leading-[140%] tracking-[-0.01em] whitespace-nowrap">
                  Filter by
                </span>

                <FilterMultipleWithSearch
                  buttonLabel="Catégorie"
                  setValue={setCategories}
                  value={categories}
                  placeholder="Entrez recherche…"
                  listItems={filter.categories}
                />
                <FilterMultipleWithSearch
                  buttonLabel="Territoire"
                  setValue={setTerritories}
                  value={territories}
                  placeholder="Entrez recherche…"
                  listItems={filter.territories}
                />
                <FilterMultipleWithSearch
                  buttonLabel="Personnalité"
                  setValue={setPersons}
                  value={persons}
                  placeholder="Entrez recherche…"
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

          {/* ====== MOBILE (1 column) ====== */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-4 sm:gap-4">
              {legalPost.map((news, idx) => (
                <div key={idx} className="w-full">
                  <LegalCard {...news} />
                </div>
              ))}
            </div>
            {/* Jarak bawah khusus mobile */}
            <div className="mt-6" /> {/* 24px jarak ke button */}
          </div>

          {/* ====== DESKTOP (masonry style 4 kolom) ====== */}
          <div className="hidden lg:block">
            <div className="columns-4 gap-4 [column-gap:16px]">
              {legalPost.map((news, idx) => (
                <div
                  key={idx}
                  className="break-inside-avoid mb-4 inline-block w-full"
                >
                  <LegalCard {...news} />
                </div>
              ))}
            </div>
            {/* Jarak bawah khusus desktop */}
            <div className="mt-12" /> {/* 64px jarak ke button */}
          </div>
        </div>

        {/* Show More Button */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" className="w-full lg:w-max px-6">
            Plus de contenus
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
