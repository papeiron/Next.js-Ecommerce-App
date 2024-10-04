import { Prisma, ProductCategory } from '@prisma/client';
import { CategoryWith } from './Category';
import { ProductAttributeWith } from './ProductAttributes';
import { ReviewWith } from './Review';

// product
type ProductRelations = Prisma.ProductInclude;

export type ProductWith<T extends keyof ProductRelations> = Prisma.ProductGetPayload<{
  include: Pick<ProductRelations, T>;
}>;

export type ProductWithRelations = ProductWith<
  | 'cart_item'
  | 'categories'
  | 'coupons'
  | 'discount'
  | 'favorites'
  | 'image'
  | 'order_items'
  | 'reviews'
  | 'store'
  | '_count'
  | 'attributes'
>;

export type ProductForTable = ProductWith<
  'image' | 'reviews' | 'favorites' | '_count'
> & {
  categories: ProductCategoryWith<'category'>[];
  attributes: ProductAttributeWith<'product'>[];
};

export type ProductForList = ProductWith<
  'reviews' | 'image' | 'order_items' | 'coupons' | 'discount'
> & {
  categories: {
    category: CategoryWith<'discount'>;
  }[];
};

export type ProductForShowPage = ProductWith<
  'image' | 'favorites' | 'discount' | 'coupons' | 'store'
> & {
  categories: ProductCategory &
    {
      category: CategoryWith<'attributes' | 'discount'>;
    }[];
  attributes: ProductAttributeWith<'category_attribute' | 'product'>[];
  reviews: ReviewWith<'user'>[];
};

//

export type SortableProductFields = keyof Partial<ProductWithRelations>;

// product-category table
// relations
type ProductCategoryRelations = Prisma.ProductCategoryInclude;
export type ProductCategoryWith<T extends keyof ProductCategoryRelations> =
  Prisma.ProductCategoryGetPayload<{
    include: Pick<ProductCategoryRelations, T>;
  }>;

export type ProductCategoryWithRelations = ProductCategoryWith<'product' | 'category'>;
