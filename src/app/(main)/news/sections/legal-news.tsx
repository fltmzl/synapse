import { useState } from "react";
import { legalPost, newsData } from "@/data/news-data";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SortLegal from "../components/sort-legal";
import PlatformFilter from "../components/platform-legal-filter";
import LegalCard from "../card/legal-news-card";
import SectionContainer from "@/components/container/section-container";
import SectionTitle from "@/components/typography/section-title";
import LegalFilter from "../components/legal-filter";
import { cn } from "@/lib/utils";

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
    <SectionContainer className="px-4 py-6 lg:p-20">
      <div className="flex flex-col gap-6 lg:gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="flex flex-col gap-8 ">
            <SectionTitle className="text-center">
              Veille réseaux sociaux
            </SectionTitle>
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
                className={cn(
                  "break-inside-avoid mb-4",
                  index >= 5 && "hidden sm:block"
                )}
              >
                <LegalCard {...news} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 ">
          <Button variant="outline" size="default" className="w-full lg:w-max">
            Show More
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
