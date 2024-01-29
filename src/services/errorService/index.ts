export const createErrorFactory = function (name: string) {
  return class CustomizedError extends Error {
    constructor(message: string) {
      super(message)
      this.name = name
    }
  }
}

export const AuthorizationError = createErrorFactory('AuthorizationError')
export const ConnectionError = createErrorFactory('ConnectionError')
