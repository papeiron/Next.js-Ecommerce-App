import authConfig from '@/config/auth.config';
import type { Store } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'USER' | 'STORE_OWNER';
  store?: Store | null;
  isTwoFactorEnabled?: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'USER' | 'STORE_OWNER';
    store?: Store | null;
    isTwoFactorEnabled?: boolean;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
