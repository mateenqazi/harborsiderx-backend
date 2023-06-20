// Nock is only used for tests so it belongs in dev dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import nock from 'nock';
import cron from 'node-cron';
import knexConnection from '../../knexConnection';

/**
 * Shuts down and cleans up test server
 * @internal
 */
export const cleanupServer = async () => {
  const cronTasks = cron.getTasks();
  cronTasks.forEach((task) => {
    task.stop();
  });
  const { default: server } = await import('../../src/server');
  nock.enableNetConnect();
};

export const cleanupProducts = async () => {
  // no need to remove user as its also stored in aws pool
  await knexConnection[process.env.NODE_ENV || 'test'].migrate.rollback();
  await knexConnection[process.env.NODE_ENV || 'test'].schema.dropSchemaIfExists('public', true);
};

export default cleanupServer;
