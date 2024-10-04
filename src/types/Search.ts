import { Product, Category, Store } from '@prisma/client';

export type SearchResults = {
  products: Product[];
  categories: Category[];
  stores: Store[];
};
