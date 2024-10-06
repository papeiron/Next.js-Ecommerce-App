'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { paths } from '@/paths';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function toggleFavorite(productId: string, productSlug: string) {
  const user = await currentUser();

  if (!user) {
    return { error: 'You must be signed in to do this.' };
  }

  try {
    const existingFavorite = await db.favorite.findFirst({
      where: {
        product_id: productId,
        user_id: user.id,
      },
    });

    if (existingFavorite) {
      await db.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: user.id } },
        },
      });
    }

    revalidatePath(paths.productShow(productSlug));
    revalidateTag('favorites');

    return { success: 'Favorite status updated successfully.' };
  } catch (err) {
    console.error(err);
    return { error: 'An error occurred while updating favorite status.' };
  }
}
