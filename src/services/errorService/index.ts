import { ErrorsDictionary } from '@/const/messages'
import { type ErrorInfo } from '@/types'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'

const createErrorFactory = function (name: string): any {
  return class CustomizedError extends Error {
    constructor (message: string) {
      super(message)
      this.name = name
    }
  }
}

export const ConfigError = createErrorFactory('ConfigError')
export const ValidationError = createErrorFactory('ValidationError')
export const NotFoundError = createErrorFactory('NotFoundError')
export const AuthorizationError = createErrorFactory('AuthorizationError')
export const ConflictError = createErrorFactory('ConflictError')
export const EmailError = createErrorFactory('EmailError')
export const RequestError = createErrorFactory('RequestError')

export const ErrorsHandler = (error: any): ErrorInfo => {
  switch (error.name) {
    // Prisma ORM errors
    case 'PrismaClientInitializationError':
      return {
        type: 'ServerError',
        message: ErrorsDictionary.DatabaseConnectionError,
        status: StatusCodes.SERVICE_UNAVAILABLE
      }
    case 'PrismaClientKnownRequestError':
      return {
        type: 'ORMError',
        message: ErrorsDictionary.KnownRequestError,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    case 'PrismaClientUnknownRequestError':
      return {
        type: 'UnknownORMError',
        message: ErrorsDictionary.UnknownRequestError,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    case 'PrismaClientRustPanicError':
      return {
        type: 'FatalORMError',
        message: ErrorsDictionary.PanicError,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    case 'PrismaClientValidationError':
      return {
        type: 'RequestError',
        message: ErrorsDictionary.ValidationError,
        status: StatusCodes.BAD_REQUEST
      }
    // JSON Web Token errors
    case 'JsonWebTokenError':
    case 'TokenExpiredError':
    case 'NotBeforeError':
      return {
        type: 'TokenError',
        message: ErrorsDictionary.InvalidToken,
        status: StatusCodes.UNAUTHORIZED
      }
    // Jose Web Token errors
    case 'JWTClaimValidationFailed':
    case 'JWTExpired':
    case 'JWTInvalid':
      return {
        type: 'TokenError',
        message: ErrorsDictionary.InvalidToken,
        status: StatusCodes.UNAUTHORIZED
      }
    // Custom errors
    case 'ConfigError':
      return {
        type: 'ConfigError',
        message: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    case 'ValidationError':
      return {
        type: 'ValidationError',
        message: error.message,
        status: StatusCodes.BAD_REQUEST
      }
    case 'NotFoundError':
      return {
        type: 'NotFoundError',
        message: error.message,
        status: StatusCodes.NOT_FOUND
      }
    case 'AuthorizationError':
      return {
        type: 'AuthorizationError',
        message: error.message,
        status: StatusCodes.UNAUTHORIZED
      }
    case 'ConflictError':
      return {
        type: 'ConflictError',
        message: error.message,
        status: StatusCodes.CONFLICT
      }
    case 'EmailError':
      return {
        type: 'EmailError',
        message: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    case 'RequestError':
      return {
        type: 'RequestError',
        message: error.message,
        status: StatusCodes.BAD_REQUEST
      }
    // Default error
    default:
      return {
        type: 'UnknownError',
        message: ErrorsDictionary.UnknownError,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
  }
}

export const GenerateErrorResponse = (error: any): NextResponse => {
  const { message, status, type } = ErrorsHandler(error)
  return NextResponse.json(
    { status: getReasonPhrase(status), error: { type, message } },
    { status }
  )
}
