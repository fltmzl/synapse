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
import { Building, MapPin, User, X } from "lucide-react";
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
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { SortDescendingIcon } from "@/icons/sort-desc-icon";
import { FilterIcon } from "@/icons/filter-icon";
import { useAutoCloseDrawer } from "@/hooks/use-auto-close-drawer";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";
import { BuildingIcon } from "@/icons/building-icon";
import { FacebookFillIcon } from "@/icons/facebook-fill-icon";
import Link from "next/link";
import FilterPopover from "../components/popover-filter";
import { directory } from "@/data/directory-data";
import NoResult from "@/components/no-result";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination.constant";

export default function AnswerDirectory() {
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
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const removePrefix = (value: string) => value.split(":")[1] ?? value;
  const getLabelFromValue = (value: string) => removePrefix(value);

  const filters = {
    territory: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "Guyane", value: "Guyane" }
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

  const filteredDirectory = directory.filter((p) => {
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());

    const matchTerritory =
      territory.length === 0 ||
      territory.some((t) => removePrefix(t) === p.territory);

    const matchRole =
      role.length === 0 || role.some((r) => removePrefix(r) === p.category);

    const matchCategory =
      category.length === 0 ||
      category.some((c) => removePrefix(c) === p.category);

    return matchSearch && matchTerritory && matchRole && matchCategory;
  });

  const [openFilter, setOpenFilter] = useState(false);
  useAutoCloseDrawer(openFilter, () => setOpenFilter(false));

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const paginatedDirectory = filteredDirectory.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  if (!search) return null;

  if (filteredDirectory.length === 0) {
    return <NoResult />;
  }

  return (
    <section className="bg-background">
      <div className="py-12 lg:py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* MAIN CONTENT */}
          <main className="flex-1">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-3 flex-wrap px-2">
              <div className="flex gap-1 items-center">
                <p className="text-sm lg:text-lg leading-[140%] tracking-[-0.01em] lg:leading-[110%] text-muted-foreground">
                  Showing {filteredDirectory.length} results for{" "}
                </p>
                <span className="text-sm lg:text-lg leading-[130%] tracking-[-0.02em] lg:tracking-[-0.01em] lg:leading-[110%]">
                  {search ? `"${search}"` : `"All"`}
                </span>
              </div>

              {/* 💻 DESKTOP */}
              <div className="hidden lg:flex gap-4 items-center">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-foreground">
                    Filtrer par
                  </span>
                  <SelectSingleItem
                    listItems={sortBy}
                    selected={sort}
                    onChange={setSort}
                  />
                </div>

                <FilterPopover
                  filters={filters}
                  territory={territory}
                  setTerritory={setTerritory}
                  role={role}
                  setRole={setRole}
                  category={category}
                  setCategory={setCategory}
                  activeValues={activeValues}
                  clearAll={clearAll}
                />
              </div>

              {/* 📱 MOBILE */}
              <div className="flex lg:hidden items-center gap-2 ml-auto">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="p-3 w-12 h-12 justify-center [&>*:last-child]:hidden rounded-[8px]">
                    <SortDescendingIcon className="size-6 text-foreground" />
                  </SelectTrigger>

                  <SelectContent align="end">
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

                <Drawer
                  open={openFilter}
                  onOpenChange={setOpenFilter}
                  shouldScaleBackground={false}
                >
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="p-6 rounded-[8px] lg:hidden "
                    >
                      <FilterIcon className="size-6 " />
                    </Button>
                  </DrawerTrigger>

                  <DrawerContent className=" rounded-t-2xl p-0 backdrop-blur-lg [&>*:first-child]:hidden">
                    <DrawerTitle className="font-semibold text-2xl leading-[110%] tracking-[-0.02em] p-5 border-b relative">
                      Recherche par
                      <DrawerClose asChild>
                        <button>
                          <X className="h-6 w-6 absolute top-5 right-4 cursor-pointer" />
                        </button>
                      </DrawerClose>
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

                    <div className="p-4 border-t bg-background sticky bottom-0">
                      <DrawerClose asChild>
                        <Button className="w-full">Apply Filters</Button>
                      </DrawerClose>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {activeValues.length > 0 && (
              <>
                {/* 🖥️ DESKTOP */}
                <div className="hidden w-full pt-4 lg:flex lg:gap-5 items-start">
                  {/* Container chip dengan padding kanan agar ga ketabrak tombol */}
                  <div className="flex flex-wrap gap-2">
                    {activeValues.map((activeFilter, index) => (
                      <div
                        key={`${activeFilter}-${index}`}
                        className="flex gap-[6px] border py-2 px-[10px] rounded-[6px] text-sm items-center"
                      >
                        <span className="text-sm font-medium leading-5 tracking-[-0.01em]">
                          {activeFilter}
                        </span>
                        <button
                          aria-label={`Remove ${activeFilter}`}
                          onClick={() => removeActiveValue(activeFilter)}
                          className="p-1"
                        >
                          <X className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Tombol Clear filter (absolute, di luar flex flow) */}
                  <button
                    className="text-sm text-primary  min-w-max py-[10px]"
                    onClick={clearAll}
                  >
                    Effacer filtres
                  </button>
                </div>

                <div className="flex flex-col gap-4 lg:hidden pt-4">
                  <div className="flex flex-row max-h-full">
                    <div className="flex whitespace-nowrap overflow-x-auto hide-scrollbar gap-2">
                      {activeValues.map((activeFilter, index) => (
                        <div
                          key={`${activeFilter}-${index}`}
                          className="flex gap-[6px] border py-2 px-[10px] rounded-[6px] text-sm items-center"
                        >
                          <span className="text-sm font-medium leading-5 tracking-[-0.01em]">
                            {activeFilter}
                          </span>
                          <button
                            aria-label={`Remove ${activeFilter}`}
                            onClick={() => removeActiveValue(activeFilter)}
                            className="p-1"
                          >
                            <X className="h-[18px] w-[18px]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="text-sm text-primary underline text-start"
                    onClick={clearAll}
                  >
                    Effacer filtres
                  </button>
                </div>
              </>
            )}

            {/* LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
              {paginatedDirectory.map((directoryItem, index) => {
                return (
                  <article
                    key={index}
                    className="border rounded-[12px] flex flex-col justify-between hover:shadow-sm transition-all w-full h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 py-6 px-5 lg:px-6 border-b">
                      <div className="flex items-center justify-center w-16 h-16 bg-[#EEF6FF] rounded-full">
                        <BuildingIcon className="text-primary size-8 mx-4 "></BuildingIcon>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-xl text-foreground leading-[130%] tracking-[-0.02em]">
                          {directoryItem.name}
                        </span>
                      </div>
                    </div>

                    {/* Info tengah */}
                    <div className="py-6 px-5 lg:px-6 space-y-4 ">
                      <div className="flex items-start gap-5">
                        <div className="flex gap-2 items-center min-w-[108px]">
                          <BuildingIcon className="size-5 text-muted-foreground"></BuildingIcon>
                          <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
                            Catégorie
                          </span>
                        </div>
                        <span className="leading-[150%] text-base tracking-[-0.01em] font-medium">
                          {directoryItem.category}
                        </span>
                      </div>

                      <div className="flex items-start gap-5">
                        <div className="flex  gap-2 items-center min-w-[108px]">
                          <MapPin
                            strokeWidth={1.5}
                            className="size-5 text-muted-foreground/80"
                          ></MapPin>
                          <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
                            Territoire
                          </span>
                        </div>
                        <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
                          {directoryItem.territory}
                        </span>
                      </div>

                      <div className="flex items-start gap-5">
                        <div className="flex  gap-2 items-center min-w-[108px]">
                          <User
                            strokeWidth={1}
                            className="size-5 text-muted-foreground/80"
                          ></User>
                          <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">
                            PIC
                          </span>
                        </div>
                        <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
                          {directoryItem.pic}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className=" rounded-b-xl flex items-center justify-between border-t px-6 py-4 bg-[var(--body)]">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <Link href={"#"}>
                          <FacebookFillIcon className="ri-facebook-fill text-xl"></FacebookFillIcon>
                        </Link>
                        <Link href={"#"}>
                          <InstagramIconFlat className="ri-instagram-line text-xl"></InstagramIconFlat>
                        </Link>
                        <Link href={"#"}>
                          <LinkedinIconFlat className="ri-linkedin-box-line text-xl"></LinkedinIconFlat>
                        </Link>
                      </div>

                      <Link
                        href={`/explore-directory/${directoryItem.slug}`}
                        className="flex items-center gap-[6px]"
                      >
                        <span className="text-primary text-sm font-medium leading-5 tracking-[-0.01em] ">
                          View detail
                        </span>
                        <ArrowRightBoldIcon className="inline size-5 text-primary" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <Pagination
              totalRows={filteredDirectory.length}
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
