'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';
import { ITEMS_PER_PAGE } from '@/lib/constants';

function CustomPagination({
  totalPages,
  countOfProducts,
}: {
  totalPages: number;
  countOfProducts: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      return createPageURL(currentPage - 1);
    }
    return '#';
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      return createPageURL(currentPage + 1);
    }
    return '#';
  };

  return (
    <div className="relative flex justify-center py-2">
      <p className="absolute left-2 top-[25%] text-gray-400">
        showing {currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1} -{' '}
        {Math.min(currentPage * ITEMS_PER_PAGE, countOfProducts)} of {countOfProducts}{' '}
        results
      </p>
      <Pagination className="rounded-md bg-white">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={handlePreviousPage()}
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={createPageURL(index + 1)}
                isActive={index + 1 === currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={handleNextPage()}
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CustomPagination;
