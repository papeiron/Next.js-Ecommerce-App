'use server';

import { ReviewForAccount } from '@/types/Review';
import { db } from '../db';

export const fetchReviewsByUser = async (
  userId: string,
): Promise<ReviewForAccount[] | null> => {
  try {
    const reviews = await db.review.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
        product: true,
      },
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return null;
  }
};
