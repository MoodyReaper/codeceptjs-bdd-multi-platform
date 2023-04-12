type Value = Array<string | number> | null | undefined;
type Replacer = (key: string, value: Value) => string | Value;

export default function getCircularReplacer(): Replacer {
  const seen = new WeakSet();
  return (key: string, value: Value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return `[Circular ${key}]`;
      seen.add(value);
    }
    return value;
  };
}
