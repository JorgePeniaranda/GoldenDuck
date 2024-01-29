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

export const ErrorsHandler = {
  ValidationError: (message: string) => ({ error: message, status: 400 }),
  RequestError: (message: string) => ({ error: message, status: 400 }),
  ConnectionError: (message: string) => ({ error: message, status: 500 }),
  NotFoundError: (message: string) => ({ error: message, status: 404 }),
  AuthorizationError: (message: string) => ({ error: message, status: 401 }),
}
