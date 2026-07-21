"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Design дээрх "‹ Previous  1 2 3 … 7  Next ›" бүтэц.
 * Одоогийн хуудсыг тойрсон 3 дугаар + сүүлийн хуудсыг харуулна.
 */
function buildPages(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.min(Math.max(page - 1, 1), totalPages - 3);
  const pages: (number | "…")[] = [start, start + 1, start + 2];

  if (start + 2 < totalPages - 1) pages.push("…");
  if (start + 2 < totalPages) pages.push(totalPages);

  return pages;
}

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function MoviePagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const go = (next: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    const target = Math.min(Math.max(next, 1), totalPages);
    if (target !== page) onPageChange(target);
  };

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            onClick={go(page - 1)}
          />
        </PaginationItem>

        {buildPages(page, totalPages).map((item, index) => (
          <PaginationItem key={item === "…" ? `ellipsis-${index}` : item}>
            {item === "…" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={item === page}
                onClick={go(item)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
            onClick={go(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
