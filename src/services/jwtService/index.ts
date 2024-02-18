import jwt from 'jsonwebtoken'
import { AuthorizationError, ConfigError } from '../errorService'

export default class JWT {
  private readonly secretKey: string

  constructor () {
    const JWT_SECRET = process.env.JWT_SECRET
    if (JWT_SECRET === undefined) {
      throw new ConfigError(
        'La variable de entorno JWT_SECRET no está configurada'
      )
    }
    this.secretKey = JWT_SECRET
  }

  public verifyToken = (token: string) => {
    const decoded = jwt.verify(token, this.secretKey)
    if (typeof decoded === 'string') throw new AuthorizationError(decoded)
    return decoded
  }

  public generateAuthorizedToken = (
    issuer: string,
    audience: string,
    { ...data }
  ): string => {
    const token = jwt.sign({ authorized: true, ...data }, this.secretKey, {
      expiresIn: '30m',
      audience,
      issuer
    })

    return token
  }

  public generateUnAuthorizedToken = (
    issuer: string,
    audience: string,
    { ...data }
  ): string => {
    const token = jwt.sign({ authorized: false, ...data }, this.secretKey, {
      expiresIn: '5m',
      issuer,
      audience
    })

    return token
  }
}
