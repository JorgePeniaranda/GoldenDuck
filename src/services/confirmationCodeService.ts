import { randomAlphanumeric } from '@/utils'

export default class ConfirmationCode {
  private code: string = randomAlphanumeric(6)

  private regenerateCode() {
    this.code = randomAlphanumeric(6)
  }

  sendCode() {
    this.regenerateCode()
    return console.log('Código enviado: ' + this.code)
  }

  checkCode(code: string) {
    return code === this.code
  }
}
