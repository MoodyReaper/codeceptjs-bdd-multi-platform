import apiSchema from './schemas/api.schema';

const apiConfig = apiSchema.parse({
  graphqlBaseUrl: process.env.TESTS_API_GRAPHQL_BASE_URL?.replace(/\/$/, ''),
  restBaseUrl: process.env.TESTS_API_REST_BASE_URL?.replace(/\/$/, ''),
});

export = apiConfig;
