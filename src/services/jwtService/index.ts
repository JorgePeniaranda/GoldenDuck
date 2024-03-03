import jwt from 'jsonwebtoken'
import { AuthorizationError, ConfigError } from '../errorService'
import { ErrorsDictionary } from '@/const/messages'

export default class JWT {
  private readonly secretKey: string
  private readonly tempSecretKey: string

  constructor () {
    const JWT_SECRET = process.env.JWT_SECRET
    const JWT_TEMP_SECRET = process.env.JWT_TEMP_SECRET

    if (JWT_SECRET === undefined || JWT_TEMP_SECRET === undefined) {
      throw new ConfigError(ErrorsDictionary.NoVariableEnv('JWT_SECRET'))
    }

    this.secretKey = JWT_SECRET
    this.tempSecretKey = JWT_TEMP_SECRET
  }

  public generateToken = ({ ...data }): string => {
    return jwt.sign({ ...data }, this.secretKey, {
      expiresIn: '30m'
    })
  }

  public verifyToken = (token: string): jwt.JwtPayload => {
    const decoded = jwt.verify(token, this.secretKey)
    if (typeof decoded === 'string') throw new AuthorizationError(decoded)
    return decoded
  }

  public generateTempToken = ({ ...data }): string => {
    return jwt.sign({ ...data }, this.tempSecretKey, {
      expiresIn: '5m'
    })
  }

  public verifyTempToken = (token: string): jwt.JwtPayload => {
    const decoded = jwt.verify(token, this.tempSecretKey)
    if (typeof decoded === 'string') throw new AuthorizationError(decoded)
    return decoded
  }
}
