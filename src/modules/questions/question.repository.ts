import { Answer } from '../answers/answer.model';
import { Question } from './question.model';
import { QuestionType } from './question.types';

export class QuestionRepository {
  async getAllQuestions(userId: number) {
    let mergedObject;
    await Promise.all([
      { questions: await Question.query().withGraphJoined('options') },
      { answers: await Answer.query().where('user_id', userId) },
    ]).then((data) => {
      mergedObject = data.reduce((result: object, currentObject: any) => {
        return { ...result, ...currentObject };
      }, {});
    });

    return mergedObject;

    // return await Question.query()
    //   .join('options', 'questions.id', '=', 'options.question_id')
    //   .select('questions.*', 'options.description as optionType', 'options.id as optionId');
  }

  async getUser(email: string) {
    return await Question.query().findOne({
      email,
    });
  }

  async getById(id: string) {
    return await Question.query().findOne({
      id,
    });
  }

  async createQuestions(questionData: Partial<QuestionType>) {
    return await Question.query().insert(questionData);
  }

  async updateUser(questionData: any) {
    return await Question.query().findById(questionData.id).patch(questionData);
  }
}
