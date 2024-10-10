'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { Coupon } from '@prisma/client';

import { calculatePriceWithDiscounts } from '@/lib/utils';
import { CartWithDetails } from '@/types/Cart';
import { StoreForCheckout } from '@/types/Store';

type ProductType = CartWithDetails['cart_items'][number]['product'];

export type ValidCouponsType = {
  categoryCoupons: Coupon[];
  productCoupon: Coupon | null;
}[];

type ShippingCostsType = {
  [storeId: string]: number;
};

type CartContextType = {
  priceAfterCoupon: number;
  totalSaving: number;
  totalPrice: number;
  shippingCosts: ShippingCostsType;
  updateCartValues: (
    cart: CartWithDetails,
    validCoupons: ValidCouponsType | null,
  ) => void;
  cart: CartWithDetails | undefined;
  updateCart: (newCart: CartWithDetails | null) => void;
  validCoupons: ValidCouponsType | null;
  updateValidCoupons: (coupons: ValidCouponsType | null) => void;
  updateShippingCost: (storeId: string, cost: number) => void;
  calculateShippingCost: (
    storeId: string,
    carrierId: string,
    carriers: StoreForCheckout['carriers'],
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
  initialCart?: CartWithDetails | undefined;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children, initialCart }) => {
  const [priceAfterCoupon, setPriceAfterCoupon] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cart, setCart] = useState<CartWithDetails | undefined>(initialCart);
  const [validCoupons, setValidCoupons] = useState<ValidCouponsType | null>(null);
  const [shippingCosts, setShippingCosts] = useState<ShippingCostsType>({});

  useEffect(() => {
    if (initialCart) {
      setCart(initialCart);
      updateCartValues(initialCart, validCoupons);
    }
    // eslint-disable-next-line
  }, [initialCart]);

  const updateCart = useCallback(
    (newCart: CartWithDetails | null) => {
      setCart(newCart || undefined);
      if (newCart) {
        updateCartValues(newCart, validCoupons);
      }
    },
    // eslint-disable-next-line
    [validCoupons],
  );

  const updateValidCoupons = useCallback(
    (coupons: ValidCouponsType | null) => {
      setValidCoupons(coupons);
      if (cart) {
        updateCartValues(cart, coupons);
      }
    },
    // eslint-disable-next-line
    [cart],
  );

  const updateShippingCost = useCallback((storeId: string, cost: number) => {
    setShippingCosts((prevCosts) => ({
      ...prevCosts,
      [storeId]: cost,
    }));
  }, []);

  const calculateShippingCost = useCallback(
    (storeId: string, carrierId: string, carriers: StoreForCheckout['carriers']) => {
      const selectedCarrierData = carriers?.find(
        (c) => c.carrier_id === carrierId && c.store_id === storeId,
      );
      if (!selectedCarrierData || !cart) return;

      const shippingRate = selectedCarrierData.carrier.shipping_rates[0];
      if (!shippingRate) return;

      const storeItems = cart.cart_items.filter(
        (item) => item.product.store_id === storeId,
      );
      const totalWeight = storeItems.reduce((acc, item) => {
        const productWeight =
          item.product.attributes.find(
            (attr) => attr.category_attribute.name.toLowerCase() === 'weight',
          )?.value || '0';
        return acc + parseFloat(productWeight) * item.quantity;
      }, 0);

      const cost = shippingRate.base_rate + totalWeight * shippingRate.per_kg_rate;
      updateShippingCost(storeId, cost);
    },
    [cart, updateShippingCost],
  );

  const updateCartValues = useCallback(
    (currentCart: CartWithDetails, currentValidCoupons: ValidCouponsType | null) => {
      const newPriceAfterCoupon =
        currentValidCoupons?.reduce((total, coupon) => {
          const categoryDiscount = coupon.categoryCoupons.reduce(
            (sum, cat) => sum + cat.discount_amount,
            0,
          );
          const productDiscount = coupon.productCoupon
            ? coupon.productCoupon.discount_amount
            : 0;
          return total + categoryDiscount + productDiscount;
        }, 0) || 0;

      const newTotalSaving =
        currentCart.cart_items.reduce((total, item) => {
          const { totalSaving } = calculatePriceWithDiscounts(
            item.product,
            item.quantity,
          );
          return total + totalSaving;
        }, 0) + newPriceAfterCoupon;

      const newTotalPrice =
        currentCart.cart_items.reduce((total, item) => {
          const { finalPrice } = calculatePriceWithDiscounts(item.product, item.quantity);
          return total + finalPrice;
        }, 0) - newPriceAfterCoupon;

      const totalShippingCost = Object.values(shippingCosts).reduce(
        (sum, cost) => sum + cost,
        0,
      );

      setPriceAfterCoupon(newPriceAfterCoupon);
      setTotalSaving(newTotalSaving);
      setTotalPrice(newTotalPrice + totalShippingCost);
    },
    [shippingCosts],
  );

  const value: CartContextType = {
    priceAfterCoupon,
    totalSaving,
    totalPrice,
    shippingCosts,
    updateCartValues,
    cart,
    updateCart,
    validCoupons,
    updateValidCoupons,
    updateShippingCost,
    calculateShippingCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
