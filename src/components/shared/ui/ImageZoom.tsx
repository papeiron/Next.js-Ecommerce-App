import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageZoomProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mousemove', handleMouseMove as any);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mousemove', handleMouseMove as any);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          `cursor-zoom-in transition-transform duration-200 ease-out`,
          className,
        )}
        style={{
          transform: isZoomed ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
};

export default ProductImageZoom;
