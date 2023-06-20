import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../../utils/logger';

import AppError from './AppError';

export const handleShutdown = () => {
  logger.fatal('Server restarting due to error...');
  process.exit(1);
};

type ErrorDetails = {
  name: string;
  httpCode: number;
  isOperational: boolean;
  description?: string | undefined;
  message: string;
};

const getErrorDetails = (err: AppError | Error): AppError | ErrorDetails => {
  if (err instanceof AppError) return err;
  if (err instanceof ZodError) {
    return {
      httpCode: 500,
      name: 'Runtime Type Error',
      message: JSON.stringify(err.format()),
      isOperational: true,
    };
  }
  if (err.name === 'PayloadTooLargeError') {
    return {
      httpCode: 413,
      name: 'Payload Too Large Error',
      message: 'request entity too large',
      isOperational: true,
    };
  }

  return {
    httpCode: 500,
    name: `Unexpected Error: ${err.name || 'Error Unknown'}`,
    isOperational: false,
    message: err.message,
  };
};

const handleError = async (
  err: AppError | Error,
  shouldHandleShutdown = true,
): Promise<AppError | ErrorDetails> => {
  const errDetails = getErrorDetails(err);
  // if (description) logger.error('Description of the following error: ', description);
  if (!err) logger.error('Error has no description');
  logger.error(err);
  if (shouldHandleShutdown && !errDetails.isOperational) {
    handleShutdown();
  }
  return errDetails;
};

export const handleErrorMiddleware = async (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(err);
  const { httpCode, name, description, isOperational } = await handleError(err, false);
  logger.error(
    `Error route origin - ${req.method} ${req.originalUrl}\nReferred from - ${
      req.headers.referer || req.headers.referrer || 'N/A'
    }`,
  );
  res.status(httpCode).send({
    name,
    message: description || name,
  });
  if (!isOperational) handleShutdown();
  return next();
};

export default handleError;
