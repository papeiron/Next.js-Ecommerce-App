import CartTable from '@/components/main/cart/CartTable';
import TotalPrice from '@/components/main/cart/TotalPrice';
import { Seperator } from '@/components/shared/ui';

async function CartPage() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <CartTable />
        <Seperator />
        <TotalPrice />
      </div>
    </div>
  );
}

export default CartPage;
