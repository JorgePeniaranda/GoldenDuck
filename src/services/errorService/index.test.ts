import { createErrorFactory } from '.'

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
