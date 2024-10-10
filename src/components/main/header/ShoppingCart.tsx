import Image from 'next/image';
import Link from 'next/link';

import { Button, Seperator } from '@/components/shared/ui';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { currentUser } from '@/lib/helpers';
import { fetchCartByUser } from '@/lib/services/cart';
import { calculateDiscountedPrice } from '@/lib/utils';
import { CiShoppingCart } from 'react-icons/ci';

// export const dynamic = 'force-dynamic';

type SelectedAttribute = {
  val: string;
  attName: string;
};

async function ShoppingCart() {
  let cart;
  const user = await currentUser();
  if (user && user.id) {
    cart = await fetchCartByUser(user?.id);
  }

  const shouldOpenHoverCard = cart?.cart_items && cart.cart_items.length !== 0;

  return (
    <>
      {shouldOpenHoverCard ? (
        <li>
          <HoverCard openDelay={100}>
            <HoverCardTrigger href="/cart" className="relative">
              <CiShoppingCart className="h-[25px] w-[25px] cursor-pointer hover:text-orange-1" />

              {cart?.cart_items && cart?.cart_items.length !== 0 && (
                <div className="absolute -right-[8px] -top-[5px] flex h-4 w-4 animate-bounceIn items-center justify-center overflow-hidden rounded-full bg-orange-500 text-[11px] text-white">
                  <span className="px-1">{cart?.cart_items.length}</span>
                </div>
              )}
            </HoverCardTrigger>
            <HoverCardContent className="flex max-h-80 w-72 flex-col justify-between gap-4">
              <div className="flex font-medium">
                <p>My cart: {cart?.cart_items.length} items</p>
              </div>
              <Seperator />
              <div className="flex max-h-[87.5%] flex-col gap-2 overflow-y-auto py-1">
                {!cart && <p>There are no products in your cart.</p>}
                {cart &&
                  cart.cart_items.map((cI) => (
                    <Link
                      href={`/p/${cI.product.slug}`}
                      key={cI.id}
                      className="flex gap-2 text-xs"
                    >
                      <div className="relative h-16 w-16">
                        <Image
                          src={cI.product.image[0].url}
                          alt={cI.product.image[0].alt || 'Product Image'}
                          fill
                          className="absolute rounded-xl object-contain"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-medium">{cI.product.name}</p>
                        <div className="flex gap-1 text-gray-400">
                          {(cI.selected_attributes as SelectedAttribute[])?.map(
                            (att, index) => (
                              <>
                                <p key={att.attName}>{att.val}</p>
                                <div>&#8226;</div>
                              </>
                            ),
                          )}
                          <p>Pcs: {cI.quantity}</p>
                        </div>
                        <p className="font-semibold text-orange-1">
                          ${calculateDiscountedPrice(cI.product)}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="flex items-center justify-end gap-4 bg-white">
                <Button el="anchor" href={`/cart`} className="w-2/4 text-center">
                  Go to cart
                </Button>
                <Button el="anchor" href={`/cart/checkout`} className="w-2/4 text-center">
                  Checkout
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </li>
      ) : (
        <li>
          <CiShoppingCart className="h-[25px] w-[25px] cursor-pointer hover:text-orange-1" />
        </li>
      )}
    </>
  );
}

export default ShoppingCart;
