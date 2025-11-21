import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";

const getListNumberOfPagination = (
  currentPageIndex: number,
  pageCount: number,
  maxPageNumbersToShow: number = 5
): number[] => {
  const pageIndex = currentPageIndex;

  // Determine the start and end of the page numbers to display
  const pageNumbersToShow = maxPageNumbersToShow;
  const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2);

  let startPage = Math.max(pageIndex - halfPageNumbersToShow, 0);
  const endPage = Math.min(startPage + pageNumbersToShow - 1, pageCount - 1);

  // Adjust startPage if we're near the end of the page range
  if (endPage - startPage < pageNumbersToShow - 1) {
    startPage = Math.max(endPage - pageNumbersToShow + 1, 0);
  }

  const pageNumbers = [...Array(endPage - startPage + 1)].map(
    (_, i) => startPage + i
  );

  return pageNumbers;
};

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="block sm:flex items-center justify-between px-2">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          Showing {from} to {to} of {totalRows} items
        </div>

        <div className="lg:hidden">
          <PageSize table={table} />
        </div>
      </div>

      <div className="grid place-content-center mt-4.5 lg:mt-0">
        <PaginationList table={table} />
      </div>

      <div className="hidden lg:block">
        <PageSize table={table} />
      </div>
    </div>
  );
}

function PageSize<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Show</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-9 min-w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[2, 20, 50, 100, 500].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PaginationList<TData>({ table }: { table: Table<TData> }) {
  const pageNumbers = getListNumberOfPagination(
    table.getState().pagination.pageIndex,
    table.getPageCount(),
    5
  );

  return (
    <div className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          className="h-9 w-9 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ArrowLeftIcon className="size-5" />
        </Button>

        {/* Pagination with Numbers */}
        <div className="flex space-x-1">
          {pageNumbers.map((pageNumber, index) => (
            <Button
              key={pageNumber + index}
              variant={
                table.getState().pagination.pageIndex === pageNumber
                  ? "secondary"
                  : "ghost"
              }
              className="h-9 w-9 p-0"
              onClick={() => table.setPageIndex(pageNumber)}
            >
              {pageNumber + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          className="h-9 w-9 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ArrowRightIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
