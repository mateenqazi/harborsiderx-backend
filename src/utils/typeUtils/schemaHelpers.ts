import { z } from 'zod';

/**
 * Creates a schema based on a module schema for validating data for add/create functions
 */
export const createAddSchema = (moduleSchema: z.AnyZodObject) => {
  return moduleSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
};

/**
 * Creates a schema based on a module schema for validating data for patch functions
 */
export const createUpdateSchema = (moduleSchema: z.AnyZodObject) => {
  return createAddSchema(moduleSchema).partial();
};

/**
 * Common fields that are in every DB table
 */
export const RowTimeStampsSchema = {
  isDeleted: z.boolean().optional(),
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
};
