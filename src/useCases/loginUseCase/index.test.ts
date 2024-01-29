import { LoginForm } from '@/types'
import { CheckForm } from '.'

const validForm: LoginForm = { email: 'test@gmail.com', password: '12345678' }

describe('Validate Login Form', () => {
  it('must return true if the email is valid', () => {
    expect(CheckForm(validForm)).toBeTruthy()
  })
  it('must return false if the email is invalid', () => {
    expect(CheckForm({ ...validForm, email: 'test' })).toBeFalsy()
  })
})