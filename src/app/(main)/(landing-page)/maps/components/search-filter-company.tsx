"use client";

import FilterMultipleWithSearch from "@/components/filter-multiple-with-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcons } from "@/icons/search-icon";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export default function SearchFilterCompany() {
  const [searchValue, setSearchValue] = useQueryState("search", {
    defaultValue: ""
  });
  const [region, setRegion] = useQueryState(
    "region",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [industry, setIndustry] = useQueryState(
    "industry",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [size, setSize] = useQueryState(
    "size",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const filters = {
    region: [
      { label: "Martinique", value: "Martinique" },
      { label: "Guadeloupe", value: "Guadeloupe" },
      { label: "Réunion", value: "Réunion" },
      { label: "Mayotte", value: "Mayotte" },
      { label: "French Guiana", value: "French Guiana" }
    ],
    industry: [
      { label: "Government", value: "Government" },
      { label: "Business Leaders", value: "Business Leaders" }
    ],
    size: [
      { label: "Economy", value: "Economy" },
      { label: "Government", value: "Government" },
      { label: "Health", value: "Health" },
      { label: "Education", value: "Education" },
      { label: "Environment", value: "Environment" }
    ]
  };

  const handleSubmit = () => {
    // onSearch(searchValue || "");
  };

  const clearInput = () => {
    setSearchValue(null);
    // onSearch("");
  };

  return (
    <div>
      {/*Search Input*/}
      <div className="relative w-full h-full">
        <Input
          placeholder="Search company.."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="py-3.5 pl-4 pr-14 h-12"
        />

        <Button
          size="icon-sm"
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm"
        >
          <SearchIcons className="size-4" />
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-2">
          <span className="hidden lg:block text-sm text-muted-foreground w-max tracking-tight">
            Search by
          </span>

          <div className="flex gap-2">
            <FilterMultipleWithSearch
              buttonSize="sm"
              buttonClassName="py-1.5 px-3 w-fit lg:flex-1"
              buttonTextClassName="text-dark min-w-auto"
              arrowDownClassName="text-muted-foreground"
              buttonLabel="Région"
              setValue={setRegion}
              value={region}
              placeholder="Search location"
              listItems={filters.region}
            />
            <FilterMultipleWithSearch
              buttonSize="sm"
              buttonClassName="py-1.5 px-3 w-fit lg:flex-1"
              buttonTextClassName="text-dark min-w-auto"
              arrowDownClassName="text-muted-foreground"
              buttonLabel="Industry"
              setValue={setIndustry}
              value={industry}
              placeholder="Search industry"
              listItems={filters.industry}
            />
            <FilterMultipleWithSearch
              buttonSize="sm"
              buttonClassName="py-1.5 px-3 w-fit lg:flex-1"
              buttonTextClassName="text-dark min-w-auto"
              arrowDownClassName="text-muted-foreground"
              buttonLabel="Size"
              setValue={setSize}
              value={size}
              placeholder="Search size"
              listItems={filters.size}
              popoverAlign="end"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
