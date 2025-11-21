import { useState } from "react";
import { socialPosts } from "@/data/news-data";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import SocialPostCard from "../card/social-news-card";
import SectionContainer from "@/components/container/section-container";
import SectionTitle from "@/components/typography/section-title";
import SearchSocialNetwork from "../components/search-social-news";
import { cn } from "@/lib/utils";
import { SocialPost } from "@/types/news.type";

function chunkArray(arr: SocialPost[], size: number): SocialPost[][] {
  const result: SocialPost[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function SocialNetworkNews() {
  const [query, setQuery] = useState("");
  const rows = chunkArray(socialPosts, 2);

  return (
    <SectionContainer className="px-4 py-6 lg:p-20 ">
      <div className=" max-w-7xl mx-auto">
        <div className="flex flex-col lg:gap-16 ">
          <div className="flex flex-col gap-8">
            <SectionTitle className="text-center">
              Publications Synapse
            </SectionTitle>

            <div className="flex justify-center w-full">
              <SearchSocialNetwork onSearch={setQuery} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {rows.map((row, rowIndex) =>
              row.map((news, colIndex) => {
                const index = rowIndex * 2 + colIndex;
                const isLastItem = index === socialPosts.length - 1;
                const isFirstRow = rowIndex === 0;

                return (
                  <div
                    key={index}
                    className={cn(
                      // === MOBILE ===
                      index !== 0 && "border-t pt-6 lg:border-t-0 lg:pt-0",
                      isFirstRow && "pt-6 lg:pt-0",
                      !isLastItem && "pb-6 lg:pb-0",
                      // === DESKTOP ===
                      // Tambahkan border bawah antar row
                      rowIndex !== rows.length - 1 &&
                        "lg:border-b lg:border-border lg:pb-10",
                      // Tambahkan jarak atas untuk semua item di row kedua ke bawah
                      !isFirstRow && "lg:pt-8",
                      // Spasi horizontal antar kolom
                      colIndex === 0 ? "lg:pr-8" : "lg:pl-8"
                    )}
                  >
                    <SocialPostCard {...news} />
                  </div>
                );
              })
            )}
          </div>

          <div className="flex justify-center gap-3 ">
            <Button
              variant="outline"
              size="md"
              className="w-full lg:w-max text-sm font-medium leading[140%] tracking-tighter"
            >
              Plus de contenus
              <ChevronDown className="size-5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
