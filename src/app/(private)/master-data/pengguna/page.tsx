import { AuthGuard } from "@/lib/core/auth/auth-guard";
import PageHeader from "../../_components/page-header";
import { Plus, Sheet } from "lucide-react";
import DaftarPengguna from "./_components/daftar-pengguna";
import {
  extractSearchParams,
  SearchParamsInterface,
} from "@/lib/helpers/extract-search-params";
import FilterTable from "@/components/helpers/table/filter-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/helpers/table/table-skeleton";
import { sortFieldPengguna } from "@/lib/helpers/sort-field-master";

interface PageProps {
  searchParams?: Promise<SearchParamsInterface>;
}

export default async function Page({ searchParams }: PageProps) {
  await AuthGuard.pageGuard(["ADMIN"]);

  const params = await extractSearchParams(searchParams);

  return (
    <div className="flex flex-col gap-3">
      <PageHeader
        title="Data Pengguna"
        icon={Sheet}
        actionButton={{
          title: "Tambah Data",
          tooltip: "Buka Halaman Formulir Tambah Data Pengguna",
          url: "/master-data/pengguna/tambah",
          icon: Plus,
        }}
      />

      <FilterTable
        sortBy={params.sortBy}
        sortType={params.sortType}
        sortField={sortFieldPengguna}
      />

      <Suspense
        key={Object.values(params).join("")}
        fallback={<TableSkeleton />}
      >
        <DaftarPengguna params={params} />
      </Suspense>
    </div>
  );
}
