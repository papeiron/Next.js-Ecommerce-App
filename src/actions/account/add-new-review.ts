'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { fetchOrdersByUser } from '@/lib/services/order';
import { reviewSchema } from '@/lib/validation/account';

type createNewProductFormState = {
  errors?: {
    rating?: string[];
    comment?: string[];
    _form?: string[];
  };
  success?: { message?: string; revalidated: boolean };
};

const createNewReview = async (
  formState: createNewProductFormState,
  formData: FormData,
): Promise<createNewProductFormState> => {
  const validatedFields = reviewSchema.safeParse({
    rating: formData.get('rating'),
    comment: formData.get('comment'),
    productId: formData.get('productId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  const orders = await fetchOrdersByUser(user.id);

  const isItsOwnProduct = orders.some((o) =>
    o.orderItems.some((i) => i.product_id === validatedFields.data.productId),
  );

  if (!isItsOwnProduct) {
    return {
      errors: {
        _form: ['You do not have a permission to do that.'],
      },
    };
  }

  try {
    await db.review.create({
      data: {
        comment: validatedFields.data.comment,
        rating: validatedFields.data.rating,
        user: {
          connect: {
            id: user.id,
          },
        },
        product: {
          connect: {
            id: validatedFields.data.productId,
          },
        },
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  //   revalidatePath(paths.myReviews());

  return {
    success: { message: 'Your review successfully added.', revalidated: true },
  };
};

export default createNewReview;
