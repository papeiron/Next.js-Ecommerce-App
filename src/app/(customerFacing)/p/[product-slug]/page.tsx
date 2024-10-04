import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import EmptyProductCarousel from '@/components/main/home/EmptyProductCarousel';
import ProductCarousel, {
  ProductCarouselProps,
} from '@/components/main/home/ProductCarousel';
import ProductShow from '@/components/main/p/ProductShow';
import { Heading } from '@/components/shared/ui';
import { getUrl } from '@/lib/helpers';
import {
  fetchAllProducts,
  fetchProductBySlug,
  fetchProductsWithOptions,
  fetchStoreRatingByProductSlug,
} from '@/lib/services/product';

type PageProps = {
  params: { 'product-slug': string };
};

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const productSlug = params['product-slug'];

  const product = await fetchProductBySlug(productSlug as string);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.summary,
    metadataBase: new URL(getUrl()),
    openGraph: {
      title: product.name,
      description: product.summary,
      url: `${getUrl()}/p/${product.slug}`,
      siteName: 'Store',
      images: [
        {
          url: product.image[0]?.url || '/default-product-image.jpg',
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: 'us_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.summary,
      images: [product.image[0]?.url || '/default-product-image.jpg'],
    },
    other: {
      'og:product': 'product',
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'USD',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
      'product:brand': product.brand,
      'product:retailer': product.store.store_name,
    },
  };
}

export async function generateStaticParams(): Promise<Array<{ 'product-slug': string }>> {
  const products = await fetchAllProducts();

  if (!products || products.length === 0) {
    return [];
  }

  return products.map((p: any) => ({
    'product-slug': p.slug.toString(),
  }));
}

async function ProductPage({ params }: PageProps) {
  const productSlug = params['product-slug'];
  const storeRating = await fetchStoreRatingByProductSlug(productSlug as string);

  if (!productSlug) {
    notFound();
  }

  const product = await fetchProductBySlug(productSlug as string);

  if (!product) {
    notFound();
  }

  const productName = product.name;
  const categoryName = product.categories[product.categories.length - 1].category.name;

  return (
    <div className="mx-auto w-[90%]">
      <ProductShow product={product} storeRating={storeRating || null}>
        <Suspense fallback={<EmptyProductCarousel length={8} />}>
          <div>
            <Heading type="heading-3">Similar products</Heading>
            <ProductCarousel
              fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
              term={`sameCategoryProducts:${productName}:${categoryName}`}
            />
          </div>
        </Suspense>
        <Suspense fallback={<EmptyProductCarousel length={8} />}>
          <div>
            <Heading type="heading-3">You may also like</Heading>

            <ProductCarousel
              fetchData={fetchProductsWithOptions as ProductCarouselProps['fetchData']}
              term={`similarProducts:${productName}:${categoryName}`}
            />
          </div>
        </Suspense>
      </ProductShow>
    </div>
  );
}

export default ProductPage;
