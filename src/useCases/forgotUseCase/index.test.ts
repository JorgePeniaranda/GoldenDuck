import { CheckEmail, CheckPasswords } from '.'

describe('Forgot Schemes', () => {
  it('must return true if the email is valid', async () => {
    expect(CheckEmail('test@gmail.com')).toBeTruthy()
  })
  it('must return false if the email is invalid', async () => {
    expect(CheckEmail('test')).toBeFalsy()
  })
  it('must return true if the passwords are different', async () => {
    expect(CheckPasswords('test', 'tset')).toBeFalsy()
    expect(CheckPasswords('testtest', 'testtest')).toBeTruthy()
  })
  it('must return false if passwords are less than 8 characters long', async () => {
    expect(CheckPasswords('test', 'test')).toBeFalsy()
  })
})
