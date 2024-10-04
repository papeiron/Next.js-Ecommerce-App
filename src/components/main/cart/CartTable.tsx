import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { currentUser } from '@/lib/helpers';
import { fetchCartByUser } from '@/lib/services/cart';
import { CartWithDetails } from '@/types';
import CartTableRow from './CartTableRow';

async function CartTable() {
  const user = await currentUser();

  let cart: CartWithDetails | null;
  if (user && user.id) {
    cart = await fetchCartByUser(user?.id);
  } else {
    return <p>Your cart is empty</p>;
  }

  if ((cart && cart?.cart_items.length === 0) || !cart) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      {cart?.cart_items.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Product</TableHead>
              <TableHead className="w-[45%]"></TableHead>
              <TableHead className="w-[15%]">Price</TableHead>
              <TableHead className="w-[15%]">Pcs</TableHead>
              <TableHead className="w-[10%]">Total</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.cart_items.map((item) => (
              <CartTableRow key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default CartTable;
