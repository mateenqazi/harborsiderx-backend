import { QuestionRepository } from './option.repository';
import { OptionType } from './option.types';

class UserService {
  public questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  public getOneUser = async (email: string) => {
    return await this.questionRepository.getUser(email);
  };

  public createOption = async (optionData: any) => {
    return await this.questionRepository.createOptions(optionData);
  };

  public updateUser = async (id: number, userData: Partial<OptionType>) => {
    return await this.questionRepository.updateUser({ id, ...userData });
  };
}

export default new UserService();
