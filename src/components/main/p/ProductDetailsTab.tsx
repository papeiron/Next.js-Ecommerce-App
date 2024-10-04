import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProductForShowPage } from '@/types';
import ProductReviews from './ProductReviews';

interface ProductDetailsTabProps {
  product: ProductForShowPage | null;
}

function ProductDetailsTab({ product }: ProductDetailsTabProps) {
  const productAttWithout = product?.attributes.filter(
    (att) => att.category_attribute.type !== 'multi-select',
  );

  return (
    <section className="w-full rounded-md border">
      <Tabs defaultValue="productDescription">
        <TabsList>
          <TabsTrigger value="productDescription">Description</TabsTrigger>
          <TabsTrigger value="productAttributes">Technical Specs</TabsTrigger>
          <TabsTrigger value="productReviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="productDescription" className="min-h-[250px] p-4">
          {product?.description}
        </TabsContent>
        <TabsContent value="productAttributes" className="min-h-[300px] p-4">
          <div className="grid grid-cols-2 gap-3">
            {productAttWithout?.map((att, index) => (
              <div
                key={att.id}
                className={`flex rounded-md p-2 ${
                  Math.floor(index / 2) % 2 === 0 ? 'bg-gray-50' : ''
                }`}
              >
                <p className="flex-1 text-gray-400">{att.category_attribute.name}</p>
                <p className="flex-1">
                  {att.value}
                  <span className="ml-1">
                    {att.category_attribute.name === 'Weight' && 'kg'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="productReviews">
          <ProductReviews reviews={product?.reviews} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default ProductDetailsTab;
