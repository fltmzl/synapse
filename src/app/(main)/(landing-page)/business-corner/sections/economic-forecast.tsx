"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronDown, ChevronDownIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { economicForecasts } from "@/data/business-data";
import { useEffect, useState } from "react";

export default function EconomicForecastsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedForecasts = isMobile
    ? economicForecasts.slice(0, 3)
    : economicForecasts.slice(0, 6);
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-25 flex flex-col">
      <div className="text-left pb-8 lg:pb-16">
        <h1 className="text-3xl lg:text-[40px] font-medium tracking-[-0.02em] leading-[110%] mb-4">
          Prévisions économiques
        </h1>
        <p className="text-muted-foreground text-lg">
          Projection et analyse du contexte économique
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {displayedForecasts.map((item, index) => (
          <Card
            key={item.title + index}
            className="overflow-hidden group transition-shadow hover:shadow-xs rounded-[12px] p-3 lg:p-4"
          >
            <CardContent className="flex flex-col gap-4 px-0">
              <div className="flex flex-col gap-4 lg:gap-6">
                <h2 className="font-medium text-xl tracking-[-0.02em] leading-[130%] group-hover:text-primary">
                  {item.title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-sm leading-[140%] tracking-[-0.01em] text-muted-foreground">
                    {item.date}
                  </span>

                  <div className="mt-2">
                    <Link
                      href="#"
                      className="text-primary text-sm font-medium inline-flex items-center gap-1 leading-[14px] tracking-[-0.01em] group-hover:underline"
                    >
                      View document{" "}
                      <ArrowUpRightIcon className="w-[18px] h-[18px]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[195px] lg:h-[220px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-[6px]"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6 lg:pt-14">
        <Button variant="outline" className="w-max px-6">
          Plus de contenus
          <ChevronDown className="size-5 text-foreground" />
        </Button>
      </div>
    </section>
  );
}
