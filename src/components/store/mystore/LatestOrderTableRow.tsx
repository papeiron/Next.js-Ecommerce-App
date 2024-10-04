import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { TableCell, TableRow } from '@/components/ui/table';
import { orderStatusColors } from '@/lib/constants';
import { capitalizeOnlyFirstLetter, formatDate, formatDateSecondary } from '@/lib/utils';
import { OrderWithDetails } from '@/types';

function LatestOrderTableRow({ order }: { order: OrderWithDetails }) {
  const products = order?.orderStores?.flatMap((s) =>
    s.orderItems.flatMap((i) => ({
      product: i.product,
      quantity: i.quantity,
      price: i.price,
    })),
  );

  return (
    <TableRow className="font-medium">
      <TableCell className="font-semibold">
        {products?.map((item, index) => (
          <HoverCard key={index} openDelay={200}>
            <HoverCardTrigger className="flex justify-between">
              <p>{item.product.name}</p>
              <p className="font-light">x {item.quantity}</p>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto font-medium text-gray-400">
              <p>Price: {item.price}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </TableCell>

      <TableCell className="font-medium text-gray-400">{order.user.name}</TableCell>
      <TableCell className="text-xs font-semibold text-gray-400">
        <HoverCard openDelay={200}>
          <HoverCardTrigger className="text-xs font-semibold text-gray-400">
            {formatDate(order.created_at)}
          </HoverCardTrigger>
          <HoverCardContent className="w-[100%] text-gray-400">
            {formatDateSecondary(order.created_at)}
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell>
        <div
          className={`inline-block rounded-3xl border px-[7px] py-[4px] ${orderStatusColors[order.order_status]} text-xs font-semibold`}
        >
          {capitalizeOnlyFirstLetter(order.order_status)}
        </div>
      </TableCell>
      <TableCell className="font-semibold text-orange-1">${order.total_price}</TableCell>
    </TableRow>
  );
}

export default LatestOrderTableRow;
