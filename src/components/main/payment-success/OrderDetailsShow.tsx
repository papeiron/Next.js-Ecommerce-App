'use client';

import { Order } from '@prisma/client';

import { formatDateTertiary, roundToTwoDecimals } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function OrderDetailsShow({ order }: { order: Order }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="h-[24rem] w-[400px] rounded-md border p-8">
      <div className="mb-6 flex items-center justify-center">
        <CheckCircle className="mr-3 h-10 w-10 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Payment Successful</h2>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Order Summary</h3>

        <div className="mb-2 flex items-center justify-between">
          <span>Order NO:</span>
          <span className="text-right font-semibold">{order?.order_no}</span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span>Order Date:</span>
          <span className="font-semibold">
            {formatDateTertiary(order?.created_at as Date)}
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span>Amount Paid:</span>
          <span className="font-semibold text-green-600">
            $ {roundToTwoDecimals(Number(order?.total_price))}
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span>Estimated Delivery: </span>
          <span className="font-semibold">2-7 Days</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <span className="font-semibold">{order?.order_status}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsShow;
