import { Model } from 'objection';
import { UserType } from './user.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends UserType {}
// eslint-disable-next-line no-redeclare
export class User extends Model {
  // Table name is the only required property.
  static tableName = 'users';
}
