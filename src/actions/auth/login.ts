'use server';

import { AuthError } from 'next-auth';

import { db } from '@/lib/db';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/services/mail';
import {
  generateVerificationToken,
  getTwoFactorTokenByEmail,
  generateTwoFactorToken,
} from '@/lib/services/token';
import { getUserByEmail, getTwoFactorConfirmationByUserId } from '@/lib/services/user';
import { signInSchema } from '@/lib/validation/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from '@/lib/auth';

type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  success?: { message?: string };
  twoFactor?: boolean;
  expires?: Date;
};

const login = async (
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    code: formData.get('code') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      errors: {
        _form: ['The email or password did not match our records. Please try again.'],
      },
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: { message: 'Confirmation email sent!' } };
  }

  // 2FA
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // TODO: Verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return {
          errors: {
            _form: ['Invalid code!'],
          },
        };
      }

      if (twoFactorToken.token !== code) {
        return {
          errors: {
            _form: ['Invalid code!'],
          },
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return {
          errors: {
            _form: ['Code expires!'],
          },
        };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          user_id: existingUser.id,
        },
      });
    } else {
      const { twoFactorToken, expires } = await generateTwoFactorToken(
        existingUser.email,
      );

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true, expires };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CallbackRouteError':
          return {
            errors: {
              _form: [
                'The email or password did not match our records. Please try again.',
              ],
            },
          };
        default:
          return {
            errors: {
              _form: ['Something went wrong'],
            },
          };
      }
    }

    throw err;
  }

  return {
    errors: {},
  };
};

export default login;
