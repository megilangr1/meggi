import PageHeader from "@/app/(private)/_components/page-header";
import { AuthGuard } from "@/lib/core/auth/auth-guard";
import { ArrowLeft, Sheet } from "lucide-react";
import FormulirPengguna from "../_components/formulir-pengguna";
import prisma from "@/lib/core/prisma/prisma";

export default async function Page() {
  await AuthGuard.pageGuard(["ADMIN"]);

  const dataRoles = await prisma.role.findMany({
    where: {
      name: {
        not: "MEGGI",
      },
    },
  });

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

      <FormulirPengguna dataRoles={dataRoles} />
    </div>
  );
}
