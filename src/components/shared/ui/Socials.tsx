'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

function Socials() {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex justify-evenly gap-2">
      <button
        type="button"
        className="flex-1 cursor-pointer rounded-md border p-3 active:bg-gray-100"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="mx-auto mb-2 h-[25px] w-[25px]" />
        <p>
          Continue with <span className="font-bold">Google</span>
        </p>
      </button>
      <button
        type="button"
        className="flex-1 cursor-pointer rounded-md border p-3 active:bg-gray-100"
        onClick={() => onClick('github')}
      >
        <FaGithub className="mx-auto mb-2 h-[25px] w-[25px]" />
        <p>
          Continue with <span className="font-bold">GitHub</span>
        </p>
      </button>
    </div>
  );
}

export default Socials;
