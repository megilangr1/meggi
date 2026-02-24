import { AuthGuard } from "@/lib/core/auth/auth-guard";
import PageHeader from "../../_components/page-header";
import { Plus, Sheet } from "lucide-react";
import DaftarPengguna from "./_components/daftar-pengguna";

export default async function Page() {
  await AuthGuard.pageGuard(["ADMIN"]);

  return (
    <div className="flex flex-col gap-2">
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

      <DaftarPengguna />
    </div>
  );
}
