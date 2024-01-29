import ConfirmationCode from '@/services/confirmationCodeService'
import JWT from '@/services/jwtService'
import { EmailSchema } from '@/useCases/forgotUseCase'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import {
  AuthorizationError,
  ErrorsHandler,
  NotFoundError,
  ValidationError,
} from '@/services/errorService'

const prisma = new PrismaClient()
const code = new ConfirmationCode()
const jwt = new JWT()

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } },
) {
  try {
    // check if any account exist with that email
    const checkExist = await prisma.users.findFirst({
      where: { email, deleted: false },
    })

    if (!checkExist)
      throw new NotFoundError('No existe cuenta creada con ese correo')

    // validate email
    const checkEmail = EmailSchema.safeParse({ email })

    if (!checkEmail.success)
      throw new ValidationError(checkEmail.error.errors[0].message)

    // send code to email
    code.sendCode(checkEmail.data.email)

    // encrypt code
    const hashedCode = bcrypt.hashSync(code.getCode(), 10)

    // generate unAuthorized token with email and code and type forgot
    const token = jwt.generateUnAuthorizedToken('forgot', email, hashedCode)

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
    // get code and token
    const { code } = await req.json()
    const token = req.cookies.get('token')?.value

    // verify token and code
    if (!code) throw new ValidationError('No se ha enviado el código')

    if (!token) throw new ValidationError('No se ha enviado el token')

    // verify token and get values
    const decodeJWT = await jwt.verifyToken(token)

    // check if token is valid
    if (typeof decodeJWT === 'string') throw new AuthorizationError(decodeJWT)

    // check if token is forgot type
    if (decodeJWT.type !== 'forgot')
      throw new AuthorizationError('Token invalido')

    // check if token is authorized
    if (!bcrypt.compareSync(code, decodeJWT.code))
      throw new AuthorizationError('El código es invalido')

    // generate authorized token with email and type forgot
    const tokenVerified = jwt.generateAuthorizedWithEmailToken(
      'forgot',
      decodeJWT.email,
    )

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
