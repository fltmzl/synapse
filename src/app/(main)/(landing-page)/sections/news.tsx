import { H2 } from "@/components/typography/h2";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { newsData } from "@/data/news-data";
import NewsCard from "../components/card/news-card";

export default function NewsSection() {
  return (
    <section className="w-full flex flex-col gap-10 lg:gap-16 pt-0 pb-12 lg:pb-25 px-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="w-full relativ flex flex-col gap-8">
        <div className="bg-emerald-950 w-full h-[620px] rounded-lg"></div>

        <div className="flex justify-between flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-0">
          <div>
            <Title>Top du jour</Title>
          </div>
          <div className=" max-w-md flex flex-col gap-4 items-center lg:items-start">
            <p className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular text-center lg:text-left">
              Synapse est une base informationnelle, économique, politique,
              sociale et citoyenne dédiée aux Outre-Mer
            </p>
            <Button className="w-max" size={"default"}>
              Accéder
            </Button>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {newsData.slice(0, 3).map((news, index) => (
          <NewsCard
            key={index}
            category={news.category}
            date={news.date}
            title={news.title}
            image={news.image}
          />
        ))}
      </div>
    </section>
  );
}
