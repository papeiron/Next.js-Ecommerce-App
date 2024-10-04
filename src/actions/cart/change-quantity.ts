'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { fetchCartByUser } from '@/lib/services/cart';
import { revalidateTag } from 'next/cache';

export type FormStateType = {
  error?: { message?: string[] };
  success?: { message?: string };
};

type ChangeQuantityProps = {
  value: number;
  productId: string;
  cartItemId: string;
  formState: FormStateType;
};

const changeQuantity = async ({
  value,
  productId,
  cartItemId,
  formState,
}: ChangeQuantityProps) => {
  const user = await currentUser();

  if (!user) {
    return { error: { message: ['You must be signed in to do this.'] } };
  }

  const cart = await fetchCartByUser(user.id as string);

  const isOwnProduct = cart?.cart_items.some((item) => {
    if (item.product_id === productId) {
      return true;
    }
  });

  if (!isOwnProduct) {
    return {
      error: {
        message: ['You do not have permission to do that.'],
      },
    };
  }

  try {
    await db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: value,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: {
          message: [err.message],
        },
      };
    } else {
      return {
        error: {
          message: ['Something went wrong.'],
        },
      };
    }
  }

  revalidateTag('cart');

  return {
    success: {
      message: 'Cart updated!',
    },
  };
};

export default changeQuantity;
