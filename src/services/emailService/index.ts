import { Resend } from 'resend'
import { ConfigError, EmailError } from '../errorService'
import TemplateCodeEmail from '@/components/templates/email/TemplateCodeEmail'
import { ErrorsDictionary } from '@/const/messages'

export default class Email {
  private readonly resend: Resend

  constructor () {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY === undefined) {
      throw new ConfigError(ErrorsDictionary.NoVariableEnv('RESEND_API_KEY'))
    }
    this.resend = new Resend(RESEND_API_KEY)
  }

  async sendCode (email: string, code: string): Promise<void> {
    await this.resend.emails
      .send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Código de verificación | Golden Duck',
        react: TemplateCodeEmail({
          code
        })
      })
      .catch(() => {
        throw new EmailError(ErrorsDictionary.NoEmail)
      })
  }
}
