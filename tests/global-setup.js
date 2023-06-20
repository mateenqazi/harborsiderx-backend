/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const dockerCompose = require('docker-compose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });

module.exports = async () => {
  await dockerCompose.upAll({
    cwd: path.join(__dirname),
    log: true,
  });
  await dockerCompose.exec('database', ['sh', '-c', 'until pg_isready ; do sleep 1; done'], {
    cwd: path.join(__dirname),
  });

  execSync('NODE_ENV=test npx knex migrate:rollback --all --env test');
  execSync('NODE_ENV=test npx knex migrate:latest --env test');
};
