'use server';

import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/services/mail';
import { generateVerificationToken } from '@/lib/services/token';
import { getUserByEmail } from '@/lib/services/user';
import { signUpSchema } from '@/lib/validation/auth';

type SignUpFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

export default async function register(
  formState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errors: { _form: ['Email already in use!'] },
      };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: { message: 'Confirmation email sent!' },
  };
}
