'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { capitalizeOnlyFirstLetter } from '@/lib/utils';
import { CategoryWith } from '@/types';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

type BreadcrumbNavigationProps = {
  links?: {
    id: string;
    name: string;
    slug: string;
  }[];
  currentProductCategory?: CategoryWith<'attributes' | 'discount'> | undefined;
};

function BreadcrumbNavigation({
  links,
  currentProductCategory,
}: BreadcrumbNavigationProps) {
  const path = usePathname();

  let tail;
  if (path.includes('/p/')) {
    tail = path.split('/').pop()?.replaceAll('-', ' ');
  }

  return (
    <nav aria-label="breadcrumb">
      <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex gap-1.5">
        {/* products */}
        <li
          key="products"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="soft-text flex items-center gap-1.5"
        >
          <Link itemProp="item" href="/products">
            <span itemProp="name">Products</span>
          </Link>
          <meta itemProp="position" content="1" />
          <MdOutlineKeyboardArrowRight
            className={`soft-text ${!links ? 'hidden' : ''}`}
          />
        </li>

        {/* dynamic links */}
        {links?.map((c, index) => (
          <li
            key={c.id}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="soft-text flex items-center gap-1.5"
          >
            <Link itemProp="item" href={`/c/${c.slug}`}>
              <span itemProp="name">{c.name}</span>
            </Link>
            <meta itemProp="position" content={`${index + 2}`} />
            <MdOutlineKeyboardArrowRight
              className={`soft-text ${links.length - 1 === index ? 'hidden' : ''}`}
            />
          </li>
        ))}

        {/* tail (current page)*/}
        {tail && (
          <li
            key={tail}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="soft-text flex cursor-pointer items-center gap-1.5"
          >
            <MdOutlineKeyboardArrowRight className="soft-text" />
            <span itemProp="name">{capitalizeOnlyFirstLetter(tail)}</span>
            <meta itemProp="position" content={`${(links?.length || 0) + 2}`} />
          </li>
        )}
      </ol>
    </nav>
  );
}

export default BreadcrumbNavigation;
