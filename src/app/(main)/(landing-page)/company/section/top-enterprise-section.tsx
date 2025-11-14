"use client";

import { DataTable } from "@/components/data-table/data-table";
import NoResult from "@/components/no-result";
import SelectSingleItem from "@/components/select-single-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { topEnterprises } from "@/data/top-enterprise-data";
import { BuildingIcon } from "@/icons/building-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { SortDescendingIcon } from "@/icons/sort-desc-icon";
import { Enterprise } from "@/types/enterprise.type";
import { ColumnDef } from "@tanstack/react-table";
import { Span } from "next/dist/trace";
import { parseAsString, useQueryState } from "nuqs";

export default function TopEnterpriseSection() {
  const [searchValue, setSearchValue] = useQueryState("search");
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("Relevant")
  );

  const data = topEnterprises;
  const filteredData = data.filter((item) =>
    item.structure.name.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  // add selection
  const columns: ColumnDef<Enterprise>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
    {
      accessorKey: "structure.name",
      header: "Structure",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={row.original.structure.image || undefined}
              alt={row.original.structure.name}
            />
            <AvatarFallback className="text-secondary bg-secondary/5">
              <BuildingIcon />
            </AvatarFallback>
          </Avatar>
          {/*<Link
            href={`/company/${row.original.name}`}
            className="hover:underline"
          >
            {row.original.structure.name}
          </Link>*/}
          <div>{row.original.structure.name}</div>
        </div>
      )
    },
    {
      accessorKey: "name",
      header: "Nom",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Avatar className="w-7 h-7">
            <AvatarImage src={undefined} alt={row.original.name} />
            <AvatarFallback>
              <div className="text-xs">{row.original.name.charAt(0)}</div>
            </AvatarFallback>
          </Avatar>
          <div>{row.original.name}</div>
        </div>
      )
    },
    {
      accessorKey: "region",
      header: "Représentant",
      enableSorting: false
    },
    {
      accessorKey: "regionCode",
      header: "Region",
      enableSorting: false
    },
    {
      accessorKey: "representant",
      header: "Représentant",
      enableSorting: false
    },
    {
      accessorKey: "affiliation",
      header: "Affiliation",
      enableSorting: false
    },
    {
      accessorKey: "numberOfEmployees",
      header: "Number of Emp.",
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue<number>()}</span>
    },
    {
      accessorKey: "creationYear",
      header: "Date de création",
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue<number>()}</span>
    }
  ];

  const sortBy = [
    { label: "Newest", value: "Newest" },
    { label: "Oldest", value: "Oldest" },
    { label: "Relevant", value: "Relevant" },
    { label: "Most Popular", value: "Most Popular" },
    { label: "Editors Pick", value: "Editors Pick" }
  ];

  if (!filteredData.length) {
    return (
      <div className="bg-background flex flex-col items-center">
        <NoResult
          title={`No companies found for “${searchValue}”`}
          description="Try refining your keywords or switch to map search."
        />

        <Button variant="link" className="-translate-y-14 lg:-translate-y-20">
          <MapPinIcon className="mb-1" />
          <span>Explore by map</span>
        </Button>
      </div>
    );
  }

  return (
    <section className="bg-background py-12 lg:py-20 px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl lg:text-[2.5rem] font-medium">
            Top enterprise
          </h2>
          <p>
            Explorez parmi les{" "}
            <span className="text-primary font-medium">1,430</span> entreprises
            répertoriées
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <div>
              {searchValue && (
                <p>
                  Showing {searchValue.length} results for{" "}
                  <span className="font-medium text-foreground">
                    &quot;{searchValue}
                    &quot;
                  </span>
                </p>
              )}
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <span className="font-medium">Sort by</span>
              <SelectSingleItem
                listItems={sortBy}
                selected={sort}
                onChange={setSort}
              />
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="p-3 w-12 h-12 justify-center [&>*:last-child]:hidden rounded-[8px]">
                  <SortDescendingIcon className="size-6 text-foreground" />
                </SelectTrigger>

                <SelectContent align="end">
                  {sortBy.map((sortOption) => (
                    <SelectItem key={sortOption.value} value={sortOption.value}>
                      {sortOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            searchPlaceholder="Search by name..."
            data={filteredData || []}
            columns={columns as ColumnDef<Enterprise>[]}
            headerAction={() => <></>}
            isLoading={false}
            toolbarComponent={() => <></>}
          />
        </div>
      </div>
    </section>
  );
}
