"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import NewsTabsHeader from "@/components/tabs-header";
import SectionTitle from "@/components/typography/section-title";
import { H2 } from "@/components/typography/h2";
import { ArrowRight, Download } from "lucide-react";

export default function DatabasePage() {
  const tabs = ["Guadeloupe", "Martinique", "Guyane", "Réunion", "Mayotte"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [year, setYear] = useState("2024");

  const stats = [
    { value: "12%", label: "Unemployment Rate" },
    { value: "1,452", label: "Registered Companies" },
    { value: "40,000", label: "Population in Workforce" },
    { value: "€1,115", label: "Average Monthly Income" },
    { value: "5%", label: "GDP Growth Rate" },
    { value: "€2.4B", label: "Export Value" }
  ];

  return (
    <section className="max-w-7xl mx-auto py-25 w-full px-6 flex flex-col gap-16 bg-muted">
      {/* Title */}
      <SectionTitle className="text-center">Database</SectionTitle>

      {/* Card */}
      <div className="border p-5 border-muted rounded-lg bg-white ">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tabs & Year Selector */}
          <div className="flex flex-wrap border-b items-center justify-between  gap-4 lg:gap-0">
            <div className="overflow-x-auto overflow-y-hidden lg:overflow-hidden">
              <NewsTabsHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
              />
            </div>
            <div className="flex items-center ">
              <span className="text-sm text-muted-foreground pr-4">Année</span>
              <div className="flex items-center border-l border-muted-foreground pl-4">
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="2024" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10 w-full">
              {/* Map */}
              <div className=" relative w-full max-w-sm aspect-square flex items-center justify-center">
                <Image
                  src="/images/maps.png"
                  alt={`Map of ${activeTab}`}
                  fill
                  className="object-contain"
                />
                <div className="absolute top-[38%] left-[49%] flex flex-col items-center">
                  {/* Blue dot */}
                  <div className="w-3 h-3 rounded-full bg-blue-600 border-4 border-white shadow-md" />

                  {/* Tooltip */}
                  <div className="relative mt-2 bg-white shadow-md rounded-md px-4 py-2 text-center">
                    <p className="text-sm text-gray-500 leading-tight">
                      The Islands of
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {activeTab}
                    </p>

                    {/* Segitiga bawah */}
                    <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2 h-2 rotate-45 bg-white border-l border-t border-gray-200"></div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[64px] lg:p-16">
                  {stats.map((item, i) => (
                    <div key={i}>
                      <h1 className="text-[28px] font-medium leading-[130%] tracking-[-0.02em]">
                        {item.value}
                      </h1>
                      <H2 className="text-muted-foreground">{item.label}</H2>
                    </div>
                  ))}
                </div>
                {/* Buttons */}
                <div className="flex items-center flex-col lg:flex-row gap-2 lg:gap-0 justify-between py-6 px-14">
                  <Button variant="outline" className="text-sm">
                    <Download /> Download slide
                  </Button>
                  <button className="text-blue-700 text-sm font-medium flex items-center py-[10px] px-4">
                    More about {activeTab} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
