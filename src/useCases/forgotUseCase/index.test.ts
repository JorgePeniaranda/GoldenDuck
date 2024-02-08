import axios from 'axios'
import {
  UpdatePassword,
  checkConfirmationCode,
  generateConfirmationCode,
} from '.'
import { ForgotForm } from '@/types'

jest.mock('axios')

const validForm: ForgotForm = {
  email: 'test',
  password: 'testtest',
  confirmPassword: 'testtest',
}

describe('generateConfirmationCode', () => {
  it('must be a function', () => {
    expect(typeof generateConfirmationCode).toBe('function')
  })

  it('should return a response', async () => {
    const mockResponse = {
      response: {
        status: 200,
        data: {
          error: 'test',
        },
      },
    }
    axios.get = jest.fn().mockResolvedValue(mockResponse)
    const response = await generateConfirmationCode('')
    expect(response).toEqual(mockResponse)
  })
})

describe('checkConfirmationCode', () => {
  it('must be a function', () => {
    expect(typeof checkConfirmationCode).toBe('function')
  })

  it('should return a response', async () => {
    const mockResponse = {
      response: {
        status: 200,
        data: {
          error: 'test',
        },
      },
    }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const response = await checkConfirmationCode('2', '2')
    expect(response).toEqual(mockResponse)
  })
})

describe('UpdatePassword', () => {
  it('must be a function', () => {
    expect(typeof UpdatePassword).toBe('function')
  })

  it('should return a response', async () => {
    const mockResponse = {
      response: {
        status: 200,
        data: {
          error: 'test',
        },
      },
    }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const response = await UpdatePassword(validForm)
    expect(response).toEqual(mockResponse)
  })
})
