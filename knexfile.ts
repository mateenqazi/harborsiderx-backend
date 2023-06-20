/* eslint-disable */
require('custom-env').env(true);
require('dotenv').config();
import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';
import { APP_CONFIG } from './src/config/appConfig';

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  local: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  dev: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    seeds: {
      directory: __dirname + '/src/seeds',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    seeds: {
      directory: __dirname + '/src/seeds',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
};

export default config;
