import { Order, OrderItem, Prisma, User } from '@prisma/client';
import { ProductWith } from './Product';

type UserModified = Pick<User, 'id' | 'name' | 'email' | 'image'>;

type OrderRelations = Prisma.OrderInclude;

export type OrderWith<T extends keyof OrderRelations> = Prisma.OrderGetPayload<{
  include: Pick<OrderRelations, T>;
}>;

export type OrderWithDetails = OrderWith<'orderItems'> & {
  user: UserModified;
  orderStores: Array<
    OrderStoreWith<'shipment' | 'shipping_address'> & {
      orderItems: OrderItemWith<'product'>[];
    }
  >;
};

export type OrderForMyOrders = OrderWith<'orderItems'> & {
  orderStores: Array<
    OrderStoreWith<'shipment' | 'shipping_address' | 'store'> & {
      orderItems: Array<
        OrderItem & {
          product: ProductWith<'image'>;
        }
      >;
    }
  >;
  orderItems: OrderItem;
};

export type OrderForMyReviews = Order & {
  orderItems: Array<
    OrderItem & {
      product: ProductWith<'image' | 'reviews'>;
    }
  >;
};

type OrderStoreRelations = Prisma.OrderStoreInclude;

export type OrderStoreWith<T extends keyof OrderStoreRelations> =
  Prisma.OrderStoreGetPayload<{
    include: Pick<OrderStoreRelations, T>;
  }>;

//

type OrderItemRelations = Prisma.OrderItemInclude;

export type OrderItemWith<T extends keyof OrderItemRelations> =
  Prisma.OrderItemGetPayload<{
    include: Pick<OrderItemRelations, T>;
  }>;
