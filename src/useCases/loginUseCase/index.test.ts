import { LoginForm } from '@/types'
import { CheckForm, login } from '.'
import axios from 'axios'

const validForm: LoginForm = { email: 'test@gmail.com', password: '12345678' }

describe('Validate Login Form', () => {
  it('must return true if the email is valid', () => {
    expect(CheckForm(validForm)).toBeTruthy()
  })
  it('must return false if the email is invalid', () => {
    expect(CheckForm({ ...validForm, email: 'test' })).toBeFalsy()
  })
})

describe('login', () => {
  it('must be a function', () => {
    expect(typeof login).toBe('function')
  })
  it('UpdatePassword should return a status code', async () => {
    const mockResponse = {
      status: 200,
      data: {
        message: 'test',
      },
    }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const response = await login(validForm)
    expect(response).toEqual(mockResponse.status)
  })
})
