import { z } from 'zod';

import { integerFromNumeric } from '../../../../utils/types/integerFromNumeric';
import { jsonSchema } from '../../../../utils/types/jsonSchema';

export default z
  .object({
    host: z.string().optional().default('localhost'),
    port: integerFromNumeric('Port must be an integer').default(4723),
    app: z.string(),
    platform: z.enum(['Android', 'iOS']),
    device: z.string(),
    desiredCapabilities: jsonSchema.optional(),
  })
  .transform((obj) => Object.freeze(obj));
