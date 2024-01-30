import JWT from '.'
import jwt from 'jsonwebtoken'
import { ConfigError } from '../errorService'

const jwtService = new JWT()

describe('JWT Service', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  it('should be a function', () => {
    expect(typeof JWT).toBe('function')
  })
  it('return error if JWT_SECRET is not defined', () => {
    if (process.env.JWT_SECRET) delete process.env.JWT_SECRET
    expect(() => {
      new JWT()
    }).toThrow(ConfigError)
  })
  it('generateAuthorizedToken must be a function', () => {
    expect(typeof jwtService.generateAuthorizedToken).toBe('function')
  })
  it('generateUnAuthorizedToken must be a function', () => {
    expect(typeof jwtService.generateUnAuthorizedToken).toBe('function')
  })
})

describe('generateAuthorizedToken', () => {
  it('should generate a valid token', () => {
    const token = jwtService.generateAuthorizedToken('test', 'test', {
      userID: 1,
    })
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    expect(decoded).toHaveProperty('authorized', true)
    expect(decoded).toHaveProperty('userID', 1)
  })
})

describe('generateUnAuthorizedToken', () => {
  it('should generate a valid token', () => {
    const token = jwtService.generateUnAuthorizedToken('test1', 'test2', {
      email: 'test@email.com',
      code: 'code',
    })
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    expect(decoded).toHaveProperty('iss', 'test1')
    expect(decoded).toHaveProperty('aud', 'test2')
    expect(decoded).toHaveProperty('authorized', false)
    expect(decoded).toHaveProperty('email', 'test@email.com')
    expect(decoded).toHaveProperty('code', 'code')
  })
})

describe('verify token', () => {
  it('should verify a valid token', () => {
    const token = jwtService.generateAuthorizedToken('test', 'test', {
      userID: 1,
    })
    const decoded = jwtService.verifyToken(token)
    expect(decoded).toHaveProperty('authorized', true)
    expect(decoded).toHaveProperty('userID', 1)
  })
  it('should throw an error if token is invalid', () => {
    expect(() => {
      jwtService.verifyToken('token')
    }).toThrow(jwt.JsonWebTokenError)
  })
})
