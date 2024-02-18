import { validations, validateSchema } from '.'
import { z } from 'zod'
import { ValidationError } from '../errorService'

describe('Validation Service', () => {
  it('should be a object', () => {
    expect(typeof validations).toBe('object')
  })

  it('should be a function', () => {
    expect(typeof validateSchema).toBe('function')
  })

  it('should return an object', () => {
    const schema = z.object({ email: validations.email })
    const result = validateSchema(schema, { email: 'test@email.com' })
    expect(typeof result).toBe('object')
  })

  it('should return an validationError if email is invalid', () => {
    const schema = z.object({ email: validations.email })
    expect(() => {
      validateSchema(schema, { email: 'test' })
    }).toThrow(ValidationError as Error)
  })
})
