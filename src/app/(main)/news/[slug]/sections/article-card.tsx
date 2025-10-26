"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/container/section-container";
import { newsData } from "@/data/news-data";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import Link from "next/link";
import { FacebookIcon } from "@/icons/facebook-icon";
import { InstagramIcon } from "@/icons/instagram-icon";
import { LinkedinFillICon } from "@/icons/linkedin-fill-icon";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import { cn } from "@/lib/utils";

export default function ArticleContent() {
  const { slug } = useParams(); // ambil slug dari URL
  const article = newsData.find((item) => item.slug === slug);

  const [activeImage, setActiveImage] = useState(0);

  if (!article) {
    return (
      <SectionContainer className="py-20 text-center text-muted-foreground">
        Article not found.
      </SectionContainer>
    );
  }

  const prevImage = () =>
    setActiveImage((prev) =>
      prev === 0 ? article.images.length - 1 : prev - 1
    );

  const nextImage = () =>
    setActiveImage((prev) =>
      prev === article.images.length - 1 ? 0 : prev + 1
    );

  return (
    <SectionContainer className="px-4 py-8 lg:px-16 lg:py-10 flex justify-center ">
      <article className="w-full flex flex-col gap-10  ">
        <div className=" py-0 lg:px-10">
          <header className="flex flex-col gap-6 lg:gap-8 text-left py-0 px-0 lg:pt-16 pb-6 lg:pb-10 lg:px-[140px]">
            <h1 className="text-2xl lg:text-[40px] font-medium leading-[140%] tracking-[-0.02em] ">
              {article.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {article.author} · {article.date}
            </p>
          </header>

          {/* Hero Image with arrows */}
          <div className="relative w-full flex flex-col gap-4">
            {/* Gambar utama */}
            <div className="overflow-hidden w-full py-0">
              <Image
                src={article.images[activeImage]}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover rounded-md transition-all duration-500"
              />
            </div>

            {/* Kalau jumlah gambar lebih dari 1 baru tampilkan navigasi */}
            {article.images.length > 1 && (
              <>
                {/* Tombol navigasi kiri-kanan */}
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-5 -translate-y-1/2 text-background hover:text-primary bg-primary hover:bg-background hover:border-primary rounded-full p-2 shadow-md transition"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-background hover:text-primary bg-primary hover:bg-background hover:border-primary rounded-full p-2 shadow-md transition"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>

                {/* Thumbnail carousel */}
                <div className="flex gap-2 lg:gap-4">
                  {article.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "p-1 relative rounded-md overflow-x-auto hide-scrollbar border transition",
                        activeImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-muted"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={128}
                        height={83}
                        className="object-cover p-1 rounded-md"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="border-none shadow-none lg:px-[180px] flex flex-col gap-8">
          <div className="p-0 space-y-6 text-base leading-[150%] tracking-tighter text-foreground">
            {article.content.map((section, i) => {
              return (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {section.heading}
                    </h2>
                  )}

                  <p className=" text-muted-foreground">{section.text}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-lg font-regular leading-[140%] text-muted-foreground">
              Share
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Link href="#">
                  <FacebookFillIcon className="size-[18px]" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Link href="#">
                  <InstagramIconFlat className="size-[18px]" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Link href="#">
                  <LinkedinIconFlat className="size-[18px]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
