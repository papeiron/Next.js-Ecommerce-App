'use server';

import { Prisma, StoreCarrier } from '@prisma/client';
import { db } from '../db';
import { StoreCarrierForTable } from '@/types/Carrier';

export const fetchCarriersByStore = async (
  storeId: string,
): Promise<StoreCarrierForTable[]> => {
  try {
    const carriers = await db.storeCarrier.findMany({
      where: {
        store_id: storeId,
      },
      include: {
        carrier: {
          include: {
            shipping_rates: true,
          },
        },
      },
    });

    return carriers;
  } catch (error) {
    console.error('Error fetching carriers:', error);
    throw new Error("Couldn't fetch carriers");
  }
};
