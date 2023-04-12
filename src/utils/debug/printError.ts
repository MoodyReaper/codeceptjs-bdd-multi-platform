import assertError from '../types/assertError';

const printError = (errorMessage: string) => (error: unknown) => {
  assertError(error);
  console.error(`${errorMessage}: ${error.message}`);
};

export default printError;
