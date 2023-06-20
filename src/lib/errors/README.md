# Errors

Wrapper of the Javascript Error object (AppError.ts), meant to replace it to provide more control over error handling. Also includes helpful error utilities (some utilities still WIP)

## Basic Usage

```javascript
import AppError from './lib/errors';

/**
 * Example function to fetch all products
 * If the function returns no results, throws an error that responds to the client with a 404 and the message 'No products found'
 * This example is equivalent to res.sendStatus(404).send({ name: 'Product Service Error, message: 'No products found' })
 * Because the isOperational field is true, this error will not cause the server to restart
 */
const getAllProducts = async () => {
  const products = await productRepository.getAll();
  if (!products) {
    throw new AppError('Product Service Error', 'No products found', 404, true);
  }
};
```

## Error Handlers

handleError.ts contains some centralized error handlers that can be customized and extended as needed.

- For API routes, use handleErrorMiddleware to automate responses based on AppError settings.
- For everything else that runs outside of Express (e.g. cron jobs or scripts) use handleError directly

### Example: handleErrorMiddleware

```javascript
import { handleErrorMiddleware } from './lib/errors';

app.use(handleErrorMiddleware);
```

### Example: handleError

```javascript
import { handleError } from './lib/errors';

process.on('uncaughtException', (error) => {
  logger.warn('Handling uncaught exception...');
  handleError(error);
});
```
