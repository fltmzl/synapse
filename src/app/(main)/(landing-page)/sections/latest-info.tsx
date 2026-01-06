import TabsHeader from "@/components/tabs-header";
import { H3 } from "@/components/typography/h3";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import useArticles from "@/queries/use-articles";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NewsCardSkeleton from "../components/skeletons/news-card-skeleton";
import { format } from "date-fns";
import { CategoryNews } from "@/types/news.type";
import NoResult from "@/components/no-result";

export default function LatestInfo() {
  const [activeTab, setActiveTab] = useState("Politique");
  const { data: articles, isFetching } = useArticles({
    sectionCategory: "news",
    isPublished: true,
    category: activeTab,
    limit: 3
  });

  const categoryTabs: CategoryNews[] = [
    "Politique",
    "Juridique",
    "Citoyenne",
    "Economique"
  ];

  return (
    <div className="bg-background">
      <section className="max-w-7xl mx-auto py-12 lg:py-25 w-full px-6 flex flex-col gap-10 lg:gap-16 items-center">
        <div>
          <SectionTitle>Actualité</SectionTitle>
        </div>
        <div className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b">
              <TabsHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={categoryTabs}
              />
            </div>

            {isFetching ? (
              <div className="flex gap-4 pt-8 w-full">
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </div>
            ) : articles?.length ? (
              <TabsContent key={activeTab} value={activeTab}>
                <div className="pt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr_1fr] items-start">
                  <article className="flex flex-col justify-between gap-4 h-full">
                    <Link
                      href={`/news/${articles[0].slug}`}
                      className="contents"
                    >
                      <div className="flex flex-col gap-4">
                        <H4>{articles[0].title}</H4>
                        <P className="text-sm text-muted-foreground line-clamp-3">
                          {articles[0].summary}
                        </P>
                      </div>
                      <H3 className="text-sm text-muted-foreground">
                        {format(
                          articles[0].createdAt.toDate(),
                          "MMMM dd, yyyy"
                        )}
                      </H3>
                    </Link>
                  </article>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2 min-h-full">
                    <div className="relative w-full rounded-md overflow-hidden aspect-square md:aspect-video lg:aspect-auto">
                      <Image
                        src={
                          articles[0].coverImage || "/images/placeholder.png"
                        }
                        alt={articles[0].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="flex flex-col h-full divide-y divide-border">
                      {articles.slice(1).map((news, i) => (
                        <article
                          key={i}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3"
                        >
                          <Link href={`/news/${news.slug}`}>
                            <div className="flex flex-col gap-2">
                              <h2 className="text-lg tracking-[-0.02em] leading-[130%] text-foreground font-medium line-clamp-2">
                                {news.title}
                              </h2>
                              <P className="line-clamp-2 text-sm text-muted-foreground tracking-[-0.01em] leading-snug">
                                {news.summary}
                              </P>
                            </div>
                            <H3 className="text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground">
                              {format(news.createdAt.toDate(), "MMMM dd, yyyy")}
                            </H3>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ) : (
              <NoResult
                title="Aucun article trouvé"
                description="Aucun article trouvé pour cette catégorie."
              />
            )}
          </Tabs>
        </div>
        <div className="w-full items-center justify-center hidden lg:flex">
          <Button variant={"outline"} size={"default"} asChild>
            <Link href="/news">Plus d&apos;articles</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
