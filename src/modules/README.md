# Modules

Module folders are used to encapsulate code into components. They should follow the structure and requirements explained below.

## Adding New Modules

A simple way to generate new modules that meet all requirements is to run `npm run module:make`. After the module is generated, you must do two things before it can be used:

- Add the route to src/routes/routes.ts
- Fill in the schema in the [moduleName].types.ts file

After following those steps, the module should be ready and should pass all integration tests.

New modules will include their own integration tests but you can generate tests for existing modules as well by using `npm run generate` and selecting API integration tests.

## File Structure

Module folders can contain the following files (files with a \* are required):

- **module.model.ts**\* - Objection.js model. Must extend BaseModel
- **module.controller.ts**\* - A wrapper for services that handles all things network/express related. Controllers should contain no business logic and call services to handle any logic. This allows us to decouple all logic from Express or API calls (for example, if we later want to use logic for a cron job or testing)
- **module.service.ts**\* - Contains all business logic. Calls functions from the data access layer to read/write data.
- **module.repository.ts**\* - Has direct access to data for this domain that is stored in databases
- **module.types.ts**\* - Contains all types and schemas directly related to the module
- **/tests**\* - Contains all tests directly related to the module
  - **moduleAPI.integration.test.ts**\* - Integration tests for every endpoint
  - **Any other tests (unit or integration)**
- **module.errors.ts or /errors** - Contains functions that return AppError instances for errors directly related to the module. If more than one file is needed, put files in a module/errors folder
- **module.util.ts or /util** - Any utilities only used by this module. If more than one file is needed, put files in a module/util folder
- **module.middleware.ts or /middleware** - Any middleware only used by this module. If more than one file is needed, put files in a module/middleware folder

## Required Endpoints

Every public module that is based on a database model should include the following endpoints:

- GET / - getAll
- POST / - create
- GET /:id - getById
- PATCH /:id - update
- DELETE /:id - removeById (can be soft delete)

Look at the **Endpoint Integration Testing** example for details on general spec requirements for each endpoint.

## Validation and Runtime Type Safety

The following must be validated for type safety at runtime:

- Request body from incoming API requests. This should usually be done using middleware in the routes. Data must be validated before passing the body data to service functions.
  Example using the bodyValidation middleware in a Controller class:

```typescript
import { useBodyValidation } from 'src/middlewares/validationMiddleware';

// Controller Class
...

constructor(service: Service, inputAddSchema: z.ZodSchema, inputUpdateSchema: z.ZodSchema) {
    this.router = Router();
    this.validateAddBody = useBodyValidation(inputAddSchema);
    this.validateUpdateBody = useBodyValidation(inputUpdateSchema);
    this.routes();
    this.service = service;
  }

public routes = () => {
    this.router.get('/', this.getAll);
    this.router.post('/', this.validateAddBody, this.addAndReturn);
    this.router.get('/:id', this.getById);
    this.router.patch('/:id', this.validateUpdateBody, this.update);
    this.router.delete('/:id', this.removeById);
    return this.router;
  };
```

- Data going into the database. This is done automatically if the model extends BaseModel and the query is made using Objection.
- Data returned from a database query. This is done automatically if the model extends BaseModel and the query is made using Objection.
- Request object for a third party API
- Response data from a third party API

## Base Module

To simplify adding and maintaining new modules, a base module can be found in src/utils/moduleBase. Controllers, models, repositories, and services for every new module should extend the base classes. This will provide a fully functional module with all the required services and endpoints that meets testing specs.

## Endpoint Integration Testing

Every endpoint must have integration tests for a happy path as well as anticipated errors and edge cases. Common integration tests for common endpoints can be generated using the expectBaseEndpointFactory function from tests/utils/moduleIntergrationTests.ts.

Here's an example integration test for an Address public module:

```typescript
/* eslint-disable import/no-extraneous-dependencies */
import { AxiosInstance } from 'axios';
import { initTestServer } from '../../../../tests/util/setup';
import { cleanupServer } from '../../../../tests/util/cleanup';
import seedData from '../../../utils/seedData';
import Address from '../address.model';
import { AddressSchema } from '../address.types';
import { expectBaseEndpointFactory } from '../../../../tests/util/moduleIntergrationTests';

let axiosClient: AxiosInstance;
let expectBaseEndpointToWork: ReturnType<typeof expectBaseEndpointFactory>;

beforeAll(async () => {
  axiosClient = await initTestServer();
  expectBaseEndpointToWork = expectBaseEndpointFactory<Address>(
    'addresses',
    AddressSchema,
    axiosClient,
    seedData.addresses,
  );
});

afterAll(async () => {
  await cleanupServer();
});

describe('/addresses', () => {
  describe('/', () => {
    describe('POST', () => {
      test('When request sent, then should add address to DB', async () => {
        await expectBaseEndpointToWork.addEndpoint.happy();
      });
      test('When request sent with extra field, then should strip field and add DB without error', async () => {
        await expectBaseEndpointToWork.addEndpoint.extraField();
      });
      test('When request sent with properties having a wrong type, then should respond with 400', async () => {
        await expectBaseEndpointToWork.addEndpoint.badRequest({ name: 1 });
      });
      test('When request sent with no body, then should respond with 400', async () => {
        await expectBaseEndpointToWork.addEndpoint.emptyBody();
      });
    });
    describe('GET', () => {
      test('When request sent, then should respond with list of all non deleted rows', async () => {
        await expectBaseEndpointToWork.getAllEndpoint.happy();
      });
    });
  });
  describe('/:id', () => {
    describe('GET', () => {
      test('When get request sent with ID, then should respond with resource with matching ID', async () => {
        await expectBaseEndpointToWork.getByIdEndpoint.happy();
      });
      test("When get request sent with ID for resource that doesn't exist, then should respond with 404", async () => {
        await expectBaseEndpointToWork.getByIdEndpoint.nonExistant();
      });
      test("When get request sent with ID that isn't a number, then should respond with 400", async () => {
        await expectBaseEndpointToWork.getByIdEndpoint.nanId();
      });
    });
    describe('PATCH', () => {
      test('When patch request sent with ID, then should update resource in DB', async () => {
        await expectBaseEndpointToWork.updateEndpoint.happy({ name: 'test', city: 'Pasadena' });
      });
      test("When patch request sent with ID for resource that doesn't exist, then should respond with 404", async () => {
        await expectBaseEndpointToWork.updateEndpoint.nonExistant();
      });
      test("When patch request sent with ID that isn't a number, then should respond with 400", async () => {
        await expectBaseEndpointToWork.updateEndpoint.nanId();
      });
      test('When patch request sent with extra field, then should strip field and add DB without error', async () => {
        await expectBaseEndpointToWork.updateEndpoint.extraFields();
      });
      test('When patch request sent with properties having a wrong type, then should respond with 400', async () => {
        await expectBaseEndpointToWork.updateEndpoint.badRequest({ name: 1 });
      });
      test('When patch request sent with no body, then should respond with 400', async () => {
        await expectBaseEndpointToWork.updateEndpoint.emptyBody();
      });
    });
    describe('DELETE', () => {
      test('When delete request sent with ID, then should soft delete resource in DB', async () => {
        await expectBaseEndpointToWork.deleteEndpoint.happy();
      });
      test("When delete request sent with ID for resource that doesn't exist, then should respond with 404", async () => {
        await expectBaseEndpointToWork.deleteEndpoint.nonExistant();
      });
      test("When delete request sent with ID that isn't a number, then should respond with 400", async () => {
        await expectBaseEndpointToWork.deleteEndpoint.nanId();
      });
    });
  });
});
```
