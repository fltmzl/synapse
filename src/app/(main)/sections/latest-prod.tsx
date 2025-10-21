import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowRightIcon, Link } from "lucide-react";
import Image from "next/image";
import NewsCard from "../components/card/news-card";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import SectionTitle from "@/components/typography/section-title";

const newsData = [
  {
    category: "Legislation",
    date: "Sep 2, 2025",
    title:
      "New labor law reform enhances worker protections in French Territories.",
    image: "/images/news-1.png"
  },
  {
    category: "Tax Policy",
    date: "Aug 29, 2025",
    title:
      "Corporate tax adjustments for SMEs operating in Réunion and Mayotte",
    image: "/images/news-2.png"
  },
  {
    category: "Judicial",
    date: "Aug 25, 2025",
    title: "Constitutional review on overseas ownership disputes continues",
    image: "/images/news-3.png"
  },
  {
    category: "Judicial",
    date: "Aug 25, 2025",
    title: "Constitutional review on overseas ownership disputes continues",
    image: "/images/news-3.png"
  }
];
export default function LatestProductions({
  category,
  date,
  title,
  image
}: NewsItem) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const scrollMobile = (dir: "left" | "right") => {
    if (!mobileRef.current) return;
    const width = mobileRef.current.clientWidth;
    const newIndex = Math.max(
      0,
      Math.min(newsData.length - 1, activeIndex + (dir === "right" ? 1 : -1))
    );
    mobileRef.current.scrollTo({ left: width * newIndex, behavior: "smooth" });
    setActiveIndex(newIndex);
  };

  const scrollDesktop = (dir: "left" | "right") => {
    if (!desktopRef.current) return;
    const width = 340; // approximate card width + gap
    desktopRef.current.scrollBy({
      left: dir === "right" ? width : -width,
      behavior: "smooth"
    });
  };

  return (
    <section className="w-full flex flex-row gap-16 py-25 bg-muted ">
      <div className=" w-full pl-25">
        {/* MOBILE: 1 card per view */}
        <div className="md:hidden flex flex-col items-center text-center">
          <SectionTitle> Les dernières publications</SectionTitle>

          <div
            ref={mobileRef}
            className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-6 px-4">
              {newsData.map((news, i) => (
                <Card
                  key={i}
                  className="snap-center flex-none min-w-full max-w-full mx-auto border-0 shadow-none rounded-xl overflow-hidden"
                >
                  <CardHeader className="p-0">
                    <div className="relative w-full h-[220px]">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="pt-5 pb-6 flex flex-col gap-3">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <span className="border-r border-gray-300 pr-3">
                        {news.category}
                      </span>
                      <span className="pl-3">{news.date}</span>
                    </div>

                    <p className="text-[15px] font-medium leading-snug tracking-[-0.02em] text-gray-900 px-1">
                      {news.title}
                    </p>

                    <Link
                      href="#"
                      className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollMobile("left")}
              className="rounded-full w-9 h-9 "
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollMobile("right")}
              className="rounded-full w-9 h-9 "
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {newsData.map((_, i) => (
              <span
                key={i}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i ? "bg-blue-600 w-6" : "bg-gray-300 w-2"
                )}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP: multiple cards visible */}
        <div className=" md:flex items-start gap-10 ">
          <div className="flex flex-col justify-between h-full items-start w-full max-w-xs shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollDesktop("left")}
                className="rounded-full w-12 h-12 border-primary/20 "
              >
                <ArrowLeft className="text-foreground/80 " />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollDesktop("right")}
                className="rounded-full w-12 h-12 border-primary/20 border"
              >
                <ArrowRight className="text-foreground/80 " />
              </Button>
            </div>
          </div>

          <div
            ref={desktopRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide  w-full"
          >
            {newsData.map((news, i) => (
              <Card
                key={i}
                className="w-[320px] border-none shrink-0 py-0 overflow-hidden"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover  rounded-xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="pt-5 pb-6 flex flex-col gap-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="border-r border-gray-300 pr-3">
                      {news.category}
                    </span>
                    <span className="pl-3">{news.date}</span>
                  </div>

                  <h3 className="text-[15px] font-medium leading-snug tracking-[-0.02em] text-gray-900">
                    {news.title}
                  </h3>

                  <Link
                    href="#"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View more <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
