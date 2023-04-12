import must from '../../../utils/types/must';

import mobileRemoteSchema from './schemas/mobile.remote.schema';

const defaultRemoteDesiredCapabilitiesAndroid = {
  automationName: 'UiAutomator2',
};
const defaultRemoteDesiredCapabilitiesIOS = {
  automationName: 'XCUITest',
};

let remoteDesiredCapabilities;

if (process.env.TESTS_MOBILE_BROWSERSTACK_CAPABILITIES === undefined) {
  if (process.env.TESTS_MOBILE_BROWSERSTACK_PLATFORM === 'Android') {
    remoteDesiredCapabilities = defaultRemoteDesiredCapabilitiesAndroid;
  }
  if (process.env.TESTS_MOBILE_BROWSERSTACK_PLATFORM === 'iOS') {
    remoteDesiredCapabilities = defaultRemoteDesiredCapabilitiesIOS;
  }
} else {
  const parsedRemoteDesiredCapabilities: unknown = JSON.parse(
    process.env.TESTS_MOBILE_BROWSERSTACK_CAPABILITIES.replaceAll('\\', '')
  );
  must(typeof parsedRemoteDesiredCapabilities === 'string');
  remoteDesiredCapabilities = parsedRemoteDesiredCapabilities;
}

const mobileRemoteConfig = mobileRemoteSchema.parse({
  user: process.env.TESTS_MOBILE_BROWSERSTACK_USERNAME,
  key: process.env.TESTS_MOBILE_BROWSERSTACK_ACCESS_KEY,
  host: process.env.TESTS_MOBILE_BROWSERSTACK_HOST,
  port: process.env.TESTS_MOBILE_BROWSERSTACK_PORT,
  app: process.env.TESTS_MOBILE_BROWSERSTACK_APP_URL,
  platform: process.env.TESTS_MOBILE_BROWSERSTACK_PLATFORM,
  device: process.env.TESTS_MOBILE_BROWSERSTACK_DEVICE,
  desiredCapabilities: remoteDesiredCapabilities,
});

export = mobileRemoteConfig;
