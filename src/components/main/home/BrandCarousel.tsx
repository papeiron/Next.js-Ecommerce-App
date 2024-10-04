'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import one from '@/../public/brands/1.jpg';
import two from '@/../public/brands/2.jpg';
import three from '@/../public/brands/3.jpg';
import four from '@/../public/brands/4.jpg';
import five from '@/../public/brands/5.jpg';
import six from '@/../public/brands/6.jpg';
import seven from '@/../public/brands/7.jpg';
import eight from '@/../public/brands/8.jpg';
import nine from '@/../public/brands/9.jpg';
import ten from '@/../public/brands/10.jpg';
import eleven from '@/../public/brands/11.jpg';
import twelve from '@/../public/brands/12.jpg';
import thirteen from '@/../public/brands/13.webp';
import fourteen from '@/../public/brands/14.jpg';
import fifteen from '@/../public/brands/15.jpg';
import sixteen from '@/../public/brands/16.jpg';
import seventeen from '@/../public/brands/17.jpg';
import eighteen from '@/../public/brands/18.jpg';
import nineteen from '@/../public/brands/19.webp';
import twenty from '@/../public/brands/20.webp';
import twentyOne from '@/../public/brands/21.webp';
import twentyTwo from '@/../public/brands/22.webp';
import twentyThree from '@/../public/brands/23.webp';
import twentyFour from '@/../public/brands/24.webp';
import twentyFive from '@/../public/brands/25.webp';
import twentySix from '@/../public/brands/26.webp';
import twentySeven from '@/../public/brands/27.webp';
import twentyEight from '@/../public/brands/28.webp';
import twentyNine from '@/../public/brands/29.webp';
import thirty from '@/../public/brands/30.png';
import thirtyOne from '@/../public/brands/31.png';
import thirtyTwo from '@/../public/brands/32.png';
import thirtyThree from '@/../public/brands/33.png';
import thirtyFour from '@/../public/brands/34.png';

type Brand = {
  id: number;
  name: string;
  logo: StaticImageData;
};

const brands: Brand[] = [
  {
    id: 1,
    name: 'Brand 1',
    logo: one,
  },
  {
    id: 2,
    name: 'Brand 2',
    logo: two,
  },
  {
    id: 3,
    name: 'Brand 3',
    logo: three,
  },
  {
    id: 4,
    name: 'Brand 4',
    logo: four,
  },
  {
    id: 5,
    name: 'Brand 5',
    logo: five,
  },
  {
    id: 6,
    name: 'Brand 6',
    logo: six,
  },
  {
    id: 7,
    name: 'Brand 7',
    logo: seven,
  },
  {
    id: 8,
    name: 'Brand 8',
    logo: eight,
  },
  {
    id: 9,
    name: 'Brand 9',
    logo: nine,
  },
  {
    id: 10,
    name: 'Brand 10',
    logo: ten,
  },
  {
    id: 11,
    name: 'Brand 11',
    logo: eleven,
  },
  {
    id: 12,
    name: 'Brand 12',
    logo: twelve,
  },
  {
    id: 13,
    name: 'Brand 13',
    logo: thirteen,
  },
  {
    id: 14,
    name: 'Brand 14',
    logo: fourteen,
  },
  {
    id: 15,
    name: 'Brand 15',
    logo: fifteen,
  },
  {
    id: 16,
    name: 'Brand 16',
    logo: sixteen,
  },
  {
    id: 17,
    name: 'Brand 17',
    logo: seventeen,
  },
  {
    id: 18,
    name: 'Brand 18',
    logo: eighteen,
  },
  {
    id: 19,
    name: 'Brand 19',
    logo: nineteen,
  },
  {
    id: 20,
    name: 'Brand 20',
    logo: twenty,
  },
  {
    id: 21,
    name: 'Brand 21',
    logo: twentyOne,
  },
  {
    id: 22,
    name: 'Brand 22',
    logo: twentyTwo,
  },
  {
    id: 23,
    name: 'Brand 23',
    logo: twentyThree,
  },
  {
    id: 24,
    name: 'Brand 24',
    logo: twentyFour,
  },
  {
    id: 25,
    name: 'Brand 25',
    logo: twentyFive,
  },
  {
    id: 26,
    name: 'Brand 26',
    logo: twentySix,
  },
  {
    id: 27,
    name: 'Brand 27',
    logo: twentySeven,
  },
  {
    id: 28,
    name: 'Brand 28',
    logo: twentyEight,
  },
  {
    id: 29,
    name: 'Brand 29',
    logo: twentyNine,
  },
  {
    id: 30,
    name: 'Brand 30',
    logo: thirty,
  },
  {
    id: 31,
    name: 'Brand 31',
    logo: thirtyOne,
  },
  {
    id: 32,
    name: 'Brand 32',
    logo: thirtyTwo,
  },
  {
    id: 33,
    name: 'Brand 33',
    logo: thirtyThree,
  },
  {
    id: 34,
    name: 'Brand 34',
    logo: thirtyFour,
  },
];

function BrandCarousel() {
  const logosRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (logosRef.current) {
      const logosElement = logosRef.current;
      const clone = logosElement.cloneNode(true) as HTMLDivElement;
      logosElement.parentElement?.appendChild(clone);
    }
  }, []);

  return (
    <div className="py-15 relative overflow-hidden whitespace-nowrap bg-white">
      <div className="hover:pause inline-block animate-slide">
        <ul className="flex items-center gap-x-12">
          {brands.map((brand) => (
            <li
              key={brand.id}
              className="slide flex h-40 w-[125px] cursor-pointer items-center justify-center"
            >
              <Image src={brand.logo} alt={brand.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BrandCarousel;
