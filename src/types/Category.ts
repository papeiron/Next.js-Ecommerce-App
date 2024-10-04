import { Category, CategoryAttribute, Prisma } from '@prisma/client';
import { ProductCategoryWith } from './Product';
import { CategoryAttributeWith } from './CategoryAttribute';

type CategoryRelations = Prisma.CategoryInclude;
export type CategoryWith<T extends keyof CategoryRelations> = Prisma.CategoryGetPayload<{
  include: Pick<CategoryRelations, T>;
}>;
export type CategoryWithRelations = CategoryWith<
  'sub_categories' | 'coupons' | 'discount' | 'parent' | 'products' | '_count'
>;

export type CategoryForSidebar = Category & {
  sub_categories: CategoryWith<'_count'>[];
  _count: { products: number };
  products: ProductCategoryWith<'product'>[];
  attributes: (CategoryAttribute & {
    category_attribute: CategoryAttributeWith<'product_attributes'>;
  })[];
};
