"use client";

import PostList from "@/components/post-list";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import useInfiniteArticles from "@/queries/use-infinite-articles";
import { NewsItem } from "@/types/news.type";
import { format } from "date-fns";
import PostListSkeleton from "@/components/post-list-skeleton";
import { Spinner } from "@/components/spinner";
import NoResult from "@/components/no-result";

export default function Opportunities() {
  const {
    data: articles,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteArticles({
    sectionCategory: "business_corner",
    isPublished: true,
    limit: 5
  });

  const allArticles = articles?.pages.flatMap((page) => page.data) || [];

  const mappedArticles: NewsItem[] = allArticles.map((article) => ({
    id: article.id,
    slug: article.slug,
    category: article.category || "Reprise d'entreprise",
    date: article.createdAt
      ? format(article.createdAt.toDate(), "dd MMM yyyy")
      : "Date inconnue",
    title: article.title,
    author: "Synapse",
    images: article.coverImage ? [article.coverImage] : null,
    content: article.content,
    description: article.summary
  }));

  return (
    <section className="bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-25">
        <div className="flex items-center flex-col">
          <h1 className="text-3xl lg:text-[40px] font-medium leading-[110%] tracking-[-0.03em] mb-4 text-center">
            Opportunités{" "}
          </h1>
          <p className="text-lg text-center leading-[150%] tracking-[-0.01em] text-muted-foreground">
            Reprise d&apos;entreprises
          </p>
        </div>

        {isLoading ? (
          <div className="pt-8">
            <PostListSkeleton />
          </div>
        ) : mappedArticles.length > 0 ? (
          <PostList data={mappedArticles} variant="opportunity" />
        ) : (
          <div className="pt-8">
            <NoResult
              title="Aucune opportunité trouvée"
              description="Il n'y a pas d'articles disponibles pour le moment."
            />
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center gap-3 pt-8 lg:pt-16 ">
            <Button
              variant="outline"
              size="default"
              className="text-base leading-[130%] tracking-[-0.02em] px-5 py-[10px] w-max"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Spinner fontSize={16} />
              ) : (
                <>
                  Plus d&apos;articles
                  <ChevronDown className="size-5 text-foreground" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
