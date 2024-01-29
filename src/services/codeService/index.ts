import bcrypt from 'bcryptjs'
import { randomAlphanumeric } from '@/utils'
import { validations } from '../validationService'
import { ValidationError } from '../errorService'

export default class ConfirmationCode {
  private code: string

  constructor(length: number = 6) {
    this.code = randomAlphanumeric(length)
  }

  getCode() {
    return bcrypt.hashSync(this.code, 10)
  }

  sendCode(email: string) {
    const checkEmail = validations.email.safeParse(email)
    if (!checkEmail.success)
      throw new ValidationError(checkEmail.error.errors[0].message)

    if (process.env.NODE_ENV === 'development') {
      return console.log('Código enviado: ' + this.code)
    }
  }

  checkCode(code: string, hash: string) {
    return bcrypt.compareSync(code, hash)
  }
}
