import { FormSwitcher, LoginForm } from '@/components/auth';
import { MiniSpinner } from '@/components/shared/ui';
import { Suspense } from 'react';

function SignInPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto w-[450px]">
        <FormSwitcher />
        <Suspense
          fallback={
            <p>
              <MiniSpinner />
            </p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

export default SignInPage;
