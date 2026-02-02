"use client";

import SidebarFilters from "@/components/filter-sidebar";
import NoResult from "@/components/no-result";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Select, SelectTrigger } from "@/components/ui/select";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination.constant";
import { useAutoCloseDrawer } from "@/hooks/use-auto-close-drawer";
import { FilterIcon } from "@/icons/filter-icon";
import { SortDescendingIcon } from "@/icons/sort-desc-icon";
import useCategoriesDropdown from "@/queries/use-categories-dropdown";
import useCompanies from "@/queries/use-companies";
import useTerritoriesDropdown from "@/queries/use-territories-dropdown";
import { X } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState
} from "nuqs";
import { useEffect, useState } from "react";
import CompanyCard, { CompanyCardSkeleton } from "../components/company-card";
import FilterPopover from "../components/popover-filter";
import { useDebounce } from "@/hooks/use-debounce";

export default function AnswerDirectory() {
  const { data: categoriesItems } = useCategoriesDropdown();
  const { data: territoriesItems } = useTerritoriesDropdown();

  const [territory, setTerritory] = useQueryState(
    "territoire",
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

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE)
  );

  const debouncedSearch = useDebounce(search, 1000);

  // Reset page to 0 when search changes
  useEffect(() => {
    setPage(0);
  }, [search, setPage]);

  const territoryIds = territory;
  const categoryIds = category;

  const { data: companiesResponse, isLoading } = useCompanies({
    categoryIds,
    territoryIds,
    search: debouncedSearch || undefined,
    page,
    pageSize
  });

  const companies = companiesResponse?.data ?? [];
  const totalRows = companiesResponse?.total ?? 0;

  const filters = {
    territoire: territoriesItems,
    category: categoriesItems
  };

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

  const [openFilter, setOpenFilter] = useState(false);
  useAutoCloseDrawer(openFilter, () => setOpenFilter(false));

  if (isLoading) {
    return (
      <section className="bg-background">
        <div className="py-12 lg:py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
            {[...Array(6)].map((_, i) => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (totalRows === 0) {
    return <NoResult />;
  }

  return (
    <section className="bg-background">
      <div className="py-12 lg:py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1">
            <div className="flex items-center justify-between gap-3 flex-wrap px-2">
              <div className="flex gap-1 items-center">
                <p className="text-sm lg:text-lg leading-[140%] tracking-[-0.01em] lg:leading-[110%] text-muted-foreground">
                  Showing {totalRows} results for{" "}
                </p>
                <span className="text-sm lg:text-lg leading-[130%] tracking-[-0.02em] lg:tracking-[-0.01em] lg:leading-[110%]">
                  {search ? `"${search}"` : `"All"`}
                </span>
              </div>

              {/* 💻 DESKTOP */}
              <div className="hidden lg:flex gap-4 items-center">
                <FilterPopover
                  filters={filters}
                  territoire={territory}
                  setTerritoire={setTerritory}
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
                        groups={{ territory: filters.territoire }}
                        value={territory ?? []}
                        setValue={setTerritory}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
              {companies.map((directoryItem, index) => {
                return (
                  <CompanyCard
                    key={index}
                    slug={directoryItem.slug}
                    name={directoryItem.name}
                    category={directoryItem.category?.name || "-"}
                    territory={directoryItem.territory?.name || "-"}
                    authorizedRepresentative={
                      directoryItem.authorizedRepresentative?.name || "-"
                    }
                    socials={{
                      facebook: directoryItem.socials?.facebook,
                      instagram: directoryItem.socials?.instagram,
                      linkedin: directoryItem.socials?.linkedin
                    }}
                  />
                );
              })}
            </div>

            <Pagination
              totalRows={totalRows}
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
