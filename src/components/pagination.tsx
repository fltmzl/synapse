import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

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
    <div className="flex items-center justify-between mt-10 py-4 text-sm">
      {/* Showing Info */}
      <p className="text-muted-foreground">
        Showing {start} to {end} of {totalRows} results
      </p>

      {/* Page Numbers */}
      <div className="flex items-center gap-3">
        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {generatePageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={i}>…</span>
          ) : (
            <Button
              key={i}
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 text-sm ${
                page === p
                  ? "border border-primary text-primary rounded-md"
                  : ""
              }`}
            >
              {p + 1}
            </Button>
          )
        )}

        <button
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Show X dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Show</span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            onPageSizeChange(Number(v));
            onPageChange(0);
          }}
        >
          <SelectTrigger className="w-[65px] h-8 text-xs">
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
  );
}
