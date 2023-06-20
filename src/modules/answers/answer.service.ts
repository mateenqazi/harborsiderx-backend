import { AnswerRepository } from './answer.repository';
import { AnswerType } from './answer.types';

class UserService {
  public answerRepository: AnswerRepository;

  constructor() {
    this.answerRepository = new AnswerRepository();
  }

  public getAllAnswers = async () => {
    return await this.answerRepository.getAllAnswers();
  };

  public getAllAnswerForSpecificUser = async () => {
    return await this.answerRepository.getAllAnswerSpecificUser({});
  };

  public createAnswer = async (userId: number, questionData: any) => {
    return await this.answerRepository.createAnswer(userId, questionData);
  };
}

export default new UserService();
