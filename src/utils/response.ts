import { Request, Response, NextFunction } from "express";

// Define an error type for better type checking
interface CustomError extends Error {
  status?: number;
}

interface ResponseObj<T> {
  status: number;
  msg: string;
  payload: T;
}

export function successResponse<T>(
  res: Response,
  status: number = 200,
  msg: string = "successful request",
  payload: T
) {
  const responseObj: ResponseObj<T> = {
    status,
    msg,
    payload,
  };

  return res.status(200).json(responseObj);
}

export function errorResponse(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: false,
    message: err.message,
  });
}

export function errorres(err: String, res: Response, statusCode: number = 500) {
  res.status(statusCode).json({
    status: false,
    message: err,
  });
}
