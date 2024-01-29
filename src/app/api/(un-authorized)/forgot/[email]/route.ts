import ConfirmationCode from '@/services/codeService'
import JWT from '@/services/jwtService'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {
  AuthorizationError,
  ErrorsHandler,
  NotFoundError,
  ValidationError,
} from '@/services/errorService'
import validations from '@/services/validationService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } },
) {
  try {
    const CodeService = new ConfirmationCode()

    // check if any account exist with that email
    const checkExist = await prisma.users.findFirst({
      where: { email, deleted: false },
    })

    if (!checkExist)
      throw new NotFoundError('No existe cuenta creada con ese correo')

    // validate email
    const checkEmail = validations.email.safeParse(email)
    if (!checkEmail.success)
      throw new ValidationError(checkEmail.error.errors[0].message)

    // send code to email
    CodeService.sendCode(checkEmail.data)

    // generate unAuthorized token with email and code and type forgot
    const tokenData = {
      email,
      code: CodeService.getCode(),
    }
    const token = jwt.generateUnAuthorizedToken('forgot', tokenData)

    // generate and send response
    const response = NextResponse.json(
      { message: 'Se ha enviado el código de verificación' },
      { status: 200 },
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 5,
      path: '/',
    })

    return response
  } catch (e) {
    const { error, status } = ErrorsHandler(e)
    return NextResponse.json({ error }, { status })
  }
}

export async function POST(req: NextRequest) {
  try {
    const CodeService = new ConfirmationCode()

    // get code and token
    const { code } = await req.json()
    const token = req.cookies.get('token')?.value

    // verify token and code
    if (!code) throw new ValidationError('No se ha enviado el código')
    if (!token) throw new ValidationError('No se ha enviado el token')

    // verify token and get values
    const decodeJWT = await jwt.verifyToken(token)

    // check if token is valid
    if (decodeJWT.type !== 'forgot')
      throw new AuthorizationError('Token invalido')
    if (CodeService.checkCode(decodeJWT.code))
      throw new AuthorizationError('El código es invalido')

    // generate authorized token with email and type forgot
    const tokenData = {
      type: 'forgot',
      email: decodeJWT.email,
    }
    const tokenVerified = jwt.generateAuthorizedToken(tokenData)

    // generate and send response
    const response = NextResponse.json(
      { message: 'Validación de coreo exitosa' },
      { status: 200 },
    )

    response.cookies.set('token', tokenVerified, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
      path: '/',
    })

    return response
  } catch (e) {
    const { error, status } = ErrorsHandler(e)
    return NextResponse.json({ error }, { status })
  }
}
