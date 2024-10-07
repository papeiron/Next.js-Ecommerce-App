import { unstable_cache } from 'next/cache';
import { db } from '../db';
import { FavoritesForFavoritesPage } from '@/types/Favorites';

export const fetchFavoritesByUser = unstable_cache(
  async (userId: string): Promise<FavoritesForFavoritesPage[] | null> => {
    try {
      const favorites = await db.favorite.findMany({
        where: {
          user_id: userId,
        },
        include: {
          product: {
            include: {
              reviews: true,
              image: true,
              order_items: true,
              coupons: true,
              discount: true,
              categories: {
                include: {
                  category: {
                    include: {
                      discount: true,
                    },
                  },
                },
              },
              favorites: true,
            },
          },
        },
      });

      return favorites;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ['user-favorites'],
  { tags: ['favorites'], revalidate: 30 },
);
