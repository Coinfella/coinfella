import {
  BadRequestException,
  createParamDecorator,
  HttpException,
} from 'next-api-decorators';
import { ZodType } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';

export function ApiExceptionHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const message =
    error instanceof HttpException
      ? error.message
      : 'An unknown error occurred.';
  const status = error instanceof HttpException ? error.statusCode : 500;
  const errorString = error instanceof HttpException ? error.errors?.toString() : '{}';
  const stack = error instanceof HttpException ? error.stack : '';

  return res.status(status).json({
    success: false,
    error: message,
    statusCode:status,
    stack:stack,
    detailed: JSON.parse(errorString ?? "{}"),
  });
}

/**
 * Validates an HTTP request body using the given schema.
 *
 * @param {T} schema - The schema to validate the request body against.
 * @returns {(req: Request) => T["_outputType"]} A decorator that validates the request body against the schema and returns the parsed body.
 */
export function BodyValidation(schema: ZodType) {
  return createParamDecorator<Object | undefined>((req) => {
    const parsedBody = schema.safeParse(req.body);
    if (!parsedBody.success) {
      var e = new BadRequestException();
      e.errors = parsedBody.error.issues.map((e) => JSON.stringify(e));
      e.cause = parsedBody.error.cause;
      e.name = parsedBody.error.name;
      e.stack = parsedBody.error.stack;
      e.message = parsedBody.error.message;
      throw e;
    }
    return parsedBody.data;
  })();
}
