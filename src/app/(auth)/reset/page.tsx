import { FormSwitcher } from '@/components/auth';
import ResetForm from '@/components/auth/ResetForm';

function ResetPasswordPage() {
  return (
    <div>
      <div className="mx-auto w-[450px]">
        <FormSwitcher />
        <ResetForm />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
