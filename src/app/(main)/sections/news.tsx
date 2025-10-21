import { H2 } from "@/components/typography/h2";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import NewsCard from "../components/card/news-card";

const newsData: NewsItem[] = [
  {
    category: "Economy",
    date: "Sep 2, 2025",
    title: "Guadeloupe unemployment drops to 12% in Q3 2025",
    image: "/images/news-1.png"
  },
  {
    category: "Investment",
    date: "Aug 29, 2025",
    title: "Martinique SMEs secure €15M funding for green transition projects",
    image: "/images/news-2.png"
  },
  {
    category: "Trade",
    date: "Aug 25, 2025",
    title:
      "Mayotte reports 5% increase in export activities for first half of 2025",
    image: "/images/news-3.png"
  }
];

export default function NewsSection() {
  return (
    <section className="w-full flex flex-col gap-10 lg:gap-16 pt-0 pb-25 px-6 lg:px-0 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="w-full relativ flex flex-col gap-8">
        <div className="bg-emerald-950 w-full h-[620px] rounded-lg"></div>

        <div className="flex justify-between flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-0">
          <div>
            <Title>Top du jour</Title>
          </div>
          <div className=" max-w-md flex flex-col gap-4 items-center lg:items-start">
            <H2 className="text-center lg:text-left">
              Synapse est une base informationnelle, économique, politique,
              sociale et citoyenne dédiée aux Outre-Mer
            </H2>
            <Button className="w-max"> Accéder</Button>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {newsData.map((news, index) => (
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
