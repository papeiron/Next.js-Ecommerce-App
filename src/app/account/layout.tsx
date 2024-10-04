import PrivateHeader from '@/components/protected/account/PrivateHeader';
import { SideNavigation } from '@/components/shared/ui';

import {
  LuBookOpen,
  LuHelpCircle,
  LuHome,
  LuShoppingCart,
  LuStar,
  LuWrench,
} from 'react-icons/lu';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <LuHome className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'My Orders',
    href: '/account/orders',
    icon: <LuShoppingCart className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'My Reviews',
    href: '/account/reviews',
    icon: <LuStar className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'My Addresses',
    href: '/account/addresses',
    icon: <LuBookOpen className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'Account Settings',
    href: '/account/accountsettings',
    icon: <LuWrench className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
  {
    name: 'Help',
    href: '/account/help',
    icon: <LuHelpCircle className="h-[24px] w-[24px] group-hover:text-orange-1" />,
  },
];

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrivateHeader />
      <main className="bg-color-50 mx-auto grid max-w-7xl grid-cols-custom-1-5 gap-10 pb-16">
        <SideNavigation navItems={navLinks} theme="light" />
        <div className="mx-auto mt-11 w-full pt-10">{children}</div>
      </main>
    </>
  );
}

export default Layout;
