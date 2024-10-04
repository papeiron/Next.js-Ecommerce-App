'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function AuthSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center overflow-visible bg-gray-50 pt-5">
      <div className="flex w-[450px] justify-between">
        <Link
          href="signin"
          className={`flex-1 rounded-t-lg border-l border-r border-t bg-white py-3 text-center ${
            pathname === '/signin' ? 'text-orange-1' : 'bg-gray-300'
          }`}
        >
          Sign In
        </Link>
        <div className="w-3 border-b"></div>
        <Link
          href="signup"
          className={`flex-1 rounded-t-lg border-l border-r border-t bg-white py-3 text-center ${
            pathname === '/signup' ? 'text-orange-1' : 'bg-gray-300'
          }`}
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default AuthSwitcher;
