"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  BarChart,
  Building,
  FileText,
  Landmark,
  LayoutGrid,
  LucideIcon,
  MoveUpRight,
  Newspaper,
  PersonStanding,
  Scale,
  Search,
  User,
  Users
} from "lucide-react";
import SectionTitle from "@/components/typography/section-title";
import { H4 } from "@/components/typography/h4";

interface SourceItem {
  name: string;
  icon: LucideIcon;
}

const sources: SourceItem[] = [
  { name: "All", icon: LayoutGrid },
  { name: "Data", icon: BarChart },
  { name: "Rapport", icon: FileText },
  { name: "Réseaux sociaux", icon: Users },
  { name: "Media", icon: Newspaper },
  { name: "Légal", icon: Scale }
];
export default function FindDataPage() {
  const [activeSource, setActiveSource] = useState<string>("All");

  const infoOptions = [
    {
      id: "person",
      title: "Person information",
      desc: "Find details about an individual"
    },
    {
      id: "company",
      title: "Company/organization information",
      desc: "Find details for company or organization"
    },
    {
      id: "directory",
      title: "Directory administration",
      desc: "View directory records"
    }
  ];

  const [activeInfo, setActiveInfo] = useState("person");

  return (
    <section className="max-w-7xl mx-auto py-25 w-full px-6 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center flex flex-col gap-2">
        <SectionTitle>Accéder à la base</SectionTitle>
        <p className="text-lg text-muted-foreground">
Utiliser l'IA pour recherche une information, une donnée, un rapport ou une source de confiance        </p>
      </div>

      {/* Search Container */}
      <div className="w-max mx-auto ">
        <div className="bg-muted border border-muted-foreground rounded-[14px] p-2">
          {/* Source Filter */}
          <div className="flex gap-2 p-4 overflow-x-scroll lg:overflow-x-hidden ">
            <h1 className="flex items-center justify-center text-muted-foreground">
              Source
            </h1>
            {sources.map(({ name, icon: Icon }) => {
              const isActive = activeSource === name;
              return (
                <Button
                  key={name}
                  variant={activeSource === name ? "default" : "outline"}
                  onClick={() => setActiveSource(name)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg text-sm px-3 py-2 transition-all",
                    activeSource === name
                      ? "bg-blue-100 text-black"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {name}

                  <span
                    className={cn(
                      "ml-1 w-3 h-3 rounded-full border flex items-center justify-center transition-all",
                      isActive
                        ? "border-white bg-white/20"
                        : "border-gray-300 bg-transparent"
                    )}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-5xl mx-auto">
            <textarea
              placeholder="What information do you need today?"
              className="w-full h-28 resize-none rounded-xl border border-gray-200 bg-white p-4 text-gray-700 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <button
              type="button"
              className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm transition-all"
            >
              <ArrowUp size={24} />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-muted-foreground max-w-3xl flex items-center justify-center mx-auto w-full" />

      {/* Specific Info Section */}
      <div className="text-center justify-center items-center flex flex-col gap-8">
        <H4>Looking for specific information?</H4>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
  {infoOptions.map((opt) => (
    <Card
      key={opt.id}
      onClick={() => setActiveInfo(opt.id)}
      className={cn(
        "py-0 cursor-pointer transition-all rounded-xl border ",
        activeInfo === opt.id
          ? "border-blue-600"
          : "border-gray-200 hover:border-blue-300"
      )}
    >
      <CardContent className="p-6 gap-6 flex flex-col justify-between h-full">
        {/* Header (Icon + Arrow) */}
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center",
              activeInfo === opt.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
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
                ? "border-blue-600 text-blue-600"
                : "border-gray-200 text-gray-500"
            )}
          >
            <MoveUpRight size={16} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-left">
          <h4 className="font-medium text-gray-900">{opt.title}</h4>
          <p className="text-sm text-gray-500">{opt.desc}</p>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

      </div>
    </section>
  );
}
