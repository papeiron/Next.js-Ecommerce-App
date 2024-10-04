'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { paths } from '@/paths';
import { revalidatePath, revalidateTag } from 'next/cache';

type FormStateType = {
  error?: { message?: { [key: string]: string[] } };
  success?: { message?: string };
};

type AddToFavoritesType = {
  favoriteId: string;
  productSlug: string;
  formState: FormStateType;
};

const deleteFromFavorites = async ({
  favoriteId,
  productSlug,
  formState,
}: AddToFavoritesType): Promise<FormStateType> => {
  const user = await currentUser();

  if (!user) {
    return { error: { message: { auth: ['You must be signed in to do this.'] } } };
  }
  let favorite;
  try {
    const fav = await db.favorite.findFirst({
      where: {
        id: favoriteId,
      },
    });

    if (!fav) {
      return { error: { message: { auth: ["It's not in your favorite list."] } } };
    }

    favorite = await db.favorite.delete({
      where: {
        id: favoriteId,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: {
          message: { _form: [err.message] },
        },
      };
    } else {
      return {
        error: {
          message: { _form: ['Something went wrong.'] },
        },
      };
    }
  }

  revalidateTag('favorites');
  revalidatePath(paths.productShow(productSlug));

  return {
    success: {
      message: 'Succesfully added to favorites.',
    },
  };
};

export default deleteFromFavorites;
