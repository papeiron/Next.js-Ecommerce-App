import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SelectItems = { id: string; name: string };

type SubCategoryInput = {
  onSelectChange: (s: string) => void;
  selectedSubCategory: string[];
  selectItems: SelectItems[];
};

function SubCategoryInput({
  onSelectChange,
  selectedSubCategory,
  selectItems,
}: SubCategoryInput) {
  let subCatToBeShow = selectItems.filter(
    (item) => selectedSubCategory && selectedSubCategory.includes(item.id),
  );

  return (
    <div className="w-full">
      {subCatToBeShow.length > 0 ? (
        <div className="flex gap-2">
          {subCatToBeShow.map((sub) => (
            <div key={sub?.name} className="cursor-pointer rounded-md border px-3 py-2">
              {sub?.name}
            </div>
          ))}
        </div>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-1 flex w-full justify-between rounded-md border p-2.5 text-start">
          Select subcategories
          <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[811px]">
          {selectItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onSelectChange(item.id)}
              className={`flex cursor-pointer gap-2 ${selectedSubCategory.includes(item.id) ? 'bg-gray-100' : ''}`}
            >
              {selectedSubCategory.includes(item.id) ? (
                <Check className="h-4 w-4" />
              ) : (
                <div className="h-4 w-4"> </div>
              )}

              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SubCategoryInput;
