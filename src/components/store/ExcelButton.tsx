'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { handleExportExcel } from '@/lib/helpers';
import { RiFileExcel2Line } from 'react-icons/ri';

function ExcelButton() {
  const handleClick = () => {
    handleExportExcel();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl bg-orange-1 px-4 py-2 text-white active:bg-orange-400">
        Export
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Export by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClick} className="flex cursor-pointer gap-2">
          <RiFileExcel2Line className="h-[15px] w-[15px]" /> Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExcelButton;
