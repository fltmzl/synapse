"use client";

import SectionContainer from "@/components/container/section-container";
import PostList from "@/components/post-list";
import SelectSingleItem from "@/components/select-single-item";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import NewsFilter from "../components/news-filter";
import SearchAll from "../components/search-all-news";
import useInfiniteArticles from "@/queries/use-infinite-articles";
import { format } from "date-fns";
import { NewsItem } from "@/types/news.type";
import NoResult from "@/components/no-result";
import { Spinner } from "@/components/spinner";
import PostListSkeleton from "@/components/post-list-skeleton";
import { ArticleSortOption } from "@/types/article.type";

export default function AllNews() {
  const [query, setQuery] = useState("");
  const sortBy: { label: string; value: ArticleSortOption }[] = [
    { label: "Nouveauté", value: "newest" },
    { label: "Durée", value: "duration" },
    { label: "Popularité", value: "popularity" },
    { label: "Pertinence", value: "relevance" }
  ];
  const [sortDate, setSortDate] = useQueryState(
    "sortDate",
    parseAsString.withDefault("newest")
  );

  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("All")
  );

  const {
    data: articles,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteArticles({
    sectionCategory: "news",
    isPublished: true,
    category: category === "All" ? undefined : category,
    search: query || undefined,
    sortBy: sortDate as ArticleSortOption,
    limit: 10 // Set a limit for pagination
  });

  const allArticles = articles?.pages.flatMap((page) => page.data) || [];

  const mappedArticles: NewsItem[] = allArticles.map((article) => ({
    id: article.id,
    slug: article.slug,
    category: article.category || "Actualité",
    date: article.createdAt
      ? format(article.createdAt.toDate(), "MMM dd, yyyy")
      : "Date inconnue",
    title: article.title,
    author: "Synapse",
    images: article.coverImage ? [article.coverImage] : null,
    content: article.content,
    description: article.summary
  }));

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

        {isLoading ? (
          <PostListSkeleton />
        ) : mappedArticles.length > 0 ? (
          <PostList data={mappedArticles} variant="news" />
        ) : (
          <NoResult
            title="No result found"
            description="Try searching with another title."
          />
        )}

        {hasNextPage && (
          <div className="flex justify-center gap-3 ">
            <Button
              variant="outline"
              size="default"
              className="text-base leading-[130%] tracking-[-0.02em] px-5 py-[10px] w-full lg:w-max"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Spinner fontSize={20} />
              ) : (
                <>
                  Plus d’articles
                  <ChevronDown className="size-5 text-foreground" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
