import { useState } from "react";
import { newsData } from "@/data/news-data";
import { Button } from "@/components/ui/button";
import NewsCard from "../card/news-card";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import SectionContainer from "@/components/container/section-container";
import { H1 } from "@/components/typography/h1";
import { Title } from "@/components/typography/title";
import SearchAll from "../components/search-all-news";
import NewsFilter from "../components/news-filter";
import SelectSingleItem from "@/components/select-single-item";
import { parseAsString, useQueryState } from "nuqs";
import PostList from "@/components/post-list";

export default function AllNews() {
  const [query, setQuery] = useState("");
 const sortBy = [
    { label: "Nouveauté", value: "Nouveauté" },
    { label: "Durée", value: "Durée" },
    { label: "Popularité", value: "Popularité" },
    { label: "Pertinence", value: "Pertinence" }
  ];
  const [sortDate, setSortDate] = useQueryState(
    "sortDate",
    parseAsString.withDefault("Nouveauté")
  );

  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("Tout")
  );

  const filtered = newsData
    .filter((n) =>
      category === "Tout"
        ? true
        : n.category.toLowerCase() === category.toLowerCase()
    )
    .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <SectionContainer className="px-4 pt-10 pb-6 lg:p-20 ">
      <div className="flex flex-col gap-6 lg:gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <Title className="text-center">Actualité</Title>

          <div className="flex justify-center ">
            <SearchAll onSearch={setQuery} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <NewsFilter selected={category} onSelect={setCategory} />
          <div className="flex items-center gap-4 ">
            <span className="text-md font-medium leading-[140%] tracking-tighter">
              Filtrer par
            </span>
            <SelectSingleItem
              listItems={sortBy}
              selected={sortDate}
              onChange={setSortDate}
            />
          </div>
        </div>
        <PostList data={filtered} variant="news" />

        {/* <div className="flex flex-col divide-y divide-border">
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
        </div> */}

        <div className="flex justify-center gap-3 ">
          <Button
            variant="outline"
            size="default"
            className="text-base leading-[130%] tracking-[-0.02em] px-5 py-[10px] w-full lg:w-max"
          >
            Plus d’articles
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
