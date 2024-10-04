'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { revalidateTag } from 'next/cache';

const deleteSearchHistory = async () => {
  const user = await currentUser();

  try {
    await db.searchHistory.deleteMany({
      where: {
        user_id: user?.id,
      },
    });
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Something went wrong.');
  }

  revalidateTag('search-history');
};

export default deleteSearchHistory;
