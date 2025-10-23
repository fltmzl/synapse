import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { databaseData } from "@/data/database-data";
import SectionTitle from "@/components/typography/section-title";
import TabsHeader from "@/components/tabs-header";
import { H2 } from "@/components/typography/h2";
import { DownloadIcon } from "@/icons/download-icon";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";

export default function DatabasePage() {
  const tabs = Object.keys(databaseData);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [year, setYear] = useState("2024");

  const currentData = databaseData[activeTab];

  return (
    <section className="bg-[var(--section)]">
      <div className="max-w-7xl mx-auto py-12 lg:py-25 w-full px-6 flex flex-col gap-10 lg:gap-16">
        <SectionTitle className="text-center">Les chiffres clés</SectionTitle>

        <div className="border px-6 py-4 lg:p-5 rounded-lg bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-wrap border-b items-center justify-between gap-4 lg:gap-0">
              <div className="overflow-x-auto overflow-y-hidden lg:overflow-hidden">
                <TabsHeader
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabs={tabs}
                />
              </div>

              <div className="flex items-center">
                <H2 className="text-muted-foreground pr-4">Année</H2>
                <div className="flex items-center border-l pl-4">
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

            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] w-full gap-6 lg:gap-0">
                {/* Map */}
                <div className="relative flex items-center justify-center w-full lg:max-w-sm lg:aspect-square">
                  {/* Map */}
                  <Image
                    src={currentData.image}
                    alt={`Map of ${activeTab}`}
                    width={350}
                    height={350}
                    className="object-contain"
                  />

                  {/* Titik + Tooltip */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Titik biru */}
                    <div className="relative flex flex-col items-center">
                      <div className="lg:w-5 lg:h-5 w-3 h-3 rounded-full bg-primary border-4" />{" "}
                      <div className="relative mt-2 bg-white shadow-md rounded-md px-4 py-2 text-center">
                        <p className="text-xs text-muted-foreground leading-tight">
                          The Islands of
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {activeTab}
                        </p>
                        <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2 h-2 rotate-45 bg-white border-l border-t border-gray-200" />{" "}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 lg:gap-x-10 lg:gap-y-16 lg:py-16 lg:pl-16 lg:pr-[6px]">
                    {currentData.stats.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <h1 className="text-lg lg:text-[28px] font-medium leading-[130%] tracking-[-0.02em]">
                          {item.value}
                        </h1>
                        <H2 className="text-muted-foreground">{item.label}</H2>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="w-full flex items-center flex-col lg:flex-row gap-2 lg:gap-0 justify-between pt-6 lg:py-6 lg:px-14">
                    <Button variant="outline" className=" w-full lg:w-max">
                      <DownloadIcon className="w-6 h-6" />
                      <span className="text-sm">Download slide</span>
                    </Button>
                    <button className="gap-2 text-primary text-sm font-medium leading-5 flex items-center py-[10px] px-4">
                      More about {activeTab}
                      <ArrowRightBoldIcon className="w-4 h-4 mt-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
