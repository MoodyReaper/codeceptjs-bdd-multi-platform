import { z } from 'zod';

export default z
  .object({
    baseUrl: z.string().optional().default('http://localhost:3000'),
    username: z.string(),
    password: z.string(),
  })
  .transform((obj) => Object.freeze(obj));
