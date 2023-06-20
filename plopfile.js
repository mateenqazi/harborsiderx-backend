module.exports = (plop) => {
  // create your generators here
  plop.setHelper('plural', (text) => {
    const lastCharacter = text[text.length - 1].toLowerCase();
    return lastCharacter === 's' ? `${text}es` : `${text}s`;
  });
  plop.setGenerator('module', {
    description: 'Module with integration tests',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the module (singular)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/{{camelCase name}}.controller.ts',
        templateFile: 'plopTemplates/modules/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/{{camelCase name}}.model.ts',
        templateFile: 'plopTemplates/modules/model.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/{{camelCase name}}.service.ts',
        templateFile: 'plopTemplates/modules/service.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/{{camelCase name}}.repository.ts',
        templateFile: 'plopTemplates/modules/repository.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/{{camelCase name}}.types.ts',
        templateFile: 'plopTemplates/modules/types.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/tests/{{camelCase name}}API.integration.test.ts',
        templateFile: 'plopTemplates/modules/apiIntegrationTests.hbs',
      },
      'Module has been created. \nPlease remember to: \n1. Add the route to src/routes/routes.ts \n2. Fill in the schema in the [moduleName].types.ts file',
    ],
  });
  plop.setGenerator('Module API integration tests', {
    description: 'Basic integration tests for a module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the module (singular)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{plural (camelCase name)}}/tests/{{camelCase name}}API.integration.test.ts',
        templateFile: 'plopTemplates/modules/apiIntegrationTests.hbs',
      },
      'Integration tests have been created',
    ],
  });
};
