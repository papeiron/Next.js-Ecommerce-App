export const paths = {
  home() {
    return '/';
  },
  productShow(slug: string) {
    return `/product/${slug}`;
  },
  productsTable() {
    return '/store/products';
  },
  discountsShow() {
    return '/store/discounts';
  },
  productsList() {
    return '/products';
  },
  productsListByCategory(slug: string) {
    return `/c/${slug}`;
  },
  categoriesList() {
    return '/dashboard/categories';
  },
  myAddresses() {
    return '/account/addresses';
  },
  myReviews() {
    return '/account/reviews';
  },
  myAccountSettings() {
    return '/account/accountsettings';
  },
  cart() {
    return '/cart';
  },
};
