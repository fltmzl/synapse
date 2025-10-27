"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SidebarFilters from "@/components/filter-multiple-without-search";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
} from "nuqs";

export default function AnswerPersonality() {
  const [sortBy, setSortBy] = useState<string>("Relevant");

  // three independent query params (nuqs)
  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [role, setRole] = useQueryState(
    "role",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [popularity, setPopularity] = useQueryState(
    "popularity",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // sample data
  const people = [
    {
      name: "Marie Claire",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar1.jpg",
    },
    {
      name: "Marie Dubois",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar2.jpg",
    },
  ];

  const filters = {
    territory: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "French Guiana", value: "French Guiana" },
    ],
    role: [
      { label: "Government", value: "Government" },
      { label: "Business Leaders", value: "Business Leaders" },
    ],
    popularity: [
      { label: "Most searched", value: "Most searched" },
      { label: "Trending", value: "Trending" },
    ],
  };

  // flatten active values for Active Filters UI
  const activeValues = [
    ...(territory ?? []),
    ...(role ?? []),
    ...(popularity ?? []),
  ];

  // helper to remove single value from the correct query param
  const removeActiveValue = (val: string) => {
    if ((territory ?? []).includes(val)) {
      setTerritory((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
    if ((role ?? []).includes(val)) {
      setRole((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
    if ((popularity ?? []).includes(val)) {
      setPopularity((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
  };

  // clear all — set to null to remove query params entirely
  const clearAll = () => {
    setTerritory(null);
    setRole(null);
    setPopularity(null);
  };

  return (
    <section className="py-12 px-4 lg:px-20 bg-background">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Filter by</h3>

            {/* NOTE: SidebarFilters displays its own section title; we keep as-is */}
            <SidebarFilters
              groups={{ territory: filters.territory }}
              value={territory ?? []}
              setValue={setTerritory}
            />

            <SidebarFilters
              groups={{ role: filters.role }}
              value={role ?? []}
              setValue={setRole}
            />

            <SidebarFilters
              groups={{ popularity: filters.popularity }}
              value={popularity ?? []}
              setValue={setPopularity}
            />
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1">
          {/* header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-2">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{people.length}</strong> results for <strong>"Marie"</strong>
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(String(v))}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Relevant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Relevant">Relevant</SelectItem>
                  <SelectItem value="Newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters */}
          {activeValues.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {activeValues.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  <span>{f}</span>
                  <button
                    aria-label={`Remove ${f}`}
                    onClick={() => removeActiveValue(f)}
                    className="p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              <button
                className="text-sm text-primary underline ml-2"
                onClick={clearAll}
              >
                Clear filter
              </button>
            </div>
          )}

          {/* list */}
          <div className="space-y-6 divide-y">
            {people.map((p, i) => (
              <article key={i} className="flex justify-between items-center pt-6">
                <div className="flex gap-4 items-center">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.title}</p>
                    <div className="flex gap-6 mt-1 text-xs text-muted-foreground">
                      <div><span className="font-medium">Affiliation:</span> {p.affiliation}</div>
                      <div><span className="font-medium">Territory:</span> {p.territory}</div>
                      <div><span className="font-medium">Category:</span> {p.category}</div>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" className="text-primary text-sm px-2">
                  View profile →
                </Button>
              </article>
            ))}
          </div>

          {/* pagination */}
          <div className="flex justify-between border-t pt-6 text-sm text-muted-foreground mt-6">
            <p>Showing 1–{people.length} of 257 results</p>
            <div className="flex gap-2">
              <PageBtn icon={<ChevronLeft className="h-4 w-4" />} />
              <PageBtn label="1" active />
              <PageBtn icon={<ChevronRight className="h-4 w-4" />} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

function PageBtn({ icon, label, active = false }: { icon?: React.ReactNode; label?: string; active?: boolean }) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="icon"
      className={active ? "bg-primary text-white w-8 h-8" : "w-8 h-8"}
    >
      {icon || label}
    </Button>
  );
}
