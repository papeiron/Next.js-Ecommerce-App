'use server';

import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { fetchCartByUser } from '@/lib/services/cart';
import { CartWithDetails } from '@/types';
import { calculatePriceWithDiscounts } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { Coupon } from '@prisma/client';

type ValidCouponsType = {
  categoryCoupons: Coupon[] | [];
  productCoupon: Coupon | null;
};

type SelectedAttribute = {
  attName: string;
  val: string;
};

type FormStateType = {
  error?: { message?: { [key: string]: string[] } };
  success?: { message?: string };
};

type createOrderProps = {
  formState: FormStateType;
  orderDetails: {
    selectedAddressId: string;
    selectedCarriers: {
      [storeId: string]: string;
    };
    totalPrice: number;
    validCoupons: ValidCouponsType[] | null;
  };
};

const createOrder = async ({ orderDetails, formState }: createOrderProps) => {
  const user = await currentUser();

  if (!user) {
    return { error: { message: { auth: ['You must be signed in to do this.'] } } };
  }

  const cart = await fetchCartByUser(user.id as string);

  if (!cart) {
    return { error: { message: { cart: ['Cart not found.'] } } };
  }

  const order_no = uuidv4();

  let coupons;
  if (orderDetails.validCoupons) {
    coupons = orderDetails.validCoupons.flatMap((c) =>
      c.categoryCoupons.map((c) => c.id),
    );

    if (orderDetails.validCoupons[0].productCoupon) {
      coupons.push(orderDetails.validCoupons[0].productCoupon.id);
    }
  }

  let order;
  try {
    const orderData: any = {
      order_no: order_no,
      total_price: orderDetails.totalPrice,
      user: {
        connect: {
          id: user.id,
        },
      },
    };

    if (coupons && coupons.length > 0) {
      orderData.coupon = {
        connect: {
          id: coupons[0],
        },
      };
    }

    const order = await db.order.create({
      data: orderData,
    });

    const itemsByStore: { [key: string]: CartWithDetails['cart_items'] } = {};
    cart.cart_items.forEach((item) => {
      const storeId = item.product.store.id;
      if (!itemsByStore[storeId]) {
        itemsByStore[storeId] = [];
      }
      itemsByStore[storeId].push(item);
    });

    for (const [storeId, items] of Object.entries(itemsByStore)) {
      const orderStore = await db.orderStore.create({
        data: {
          order_id: order.id,
          store_id: storeId,
          shipping_address_id: orderDetails.selectedAddressId,
        },
      });

      for (const item of items) {
        const { finalPrice } = calculatePriceWithDiscounts(item.product);

        await db.orderItem.create({
          data: {
            order_id: order.id,
            order_store_id: orderStore.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: finalPrice,
            selected_attributes: item.selected_attributes || undefined,
          },
        });

        await db.product.update({
          where: {
            id: item.product_id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      await db.shipment.create({
        data: {
          order_store_id: orderStore.id,
          status: 'PENDING',
        },
      });
    }

    // update stock

    return { orderNo: order.order_no, cartId: cart.id };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: {
          message: { _form: [err.message] },
        },
      };
    } else {
      return {
        error: {
          message: { _form: ['Something went wrong.'] },
        },
      };
    }
  }
};

export default createOrder;
