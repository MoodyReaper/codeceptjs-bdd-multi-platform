import { setCommonPlugins, setHeadlessWhen } from '@codeceptjs/configure';

import basicConfig from '../../../configs/basic.config';

import apiConfig from './api.config';

// Always headless in CI, defined by a separate variable if not in CI
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setHeadlessWhen(basicConfig.CI ? 'true' : basicConfig.headless);

// Enables all common plugins: https://github.com/codeceptjs/configure#setcommonplugins
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: '../tests/**/*.spec.ts',
  output: '../../../../reports/api',
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
        stdout: './reports/api/console.log',
        options: {
          reportDir: './reports/api',
          reportFilename: 'report',
        },
      },
    },
  },
  helpers: {
    Mochawesome: {
      uniqueScreenshotNames: 'true',
    },
    GraphQL: {
      endpoint: `${apiConfig.graphqlBaseUrl}`,
    },
    REST: {
      endpoint: `${apiConfig.restBaseUrl}`,
    },
    JSONResponse: {
      requestHelper: 'GraphQL',
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
    I: '../steps.api',
  },
  name: 'codeceptjs-api-tests',
};
