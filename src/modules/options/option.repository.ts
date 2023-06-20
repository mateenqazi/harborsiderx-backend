import { Option } from './option.model';
import { OptionType } from './option.types';

export class QuestionRepository {
  async getAllUsers() {
    return await Option.query();
  }

  async getUser(email: string) {
    return await Option.query().findOne({
      email,
    });
  }

  async getById(id: string) {
    return await Option.query().findOne({
      id,
    });
  }

  async createOptions(optionData: Partial<OptionType>) {
    return await Option.query().insertGraph(optionData);
  }

  async updateUser(optionData: any) {
    return await Option.query().findById(optionData.id).patch(optionData);
  }
}
