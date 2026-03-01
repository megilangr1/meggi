"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationTableProps {
  currentPage: number;
  totalPage: number;
  limit: number;
}

const PaginationTable = ({
  currentPage,
  totalPage,
  limit,
}: PaginationTableProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
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

  const changeLimit = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value == 10) {
      params.delete("limit");
    } else {
      params.set("limit", value.toString());
    }

    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-x-1 gap-y-3">
      <div className="flex-auto flex items-center justify-start">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select
            defaultValue={limit.toString()}
            onValueChange={(v) => changeLimit(parseInt(v))}
          >
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="flex p-2 border rounded-sm w-full sm:w-auto max-w-full overflow-x-auto">
        <Pagination>
          <PaginationContent className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-2">
            {currentPage > 1 ? (
              <PaginationItem>
                <PaginationPrevious
                  href={createPageURL(currentPage - 1)}
                  className="text-xs"
                />
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationLink
                  href={"#"}
                  aria-label="Go to previous page"
                  size="default"
                  className="gap-1 px-2.5 sm:pl-2.5 text-xs cursor-not-allowed text-slate-400 hover:text-slate-500"
                >
                  <ChevronLeftIcon />
                  <span className="block sm:block">Previous</span>
                </PaginationLink>
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

            {currentPage < totalPage ? (
              <PaginationItem>
                <PaginationNext
                  href={createPageURL(currentPage + 1)}
                  className="text-xs"
                />
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationLink
                  href={"#"}
                  aria-label="Go to next page"
                  size="default"
                  className="gap-1 px-2.5 sm:pl-2.5 text-xs cursor-not-allowed text-slate-400 hover:text-slate-500"
                >
                  <span className="block sm:block">Next</span>
                  <ChevronRightIcon />
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
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
