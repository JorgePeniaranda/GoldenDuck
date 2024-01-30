import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import {
  createErrorFactory,
  ErrorsHandler,
  AuthorizationError,
  ConfigError,
  ConflictError,
  NotFoundError,
  ValidationError,
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

describe('Errors Handler', () => {
  it('should be a function', () => {
    expect(typeof ErrorsHandler).toBe('function')
  })

  it('should return an object', () => {
    const error = ErrorsHandler(new Error('error'))
    expect(typeof error).toBe('object')
  })

  it('should handle PrismaClientInitializationError', () => {
    const error = new PrismaClientInitializationError('Prisma error', 'test')
    const result = ErrorsHandler(error)
    expect(result).toEqual({
      error: 'No se ha podido conectar a la base de datos',
      status: 500,
    })
  })

  it('should handle AuthorizationError', () => {
    const error = new AuthorizationError('Authorization error')
    const result = ErrorsHandler(error)
    expect(result).toEqual({
      error: 'Authorization error',
      status: 401,
    })
  })

  it('should handle ConfigError', () => {
    const error = new ConfigError('Config error')
    const result = ErrorsHandler(error)
    expect(result).toEqual({
      error: 'Config error',
      status: 500,
    })
  })

  it('should handle ConflictError', () => {
    const error = new ConflictError('Conflict error')
    const result = ErrorsHandler(error)
    expect(result).toEqual({
      error: 'Conflict error',
      status: 409,
    })
  })

  it('should handle NotFoundError', () => {
    const error = new NotFoundError('Not found error')
    const result = ErrorsHandler(error)
    expect(result).toEqual({
      error: 'Not found error',
      status: 404,
    })
  })

  it('should handle ValidationError', () => {
    const error = new ValidationError('Validation error')
    const result = ErrorsHandler(error)
    expect(result).toEqual({
      error: 'Validation error',
      status: 400,
    })
  })
})
