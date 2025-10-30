"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/container/section-container";
import { newsData } from "@/data/news-data";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import Link from "next/link";
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
    <SectionContainer className="lg:pt-10 lg:pb-16  py-8 flex justify-center ">
      <article className="w-full flex flex-col gap-10 px-6 max-w-7xl mx-auto">
        <div className=" py-0 lg:px-10">
          <header className="flex flex-col gap-6 lg:gap-8 text-left py-0 px-0 lg:pt-16 pb-6 lg:pb-10 lg:px-[140px]">
            <h1 className="text-2xl lg:text-[40px] font-medium leading-[110%] tracking-[-0.03em]">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <p className="text-lg font-regular leading-[140%]">
                {article.author}
              </p>

              {/* Garis pemisah */}
              <span className="w-px h-5 bg-muted-foreground/30" />

              <p className="text-lg font-regular leading-[140%]">
                {article.date}
              </p>
            </div>
          </header>

          {/* Hero Image with arrows */}
          <div className="relative w-full flex flex-col gap-4">
            {/* Gambar utama */}
            <div className="relative w-full h-[200px] lg:h-[600px] overflow-hidden rounded-md">
              <Image
                src={article.images[activeImage]}
                alt={article.title}
                fill
                className="object-cover transition-all duration-500"
                priority
              />

              {/* Navigasi kiri-kanan (overlay di atas gambar) */}
              {article.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-3 lg:left-5 -translate-y-1/2 text-background hover:text-primary bg-primary hover:bg-background hover:border-primary rounded-full p-2 shadow-md transition"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-3 lg:right-5 -translate-y-1/2 text-background hover:text-primary bg-primary hover:bg-background hover:border-primary rounded-full p-2 shadow-md transition"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail carousel */}
            {article.images.length > 1 && (
              <div className="flex gap-2 lg:gap-4 overflow-x-auto hide-scrollbar">
                {article.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "relative rounded-md overflow-hidden border transition flex-shrink-0",
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted"
                    )}
                  >
                    <div className="relative w-[96px] h-[64px] lg:w-[128px] lg:h-[83px]">
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover rounded-lg p-1 "
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-none shadow-none lg:px-[180px] flex flex-col gap-8">
          {/* Konten artikel pakai prose */}
          <article
            className={cn(
              "prose prose-neutral dark:prose-invert max-w-none",
              "prose-headings:leading-[110%] prose-headings:tracking-[-0.03em] prose-headings:font-medium prose-headings:mb-4",
              "prose-h1:text-2xl prose-h1:lg:text-[40px]",
              "prose-h2:text-2xl prose-headings:mt-4",
              "prose-h3:text-xl",
              "prose-h4:text-lg",
              "prose-h5:text-base",
              "prose-h6:text-sm"
            )}
            // prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-li:marker:text-muted-foreground

            // text-2xl lg:text-[40px] font-medium leading-[110%] tracking-[-0.03em]
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Bagian share button */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-lg leading-[140%]">Share</span>
            <div className="flex gap-2">
              {(() => {
                const encodedUrl = encodeURIComponent(
                  typeof window !== "undefined"
                    ? window.location.href
                    : "https://example.com"
                );
                const encodedTitle = encodeURIComponent(article.title);

                const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                const instagramShare = `https://www.instagram.com/?url=${encodedUrl}`; // Instagram belum punya direct share resmi

                return (
                  <>
                    {/* Facebook */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full w-[42px] h-[42px]"
                      asChild
                    >
                      <Link
                        href={facebookShare}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookFillIcon className="size-[18px]" />
                      </Link>
                    </Button>

                    {/* Instagram */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full w-[42px] h-[42px]"
                      asChild
                    >
                      <Link
                        href={instagramShare}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InstagramIconFlat className="size-[18px]" />
                      </Link>
                    </Button>

                    {/* LinkedIn */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full w-[42px] h-[42px]"
                      asChild
                    >
                      <Link
                        href={linkedinShare}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIconFlat className="size-[18px]" />
                      </Link>
                    </Button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
