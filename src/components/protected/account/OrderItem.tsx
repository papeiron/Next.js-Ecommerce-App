'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Heading, Seperator } from '@/components/shared/ui';
import { formatDateTertiary, roundToTwoDecimals } from '@/lib/utils';
import { OrderForMyOrders } from '@/types';
import { ProductImage } from '@prisma/client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import OrderProgress from './OrderProgress';

type SelectedAttribute = {
  val: string;
  attName: string;
};

function OrderItem({ order }: { order: OrderForMyOrders }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const address = order.orderStores[0].shipping_address;

  const paymentDetails = order.orderStores.flatMap((s) =>
    s.orderItems.map((i) => ({
      storeName: s.store.store_name,
      totalPriceByStore: i.price * i.quantity,
    })),
  );

  const shippingPrice =
    order.total_price -
    paymentDetails.reduce((sum, item) => (sum += item.totalPriceByStore), 0);

  let images: { [key: string]: ProductImage } = {};
  order.orderStores.map((s) =>
    s.orderItems.map((i) =>
      i.product.image.map((img) => {
        if (!images[i.id]) {
          images[i.id] = img;
        }
      }),
    ),
  );

  return (
    <div className="overflow-hidden rounded-md border">
      <div
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
        onClick={toggleOpen}
      >
        <div className="flex flex-[20%] gap-1">
          {Object.values(images).map((img, index) => (
            <div key={img.id} className="relative h-10 w-10 rounded-md border">
              <Image
                src={img.url}
                alt="Product Image"
                fill
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex-[70%]">
          <p className="w-52 truncate font-medium">Order No: #{order.order_no}</p>
          <p className="text-sm text-gray-500">{formatDateTertiary(order.created_at)}</p>
        </div>
        <div className="flex flex-[10%] items-center gap-4">
          <p className="font-semibold text-orange-1">${order.total_price}</p>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-[20%] gap-10">
              <OrderProgress orderStatus={order.order_status} />
              <div className="flex-[33%]">
                <Heading type="heading-5" className="mb-6">
                  Delivery Address
                </Heading>
                <div className="rounded-md border p-3">
                  <p className="text-gray-400">{address.title}</p>
                  <p>{address.address_line_1}</p>
                  <p>{address.city}</p>
                  <p>{address.country}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-[80%] gap-10">
              <div className="flex flex-[67%] flex-col gap-6">
                {order.orderStores.map((s) =>
                  s.orderItems.map((i) => (
                    <Link
                      href={`/p/${i.product.slug}`}
                      key={i.id}
                      className="flex gap-3 rounded-md border px-2"
                    >
                      <div className="relative h-20 flex-[15%]">
                        <Image
                          src={i.product.image[0].url}
                          alt={i.product.image[0].alt || 'Product Image'}
                          fill
                          className="rounded-l-md object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-[65%] flex-col justify-center">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{i.product.brand}</span>
                          <p>{i.product.name}</p>
                        </div>
                        <div className="flex gap-1">
                          {(i.selected_attributes as SelectedAttribute[]).map(
                            (a, index) => (
                              <div className="flex gap-1 text-gray-400" key={a.attName}>
                                <div className={`${index === 0 && 'hidden'}`}>
                                  &#8226;
                                </div>
                                <p>{a.attName}:</p>
                                <p>{a.val}</p>
                              </div>
                            ),
                          )}
                        </div>
                        <div className="text-xs text-gray-400">{s.store.store_name}</div>
                      </div>
                      <div className="flex flex-[10%] items-center text-gray-400">
                        x{i.quantity}
                      </div>
                      <div className="flex flex-[10%] items-center text-orange-1">
                        ${i.price * i.quantity}
                      </div>
                    </Link>
                  )),
                )}
              </div>
              <div className="flex-[33%]">
                <Heading type="heading-5" className="mb-6">
                  Payment Details
                </Heading>
                <div className="rounded-md p-3">
                  <div className="flex justify-between">
                    <p>Products</p>
                    <p className="text-orange-1">
                      ${roundToTwoDecimals(order.total_price - shippingPrice)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="text-orange-1">${roundToTwoDecimals(shippingPrice)}</p>
                  </div>
                  <Seperator className="mb-4 mt-4" />
                  <div className="flex items-center justify-between text-xl">
                    <p>Total Price</p>
                    <p className="font-semibold text-orange-1">
                      ${roundToTwoDecimals(order.total_price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
