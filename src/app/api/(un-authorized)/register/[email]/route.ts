import ConfirmationCode from '@/services/codeService'
import JWT from '@/services/jwtService'
import { NextRequest, NextResponse } from 'next/server'
import {
  AuthorizationError,
  ConflictError,
  ErrorsHandler,
  ValidationError,
} from '@/services/errorService'
import { PrismaClient } from '@prisma/client'
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

    if (checkExist)
      throw new ConflictError('Ya existe cuenta creada con esos datos')

    // validate email
    const checkEmail = validations.email.safeParse(email)
    if (!checkEmail.success)
      throw new ValidationError(checkEmail.error.errors[0].message)

    // send code
    CodeService.sendCode(email)

    // generate unAuthorized token with email and code and type register
    const tokenData = {
      email,
      code: CodeService.getCode(),
    }
    const token = jwt.generateUnAuthorizedToken('register', tokenData)

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

    // validate request
    if (!code) throw new ValidationError('No se ha enviado el código')
    if (!token) throw new ValidationError('No se ha enviado el token')

    // verify token and get values
    const decodeJWT = await jwt.verifyToken(token)

    // check if token is valid
    if (decodeJWT.type !== 'register')
      throw new AuthorizationError('Token invalido')
    if (!CodeService.checkCode(code, decodeJWT.code))
      throw new AuthorizationError('Código invalido')

    // generate authorized token with email and type register
    const tokenData = {
      type: 'register',
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
