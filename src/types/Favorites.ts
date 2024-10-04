import { Favorite } from '@prisma/client';
import { ProductForList } from './Product';

export type FavoritesForFavoritesPage = Favorite & {
  product: ProductForList;
};
