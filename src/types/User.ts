import { Store } from '@prisma/client';

export type UserForAccountSetings = {
  id?: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role: "ADMIN" | "USER" | "STORE_OWNER";
  store?: Store | null;
  isTwoFactorEnabled?: boolean | undefined;
};