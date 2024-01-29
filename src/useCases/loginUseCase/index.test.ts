import { LoginForm } from '@/types'
import { CheckForm } from '.'

const validForm: LoginForm = { email: 'test@gmail.com', password: '12345678' }

describe('Validate Login Form', () => {
  it('must return true if the email is valid', async () => {
    expect(CheckForm(validForm)).toBeTruthy()
  })
  it('must return false if the email is invalid', async () => {
    expect(CheckForm({ ...validForm, email: 'test' })).toBeFalsy()
  })
})
