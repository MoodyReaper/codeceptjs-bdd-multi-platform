import { z } from 'zod';

import { booleanFromUnknown } from '../../utils/types/booleanFromUnknown';

export default z
  .object({
    CI: booleanFromUnknown().optional().default(false),
    headless: booleanFromUnknown().optional().default(false),
    pauseOnFail: booleanFromUnknown().optional().default(false),
  })
  .transform((obj) => Object.freeze(obj));
