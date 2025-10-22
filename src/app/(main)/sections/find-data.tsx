"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, MoveUpRight, User, Landmark, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";
import { P } from "@/components/typography/paragraph";
import { infoOptions, sources } from "@/data/find-data";
import { Checkbox } from "@radix-ui/react-checkbox";
import { H2 } from "@/components/typography/h2";

export default function FindDataPage() {
  const [activeSource, setActiveSource] = useState("All");
  const [activeInfo, setActiveInfo] = useState("person");

  return (
    <section className="max-w-7xl mx-auto py-16 lg:py-25 w-full px-6 flex flex-col gap-10 lg:gap-16">
      {/* Header */}
      <div className="text-center flex flex-col gap-2">
        <SectionTitle>Accéder à la base</SectionTitle>
        <P className="lg:text-[18px] lg:leading-[140%] lg:tracking-[-0.01em]">
          Utiliser l'IA pour recherche une information, une donnée, un rapport
          ou une source de confiance
        </P>
      </div>

      <div className="w-full max-w-[58rem] mx-auto ">
        <div className="bg-[var(--section)] border rounded-[14px] p-2">
          {/* Source Filter */}
          <div className="flex gap-2 p-4 overflow-x-auto hide-scrollbar lg:overflow-x-hidden ">
            <h1 className="flex items-center justify-center text-muted-foreground">
              Source
            </h1>
            {sources.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant={activeSource === name ? "default" : "outline"}
                onClick={() => setActiveSource(name)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg text-sm px-3 py-2 transition-all text-foreground",
                  activeSource === name
                    ? "bg-primary/2 text-primary border border-primary hover:bg-transparent "
                    : "bg-background border text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <H2 className="text-primary">{name}</H2>
                <Checkbox
                
                  checked={activeSource === name}
                  onCheckedChange={() => setActiveSource(name)}
                  className={cn(
                    "ml-1 size-4 rounded-full border transition-all data-[state=checked]:text-white data-[state=checked]:border-primary",
                    activeSource === name
                      ? "border-primary bg-primary/10 "
                      : "border-gray-300 bg-transparent"
                  )}
                />
              </Button>
            ))}
          </div>
          {/* Search Input */}
          <div className="relative mt-4">
            <textarea
              placeholder="What information do you need today?"
              className="w-full h-28 resize-none rounded-xl border bg-white p-4 text-gray-700 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <Button
              type="button"
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
      </div>

     

      {/* Specific Info Section */}
      <div className="border-t pt-16 text-center flex flex-col gap-8 items-center">
        <H4>Le répertoire des territoires</H4>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setActiveInfo(opt.id)}
              className={cn(
                "cursor-pointer transition-all rounded-xl border",
                activeInfo === opt.id
                  ? "border-primary"
                  : "border-muted hover:border-primary"
              )}
            >
              <div className="p-5 flex flex-col justify-between h-full gap-6">
                {/* Icon + Arrow */}
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center",
                      activeInfo === opt.id
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {opt.id === "person" && <User className="w-4 h-4" />}
                    {opt.id === "company" && <Landmark className="w-4 h-4" />}
                    {opt.id === "directory" && <Building className="w-4 h-4" />}
                  </div>
                  <div
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-full border",
                      activeInfo === opt.id
                        ? "border-primary text-primary"
                        : "border-muted text-muted-foreground"
                    )}
                  >
                    <MoveUpRight size={16} />
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="font-medium text-foreground">{opt.title}</h4>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
