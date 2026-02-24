import PageHeader from "@/app/(private)/_components/page-header";
import { AuthGuard } from "@/lib/core/auth/auth-guard";
import { ArrowLeft, Sheet } from "lucide-react";
import FormulirPengguna from "../../_components/formulir-pengguna";
import prisma from "@/lib/core/prisma/prisma";
import { notFound } from "next/navigation";
import { userWithRolesArgs } from "@/lib/types/user-type";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await AuthGuard.pageGuard(["ADMIN"]);
  const { id } = await params;

  const editData = await prisma.user.findUnique({
    where: { id },
    ...userWithRolesArgs,
  });
  if (!editData) return notFound();

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
        title="Data Pengguna - Ubah Data"
        icon={Sheet}
        actionButton={{
          title: "Kembali",
          tooltip: "Kembali Ke-Halaman Daftar Data Pengguna",
          url: "/master-data/pengguna",
          icon: ArrowLeft,
          variant: "destructive",
        }}
      />

      <FormulirPengguna dataRoles={dataRoles} id={id} editData={editData} />
    </div>
  );
}
