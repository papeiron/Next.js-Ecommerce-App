'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { X } from 'lucide-react';

function FilterClean() {
  const [filters, setFilters] = useState<
    { filter: string; value: string }[] | undefined
  >();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const filter = searchParams.get('filter');

    const editedFilters = filter?.split(',').map((f) => {
      return {
        filter: f.split(':')[0],
        value: f.split(':')[1],
      };
    });

    setFilters(editedFilters);
  }, [searchParams]);

  const handleFilters = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.get('filter')?.split(',');
    const selFilterToDel = `${filter}:${value}`;

    let newFilters = currentFilters?.filter((filt) => filt !== selFilterToDel);

    if (newFilters && newFilters.length > 0) params.set('filter', newFilters?.join(','));
    else {
      params.delete('filter');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if (!filters) {
    return null;
  }

  return (
    <>
      <div className="border-b-[1px]"></div>
      <div className="cursor-pointer rounded-lg bg-white py-4">
        <p className="mb-5 flex items-center font-bold text-orange-800">
          <span className="mr-2 h-2 w-2 rounded-full bg-orange-500"></span>
          Selected Filters
        </p>
        <ul className="flex flex-wrap gap-2">
          {filters?.map((f, index) => (
            <li
              key={index}
              className="flex items-center gap-2 rounded-full border border-orange-200 px-3 py-1.5 text-sm transition-all hover:bg-orange-50"
              onClick={() => {
                handleFilters(f.filter, f.value);
                let newFilters = filters.filter((item) => item.filter !== f.filter);
                setFilters(newFilters);
              }}
            >
              <span className="font-medium text-orange-700">{f.filter}:</span>
              <span className="text-gray-700">{f.value}</span>
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FilterClean;
