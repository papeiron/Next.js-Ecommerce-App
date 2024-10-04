import { Cart, CartItem, ProductCategory } from '@prisma/client';
import { CategoryWith } from './Category';
import { DiscountWith } from './Discount';
import { ProductWith } from './Product';
import { ProductAttributeWith } from './ProductAttributes';

export type CartWithDetails = Cart & {
  cart_items: Array<
    CartItem & {
      product: ProductWith<'image' | 'coupons' | 'store'> & {
        discount: DiscountWith<'category' | 'product'>;
        categories: ProductCategory &
          {
            category: CategoryWith<'attributes' | 'discount' | 'coupons'>;
          }[];
        attributes: ProductAttributeWith<'category_attribute' | 'product'>[];
      };
    }
  >;
};
