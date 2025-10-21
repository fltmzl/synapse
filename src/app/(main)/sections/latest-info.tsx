import NewsTabsHeader from "@/components/tabs-header";
import { H4 } from "@/components/typography/h4";
import SectionTitle from "@/components/typography/section-title";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import { useState } from "react";

type NewsItem = {
  title: string;
  description: string;
  date: string;
  image: string;
};

type CategoryNews = {
  [key: string]: NewsItem[];
};

const newsData: CategoryNews = {
  politique: [
    {
      title: "French Assembly debates overseas tax reform bill",
      description:
        "The French Assembly is debating a tax reform bill for overseas territories, aiming to adjust fiscal structures and revenue allocation to create fairer economic conditions.",
      date: "April 3, 2025",
      image: "/images/news-1.png"
    },
    {
      title: "French Senate reviews proposal on overseas economic autonomy",
      description:
        "The French Senate is reviewing a proposal to grant more autonomy to overseas territories, strengthening local governance and fiscal control.",
      date: "April 3, 2025",
      image: "/images/news-2.png"
    },
    {
      title:
        "Debate intensifies over representation of overseas territories in parliament",
      description:
        "A growing debate centers on how overseas territories are represented in parliament, with calls for stronger voices from these regions.",
      date: "April 3, 2025",
      image: "/images/news-3.png"
    }
  ],
  juridique: [
    {
      title: "New legislation enhances worker rights in overseas regions",
      description:
        "The new bill aims to standardize labor protections across all French territories, ensuring fair conditions for workers.",
      date: "March 20, 2025",
      image: "/images/news-2.png"
    },
    {
      title: "Court rules in favor of tax exemptions for SMEs",
      description:
        "A landmark court decision grants tax relief to small and medium enterprises operating in overseas French territories.",
      date: "March 18, 2025",
      image: "/images/news-3.png"
    },
    {
      title: "Legal experts call for unified judicial system",
      description:
        "Legal professionals are urging the government to streamline the judicial system across overseas territories for consistency.",
      date: "March 15, 2025",
      image: "/images/news-1.png"
    }
  ],
  citoyenne: [
    {
      title: "Youth programs foster innovation in overseas territories",
      description:
        "Social initiatives are helping young people develop digital skills and connect with global markets.",
      date: "Feb 28, 2025",
      image: "/images/news-3.png"
    },
    {
      title: "Community hubs expand in rural regions",
      description:
        "Local governments are opening new centers to strengthen social engagement and cultural identity.",
      date: "Feb 22, 2025",
      image: "/images/news-2.png"
    },
    {
      title: "Online platforms empower women entrepreneurs",
      description:
        "New digital tools are helping women from overseas territories launch and grow their own businesses.",
      date: "Feb 20, 2025",
      image: "/images/news-1.png"
    }
  ]
};

export default function LatestInfo() {
  const [activeTab, setActiveTab] = useState("politique");
  return (
    <section className="py-25 max-w-7xl mx-auto flex flex-col gap-16 justify-center items-center">
      <div>
        <SectionTitle>Actualité</SectionTitle>
      </div>
      <div className="max-w-7xl  mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
         <div className="border-b">
          <NewsTabsHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={Object.keys(newsData)}
          />
          </div>

          {/* Tabs Content */}
          {Object.entries(newsData).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="pt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-8 items-stretch">
                <div className="flex flex-col  justify-between h-full">
                  <div className="flex flex-col l gap-4">
                    <H4>{items[0].title}</H4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-8">
                      {items[0].description}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{items[0].date}</p>
                </div>

                {/* Big Image */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={items[0].image}
                    alt={items[0].title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Sub articles */}
                <div className="flex flex-col h-full divide-y divide-gray-200">
                  {items.slice(1).map((news, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="text-lg font-medium mb-2 tracking-[-0.02em] leading-snug ">
                        {news.title}
                      </h3>
                      <p className="line-clamp-2 mb-2 text-sm text-muted-foreground tracking-[-0.01em] leading-relaxed">
                        {news.description}
                      </p>
                      <span className="text-sm tracking-[-0.01em] leading-[140%] text-gray-400">
                        {news.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="w-full items-center justify-center flex">
        <Button variant={"outline"}>Find more articles</Button>
      </div>
    </section>
  );
}
