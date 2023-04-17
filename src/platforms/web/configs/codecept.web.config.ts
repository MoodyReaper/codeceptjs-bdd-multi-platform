import { setCommonPlugins, setHeadlessWhen } from '@codeceptjs/configure';

import basicConfig from '../../../configs/basic.config';

import webCommonConfig from './web.common.config';

// Always headless in CI, defined by a separate variable if not in CI
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setHeadlessWhen(basicConfig.CI ? 'true' : basicConfig.headless);

// Enables all common plugins: https://github.com/codeceptjs/configure#setcommonplugins
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: '../**/*.spec.ts',
  output: '../../../../reports/web',
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
        stdout: './reports/web/console.log',
        options: {
          reportDir: './reports/web',
          reportFilename: 'report',
        },
      },
    },
  },
  helpers: {
    Mochawesome: {
      uniqueScreenshotNames: 'true',
    },
    Playwright: {
      // https://codecept.io/helpers/Playwright/#properties
      browser: webCommonConfig.browser,
      getPageTimeout: 10000,
      show: true,
      trace: true,
      url: 'http://localhost:3000', // It can not be simply replaced in case of two platforms with different URLs
      video: true,
      waitForAction: 100,
      waitForNavigation: 'load',
      waitForTimeout: 10000,
    },
    MustBeSecret: {
      require: '../../../helpers/mustBeSecret',
    },
  },
  plugins: {
    pauseOnFail: {
      enabled: basicConfig.CI ? 'true' : basicConfig.pauseOnFail,
    },
    tryTo: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
    },
    autoDelay: {
      enabled: true,
    },
    stepByStepReport: {
      enabled: true,
    },
    // autoLogin: {
    //   enabled: true,
    //   saveToFile: !basicConfig.CI, // disabled for CI
    //   inject: 'loginAs',
    //   users: {},
    // },
    customLocator: {
      enabled: true,
      prefix: '$',
      attribute: ['test-component-id', 'test-page-id'],
    },
    // Note: disabled because subtitles functionality ignores secret() function so sensitive data is written to subtitles in plain format
    // TODO: check whether it was fixed or create GitHub issue
    // subtitles: {
    //   enabled: true
    // }
  },
  gherkin: {
    features: [
      '../bdd/features/*.feature',
      // '../admin/bdd/features/*.feature',
      // '../user/bdd/features/*.feature',
    ],
    steps: [
      '../bdd/steps/steps.ts',
      // '../admin/bdd/steps/steps.ts',
      // '../user/bdd/steps/steps.ts'
    ],
  },
  include: {
    I: '../steps.web',
    ExamplePage: '../pages/example.page',
  },
  name: 'codeceptjs-web-tests',
};
