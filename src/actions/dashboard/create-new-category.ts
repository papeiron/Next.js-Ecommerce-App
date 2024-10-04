'use server';

import { db } from '@/lib/db';
import { currentRole, currentUser } from '@/lib/helpers';
import { generateSlug } from '@/lib/utils';
import { createNewCategorySchema } from '@/lib/validation/category';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

export type Attribute = {
  name: string;
  type: string;
  required: string;
  options: string;
};

type createNewProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

type AdditionalStatesType = {
  attributes?: Attribute[];
  categories?: { catId: string; catName: string; catSlug: string }[];
};

const createNewCategory = async (
  additionalStates: AdditionalStatesType,
  formState: createNewProductFormState,
  formData: FormData,
): Promise<createNewProductFormState> => {
  const validatedFields = createNewCategorySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    attributes: additionalStates.attributes,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await currentUser();

  if (!user || !user.id || !user.role) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  const role = await currentRole();

  if (role !== 'ADMIN') {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  try {
    const newCategory = await db.category.create({
      data: {
        parent_id: additionalStates.categories?.length
          ? additionalStates.categories[additionalStates.categories.length - 1].catId
          : null,
        name: validatedFields.data.name,
        slug: generateSlug(validatedFields.data.name),
        description: validatedFields.data.description,
      },
    });

    if (additionalStates.categories)
      additionalStates.categories.push({
        catId: newCategory.id,
        catName: newCategory.name,
        catSlug: newCategory.slug,
      });

    if (additionalStates.attributes && additionalStates.categories) {
      for (const attr of additionalStates.attributes) {
        let categoryAttribute = await db.categoryAttribute.findFirst({
          where: {
            name: attr.name,
            type: attr.type,
          },
        });

        if (categoryAttribute) {
          if (attr.type === 'multi-select') {
            const existingOptions = new Set(categoryAttribute.options?.split(',') || []);
            const newOptions = attr.options.split(',');

            newOptions.forEach((option) => existingOptions.add(option.trim()));

            const mergedOptions = Array.from(existingOptions).join(',');

            categoryAttribute = await db.categoryAttribute.update({
              where: { id: categoryAttribute.id },
              data: { options: mergedOptions },
            });
          }
        } else {
          categoryAttribute = await db.categoryAttribute.create({
            data: {
              name: attr.name,
              type: attr.type,
              required: attr.required === 'yes',
              options: attr.options,
            },
          });
        }

        for (const cat of additionalStates.categories) {
          const existingRelation = await db.categoryAttributeRelation.findUnique({
            where: {
              category_id_category_attribute_id: {
                category_id: cat.catId,
                category_attribute_id: categoryAttribute.id,
              },
            },
          });

          if (!existingRelation) {
            await db.categoryAttributeRelation.create({
              data: {
                category_id: cat.catId,
                category_attribute_id: categoryAttribute.id,
              },
            });
          }
        }
      }
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

  revalidatePath(paths.categoriesList());

  return {
    success: { message: 'Category created successfully' },
  };
};

export default createNewCategory;
