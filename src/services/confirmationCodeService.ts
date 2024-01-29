import { randomAlphanumeric } from '@/utils'

export default class ConfirmationCode {
  private code: string

  constructor(private length: number = 6) {
    this.code = randomAlphanumeric(length)
  }

  getCode() {
    return this.code
  }

  sendCode(email: string) {
    return console.log('Código enviado: ' + this.code)
  }

  checkCode(code: string) {
    return code === this.code
  }
}
