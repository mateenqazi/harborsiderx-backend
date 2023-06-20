import { User } from './user.model';
import { UserType } from './user.types';

export class UserRepository {
  async getAllUsers() {
    return await User.query();
  }

  async getUser(email: string) {
    return await User.query().findOne({
      email,
    });
  }

  async getById(id: string) {
    return await User.query().findOne({
      id,
    });
  }

  async createUser(userData: Partial<UserType>) {
    return await User.query().insert(userData);
  }

  async updateUser(userData: any) {
    try {
      return await User.query().findById(userData.id).patch(userData);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
