import { Validator, ValidatorArgs } from 'objection';
import { z } from 'zod';

export class ZodObjectionValidator extends Validator {
  validate(args: ValidatorArgs) {
    const { json, options, ctx } = args;
    // eslint-disable-next-line prefer-destructuring
    const schema: z.AnyZodObject = ctx.schema;
    if (!schema) return json;

    const validatedJson = options.patch ? schema.partial().parse(json) : schema.parse(json);
    return validatedJson;
  }

  beforeValidate(args: ValidatorArgs) {
    const { ctx } = args;
    // Using ts-ignore to access static method - ongoing discussion here: https://github.com/microsoft/TypeScript/issues/3841#issuecomment-646214218
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.schema = args.model.constructor.schema;
    return super.beforeValidate(args);
  }

  afterValidate(args: ValidatorArgs) {
    return super.afterValidate(args);
  }
}
