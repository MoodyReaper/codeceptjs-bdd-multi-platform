import { z } from 'zod';

type ArrayFromStringReturnType = z.ZodEffects<z.ZodString, string[], string>;

const arrayFromString = (): ArrayFromStringReturnType =>
  z.string().transform((value) => value.split(',').map((item) => item.trim()));

export { arrayFromString };
