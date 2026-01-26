"use client";

import SidebarFilters from "@/components/filter-sidebar";
import NoResult from "@/components/no-result";
import Pagination from "@/components/pagination";
import SelectSingleItem from "@/components/select-single-item";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination.constant";
import { useAutoCloseDrawer } from "@/hooks/use-auto-close-drawer";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { FilterIcon } from "@/icons/filter-icon";
import { SortDescendingIcon } from "@/icons/sort-desc-icon";
import useCategoriesDropdown from "@/queries/use-categories-dropdown";
import usePersons from "@/queries/use-persons";
import useTerritoriesDropdown from "@/queries/use-territories-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { X } from "lucide-react";
import Link from "next/link";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

export default function AnswerActors() {
  const { data: categoriesItems } = useCategoriesDropdown();
  const { data: territoriesItems } = useTerritoriesDropdown();
  const { data: persons } = usePersons();

  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("Nouveauté")
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const removePrefix = (value: string) => value.split(":")[1] ?? value;
  const getLabelFromValue = (value: string) => removePrefix(value);

  const people = (persons || []).map((person) => ({
    name: person.name,
    title: person.currentJobPosition || "No Position",
    affiliation: person.associations?.[0]?.name || "No Affiliation",
    territory: person.territory?.name || "Unknown",
    territoryId: person.territoryId,
    category: person.category?.name || "Uncategorized",
    categoryId: person.categoryId,
    image: person.profilePicture || "/images/avatar-placeholder.jpg",
    slug: person.slug
  }));

  const sortBy = [
    { label: "Nouveauté", value: "Nouveauté" },
    { label: "Durée", value: "Durée" },
    { label: "Popularité", value: "Popularité" },
    { label: "Pertinence", value: "Pertinence" }
  ];

  const activeValues = [...(territory ?? []), ...(category ?? [])];

  const removeActiveValue = (val: string) => {
    if ((territory ?? []).includes(val)) {
      setTerritory((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }

    if ((category ?? []).includes(val)) {
      setCategory((prev) => (prev ?? []).filter((v) => v !== val));
      return;
    }
  };

  const clearAll = () => {
    setTerritory(null);
    setCategory(null);
  };

  const filteredPeople = people.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());

    const matchTerritory =
      territory.length === 0 || territory.some((t) => t === p.territory);

    const matchCategory =
      category.length === 0 ||
      category.some((c) => {
        return c === p.category;
      });

    return matchSearch && matchTerritory && matchCategory;
  });

  const [openFilter, setOpenFilter] = useState(false);
  useAutoCloseDrawer(openFilter, () => setOpenFilter(false));

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const paginatedPeople = filteredPeople.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  if (filteredPeople.length === 0 && !persons) {
    return null; // Loading or no data
  }

  if (filteredPeople.length === 0) {
    return <NoResult />;
  }

  return (
    <section className="bg-background">
      <div className="py-12 lg:py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SIDEBAR (desktop only) */}
          <aside className=" hidden lg:block w-[336px] flex-shrink-0 border rounded-[12px] h-max sticky top-28 self-start">
            <h3 className="font-semibold text-2xl leading-[110%] tracking-[-0.02em] p-5 border-b">
              Recherche par
            </h3>
            <SidebarFilters
              groups={{ territoire: territoriesItems }}
              value={territory ?? []}
              setValue={setTerritory}
            />
            <SidebarFilters
              groups={{ catégorie: categoriesItems }}
              value={category ?? []}
              setValue={setCategory}
              isLast
            />
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-1 items-center">
                <p className="text-base text-muted-foreground">
                  Showing {filteredPeople.length} results for{" "}
                </p>
                <span className="text-base font-medium">
                  {search ? `"${search}"` : `"All"`}
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <span className="text-base font-medium text-foreground">
                  Filtrer par
                </span>
                <SelectSingleItem
                  listItems={sortBy}
                  selected={sort}
                  onChange={setSort}
                />
              </div>

              {/* Mobile icons */}
              <div className="flex lg:hidden items-center gap-2 ml-auto">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="p-3 rounded-lg justify-center [&>*:last-child]:hidden">
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
                      className="p-6 rounded-lg lg:hidden "
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
                        groups={{ territoire: territoriesItems }}
                        value={territory ?? []}
                        setValue={setTerritory}
                      />
                      <SidebarFilters
                        groups={{ catégorie: categoriesItems }}
                        value={category ?? []}
                        setValue={setCategory}
                      />
                    </div>

                    <div className="p-4 border-t bg-background sticky bottom-0">
                      <DrawerClose asChild>
                        <Button className="w-full">Apply</Button>
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
                  <div className="flex flex-wrap gap-2">
                    {activeValues.map((activeFilter, index) => (
                      <div
                        key={`${activeFilter}-${index}`}
                        className="flex gap-2 border py-2 px-[10px] rounded-[6px] text-sm"
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
                  </div>

                  <button
                    className="text-sm text-primary  min-w-max py-2"
                    onClick={clearAll}
                  >
                    Effacer filtres
                  </button>
                </div>

                {/* 📱 MOBILE */}
                <div className="flex flex-col gap-4 lg:hidden pt-4">
                  <div className="flex flex-row max-h-full">
                    <div className="flex whitespace-nowrap overflow-x-auto hide-scrollbar gap-2">
                      {activeValues.map((activeFilter, index) => (
                        <div
                          key={`${activeFilter}-${index}`}
                          className="flex gap-2 border py-2 px-[10px] rounded-[6px] text-sm"
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
                    </div>
                  </div>
                  <button
                    className="text-sm text-primary  text-start"
                    onClick={clearAll}
                  >
                    Clear filter
                  </button>
                </div>
              </>
            )}

            {/* LIST */}
            <div className="space-y-6 divide-y px-2">
              {paginatedPeople.map((person, index) => {
                return (
                  <article
                    key={index}
                    className="w-full flex flex-col lg:flex-row justify-between py-8 border-b mb-0"
                  >
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col sm:flex-row md:items-start md:justify-between gap-4 w-full">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              className="rounded-full"
                              src={person.image}
                              alt={person.name}
                            />
                            <AvatarFallback className="bg-muted-foreground/20 font-semibold">
                              <div className="w-16 h-16 bg-muted rounded-full grid place-content-center">
                                {person.name
                                  .split(" ")
                                  .map((w) => w[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-xl text-foreground leading-[110%] tracking-[-0.02em]">
                              {person.name}
                            </h3>
                            <p className="text-base leading-[110%] text-muted-foreground">
                              {person.title}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          className="text-primary hover:underline text-base font-regular leading-[140%] tracking-[-0.01em] hover:bg-transparent self-start sm:self-auto p-0"
                          asChild
                        >
                          <Link href={`/actors/${person.slug}`}>
                            <span className="inline top-0">Profil</span>
                            <ArrowRightBoldIcon className="w-5 h-5 size-5 stroke-2" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex flex-col md:flex-row md:gap-16 pl-0 md:pl-20 text-xs gap-6">
                        <div className="flex flex-col gap-2 lg:w-[193px] w-full">
                          <div className="font-regular text-muted-foreground text-sm leading-[110%] tracking-[-0.01em]">
                            Affiliation
                          </div>
                          <div className="font-regular text-foreground text-base leading-[110%] tracking-[-0.01em]">
                            {person.affiliation}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[143px] w-full">
                          <div className="font-regular text-muted-foreground text-sm leading-[110%] tracking-[-0.01em]">
                            Territoire
                          </div>
                          <div className="font-regular text-foreground text-base leading-[110%] tracking-[-0.01em]">
                            {person.territory}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="font-regular text-muted-foreground text-sm leading-[110%] tracking-[-0.01em]">
                            Catégorie
                          </div>
                          <div className="font-regular text-foreground text-base leading-[110%] tracking-[-0.01em]">
                            {person.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <Pagination
              totalRows={filteredPeople.length}
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
