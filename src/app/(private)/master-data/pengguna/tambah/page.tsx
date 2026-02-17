import PageHeader from "@/app/(private)/_components/page-header";
import { AuthGuard } from "@/lib/core/auth/auth-guard";
import { ArrowLeft, Sheet } from "lucide-react";

export default async function Page() {
  await AuthGuard.pageGuard(["ADMIN"]);

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="Data Pengguna - Tambah Data"
        icon={Sheet}
        actionButton={{
          title: "Kembali",
          tooltip: "Kembali Ke-Halaman Daftar Data Pengguna",
          url: "/master-data/pengguna",
          icon: ArrowLeft,
          variant: "destructive",
        }}
      />
    </div>
  );
}
