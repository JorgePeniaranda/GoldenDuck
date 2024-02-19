import { type ErrorResponse } from '@/types'

export const createErrorFactory = function (name: string): any {
  return class CustomizedError extends Error {
    constructor(message: string) {
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
        error: 'No se ha podido conectar a la base de datos',
        status: 500,
      }
    case 'ConfigError':
      return { error: error.message, status: 500 }
    case 'ValidationError':
      return { error: error.message, status: 400 }
    case 'NotFoundError':
      return { error: error.message, status: 404 }
    case 'AuthorizationError':
      return { error: error.message, status: 401 }
    case 'ConflictError':
      return { error: error.message, status: 409 }
    case 'EmailError':
      return { error: error.message, status: 500 }
    default:
      console.log(error)
      return { error: 'Ha ocurrido un error', status: 500 }
  }
}
