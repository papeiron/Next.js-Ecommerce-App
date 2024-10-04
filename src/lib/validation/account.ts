import { z } from 'zod';

export const addressSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  address_line_1: z
    .string()
    .min(1, 'Address Line 1 is required')
    .max(200, 'Address Line 1 must be less than 200 characters'),
  address_line_2: z.string().max(200, 'Address Line 2 must be less than 200 characters'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(100, 'Country must be less than 100 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters'),
  postal_code: z
    .string()
    .min(1, 'Postal code is required')
    .max(20, 'Postal code must be less than 20 characters'),
  landmark: z.string().min(1).max(100, 'Landmark must be less than 100 characters'),
  phone_number: z
    .string()
    .min(1, 'Phone Number is required')
    .max(20, 'Phone Number must be less than 20 characters'),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1, 'Rating is required'),
  comment: z.string().min(10, 'Comment must be more than 10 characters.'),
  productId: z.string(),
});

export const updateAccountSettingsSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Please enter your email')
      .email('Please enter a valid email address.')
      .optional(),
    name: z.string().min(1, { message: 'Please enter your name' }).optional(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .optional(),
    isTwoFactorEnabled: z.string().optional(),
  })
  .refine((data) => data.email || data.name || data.password || data.isTwoFactorEnabled, {
    message: 'At least one of email, name, or password is required.',
  });
