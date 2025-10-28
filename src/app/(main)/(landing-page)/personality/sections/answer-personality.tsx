"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  Filter
} from "lucide-react";
import SidebarFilters from "@/components/filter-sidebar";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import SelectSingleItem from "@/components/select-single-item";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import Pagination from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function AnswerPersonality() {
  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [role, setRole] = useQueryState(
    "role",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("Newest")
  );

  const people = [
    {
      name: "Marie Claire",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar1.jpg"
    },
    {
      name: "Dubois Henri",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar2.jpg"
    },
    {
      name: "Marie Lefevre",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar3.jpg"
    },
    {
      name: "Marie Bernard",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar4.jpg"
    },
    {
      name: "Fontaine Lopez",
      title: "CEO, BlueWave Logistics",
      affiliation: "Regional Trade Association",
      territory: "Guadeloupe, France",
      category: "Government",
      image: "/images/avatar5.jpg"
    }
  ];

  const filters = {
    territory: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "French Guiana", value: "French Guiana" }
    ],
    role: [
      { label: "Government", value: "Government" },
      { label: "Business Leaders", value: "Business Leaders" }
    ],
    category: [
      { label: "Economy", value: "Economy" },
      { label: "Government", value: "Government" },
      { label: "Health", value: "Health" },
      { label: "Education", value: "Education" },
      { label: "Environment", value: "Environment" }
    ]
  };

  const sortBy = [
    { label: "Newest", value: "Newest" },
    { label: "Oldest", value: "Oldest" },
    { label: "Most Relevant", value: "Most Relevant" },
    { label: "Most Popular", value: "Most Popular" },
    { label: "Editors Pick", value: "Editors Pick" }
  ];

  const activeValues = [
    ...(territory ?? []),
    ...(role ?? []),
    ...(category ?? [])
  ];

  const removeActiveValue = (val: string) => {
    if ((territory ?? []).includes(val)) {
      setTerritory((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
    if ((role ?? []).includes(val)) {
      setRole((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
    if ((category ?? []).includes(val)) {
      setCategory((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
  };

  const clearAll = () => {
    setTerritory(null);
    setRole(null);
    setCategory(null);
  };

  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const paginatedPeople = people.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="bg-background">
      <div className="py-12 lg:py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SIDEBAR (desktop only) */}
          <aside className=" hidden lg:block w-[336px] flex-shrink-0 border rounded-[12px]">
            <h3 className="font-semibold text-2xl leading-[110%] tracking-[-0.02em] p-5 border-b">
              Filter by
            </h3>
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
              groups={{ category: filters.category }}
              value={category ?? []}
              setValue={setCategory}
            />
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-2">
              <div className="flex gap-1 items-center">
                <p className="text-base text-muted-foreground">
                  Showing {people.length} results for{" "}
                </p>
                <span className="text-base font-medium">&quot;Marie&quot;</span>
              </div>

              {/* Desktop sort */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-base font-medium text-foreground">
                  Sort by
                </span>
                <SelectSingleItem
                  listItems={sortBy}
                  selected={sort}
                  onChange={setSort}
                />
              </div>

              {/* Mobile icons */}
              <div className="flex lg:hidden items-center gap-2 ml-auto">
                {/* Sort button */}
                <Select onValueChange={setSort} defaultValue={sort}>
                  <SelectTrigger className="w-10 h-10 rounded-lg">
                    <SlidersHorizontal className="w-4 h-4" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortBy.map((sortOption) => (
                      <SelectItem
                        key={sortOption.value}
                        value={sortOption.value}
                      >
                        {sortOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Filter button (bottom sheet) */}
                <Drawer
                  open={openFilter}
                  onOpenChange={setOpenFilter}
                  shouldScaleBackground={false}
                >
                  {/* Trigger */}
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-lg lg:hidden"
                    >
                      <Filter className="w-4 h-4" />
                    </Button>
                  </DrawerTrigger>

                  {/* Drawer Body */}
                  <DrawerContent
                    className=" rounded-t-2xl p-0 backdrop-blur-lg
    [&>*:first-child]:hidden"
                  >
                    <DrawerTitle className="font-semibold text-2xl leading-[110%] tracking-[-0.02em] p-5 border-b">
                      Filter by
                      <X className="h-6 w-6 absolute top-5 right-4 cursor-pointer items-center" />
                    </DrawerTitle>
                    <div className=" max-h-[75vh] overflow-y-auto border-b">
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
                        groups={{ category: filters.category }}
                        value={category ?? []}
                        setValue={setCategory}
                      />
                    </div>

                    {/* Sticky Bottom Action */}
                    <div className="p-4 border-t bg-background sticky bottom-0">
                      <DrawerClose asChild>
                        <Button className="w-full">Apply Filters</Button>
                      </DrawerClose>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* ACTIVE FILTERS */}
            {activeValues.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {activeValues.map((activeFilter) => (
                  <div
                    key={activeFilter}
                    className="flex items-center gap-2 border py-2 px-[10px] rounded-[6px] text-sm"
                  >
                    <span>{activeFilter}</span>
                    <button
                      aria-label={`Remove ${activeFilter}`}
                      onClick={() => removeActiveValue(activeFilter)}
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

            {/* LIST */}
            <div className="space-y-6 divide-y">
              {paginatedPeople.map((person, index) => (
                <article
                  key={index}
                  className="flex justify-between items-center py-6 border-b"
                >
                  <div className="flex gap-4 items-center">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        className="rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback className="bg-muted-foreground/20 font-semibold text-sm">
                        {person.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-base text-foreground">
                        {person.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {person.title}
                      </p>

                      <div className="flex gap-12 mt-4 text-xs">
                        <div className="text-muted-foreground">
                          <div className="font-medium text-foreground">
                            Affiliation
                          </div>
                          {person.affiliation}
                        </div>

                        <div className="text-muted-foreground">
                          <div className="font-medium text-foreground">
                            Territory
                          </div>
                          {person.territory}
                        </div>

                        <div className="text-muted-foreground">
                          <div className="font-medium text-foreground">
                            Category
                          </div>
                          {person.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-primary text-sm hover:bg-transparent"
                  >
                    View profile →
                  </Button>
                </article>
              ))}
            </div>

            {/* PAGINATION */}
            <Pagination
              totalRows={people.length}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </main>
        </div>
      </div>
    </section>
  );
}
