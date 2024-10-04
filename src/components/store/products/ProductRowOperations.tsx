import toast from 'react-hot-toast';

import { deleteProduct } from '@/actions/store';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryForSidebar, ProductForTable } from '@/types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import NewProductUpdateForm from './NewProductUpdateForm';

function ProductRowOperations({
  product,
  categories,
}: {
  product: ProductForTable;
  categories: CategoryForSidebar[];
}) {
  const handleClick = async () => {
    const formState = await deleteProduct(product.id, {});
    if (formState.success && formState.success.message) {
      toast.success(formState.success.message);
    }
  };

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDotsVertical className="h-[15px] w-[15px] cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem>
              <DialogTrigger className="flex w-full cursor-pointer items-center gap-3">
                <MdOutlineModeEdit className="h-[15px] w-[15px]" /> Edit
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={handleClick}
                className="flex cursor-pointer items-center gap-3"
              >
                <MdOutlineDelete className="h-[15px] w-[15px]" /> Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent
          className="max-h-[80vh] max-w-[60rem] overflow-y-auto"
          aria-describedby="edit-product-description"
        >
          <DialogTitle>Edit a product</DialogTitle>
          <div>
            <NewProductUpdateForm categoriesData={categories} productToEdit={product} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductRowOperations;
