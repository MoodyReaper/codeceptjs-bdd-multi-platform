import { z } from 'zod';

export default z
  .object({
    graphqlBaseUrl: z.string().url().optional().default('http://localhost:3000/graphql'),
    restBaseUrl: z.string().url().optional().default('http://localhost:3000/api'),
  })
  .transform((obj) => Object.freeze(obj));
