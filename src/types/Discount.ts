import { Prisma } from '@prisma/client';

type DiscountRelations = Prisma.DiscountInclude;
export type DiscountWith<T extends keyof DiscountRelations> = Prisma.DiscountGetPayload<{
  include: Pick<DiscountRelations, T>;
}>;
export type DiscountWithRelations = DiscountWith<'category' | 'product' | 'store'>;
