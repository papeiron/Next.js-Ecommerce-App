'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { addToCart } from '@/actions/cart';
import { Heading, Rating, Seperator, SubmitButton } from '@/components/shared/ui';
import AutoPlayCarousel from '@/components/shared/ui/AutoPlayCarousel';
import ProductPriceDisplay from '@/components/shared/ui/ProductPriceDisplay';
import { useCurrentUser } from '@/hooks/use-current-user';
import { calculateTotalProductRating } from '@/lib/utils';
import { ProductForShowPage } from '@/types';
import ProductDetailsTab from './ProductDetailsTab';
import { IoMdHeart } from 'react-icons/io';
import { addToFavorites, deleteFromFavorites, toggleFavorite } from '@/actions/favorites';

type ProductProps = {
  product: ProductForShowPage;
  storeRating: number | null;
  children?: React.ReactNode;
};

type FormStateType = {
  error?: { message?: { [key: string]: string[] } };
  success?: { message?: string };
};

function ProductShow({ product, storeRating, children }: ProductProps) {
  const [selectedProductAttributes, setSelectedProductAttributes] = useState<
    { attName: string; val: string }[]
  >([]);
  const [cartFormState, setCartFormState] = useState<FormStateType>({});
  const [favoriteFormState, setFavoriteFormState] = useState<FormStateType>({});
  const [animationKey, setAnimationKey] = useState(0);
  const user = useCurrentUser();
  const [isOptimisticFavorite, setIsOptimisticFavorite] = useState(
    !!product.favorites.find((f) => f.user_id === user?.id),
  );

  const router = useRouter();

  // favorites
  const isInFavoritesForCurrentUser = product.favorites.find(
    (f) => f.user_id === user?.id,
  );

  let rating;
  if (product && product.reviews && product.reviews.length > 0)
    rating = calculateTotalProductRating(product.reviews);

  const selectableProductAttributes = product?.attributes.filter(
    (att) => att.category_attribute.type === 'multi-select',
  );

  const handleSelectAttribute = (attributeName: string, val: string) => {
    const newAttribute = { attName: attributeName, val: val };

    setSelectedProductAttributes((prevAttributes) => {
      const existingIndex = prevAttributes.findIndex(
        (att) => att.attName === attributeName,
      );

      if (existingIndex !== -1) {
        const updatedAttributes = [...prevAttributes];
        updatedAttributes[existingIndex] = newAttribute;
        return updatedAttributes;
      } else {
        return [...prevAttributes, newAttribute];
      }
    });
  };

  const handleAddtoCart = async () => {
    if (!user) {
      router.push('/signin');
      return;
    }
    const res = await addToCart({
      productId: product.id,
      options: selectedProductAttributes,
      formState: {},
    });

    setCartFormState(res);
  };

  useEffect(() => {
    if (cartFormState?.error?.message) {
      const errorMessage = cartFormState?.error?.message
        ? Object.values(cartFormState?.error?.message)[0]?.[0]
        : 'An unknown error occurred';
      toast.error(errorMessage);
    }
    if (cartFormState?.success?.message)
      toast.success(cartFormState.success?.message as string);

    if (cartFormState?.error?.message?.options) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [cartFormState]);

  const handleToggleFavorite = useCallback(async () => {
    if (!user) {
      router.push('/signin');
      return;
    }

    setIsOptimisticFavorite((prev) => !prev);

    try {
      const result = await toggleFavorite(product.id, product.slug);
      if (result.error) {
        setIsOptimisticFavorite((prev) => !prev);
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
      }
    } catch (error) {
      setIsOptimisticFavorite((prev) => !prev);
      toast.error('An unexpected error occurred');
    }
  }, [user, router, product.id, product.slug]);

  useEffect(() => {
    if (favoriteFormState.error?.message) {
      const errorMessage = favoriteFormState.error.message
        ? Object.values(favoriteFormState.error.message)[0]?.[0]
        : 'An unkown error occurred';
      toast.error(errorMessage);
    }
    if (favoriteFormState.success?.message)
      toast.success(favoriteFormState.success?.message as string);
  }, [favoriteFormState]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-10">
        <div className="relative flex flex-1 flex-col gap-10">
          <AutoPlayCarousel
            images={product?.image || []}
            showNavigation={true}
            thumbnail={true}
            imageHeight="h-[500px]"
            imageSettings="object-contain"
            imageZoom={true}
          />

          <button
            onClick={handleToggleFavorite}
            className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-50 shadow-sm"
          >
            <IoMdHeart
              className={`h-6 w-6 ${
                isOptimisticFavorite ? 'text-red-600' : 'text-red-200'
              } transition-colors duration-300`}
            />
          </button>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Heading type="heading-4">{product?.name || ''}</Heading>
              {/* TODO: brand -> link */}
              <p className="soft-text">{product?.brand}</p>
            </div>

            {product?.reviews && product?.reviews.length > 0 && (
              <div className="flex items-center gap-3">
                <p className="font-semibold">{rating?.toFixed(1)}</p>
                <Rating value={rating ?? -1} size={5} editable={false} />
                <span className="text-gray-400">&#8226;</span>
                <Link href="/" className="text-xs font-medium hover:text-orange-1">
                  {product?.reviews.length} Reviews
                </Link>
              </div>
            )}

            {/* TODO?: IN CART */}

            <div>
              <ProductPriceDisplay product={product} />
            </div>

            <div className="flex gap-3 rounded-md">
              <div className="flex gap-2 font-medium">
                <p className="text-gray-400">Store:</p>
                <Link
                  href={`/s/${product.store.slug}`}
                  className="inline text-indigo-500 hover:text-orange-1"
                >
                  {product?.store.store_name}
                </Link>
              </div>
              {storeRating && (
                <div className="flex items-center justify-center rounded-md bg-green-500 px-2 text-xs font-semibold text-white">
                  {storeRating.toFixed(1)}
                </div>
              )}
            </div>
            <Seperator className="my-1" />
            {selectableProductAttributes && (
              <div className="flex flex-col gap-4">
                {selectableProductAttributes.map((att, index) => (
                  <div key={`attribute-${index}`}>
                    <p className="mb-2 font-semibold text-gray-800">
                      {att.category_attribute.name}
                    </p>

                    <ul className="flex gap-x-2">
                      {att.value
                        .split(',')
                        .sort()
                        .map((val, valIndex) => (
                          <li
                            className={`cursor-pointer rounded-md border px-4 py-2 ${cartFormState?.error?.message?.options[0].includes(att.category_attribute.name) && selectedProductAttributes.length !== selectableProductAttributes.length ? 'animate-shake border-red-300' : ''} ${selectedProductAttributes.some((att) => att.val === val) && 'border-2 !border-orange-1'}`}
                            key={`${animationKey}-${val}-${valIndex}`}
                            onClick={() =>
                              handleSelectAttribute(att.category_attribute.name, val)
                            }
                          >
                            {val.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 w-[80%]">
              <form action={handleAddtoCart}>
                <input type="text" name="" />
                <SubmitButton className="w-full">Add to cart</SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsTab product={product} />

      <section className="mb-8 flex flex-col gap-6">
        {/* ProductCarousels */}
        {children}
      </section>
    </div>
  );
}

export default ProductShow;
