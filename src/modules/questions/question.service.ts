import { QuestionRepository } from './question.repository';
import { QuestionType } from './question.types';

class UserService {
  public questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  public getAllQuestion = async (userId: number) => {
    return await this.questionRepository.getAllQuestions(userId);
  };

  public getOneUser = async (email: string) => {
    return await this.questionRepository.getUser(email);
  };

  public createQuestion = async (questionData: any) => {
    return await this.questionRepository.createQuestions(questionData);
  };

  public updateUser = async (id: number, userData: Partial<QuestionType>) => {
    return await this.questionRepository.updateUser({ id, ...userData });
  };
}

export default new UserService();
