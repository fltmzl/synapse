import { useState } from "react";
import { socialPosts } from "@/data/news-data";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import SocialPostCard from "../card/social-news-card";
import SectionContainer from "@/components/container/section-container";
import SectionTitle from "@/components/typography/section-title";
import SearchSocialNetwork from "../components/search-social-news";

export default function SocialNetworkNews() {
  const [query, setQuery] = useState("");

  return (
    <SectionContainer className="px-4 py-5 lg:p-20 ">
      <div className="flex flex-col gap-6 lg:gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <SectionTitle className="text-center">
            Actualité citoyenne
          </SectionTitle>

          <div className="flex justify-center">
            <SearchSocialNetwork onSearch={setQuery} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {socialPosts.slice(0, 4).map((news, index, arr) => {
            const totalRows = Math.ceil(arr.length / 2);
            const currentRow = Math.floor(index / 2);
            const isFirstRow = currentRow === 0;
            const isLastRow = currentRow === totalRows - 1;

            const isFirstItemMobile = index === 0;
            const isLastItemMobile = index === arr.length - 1;

            return (
              <div
                key={index}
                className={clsx(
                  "border-border",
                  !isFirstItemMobile && "pt-8 border-t",
                  !isLastItemMobile && "pb-8",
                  "lg:border-none lg:pt-0 lg:pb-0",
                  isFirstRow && "lg:pb-8 lg:border-b lg:border-border",
                  !isFirstRow && "lg:pt-8",
                  isLastRow && "lg:border-none lg:pb-0",
                  index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                )}
              >
                <SocialPostCard {...news} />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 ">
          <Button variant="outline" size="md" className="w-full lg:w-max">
            Show More
            <ChevronDown className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
