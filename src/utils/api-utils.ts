import JWT from '@/services/jwtService'

const jwt = new JWT()

export const CheckAuthorizedToken = async (req: Request) => {
  const token = await req.headers.get('token')

  if (!token) {
    return {
      error: 'No se ha enviado un token',
      status: 400,
    }
  }

  const decodedToken = jwt.verifyToken(token)

  if (!decodedToken || typeof decodedToken === 'string') {
    return {
      error: 'El token no es valido o ha expirado',
      status: 401,
    }
  }

  return {
    success: true,
    userId: decodedToken.userId,
  }
}

export async function CheckUnAuthorizedToken(req: Request) {
  const { code, token } = await req.json()

  if (!code) {
    return {
      error: 'No se ha enviado el código.',
      status: 400,
    }
  }

  if (!token) {
    return {
      error: 'No se ha enviado el token.',
      status: 400,
    }
  }

  const decodedToken = await jwt.verifyToken(token)

  if (!decodedToken || typeof decodedToken === 'string') {
    return {
      error: 'El token no es valido o ha expirado',
      status: 401,
    }
  }

  if (decodedToken.code !== code) {
    return {
      error: 'Código incorrecto',
      status: 401,
    }
  }

  return {
    success: true,
    email: decodedToken.email,
  }
}
