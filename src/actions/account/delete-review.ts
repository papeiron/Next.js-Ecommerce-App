'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { fetchReviewsByUser } from '@/lib/services/review';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

export type FormStateType = {
  error?: { message?: string[] };
  success?: { message?: string };
};

type DeleteFromCartProps = {
  reviewId: string;
  formState: FormStateType;
};

const deleteReview = async (
  reviewId: string,
  formState: FormStateType,
): Promise<FormStateType> => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: { message: ['You must be signed in to do this.'] } };
  }

  const reviews = await fetchReviewsByUser(user.id);

  const isHisReview = reviews?.some((r) => r.id === reviewId);

  if (!isHisReview) {
    return { error: { message: ['You do not have a permission to do that.'] } };
  }

  try {
    await db.review.delete({
      where: {
        id: reviewId,
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

  return {
    success: {
      message: 'Review successfully deleted.',
    },
  };
};

export default deleteReview;
