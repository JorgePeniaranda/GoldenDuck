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
    const emailSchema = validations.email.safeParse({ email })
    if (!emailSchema.success) throw new ValidationError('Email is not valid')

    if (process.env.NODE_ENV === 'development') {
      return console.log('Código enviado: ' + this.code)
    }
  }

  checkCode(code: string) {
    return bcrypt.compareSync(this.code, code)
  }
}
