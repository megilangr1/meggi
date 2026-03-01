import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="w-full flex items-center justify-center">
                <Skeleton className="h-6 bg-slate-200 w-full rounded-sm" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="w-full flex items-center justify-center">
                <Skeleton className="h-6 bg-slate-200 w-full rounded-sm" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <div className="w-full flex items-center justify-center">
                <Skeleton className="h-6 bg-slate-200 w-full rounded-sm" />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableSkeleton;
