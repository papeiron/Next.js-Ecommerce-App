import { FormSwitcher, RegisterForm } from '@/components/auth';

function SignUpPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto w-[450px]">
        <FormSwitcher />
        <RegisterForm />
      </div>
    </div>
  );
}

export default SignUpPage;
