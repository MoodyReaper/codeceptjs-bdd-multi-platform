import { z } from 'zod';

type BooleanFromUnknownReturnType = z.ZodEffects<z.ZodUnknown, boolean, unknown>;

const booleanFromUnknown = (): BooleanFromUnknownReturnType =>
  z.unknown().transform((value) => {
    switch (typeof value) {
      case 'number':
        return value === 1;
      case 'string':
        return value === 'true' || value === '1';
      case 'boolean':
        return value;
      default:
        return false;
    }
  });

export { booleanFromUnknown };
