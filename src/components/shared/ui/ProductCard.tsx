import { teko } from '@/lib/fonts';
import Link from 'next/link';

import {
  calculateTotalProductRating,
  capitalizeOnlyFirstLetter,
  cn,
  discountCheckIfEnded,
} from '@/lib/utils';
import { ProductForList } from '@/types/Product';
import AutoPlayCarousel from './AutoPlayCarousel';
import ProductPriceDisplay from './ProductPriceDisplay';
import Rating from './Rating';
import { Tag } from 'lucide-react';

function ProductCard({
  product,
  className,
  imgClass,
}: {
  product: ProductForList;
  className?: string;
  imgClass?: string;
}) {
  const categoryWithDiscount = product.categories.find(
    (cat) => cat.category.discount_id,
  )?.category;

  return (
    <div
      className={cn(
        `h-full w-full overflow-hidden rounded-xl border bg-white pl-0 hover:shadow-sm`,
        className,
      )}
    >
      <Link href={`/p/${product.slug}`} className="flex h-full flex-col gap-2">
        <div className="relative flex-1 overflow-hidden">
          <AutoPlayCarousel
            images={product.image}
            imageHeight={`h-[162px] ${imgClass ? imgClass : ''}`}
            opts={{ loop: true, autoplayInterval: 4500 }}
            imageSettings="object-contain"
          />
          {product?.discount && discountCheckIfEnded(product?.discount.end_date) && (
            <div className="absolute left-2 top-2 animate-pulse">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                <div className="flex flex-col items-center">
                  <Tag size={16} />
                  <span className="text-xs font-bold">SALE</span>
                </div>
              </div>
            </div>
          )}
          <div>
            {product?.discount && discountCheckIfEnded(product?.discount.end_date) && (
              <div className="absolute right-2 top-14 flex h-10 w-10 items-center justify-center text-wrap rounded-full border-2 border-purple-900 bg-purple-500 p-1 shadow-lg ring-2 ring-purple-300 ring-opacity-50">
                <p
                  className={`text-ellipsis text-center text-base leading-3 text-white ${teko.className}`}
                >
                  {capitalizeOnlyFirstLetter(product.name)} deals
                </p>
              </div>
            )}
            {categoryWithDiscount?.discount &&
              discountCheckIfEnded(categoryWithDiscount?.discount.end_date) && (
                <div className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center text-wrap rounded-full border-2 border-purple-900 bg-purple-500 p-1 shadow-lg ring-2 ring-purple-300 ring-opacity-50">
                  <p
                    className={`text-ellipsis text-center text-base leading-3 text-white ${teko.className}`}
                  >
                    {capitalizeOnlyFirstLetter(categoryWithDiscount.name)} deals
                  </p>
                </div>
              )}
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-1.5 px-3">
          <p className="line-clamp-2 text-ellipsis">
            <span className="font-semibold">{product.brand}</span>
            &nbsp;
            {product.name}
          </p>
          {product.reviews && product.reviews?.length > 0 && (
            <div className="flex items-center gap-2">
              <Rating
                value={calculateTotalProductRating(product.reviews)}
                editable={false}
                size={5}
              />
              <p className="text-[11px]">({product.reviews?.length})</p>
            </div>
          )}

          <ProductPriceDisplay product={product} />
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
