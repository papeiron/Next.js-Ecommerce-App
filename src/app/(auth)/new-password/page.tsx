import { FormSwitcher, NewPasswordForm } from '@/components/auth';
import { MiniSpinner } from '@/components/shared/ui';
import { Suspense } from 'react';

function NewPasswordPage() {
  return (
    <div>
      <FormSwitcher />
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
  );
}

export default NewPasswordPage;
