import { SignupForm } from '@/types'
import { CheckForm } from '.'

const validForm: SignupForm = {
  name: 'test',
  lastName: 'test',
  phoneNumber: '1234567890',
  dni: '12345678',
  birthDate: '01/01/2000',
  address: 'test',
  email: 'test@email.com',
  password: 'testtest',
  sex: 'male',
}

describe('Validate Register Form', () => {
  it('must return true if the form format is valid', () => {
    expect(CheckForm(validForm)).toBeTruthy()
  })
  it('must return false if the name has invalid characters', () => {
    expect(CheckForm({ ...validForm, name: '_t3st_' })).toBeFalsy()
  })
  it('must return false if the lastName has invalid characters', () => {
    expect(CheckForm({ ...validForm, lastName: '_t3st_' })).toBeFalsy()
  })
  it('must return false if the phoneNumber has invalid characters', () => {
    expect(CheckForm({ ...validForm, phoneNumber: '123456789a' })).toBeFalsy()
  })
  it('must return false if the phoneNumber has invalid long', () => {
    expect(CheckForm({ ...validForm, phoneNumber: '123456789' })).toBeFalsy()
  })
  it('must return false if the dni has invalid characters', () => {
    expect(CheckForm({ ...validForm, dni: '1234567a' })).toBeFalsy()
  })
  it('must return false if the dni has invalid long', () => {
    expect(CheckForm({ ...validForm, dni: '1234567' })).toBeFalsy()
  })
  it('must return false if the birthDate has invalid format', () => {
    expect(CheckForm({ ...validForm, birthDate: '01/01/2000a' })).toBeFalsy()
  })
  it('must return false if the address has invalid characters', () => {
    expect(CheckForm({ ...validForm, address: '_test_' })).toBeFalsy()
  })
  it('must return false if the email is invalid', () => {
    expect(CheckForm({ ...validForm, email: 'test' })).toBeFalsy()
  })
  it('must return false if the password has invalid long', () => {
    expect(CheckForm({ ...validForm, password: 'test' })).toBeFalsy()
  })
})
