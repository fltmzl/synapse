"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
  TableOptions,
  VisibilityState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import DataTableMain from "./data-table-main";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export type ListToolbarProps<TData> = {
  table: Table<TData>;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headerAction?: React.ComponentType;
  filterAction?: React.ComponentType;
  toolbarComponent: React.ComponentType<ListToolbarProps<TData>>;
  showPagination?: boolean;
  search?: string;
  tableTitle?: string;
  tableDescription?: string;
  tableOptions?: Partial<TableOptions<TData>>;
  isLoading: boolean;
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  headerAction: HeaderAction,
  filterAction: FilterAction,
  toolbarComponent: ToolbarComponent,
  showPagination = true,
  search,
  tableTitle,
  tableDescription,
  tableOptions,
  isLoading,
  searchPlaceholder
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    tableOptions?.state?.columnVisibility || {}
  );
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    // main table
    data,
    columns,
    // rowCount: 10, // total data/row, used for Server side pagination
    // pageCount: 2, // total page, used for Server side pagination
    getCoreRowModel: getCoreRowModel(),

    // pagination
    getPaginationRowModel: showPagination ? getPaginationRowModel() : undefined, // only required when using client-side strategy
    onPaginationChange: setPagination,
    manualPagination: false, // default: false (set "true" to use server-side pagination)

    // sorting
    getSortedRowModel: getSortedRowModel(), // only required when using client-side strategy
    onSortingChange: setSorting,
    manualSorting: false, // default: false (set "true" to use server-side sorting)

    // filter/search column
    getFilteredRowModel: getFilteredRowModel(), // only required when using client-side strategy
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: false, // default: false (set "true" to use server-side filtering)

    // column visibilty
    onColumnVisibilityChange: setColumnVisibility,

    // row selection
    onRowSelectionChange: setRowSelection,

    // generate unique values for select filter/autocomplete
    getFacetedUniqueValues: getFacetedUniqueValues(),

    // generate min/max values for range filter
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    ...tableOptions
  });

  return (
    <div className="space-y-4">
      <div>
        {tableTitle && (
          <CardTitle className="mb-1 text-lg md:text-xl">
            {tableTitle}
          </CardTitle>
        )}
        {tableDescription && (
          <CardDescription>{tableDescription}</CardDescription>
        )}
      </div>

      <div className="flex flex-col-reverse items-end sm:flex-row justify-between gap-3">
        {search && (
          <Input
            placeholder={searchPlaceholder || "Search..."}
            value={(table.getColumn(search)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(search)?.setFilterValue(event.target.value)
            }
            className="sm:max-w-48"
          />
        )}
        <div className={`flex flex-col gap-3 ${search ? "" : "w-full"}`}>
          {table.getFilteredSelectedRowModel().rows.length ? (
            <ToolbarComponent table={table} />
          ) : (
            <div
              className={`flex gap-3 flex-wrap ${
                search ? "" : "w-full justify-between"
              }`}
            >
              {HeaderAction && <HeaderAction />}
            </div>
          )}

          {FilterAction && <FilterAction />}
        </div>
      </div>

      <div className="overflow-auto">
        <DataTableMain table={table} columns={columns} isLoading={isLoading} />
      </div>

      {showPagination && (
        <div>
          <DataTablePagination table={table} />
        </div>
      )}

      {/* <div className="bg-background p-4 flex gap-5">
        <div>
          <p>For debugging search column</p>
          <pre>
            {JSON.stringify(
              { columnFilters: table.getState().columnFilters },
              null,
              2
            )}
          </pre>
        </div>

        <div>
          <p>For debugging sort column</p>
          <pre>
            {JSON.stringify({ sorting: table.getState().sorting }, null, 2)}
          </pre>
        </div>

        <div>
          <p>For debugging pagination</p>
          <pre>
            {JSON.stringify(
              { pagination: table.getState().pagination },
              null,
              2
            )}
          </pre>
        </div>
      </div> */}
    </div>
  );
}
