export default class AppError extends Error {
  public readonly name: string;

  public readonly httpCode: number;

  public readonly isOperational: boolean;

  public readonly message: string;

  public readonly description: string | undefined;

  /**
   * @param name The name of the error
   * @param description The external description of the error (displayed to client)
   * @param httpCode The http code of the error
   * @param isOperational If not operational, the server will restart
   * @param message An internal message describing the error in server logs only. Defaults to description
   * @internal
   */
  constructor(
    name: string,
    description: string | undefined,
    httpCode: number,
    isOperational = false,
    message: string | undefined = undefined,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    if (Error.captureStackTrace) Error.captureStackTrace(this);

    this.message = `${description || message}${description && message ? ' -- ' : ''}${
      description && message ? message : ''
    }`;
    this.name = name || 'Unknown Error';
    this.httpCode = httpCode || 500;
    this.isOperational = isOperational;
    this.description = description;
  }
}
