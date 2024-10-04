import type { ProductForList, ProductForShowPage, ProductForTable } from '@/types';
import { Prisma } from '@prisma/client';
import { db } from '../db';
import { generateSlug, thCategory } from '../utils';

export type FetchProductsByStoreProps = {
  storeId?: string;
  sortBy?: {
    sort?: string;
    order?: string;
  };
  currentPage?: number;
  itemsPerPage?: number;
  querySearch?: string;
};

export const fetchProductsByStore = async ({
  storeId,
  sortBy,
  currentPage,
  itemsPerPage = 10,
  querySearch,
}: FetchProductsByStoreProps): Promise<{
  countOfProducts: number;
  products: ProductForTable[];
}> => {
  try {
    //  SEARCH
    const where: Prisma.ProductWhereInput = {
      store_id: storeId,
      ...(querySearch &&
        querySearch.length > 0 && {
          OR: [
            { name: { contains: querySearch } },
            { description: { contains: querySearch } },
            { summary: { contains: querySearch } },
            { price: { equals: parseFloat(querySearch) || undefined } },
            { stock: { equals: parseInt(querySearch) || undefined } },
            {
              status: {
                equals:
                  querySearch.toLowerCase() === 'true'
                    ? true
                    : querySearch.toLowerCase() === 'false'
                      ? false
                      : undefined,
              },
            },
            { brand: { contains: querySearch } },
            { categories: { some: { category: { name: { contains: querySearch } } } } },
          ],
        }),
    };

    const query: Prisma.ProductFindManyArgs = {
      where,
      include: {
        image: true,
        categories: {
          include: {
            category: true,
          },
        },
        reviews: true,
        _count: {
          select: {
            favorites: true,
          },
        },
        favorites: true,
        attributes: {
          include: {
            product: true,
          },
        },
      },
    };

    //  PAGINATION
    if (currentPage && itemsPerPage) {
      const skip = (currentPage - 1) * itemsPerPage;
      const take = itemsPerPage;
      query.skip = skip;
      query.take = take;
    }

    //  SORTINGs
    if (sortBy && sortBy.sort && sortBy.sort !== 'favorites') {
      const { sort, order } = sortBy;
      if (sort === 'category') {
        query.orderBy = {
          categories: {
            _count: order as Prisma.SortOrder,
          },
        };
      } else {
        query.orderBy = { [sort]: order as Prisma.SortOrder };
      }
    } else {
      query.orderBy = { created_at: 'desc' };
    }

    //

    const products = (await db.product.findMany(query)) as ProductForTable[];

    // sortBy favorites
    if (sortBy && sortBy.sort === 'favorites') {
      const order = sortBy.order === 'desc' ? -1 : 1;
      products.sort((a, b) => (a._count.favorites - b._count.favorites) * order);
    }

    const countOfProducts = await db.product.count({ where });

    return { countOfProducts: countOfProducts || 0, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { countOfProducts: 0, products: [] };
  }
};

export const fetchProductBySlug = async (
  slug: string,
): Promise<ProductForShowPage | null> => {
  try {
    const product = (await db.product.findUnique({
      where: {
        slug,
        status: true,
        store: {
          isActive: true,
        },
      },
      include: {
        image: true,
        categories: {
          include: {
            category: {
              include: {
                attributes: true,
                discount: true,
              },
            },
          },
        },
        favorites: true,
        attributes: {
          include: {
            product: true,
            category_attribute: true,
          },
        },
        discount: true,
        reviews: {
          include: {
            user: true,
          },
        },
        coupons: true,
        store: true,
      },
    })) as ProductForShowPage | null;

    return product;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export const fetchAllProducts = async () => {
  try {
    const products = await db.product.findMany({
      where: {
        status: true,
        store: {
          isActive: true,
        },
      },
      include: {
        image: true,
        categories: true,
        favorites: true,
        attributes: {
          include: {
            product: true,
          },
        },
        discount: true,
        reviews: true,
        coupons: true,
        store: true,
      },
    });

    return products;
  } catch {
    return null;
  }
};

export const fetchTotalProductsCount = async (storeId: string) => {
  try {
    const count = await db.product.count({
      where: {
        store_id: storeId,
        status: true,
      },
    });

    return count;
  } catch {
    null;
  }
};

export const fetchProductsWithOptions = async (
  term?: string,
  storeId?: string | undefined,
): Promise<ProductForList[] | null> => {
  try {
    let query: Prisma.ProductFindManyArgs = {
      where: {
        status: true,
        store: {
          isActive: true,
        },
      },
      include: {
        reviews: true,
        image: true,
        order_items: true,
        coupons: true,
        discount: true,
        categories: {
          include: {
            category: {
              include: {
                discount: true,
              },
            },
          },
        },
      },
      take: 25,
    };

    if (storeId) {
      query.where = {
        ...query.where,
        store_id: storeId,
      };
    }

    if (term === 'discountedProducts') {
      const currentDate = new Date();

      const discountCondition: Prisma.DiscountWhereInput = {
        AND: [
          { id: { not: undefined } },
          {
            OR: [{ end_date: null }, { end_date: { gt: currentDate } }],
          },
          { active: true },
        ],
      };

      const queryCondition: Prisma.ProductWhereInput = {
        OR: [
          {
            discount: discountCondition,
          },
          {
            categories: {
              some: {
                category: {
                  discount: discountCondition,
                },
              },
            },
          },
        ],
      };

      query.where = {
        ...query.where,
        ...queryCondition,
      };
    }

    if (term === 'latestProducts') {
      query.orderBy = { created_at: 'desc' };
    }

    if (term === 'sortByFavorite') {
      query.orderBy = {
        favorites: {
          _count: 'desc',
        },
      };
    }

    if (term === 'mostSelling') {
      query.orderBy = {
        order_items: {
          _count: 'desc',
        },
      };
    }

    if (term?.startsWith('similarProducts')) {
      const [_, productName] = term.split(':');

      const product = await fetchProductBySlug(generateSlug(productName));

      if (product) {
        query.where = {
          ...query.where,
          brand: {
            contains: product.brand,
          },
        };
      }
    }

    if (term?.startsWith('sameCategoryProducts')) {
      const [_, productName, categoryName] = term.split(':');

      query.where = {
        ...query.where,
        categories: {
          some: {
            category: {
              name: categoryName,
            },
          },
        },
        name: {
          not: productName,
        },
      };
    }

    const products = (await db.product.findMany(query)) as ProductForList[];

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export async function fetchProductsForList({
  categorySlug,
  minPrice,
  maxPrice,
  filter,
  sortBy,
  searchQuery,
}: {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  filter?: string;
  sortBy?: string;
  searchQuery?: string;
}): Promise<ProductForList[]> {
  try {
    const query: Prisma.ProductFindManyArgs = {
      include: {
        image: true,
        reviews: true,
        order_items: true,
        coupons: true,
        discount: true,
        categories: {
          include: {
            category: {
              include: {
                discount: true,
              },
            },
          },
        },
      },
      where: {
        status: true,
        store: {
          isActive: true,
        },
      },
    };

    if (searchQuery) {
      query.where = {
        ...query.where,
        OR: [{ name: { contains: searchQuery } }, { brand: { contains: searchQuery } }],
      };
    }

    if (filter) {
      const filterPairs = filter.split(',').map((f) => f.split(':'));

      const groupedFilters = filterPairs.reduce(
        (acc, [key, value]) => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(value);
          return acc;
        },
        {} as Record<string, string[]>,
      );

      if (groupedFilters.MinPrice || groupedFilters.MaxPrice) {
        const priceFilter: { gte?: number; lte?: number } = {};

        if (
          groupedFilters.MinPrice &&
          Array.isArray(groupedFilters.MinPrice) &&
          groupedFilters.MinPrice.length > 0
        ) {
          const MinPrice = Number(groupedFilters.MinPrice[0]);
          if (!isNaN(MinPrice)) priceFilter.gte = MinPrice;
        }

        if (
          groupedFilters.MaxPrice &&
          Array.isArray(groupedFilters.MaxPrice) &&
          groupedFilters.MaxPrice.length > 0
        ) {
          const MaxPrice = Number(groupedFilters.MaxPrice[0]);
          if (!isNaN(MaxPrice)) priceFilter.lte = MaxPrice;
        }

        if (Object.keys(priceFilter).length > 0) {
          query.where = {
            ...query.where,
            price: priceFilter,
          };
        }
      } else {
        query.where = {
          ...query.where,
          AND: Object.entries(groupedFilters).map(([key, values]) => ({
            attributes: {
              some: {
                category_attribute: {
                  name: key,
                },
                OR: values.map((value) => ({
                  OR: [
                    { value: value },
                    { value: { contains: value } }, // multi-select
                  ],
                })),
              },
            },
          })),
        };
      }
    }

    if (minPrice || maxPrice) {
      query.where = {
        ...query.where,
        price: {
          ...(minPrice ? { gte: minPrice } : {}),
          ...(maxPrice ? { lte: maxPrice } : {}),
        },
      };
    }

    if (sortBy) {
      const [field, order] = sortBy.split('_');

      let orderBy: any = {};

      switch (field) {
        case 'price':
          orderBy.price = order === 'asc' ? 'asc' : 'desc';
          break;
        case 'review':
          orderBy.reviews = { _count: 'desc' };
          break;
        case 'newest':
          orderBy.created_at = 'desc';
          break;
      }

      query.orderBy = {
        ...orderBy,
      };
    }

    if (!categorySlug) {
      return (await db.product.findMany(query)) as ProductForList[];
    }

    const category = await db.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      console.log(`No category found for slug: ${categorySlug}`);
      return [];
    }

    return (await db.product.findMany({
      ...query,
      where: {
        ...query.where,
        categories: {
          some: {
            category_id: category.id,
          },
        },
      },
    })) as ProductForList[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductsWithExtremePrice() {
  const [maxPriceProduct, minPriceProduct] = await db.$transaction([
    db.product.findFirst({
      where: {
        status: true,
      },
      orderBy: {
        price: 'desc',
      },
    }),

    db.product.findFirst({
      where: {
        status: true,
      },
      orderBy: {
        price: 'asc',
      },
    }),
  ]);

  return {
    maxPriceProduct: maxPriceProduct?.price ?? 0,
    minPriceProduct: minPriceProduct?.price ?? 0,
  };
}

export async function fetchStoreRatingByProductSlug(
  productSlug: string,
): Promise<number | null> {
  try {
    const product = await db.product.findUnique({
      where: { slug: productSlug },
      select: { store_id: true },
    });

    if (!product) {
      console.error(`Product with slug ${productSlug} not found`);
      return null;
    }

    const storeProducts = await db.product.findMany({
      where: {
        store_id: product.store_id,
        store: {
          isActive: true,
        },
      },
      select: {
        id: true,
        reviews: {
          select: { rating: true },
        },
      },
    });

    const allRatings = storeProducts.flatMap((product) =>
      product.reviews.map((review) => review.rating),
    );

    if (allRatings.length === 0) {
      return null;
    }

    const averageRating =
      allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

    return Number((averageRating * 2).toFixed(2));
  } catch (error) {
    console.error('Error fetching store rating:', error);
    return null;
  }
}

export async function fetchProductsByUser(userId: string) {
  try {
    const products = db.product.findMany({
      where: {
        id: userId,
      },
    });

    return products;
  } catch (error) {
    console.error('Error fetching store rating:', error);
    return null;
  }
}

async function fetchSimilarProducts(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      store: true,
    },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  const similarProducts = await db.product.findMany({
    where: {
      OR: [
        {
          categories: {
            some: {
              category_id: {
                in: product.categories.map((pc: any) => pc.category_id),
              },
            },
          },
        },
        {
          store_id: product.store_id,
          id: { not: product.id },
        },
        {
          brand: product.brand,
          id: { not: product.id },
        },
      ],
      AND: [
        { id: { not: product.id } },
        {
          name: {
            contains: product.name.split(' ')[0],
            not: product.name,
          },
        },
      ],
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      store: true,
    },
    take: 10,
  });

  return similarProducts;
}
