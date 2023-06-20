import { Model } from 'objection';
import { AnswerType } from './answer.types';
// import { Option } from '../options/option.model';
// import { Question } from '../questions/question.model';
// import { User } from '../users/user.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Answer extends AnswerType {}
// eslint-disable-next-line no-redeclare
export class Answer extends Model {
  // Table name is the only required property.
  static tableName = 'answers';

  static relationMappings = {};
}
