'use server';

import { sendResetPasswordEmail } from '@/lib/services/mail';
import { generatePasswordResetToken } from '@/lib/services/token';
import { getUserByEmail } from '@/lib/services/user';
import { resetSchema } from '@/lib/validation/auth';

type ResetFormState = {
  errors?: {
    email?: string[];
    _form?: string[];
  };
  success?: { message?: string };
};

const reset = async (
  formState: ResetFormState,
  formData: FormData,
): Promise<ResetFormState> => {
  const validatedFields = resetSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        _form: ['Email not found!'],
      },
    };
  }

  const resetVerificationToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(
    resetVerificationToken.email,
    resetVerificationToken.token,
  );

  return {
    success: { message: 'Reset email sent!' },
  };
};

export default reset;
