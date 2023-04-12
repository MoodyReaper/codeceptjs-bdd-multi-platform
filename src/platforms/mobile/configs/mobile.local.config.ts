import must from '../../../utils/types/must';

import mobileLocalSchema from './schemas/mobile.local.schema';

const defaultLocalDesiredCapabilitiesAndroid = {
  automationName: 'UiAutomator2',
};
const defaultLocalDesiredCapabilitiesIOS = {
  automationName: 'XCUITest',
};

let localDesiredCapabilities;

if (process.env.TESTS_MOBILE_LOCAL_CAPABILITIES === undefined) {
  if (process.env.TESTS_MOBILE_LOCAL_PLATFORM === 'Android') {
    localDesiredCapabilities = defaultLocalDesiredCapabilitiesAndroid;
  }
  if (process.env.TESTS_MOBILE_LOCAL_PLATFORM === 'iOS') {
    localDesiredCapabilities = defaultLocalDesiredCapabilitiesIOS;
  }
} else {
  const parsedLocalDesiredCapabilities: unknown = JSON.parse(
    process.env.TESTS_MOBILE_LOCAL_CAPABILITIES.replaceAll('\\', '')
  );
  must(typeof parsedLocalDesiredCapabilities === 'string');
  localDesiredCapabilities = parsedLocalDesiredCapabilities;
}

const mobileLocalConfig = mobileLocalSchema.parse({
  app: process.env.TESTS_MOBILE_LOCAL_APP_PATH,
  platform: process.env.TESTS_MOBILE_LOCAL_PLATFORM,
  device: process.env.TESTS_MOBILE_LOCAL_DEVICE,
  desiredCapabilities: localDesiredCapabilities,
});

export = mobileLocalConfig;
