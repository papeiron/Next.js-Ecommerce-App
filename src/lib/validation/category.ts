//
// create new category

import { z } from 'zod';

export const attributeSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.enum(['yes', 'no']),
  options: z.string().optional(),
});

export const createNewCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  attributes: z.array(attributeSchema).optional(),
});
