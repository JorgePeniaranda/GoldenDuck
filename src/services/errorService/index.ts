import { type ErrorResponse } from '@/types'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'

export const createErrorFactory = function (name: string): any {
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

export const ErrorsHandler = (error: any): ErrorResponse => {
  switch (error.name) {
    case 'PrismaClientInitializationError':
      return {
        type: 'ORMError',
        message: 'No se ha podido conectar a la base de datos',
        status: StatusCodes.SERVICE_UNAVAILABLE
      }
    case 'JsonWebTokenError':
      return {
        type: 'TokenError',
        message: 'El token es invalido',
        status: StatusCodes.UNAUTHORIZED
      }
    case 'TokenExpiredError':
      return {
        type: 'TokenError',
        message: 'El token es invalido',
        status: StatusCodes.UNAUTHORIZED
      }
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
    default:
      return {
        type: 'UnknownError',
        message: 'Ha ocurrido un error',
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
  }
}

export const GenerateErrorResponse = (error: any): NextResponse => {
  const { message, status, type } = ErrorsHandler(error)
  return NextResponse.json({ status: getReasonPhrase(status), errror: { type, message } }, { status })
}
