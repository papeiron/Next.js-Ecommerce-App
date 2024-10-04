import { z } from 'zod';

const cellphoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

// // const attributeSchema = z.object({
// //   attributeName: z.string().min(1, 'Attribute name is required'),
// //   attributeValue: z.string().min(1, 'Attribute value is required'),
// // });

export const newApplicationSchema = z.object({
  cellphone: z
    .string()
    .regex(cellphoneRegex, { message: 'Please enter a valid phone number.' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 10 characters.' })
    .max(100, { message: 'Address cannot exceed 100 characters.' }),
  storename: z
    .string()
    .min(3, { message: 'Store name must be at least 10 characters.' })
    .max(25, { message: 'Store name cannot exceed 50 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' })
    .max(100, { message: 'Description cannot exceed 100 characters.' }),
  img: z.string().min(1, { message: 'You must upload at least 1 image.' }),
});

export const createEditNewProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(5000, 'Description cannot exceed 1000 characters'),
  summary: z
    .string()
    .min(1, 'Summary is required')
    .max(200, 'Summary cannot exceed 200 characters'),
  price: z.coerce
    .number()
    .positive('Price must be a positive number')
    .max(1000000, 'Price cannot exceed 1,000,000'),
  stock: z.coerce
    .number()
    .positive('Stock must be a positive number')
    .lte(10000, 'Stock must not exceed 10000'),
  brand: z
    .string()
    .min(1, 'Brand is required')
    .max(50, 'Brand cannot exceed 50 characters'),
  images: z.array(z.string()).min(1, 'Images are required'),
  categories: z
    .array(
      z.object({
        catId: z.string(),
        catName: z.string(),
        catSlug: z.string(),
      }),
    )
    .min(1, 'Category is required'),
  attributes: z
    .array(
      z.object({
        category_attribute_id: z.string(),
        value: z.string(),
      }),
    )
    .min(1, 'At least one attribute is required'),
});

export const createNewDiscountSchema = z.object({
  name: z.string().min(10),
  description: z.string().min(20),
  discount_percent: z.coerce.number().min(1).max(101),
  category: z.string().optional(),
  product: z.string().optional(),
  date: z
    .object({
      from: z.coerce.date().min(new Date()),
      to: z.coerce.date().min(new Date()),
    })
    .refine((data) => data.from < data.to, {
      message: 'The end date must be later than the start date.',
    }),
});

export const createNewCarrierSchema = z
  .object({
    name: z.string().min(1, 'Carrier name is required'),
    code: z.string(),
    url: z
      .string()
      .optional()
      .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
        message: 'Invalid URL format for Base Tracking URL',
      }),
    shipping_rate_name: z.string().min(1, 'Shipping Rate Name is required'),
    shipping_rate_description: z.string().optional(),
    base_rate: z.coerce.number().positive('Base Rate must be a valid positive number'),
    per_kg_rate: z.coerce
      .number()
      .positive('Per Kg Rate must be a valid positive number'),
    min_weight: z.coerce.number().positive('Min Weight must be a valid positive number'),
    max_weight: z.coerce.number().positive('Max Weight must be a valid positive number'),
  })
  .superRefine((values, ctx) => {
    if (values.max_weight < values.min_weight) {
      ctx.addIssue({
        code: 'custom',
        path: ['max_weight'],
        message: 'Max Weight must be greater than or equal to Min Weight',
      });
    }
  });
