"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NewsTabsHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabs: string[];
}

export default function NewsTabsHeader({
  activeTab,
  setActiveTab,
  tabs
}: NewsTabsHeaderProps) {
  return (
    <TabsList className="flex  justify-start gap-3  border-gray-200 bg-transparent rounded-none ">
      {tabs.map((key) => (
        <TabsTrigger
          key={key}
          value={key}
          onClick={() => setActiveTab(key)}
          className={cn(
            "relative text-base font-medium px-6 py-4 text-gray-600 data-[state=active]:text-blue-700 transition",
            "after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full after:bg-blue-700 after:scale-x-0 data-[state=active]:after:scale-x-100 after:origin-left after:transition-transform"
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
