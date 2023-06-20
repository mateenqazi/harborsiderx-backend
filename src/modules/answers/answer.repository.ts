import { Answer } from './answer.model';
import { AnswerType } from './answer.types';

export class AnswerRepository {
  async getAllAnswers() {
    return await Answer.query();
  }

  async getAllAnswerSpecificUser(userid: any) {
    return await Answer.query().where('user_id', userid);
  }

  async createAnswer(userId: number, answerData: AnswerType[]) {
    let data;

    const newArray = answerData.map((obj) => {
      return { ...obj, user_id: userId };
    });
    try {
      data = await Answer.query().insert(newArray);
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  async updateAnswer(answerData: any) {
    return await Answer.query().findById(answerData.id).patch(answerData);
  }
}
