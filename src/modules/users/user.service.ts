import { AuthTypesEnums } from '../../types/AuthenticationTypes';
import { getToken, hashPassword } from '../../utils/auth';
import { UserRepository } from './user.repository';
import { UserType } from './user.types';

class UserService {
  public userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getOneUser = async (email: string) => {
    return await this.userRepository.getUser(email);
  };

  public addUser = async (userData: Partial<UserType>) => {
    const data: any = userData;
    const hashedPassword = await hashPassword(userData.password!);
    data.password = hashedPassword as any;
    return await this.userRepository.createUser(data);
  };

  public loginUserLocally = async (userLoginData: any) => {
    const token = await getToken(AuthTypesEnums.local, userLoginData);
    return token;
  };

  public loginUserByGoogle = async (userLoginData: any) => {
    const token = await getToken(AuthTypesEnums.google, userLoginData);
    return token;
  };

  public updateUser = async (id: number, userData: any) => {
    return await this.userRepository.updateUser({ id, ...userData });
  };
}

export default new UserService();
