import JWT from '@/services/jwtService'

const jwt = new JWT()

export const CheckToken = async (req: Request) => {
  const token = await req.headers.get('token')

  if (!token) {
    return {
      error: 'No se ha enviado un token',
      status: 400,
    }
  }

  const decodedToken = jwt.verifyToken(token)

  if (!decodedToken) {
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
