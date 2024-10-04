'use server';

import { db } from '@/lib/db';
import { getVerificationTokenByToken } from '@/lib/services/token';
import { getUserByEmail } from '@/lib/services/user';

const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { errors: { _form: ['Token does not exist!'] } };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { errors: { _form: ['Token has expired!'] } };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { errors: { _form: ['Email does not exist!'] } };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: { message: 'Email verified.' } };
};

export default newVerification;
