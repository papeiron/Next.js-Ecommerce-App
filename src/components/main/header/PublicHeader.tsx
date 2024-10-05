import Link from 'next/link';
import { Suspense } from 'react';

import { Container, Logo, Searchbar } from '@/components/shared/ui';
import { CiHeart } from 'react-icons/ci';
import ShoppingCart from './ShoppingCart';
import HeaderDropdown from '@/components/shared/ui/HeaderDropdown';
import { db } from '@/lib/db';
import DropdownNavMenu from './DropdownNavMenu';
import { currentUser } from '@/lib/helpers';
import { getSearchHistory } from '@/lib/services/search';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

async function PublicHeader() {
  const categories = await db.category.findMany({
    include: {
      sub_categories: true,
    },
    where: {
      parent_id: null,
    },
  });

  const user = await currentUser();
  let searchHistory;
  if (user && user.id) {
    searchHistory = await getSearchHistory(user.id);
  }

  return (
    <header className="flex w-full flex-col gap-4 border-b-[1px]">
      <div className="flex w-full justify-center bg-gradient-to-r from-red-50 via-white to-red-50 py-3">
        <p className="flex items-center gap-2">
          <span className="font-semibold">Fullstack e-commerce platform</span> built with
          Next.js and MySQL
          <Link href="https://github.com/papeiron/Next.js-Ecommerce-App">
            <FaGithub className="h-6 w-6" />
          </Link>
        </p>
      </div>
      <Container>
        <div className="flex">
          <div className="flex-[30%]">
            <div className="flex h-20 w-20 items-center">
              <Logo />
            </div>
          </div>

          <nav className="flex flex-[80%] items-center justify-between">
            <div className="w-[500px]">
              <Suspense>
                <Searchbar searchHistory={searchHistory} />
              </Suspense>
            </div>

            <ul className="flex items-center gap-6">
              <li>
                <Link href="/favorites">
                  <CiHeart className="h-[25px] w-[25px] hover:text-orange-1" />
                </Link>
              </li>

              <ShoppingCart />

              <HeaderDropdown />
            </ul>
          </nav>
        </div>
        <div className="mx-auto flex justify-center gap-5 pt-2">
          <Link
            href="/products"
            className="flex items-center gap-x-1.5 border-b-2 border-white font-semibold hover:border-orange-1 hover:text-orange-1"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-md">
              <Image
                src="https://fhnqpyisstbfjkvuzmvn.supabase.co/storage/v1/object/public/category-image/all.webp"
                alt="all products"
                fill
              />
            </div>
            <p>All Products</p>
          </Link>
          <DropdownNavMenu categories={categories} />
        </div>
      </Container>
    </header>
  );
}

export default PublicHeader;
