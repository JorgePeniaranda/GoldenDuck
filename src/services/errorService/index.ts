import { type ErrorResponse } from '@/types'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
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

export const ErrorsHandler = (error: any): ErrorResponse => {
  switch (error.name) {
    case 'PrismaClientInitializationError':
      return {
        type: 'PrismaClientInitializationError',
        code: ReasonPhrases.SERVICE_UNAVAILABLE,
        message: 'No se ha podido conectar a la base de datos',
        status: StatusCodes.SERVICE_UNAVAILABLE
      }
    case 'JsonWebTokenError':
      return {
        type: 'JsonWebTokenError',
        code: ReasonPhrases.UNAUTHORIZED,
        message: 'El token es invalido',
        status: StatusCodes.UNAUTHORIZED
      }
    case 'ConfigError':
      return {
        type: 'ConfigError',
        code: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    case 'ValidationError':
      return {
        type: 'ValidationError',
        code: ReasonPhrases.BAD_REQUEST,
        message: error.message,
        status: StatusCodes.BAD_REQUEST
      }
    case 'NotFoundError':
      return {
        type: 'NotFoundError',
        code: ReasonPhrases.NOT_FOUND,
        message: error.message,
        status: StatusCodes.NOT_FOUND
      }
    case 'AuthorizationError':
      return {
        type: 'AuthorizationError',
        code: ReasonPhrases.UNAUTHORIZED,
        message: error.message,
        status: StatusCodes.UNAUTHORIZED
      }
    case 'ConflictError':
      return {
        type: 'ConflictError',
        code: ReasonPhrases.CONFLICT,
        message: error.message,
        status: StatusCodes.CONFLICT
      }
    case 'EmailError':
      return {
        type: 'EmailError',
        code: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
    default:
      console.log(error)
      return {
        type: 'UnknownError',
        code: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: 'Ha ocurrido un error',
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }
  }
}

export const GenerateErrorResponse = (error: any): NextResponse => {
  const { code, message, status, type } = ErrorsHandler(error)
  return NextResponse.json({ type, code, message }, { status })
}
