'use server';

import { db } from '@/lib/db';
import { currentStore, currentUser } from '@/lib/helpers';
import { createNewCarrierSchema } from '@/lib/validation/store';
import { Prisma } from '@prisma/client';

type CreateNewCarrier = {
  errors?: {
    name?: string[];
    code?: string[];
    url?: string[];
    shipping_rate_name?: string[];
    shipping_rate_description?: string[];
    base_rate?: string[];
    per_kg_rate?: string[];
    min_weight?: string[];
    max_weight?: string[];
    _form?: string[];
  };
  success?: { message: string };
};

export default async function createNewCarrier(
  formState: CreateNewCarrier,
  formData: FormData,
): Promise<CreateNewCarrier> {
  const validatedFields = createNewCarrierSchema.safeParse({
    name: formData.get('name'),
    code: formData.get('code'),
    url: formData.get('url'),
    shipping_rate_name: formData.get('shipping_rate_name'),
    shipping_rate_description: formData.get('shipping_rate_description'),
    base_rate: formData.get('base_rate'),
    per_kg_rate: formData.get('per_kg_rate'),
    min_weight: formData.get('min_weight'),
    max_weight: formData.get('max_weight'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const [user, store] = await Promise.all([currentUser(), currentStore()]);

  if (!user || !user?.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  if (!store || !store.id) {
    return {
      errors: {
        _form: ['Store not found.'],
      },
    };
  }

  const { name, code, url } = validatedFields.data;

  const carrierData: Prisma.CarrierCreateInput = {
    name,
    code,
  };

  if (url) {
    carrierData.logo_url = url;
  }

  const {
    shipping_rate_name,
    shipping_rate_description,
    base_rate,
    per_kg_rate,
    min_weight,
    max_weight,
  } = validatedFields.data;

  const shippingRateData: Omit<Prisma.ShippingRateCreateInput, 'carrier'> = {
    name: shipping_rate_name,
    base_rate,
    per_kg_rate,
    min_weight,
    max_weight,
  };

  if (shipping_rate_description) {
    shippingRateData.description = shipping_rate_description;
  }

  try {
    await db.carrier.create({
      data: {
        ...carrierData,
        shipping_rates: {
          create: {
            ...shippingRateData,
          },
        },
        stores: {
          create: {
            store: {
              connect: {
                id: store.id,
              },
            },
          },
        },
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  return {
    success: {
      message: 'Carrier successfully been added.',
    },
  };
}
