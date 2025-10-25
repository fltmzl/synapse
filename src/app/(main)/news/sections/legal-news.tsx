import { useState } from "react";
import { NewsFilter } from "../components/news-filter";
import { legalPost, newsData } from "@/data/news-data";
import { Button } from "@/components/ui/button";
import NewsCard from "../card/news-card";
import clsx from "clsx";
import { array } from "zod";
import { ChevronDown } from "lucide-react";
import { SortLegal } from "../components/sort-legal";
import { PlatformFilter } from "../components/platform-legal-filter";
import { LegalFilter } from "../components/legal-filter";
import { LegalCard } from "../card/legal-news-card";
import SectionContainer from "@/components/container/section-container";

export default function LegalNews() {
  const [category, setCategory] = useState("Tout");
  const [sort, setSort] = useState("Newest");
  const [query, setQuery] = useState("");

  const filtered = newsData
    .filter((n) =>
      category === "Tout"
        ? true
        : n.category.toLowerCase() === category.toLowerCase()
    )
    .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <SectionContainer className="px-4 py-6 lg:p-20 max-7xl">
      <div className="flex flex-col gap-6 lg:gap-16">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="flex flex-col gap-8 ">
            <h1 className="text-3xl font-semibold text-center">
              Veille réseaux sociaux
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full ">
            <PlatformFilter selected={category} onSelect={setCategory} />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:gap-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-row w-full gap-3 lg:gap-4">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 w-full lg:w-auto">
                <LegalFilter onFilterChange={setCategory} />
              </div>

              <div className="flex items-center gap-3 sm:ml-auto">
                <span className="text-md font-medium leading-[140%] tracking-tighter whitespace-nowrap">
                  Filtrer par
                </span>
                <SortLegal selected={sort} onChange={setSort} />
              </div>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {legalPost.map((news, index) => (
              <div
                key={index}
                className={`
        break-inside-avoid mb-4
        ${index >= 5 ? "hidden sm:block" : ""}
      `}
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
