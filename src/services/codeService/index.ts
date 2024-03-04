import bcrypt from 'bcryptjs'
import { randomAlphanumeric } from '@/utils'
import { validations } from '../validationService'
import { EmailError, ErrorsHandler, ValidationError } from '../errorService'
import Email from '../emailService'

const EmailService = new Email()

export default class ConfirmationCode {
  private readonly code: string

  constructor (length: number = 6) {
    this.code = randomAlphanumeric(length)
  }

  getCode (): string {
    return bcrypt.hashSync(this.code, 10)
  }

  sendCode (email: string): void {
    try {
      const checkEmail = validations.email.safeParse(email)
      if (!checkEmail.success) {
        throw new ValidationError(checkEmail.error.errors[0].message)
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Código enviado: ' + this.code)
      }

      EmailService.sendCode(email, this.code).catch((e) => {
        const { message } = ErrorsHandler(e)
        throw new EmailError(message)
      })
    } catch (e) {
      const { message } = ErrorsHandler(e)
      console.error('CodeService Error: ' + message)
    }
  }

  checkCode (code: string, hash: string): boolean {
    return bcrypt.compareSync(code, hash)
  }
}
