'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { fetchCartByUser } from '@/lib/services/cart';
import { revalidateTag } from 'next/cache';

export type FormStateType = {
  error?: { message?: string[] };
  success?: { message?: string };
};

type DeleteFromCartProps = {
  cartItemId: string;
  productId: string;
  formState: FormStateType;
};

const deleteFromCart = async ({
  productId,
  cartItemId,
  formState,
}: DeleteFromCartProps): Promise<FormStateType> => {
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
        message: ['You do not have permission to do that'],
      },
    };
  }

  try {
    await db.cartItem.delete({
      where: {
        id: cartItemId,
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
      message: 'Product successfully deleted from the cart.',
    },
  };
};

export default deleteFromCart;
