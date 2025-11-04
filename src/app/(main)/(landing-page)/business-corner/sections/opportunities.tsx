import { H4 } from "@/components/typography/h4";
import { Button } from "@/components/ui/button";
import { businessPosts } from "@/data/business-data";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Opportunities() {
  return (
    <section className="bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-25">
        <div className="flex items-center flex-col">
          <h1 className="text-3xl lg:text-[40px] font-medium leading-[110%] tracking-[-0.03em] mb-4 text-center">
            Opportunities
          </h1>
          <p className="text-lg text-center leading-[150%] tracking-[-0.01em] text-muted-foreground">
            Reprise d&apos;entreprises
          </p>
        </div>
        <div className="flex flex-col">
          {businessPosts.slice(0, 5).map((post, i) => (
            <Link href="#" className="block group" key={post.title + i}>
              <article
                className={`flex gap-5 lg:gap-6 lg:items-center lg:flex-row flex-col pt-8 ${
                  i !== businessPosts.slice(0, 5).length - 1
                    ? "border-b pb-8"
                    : ""
                }`}
              >
                <div className="relative w-full flex-shrink-0 h-[200px] lg:w-[240px] lg:h-[150px] rounded-md">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover rounded-[4px] "
                    priority
                  />
                  <button className="absolute top-3 right-3 rounded-full w-10 h-10 border bg-white/80 backdrop-blur-md border-gray-300 group-hover:border-primary grid place-content-center lg:hidden">
                    <ArrowUpRightIcon className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="flex flex-col gap-2  w-full">
                  <span className="text-base tracking-[-0.01em] leading-[150%] text-muted-foreground font-regular">
                    {post.date}
                  </span>

                  <H4 className="leading-[140%] tracking-[-0.02em] group-hover:text-primary">
                    {post.title}
                  </H4>
                  <p className="line-clamp-2 text-base tracking-[-0.01em] leading-[150%] text-muted-foreground">
                    {post.desc}
                  </p>
                </div>
                <div className="hidden lg:flex items-center">
                  <button className="group-hover:border-primary rounded-full w-12 h-12 border  grid place-content-center ">
                    <ArrowUpRightIcon className="w-6 h-6" />
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-3 pt-8 lg:pt-16 ">
          <Button
            variant="outline"
            size="default"
            className="text-base leading-[130%] tracking-[-0.02em] px-5 py-[10px] w-max"
          >
            More articles
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </section>
  );
}
