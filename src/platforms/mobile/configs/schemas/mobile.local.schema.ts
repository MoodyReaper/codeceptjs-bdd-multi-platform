import { z } from 'zod';

import { jsonSchema } from '../../../../utils/types/jsonSchema';

export default z
  .object({
    app: z.string(),
    platform: z.enum(['Android', 'iOS']),
    device: z.string(),
    desiredCapabilities: jsonSchema.optional(),
  })
  .transform((obj) => Object.freeze(obj));
