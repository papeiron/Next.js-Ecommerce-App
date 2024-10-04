'use client';

import { deleteReview } from '@/actions/account';
import { Rating } from '@/components/shared/ui';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';
import { ReviewForAccount } from '@/types/Review';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const ReviewShowCard = ({ review }: { review: ReviewForAccount }) => {
  const [formState, action] = useFormState(deleteReview.bind(null, review.id), {
    error: {},
  });
  const router = useRouter();

  useEffect(() => {
    if (formState.error && formState.error.message) {
      toast.error(formState.error.message[0]);
    } else if (formState.success && formState.success.message) {
      toast.success(formState.success.message);
      router.refresh();
    }
  }, [formState, router]);

  return (
    <div className="mb-6 flex min-w-96 gap-6 rounded-lg border bg-white p-6 transition-all duration-300 hover:shadow-sm">
      <div className="flex-[90%]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{review.product.name}</h3>
          <Rating value={review.rating} editable={false} size={5} />
        </div>
        <p className="mb-4 text-gray-600">{review.comment}</p>
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
          <div className="mb-2 flex items-center sm:mb-0">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(review.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-[10%] items-center justify-center">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical className="h-[15px] w-[15px] cursor-pointer text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              {/* TODO: Add edit */}
              {/* <DropdownMenuItem>
                <DialogTrigger className="flex w-full cursor-pointer items-center gap-3">
                <MdOutlineModeEdit className="h-[15px] w-[15px]" /> Edit
                </DialogTrigger>
                </DropdownMenuItem> */}
              <DropdownMenuItem>
                <form action={action}>
                  <button className="flex cursor-pointer items-center gap-3">
                    <MdOutlineDelete className="h-[15px] w-[15px]" /> Delete
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <DialogContent
            className="max-h-[80vh] max-w-[60rem] overflow-y-auto"
            aria-description="edit-product-description"
            >
            <DialogTitle>Edit a product</DialogTitle>
            </DialogContent> */}
        </Dialog>
      </div>
    </div>
  );
};

export default ReviewShowCard;
