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
import { useSearchParams } from "next/navigation";

interface PaginationTableProps {
  currentPage: number;
  totalPage: number;
}

const PaginationTable = ({ currentPage, totalPage }: PaginationTableProps) => {
  const searchParams = useSearchParams();
  const pagination = generatePagination(currentPage, totalPage);

  const createPageURL = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              className="text-xs"
            />
          </PaginationItem>
        )}

        {pagination.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem
                key={`ellipsis-${index}`}
                className="hidden sm:block"
              >
                <PaginationEllipsis className="text-xs" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page} className="hidden sm:block">
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
                className="text-xs"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              className="text-xs"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTable;

export const generatePagination = (
  currentPage: number,
  totalPages: number,
): (number | "...")[] => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages];

  if (currentPage >= totalPages - 2)
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
