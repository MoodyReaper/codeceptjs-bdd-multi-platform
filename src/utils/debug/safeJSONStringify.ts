import getCircularReplacer from './getCircularReplacer';

export default function safeJSONStringify(obj: unknown): string {
  return JSON.stringify(obj, getCircularReplacer());
}
