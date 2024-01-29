import jwt from 'jsonwebtoken'
import { AuthorizationError, ConfigError } from '../errorService'

export default class JWT {
  private secretKey: string

  constructor() {
    let JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET)
      throw new ConfigError(
        'La variable de entorno JWT_SECRET no está configurada',
      )
    this.secretKey = JWT_SECRET
  }

  public verifyToken = (token: string) => {
    const decoded = jwt.verify(token, this.secretKey)
    if (typeof decoded === 'string') throw new AuthorizationError(decoded)
    return decoded
  }

  public generateAuthorizedToken = (userID: number): string => {
    const token = jwt.sign({ authorized: true, userID }, this.secretKey, {
      expiresIn: '30m',
    })

    return token
  }

  public generateAuthorizedWithEmailToken = (
    type: string,
    email: string,
  ): string => {
    const token = jwt.sign({ type, authorized: true, email }, this.secretKey, {
      expiresIn: '15m',
    })

    return token
  }

  public generateUnAuthorizedToken = (
    type: string,
    email: string,
    code: string,
  ): string => {
    const token = jwt.sign(
      { type, authorized: false, code, email },
      this.secretKey,
      {
        expiresIn: '5m',
      },
    )

    return token
  }
}
