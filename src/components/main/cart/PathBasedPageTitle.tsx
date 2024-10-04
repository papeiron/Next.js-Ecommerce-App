'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Heading } from '@/components/shared/ui';

const PathBasedPageTitle = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const getHeadingText = () => {
    switch (pathname) {
      case '/cart':
        return 'Shopping Cart';
      case '/cart/checkout':
        return 'Checkout';
      case '/cart/payment-success':
        return 'Completed';
      default:
        return '';
    }
  };

  useEffect(() => {
    const newTitle = getHeadingText();
    if (newTitle !== title) {
      setIsAnimating(true);
      setTimeout(() => {
        setTitle(newTitle);
        setIsAnimating(false);
      }, 300);
    }

    // eslint-disable-next-line
  }, [pathname]);

  const getProgressWidth = () => {
    switch (pathname) {
      case '/cart':
        return '33%';
      case '/cart/checkout':
        return '66%';
      case '/cart/payment-success':
        return '100%';
      default:
        return '0%';
    }
  };

  const getProgressColor = () => {
    return pathname === '/cart/payment-success' ? 'bg-green-600' : 'bg-orange-400';
  };

  return (
    <div className="w-64 overflow-hidden pt-4">
      <div className="relative h-10">
        <Heading
          type="heading-3"
          className={`duration-600 absolute w-full text-center text-2xl font-bold transition-all ease-in-out ${
            isAnimating ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          {title}
        </Heading>
      </div>
      <div className="mt-2 h-2.5 w-full rounded-full bg-gray-100">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${getProgressColor()}`}
          style={{ width: getProgressWidth() }}
        ></div>
      </div>
    </div>
  );
};

export default PathBasedPageTitle;
