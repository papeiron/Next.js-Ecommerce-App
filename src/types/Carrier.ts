import { Prisma, StoreCarrier } from '@prisma/client';

// carrier
type CarrierRelations = Prisma.CarrierInclude;
export type CarrierWith<T extends keyof CarrierRelations> = Prisma.CarrierGetPayload<{
  include: Pick<CarrierRelations, T>;
}>;
export type CarrierWithRelations = CarrierWith<
  '_count' | 'shipments' | 'shipping_rates' | 'stores'
>;

// store carrier
type StoreCarrierRelations = Prisma.StoreCarrierInclude;
export type StoreCarrierWith<T extends keyof StoreCarrierRelations> =
  Prisma.StoreCarrierGetPayload<{
    include: Pick<StoreCarrierRelations, T>;
  }>;
export type StoreCarrierWithRelations = StoreCarrierWith<'carrier' | 'store'>;

export type StoreCarrierForTable = StoreCarrier & {
  carrier: CarrierWith<'shipping_rates'>;
};
