/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
// import nock from 'nock';
import knexConnection from '../../knexConnection';

// import getApp from '../../app';
// import { startServer } from '../../lib/server';

/**
 * Starts a test server and connects for API calls
 * @returns Axios client connected to test server
 */
export const initTestServer = async () => {
  const { default: server } = await import('../../src/server');
  const { address } = server;
  await knexConnection[process.env.NODE_ENV || 'test'].schema.createSchemaIfNotExists('public');
  await knexConnection[process.env.NODE_ENV || 'test'].migrate.latest();
  const port = address && typeof address !== 'string' ? address.port : null;
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${port}/api`,
    validateStatus: () => true,
  };
  // commenting as we need to test external api for auth
  // nock.disableNetConnect();
  // nock.enableNetConnect('127.0.0.1');

  return axios.create(axiosConfig);
};

export default initTestServer;
