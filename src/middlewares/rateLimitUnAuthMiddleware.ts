// import { Request, Response, NextFunction } from 'express';
// import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
// import { APP_CONFIG } from '../config/appConfig';
// import { RedisClient } from '../utils/redisClient';

// export const rateLimiterUnAuthMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const Ip = req.ip;
//   const pointsToConsume = 1;
//   const redisClient = new RedisClient();
//   const maxRequests = Number(APP_CONFIG.get('rate_limiter').MAX_REQUEST_PER_IP);
//   const windowSec = Number(APP_CONFIG.get('rate_limiter').REQUEST_WINDOW_SEC);

//   const rateLimiterMemory = new RateLimiterMemory({
//     points: maxRequests,
//     duration: windowSec, // here number is represented in seconds.
//     blockDuration: 86400,
//   });

//   const rateLimiterRedis = new RateLimiterRedis({
//     storeClient: redisClient,
//     points: maxRequests, // Number of points.
//     duration: windowSec, // Per 1 seconds.
//     inMemoryBlockOnConsumed: maxRequests + 1, // If userId or IP consume >=301 points per minute.
//     inMemoryBlockDuration: 86400, // Block it for a one day in memory, so no requests go to Redis.
//     insuranceLimiter: rateLimiterMemory, // reserved if redis stops unexpectedly.
//   });
//   try {
//     await rateLimiterRedis.consume(Ip, pointsToConsume);
//     next();
//   } catch (error) {
//     res.status(429).send({
//       error: true,
//       message: 'you have been blocked for one day because of too many requests.',
//     });
//   }
// };
