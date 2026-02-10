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
import { BuildingIcon } from "@/icons/building-icon";
import { MapPinIcon } from "@/icons/map-pin-icon";
import { SortDescendingIcon } from "@/icons/sort-desc-icon";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination.constant";
import useCompanies from "@/queries/use-companies";
import { CompanyWithDetails } from "@/types/person-relation.type";
import { ColumnDef } from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";
import Pagination from "@/components/pagination";
import Link from "next/link";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState
} from "nuqs";
import { format } from "date-fns";

export default function TopEnterpriseSection() {
  const [searchValue] = useQueryState("search");
  const debouncedSearch = useDebounce(searchValue || "", 500);

  const [territory] = useQueryState(
    "territory",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [category] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("Relevant")
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE)
  );

  const { data: companiesResponse, isLoading } = useCompanies({
    categoryIds: category,
    territoryIds: territory,
    search: debouncedSearch || undefined,
    page,
    pageSize
  });

  const companies = companiesResponse?.data ?? [];
  const totalRows = companiesResponse?.total ?? 0;

  const columns: ColumnDef<CompanyWithDetails>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   )
    // },
    {
      accessorKey: "name",
      header: "Structure",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-4 max-w-80 truncate">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={row.original.profilePicture || undefined}
              alt={row.original.name}
            />
            <AvatarFallback className="text-secondary bg-secondary/5">
              <BuildingIcon />
            </AvatarFallback>
          </Avatar>
          <Link
            title={row.original.name}
            href={`/company/${row.original.slug}`}
            className="hover:underline truncate"
          >
            {row.original.name}
          </Link>
        </div>
      )
    },
    {
      accessorKey: "authorizedRepresentative.name",
      header: "Représentant",
      enableSorting: false,
      cell: ({ row }) => {
        const representative = row.original.authorizedRepresentative;
        if (!representative) return "-";
        return (
          <div className="flex items-center gap-2.5">
            <Avatar className="w-7 h-7">
              <AvatarImage
                src={representative.profilePicture || undefined}
                alt={representative.name}
              />
              <AvatarFallback>
                <div className="text-xs">{representative.name.charAt(0)}</div>
              </AvatarFallback>
            </Avatar>
            <div>{representative.name}</div>
          </div>
        );
      }
    },
    {
      accessorKey: "territory.name",
      header: "Territoire",
      enableSorting: false,
      cell: ({ row }) => row.original.territory?.name || "-"
    },
    {
      accessorKey: "category.name",
      header: "Catégorie",
      enableSorting: false,
      cell: ({ row }) => row.original.category?.name || "-"
    },
    {
      accessorKey: "economicalNumbers.number_of_employees",
      header: "Employés",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.economicalNumbers?.number_of_employees ?? "-"
    },
    {
      accessorKey: "establishmentDate",
      header: "Date de création",
      enableSorting: false,
      cell: ({ row }) => {
        const date = row.original.establishmentDate;
        if (!date) return "-";
        return date;
      }
    }
  ];

  const sortBy = [
    { label: "Newest", value: "Newest" },
    { label: "Oldest", value: "Oldest" },
    { label: "Relevant", value: "Relevant" },
    { label: "Most Popular", value: "Most Popular" },
    { label: "Editors Pick", value: "Editors Pick" }
  ];

  if (!isLoading && totalRows === 0) {
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
            <span className="text-primary font-medium">{totalRows}</span>{" "}
            entreprises répertoriées
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <div>
              {searchValue && (
                <p>
                  Showing {totalRows} results for{" "}
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
            data={companies}
            columns={columns}
            headerAction={() => <></>}
            isLoading={isLoading}
            toolbarComponent={() => <></>}
            showPagination={false}
          />

          <Pagination
            totalRows={totalRows}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </section>
  );
}
