import { z } from 'zod';

export const addCartSchema = z.object({
  productId: z.string(),
  options: z.array(
    z.object({
      attName: z.string(),
      val: z.string(),
    }),
  ),
});
