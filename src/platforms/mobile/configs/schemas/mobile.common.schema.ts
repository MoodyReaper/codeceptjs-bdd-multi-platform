import { z } from 'zod';

export default z
  .object({
    launchType: z.enum(['local', 'remote']),
    userUsername: z.string(),
    userPassword: z.string(),
  })
  .transform((obj) => Object.freeze(obj));
