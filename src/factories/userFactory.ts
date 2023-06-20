// import faker from '@faker-js/faker';
// import { Knex } from 'knex';
// import knexConnection from '../../knexConnection';
// import AuthService from '../modules/auth/auth.service';
// import { CompanyFactory } from './companyFactory';

// export class UserFactory {
//   private knex: Knex;
//   public authService = AuthService;
//   async create() {
//     const userAttr = [];
//     this.knex = knexConnection[process.env.NODE_ENV || 'test']
//     userAttr.push({ Name: 'email', Value: 'test@gmail.com' });
//     userAttr.push({ Name: 'custom:userType', Value: 'admin' });
//     userAttr.push({ Name: 'custom:companyName', Value: 'testing-company' });
//     try {
//       const company: any = await new CompanyFactory().create({
//         name: faker.datatype.string(),
//       })
//       try {
//         await this.authService.signUpUser('test@gmail.com', 'TestTest@123', userAttr)
//       } catch (error) {

//       }
//       await this.knex('users').insert({
//         firstName: 'test',
//         lastName: 'test',
//         email: 'test@gmail.com',
//         companyId: company[0].id,
//       });
//     } catch (error) {

//     }
//   }
// }