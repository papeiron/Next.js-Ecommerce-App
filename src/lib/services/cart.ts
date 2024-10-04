import { CartWithDetails } from '@/types';
import { unstable_cache } from 'next/cache';
import { db } from '../db';

export const fetchCartByUser = unstable_cache(
  async (userId: string): Promise<CartWithDetails | null> => {
    try {
      const cart = await db.cart.findFirst({
        where: {
          user_id: userId,
        },
        include: {
          cart_items: {
            include: {
              product: {
                include: {
                  image: true,
                  coupons: true,
                  discount: true,
                  store: true,
                  categories: {
                    include: {
                      category: {
                        include: {
                          discount: true,
                          coupons: true,
                        },
                      },
                    },
                  },
                  attributes: {
                    include: {
                      category_attribute: true,
                      product: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return cart as CartWithDetails | null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ['user-cart'],
  { tags: ['cart'], revalidate: 30 },
);
