import { useState } from "react";
import { NewsFilter } from "../components/news-filter";
import { newsData } from "@/data/news-data";
import { Button } from "@/components/ui/button";
import NewsCard from "../card/news-card";
import clsx from "clsx";
import { array } from "zod";
import { ChevronDown } from "lucide-react";
import { SearchAll } from "../components/search-all-news";
import { SortNews } from "../components/sort-news";
import SectionContainer from "@/components/container/section-container";

export default function AllNews() {
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
    <SectionContainer className="px-4 py-5 lg:p-20 max-7xl">
      <div className="flex flex-col gap-6 lg:gap-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold text-center">Actualité</h1>

          <div className="flex justify-center">
            <SearchAll onSearch={setQuery} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <NewsFilter selected={category} onSelect={setCategory} />
          <div className="flex items-center gap-4 ">
            <span className="text-md font-medium leading-[140%] tracking-tighter">
              Filtrer par
            </span>
            <SortNews selected={sort} onChange={setSort} />
          </div>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {filtered.slice(0, 5).map((news, index, arr) => {
            const isFirst = index === 0;
            const isLast = index === arr.length - 1;

            return (
              <div
                key={index}
                className={clsx(
                  !isFirst && " pt-8",
                  !isLast && "pb-8 border-b border-border"
                )}
              >
                <NewsCard {...news} slug={news.slug ?? ""} />
              </div>
            );
          })}
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
