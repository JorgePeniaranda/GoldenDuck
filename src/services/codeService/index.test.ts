import ConfirmationCode from '.'
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

  it('getCode must return string', () => {
    expect(typeof code.getCode()).toEqual('string')
  })

  it('sendCode must return error if email is invalid', () => {
    expect(code.sendCode('test')).toThrow(ValidationError)
  })

  // it('should generate a random alphanumeric code with 6 characters', () => {
  //   expect(code.getCode().length).toEqual(length)
  // })

  // it('should generate a random alphanumeric code', () => {
  //   expect(code.getCode()).toMatch(/[a-zA-Z0-9]{6}/)
  // })

  // it('should check if the code is incorrect', () => {
  //   expect(code.checkCode('ñ', code.getCode())).toBeTruthy()
  // })
})
