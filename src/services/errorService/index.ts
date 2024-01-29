export const createErrorFactory = function (name: string) {
  return class CustomizedError extends Error {
    constructor(message: string) {
      super(message)
      this.name = name
    }
  }
}

export const ValidationError = createErrorFactory('ValidationError')
export const RequestError = createErrorFactory('RequestError')
export const ConnectionError = createErrorFactory('ConnectionError')
export const NotFoundError = createErrorFactory('NotFoundError')
export const AuthorizationError = createErrorFactory('AuthorizationError')
export const ConflictError = createErrorFactory('ConflictError')

export const ErrorsHandler = (error: any) => {
  switch (error.name) {
    case 'PrismaClientInitializationError':
      return {
        error: 'No se ha podido conectar a la base de datos',
        status: 500,
      }
    case 'ValidationError':
      return { error: error.message, status: 400 }
    case 'RequestError':
      return { error: error.message, status: 400 }
    case 'ConnectionError':
      return { error: error.message, status: 400 }
    case 'NotFoundError':
      return { error: error.message, status: 404 }
    case 'AuthorizationError':
      return { error: error.message, status: 401 }
    case 'ConflictError':
      return { error: error.message, status: 409 }
    default:
      return { error: 'Ha ocurrido un error', status: 500 }
  }
}
