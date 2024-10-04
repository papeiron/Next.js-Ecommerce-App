import PriceRange from '@/components/shared/ui/PriceRange';
import { CategoryForSidebar } from '@/types';
import FilterClean from './FilterClean';
import SidebarCategoryAttItem from './SidebarCategoryAttItem';
import SidebarCategoryItem from './SidebarCategoryItem';
import { Suspense } from 'react';

type CategorySidebarProps = {
  slug?: string;
  fn: (s: string) => Promise<CategoryForSidebar[] | CategoryForSidebar | null>;
  query?: string;
  showOnlyParents?: boolean;
};

async function ProductSidebar({
  slug,
  fn,
  showOnlyParents = true,
}: CategorySidebarProps) {
  const res = await fn(slug ?? '');

  let categories: CategoryForSidebar[] = [];

  if (Array.isArray(res)) {
    categories = res;
  } else if (res) {
    categories = [res];
  }

  if (showOnlyParents) {
    categories = categories.filter((cat) => cat.sub_categories.length === 0);
  }

  const isAttributesExist = categories.some((cat) => cat.attributes);

  return (
    <aside className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col gap-12 overflow-y-auto p-6">
      <section>
        <p className="py-4 font-bold">Categories</p>
        <ul className="flex flex-col gap-3">
          {categories?.map((category) => (
            <Suspense key={category.id}>
              <SidebarCategoryItem category={category} />
            </Suspense>
          ))}
        </ul>
      </section>
      <section>
        <div>
          <Suspense>
            <FilterClean />
          </Suspense>
        </div>
        <div>
          <div className="border-b-[1px]"></div>
          <PriceRange />
        </div>
        <div>
          {isAttributesExist &&
            categories.map((cat) =>
              cat.attributes.map((att, index) => (
                <div key={index}>
                  <div className="border-b-[1px]"></div>
                  <Suspense>
                    <SidebarCategoryAttItem categoryAttribute={att} />
                  </Suspense>
                </div>
              )),
            )}
        </div>
      </section>
    </aside>
  );
}

export default ProductSidebar;
