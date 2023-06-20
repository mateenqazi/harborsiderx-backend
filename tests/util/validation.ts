import { z } from 'zod';

export const expectValidation = <Input, Output>(
  validation: z.SafeParseReturnType<Input, Output>,
) => {
  expect(
    validation.success,
    !validation.success ? JSON.stringify(validation.error.issues, null, 2) : '',
  ).toBe(true);
};
