import { Resend } from 'resend'
import { ConfigError, EmailError } from '../errorService'
import TemplateCodeEmail from '@/components/templates/email/TemplateCodeEmail'

export default class Email {
  private resend: Resend

  constructor() {
    let RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY)
      throw new ConfigError(
        'La variable de entorno RESEND_API_KEY no está configurada',
      )
    this.resend = new Resend(RESEND_API_KEY)
  }

  async sendCode(email: string, code: string) {
    return await this.resend.emails
      .send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Código de verificación | Golden Duck',
        react: TemplateCodeEmail({
          code,
        }),
      })
      .catch(() => {
        throw new EmailError('No se ha podido enviar el mail')
      })
  }
}
