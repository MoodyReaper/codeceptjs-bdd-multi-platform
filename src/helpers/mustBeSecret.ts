// Custom CodeceptJS helper

import must from '../utils/types/must';

// TODO: rework

class MustBeSecret extends Helper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkIfReallySecret(obj: any): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const value = obj._secret;
      must(value);
    } catch {
      throw new Error('Object is not a CodeceptJS Secret');
    }
  }
}

export = MustBeSecret;
