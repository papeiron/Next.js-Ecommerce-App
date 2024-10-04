'use server';

import { signOut } from '@/lib/auth';

const logout = async () => {
  await signOut();
};

export default logout;
