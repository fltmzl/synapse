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
  const pageNumbers = getListNumberOfPagination(
    table.getState().pagination.pageIndex,
    table.getPageCount(),
    5
  );

  return (
    <div className="block sm:flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
        {/* {table.getFilteredRowModel().rows.length} row(s) selected. */}
        Total: {table.getFilteredRowModel().rows.length} Rows.
      </div>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 items-center space-x-6 sm:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[20, 50, 100, 500].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
          <div className="flex w-full items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Pagination with Numbers */}
            <div className="flex space-x-1">
              {pageNumbers.map((pageNumber, index) => (
                <Button
                  key={pageNumber + index}
                  variant={
                    table.getState().pagination.pageIndex === pageNumber
                      ? "default"
                      : "outline"
                  }
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(pageNumber)}
                >
                  {pageNumber + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
