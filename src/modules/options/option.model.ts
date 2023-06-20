import { Model } from 'objection';
import { OptionType } from './option.types';
// import { Question } from '../questions/question.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Option extends OptionType {}
// eslint-disable-next-line no-redeclare
export class Option extends Model {
  // Table name is the only required property.
  static tableName = 'options';

  // static relationMappings = {
  //   question: {
  //     relation: Model.BelongsToOneRelation,
  //     modelClass: Question,
  //     join: {
  //       from: 'options.question_id',
  //       to: 'questions.id',
  //     },
  //   },
  // };
}
