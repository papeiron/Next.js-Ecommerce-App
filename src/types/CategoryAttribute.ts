import { Prisma } from '@prisma/client';

type CategoryAttributeRelations = Prisma.CategoryAttributeInclude;
export type CategoryAttributeWith<T extends keyof CategoryAttributeRelations> =
  Prisma.CategoryAttributeGetPayload<{
    include: Pick<CategoryAttributeRelations, T>;
  }>;
export type CategoryAttributeWithRelations = CategoryAttributeWith<'category'>;
