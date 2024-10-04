'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { revalidateTag } from 'next/cache';

const recordSearchQuery = async (query: string) => {
  const user = await currentUser();

  try {
    await db.searchHistory.create({
      data: {
        query,
        user: {
          connect: {
            id: user?.id,
          },
        },
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
          message: 'Something went wrong.',
        },
      };
    }
  }

  revalidateTag('search-history');
};

export default recordSearchQuery;
