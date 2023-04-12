import { z } from 'zod';

export default z
  .object({
    browser: z.enum(['chromium', 'webkit', 'firefox']).optional().default('chromium'),
  })
  .transform((obj) => Object.freeze(obj));
