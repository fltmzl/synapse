"use client";

import { Button } from "@/components/ui/button";
import { FacebookIcon } from "@/icons/facebook-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LayoutGridIcon } from "@/icons/layout-grid-icon";
import { LinkedinOutlineIcon } from "@/icons/linkedin-outline-icon";
import { TwitterIcon } from "@/icons/twitter-icon";
import { cn } from "@/lib/utils";
import { Layout2Icon } from "@/icons/layout-2-icon";

const categories = [
  { label: "All", icon: <Layout2Icon /> },
  { label: "Instagram", icon: <InstagramIconFlat /> },
  { label: "Facebook", icon: <FacebookIcon /> },
  { label: "LinkedIn", icon: <LinkedinOutlineIcon /> },
  { label: "Twitter", icon: <TwitterIcon /> }
];

type Props = {
  selected: string;
  onSelect: (val: string) => void;
};

export default function PlatformFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
      {categories.map(({ label, icon }) => {
        const isActive = selected === label;

        return (
          <Button
            key={label}
            onClick={() => onSelect(label)}
            variant="ghost"
            className={cn(
              "hover:bg-transparent group flex items-center  rounded-md pl-4 pr-6 py-3 text-md font-medium border transition-all duration-200 leading-[140%] tracking-tighter gap-[10px]",
              {
                "border-primary  text-primary bg-background": isActive,
                "border-border text-foreground bg-background hover:border-primary hover:text-primary":
                  !isActive
              }
            )}
          >
            <span
              className={cn("text-muted-foreground group-hover:text-primary", {
                "text-primary leading-[140%] tracking-[0.01em]": isActive
              })}
            >
              {icon}
            </span>
            <span
              className={cn("text-foreground group-hover:text-primary", {
                "text-primary": isActive
              })}
            >
              {label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
