import { Model, Pojo } from 'objection';
import { z } from 'zod';
import { ZodObjectionValidator } from '../objectionValidation';

export default class BaseModel extends Model {
  /**
   * Zod schema for validating model
   */
  static get schema(): z.AnyZodObject | null {
    return null;
  }

  /**
   * Setup Zod validation
   */
  static createValidator() {
    return new ZodObjectionValidator();
  }

  /**
   * Runtime type checks on data coming from database
   */
  $parseDatabaseJson(json: Pojo) {
    const jsonFromDatabase = super.$parseDatabaseJson(json);
    // Using ts-ignore to access static method - ongoing discussion here: https://github.com/microsoft/TypeScript/issues/3841#issuecomment-646214218
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.constructor.schema) this.constructor.schema.partial().parse(jsonFromDatabase);
    return json;
  }
}
