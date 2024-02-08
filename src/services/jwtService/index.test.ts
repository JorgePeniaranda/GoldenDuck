import JWT from '.'
import jwt from 'jsonwebtoken'

const jwtService = new JWT()

describe('JWT Service', () => {
  it('JWT should be a function', () => {
    expect(typeof JWT).toBe('function')
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
    const token = jwtService.generateUnAuthorizedToken('test', 'test', {
      email: 'test@email.com',
      code: 'code',
    })
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    expect(decoded).toHaveProperty('authorized', false)
    expect(decoded).toHaveProperty('email', 'test@email.com')
    expect(decoded).toHaveProperty('code', 'code')
  })
})
