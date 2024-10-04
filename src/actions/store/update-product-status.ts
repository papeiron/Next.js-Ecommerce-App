'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

const updateProductStatus = async (id: string, status: boolean) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id || !session.user.store) {
    throw new Error('You have to signed in to that');
  }

  let product;
  try {
    product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            category: {
              include: {
                sub_categories: true,
              },
            },
          },
        },
      },
    });
  } catch {
    throw new Error('An unexpected error occurred');
  }

  if (product?.store_id !== session.user.store.id) {
    throw new Error('Store not found');
  }

  try {
    await db.product.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch {
    throw new Error('An unexpected error occurred');
  }

  const subCategory = product.categories.find((c) => {
    if (c.category.sub_categories.length === 0) {
      return c;
    }
  })?.category;

  if (subCategory) revalidatePath(paths.productsListByCategory(subCategory.slug));
};

export default updateProductStatus;
