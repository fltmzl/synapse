import PostList from "@/components/post-list";
import { Button } from "@/components/ui/button";
import { newsData } from "@/data/news-data";
import { ChevronDown } from "lucide-react";

export default function Opportunities() {
  return (
    <section className="bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-25">
        <div className="flex items-center flex-col">
          <h1 className="text-3xl lg:text-[40px] font-medium leading-[110%] tracking-[-0.03em] mb-4 text-center">
Opportunités          </h1>
          <p className="text-lg text-center leading-[150%] tracking-[-0.01em] text-muted-foreground">
            Reprise d&apos;entreprises
          </p>
        </div>
        <PostList data={newsData} variant="opportunity" />

    
        <div className="flex justify-center gap-3 pt-8 lg:pt-16 ">
          <Button
            variant="outline"
            size="default"
            className="text-base leading-[130%] tracking-[-0.02em] px-5 py-[10px] w-max"
          >
Plus d&apos;articles
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </section>
  );
}
