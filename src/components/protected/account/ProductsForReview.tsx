import Image from 'next/image';
import Link from 'next/link';

import { Rating } from '@/components/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { currentUser } from '@/lib/helpers';
import { fetchOrdersWithoutReviewsByUser } from '@/lib/services/order';
import { calculateTotalProductRating, formatDate } from '@/lib/utils';
import NewReviewForm from './NewReviewForm';

async function ProductsForReview() {
  const user = await currentUser();

  const orders = await fetchOrdersWithoutReviewsByUser(user?.id as string);

  return (
    <div className="grid grid-cols-2 gap-3">
      {orders.flatMap((o) =>
        o.orderItems.map((i) => (
          <div
            key={`${i.id}-${i.product.id}`}
            className="flex gap-x-3 rounded-md border p-3"
          >
            <Link href={`/p/${i.product.slug}`} className="relative h-28 w-[15%]">
              <Image
                src={i.product.image[0].url || ''}
                alt={i.product.image[0].alt || 'Product Image'}
                fill
                className="object-contain"
              />
            </Link>
            <div className="flex h-full w-[85%] flex-col gap-3">
              <Link href={`/p/${i.product.slug}`} className="flex flex-col gap-y-1">
                <p>
                  <span className="font-semibold">{i.product.brand}</span>{' '}
                  {i.product.name}
                </p>
                <div className="flex items-center gap-x-1">
                  <p className="text-xs">{i.product.reviews.map((r) => r.rating)}</p>
                  <Rating
                    editable={false}
                    size={5}
                    value={calculateTotalProductRating(i.product.reviews)}
                  />
                  <p className="soft-text text-xs">({i.product.reviews.length})</p>
                </div>

                <p className="text-xs">
                  {' '}
                  <span className="font-semibold">Delivery date: </span>{' '}
                  {formatDate(i.updated_at)}
                </p>
              </Link>
              <div className="mt-2">
                <Dialog>
                  <DialogTrigger className="rounded-md border border-orange-1 bg-transparent px-4 py-2 text-orange-1 active:bg-gray-50">
                    Rate the product
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rate the product</DialogTitle>
                    </DialogHeader>
                    <div>
                      <NewReviewForm product={i.product} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )),
      )}
    </div>
  );
}

export default ProductsForReview;
