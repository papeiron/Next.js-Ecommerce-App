'use server';

import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getPasswordResetTokenByToken } from '@/lib/services/token';
import { getUserByEmail } from '@/lib/services/user';
import { newPasswordSchema } from '@/lib/validation/auth';

type NewPasswordFormState = {
  errors?: {
    password?: string[];
    newPassword?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

const newPassword = async (
  formState: NewPasswordFormState,
  formData: FormData,
): Promise<NewPasswordFormState> => {
  const token = formData.get('token');
  if (!token || typeof token !== 'string') {
    return {
      errors: { _form: ['Missing token!'] },
    };
  }

  const validatedFields = newPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    token: token,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      errors: { _form: ['Invalid token'] },
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      errors: { _form: ['Token has expired!'] },
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      errors: { _form: ['Email does not exist!'] },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: { message: 'Password has been changed!' },
  };
};

export default newPassword;
