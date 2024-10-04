import React from 'react';

import ProductCarousel, { ProductCarouselProps } from './ProductCarousel';

function StyledProductCarousel(props: ProductCarouselProps) {
  return (
    <div className="relative rounded-xl bg-gradient-to-r from-red-100 to-white p-6">
      <h2 className="mb-4 text-2xl font-bold text-orange-300">Don&apos;t miss!</h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-inner">
        <ProductCarousel {...props} />
      </div>
    </div>
  );
}

export default StyledProductCarousel;
