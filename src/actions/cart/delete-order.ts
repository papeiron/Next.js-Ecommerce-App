'use server';

import { db } from '@/lib/db';

const deleteOrder = (orderNo: string) => {
  try {
    db.order.delete({
      where: {
        order_no: orderNo,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: {
          message: [err.message],
        },
      };
    } else {
      return {
        error: {
          message: ['Something went wrong.'],
        },
      };
    }
  }
};

export default deleteOrder;
