import {
  AuthorizationError,
  ConfigError,
  ConflictError,
  ErrorsHandler,
  NotFoundError,
  ValidationError,
  createErrorFactory,
} from '.'

describe('Create Error Factory', () => {
  it('should be a function', () => {
    expect(typeof createErrorFactory).toBe('function')
  })
  it('should return a class', () => {
    const CustomizedError = createErrorFactory('CustomizedError')
    expect(typeof CustomizedError).toBe('function')
  })
  it('should return a class with the name passed', () => {
    const CustomizedError = createErrorFactory('CustomizedError')
    expect(CustomizedError.name).toBe('CustomizedError')
  })
  it('should return a class with the message passed', () => {
    const CustomizedError = createErrorFactory('CustomizedError')
    const error = new CustomizedError('message')
    expect(error.message).toBe('message')
  })
})

describe('Errors handler', () => {
  it('should be a function', () => {
    expect(typeof ErrorsHandler).toBe('function')
  })
  it('should return a object with message and status code', () => {
    const error = createErrorFactory('test')
    const handler = ErrorsHandler(new error('test'))
    expect(handler).toHaveProperty('error')
    expect(handler).toHaveProperty('status')
  })
  it('should return a message if the error is in the list', () => {
    const errors = [
      ConfigError,
      ValidationError,
      NotFoundError,
      AuthorizationError,
      ConflictError,
    ]

    errors.forEach((error) => {
      const handler = ErrorsHandler(new error('test'))
      expect(handler).toHaveProperty('error', 'test')
    })
  })
  it('should return a object with default message and status code if error is with server', () => {
    const error = createErrorFactory('PrismaClientInitializationError')
    const handler = ErrorsHandler(new error('test'))
    expect(handler).toHaveProperty(
      'error',
      'No se ha podido conectar a la base de datos',
    )
    expect(handler).toHaveProperty('status', 500)
  })
  it('should return a object with default message and status code if error is unknown', () => {
    const error = createErrorFactory('test')
    const handler = ErrorsHandler(new error('test'))
    expect(handler).toHaveProperty('error', 'Ha ocurrido un error')
    expect(handler).toHaveProperty('status', 500)
  })
})
