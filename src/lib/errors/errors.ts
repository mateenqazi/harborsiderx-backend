import AppError from './AppError';

export const errorArray = (errArray: AppError[]) => {
  const errData = errArray.reduce(
    (acc, err) => {
      const httpCode = err.httpCode > acc.httpCode ? err.httpCode : acc.httpCode;
      const isOperational = !(acc.isOperational && !err.isOperational);
      const descriptions = `${acc.descriptions}\n\n${err.description}`;
      const messages = `${acc.messages}\n\n${err.message}\n${err.stack}`;
      return {
        httpCode,
        isOperational,
        descriptions,
        messages,
      };
    },
    {
      httpCode: 400,
      isOperational: true,
      descriptions: '',
      messages: '',
    },
  );
  const { httpCode, isOperational, messages } = errData;
  return new AppError(
    'Multiple Errors Encountered',
    `The following errors have been encountered: ${messages}`,
    httpCode,
    isOperational,
  );
};

export const emptyReqBodyError = () =>
  new AppError(
    'Validation Error',
    'Request body is empty or only references fields that do not exist',
    400,
    true,
  );

export const nonexistantFieldError = () =>
  new AppError('Validation Error', 'Request references fields that do not exist', 400, true);

export const notFoundError = () =>
  new AppError('Not Found Error', 'Could not find the resource specified', 404, true);

export const validationError = (description: string) =>
  new AppError('Data Validation Error', description, 400, true);
