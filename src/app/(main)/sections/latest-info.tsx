import TabsHeader from "@/components/tabs-header";
import { H3 } from "@/components/typography/h3";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { lastInfo } from "@/data/news-data";
import { cn } from "@/lib/utils";
import { NewsData } from "@/types/news.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import { useState } from "react";

export default function LatestInfo() {
  const [activeTab, setActiveTab] = useState("politique");
  return (
    <section className="max-w-7xl mx-auto py-12 lg:py-25 w-full px-6 flex flex-col gap-10 lg:gap-16 items-center">
      <div>
        <SectionTitle>Actualité</SectionTitle>
      </div>
      <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} >
          <div className="border-b">
            <TabsHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={Object.keys(lastInfo)}
            
            />
          </div>

          {/* Tabs Content */}
          {Object.entries(lastInfo as Record<string, NewsData>).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="pt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-8 items-stretch">
                <div className="flex flex-col  justify-between h-full gap-2">
                  <div className="flex flex-col  gap-4">
                    <H4>{items[0].title}</H4>
                    <P >{items[0].description}</P>
                  </div>
                  <H3>{items[0].date}</H3>
                </div>

                {/* Big Image */}
                <div className="relative w-full aspect-square lg:aspect-auto rounded-md overflow-hidden">
                  <Image
                    src={items[0].image}
                    alt={items[0].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Sub articles */}
                <div className="flex flex-col h-full divide-y divide-border">
                  {items.slice(1).map((news, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <H3 className="text-foreground">{news.title}</H3>
                        <P className="line-clamp-2 text-sm text-muted-foreground tracking-[-0.01em] leading-snug">
                          {news.description}
                        </P>
                      </div>
                      <H3 className="text-sm tracking-[-0.01em] leading-[140%] text-muted-foreground">
                        {news.date}
                      </H3>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="w-full items-center justify-center hidden lg:flex">
        <Button variant={"outline"} size={"default"}>Find more articles</Button>
      </div>
    </section>
  );
}
