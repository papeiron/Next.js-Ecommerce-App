'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CategoryForSidebar } from '@/types/Category';

import { MdArrowDropDown } from 'react-icons/md';

type SidebarCategoryAttItemProps = {
  categoryAttribute: CategoryForSidebar['attributes'][number];
};

function SidebarCategoryAttItem({ categoryAttribute }: SidebarCategoryAttItemProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { category_attribute } = categoryAttribute;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const filterParam = params.get('filter');
    const filters = filterParam ? filterParam.split(',') : [];

    const initialCheckedItems: { [key: string]: boolean } = {};
    if (category_attribute.type === 'multi-select') {
      category_attribute.product_attributes.forEach((attr) => {
        attr.value.split(',').forEach((val) => {
          initialCheckedItems[val.trim()] = filters.includes(
            `${category_attribute.name}:${val.trim()}`,
          );
        });
      });
    } else {
      category_attribute.product_attributes.forEach((attr) => {
        initialCheckedItems[attr.value] = filters.includes(
          `${category_attribute.name}:${attr.value}`,
        );
      });
    }
    setCheckedItems(initialCheckedItems);
  }, [searchParams, category_attribute]);

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentFilter = params.get('filter') || '';
    const filters = currentFilter ? currentFilter.split(',') : [];
    const newFilter = `${category_attribute.name}:${value}`;

    let newFilters;
    if (filters.includes(newFilter)) {
      newFilters = filters.filter((f) => f !== newFilter);
    } else {
      newFilters = [...filters, newFilter];
    }

    if (newFilters.length > 0) {
      params.set('filter', newFilters.join(','));
    } else {
      params.delete('filter');
    }

    const newUrl = `${pathname}?${params.toString()}`;

    router.push(newUrl);
  };

  let uniqueValues: string[] = [];
  if (category_attribute.type === 'multi-select') {
    uniqueValues = Array.from(
      new Set(
        category_attribute.product_attributes
          .flatMap((pA) => pA.value.split(','))
          .map((val) => val.trim())
          .filter((val) => val !== ''),
      ),
    ).sort();
  } else {
    uniqueValues = Array.from(
      new Set(
        category_attribute.product_attributes
          .map((pA) => pA.value)
          .filter((value): value is string => value !== null && value !== ''),
      ),
    ).sort();
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-4 font-bold">
          {category_attribute.name} <MdArrowDropDown className="h-4 w-4" />
        </AccordionTrigger>
        <AccordionContent>
          <ul className="px-1">
            {uniqueValues.map((value) => (
              <li
                key={value}
                className="flex cursor-pointer items-center space-x-2 rounded-md px-1.5 py-1 hover:bg-gray-custom-4"
                onClick={() => {
                  handleFilter(value);
                  setCheckedItems((prev) => ({
                    ...prev,
                    [value]: !prev[value],
                  }));
                }}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border border-gray-custom-3 transition-colors duration-200 ease-in-out ${
                    checkedItems[value] ? 'border-orange-1 bg-orange-1' : 'bg-white'
                  } `}
                >
                  {checkedItems[value] && (
                    <svg className="h-2 w-2 fill-current text-white" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </span>
                <span className="pointer-events-none text-gray-700">{value}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SidebarCategoryAttItem;
