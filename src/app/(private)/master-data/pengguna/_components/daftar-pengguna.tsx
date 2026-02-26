import DeleteButton from "@/components/helpers/table/delete-button";
import PaginationTable from "@/components/helpers/table/pagination-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IndexPengguna } from "@/lib/actions/action-pengguna";
import { BasicParams } from "@/lib/helpers/extract-search-params";
import { generateRowNumber } from "@/lib/helpers/main-helper";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface DaftarPenggunaProps {
  params: BasicParams;
}

export default async function DaftarPengguna({ params }: DaftarPenggunaProps) {
  const { users, total, limit, page } = await IndexPengguna(params);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full grid grid-cols-1 border rounded-md">
        <Table className="min-w-xl">
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Hak Akses</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((v, index) => (
              <TableRow key={v.id}>
                <TableCell>
                  {generateRowNumber(params.page, params.limit, index)}.
                </TableCell>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.email}</TableCell>
                <TableCell>
                  {v.userRoles.map((v) => v.role.name).join(", ")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="size-auto p-0">
                          <span className="sr-only">Buka Opsi</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi Data</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/master-data/pengguna/${v.id}/edit`}>
                          <DropdownMenuItem className="cursor-pointer">
                            Edit Data
                          </DropdownMenuItem>
                        </Link>
                        <DeleteButton id={v.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-x-1 gap-y-3">
        <div className="flex-auto flex items-center justify-start">
          <Badge className="text-[10px] tracking-wider rounded-sm py-2 px-3">
            Total {total.toLocaleString("id-ID")} Data
          </Badge>
        </div>
        <div className="flex p-2 border rounded-sm max-w-full overflow-x-auto">
          <PaginationTable
            currentPage={page}
            totalPage={Math.ceil(total / limit)}
          />
        </div>
      </div>
    </div>
  );
}
