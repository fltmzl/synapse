import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowRightIcon } from "@/icons/arrow-right-icon";

type PaginationProps = {
  totalRows: number;
  page: number; // zero-based
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  totalRows,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  const start = page * pageSize + 1;
  const end = Math.min(totalRows, (page + 1) * pageSize);

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];
    const max = totalPages - 1;

    for (let i = 0; i <= max; i++) {
      if (i === 0 || i === max || Math.abs(i - page) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
      <div className="w-full pt-8 text-sm">
      {/* Top wrapper: stacks on mobile, row on desktop */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

        {/* Left on desktop, row (showing + mobile dropdown) on mobile */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <p className="text-muted-foreground text-sm leading-[140%] tracking-[-0.01em]">
            Showing {start} to {end} of {totalRows} results
          </p>

          {/* Mobile: show dropdown in the same row as "Showing" */}
          <div className="lg:hidden">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground leading-[140%] tracking-[-0.01em]">Show</span>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  onPageSizeChange(Number(value));
                  onPageChange(0);
                }}
              >
                <SelectTrigger className="w-[65px] h-8 text-sm pl-3 py-[6px] pr-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 25, 50].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Middle: pagination numbers — centered on mobile, inline center on desktop */}
        <div className="flex justify-center w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <button
              disabled={page === 0}
              onClick={() => onPageChange(page - 1)}
              className="disabled:opacity-40 text-foreground"
            >
              <ArrowLeftIcon className="size-8" />
            </button>

            {generatePageNumbers().map((pages, i) =>
              pages === "..." ? (
                <span key={i}>…</span>
              ) : (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  onClick={() => onPageChange(pages)}
                  className={`w-8 h-8 text-sm ${page === pages ? "border border-primary text-primary rounded-sm" : ""}`}
                >
                  {pages + 1}
                </Button>
              )
            )}

            <button
              disabled={page === totalPages - 1}
              onClick={() => onPageChange(page + 1)}
              className="disabled:opacity-40 text-foreground"
            >
              <ArrowRightIcon className="size-8 text-foreground" />
            </button>
          </div>
        </div>

        {/* Right: dropdown on desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-muted-foreground leading-[140%] tracking-[-0.01em]">Show</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              onPageSizeChange(Number(value));
              onPageChange(0);
            }}
          >
            <SelectTrigger className="w-[65px] h-8 text-sm pl-3 py-[6px] pr-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 25, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
