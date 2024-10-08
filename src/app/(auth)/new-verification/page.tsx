'use client';

import { NewVerificationForm } from '@/components/auth';
import { MiniSpinner } from '@/components/shared/ui';
import { Suspense } from 'react';

function NewVerificationPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Suspense
        fallback={
          <p className="text-center">
            <MiniSpinner />
          </p>
        }
      >
        <NewVerificationForm />
      </Suspense>
    </div>
  );
}

export default NewVerificationPage;
