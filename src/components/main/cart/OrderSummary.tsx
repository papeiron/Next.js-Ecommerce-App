'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ProductPriceDisplay } from '@/components/shared/ui';
import { useCartContext } from '@/contexts/CartContext';
import { roundToTwoDecimals } from '@/lib/utils';
import React from 'react';

type SelectedAttribute = {
  val: string;
  attName: string;
};

function OrderSummary() {
  const { totalPrice, shippingCosts, cart } = useCartContext();

  const shippingTotal = Object.values(shippingCosts).reduce(
    (cost, sum) => (sum += cost),
    0,
  );

  const finalTotal = totalPrice + shippingTotal;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 border-b-[1px] border-gray-200 pb-1">
        <p className="font-semibold text-gray-500">YOUR ORDER</p>
        <Link href="/cart" className="text-[10px] font-semibold text-gray-400">
          EDIT SHOPPING CART
        </Link>
      </div>
      <div className="my-2">
        {cart?.cart_items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b py-3">
            <Link href={`/p/${item.product.slug}`} className="relative h-20 flex-[15%]">
              <Image
                src={item.product.image[0].url || ''}
                alt={item.product.image[0].alt || 'Product Image'}
                fill
                className="object-contain"
              />
            </Link>
            <Link href={`/p/${item.product.slug}`} className="flex-[60%]">
              <p>
                <span className="font-semibold">{item.product.brand} </span>
                {item.product.name}
              </p>
              <div className="flex gap-3 text-gray-400">
                {(item.selected_attributes as SelectedAttribute[])?.map((att, index) => (
                  <p key={index} className="text-gray-400">
                    {att.attName} : {att.val}
                  </p>
                ))}
              </div>
            </Link>
            <div className="flex-[10%]">
              <p className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border">
                {item.quantity}
              </p>
            </div>
            <div className="flex-[15%]">
              <ProductPriceDisplay
                product={item.product}
                quantity={item.quantity}
                showOldPrice={false}
                showTotalSavings={false}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between text-xs">
          <p>Subtotal</p>
          <p className="font-semibold text-orange-1">${roundToTwoDecimals(totalPrice)}</p>
        </div>
        <div className="flex justify-between text-xs">
          <p>Shipping</p>
          <div className="flex gap-3 font-semibold text-orange-1">
            {Object.values(shippingCosts).map((cost, index) => (
              <p key={index}>${roundToTwoDecimals(cost)}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-xl">Order Total</p>

          <p className="text-xl font-semibold text-orange-1">
            ${roundToTwoDecimals(finalTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
