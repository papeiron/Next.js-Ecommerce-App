import ProductList from '@/components/main/products/ProductList';
import { getUrl } from '@/lib/helpers';
import { fetchAllCategories, fetchCategoryBySlug } from '@/lib/services/category';
import { Metadata } from 'next';

type PageProps = {
  params: {
    [key: string]: string | string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categorySlug = params['category-slug'];

  const category = await fetchCategoryBySlug(categorySlug as string);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: category.name,
    description: category.description,
    metadataBase: new URL(getUrl()),
    openGraph: {
      title: category.name,
      description: category.description,
      url: `${getUrl()}/p/${category.slug}`,
      siteName: 'Store',
      images: [
        {
          url: category.image || '/default-product-image.jpg',
          width: 800,
          height: 600,
          alt: category.name,
        },
      ],
      locale: 'us_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
      images: [category.image || '/default-product-image.jpg'],
    },
  };
}

export async function generateStaticParams() {
  const categories = await fetchAllCategories();

  if (!categories || categories.length === 0) {
    return [];
  }

  return categories.map((cat) => {
    return {
      ['category-slug']: cat.slug,
    };
  });
}

async function CategoryPage({ params, searchParams }: PageProps) {
  const categorySlug = params['category-slug'];
  const filter = searchParams.filter as string;

  const minPrice = searchParams.minPrice as string | undefined;
  const maxPrice = searchParams.maxPrice as string | undefined;

  const sort = searchParams.sort as string;

  return (
    <div className="col-start-2 col-end-5 row-start-1 row-end-2">
      <ProductList
        slug={categorySlug as string}
        minPrice={Number(minPrice)}
        maxPrice={Number(maxPrice)}
        filter={filter as string}
        sortBy={sort}
      />
    </div>
  );
}

export default CategoryPage;
