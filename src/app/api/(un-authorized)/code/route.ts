import ConfirmationCode from '@/services/codeService'
import {
  AuthorizationError,
  GenerateErrorResponse
} from '@/services/errorService'
import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse } from 'next/server'

const CodeService = new ConfirmationCode()
const jwt = new JWT()

export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    const { code: userCode } = await req.json()
    const userToken = req.cookies.get('token')?.value

    // validate request
    if (userCode === undefined) {
      throw new AuthorizationError('No se ha enviado el código')
    }
    if (userToken === undefined) {
      throw new AuthorizationError('No se ha enviado el token')
    }

    // verify token and code
    const { email, code } = jwt.verifyTempToken(userToken)
    if (!CodeService.checkCode(String(userCode), String(code))) {
      throw new AuthorizationError('El código es invalido')
    }

    // generate token with email
    const token = jwt.generateToken({ email })

    // generate and send response
    const response = NextResponse.json(
      { message: 'Se ha enviado el código de verificación' },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 5,
      path: '/'
    })

    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
