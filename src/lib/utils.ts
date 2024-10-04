import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

import { Coupon, Discount, Review } from '@prisma/client';
import { supabaseUrl } from './supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSeconds(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function generateImagePath(imageFile: File, storagePath: string) {
  const imageName = `${Math.random()}-${imageFile.name}`.replace(/[^\w.-]/g, '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/${storagePath}/${imageName}`;

  return { imageName, imagePath };
}

export function capitalizeOnlyFirstLetter(str: string) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function generateSlug(str: string) {
  return slugify(str, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function formatDate(date: Date) {
  return format(date, 'dd MMMM');
}

export function formatDateSecondary(date: Date) {
  return format(date, 'dd.MM.yyyy EEEE HH:mm');
}

export function formatDateTertiary(date: Date) {
  return format(date, 'MMM dd, yyyy');
}

export function calculateTotalProductRating(productReviews: Review[]) {
  const rating =
    productReviews?.reduce((sum: number, review) => (sum += review.rating), 0) /
    productReviews.length;

  return rating;
}

export function roundToTwoDecimals(num: number) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

export function calculateDiscountedPrice(product: any): number {
  const { finalPrice } = calculatePriceWithDiscounts(product);

  return finalPrice;
}

export function thCategory(product: any, thFromEnd: number) {
  const categories = product.categories.map((p: any) => p.category);

  return categories[categories.length - thFromEnd];
}

export function discountCheckIfEnded(endDate: Date | null) {
  if (endDate === null) return false;
  const currentDate = new Date();
  const couponEndDate = new Date(endDate);
  return couponEndDate >= currentDate;
}

export function findProductDiscountedCategory(product: any): Discount | null {
  const discountedCategory = product.categories.find(
    (cat: any) => cat.category.discount !== null,
  );

  return discountedCategory?.category.discount || null;
}

export function calculatePriceWithDiscounts(product: any, quantity: number = 1) {
  let finalPrice = product.price;
  const oldPrice = product.price;
  let discountPercentage = 0;

  if (
    product.discount &&
    product.discount.active &&
    new Date(product.discount.start_date) <= new Date() &&
    (!product.discount.end_date || new Date(product.discount.end_date) > new Date())
  ) {
    discountPercentage += product.discount.discount_percent;
  }

  const categoryWithDiscount = product.categories.find(
    (cat: any) => cat.category.discount && cat.category.discount.active,
  );

  if (categoryWithDiscount) {
    const catDiscount = categoryWithDiscount.category.discount;
    if (
      catDiscount &&
      new Date(catDiscount.start_date) <= new Date() &&
      (!catDiscount.end_date || new Date(catDiscount.end_date) > new Date())
    ) {
      discountPercentage += catDiscount.discount_percent;
    }
  }

  if (discountPercentage > 0) {
    finalPrice *= 1 - discountPercentage / 100;
  }

  finalPrice *= quantity;

  return {
    finalPrice: Number(finalPrice.toFixed(2)),
    oldPrice: oldPrice * quantity,
    discountPercentage: Number(discountPercentage.toFixed(2)),
    totalSaving: product.price * quantity - Number(finalPrice.toFixed(2)),
  };
}

export function findValidCoupons(
  product: any,
  couponCode: string,
): { productCoupon: Coupon | null; categoryCoupons: Coupon[] } | null {
  let productCoupon: Coupon | null = null;
  let categoryCoupons: Coupon[] = [];

  productCoupon =
    product.coupons.find(
      (coupon: Coupon) =>
        coupon.code === couponCode &&
        coupon.uses_count > 0 &&
        discountCheckIfEnded(coupon.end_date),
    ) || null;

  categoryCoupons = product.categories
    .flatMap((category: any) => category.category.coupons)
    .filter(
      (coupon: Coupon) =>
        coupon.code === couponCode &&
        coupon.uses_count > 0 &&
        discountCheckIfEnded(coupon.end_date),
    );

  if (!productCoupon && categoryCoupons.length === 0) {
    return null;
  }

  return { productCoupon, categoryCoupons };
}

export function convertToSubcurrency(amount: number, factor = 100): number {
  return Math.round(amount * factor);
}
