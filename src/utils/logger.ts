import pino from 'pino';
import pinoHttp from 'pino-http';
import rTracer from 'cls-rtracer';

export const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {},
        level: process.env.LOG_LEVEL || 'info',
      },
    ],
  },
  options: {
    colorize: true,
  },
  mixin() {
    return { requestId: rTracer.id() }
  },
});

export const loggerHttp = pinoHttp();
