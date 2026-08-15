export interface EnvironmentVariables {
  PORT: number;
  NODE_ENV: string;
  APP_URL: string;
  API_URL: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  REFRESH_TOKEN_EXPIRATION: string;
  ENCRYPTION_KEY: string;
  META_APP_ID: string;
  META_APP_SECRET: string;
  META_VERIFY_TOKEN: string;
  META_API_VERSION: string;
  META_GRAPH_API_BASE_URL: string;
  THREADS_API_BASE_URL: string;
}

export default (): EnvironmentVariables => ({
  PORT: parseInt(process.env.PORT || '4000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  API_URL: process.env.API_URL || 'http://localhost:4000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_postpilot_jwt_signing_key_2026',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '15m',
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  META_APP_ID: process.env.META_APP_ID || '',
  META_APP_SECRET: process.env.META_APP_SECRET || '',
  META_VERIFY_TOKEN: process.env.META_VERIFY_TOKEN || 'postpilot_webhook_verification_token_secure',
  META_API_VERSION: process.env.META_API_VERSION || 'v21.0',
  META_GRAPH_API_BASE_URL: process.env.META_GRAPH_API_BASE_URL || 'https://graph.facebook.com',
  THREADS_API_BASE_URL: process.env.THREADS_API_BASE_URL || 'https://graph.threads.net',
});
