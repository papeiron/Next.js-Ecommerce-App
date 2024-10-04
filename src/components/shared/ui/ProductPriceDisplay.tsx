import { calculatePriceWithDiscounts, roundToTwoDecimals } from '@/lib/utils';

type ProductPriceDisplayProps = {
  product: any;
  quantity?: number;
  showTotalSavings?: boolean;
  showOldPrice?: boolean;
  className?: string;
};

function ProductPriceDisplay({
  product,
  quantity = 1,
  showOldPrice = true,
  showTotalSavings = true,
  className,
}: ProductPriceDisplayProps) {
  const { finalPrice, oldPrice, discountPercentage } = calculatePriceWithDiscounts(
    product,
    quantity,
  );

  const hasDiscount = discountPercentage > 0;

  return (
    <div className={className}>
      {hasDiscount && showOldPrice && oldPrice !== finalPrice && (
        <div className="flex text-xs">
          <span className="mr-1 text-gray-400 line-through">
            ${roundToTwoDecimals(oldPrice)}
          </span>
          {discountPercentage > 0 && (
            <span className="font-semibold text-red-700">%{discountPercentage} off</span>
          )}
        </div>
      )}
      <p className="text-sm font-semibold text-orange-1">
        ${roundToTwoDecimals(finalPrice)}
      </p>

      {discountPercentage > 0 && showTotalSavings && (
        <p className="text-xs text-green-600">
          You save: ${roundToTwoDecimals(product.price - finalPrice)}
        </p>
      )}
    </div>
  );
}

export default ProductPriceDisplay;
