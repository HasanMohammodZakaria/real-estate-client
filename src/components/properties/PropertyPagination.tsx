"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function PropertyPagination({ currentPage, totalPages }: PropertyPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  // Show up to 5 page numbers, centered around the current page
  const pages: number[] = [];
  let start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  start = Math.max(1, end - 4);
  for (let i = start; i <= end; i++) pages.push(i);

  const baseBtn =
    "h-9 min-w-9 px-2 flex items-center justify-center rounded-(--radius) text-sm transition-colors";

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={baseBtn}
        style={{
          border: "1px solid var(--border)",
          color: currentPage === 1 ? "var(--muted-foreground)" : "var(--card-foreground)",
          pointerEvents: currentPage === 1 ? "none" : "auto",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        <HiChevronLeft size={16} />
      </Link>

      {start > 1 && (
        <>
          <Link href={buildHref(1)} className={baseBtn} style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}>
            1
          </Link>
          {start > 2 && <span style={{ color: "var(--muted-foreground)" }}>…</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={baseBtn}
          style={
            page === currentPage
              ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
              : { border: "1px solid var(--border)", color: "var(--card-foreground)" }
          }
        >
          {page}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{ color: "var(--muted-foreground)" }}>…</span>}
          <Link href={buildHref(totalPages)} className={baseBtn} style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}>
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={baseBtn}
        style={{
          border: "1px solid var(--border)",
          color: currentPage === totalPages ? "var(--muted-foreground)" : "var(--card-foreground)",
          pointerEvents: currentPage === totalPages ? "none" : "auto",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        <HiChevronRight size={16} />
      </Link>
    </div>
  );
}