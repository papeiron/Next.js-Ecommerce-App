import { StoreForCheckout } from '@/types';
import { db } from '../db';

export const getStoreByUserId = async (id: string) => {
  const store = db.store.findUnique({
    where: {
      user_id: id,
    },
  });

  return store;
};

export const getStoresByIds = async (storeIds: string[]): Promise<StoreForCheckout[]> => {
  const stores = await db.store.findMany({
    where: {
      id: {
        in: storeIds,
      },
    },
    include: {
      carriers: {
        include: {
          carrier: {
            include: {
              shipping_rates: true,
            },
          },
        },
      },
    },
  });

  return stores;
};

export async function fetchStoreRatingByStore(storeSlug: string): Promise<number | null> {
  try {
    let store = await db.store.findUnique({
      where: {
        slug: storeSlug,
      },
    });

    if (!store) {
      console.error(`Product with slug not found`);
      return null;
    }

    const storeProducts = await db.product.findMany({
      where: {
        store_id: store.id,
        store: {
          isActive: true,
        },
      },
      select: {
        id: true,
        reviews: {
          select: { rating: true },
        },
      },
    });

    const allRatings = storeProducts.flatMap((product) =>
      product.reviews.map((review) => review.rating),
    );

    if (allRatings.length === 0) {
      return null;
    }

    const averageRating =
      allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

    return Number((averageRating * 2).toFixed(2));
  } catch (error) {
    console.error('Error fetching store rating:', error);
    return null;
  }
}

export const fetchStoreBySlug = async (storeSlug: string) => {
  try {
    const store = await db.store.findUnique({
      where: {
        slug: storeSlug,
      },
    });

    return store;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
