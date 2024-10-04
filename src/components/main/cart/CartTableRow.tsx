'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import ProductPriceDisplay from '@/components/shared/ui/ProductPriceDisplay';
import { TableCell, TableRow } from '@/components/ui/table';
import { CartWithDetails } from '@/types';

import { changeQuantity, deleteFromCart } from '@/actions/cart';
import { FormStateType } from '@/actions/cart/delete-from-cart';
import { useEffect, useState, useTransition } from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';

type SelectedAttribute = {
  val: string;
  attName: string;
};

type CartTableRowType = {
  item: CartWithDetails['cart_items'][number];
};

function CartTableRow({ item }: CartTableRowType) {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormStateType | undefined>();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleDelete = (productId: string, cartItemId: string) => {
    startTransition(async () => {
      let res = await deleteFromCart({ productId, cartItemId, formState: {} });

      setFormState(res);
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      handleDelete(item.product_id, item.id);
      return;
    }

    startTransition(async () => {
      const res = await changeQuantity({
        value: newQuantity,
        productId: item.product_id,
        cartItemId: item.id,
        formState: {},
      });
      setQuantity(newQuantity);
      setFormState(res);
    });
  };

  useEffect(() => {
    if (formState?.success && formState?.success.message) {
      toast.success(formState?.success.message);
    }
  }, [formState]);

  return (
    <TableRow className={`${isPending && 'animate-pulse blur-sm'}`}>
      <TableCell>
        <Link
          href={`/p/${item.product.slug}`}
          className="relative block h-[120px] rounded-md border bg-white"
        >
          <Image
            fill
            src={item.product.image[0].url}
            alt={item.product.image[0].alt || 'Product Image'}
            className="object-contain"
          />
        </Link>
      </TableCell>

      <TableCell>
        <Link href={`/p/${item.product.slug}`}>
          <div className="flex">
            <p>
              <span className="font-semibold">{item.product.brand}</span>{' '}
              {item.product.name}
            </p>
          </div>
          <div className="flex gap-3">
            {(item.selected_attributes as SelectedAttribute[]).map((att, index) => (
              <p key={index} className="text-gray-400">
                {att.attName} : {att.val}
              </p>
            ))}
          </div>
        </Link>
      </TableCell>

      <TableCell>
        <ProductPriceDisplay product={item.product} />
      </TableCell>
      <TableCell>
        <div className="flex w-16 items-center justify-center gap-2 rounded-md border bg-white px-5 py-1">
          <input
            className="max-w-full bg-transparent pl-1 outline-none"
            type="number"
            name="quantity"
            defaultValue={item.quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
          />
          <div className="flex flex-col">
            <button onClick={() => handleQuantityChange(quantity + 1)}>
              <MdOutlineArrowDropUp className="h-4 w-4" />
            </button>
            <button onClick={() => handleQuantityChange(quantity - 1)}>
              <MdOutlineArrowDropDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-semibold">
        <ProductPriceDisplay
          product={item.product}
          showOldPrice={false}
          showTotalSavings={false}
          quantity={item.quantity}
        />
      </TableCell>
      <TableCell>
        <button onClick={() => handleDelete(item.product_id, item.id)}>
          <RxCross1 className="text-gray-400" />
        </button>
      </TableCell>
    </TableRow>
  );
}

export default CartTableRow;
