import ProductCard from '@/components/shared/ui/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductForList } from '@/types';

export type ProductCarouselProps = {
  fetchData: (term: string, store: string | undefined) => Promise<ProductForList[]>;
  term: string;
  store?: string;
};

async function ProductCarousel({ fetchData, term, store }: ProductCarouselProps) {
  const products = await fetchData(term, store || undefined);

  return (
    <Carousel>
      <CarouselContent className="grid h-[360px] auto-cols-[180px] grid-flow-col gap-2 p-4">
        {products?.map((product) => (
          <CarouselItem key={product.id} className="h-full">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -top-4 right-12 flex">
        <CarouselPrevious className="-left-6 border-[2px] border-gray-50 bg-white text-gray-300 shadow-sm hover:bg-white hover:text-gray-400" />
        <CarouselNext className="border-[2px] border-gray-50 bg-white text-gray-300 shadow-sm hover:bg-white hover:text-gray-400" />
      </div>
    </Carousel>
  );
}
export default ProductCarousel;
