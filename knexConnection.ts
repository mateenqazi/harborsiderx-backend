/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('custom-env').env(true);
require('dotenv').config();

import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';
import knex from 'knex';
import path from 'path';
import { APP_CONFIG } from './src/config/appConfig';

// Update with your config settings.
const knexConnection: { [key: string]: Knex<any, unknown[]> } = {
  local: knex({
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
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  dev: knex({
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  test: knex({
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  staging: knex({
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
      directory: path.join(__dirname, '/src/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/src/seeds'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  production: knex({
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
      directory: path.join(__dirname, '/src/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/src/seeds'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
};

// This config file needs to be refactored to create only one knex instance and export connection with appropriate env
export const knexDB = knexConnection[process.env.NODE_ENV || 'test'];

export default knexConnection;
