import { capitalizeOnlyFirstLetter, formatDate, formatDateSecondary } from '@/lib/utils';
import { OrderWithDetails } from '@/types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../ui/hover-card';
import { TableCell, TableRow } from '../../ui/table';
import { orderStatusColors } from '@/lib/constants';
import { ProductPriceDisplay } from '@/components/shared/ui';

type OrderTableRowType = {
  order: OrderWithDetails;
  index: number;
};

type DeliveryStatusType =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'RETURNED'
  | 'FAILED';

const deliveryStatusColors: { [key: string]: string } = {
  PENDING: 'text-yellow-500',
  PROCESSING: 'text-blue-500',
  SHIPPED: 'text-indigo-500',
  IN_TRANSIT: 'text-teal-500',
  DELIVERED: 'text-green-600',
  RETURNED: 'text-red-600',
  FAILED: 'text-red-700',
};

function OrderTableRow({ order, index }: OrderTableRowType) {
  const products = order?.orderStores?.flatMap((s) =>
    s.orderItems.flatMap((i) => ({
      product: i.product,
      quantity: i.quantity,
      price: i.price,
    })),
  );

  const address = order.orderStores[0].shipping_address;
  const deliveryStatus = order.orderStores[0].shipment?.status as
    | DeliveryStatusType
    | undefined;

  return (
    <TableRow key={order.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="font-medium text-gray-400">{order.order_no}</TableCell>
      <TableCell className="font-semibold">
        {products.map((item, index) => (
          <HoverCard key={index} openDelay={200}>
            <HoverCardTrigger className="flex justify-between">
              <p>{item.product.name}</p>
              <p className="font-light">x {item.quantity}</p>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto font-medium text-gray-400">
              <p>Price: {Number(item.price)}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </TableCell>
      <TableCell>
        <HoverCard openDelay={200}>
          <HoverCardTrigger className="font-medium text-gray-400">
            {order.user.name}
          </HoverCardTrigger>
          <HoverCardContent className="flex w-[100%] flex-col gap-1 text-start">
            <p>Name: {order.user.name}</p>
            <p>Email: {order.user.email}</p>
            <p>Phone: {address.phone_number}</p>
            <p>Address Title: {address.title}</p>
            <p>Address 1: {address.address_line_1}</p>
            <p>Address 2: {address.address_line_2}</p>
            <p>Postal Code: {address.postal_code}</p>
            <p>City: {address.city}</p>
            <p>Landmark: {address.landmark}</p>
            <p>Country: {address.country}</p>
          </HoverCardContent>
        </HoverCard>
      </TableCell>

      <TableCell
        className={` ${deliveryStatusColors[deliveryStatus || 'PENDING']} font-semibold`}
      >
        {capitalizeOnlyFirstLetter(deliveryStatus || '')}
      </TableCell>
      <TableCell>
        <div
          className={`inline-block rounded-3xl border px-[7px] py-[4px] ${orderStatusColors[order.order_status]} text-xs font-semibold`}
        >
          {capitalizeOnlyFirstLetter(order.order_status)}
        </div>
      </TableCell>
      <TableCell className="font-semibold text-orange-1">${order.total_price}</TableCell>

      <TableCell className="text-gray-400">
        <HoverCard openDelay={200}>
          <HoverCardTrigger className="text-gray-400">
            {formatDate(order.created_at)}
          </HoverCardTrigger>
          <HoverCardContent className="w-[100%]">
            {formatDateSecondary(order.created_at)}
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell className="text-gray-400">
        <HoverCard openDelay={200}>
          <HoverCardTrigger className="text-gray-400">
            {formatDate(order.updated_at)}
          </HoverCardTrigger>
          <HoverCardContent className="w-[100%]">
            {formatDateSecondary(order.updated_at)}
          </HoverCardContent>
        </HoverCard>
      </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;
