import JWT from './jwtService'
import jwt from 'jsonwebtoken'

const jwtService = new JWT()

describe('JWT Service', () => {
  it('JWT should be a function', () => {
    expect(typeof JWT).toBe('function')
  })
  it('generateAuthorizedToken must be a function', () => {
    expect(typeof jwtService.generateAuthorizedToken).toBe('function')
  })
  it('generateAuthorizedWithEmailToken must be a function', () => {
    expect(typeof jwtService.generateAuthorizedWithEmailToken).toBe('function')
  })
  it('generateUnAuthorizedToken must be a function', () => {
    expect(typeof jwtService.generateUnAuthorizedToken).toBe('function')
  })
})

describe('generateAuthorizedToken', () => {
  it('should generate a valid token', () => {
    const token = jwtService.generateAuthorizedToken(1)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    expect(decoded).toHaveProperty('authorized', true)
    expect(decoded).toHaveProperty('userID', 1)
  })
})

describe('generateAuthorizedWithEmailToken', () => {
  it('should generate a valid token', () => {
    const token = jwtService.generateAuthorizedWithEmailToken(
      'type',
      'test@email.com',
    )
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    expect(decoded).toHaveProperty('type', 'type')
    expect(decoded).toHaveProperty('authorized', true)
    expect(decoded).toHaveProperty('email', 'test@email.com')
  })
})

describe('generateUnAuthorizedToken', () => {
  it('should generate a valid token', () => {
    const token = jwtService.generateUnAuthorizedToken(
      'type',
      'test@email.com',
      'code',
    )
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    expect(decoded).toHaveProperty('type', 'type')
    expect(decoded).toHaveProperty('authorized', false)
    expect(decoded).toHaveProperty('email', 'test@email.com')
    expect(decoded).toHaveProperty('code', 'code')
  })
})
