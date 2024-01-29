import { CheckEmail, CheckPasswords } from '.'

describe('Validate Forgot Form', () => {
  it('must return true if the email is valid', () => {
    expect(CheckEmail('test@gmail.com')).toBeTruthy()
  })
  it('must return false if the email is invalid', () => {
    expect(CheckEmail('test')).toBeFalsy()
  })
  it('must return true if the passwords are different', () => {
    expect(CheckPasswords('test', 'tset')).toBeFalsy()
    expect(CheckPasswords('testtest', 'testtest')).toBeTruthy()
  })
  it('must return false if passwords are less than 8 characters long', () => {
    expect(CheckPasswords('test', 'test')).toBeFalsy()
  })
})
