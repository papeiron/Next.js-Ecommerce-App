import { OrderStatusType, Prisma, ShipmentStatus } from '@prisma/client';
import { db } from '../db';
import { OrderForMyOrders, OrderWithDetails } from '@/types';
import { currentUser } from '../helpers';

type FetchOrdersByStoreIdProps = {
  storeId: string;
  sortBy?: {
    sort: string;
    order: 'asc' | 'desc';
  };
  currentPage?: number;
  itemsPerPage?: number;
  querySearch?: string;
  filter?: {
    filterByOrder: OrderStatusType[];
    filterByShipment: ShipmentStatus[];
  };
};

export const fetchOrdersByStoreId = async ({
  storeId,
  sortBy,
  currentPage = 1,
  itemsPerPage = 10,
  querySearch,
  filter,
}: FetchOrdersByStoreIdProps): Promise<{
  orders: OrderWithDetails[];
  totalCount: number;
}> => {
  try {
    let where: Prisma.OrderWhereInput = {
      orderStores: {
        some: {
          store_id: storeId,
        },
      },
    };

    if (querySearch) {
      const lowercaseQuery = querySearch.toLowerCase();

      where = {
        AND: [
          where,
          {
            OR: [
              { user: { name: { contains: querySearch } } },
              { orderItems: { some: { product: { name: { contains: querySearch } } } } },
              {
                order_status: {
                  in: Object.values(OrderStatusType).filter((status) =>
                    status.toLowerCase().includes(lowercaseQuery),
                  ),
                },
              },
              {
                orderStores: {
                  some: {
                    shipment: {
                      status: {
                        in: Object.values(ShipmentStatus).filter((status) =>
                          status.toLowerCase().includes(lowercaseQuery),
                        ),
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      };
    }

    // FILTER
    if (filter) {
      where.AND = [];
      if (filter.filterByOrder && filter.filterByOrder.length > 0) {
        where.AND.push({
          order_status: {
            in: filter.filterByOrder,
          },
        });
      }
      if (filter.filterByShipment && filter.filterByShipment.length > 0) {
        where.AND.push({
          orderStores: {
            some: {
              shipment: {
                status: {
                  in: filter.filterByShipment,
                },
              },
            },
          },
        });
      }
    }

    const query: Prisma.OrderFindManyArgs = {
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        orderStores: {
          where: {
            store_id: storeId,
          },
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
            shipping_address: true,
            shipment: true,
          },
        },
      },
    };
    // SORTING
    if (sortBy && sortBy?.sort && sortBy?.order && sortBy.sort !== 'total_price') {
      const { sort, order } = sortBy;
      query.orderBy = { [sort]: order };
    } else {
      query.orderBy = { created_at: 'desc' };
    }
    // PAGINATION
    if (currentPage && itemsPerPage) {
      const skip = (currentPage - 1) * itemsPerPage;
      const take = itemsPerPage;
      query.skip = skip;
      query.take = take;
    }
    const [orders, totalCount] = await Promise.all([
      db.order.findMany(query),
      db.order.count({ where }),
    ]);
    return {
      orders: orders as OrderWithDetails[],
      totalCount,
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

export const fetchOrderByOrderNo = async (orderNo: string) => {
  const user = currentUser();

  if (!user) {
    throw new Error('Failed to fetch orders');
  }

  try {
    const order = await db.order.findUnique({
      where: {
        order_no: orderNo,
      },
    });

    return order;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

export const fetchOrdersByUser = async (id: string): Promise<OrderForMyOrders[]> => {
  const user = currentUser();

  if (!user) {
    throw new Error('Failed to fetch orders');
  }

  try {
    const orders = (await db.order.findMany({
      where: {
        user_id: id,
      },
      include: {
        orderStores: {
          include: {
            orderItems: {
              include: {
                product: {
                  include: {
                    image: true,
                  },
                },
              },
            },
            store: true,
            shipping_address: true,
            shipment: true,
          },
        },
        orderItems: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })) as OrderForMyOrders[];

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

export const fetchOrdersWithoutReviewsByUser = async (userId: string) => {
  try {
    const orders = await db.order.findMany({
      where: {
        user_id: userId,
        order_status: 'COMPLETED',
        orderItems: {
          some: {
            product: {
              reviews: {
                none: {
                  user_id: userId,
                },
              },
            },
          },
        },
      },
      include: {
        orderItems: {
          where: {
            product: {
              reviews: {
                none: {
                  user_id: userId,
                },
              },
            },
          },
          include: {
            product: {
              include: {
                image: true,
                reviews: true,
              },
            },
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};
