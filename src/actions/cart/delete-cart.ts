'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

import { db } from '@/lib/db';
import { getUserById } from '@/lib/services/user';
import { paths } from '@/paths';

const deleteCart = async (userId: string) => {
  const currentUser = await getUserById(userId);

  if (currentUser?.cart && currentUser?.cart.length > 0) {
    await db.cart.delete({
      where: {
        id: currentUser.cart[0].id,
      },
    });

    revalidatePath(paths.cart());
    revalidateTag('cart');
  } else {
    return null;
  }

  // TODO: fix the unexpected behaviour (cant' revalidate cart)
};

export default deleteCart;
