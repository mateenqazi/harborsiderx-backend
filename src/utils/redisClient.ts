// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable import/first */
// require('custom-env').env(true);
// require('dotenv').config();

// import { createClient, RedisClientOptions } from 'redis';
// import { APP_CONFIG } from '../config/appConfig';
// import { logger } from './logger';

// export class RedisClient {
//   redisClient;

//   constructor() {
//     if (APP_CONFIG.get('env') !== 'local') {
//       const redisClientOption: RedisClientOptions = {
//         socket: {
//           host: APP_CONFIG.get('redis_credentials').REDIS_HOST,
//           port: APP_CONFIG.get('redis_credentials').REDIS_PORT ? +APP_CONFIG.get('redis_credentials').REDIS_PORT : 6379,
//         },
//         password: APP_CONFIG.get('redis_credentials').REDIS_PASSWORD,
//       };
//       this.redisClient = createClient(redisClientOption);
//     } else {
//       this.redisClient = createClient();
//     }

//     this.redisClient.on('error', (error) => {
//       logger.error(error.message);
//     });

//     this.redisClient.connect();
//   }

//   public async set(key: string, value: string, options?: any) {
//     return this.redisClient.set(key, value, options);
//   }

//   public async get(key: string) {
//     return this.redisClient.get(key);
//   }

//   public async del(key: string) {
//     return this.redisClient.del(key);
//   }
// }
