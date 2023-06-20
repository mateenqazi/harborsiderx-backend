import { Model } from 'objection';
import { QuestionType } from './question.types';
import { Option } from '../options/option.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Question extends QuestionType {}
// eslint-disable-next-line no-redeclare
export class Question extends Model {
  // Table name is the only required property.
  static tableName = 'questions';

  static relationMappings = {
    options: {
      relation: Model.HasManyRelation,
      modelClass: Option,
      join: {
        from: 'questions.id',
        to: 'options.question_id',
      },
    },
  };
}
