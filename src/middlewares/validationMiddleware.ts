import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { emptyReqBodyError, validationError } from '../lib/errors';

export const validateInput = <ZodSchema extends z.ZodTypeAny>(
  dataToValidate: unknown,
  schema: ZodSchema,
) => {
  const validation = schema.safeParse(dataToValidate);
  if (validation.success) return validation.data;
  throw validationError(JSON.stringify(validation.error.format()));
};

export const useBodyValidation = <ZodSchema extends z.ZodTypeAny>(schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0 || req.body.length === 0) {
        throw emptyReqBodyError();
      }
      req.body = validateInput(req.body, schema);
      next();
    } catch (err) {
      next(err);
    }
  };
};
