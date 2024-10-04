import { Suspense } from 'react';

import ProductsForReview from '@/components/protected/account/ProductsForReview';
import ReviewsList from '@/components/protected/account/ReviewsList';
import { Heading, MiniSpinner } from '@/components/shared/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ReviewsPage = async () => {
  return (
    <div className="w-full">
      <Heading type="heading-3">Reviews</Heading>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Rate</TabsTrigger>
          <TabsTrigger value="password">My Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Suspense fallback={<MiniSpinner />}>
            <ProductsForReview />
          </Suspense>
        </TabsContent>
        <TabsContent value="password">
          <Suspense fallback={<MiniSpinner />}>
            <ReviewsList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewsPage;
