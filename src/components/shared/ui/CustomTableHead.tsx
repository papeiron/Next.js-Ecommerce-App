'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { TableHead } from '../../ui/table';

import { RxCaretSort, RxCaretUp, RxCaretDown } from 'react-icons/rx';

type CustomTableHead = {
  tableHead: {
    value: string;
    label: string;
    sortable?: boolean;
  };
};

function CustomTableHead({ tableHead }: CustomTableHead) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleClick = (head: string) => {
    if (['image', 'id', ' '].includes(head)) return;
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    const column = head.toLowerCase();

    if (currentSort === column) {
      params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sort', column);
      params.set('order', 'asc');
    }

    router.replace(`${path}?${params.toString()}`);
  };

  const isAsc =
    searchParams.get('order') === 'asc' &&
    searchParams.get('sort') === tableHead.value.toLowerCase();

  const isDesc =
    searchParams.get('order') === 'desc' &&
    searchParams.get('sort') === tableHead.value.toLowerCase();

  return (
    <TableHead>
      <button
        className="flex cursor-pointer items-center gap-1"
        onClick={() => handleClick(tableHead.value)}
        disabled={!tableHead.sortable}
      >
        {tableHead.sortable && !isAsc && !isDesc ? (
          <RxCaretSort className="h-4 w-4" />
        ) : null}
        {tableHead.label}
        {isAsc && <RxCaretUp className="inline h-4 w-4" />}
        {isDesc && <RxCaretDown className="inline h-4 w-4" />}
      </button>
    </TableHead>
  );
}

export default CustomTableHead;
