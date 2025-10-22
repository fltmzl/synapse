import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowRightIcon, Link } from "lucide-react";
import Image from "next/image";
import NewsCard from "../components/card/news-card";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import SectionTitle from "@/components/typography/section-title";
import { H2 } from "@/components/typography/h2";
import { H1 } from "@/components/typography/h1";
import { H0 } from "@/components/typography/h0";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";

const newsData = [
  {
    category: "Legislation",
    date: "Sep 2, 2025",
    title:
      "New labor law reform enhances worker protections in French Territories.",
    image: "/images/prod-1.png"
  },
  {
    category: "Tax Policy",
    date: "Aug 29, 2025",
    title:
      "Corporate tax adjustments for SMEs operating in Réunion and Mayotte",
    image: "/images/prod-2.png"
  },
  {
    category: "Judicial",
    date: "Aug 25, 2025",
    title: "Constitutional review on overseas ownership disputes continues",
    image: "/images/prod-1.png"
  },
  {
    category: "Judicial",
    date: "Aug 25, 2025",
    title: "Constitutional review on overseas ownership disputes continues",
    image: "/images/prod-2.png"
  }
];
export default function LatestProductions({
  category,
  date,
  title,
  image
}: NewsItem) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  /** ===== Scroll Helpers ===== */
  const scroll = (
    dir: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const el = ref.current;
    if (!el) return;
    const scrollWidth = el.clientWidth;
    const scrollAmount = dir === "left" ? -scrollWidth : scrollWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  /** ===== Dynamic dots count ===== */
  useEffect(() => {
    const updateDots = () => {
      const isMobile = window.innerWidth < 768;
      const el = isMobile ? mobileRef.current : desktopRef.current;
      if (!el) return;

      const cardWidth = el.querySelector("div > div")?.clientWidth || 300;
      const visibleCards = Math.floor(el.clientWidth / cardWidth) || 1;
      const totalPages = Math.ceil(newsData.length / visibleCards);
      setDotCount(totalPages);
    };

    updateDots();
    window.addEventListener("resize", updateDots);
    return () => window.removeEventListener("resize", updateDots);
  }, []);

  /** ===== Track scroll to update active dot ===== */
  useEffect(() => {
    const handleScroll = (el: HTMLDivElement) => {
      const totalWidth = el.scrollWidth - el.clientWidth;
      const scrollRatio = el.scrollLeft / totalWidth;
      const newIndex = Math.round(scrollRatio * (dotCount - 1));
      setActiveIndex(newIndex);
    };

    const mobileEl = mobileRef.current;
    const desktopEl = desktopRef.current;

    const onMobileScroll = () => mobileEl && handleScroll(mobileEl);
    const onDesktopScroll = () => desktopEl && handleScroll(desktopEl);

    if (mobileEl) mobileEl.addEventListener("scroll", onMobileScroll);
    if (desktopEl) desktopEl.addEventListener("scroll", onDesktopScroll);

    return () => {
      if (mobileEl) mobileEl.removeEventListener("scroll", onMobileScroll);
      if (desktopEl) desktopEl.removeEventListener("scroll", onDesktopScroll);
    };
  }, [dotCount]);

  return (
    <section className="w-full flex flex-row gap-16 px-6 lg:pl-25 py-12 lg:py-25 bg-[var(--section)]">
      <div className="w-full">
        <div className="md:hidden flex flex-col items-center text-center gap-10">
          <H0>Les dernières publications</H0>

          <div
            ref={mobileRef}
            className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            <div className="flex  ">
              {newsData.map((news, i) => (
                <Card
                  key={i}
                  className="gap-5 bg-transparent py-0 flex-none min-w-full max-w-full overflow-hidden border-none"
                >
                  <CardHeader className="p-0">
                    <div className="relative w-full h-[220px]">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="px-0 flex flex-col gap-5">
                    <div className="flex flex-col gap-2 text-left">
                      <div className="flex flex-row">
                        <H2 className="border-r pr-3">{news.category}</H2>
                        <H2 className="pl-3">{news.date}</H2>
                      </div>

                      <H1>{news.title}</H1>
                    </div>
                    <div className="flex items-center gap-1 text-md text-blue-600 hover:text-blue-700 font-medium">
                      View more <ArrowRight className="w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left", mobileRef)}
                className="rounded-full w-12 h-12 border"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right", mobileRef)}
                className="rounded-full w-12 h-12 border"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: dotCount }).map((_, i) => (
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
        </div>

        {/* ===== DESKTOP ===== */}
        <div className="hidden h-full md:flex items-start gap-10">
          <div className="flex flex-col justify-between h-full items-start w-full max-w-xs shrink-0">
            <h2 className="text-4xl font-semibold leading-tight ">
              Les dernières publications
            </h2>

            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("left", desktopRef)}
                  className="rounded-full w-12 h-12 border"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("right", desktopRef)}
                  className="rounded-full w-12 h-12 border"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {Array.from({ length: dotCount }).map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "h-2 rounded-full transition-all duration-300",
                      activeIndex === i
                        ? "bg-primary w-8"
                        : "bg-muted-foreground w-2"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            ref={desktopRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide w-full"
          >
            {newsData.map((news, i) => (
              <Card
                key={i}
                className="gap-5 py-0 bg-transparent max-w-sm border-none shrink-0 overflow-hidden snap-center"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-[200px] mb-0">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover rounded-lg "
                    />
                  </div>
                </CardHeader>
                <CardContent className="px-0 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                      <H2 className="border-r pr-3">{news.category}</H2>
                      <H2 className="pl-3">{news.date}</H2>
                    </div>

                    <H1>{news.title}</H1>
                  </div>
                  <div className="flex items-center gap-1 text-md text-blue-600 hover:text-blue-700 font-medium">
                    View more <ArrowRight className="w-5 h-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
