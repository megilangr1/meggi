"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Diff, FunnelPlus, ListFilterPlus, RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterState {
  search: string;
  sortBy: string;
  sortType: string;
}

const defaultFilterState: FilterState = {
  search: "",
  sortBy: "createdAt",
  sortType: "asc",
};

interface SortFieldType {
  field: string;
  label: string;
}

interface FilterTableProps {
  sortBy: string;
  sortType: string;
  sortField: SortFieldType[];
}

const FilterTable = ({ sortBy, sortType, sortField }: FilterTableProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<FilterState>({
    ...defaultFilterState,
    sortBy,
    sortType,
  });

  function handleChangeFilter(key: keyof FilterState, value: string) {
    setFilterState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function setFilterParam() {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(filterState).forEach((key) => {
      const value = filterState[key as keyof FilterState];

      if (value == "") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    params.delete("page");
    params.delete("limit");

    replace(`${pathname}?${params.toString()}`);
  }

  function resetFilterParam() {
    const params = new URLSearchParams(searchParams.toString());
    setFilterState(defaultFilterState);
    Object.keys(filterState).forEach((key) => {
      params.delete(key);
    });

    params.delete("page");
    params.delete("limit");

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <Card className="p-0">
        <Collapsible
          open={showFilter}
          onOpenChange={(v) => {
            if (!v) setShowFilter(v);
          }}
        >
          <CardHeader
            className={`py-3 px-4 gap-0 cursor-pointer ${showFilter && "border-b-2"}`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-auto flex items-center justify-start gap-3">
                <ListFilterPlus className="shrink-0 size-5" />
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-sm">Opsi Filter Data</CardTitle>
                </div>
              </div>
              <div className="flex">
                <Button className="h-auto px-4 py-1 text-[10px] rounded-sm bg-cyan-600">
                  <Diff className="shrink-0 size-3" />
                  Buka / Tutup Filter
                </Button>
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent className="border-0">
            <CardContent className="px-4 py-3 flex flex-col gap-2">
              <FieldSet>
                <FieldGroup className="grid grid-cols-12 gap-4 ">
                  <Field className="col-span-12 md:col-span-12 lg:col-span-6 flex flex-col items-start justify-start">
                    <FieldLabel htmlFor="filter-search">
                      Pencarian Data :
                    </FieldLabel>
                    <Input
                      type="text"
                      id="filter-search"
                      name="filter-search"
                      placeholder="Masukan Pencarian Data..."
                      value={filterState.search}
                      autoComplete="off"
                      onChange={(el) =>
                        handleChangeFilter("search", el.target.value)
                      }
                    />
                  </Field>
                  <Field className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-start justify-start">
                    <FieldLabel htmlFor="filter-sortBy">
                      Sortir Berdasarkan :
                    </FieldLabel>
                    <Select
                      defaultValue={filterState.sortBy}
                      onValueChange={(value) => {
                        handleChangeFilter("sortBy", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sortir Berdasarkan..." />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          {sortField.map((sort) => (
                            <SelectItem key={sort.field} value={sort.field}>
                              {sort.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field className="col-span-12 md:col-span-6 lg:col-span-2 flex flex-col items-start justify-start">
                    <FieldLabel htmlFor="filter-sortType">Urutan :</FieldLabel>
                    <Select
                      defaultValue={filterState.sortType}
                      onValueChange={(value) => {
                        handleChangeFilter("sortType", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ururtan" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectItem value="asc">A-Z</SelectItem>
                          <SelectItem value="desc">Z-A</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <hr className="my-1" />

              <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-2">
                <Button
                  size={"sm"}
                  className="w-full sm:w-auto"
                  onClick={() => setFilterParam()}
                >
                  <FunnelPlus className="shrink-0 size-3" />
                  Terapkan Filter
                </Button>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  className="w-full sm:w-auto"
                  onClick={() => resetFilterParam()}
                >
                  <RotateCcw className="shrink-0 size-3" />
                  Reset Filter
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default FilterTable;
