'use server';

import { revalidatePath } from 'next/cache';
import { DateRange } from 'react-day-picker';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getStoreByUserId } from '@/lib/services/store';
import { createNewDiscountSchema } from '@/lib/validation/store';
import { paths } from '@/paths';
import { currentUser } from '@/lib/helpers';

type CreateNewDiscountState = {
  errors?: {
    name?: string[];
    description?: string[];
    discount_percent?: string[];
    categories?: string[];
    product?: string[];
    date?: string[];
    _form?: string[];
  };
  success?: { message: string };
};

type AdditionalStatesType = {
  category?: string;
  product?: string;
  date: DateRange;
};

export default async function createNewDiscount(
  additionalStates: AdditionalStatesType,
  formState: CreateNewDiscountState,
  formData: FormData,
): Promise<CreateNewDiscountState> {
  const validatedFields = createNewDiscountSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    discount_percent: formData.get('discount_percent'),
    category: additionalStates.category,
    product: additionalStates.product,
    date: additionalStates.date,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await currentUser();

  if (!user || !user?.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  const store = await getStoreByUserId(user.id);

  if (!store || !store.id) {
    return {
      errors: {
        _form: ['Store not found.'],
      },
    };
  }

  const { date, category, product, ...restData } = validatedFields.data;

  const discount = {
    ...restData,
    store_id: store.id,
    start_date: date.from,
    end_date: date.to,
  };

  try {
    const createdDiscount = await db.discount.create({
      data: discount,
    });

    if (category) {
      await db.discount.update({
        where: { id: createdDiscount.id },
        data: {
          category: {
            connect: { id: category },
          },
        },
      });
    }

    if (product) {
      await db.discount.update({
        where: { id: createdDiscount.id },
        data: {
          product: {
            connect: { id: product },
          },
        },
      });
    }
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

  revalidatePath(paths.discountsShow());

  return {
    success: {
      message: 'Discount successfully been added.',
    },
  };
}
