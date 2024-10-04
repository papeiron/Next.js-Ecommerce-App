import { BreadcrumbNavigation } from '@/components/shared/ui';
import Container from '@/components/shared/ui/Container';
import {
  fetchCategoryChainByProduct,
  fetchMainCategories,
} from '@/lib/services/category';
import { fetchProductBySlug } from '@/lib/services/product';
import { notFound } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
  params: {
    [key: string]: string | string[];
  };
};

async function Layout({ children, params }: LayoutProps) {
  const productSlug = params['product-slug'];

  const [product, mainCategories] = await Promise.all([
    fetchProductBySlug(productSlug as string),
    fetchMainCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const parentCategories = await fetchCategoryChainByProduct(product.slug);

  const editedParentCategories = parentCategories?.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <Container className="flex flex-col gap-16">
      <BreadcrumbNavigation
        links={editedParentCategories}
        currentProductCategory={product.categories?.pop()?.category}
      />
      {children}
    </Container>
  );
}

export default Layout;
