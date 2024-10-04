'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { fetchProductsByStore } from '@/lib/services/product';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

type FormStateType = {
  error?: { message?: string };
  success?: { message?: string };
};

const deleteProduct = async (
  id: string,
  formState: FormStateType,
): Promise<FormStateType> => {
  const session = await auth();

  if (!session || !session.user || !session?.user?.store) {
    return {
      error: {
        message: 'You must be signed in to do this',
      },
    };
  }

  const { products } = await fetchProductsByStore({
    storeId: session.user.store.id,
  });
  const productIds = products?.map((product) => product.id);

  if (!productIds?.includes(id)) {
    return {
      error: {
        message: 'You are not allowed to do that',
      },
    };
  }

  try {
    await db.product.delete({
      where: {
        id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: {
          message: err.message,
        },
      };
    } else {
      return {
        error: {
          message: 'Something went wrong',
        },
      };
    }
  }

  revalidatePath(paths.productsTable());

  return {
    success: {
      message: 'Product successfully deleted',
    },
  };
};

export default deleteProduct;
