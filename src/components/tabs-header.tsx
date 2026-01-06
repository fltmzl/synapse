"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Props = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabs: string[];
};

export default function TabsHeader({ activeTab, setActiveTab, tabs }: Props) {
  return (
    <TabsList className="flex  justify-start  rounded-none overflow-x-scroll hide-scrollbar w-full lg:w-max">
      {tabs.map((key) => (
        <TabsTrigger
          key={key}
          value={key}
          onClick={() => setActiveTab(key)}
          className={cn(
            "relative text-base font-medium px-8 py-4 leading-[130%] tracking-[-0.02em] transition"
            // "data-[state=active]:text-primary",
            // "after:absolute after:left-0 after:bottom-0 after:w-full after:bg-primary after:origin-left after:transition-all after:duration-300",
            // "after:h-[2px] after:scale-x-0",
            // "data-[state=active]:after:scale-x-100 data-[state=active]:after:h-[2px]"
          )}
        >
          {key === "citoyenne"
            ? "Citoyenne"
            : key.charAt(0).toUpperCase() + key.slice(1)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
