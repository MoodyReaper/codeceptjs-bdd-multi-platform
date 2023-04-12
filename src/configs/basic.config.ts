import basicSchema from './schemas/basic.schema';

const basicConfig = basicSchema.parse({
  CI: process.env.CI,
  headless: process.env.HEADLESS,
  pauseOnFail: process.env.PAUSE_ON_FAIL,
});

export = basicConfig;
