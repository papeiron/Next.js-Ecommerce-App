'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { CategoryWith } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type DropdownNavMenuProps = {
  categories: CategoryWith<'sub_categories'>[];
};

function DropdownNavMenu({ categories }: DropdownNavMenuProps) {
  return (
    <NavigationMenu className="items-end">
      <NavigationMenuList className="flex min-h-full space-x-2">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="h-full border-b-2 border-white px-4 py-2 font-semibold data-[state=open]:border-orange-1 data-[state=open]:text-orange-1">
              {category.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="h-[255px] w-[510px] rounded-lg bg-white p-4 shadow-lg">
                <div className="flex h-full w-full gap-2">
                  {/* <div className="min-h-full w-[25%]">
                    <NavigationMenuLink asChild className="h-full w-full">
                      <Link
                        className="flex flex-col rounded-md p-4 transition-colors hover:bg-gray-50"
                        href={`/c/${category.slug}`}
                      >
                        <h3 className="mb-2 flex-[15%] text-center text-lg font-bold text-orange-1">
                          {category.name}
                        </h3>
                        <div className="relative h-full w-full flex-[85%]">
                          {category.image && (
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="mx-auto mb-4 rounded-md object-contain"
                            />
                          )}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div> */}
                  <div className="grid min-h-full w-[75%] grid-cols-3">
                    {category.sub_categories.map((subCategory) => (
                      <NavigationMenuLink key={subCategory.id} asChild>
                        <Link
                          className="block h-28 w-28 rounded-md p-3 transition-colors hover:bg-gray-50"
                          href={`/c/${subCategory.slug}`}
                        >
                          {/* TODO: category.image */}
                          <div className="relative h-[80%] overflow-hidden rounded-md border">
                            <Image
                              src="https://fhnqpyisstbfjkvuzmvn.supabase.co/storage/v1/object/public/product-images/0.7791647919906255-467012495_.webp"
                              fill
                              alt="image"
                            />
                          </div>
                          <h4 className="mt-1 text-center text-xs font-semibold">
                            {subCategory.name}
                          </h4>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default DropdownNavMenu;
