'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/helpers';
import { fetchProductsByStore } from '@/lib/services/product';
import { generateSlug } from '@/lib/utils';
import { createEditNewProductSchema } from '@/lib/validation/store';
import { paths } from '@/paths';

type editProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    summary?: string[];
    price?: string[];
    stock?: string[];
    brand?: string[];
    image?: string[];
    category?: string[];
    attributes?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

type AdditionalStatesType = {
  images: string[];
  categories: { catId: string; catName: string; catSlug: string }[];
  attributes: { category_attribute_id: string; value: string }[];
  productId: string;
};

const editProduct = async (
  additionalStates: AdditionalStatesType,
  formState: editProductFormState,
  formData: FormData,
): Promise<editProductFormState> => {
  const validatedFields = createEditNewProductSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    summary: formData.get('summary'),
    price: Number(formData.get('price')),
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

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  if (!user.store || !user.store.id) {
    return {
      errors: {
        _form: ['Store not found.'],
      },
    };
  }

  const { products } = await fetchProductsByStore({
    storeId: user.store.id,
  });

  const productIds = products?.map((product: any) => product.id);

  if (!productIds?.includes(additionalStates.productId)) {
    return {
      errors: {
        _form: ['You are not allowed to do that'],
      },
    };
  }

  const { images, categories, attributes, ...restFields } = validatedFields.data;

  // update
  const slug = generateSlug(restFields.name);

  const productData = {
    ...restFields,
    slug,
    categories: {
      deleteMany: {},
      create: categories.map((cat) => ({
        category: { connect: { id: cat.catId } },
      })),
    },
    attributes: {
      deleteMany: {},
      create: attributes.map((attr) => ({
        category_attribute: { connect: { id: attr.category_attribute_id } },
        value: attr.value,
      })),
    },
  };

  let updatedProduct;
  try {
    updatedProduct = await db.product.update({
      where: { id: additionalStates.productId, store_id: user.store.id },
      data: productData,
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
          _form: ['Something went wrong'],
        },
      };
    }
  }

  // create images
  const newProductImages = images.map((img) => ({
    product_id: updatedProduct.id,
    url: img,
  }));

  try {
    // check existing URLs in db
    const existingUrls = await db.productImage.findMany({
      where: {
        url: {
          in: images,
        },
        product_id: updatedProduct.id,
      },
      select: {
        url: true,
      },
    });

    const existingUrlsSet = new Set(existingUrls.map((img) => img.url));

    const imagesToAdd = newProductImages.filter((img) => !existingUrlsSet.has(img.url));

    if (imagesToAdd.length > 0) {
      await db.productImage.createMany({
        data: imagesToAdd,
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

  revalidatePath(paths.productsTable());
  revalidatePath(paths.productsList());

  return {
    success: { message: 'Product successfully been edited' },
  };
};

export default editProduct;
