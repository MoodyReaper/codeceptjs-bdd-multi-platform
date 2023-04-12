const prefix = 'Invariant failed';

export default function must(
  condition: unknown,
  message?: string | (() => string)
): asserts condition {
  if (condition !== undefined) return;
  const provided = typeof message === 'function' ? message() : message;
  const value = typeof provided === 'string' ? `${prefix}: ${provided}` : prefix;
  throw new Error(value);
}
