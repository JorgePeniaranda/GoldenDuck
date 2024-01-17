import jwt from 'jsonwebtoken'

export default class JWT {
  private secretKey: string

  constructor() {
    let JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      console.error(
        'ERROR: La variable de entorno JWT_SECRET no está configurada.',
      )

      process.exit(1) // Termina la aplicación con un código de salida no exitoso
    }

    this.secretKey = JWT_SECRET
  }

  public verifyToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, this.secretKey)

      return decoded
    } catch (error) {
      console.error('Error al verificar el token:', error)

      return null
    }
  }

  public generateToken = (userId: number): string => {
    const token = jwt.sign({ userId }, this.secretKey, { expiresIn: '15m' })

    return token
  }
}
