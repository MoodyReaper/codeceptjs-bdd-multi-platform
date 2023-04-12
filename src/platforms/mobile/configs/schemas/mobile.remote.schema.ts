import { z } from 'zod';

import { integerFromNumeric } from '../../../../utils/types/integerFromNumeric';
import { jsonSchema } from '../../../../utils/types/jsonSchema';

export default z
  .object({
    user: z.string(),
    key: z.string(),
    host: z.string().optional().default('hub-cloud.browserstack.com'),
    port: integerFromNumeric('Port must be an integer').default(4444),
    app: z.string(),
    platform: z.enum(['Android', 'iOS']),
    device: z.string(),
    desiredCapabilities: jsonSchema.optional(),
  })
  .transform((obj) => Object.freeze(obj));
