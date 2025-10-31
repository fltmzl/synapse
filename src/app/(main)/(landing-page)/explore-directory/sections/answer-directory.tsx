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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRightBoldIcon } from "@/icons/arrow-right-bold-icon";
import { SortDescendingIcon } from "@/icons/sort-desc-icon";
import { FilterIcon } from "@/icons/filter-icon";
import NoResult from "./no-result";
import { useAutoCloseDrawer } from "@/hooks/use-auto-close-drawer";
import { FacebookIcon } from "@/icons/facebook-icon";
import { InstagramIcon } from "@/icons/instagram-icon";
import { LinkedinIcon } from "@/icons/linkedin-icon";
import { InstagramIconFlat } from "@/icons/instagram-icon-flat";
import { LinkedinIconFlat } from "@/icons/linkedin-icon-flat";

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

 const directory = [
  {
    name: "Direction des Finances Publiques de Martinique",
    category: "Government",
    territory: "Martinique, France",
    pic: "Jean-Luc Moreau",
    image: "/images/logo1.png",
  },
  {
    name: "Chambre de Commerce et d’Industrie de Guadeloupe (CCI)",
    category: "Business / Trade",
    territory: "Guadeloupe",
    pic: "Sophie Laurent",
    image: "/images/logo2.png",
  },
  {
    name: "Agence Régionale de Santé Réunion (ARS Réunion)",
    category: "Health / Public Service",
    territory: "Réunion",
    pic: "Jean-Luc Moreau",
    image: "/images/logo3.png",
  },
  {
    name: "Préfecture de Mayotte",
    category: "Government",
    territory: "Mayotte",
    pic: "Nadia Ibrahim",
    image: "/images/logo4.png",
  },
  {
    name: "Collectivité Territoriale de Guyane (CTG)",
    category: "Local Government",
    territory: "French Guiana",
    pic: "Antoine Pierre-Louis",
    image: "/images/logo5.png",
  },
  {
    name: "Office de Tourisme de Nouvelle-Calédonie",
    category: "Tourism / Business",
    territory: "New Caledonia",
    pic: "Henri Wamytan",
    image: "/images/logo6.png",
  },
  {
    name: "Chambre d’Agriculture de Martinique",
    category: "Agriculture",
    territory: "Martinique",
    pic: "Claire Dufresne",
    image: "/images/logo7.png",
  },
  {
    name: "Conseil Départemental de la Réunion",
    category: "Government",
    territory: "Réunion",
    pic: "Patrick Fontaine",
    image: "/images/logo8.png",
  },
  {
    name: "Direction de l’Environnement et du Logement (DEAL) Guadeloupe",
    category: "Tourism / Business",
    territory: "Guadeloupe",
    pic: "Henri Wamytan",
    image: "/images/logo9.png",
  },
  {
    name: "Ministère de l’Économie et des Finances",
    category: "Government",
    territory: "Martinique",
    pic: "Camille Robert",
    image: "/images/logo10.png",
  },
  {
    name: "Université des Antilles",
    category: "Education / Research",
    territory: "Guadeloupe",
    pic: "Sophie Laurent",
    image: "/images/logo11.png",
  },
  {
    name: "Chambre de Métiers et de l’Artisanat de Mayotte",
    category: "Business / Trade",
    territory: "Mayotte",
    pic: "Nadia Ibrahim",
    image: "/images/logo12.png",
  },
  {
    name: "Agence de Développement Économique de Guyane (ADEG)",
    category: "Economy / Development",
    territory: "French Guiana",
    pic: "Antoine Pierre-Louis",
    image: "/images/logo13.png",
  },
  {
    name: "Office National des Forêts de Réunion",
    category: "Environment",
    territory: "Réunion",
    pic: "Patrick Fontaine",
    image: "/images/logo14.png",
  },
  {
    name: "Chambre de Commerce et d’Industrie de Nouvelle-Calédonie",
    category: "Business / Trade",
    territory: "New Caledonia",
    pic: "Henri Wamytan",
    image: "/images/logo15.png",
  },
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

  const filteredDirectory = directory.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase())

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
  const [pageSize, setPageSize] = useState(9);
  const paginatedDirectory = filteredDirectory.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

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
              {/* 🧾 Info jumlah hasil */}
              <div className="flex gap-1 items-center">
                <p className="text-base text-muted-foreground">
                  Showing {filteredDirectory.length} results for{" "}
                </p>
                <span className="text-base font-medium">
                  {search ? `"${search}"` : `"All"`}
                </span>
              </div>

              {/* 💻 DESKTOP */}
              <div className="hidden lg:flex gap-4 items-center">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-foreground">
                    Sort by
                  </span>
                  <SelectSingleItem
                    listItems={sortBy}
                    selected={sort}
                    onChange={setSort}
                  />
                </div>

                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="py-3 px-4 gap-2 justify-start rounded-lg [&>*:last-child]:hidden">
                    <FilterIcon className="size-6 text-foreground" />
                    <span className="text-base font-medium leading-[140%] tracking-[-0.01em]">
                      Filter
                    </span>
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
              </div>

              {/* 📱 MOBILE */}
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
                      Filter by
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

            {/* Active Filters */}
            {activeValues.length > 0 && (
              <>
                {/* 🖥️ DESKTOP */}
                <div className="hidden lg:relative lg:block w-full pt-4">
                  {/* Tombol Clear filter (absolute, di luar flex flow) */}
                  <button
                    className="absolute right-0 top-4 text-sm text-primary underline"
                    onClick={clearAll}
                  >
                    Clear filter
                  </button>

                  {/* Container chip dengan padding kanan agar ga ketabrak tombol */}
                  <div className="flex flex-wrap gap-2 pr-[100px]">
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
                    className="text-sm text-primary underline text-start"
                    onClick={clearAll}
                  >
                    Clear filter
                  </button>
                </div>
              </>
            )}

            {/* LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
              {paginatedDirectory.map((directoryItem, index) => {
                console.log("Directory item data:", {
                  index,
                  name: directoryItem.name,
                  image: directoryItem.image
                });

                return (
<article
  key={index}
  className="border rounded-[12px] flex flex-col justify-between hover:shadow-sm transition-all"
>
  {/* Header */}
  <div className="flex items-center gap-4 p-6 border-b">
    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
      <Building className="text-primary size-8 "></Building>
    </div>

    <div className="flex flex-col">
      <h3 className="font-semibold text-base text-foreground leading-[120%] tracking-[-0.01em]">
        Direction des Finances Publiques de Martinique
      </h3>
    </div>
  </div>

  {/* Info tengah */}
  <div className="p-6 space-y-3 text-sm">
    <div className="flex items-center gap-5 w-max">
      <div className="flex  gap-2">
        <Building className="size-5 text-muted-foreground"></Building>
      <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">Category</span>
      </div>
      <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
        {directoryItem.category}
      </span>
    </div>

    <div className="flex items-center gap-5 w-max">
      <div className="flex  gap-2">
        <MapPin className="size-5 text-muted-foreground/80"></MapPin>
      <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">Territory</span>
      </div>
      <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
        {directoryItem.territory}
      </span>
    </div>

    <div className="flex items-center gap-5 w-max">
      <div className="flex  gap-2">
        <User className="size-5 text-muted-foreground/80"></User>
      <span className="text-muted-foreground leading-[150%] text-base tracking-[-0.01em]">PIC</span>
      </div>
      <span className=" leading-[150%] text-base tracking-[-0.01em] font-medium">
        {directoryItem.pic}
      </span>
    </div>
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between border-t px-6 py-4">
    <div className="flex items-center gap-3 text-muted-foreground">
      <FacebookIcon className="ri-facebook-fill text-xl"></FacebookIcon>
      <InstagramIconFlat className="ri-instagram-line text-xl"></InstagramIconFlat>
      <LinkedinIconFlat className="ri-linkedin-box-line text-xl"></LinkedinIconFlat>
    </div>

    <button className="text-primary text-base font-medium leading-[140%] tracking-[-0.01em] hover:underline">
      View detail →
    </button>
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
