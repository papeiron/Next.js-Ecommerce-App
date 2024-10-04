import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CategoryForSidebar } from '@/types';

function SidebarCategoryItem({ category }: { category: CategoryForSidebar }) {
  let currentCatProductCount;

  if (category.sub_categories.length === 0 && category.products) {
    currentCatProductCount = category.products.length;
  } else {
    currentCatProductCount = category.sub_categories.reduce(
      (total, sub) => (total += sub._count.products),
      0,
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full text-gray-custom-3">
      <AccordionItem value="item-1">
        <AccordionTrigger className="pb-0 pt-0 font-semibold data-[state=open]:text-gray-custom-1">
          {category.name}
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-3">
          <ul className="flex flex-col gap-3 px-6">
            <Link
              href={`/c/${category.slug}`}
              className="flex justify-between font-semibold text-gray-custom-1"
            >
              <p>All</p>
              <p>{currentCatProductCount}</p>
            </Link>
            {category.sub_categories?.map((subCategory) => (
              <Link
                href={`/c/${subCategory.slug}`}
                key={subCategory.id}
                className="flex justify-between font-semibold"
              >
                <p>{subCategory.name}</p>
                <p>{subCategory._count.products}</p>
              </Link>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SidebarCategoryItem;
