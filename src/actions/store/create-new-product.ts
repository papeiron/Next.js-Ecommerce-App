'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getStoreByUserId } from '@/lib/services/store';
import { generateSlug } from '@/lib/utils';
import { createEditNewProductSchema } from '@/lib/validation/store';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

type createNewProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    summary?: string[];
    price?: string[];
    stock?: string[];
    brand?: string[];
    image?: string[];
    categories?: string[];
    attributes?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

type AdditionalStatesType = {
  images: string[];
  categories: { catId: string; catName: string; catSlug: string }[];
  attributes: { category_attribute_id: string; value: string }[];
};

const createNewProduct = async (
  additionalStates: AdditionalStatesType,
  formState: createNewProductFormState,
  formData: FormData,
): Promise<createNewProductFormState> => {
  const validatedFields = createEditNewProductSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    summary: formData.get('summary'),
    price: formData.get('price'),
    stock: Number(formData.get('stock')),
    brand: formData.get('brand'),
    images: additionalStates.images,
    categories: additionalStates.categories,
    attributes: additionalStates.attributes,
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

  const store = await getStoreByUserId(session.user.id);

  if (!store || !store.id) {
    return {
      errors: {
        _form: ['Store not found.'],
      },
    };
  }

  const { images, categories, attributes, ...restFields } = validatedFields.data;

  if (categories.length < 0) {
    return {
      errors: {
        _form: ['Category or subcategory not found.'],
      },
    };
  }

  // create product
  const slug = generateSlug(restFields.name);

  const productData = {
    ...restFields,
    store_id: store.id,
    slug,
    image: {
      create: images.map((url) => ({
        url: url,
      })),
    },
    categories: {
      create: categories.map((cat) => {
        return { category: { connect: { id: cat.catId } } };
      }),
    },
    attributes: {
      create: attributes.map((attr) => ({
        category_attribute: { connect: { id: attr.category_attribute_id } },
        value: attr.value,
      })),
    },
  };

  let product;

  try {
    product = await db.product.create({
      data: productData,
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

  revalidatePath(paths.productsTable());

  return {
    success: {
      message: 'Product successfully been created.',
    },
  };
};

export default createNewProduct;
