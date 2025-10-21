"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function FindDataPage() {
  const [activeSource, setActiveSource] = useState("All");

  const sources = [
    "All",
    "Data",
    "Report",
    "Réseaux sociaux",
    "Media",
    "Legal"
  ];

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
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-2">Find Data & Insights</h2>
        <p className="text-gray-500">
          Use AI search to find data, reports, and more from trusted sources.
        </p>
      </div>

      {/* Search Container */}
      <div className="max-w-3xl mx-auto mb-14">
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6">
          {/* Source Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sources.map((src) => (
              <Button
                key={src}
                variant={activeSource === src ? "default" : "outline"}
                className={cn(
                  "rounded-full text-sm px-4 py-1.5",
                  activeSource === src
                    ? "bg-blue-600 text-white"
                    : "border-gray-300 text-gray-600 hover:border-blue-400"
                )}
                onClick={() => setActiveSource(src)}
              >
                {src}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="What information do you need today?"
              className="rounded-xl h-12 pl-5 pr-12 border-gray-300 focus-visible:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-14" />

      {/* Specific Info Section */}
      <div className="text-center mb-10">
        <h3 className="text-lg font-medium mb-6">
          Looking for specific information?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {infoOptions.map((opt) => (
            <Card
              key={opt.id}
              onClick={() => setActiveInfo(opt.id)}
              className={cn(
                "cursor-pointer w-full max-w-xs transition-all",
                activeInfo === opt.id
                  ? "border-blue-600 shadow-md"
                  : "hover:border-blue-300"
              )}
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
                    activeInfo === opt.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {opt.id === "person" && "👤"}
                  {opt.id === "company" && "🏢"}
                  {opt.id === "directory" && "📁"}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{opt.title}</h4>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
