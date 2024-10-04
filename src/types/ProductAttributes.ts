import { Prisma } from '@prisma/client';

// product attributes
type ProductAttributeRelations = Prisma.ProductAttributeInclude;

export type ProductAttributeWith<T extends keyof ProductAttributeRelations> =
  Prisma.ProductAttributeGetPayload<{
    include: Pick<ProductAttributeRelations, T>;
  }>;
