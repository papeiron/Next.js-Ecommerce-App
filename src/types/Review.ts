import { Prisma } from '@prisma/client';

type ReviewRelations = Prisma.ReviewInclude;

export type ReviewWith<T extends keyof ReviewRelations> = Prisma.ReviewGetPayload<{
  include: Pick<ReviewRelations, T>;
}>;

export type ReviewForAccount = ReviewWith<'product' | 'user'>;
