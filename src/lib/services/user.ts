import { db } from '../db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: { store: true, cart: true },
    });

    return user;
  } catch {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (user_id: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { user_id },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
