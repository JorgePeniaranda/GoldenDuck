import bcrypt from 'bcryptjs'
import { randomAlphanumeric } from '@/utils'
import { validations } from '../validationService'
import { ErrorsHandler, ValidationError } from '../errorService'
import Email from '../emailService'

const EmailService = new Email()

export default class ConfirmationCode {
  private code: string

  constructor(length: number = 6) {
    this.code = randomAlphanumeric(length)
  }

  getCode() {
    return bcrypt.hashSync(this.code, 10)
  }

  sendCode(email: string) {
    try {
      let code = this.code

      const checkEmail = validations.email.safeParse(email)
      if (!checkEmail.success)
        throw new ValidationError(checkEmail.error.errors[0].message)

      if (process.env.NODE_ENV === 'development') {
        return console.log('Código enviado: ' + this.code)
      }

      return true
    } catch (e) {
      const { error } = ErrorsHandler(e)
      return console.error(error)
    }
  }

  checkCode(code: string, hash: string) {
    return bcrypt.compareSync(code, hash)
  }
}
