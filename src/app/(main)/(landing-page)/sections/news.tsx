"use client";

import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player";
import { newsData } from "@/data/news-data";
import Link from "next/link";
import NewsCard from "../components/card/news-card";
import useArticles from "@/queries/use-articles";
import NewsCardSkeleton from "../components/skeletons/news-card-skeleton";
import { format } from "date-fns";

export default function NewsSection() {
  const { data: articles, isLoading } = useArticles({
    sectionCategory: "top_of_the_day",
    isPublished: true
  });

  return (
    <div className="bg-background">
      <section className="w-full flex flex-col gap-10 lg:gap-16 pt-0 pb-12 lg:pb-25 px-6 max-w-7xl mx-auto">
        <div className="w-full relativ flex flex-col gap-8">
          <VideoPlayer
            buttonPlayerType="largeBlur"
            poster="/images/jumbotron-video-thumb.png"
            classNames={{
              wrapper:
                "aspect-video min-h-[320px] md:min-h-[480px] lg:min-h-[620px] transition-all duration-500 ease-in-out"
            }}
          >
            <source src="/assets/video/jumbotron-video.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </VideoPlayer>

          <div className="flex justify-between flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-0">
            <div>
              <Title>Top du jour</Title>
            </div>
            <div className=" max-w-md flex flex-col gap-4 items-center lg:items-start">
              <p className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular text-center lg:text-left">
                Synapse est une base informationnelle, économique, politique,
                sociale et citoyenne dédiée aux Outre-Mer
              </p>
              <Button className="w-max">
                <Link href="/database">Accéder</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Boolean(articles?.length) && !isLoading ? (
            <>
              {articles?.slice(0, 3).map((news, index) => (
                <NewsCard
                  key={index}
                  category={news?.category || "No category"}
                  date={
                    news?.createdAt
                      ? format(news?.createdAt.toDate(), "MMM dd, yyyy")
                      : "Unknown date"
                  }
                  slug={news.slug}
                  title={news?.title}
                  image={news?.coverImage || ""}
                />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
