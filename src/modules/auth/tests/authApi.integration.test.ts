// /* eslint-disable import/no-extraneous-dependencies */
// import { AxiosInstance } from 'axios';
// import { initTestServer } from '../../../../tests/util/setup';
// import { cleanupProducts, cleanupServer } from '../../../../tests/util/cleanup';
// import { User } from '../../users/user.model';
// import { userSignUpSchema } from '../../users/user.types';
// import { expectBaseEndpointFactory } from '../../../../tests/util/moduleIntergrationTests';
// import { UserFactory } from '../../../factories/userFactory';

// let axiosClient: AxiosInstance;
// let expectSignUpEndpointToWork: ReturnType<typeof expectBaseEndpointFactory>;
// const adminUser = { email: 'test@gmail.com', password: 'TestTest@123' }
// let authInfo = { authorization: '', idToken: '' }

// beforeAll(async () => {
//   axiosClient = await initTestServer();
//   await new UserFactory().create();
//   const { data: signInData } = await axiosClient.post(
//     `auth/signIn`,
//     {
//       ...adminUser,
//     },
//   );
//   authInfo = {
//     authorization: signInData.AuthenticationResult.AccessToken,
//     idToken: signInData.AuthenticationResult.IdToken,
//   }
//   expectSignUpEndpointToWork = expectBaseEndpointFactory<User>(
//     'auth',
//     userSignUpSchema.omit({ inviteId: true }),
//     axiosClient,
//   );
// });

// afterAll(async () => {
//   await cleanupProducts();
//   await cleanupServer();
// });

// jest.setTimeout(100 * 1000);
// describe('/auth', () => {
//   describe('/signIn', () => {
//     describe('POST', () => {
//       test('When request sent, then should add user to DB and user signIn', async () => {
//         await expectSignUpEndpointToWork.addEndpoint.authModule.signUpAndSignInApi.happy({ paths: ['signIn'], authInfo, adminUser });
//       });
//       test('When request sent with extra field, it should strip extra field and return 404', async () => {
//         await expectSignUpEndpointToWork.addEndpoint.authModule.signUpAndSignInApi.extraField({ paths: ['signIn'], authInfo, adminUser });
//       });
//     })
//   });
//   describe('/forgotPassword', () => {
//     describe('POST', () => {
//       test('When request sent, then should sent code to email', async () => {
//         await expectSignUpEndpointToWork.addEndpoint.authModule.forgotPassword.happy({ paths: ['signIn', 'forgotPassword'], authInfo, adminUser });
//       });
//       test('When request sent with extra field it will give 400', async () => {
//         await expectSignUpEndpointToWork.addEndpoint.authModule.forgotPassword.extraField({ paths: ['signIn', 'forgotPassword'], authInfo, adminUser });
//       });
//     })
//   })
// })