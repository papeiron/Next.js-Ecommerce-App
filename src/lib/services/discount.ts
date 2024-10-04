import { DiscountWith } from '@/types';
import { db } from '../db';

export async function fetchDiscountsByStoreId(storeId: string) {
  try {
    const discounts: DiscountWith<'category' | 'product'>[] = await db.discount.findMany({
      where: {
        store_id: storeId,
      },
      include: {
        category: true,
        product: true,
      },
    });

    return discounts;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function fetchAllDiscounts(): Promise<
  DiscountWith<'category' | 'product'>[] | null
> {
  try {
    const discounts = await db.discount.findMany({
      include: {
        category: true,
        product: true,
      },
    });

    return discounts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}
