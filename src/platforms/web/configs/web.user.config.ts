import webUserSchema from './schemas/web.user.schema';

const webUserConfig = webUserSchema.parse({
  baseUrl: process.env.TESTS_WEB_USER_BASE_URL?.replace(/\/$/, ''),
  username: process.env.TESTS_WEB_USER_USERNAME,
  password: process.env.TESTS_WEB_USER_PASSWORD,
});

export = webUserConfig;
