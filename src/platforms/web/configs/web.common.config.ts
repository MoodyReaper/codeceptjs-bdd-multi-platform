import webCommonSchema from './schemas/web.common.schema';

const webCommonConfig = webCommonSchema.parse({
  browser: process.env.TESTS_WEB_COMMON_BROWSER?.replaceAll(' ', '').toLowerCase(),
});

export = webCommonConfig;
