import { setCommonPlugins, setHeadlessWhen } from '@codeceptjs/configure';

import basicConfig from '../../../configs/basic.config';

// Always headless in CI, defined by a separate variable if not in CI
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setHeadlessWhen(basicConfig.CI ? 'true' : basicConfig.headless);

// Enables all common plugins: https://github.com/codeceptjs/configure#setcommonplugins
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: '../tests/**/*.spec.ts',
  output: '../../../../reports/infra',
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: true,
          steps: true,
        },
      },
      mochawesome: {
        stdout: './reports/infra/console.log',
        options: {
          reportDir: './reports/infra',
          reportFilename: 'report',
        },
      },
    },
  },
  helpers: {
    Mochawesome: {
      uniqueScreenshotNames: 'true',
    },
  },
  plugins: {
    pauseOnFail: {
      enabled: basicConfig.CI ? 'true' : basicConfig.pauseOnFail,
    },
    tryTo: {
      enabled: true,
    },
  },
  gherkin: {
    features: '../bdd/features/*.feature',
    steps: '../bdd/steps/steps.ts',
  },
  include: {
    I: '../steps.infra',
  },
  name: 'codeceptjs-infra-tests',
};
