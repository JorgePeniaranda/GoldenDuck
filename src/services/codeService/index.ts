import bcrypt from 'bcryptjs'
import { randomAlphanumeric } from '@/utils'
import { validations } from '../validationService'
import { ErrorsHandler, ValidationError } from '../errorService'
import Email from '../emailService'

const EmailService = new Email()

export default class ConfirmationCode {
  private readonly code: string

  constructor (length: number = 6) {
    this.code = randomAlphanumeric(length)
  }

  getCode () {
    return bcrypt.hashSync(this.code, 10)
  }

  sendCode (email: string) {
    try {
      const code = this.code

      const checkEmail = validations.email.safeParse(email)
      if (!checkEmail.success) { throw new ValidationError(checkEmail.error.errors[0].message) }

      if (process.env.NODE_ENV === 'development') {
        console.log('Código enviado: ' + this.code); return
      }

      return true
    } catch (e) {
      const { error } = ErrorsHandler(e)
      console.error(error)
    }
  }

  checkCode (code: string, hash: string) {
    return bcrypt.compareSync(code, hash)
  }
}
