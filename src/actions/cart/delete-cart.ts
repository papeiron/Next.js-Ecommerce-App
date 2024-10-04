'use server';

import { revalidateTag } from 'next/cache';

import { db } from '@/lib/db';
import { fetchCartByUser } from '@/lib/services/cart';

const deleteCart = async (userId: string) => {
  const cart = await fetchCartByUser(userId);

  if (cart) {
    await db.cart.delete({
      where: {
        id: cart.id,
      },
    });

    // TODO: fix the unexpected behaviour (cant' revalidate cart)
    revalidateTag('cart');
  } else {
    return null;
  }
};

export default deleteCart;
