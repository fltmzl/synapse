"use client";

import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/icons/instagram-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LayoutGridIcon } from "@/icons/layout-grid-icon";
import { FacebookIcon } from "@/icons/facebook-icon";
import { TwitterIcon } from "@/icons/twitter-icon";
import { LinkedinOutlineIcon } from "@/icons/linkedin-outline-icon";

const categories = [
  { label: "All", icon: <LayoutGridIcon /> },
  { label: "Instagram", icon: <InstagramIconFlat /> },
  { label: "Facebook", icon: <FacebookIcon /> },
  { label: "LinkedIn", icon: <LinkedinOutlineIcon /> },
  { label: "Twitter", icon: <TwitterIcon /> }
];

interface Props {
  selected: string;
  onSelect: (val: string) => void;
}

export const PlatformFilter = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {categories.map(({ label, icon }) => {
        const isActive = selected === label;
        return (
          <Button
            key={label}
            onClick={() => onSelect(label)}
            variant="ghost"
            className={`
   hover:bg-transparent group flex items-center gap-2 rounded-md pl-4 pr-6 py-3 text-md font-medium 
    border transition-all duration-200 leading-[140%] tracking-tighter
    ${
      isActive
        ? "border-primary text-primary bg-background"
        : "border-border text-foreground bg-background hover:border-primary hover:text-primary"
    }
  `}
          >
            <span
              className={`${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            >
              {icon}
            </span>
            <span
              className={`${
                isActive
                  ? "text-primary"
                  : "text-foreground group-hover:text-primary"
              }`}
            >
              {label}
            </span>
          </Button>
        );
      })}
    </div>
  );
};
