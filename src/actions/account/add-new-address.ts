'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { addressSchema } from '@/lib/validation/account';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

type createNewProductFormState = {
  errors?: {
    title?: string[];
    address_line_1?: string[];
    address_line_2?: string[];
    country?: string[];
    city?: string[];
    postal_code?: string[];
    landmark?: string[];
    phone_number?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

const createNewAddress = async (
  formState: createNewProductFormState,
  formData: FormData,
): Promise<createNewProductFormState> => {
  const validatedFields = addressSchema.safeParse({
    title: formData.get('title'),
    address_line_1: formData.get('address_line_1'),
    address_line_2: formData.get('address_line_2'),
    country: formData.get('country'),
    city: formData.get('city'),
    postal_code: formData.get('postal_code'),
    landmark: formData.get('landmark'),
    phone_number: formData.get('phone_number'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  try {
    await db.address.create({
      data: {
        ...validatedFields.data,
        user: {
          connect: {
            id: user.id,
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

  revalidatePath(paths.myAddresses());

  return {
    success: { message: 'Address successfully added.' },
  };
};

export default createNewAddress;
