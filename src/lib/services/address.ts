'use server';

import { Address } from '@prisma/client';
import { db } from '../db';

export const fetchAddressesByUser = (userId: string): Promise<Address[]> => {
  try {
    const addresses = db.address.findMany({
      where: {
        user_id: userId,
      },
    });

    return addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw new Error("Couldn't fetch addresses");
  }
};
