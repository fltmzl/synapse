"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { H2 } from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import TabsHeader from "@/components/tabs-header";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { DownloadIcon } from "@/icons/download-icon";
import Image from "next/image";
import { databaseData } from "@/data/database-data";
import Link from "next/link";

export default function DatabaseMaps({
  showMoreBtn = true,
}: {
  showMoreBtn?: boolean;
}) {
  const tabs = databaseData.map((data) => data.title);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [year, setYear] = useState("2024");

  const currentData = databaseData.find((data) => data.title === activeTab);

  return (
    <Card className="border px-6 py-4 lg:p-5 rounded-lg bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* HEADER */}
        <div className="flex flex-wrap border-b items-center justify-between gap-4 lg:gap-0">
          <div className="overflow-x-auto overflow-y-hidden lg:overflow-hidden">
            <TabsHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
            />
          </div>

          <div className="flex items-center divide-x">
            <H2 className="text-muted-foreground pr-4">Année</H2>
            <div className="flex items-center pl-1">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="border-none text-foreground font-medium text-base leading-6 tracking-[-0.02em]">
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

        {/* CONTENT */}
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] w-full gap-6 lg:gap-16">
            {/* Map */}
            <div className="relative flex items-center justify-center w-full lg:aspect-square">
              <Image
                src={currentData?.image || ""}
                alt={`Map of ${activeTab}`}
                width={350}
                height={350}
                className="object-contain"
              />

              {/* Dot + Tooltip */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <div className="lg:w-5 lg:h-5 w-3 h-3 rounded-full bg-primary border-4" />
                  <div className="relative mt-2 bg-background shadow-md rounded-md px-4 py-2 text-center">
                    <p className="text-xs text-muted-foreground leading-tight">
                      The Islands of
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {activeTab}
                    </p>
                    <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2 h-2 rotate-45 bg-background border-l border-t border-border" />
                  </div>
                </div>
              </div> */}
            </div>

            {/* Stats */}
            <div className="flex flex-col justify-end gap-6 lg:gap-16">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 lg:gap-x-10 lg:gap-y-16">
                {currentData?.stats.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <h6 className="text-lg lg:text-[28px] font-medium leading-[130%] tracking-[-0.02em]">
                      {item.value}
                    </h6>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="w-full flex items-center flex-col lg:flex-row gap-2 lg:gap-0 justify-between lg:py-6">
                <Button variant="outline" className=" w-full lg:w-max">
                  <DownloadIcon className="w-6 h-6" />
                  <span className="text-sm">Download slide</span>
                </Button>
                <button className="gap-2 text-primary text-sm font-medium leading-5 flex items-center py-[10px] px-4">
                  {showMoreBtn && (
                <Link
                  href="/database"
                  className="gap-2 text-primary text-sm font-medium leading-5 flex items-center py-[10px] px-4"
                >
                  Plus d&apos;informations
                  <ArrowRightBoldIcon className="w-4 h-4 mt-0.5" />
                </Link>
              )}
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
