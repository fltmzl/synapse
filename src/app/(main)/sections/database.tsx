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
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Title */}
      <h2 className="text-center text-2xl font-semibold mb-8">Database</h2>

      {/* Card */}
      <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tabs & Year Selector */}
          <div className="flex items-center justify-between mb-8">
            <NewsTabsHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Year</span>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[100px]">
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

          {/* Tab Content */}
          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Map */}
              <div className="flex justify-center">
                <Image
                  src="/images/map-placeholder.png"
                  alt={`Map of ${activeTab}`}
                  width={260}
                  height={220}
                  className="object-contain"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {stats.map((item, i) => (
                  <div key={i}>
                    <p className="text-xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-10">
              <Button variant="outline" className="text-sm">
                Download slide
              </Button>
              <button className="text-blue-700 text-sm font-medium flex items-center gap-1">
                More about {activeTab} →
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
