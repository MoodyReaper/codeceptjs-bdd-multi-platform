import mobileCommonSchema from './schemas/mobile.common.schema';

const mobileCommonConfig = mobileCommonSchema.parse({
  launchType: process.env.TESTS_MOBILE_COMMON_LAUNCH_TYPE,
  userUsername: process.env.TESTS_MOBILE_COMMON_USER_USERNAME,
  userPassword: process.env.TESTS_MOBILE_COMMON_USER_PASSWORD,
});

export = mobileCommonConfig;
