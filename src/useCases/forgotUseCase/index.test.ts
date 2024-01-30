import axios from 'axios'
import {
  CheckEmail,
  CheckPasswords,
  UpdatePassword,
  checkConfirmationCode,
  generateConfirmationCode,
} from '.'

jest.mock('axios')

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

describe('generateConfirmationCode', () => {
  it('must be a function', () => {
    expect(typeof generateConfirmationCode).toBe('function')
  })
  it('should return a status code', async () => {
    const mockResponse = {
      status: 200,
    }
    axios.get = jest.fn().mockResolvedValue(mockResponse)
    const response = await generateConfirmationCode('')
    expect(response).toEqual(mockResponse.status)
  })
})

describe('checkConfirmationCode', () => {
  it('must be a function', () => {
    expect(typeof checkConfirmationCode).toBe('function')
  })
  it('checkConfirmationCode should return a status code', async () => {
    const mockResponse = {
      status: 200,
    }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const response = await checkConfirmationCode('2', '2')
    expect(response).toEqual(mockResponse.status)
  })
})

describe('UpdatePassword', () => {
  it('must be a function', () => {
    expect(typeof UpdatePassword).toBe('function')
  })
  it('UpdatePassword should return a status code', async () => {
    const mockResponse = {
      status: 200,
      data: {
        message: 'test',
      },
    }
    const form = {
      email: 'test',
      password: 'test',
      confirmPassword: 'test',
    }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const response = await UpdatePassword(form)
    expect(response).toEqual(mockResponse.status)
  })
})
