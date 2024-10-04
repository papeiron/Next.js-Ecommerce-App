import { db } from '@/lib/db';
import { SearchResults } from '@/types';
import { unstable_cache } from 'next/cache';

export const getSearchHistory = unstable_cache(
  async (userId: string) => {
    return await db.searchHistory.findMany({
      where: {
        user_id: userId,
      },
    });
  },
  ['search'],
  { tags: ['search-history'], revalidate: 10 },
);

export async function searchProductsCategoriesStores(
  query: string,
): Promise<SearchResults> {
  const results = await db.$transaction([
    db.product.findMany({
      where: {
        OR: [{ name: { contains: query } }, { brand: { contains: query } }],
      },
      include: {
        categories: true,
      },
    }),
    db.category.findMany({
      where: {
        name: { contains: query },
      },
    }),
    db.store.findMany({
      where: {
        store_name: { contains: query },
      },
    }),
  ]);

  return {
    products: results[0],
    categories: results[1],
    stores: results[2],
  };
}
