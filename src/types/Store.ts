import { Carrier, Prisma, ShippingRate, Store, StoreCarrier } from '@prisma/client';

type StoreRelations = Prisma.StoreInclude;

export type StoreWith<T extends keyof StoreRelations> = Prisma.StoreGetPayload<{
  include: Pick<StoreRelations, T>;
}>;

type StoreCarrierRelations = Prisma.StoreCarrierInclude;

export type StoreCarrierWith<T extends keyof StoreCarrierRelations> =
  Prisma.StoreCarrierGetPayload<{
    include: Pick<StoreCarrierRelations, T>;
  }>;

export type StoreForCheckout = Store & {
  carriers: (StoreCarrier & {
    carrier: Carrier & {
      shipping_rates: ShippingRate[];
    };
  })[];
};
