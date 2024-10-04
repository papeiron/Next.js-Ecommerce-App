'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';
import { newApplicationSchema } from '@/lib/validation/store';

type newApplicationFormState = {
  errors?: {
    cellphone?: string[];
    address?: string[];
    storename?: string[];
    description?: string[];
    img?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

const newApplication = async (
  formState: newApplicationFormState,
  formData: FormData,
): Promise<newApplicationFormState> => {
  const validatedFields = newApplicationSchema.safeParse({
    cellphone: formData.get('cellphone'),
    address: formData.get('address'),
    storename: formData.get('storename'),
    description: formData.get('description'),
    img: formData.get('img'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  const isStoreCreatedByUserAlready = await db.store.findUnique({
    where: {
      user_id: session.user.id,
    },
  });

  if (isStoreCreatedByUserAlready) {
    return {
      errors: {
        _form: ['You have already created a shop.'],
      },
    };
  }

  const { storename, description, img, address, cellphone } = validatedFields.data;

  try {
    await db.store.create({
      data: {
        user_id: session.user.id,
        slug: generateSlug(storename),
        store_name: storename,
        description,
        img,
        address,
        cell_phone: cellphone,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Failed to create post'],
        },
      };
    }
  }

  // changing role

  await db.user.update({
    where: { id: session.user.id },
    data: { role: 'STORE_OWNER' },
  });

  return {
    success: {
      message:
        'Your application has been submitted and your store has been automatically approved.',
    },
  };
};

export default newApplication;
