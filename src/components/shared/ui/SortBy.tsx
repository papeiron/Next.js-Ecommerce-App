'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SortOption = {
  label: string;
  value: string;
};

type SortByProps = {
  options: SortOption[];
  label?: React.ReactNode;
};

function SortBy({ options, label = 'Sort By' }: SortByProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentSort = searchParams.get('sort');

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);

    const newUrl = `${pathname}?${params.toString()}`;

    router.push(newUrl);
  };

  const getCurrentSortLabel = () => {
    const option = options.find((opt) => opt.value === currentSort);
    return option ? option.label : 'Sorting';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-52 items-center justify-between gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
        {getCurrentSortLabel()}
        <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSort(option.value)}
            className="flex cursor-pointer items-center justify-between gap-2"
          >
            <p>{option.label}</p>

            <p>{currentSort === option.value && <span>✓</span>}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortBy;
