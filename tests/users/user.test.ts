import { Request, Response } from 'express';
import { UserController } from '../../src/modules/users/user.controller';

describe('Get all users request', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  test('200 - users', async () => {
    const expectedStatusCode = 200;
    const expectedReponse = {
      users: [
        {
          email: 'user@example.com',
          name: 'Some merchant',
        },
        {
          email: 'email@example.com',
          name: 'Another merchant',
        },
      ],
    };

    new UserController().getAllUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedReponse);
  });
});
