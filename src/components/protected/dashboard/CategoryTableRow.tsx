import { TableCell, TableRow } from '@/components/ui/table';
import { formatDateSecondary } from '@/lib/utils';
import { CategoryForSidebar } from '@/types';

type CategoryTableRowProps = {
  category: CategoryForSidebar;
  index: number;
};

function CategoryTableRow({ category, index }: CategoryTableRowProps) {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{category.name}</TableCell>
      {/* TODO: Active column. */}
      <TableCell>{category.isActive ? 'yes' : 'no'} </TableCell>
      <TableCell>{formatDateSecondary(category.created_at)}</TableCell>
      <TableCell>{formatDateSecondary(category.updated_at)}</TableCell>
    </TableRow>
  );
}

export default CategoryTableRow;
