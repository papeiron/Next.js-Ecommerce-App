import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '../../ui/skeleton';

export default function EmptyTableBody({
  rows,
  cols,
  tableHeaders,
}: {
  rows: number;
  cols: number;
  tableHeaders?: string[];
}) {
  return (
    <Table className="rounded-md bg-white">
      <TableCaption>A list of your recent products.</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHeaders?.map((col, index) => <TableCell key={index}>{col}</TableCell>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: cols }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-6 w-16" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
