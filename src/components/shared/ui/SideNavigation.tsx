'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from './Logo';

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type SideNavigationProps = {
  navItems: NavLink[];
  theme?: 'light' | 'dark';
};

const textColors = {
  light: 'text-gray-900',
  dark: 'text-white',
};

const bgColors = {
  light: 'bg-white',
  dark: 'bg-dark-blue-1',
};

const hoverColors = {
  light: 'hover:text-orange-1',
  dark: 'hover:text-blue-custom-1',
};

const activeTextColors = {
  light: 'text-orange-1',
  dark: 'text-blue-custom-1',
};

const activeBgColors = {
  light: 'bg-gray-50',
  dark: 'bg-dark-blue-2',
};

function SideNavigation({ navItems, theme = 'light' }: SideNavigationProps) {
  const pathname = usePathname();

  let textClass = textColors[theme];
  let bgClass = bgColors[theme];
  let hoverClass = hoverColors[theme];
  let activeTextClass = activeTextColors[theme];
  let activeBgClass = activeBgColors[theme];

  return (
    <nav className={`p-5 pt-6 ${bgClass} h-full`}>
      <div className="mx-auto mb-8 h-24 w-24">
        <Logo />
      </div>
      <ul className={`flex flex-col gap-2`}>
        {navItems.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={` ${
                pathname === link.href ? activeTextClass + ' ' + activeBgClass : textClass
              } flex items-center gap-3 rounded-lg p-2 pr-20 ${hoverClass}`}
            >
              {link.icon}
              <p className="text-nowrap text-sm font-semibold">{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNavigation;
