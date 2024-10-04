'use client';

import { useEffect, useState } from 'react';

import { Category } from '@prisma/client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { SelectedCategories } from './NewProductUpdateForm';
import { CategoryWith } from '@/types';
import {
  MdOutlineSubdirectoryArrowRight,
  MdOutlineDelete,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from 'react-icons/md';
import { MiniSpinner } from '@/components/shared/ui';

type HierarchicalCategorySelectorProps = {
  mainCategories: Category[];
  onCategoryChange: ({ catId, catSlug, catName }: SelectedCategories) => void;
  selectedCategories: SelectedCategories[];
  onDeleteCategories: () => void;
};

const HierarchicalCategorySelector = ({
  mainCategories,
  onCategoryChange,
  selectedCategories,
  onDeleteCategories,
}: HierarchicalCategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<CategoryWith<'sub_categories'>>();
  const [isLoading, setIsLoading] = useState<boolean | null>();
  const [error, setError] = useState<string | null>(null);

  const lastSelectedCategory =
    selectedCategories.length > 0
      ? selectedCategories[selectedCategories.length - 1]
      : null;

  useEffect(() => {
    const fetchSubCategories = async () => {
      setIsLoading(true);
      setError(null);

      const slug = lastSelectedCategory?.catSlug;

      try {
        const response = await fetch(`/api/categories/${slug}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const category = await response.json();

        setSubCategories(category);
      } catch (err) {
        setError('Error fetching category');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (selectedCategories.length > 0) fetchSubCategories();
    // eslint-disable-next-line
  }, [selectedCategories]);

  return (
    <div>
      <div className="relative mb-2 flex flex-col justify-between gap-2">
        <div className="absolute -left-6 top-1">
          {selectedCategories.length > 0 && (
            <button onClick={onDeleteCategories} className="flex items-center gap-1">
              <MdOutlineDelete className="h-5 w-5 fill-orange-1" />
            </button>
          )}
        </div>

        {selectedCategories.length > 0 &&
          selectedCategories.map((scat, index) => (
            <div key={scat.catId} className="flex">
              <MdOutlineSubdirectoryArrowRight
                className={`${index === 0 && 'hidden'} ml-${index} fill-orange-1`}
              />
              <div className="cursor-pointer rounded-md border p-1">{scat.catName}</div>
            </div>
          ))}
      </div>
      <Command className="relative rounded-lg border">
        <div className="absolute right-2 top-2.5">
          <button type="button" onClick={() => setOpen((prev) => !prev)}>
            {open ? (
              <MdOutlineArrowDropDown className="h-5 w-5" />
            ) : (
              <MdOutlineArrowDropUp className="h-5 w-5" />
            )}
          </button>
        </div>
        <CommandInput placeholder="Search for categories" onFocus={() => setOpen(true)} />
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Categories">
              {mainCategories.map((cat) => (
                <CommandItem
                  key={cat.id}
                  onSelect={() => {
                    onCategoryChange({
                      catId: cat.id,
                      catSlug: cat.slug,
                      catName: cat.name,
                    });
                  }}
                  disabled={selectedCategories.some(
                    (scat) => !scat.catId.includes(cat.id),
                  )}
                >
                  {cat.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Subcategories">
              {isLoading ? (
                <div>
                  <MiniSpinner />
                </div>
              ) : (
                subCategories?.sub_categories.map((cat) => (
                  <CommandItem
                    key={cat.id}
                    onSelect={() => {
                      onCategoryChange({
                        catId: cat.id,
                        catSlug: cat.slug,
                        catName: cat.name,
                      });
                    }}
                  >
                    {cat.name}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </div>
      </Command>
    </div>
  );
};

export default HierarchicalCategorySelector;
