import webAdminSchema from './schemas/web.admin.schema';

const webAdminConfig = webAdminSchema.parse({
  baseUrl: process.env.TESTS_WEB_ADMIN_BASE_URL?.replace(/\/$/, ''),
  username: process.env.TESTS_WEB_ADMIN_USERNAME,
  password: process.env.TESTS_WEB_ADMIN_PASSWORD,
});

export = webAdminConfig;
