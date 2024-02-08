import ConfirmationCode from '.'
import bcrypt from 'bcryptjs'
import { ValidationError } from '../errorService'

const length = 6
const code = new ConfirmationCode(length)

describe('Confirmation Code', () => {
  it('should be a class', () => {
    expect(typeof ConfirmationCode).toEqual('function')
  })

  it('should be a class with a constructor', () => {
    expect(code).toBeInstanceOf(ConfirmationCode)
  })

  it('should have a getCode method', () => {
    expect(typeof code.getCode).toEqual('function')
  })

  it('should have a sendCode method', () => {
    expect(typeof code.sendCode).toEqual('function')
  })

  it('should have a checkCode method', () => {
    expect(typeof code.checkCode).toEqual('function')
  })

  it('should generate a string with hashed code', () => {
    expect(typeof code.getCode()).toBe('string')
  })

  it('should check if the code is valid', () => {
    expect(code.checkCode('test', bcrypt.hashSync('test'))).toBeTruthy()
  })

  it('should return a validation error if email is invalid', () => {
    expect(() => {
      code.sendCode('test')
    }).toThrow(ValidationError)
  })

  it('should return a validation error', () => {
    expect(code.sendCode('test@email.com')).toBeTruthy()
  })
})
