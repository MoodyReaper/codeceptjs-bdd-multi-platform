import { z } from 'zod';

type IntegerFromNumericReturnType = z.ZodEffects<
  z.ZodEffects<
    z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, number, string | number>,
    number,
    string | number
  >,
  number,
  string | number
>;

const integerFromNumeric = (message: string): IntegerFromNumericReturnType =>
  z
    .string()
    .or(z.number())
    .transform((value) => (typeof value === 'string' ? Number.parseInt(value, 10) : value))
    .refine((value) => !Number.isNaN(value), 'Must be a number')
    .refine(Number.isInteger, message);

export { integerFromNumeric };
