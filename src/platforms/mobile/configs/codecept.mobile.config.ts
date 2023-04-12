import { setCommonPlugins, setHeadlessWhen } from '@codeceptjs/configure';

import basicConfig from '../../../configs/basic.config';
import must from '../../../utils/types/must';

import mobileCommonConfig from './mobile.common.config';

// Always headless in CI, defined by a separate variable if not in CI
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setHeadlessWhen(basicConfig.CI ? 'true' : basicConfig.headless);

// Enables all common plugins: https://github.com/codeceptjs/configure#setcommonplugins
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
setCommonPlugins();

let appiumConfig = {};
if (mobileCommonConfig.launchType === 'local') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mobileLocalConfig: unknown = require('./mobile.local.config.ts');
  must(mobileLocalConfig);
  appiumConfig = mobileLocalConfig;
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mobileRemoteConfig: unknown = require('./mobile.remote.config.ts');
  must(mobileRemoteConfig);
  appiumConfig = mobileRemoteConfig;
}

export const config: CodeceptJS.MainConfig = {
  tests: '../tests/**/*.spec.ts',
  output: '../../../../reports/mobile',
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
        stdout: './reports/mobile/console.log',
        options: {
          reportDir: './reports/mobile',
          reportFilename: 'report',
        },
      },
    },
  },
  helpers: {
    Mochawesome: {
      uniqueScreenshotNames: 'true',
    },
    Appium: {
      // This option was not specified in Appium helper documentation but it exists and works
      // https://codecept.io/helpers/Appium.html#helper-configuration
      waitForTimeout: 10000,
      ...appiumConfig,
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
    // Note: disabled because subtitles functionality ignores secret() function so sensitive data is written to subtitles in plain format
    // TODO: check whether it was fixed or create GitHub issue
    // subtitles: {
    //   enabled: true
    // }
  },
  gherkin: {
    features: '../bdd/features/*.feature',
    steps: '../bdd/steps/steps.ts',
  },
  include: {
    I: '../steps.mobile',
    exampleComponent: '../components/example.component',
    exampleScreen: '../pages/example.screen',
  },
  name: 'codeceptjs-mobile-tests',
};
