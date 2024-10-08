import { FormSwitcher, NewPasswordForm } from '@/components/auth';
import { MiniSpinner } from '@/components/shared/ui';
import { Suspense } from 'react';

function NewPasswordPage() {
  return (
    <div>
      <div className="mx-auto mt-10 w-[450px]">
        <Suspense
          fallback={
            <p>
              <MiniSpinner />
            </p>
          }
        >
          <NewPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

export default NewPasswordPage;
