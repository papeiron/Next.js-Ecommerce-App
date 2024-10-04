'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Input from './Input';
import SubmitButton from './SubmitButton';
import { MdArrowDropDown, MdOutlineSearch } from 'react-icons/md';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PriceRange: React.FC = () => {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const filterParam = params.get('filter');
    const filters = filterParam ? filterParam.split(',') : [];

    const minPriceFilter = filters.find((f) => f.startsWith('minPrice:'));
    const maxPriceFilter = filters.find((f) => f.startsWith('maxPrice:'));

    setMinPrice(minPriceFilter ? minPriceFilter.split(':')[1] : '');
    setMaxPrice(maxPriceFilter ? maxPriceFilter.split(':')[1] : '');
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilters();
  };

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams);
    const currentFilter = params.get('filter') || '';
    const filters = currentFilter ? currentFilter.split(',') : [];

    // del existing price filters
    const updatedFilters = filters.filter(
      (f) => !f.startsWith('minPrice:') && !f.startsWith('maxPrice:'),
    );

    if (minPrice) updatedFilters.push(`MinPrice:${minPrice}`);
    if (maxPrice) updatedFilters.push(`MaxPrice:${maxPrice}`);

    if (updatedFilters.length > 0) {
      params.set('filter', updatedFilters.join(','));
    } else {
      params.delete('filter');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
        setter(value);
      }
    };

  const isSubmitDisabled = !minPrice && !maxPrice;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">
          Price <MdArrowDropDown className="h-4 w-4" />
        </AccordionTrigger>
        <AccordionContent className="mx-auto w-[75px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center justify-center gap-2"
          >
            <Input
              name="minPrice"
              id="minPrice"
              placeholder="min."
              type="number"
              value={minPrice}
              onChange={handlePriceChange(setMinPrice)}
              className="w-20"
            />
            <Input
              name="maxPrice"
              id="maxPrice"
              placeholder="max."
              type="number"
              value={maxPrice}
              onChange={handlePriceChange(setMaxPrice)}
              className="w-20"
            />
            <SubmitButton
              noValue={isSubmitDisabled}
              className={`flex h-[37px] items-center justify-center bg-gray-300 px-2 active:bg-gray-200 ${
                isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <MdOutlineSearch className="h-6 w-6" />
            </SubmitButton>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceRange;
