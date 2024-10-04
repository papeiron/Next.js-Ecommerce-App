'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button, Input } from '@/components/shared/ui';
import { useCartContext } from '@/contexts/CartContext';
import { findValidCoupons, roundToTwoDecimals } from '@/lib/utils';
import { Coupon } from '@prisma/client';
import toast from 'react-hot-toast';
import { MdOutlineArrowRightAlt, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

type ValidCouponsType = {
  categoryCoupons: Coupon[];
  productCoupon: Coupon | null;
}[];

function TotalPrice() {
  const [couponProvidedByUser, setCouponProvidedByUser] = useState<string>('');
  const {
    totalPrice,
    totalSaving,
    priceAfterCoupon,
    updateValidCoupons,
    cart,
    validCoupons,
  } = useCartContext();

  const handleCoupon = () => {
    const verifiedCoupons = cart?.cart_items
      .map((item) => findValidCoupons(item.product, couponProvidedByUser))
      .filter(
        (result): result is NonNullable<ReturnType<typeof findValidCoupons>> =>
          result !== null,
      );

    if (verifiedCoupons && verifiedCoupons?.length > 0) {
      updateValidCoupons(verifiedCoupons);
      toast.success('Your coupon code has been applied successfully.');
    } else {
      updateValidCoupons(null);
      toast.error('No such coupon code was found.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <label>Do you have a code?</label>
          <div className="relative flex w-48">
            <Input
              placeholder="Coupon code"
              className="gap-0"
              name="coupon"
              type="text"
              onChange={(e) => setCouponProvidedByUser(e.target.value)}
              value={couponProvidedByUser}
            />
            <Button
              onClick={handleCoupon}
              el="button"
              className="absolute -right-3 flex items-center rounded-[50%] p-2.5"
            >
              <MdOutlineArrowRightAlt className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="mt-4">
          <Link href="/products" className="flex items-center font-semibold">
            <MdOutlineKeyboardArrowLeft className="h-5 w-5" />
            <p>Continue shopping</p>
          </Link>
        </div>
        <div className="ml-auto flex w-[290px] flex-col items-center gap-2">
          {totalSaving > 0 && (
            <div className="flex w-full justify-between">
              <p className="text-xs">Discounts</p>
              <p className="text-xs font-semibold text-orange-1">
                - ${roundToTwoDecimals(totalSaving - (priceAfterCoupon || 0))}
              </p>
            </div>
          )}

          {validCoupons && validCoupons.length > 0 && (
            <div className="w-[290px]">
              {validCoupons.map((coupon) =>
                coupon.categoryCoupons.map((coupon) => (
                  <div key={coupon.id} className="flex justify-between">
                    <p className="text-xs">Coupon Code: {coupon.code}</p>
                    <p className="text-xs font-semibold text-orange-1">
                      - ${coupon.discount_amount}
                    </p>
                  </div>
                )),
              )}

              {validCoupons.map(
                (coupon) =>
                  coupon.productCoupon && (
                    <div key={coupon.productCoupon?.id} className="flex justify-between">
                      <p className="text-xs">Coupon Code: {coupon.productCoupon?.code}</p>
                      <p className="text-xs font-semibold text-orange-1">
                        - ${coupon.productCoupon?.discount_amount}
                      </p>
                    </div>
                  ),
              )}
            </div>
          )}
          {totalSaving > 0 && (
            <div className="flex w-full justify-between">
              <p className="text-xs">Total savings</p>
              <p className="text-xs font-semibold text-orange-1">
                - ${roundToTwoDecimals(totalSaving)}
              </p>
            </div>
          )}
          <div className="flex w-full justify-between">
            <p className="text-xl">Total</p>
            <p className="text-xl font-semibold text-orange-1">
              ${roundToTwoDecimals(totalPrice)}
            </p>
          </div>
          <Button el="anchor" href="/cart/checkout" className="ml-auto w-72 text-center">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TotalPrice;
