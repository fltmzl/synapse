"use client";

import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, X } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

import useCategoriesDropdown from "@/queries/use-categories-dropdown";
import useTerritoriesDropdown from "@/queries/use-territories-dropdown";

export default function SearchCompany({
  onSearch
}: {
  onSearch: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useQueryState("search");

  const { data: categoriesItems } = useCategoriesDropdown();
  const { data: territoriesItems } = useTerritoriesDropdown();

  const [territory, setTerritory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const handleSubmit = () => {
    onSearch(searchValue || "");
  };

  return (
    <div className="relative w-full rounded-md flex flex-col justify-center border bg-background">
      <Textarea
        placeholder="Entrez le nom ou un mot clé..."
        value={searchValue || ""}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4 pr-16 lg:pr-4 max-h-40 scrollbar-custom resize-none"
      />

      {/* Tombol Search */}
      <Button
        onClick={handleSubmit}
        className="absolute right-4 top-4 w-11 h-11 flex items-center justify-center lg:hidden"
      >
        <SearchIcon className="h-4 w-4 text-white hover:text-primary " />
      </Button>

      <div className="flex items-center justify-between pt-6 lg:pt-2 pb-4 px-4 overflow-auto hide-scrollbar">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground w-max">Search by</span>

          <div className="flex gap-2">
            <FilterMultipleWithSearch
              buttonSize="sm"
              buttonClassName="py-2 px-3 w-fit"
              buttonTextClassName="min-w-auto"
              buttonLabel="Territoire"
              setValue={setTerritory}
              value={territory}
              placeholder="Search location"
              listItems={territoriesItems}
            />
            <FilterMultipleWithSearch
              buttonSize="sm"
              buttonClassName="py-2 px-3 w-fit"
              buttonTextClassName="min-w-auto"
              buttonLabel="Catégorie"
              setValue={setCategory}
              value={category}
              placeholder="Search category"
              listItems={categoriesItems}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-11 h-11 hidden lg:flex items-center justify-center"
        >
          <SearchIcon className="h-4 w-4 text-white hover:text-primary" />
        </Button>
      </div>
    </div>
  );
}
