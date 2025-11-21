import TabsHeader from "@/components/tabs-header";
import { H3 } from "@/components/typography/h3";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { lastInfo } from "@/data/news-data";
import { CategoryNews, NewsData } from "@/types/news.type";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function LatestInfo() {
  const [activeTab, setActiveTab] = useState("politique");
  const groupedNews = useMemo(() => {
    return lastInfo.reduce<Record<string, CategoryNews[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, []);
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
                tabs={Object.keys(groupedNews)}
              />
            </div>

            {/* Tabs Content */}
            {Object.entries(groupedNews).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="pt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr_1fr] items-start">
                  <article className="flex flex-col justify-between gap-4 h-full">
                    <Link href="#" className="contents">
                      <div className="flex flex-col gap-4">
                        <H4>{items[0].title}</H4>
                        <P className="text-sm text-muted-foreground">
                          {items[0].description}
                        </P>
                      </div>
                      <H3 className="text-sm text-muted-foreground">
                        {items[0].date}
                      </H3>
                    </Link>
                  </article>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2">
                    <div className="relative w-full rounded-md overflow-hidden aspect-square md:aspect-video lg:aspect-auto">
                      <Image
                        src={items[0].image}
                        alt={items[0].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Sub-articles (right of bottom row on md; right column on lg) */}
                    <div className="flex flex-col h-full divide-y divide-border">
                      {items.slice(1).map((news, i) => (
                        <article
                          key={i}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3"
                        >
                          <Link href="#">
                            <div className="flex flex-col gap-2">
                              <h2 className="text-lg tracking-[-0.02em] leading-[130%] text-foreground font-medium">
                                {news.title}
                              </h2>
                              <P className="line-clamp-2 text-sm text-muted-foreground tracking-[-0.01em] leading-snug">
                                {news.description}
                              </P>
                            </div>
                            <H3 className="text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground">
                              {news.date}
                            </H3>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="w-full items-center justify-center hidden lg:flex">
          <Button variant={"outline"} size={"default"}>
            <Link href="/news">Plus d&apos;articles</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
