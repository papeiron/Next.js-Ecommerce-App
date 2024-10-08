'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { addToCart } from '@/actions/cart';
import { toggleFavorite } from '@/actions/favorites';
import { Heading, Rating, Seperator } from '@/components/shared/ui';
import AutoPlayCarousel from '@/components/shared/ui/AutoPlayCarousel';
import ProductPriceDisplay from '@/components/shared/ui/ProductPriceDisplay';
import { useCurrentUser } from '@/hooks/use-current-user';
import { calculateTotalProductRating } from '@/lib/utils';
import { ProductForShowPage } from '@/types';
import { IoMdHeart } from 'react-icons/io';
import ProductDetailsTab from './ProductDetailsTab';

type ProductProps = {
  product: ProductForShowPage;
  storeRating: number | null;
  children?: React.ReactNode;
};

function ProductShow({ product, storeRating, children }: ProductProps) {
  const [selectedProductAttributes, setSelectedProductAttributes] = useState<
    { attName: string; val: string }[]
  >([]);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const user = useCurrentUser();

  const [cartError, setCartError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  const rating =
    product.reviews.length > 0 ? calculateTotalProductRating(product.reviews) : null;

  const selectableProductAttributes = product.attributes.filter(
    (att) => att.category_attribute.type === 'multi-select',
  );

  const handleSelectAttribute = (attributeName: string, val: string) => {
    setSelectedProductAttributes((prevAttributes) => {
      const existingIndex = prevAttributes.findIndex(
        (att) => att.attName === attributeName,
      );

      if (existingIndex !== -1) {
        const updatedAttributes = [...prevAttributes];
        updatedAttributes[existingIndex] = { attName: attributeName, val };
        return updatedAttributes;
      } else {
        return [...prevAttributes, { attName: attributeName, val }];
      }
    });
  };

  const handleAddtoCart = async () => {
    if (!user) {
      toast.error('You must be signed in to do this.');
      return;
    }

    setIsAddingToCart(true);
    setCartError(null);
    toast.loading('Adding to cart...', { id: 'addToCart' });

    try {
      const res = await addToCart({
        productId: product.id,
        options: selectedProductAttributes,
        formState: {},
      });

      if (res.error) {
        const errorMessage = res.error.message
          ? Object.values(res.error.message)[0]?.[0]
          : 'An unknown error occurred';
        toast.error(errorMessage, { id: 'addToCart' });
        setCartError(errorMessage);

        if (res.error.message?.options) {
          setAnimationKey((prev) => prev + 1);
        }
      } else if (res.success) {
        toast.success(res.success.message as string, { id: 'addToCart' });
      }
    } catch (error) {
      toast.error('Failed to add to cart', { id: 'addToCart' });
      setCartError('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    if (user && product.favorites) {
      setIsFavorite(product.favorites.some((f) => f.user_id === user.id));
    }
  }, [user, product.favorites]);

  const handleToggleFavorite = useCallback(async () => {
    if (!user) {
      router.push('/signin');
      return;
    }

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    try {
      const result = await toggleFavorite(product.id, product.slug);
      if (result.error) {
        setIsFavorite(!newFavoriteState);
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
      }
    } catch (error) {
      setIsFavorite(!newFavoriteState);
      toast.error('An unexpected error occurred');
    }
  }, [user, router, product.id, product.slug, isFavorite]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-10">
        <div className="relative flex flex-1 flex-col gap-10">
          <AutoPlayCarousel
            images={product.image || []}
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
              className={`h-6 w-6 transition-colors duration-300 ${
                isFavorite ? 'text-red-600' : 'text-gray-300'
              }`}
            />
          </button>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Heading type="heading-4">{product.name || ''}</Heading>
              <p className="soft-text">{product.brand}</p>
            </div>

            {rating !== null && (
              <div className="flex items-center gap-3">
                <p className="font-semibold">{rating.toFixed(1)}</p>
                <Rating value={rating} size={5} editable={false} />
                <span className="text-gray-400">&#8226;</span>
                <Link href="/" className="text-xs font-medium hover:text-orange-1">
                  {product.reviews.length} Reviews
                </Link>
              </div>
            )}

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
                  {product.store.store_name}
                </Link>
              </div>
              {storeRating && (
                <div className="flex items-center justify-center rounded-md bg-green-500 px-2 text-xs font-semibold text-white">
                  {storeRating.toFixed(1)}
                </div>
              )}
            </div>
            <Seperator className="my-1" />
            {selectableProductAttributes.length > 0 && (
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
                            className={`cursor-pointer rounded-md border px-4 py-2 ${
                              cartError &&
                              selectedProductAttributes.length !==
                                selectableProductAttributes.length
                                ? 'animate-shake border-red-300'
                                : ''
                            } ${
                              selectedProductAttributes.some((att) => att.val === val) &&
                              'border-2 !border-orange-1'
                            }`}
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
              <button
                onClick={handleAddtoCart}
                disabled={isAddingToCart}
                className={`w-full rounded-md bg-orange-500 px-4 py-2 text-white transition-colors ${
                  isAddingToCart ? 'cursor-not-allowed opacity-50' : 'hover:bg-orange-600'
                }`}
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsTab product={product} />

      <section className="mb-8 flex flex-col gap-6">{children}</section>
    </div>
  );
}

export default ProductShow;
