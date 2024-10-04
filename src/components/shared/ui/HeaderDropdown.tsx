import Image from 'next/image';
import Link from 'next/link';

import { logout } from '@/actions/auth';
import { currentUser } from '@/lib/helpers';
import { CiSettings, CiShoppingBasket, CiUser } from 'react-icons/ci';
import { MdOutlineStorefront } from 'react-icons/md';
import { PiSignOutThin } from 'react-icons/pi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

type MenuItem = {
  text: string;
  href: string;
  role: Array<'USER' | 'STORE_OWNER' | 'ADMIN' | 'NOTLOGGED'>;
  icon?: React.ReactNode;
};

const privateMenuItems: MenuItem[] = [
  {
    icon: <CiShoppingBasket className="icon-color h-[15px] w-[15px]" />,
    text: 'My Orders',
    href: '/account/orders',
    role: ['USER', 'STORE_OWNER', 'ADMIN'],
  },
  {
    icon: <CiSettings className="icon-color h-[15px] w-[15px]" />,
    text: 'Account Settings',
    href: '/account/accountsettings',
    role: ['USER', 'STORE_OWNER', 'ADMIN'],
  },
  {
    icon: <MdOutlineStorefront className="icon-color h-[15px] w-[15px]" />,
    text: 'Store Dashboard',
    href: '/store/mystore',
    role: ['STORE_OWNER'],
  },
  {
    icon: <MdOutlineSpaceDashboard className="icon-color h-[15px] w-[15px]" />,
    text: 'Admin Dashboard',
    href: '/dashboard',
    role: ['ADMIN'],
  },
];

const publicMenuItems: MenuItem[] = [
  {
    text: 'Sign in',
    href: '/signin',
    role: ['NOTLOGGED'],
  },
  {
    text: 'Create an account',
    href: '/signup',
    role: ['NOTLOGGED'],
  },
];

async function HeaderDropdown() {
  const user = await currentUser();

  let showingMenuItems;

  if (!user) {
    showingMenuItems = publicMenuItems;
  } else {
    showingMenuItems = privateMenuItems.filter((item) => item.role.includes(user.role));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center focus:border-none">
        {user?.image ? (
          <Image
            src={user?.image}
            alt="profile image"
            className="rounded-full"
            width={30}
            height={30}
          />
        ) : (
          <CiUser className="h-[25px] w-[25px] hover:text-orange-1" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[100] bg-white">
        <DropdownMenuLabel className="cursor-pointer">
          {user ? <Link href="/account">{user?.name}</Link> : 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {showingMenuItems.map((item, index) =>
          item ? (
            <DropdownMenuItem
              key={index}
              className="icon-color cursor-pointer rounded-md p-0 hover:bg-gray-50"
            >
              <Link
                href={item.href}
                className="flex h-full w-full items-center gap-3 py-2 pl-2 pr-8"
              >
                {item?.icon ? item.icon : null} {item.text}
              </Link>
            </DropdownMenuItem>
          ) : null,
        )}

        {user && (
          <form action={logout}>
            <button className="w-full" type="submit">
              <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-md p-0 py-2 pl-2 pr-8 hover:bg-gray-50">
                <PiSignOutThin className="icon-color h-[15px] w-[15px]" /> Sign out
              </DropdownMenuItem>
            </button>
          </form>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderDropdown;
