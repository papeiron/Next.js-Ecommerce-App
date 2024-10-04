import PrivateHeader from '@/components/protected/account/PrivateHeader';
import { SideNavigation } from '@/components/shared/ui';
import {
  MdOutlinePhoneAndroid,
  MdOutlineStorefront,
  MdOutlineShoppingCart,
  MdOutlineDiscount,
} from 'react-icons/md';

import { HiOutlineTruck } from 'react-icons/hi2';

const navLinks = [
  {
    name: 'My Store',
    href: '/store/mystore',
    icon: <MdOutlineStorefront className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'Products',
    href: '/store/products',
    icon: (
      <MdOutlinePhoneAndroid className="h-[24px] w-[24px] group-hover:text-orange-1" />
    ),
  },
  {
    name: 'Orders',
    href: '/store/orders',
    icon: (
      <MdOutlineShoppingCart className="h-[24px] w-[24px] group-hover:text-orange-1" />
    ),
  },
  {
    name: 'Discounts',
    href: '/store/discounts',
    icon: <MdOutlineDiscount className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'Carriers',
    href: '/store/carriers',
    icon: <HiOutlineTruck className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
];

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid h-full w-full grid-cols-12 grid-rows-12 bg-gray-50">
      <div className="col-start-3 col-end-13 row-start-1 row-end-2">
        <PrivateHeader />
      </div>
      <div className="fixed col-start-1 col-end-3 row-span-full h-full min-w-[300px]">
        <SideNavigation navItems={navLinks} theme="light" />
      </div>
      <main className="col-start-3 col-end-13 row-start-2 row-end-13 h-[115vh] px-28">
        {children}
      </main>
    </div>
  );
}

export default Layout;
