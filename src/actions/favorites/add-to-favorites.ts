'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { revalidateTag } from 'next/cache';

type FormStateType = {
  error?: { message?: { [key: string]: string[] } };
  success?: { message?: string };
};

type AddToFavoritesType = {
  productId: string;
  formState: FormStateType;
};

const addToFavorites = async ({
  productId,
  formState,
}: AddToFavoritesType): Promise<FormStateType> => {
  const user = await currentUser();


  if (!user) {
    return { error: { message: { auth: ['You must be signed in to do this.'] } } };
  }

  try {
    const fav = await db.favorite.findFirst({
      where: {
        product_id: productId,
      },
    });

    if (fav) {
      return { error: { message: { auth: ["It's already in your favorite list."] } } };
    }

    await db.favorite.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
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

  return {
    success: {
      message: 'Succesfully added to favorites.',
    },
  };
};

export default addToFavorites;
