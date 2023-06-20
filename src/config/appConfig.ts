import convict from 'convict';

export const APP_CONFIG = convict({
  env: {
    doc: 'The application environment.',
    format: ['dev', 'production', 'test', 'staging', 'local'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  rate_limiter: {
    MAX_REQUEST_PER_IP: {
      doc: 'Per IP max request it can make',
      default: 10,
      env: 'MAX_REQUEST_PER_IP',
    },
    REQUEST_WINDOW_SEC: {
      doc: 'Time for Request inbound rate',
      default: 1,
      env: 'REQUEST_WINDOW_SEC',
    },
  },
  ports: {
    PORT: {
      doc: 'The server port to bind.',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
  },
  database: {
    DB_HOST: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'localhost',
      env: 'DB_HOST',
    },
    DB_NAME: {
      doc: 'Database name',
      format: String,
      default: 'harborsiderx',
      env: 'DB_NAME',
    },
    DB_PORT: {
      doc: 'Database port',
      default: '5432',
      env: 'DB_PORT',
    },
    DB_TYPE: {
      doc: 'Database type (which database to use)',
      format: String,
      default: 'postgres',
      env: 'DB_TYPE',
    },
    DB_USERNAME: {
      doc: 'Database username',
      default: 'postgres',
      env: 'DB_USERNAME',
    },
    DB_PASSWORD: {
      doc: 'Database password',
      format: String,
      default: 'test',
      env: 'DB_PASSWORD',
    },
    DB_SCHEMA: {
      doc: 'Database schema',
      format: String,
      default: 'public',
      env: 'DB_SCHEMA',
    },
    DB_SSL: {
      doc: 'Database SSL',
      format: Boolean,
      default: false,
      env: 'DB_SSL',
    },
  },
  secrets: {
    SESSION_SECRET: {
      doc: 'session secret',
      format: String,
      default: 'JQWERTY',
      env: 'SESSION_SECRET',
    },
  },
}).validate({ allowed: 'strict' })