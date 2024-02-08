import bcrypt from 'bcryptjs'
import { randomAlphanumeric } from '@/utils'
import { validations } from '../validationService'
import { EmailError, ErrorsHandler, ValidationError } from '../errorService'
import { Resend } from 'resend'
import TemplateCodeEmail from '@/components/templates/email/TemplateCodeEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export default class ConfirmationCode {
  private code: string

  constructor(length: number = 6) {
    this.code = randomAlphanumeric(length)
  }

  getCode() {
    return bcrypt.hashSync(this.code, 10)
  }

  sendCode(email: string) {
    let code = this.code

    const checkEmail = validations.email.safeParse(email)
    if (!checkEmail.success)
      throw new ValidationError(checkEmail.error.errors[0].message)

    // if (process.env.NODE_ENV === 'development') {
    //   return console.log('Código enviado: ' + this.code)
    // }

    return (async function () {
      try {
        await resend.emails
          .send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['peniarandajorge@gmail.com'],
            subject: 'Código de verificación | Golden Duck',
            react: TemplateCodeEmail({
              code,
            }),
          })
          .catch(() => {
            throw new EmailError('No se ha podido enviar el mail')
          })
      } catch (e) {
        const { error } = ErrorsHandler(e)
        return console.error(error)
      }
    })()
  }

  checkCode(code: string, hash: string) {
    return bcrypt.compareSync(code, hash)
  }
}
