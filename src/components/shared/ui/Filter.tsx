'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Filter = {
  label: string;
  value: string;
};

type FilterByProps = {
  filterName: string;
  filters: Filter[];
  label: React.ReactNode;
};

function Filter({ filterName, filters, label }: FilterByProps) {
  const searchParams = useSearchParams();
  const currentFilters = searchParams.getAll(filterName);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (currentFilters.includes(query)) {
      params.delete(filterName);
      currentFilters
        .filter((v) => v !== query)
        .forEach((v) => params.append(filterName, v));
    } else {
      params.append(filterName, query);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl border px-1 py-1.5">
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {filters.map((filter) => (
          <DropdownMenuItem
            key={filter.value}
            onClick={() => handleFilter(filter.value)}
            className="cursor-pointer"
          >
            {filter.label}
            <p className="ml-auto">{currentFilters.includes(filter.value) && '✓'}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Filter;
