import { CategoryForSidebar, CategoryWith, ProductCategoryWith } from '@/types';
import { Category, Prisma } from '@prisma/client';
import { db } from '../db';

export async function fetchCategories(term?: string): Promise<CategoryForSidebar[]> {
  let query: Prisma.CategoryFindManyArgs = {
    include: {
      sub_categories: {
        include: {
          products: true,
        },
      },
      products: true,
      attributes: {
        include: {
          category_attribute: true,
        },
      },
    },
  };

  if (term && term !== 'all') {
    query.where = {
      name: term,
    };
  }

  try {
    const categories = await db.category.findMany(query);

    return categories as CategoryForSidebar[];
  } catch {
    throw new Error("Couldn't fetch categories");
  }
}

export async function fetchMainCategories(): Promise<CategoryForSidebar[]> {
  let query: Prisma.CategoryFindManyArgs = {
    include: {
      sub_categories: {
        include: {
          _count: {
            select: { products: true },
          },
        },
        where: {
          isActive: true,
        },
      },
      products: {
        include: {
          product: true,
        },
      },
    },
    where: {
      AND: [{ parent_id: null }, { isActive: true }],
    },
  };

  try {
    const categories = await db.category.findMany(query);

    return categories as CategoryForSidebar[];
  } catch {
    throw new Error("Couldn't fetch categories");
  }
}

export async function fetchCategoryBySlug(
  slug: string,
): Promise<CategoryForSidebar | null> {
  let query: Prisma.CategoryFindManyArgs = {
    include: {
      sub_categories: {
        include: {
          _count: {
            select: { products: true },
          },
        },
        where: {
          isActive: true,
        },
      },
      products: {
        include: {
          product: true,
        },
      },
      attributes: {
        include: {
          category_attribute: {
            include: {
              product_attributes: true,
            },
          },
        },
      },
    },
    where: {
      AND: [{ slug }, { isActive: true }],
    },
  };

  try {
    const category = (await db.category.findFirst(query)) as CategoryForSidebar;
    return category;
  } catch {
    throw new Error("Couldn't fetch categories");
  }
}

export async function fetchAllCategories() {
  try {
    const categories = await db.category.findMany({
      select: {
        slug: true,
      },
    });

    return categories;
  } catch {
    throw new Error("Couldn't fetch categories");
  }
}

export async function fetchCategoryChainByProduct(
  productSlug: string,
): Promise<Array<Category> | undefined> {
  try {
    let product = await db.product.findUnique({
      where: {
        slug: productSlug,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    const categories = product?.categories.map((p) => p.category);

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error("Couldn't fetch categories");
  }
}

export async function getCategoryWithParents(slug: string): Promise<any[]> {
  const getParentCategories = async (
    category: any,
    categories: any[] = [],
  ): Promise<any[]> => {
    categories.unshift(category);

    if (category.parent_id) {
      const parentCategory = await db.category.findUnique({
        where: { id: category.parent_id },
        include: { parent: true },
      });

      if (parentCategory) {
        return getParentCategories(parentCategory, categories);
      }
    }

    return categories;
  };

  const category = await db.category.findUnique({
    where: { slug },
    include: { parent: true },
  });

  if (!category) {
    throw new Error(`Category with slug "${slug}" not found`);
  }

  return getParentCategories(category);
}

export async function getTopSellingCategoriesByStore(storeId: string, limit: number = 4) {
  const topCategories = await db.category.findMany({
    where: {
      parent_id: null,
      products: {
        some: {
          product: {
            store_id: storeId,
            order_items: {
              some: {},
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      products: {
        select: {
          product: {
            select: {
              order_items: {
                select: {
                  quantity: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      products: {
        _count: 'desc',
      },
    },
    take: limit,
  });

  const categoriesWithSales = topCategories.map((category) => ({
    id: category.id,
    name: category.name,
    totalSales: category.products.reduce(
      (sum, prod) =>
        sum +
        prod.product.order_items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0,
    ),
  }));

  categoriesWithSales.sort((a, b) => b.totalSales - a.totalSales);

  return categoriesWithSales;
}

export async function fetchCategorybyProduct(
  searchQuery: string,
): Promise<CategoryForSidebar[] | null> {
  try {
    const categories = await db.category.findMany({
      include: {
        sub_categories: {
          include: {
            _count: {
              select: { products: true },
            },
          },
          where: {
            isActive: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },

        attributes: {
          include: {
            category_attribute: {
              include: {
                product_attributes: true,
              },
            },
          },
        },
      },
      where: {
        AND: [{ isActive: true }],
        products: {
          some: {
            product: {
              OR: [
                { name: { contains: searchQuery } },
                { description: { contains: searchQuery } },
                { summary: { contains: searchQuery } },
              ],
            },
          },
        },
      },
    });

    // @ts-ignore
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error("Couldn't fetch categories");
  }
}
