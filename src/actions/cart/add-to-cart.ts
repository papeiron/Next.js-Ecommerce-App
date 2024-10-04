'use server';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { addCartSchema } from '@/lib/validation/cart';
import { revalidateTag } from 'next/cache';

type FormStateType = {
  error?: { message?: { [key: string]: string[] } };
  success?: { message?: string };
};

type addToCart = {
  productId: string;
  options: {
    attName: string;
    val: string;
  }[];
  formState: FormStateType;
};

const addToCart = async ({
  productId,
  options,
  formState,
}: addToCart): Promise<FormStateType> => {
  const user = await currentUser();

  if (!user) {
    return { error: { message: { auth: ['You must be signed in to do this.'] } } };
  }

  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      attributes: {
        include: {
          category_attribute: true,
        },
      },
    },
  });

  if (!product) {
    return { error: { message: { general: ['Product not found'] } } };
  }

  const selectableAttributes = product.attributes.filter(
    (attr) => attr.category_attribute.type === 'multi-select',
  );

  const requiredSelectableAttributes = selectableAttributes
    .filter((attr) => attr.category_attribute.required)
    .map((attr) => attr.category_attribute.name);

  const validatedFields = addCartSchema.safeParse({ productId, options });

  if (!validatedFields.success) {
    return {
      error: { message: validatedFields.error.formErrors.fieldErrors },
    };
  }

  const missingAttributes = requiredSelectableAttributes.filter(
    (attr) => !options.some((opt) => opt.attName === attr),
  );

  if (missingAttributes.length > 0) {
    return {
      error: {
        message: {
          options: [`Missing required attributes: ${missingAttributes.join(', ')}`],
        },
      },
    };
  }

  const { productId: validatedId, options: validatedOptions } = validatedFields.data;

  try {
    let cart = await db.cart.findFirst({
      where: { user_id: user.id },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { user_id: user.id },
      });
    }

    await db.cartItem.create({
      data: {
        cart_id: cart.id,
        product_id: validatedId,
        quantity: 1,
        selected_attributes: validatedOptions,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: {
          message: { _form: [err.message] },
        },
      };
    } else {
      return {
        error: {
          message: { _form: ['Something went wrong.'] },
        },
      };
    }
  }

  revalidateTag('cart');

  return {
    success: {
      message: 'Succesfully added to cart.',
    },
  };
};

export default addToCart;
