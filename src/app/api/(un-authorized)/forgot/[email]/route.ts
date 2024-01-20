import ConfirmationCode from '@/services/confirmationCodeService'
import JWT from '@/services/jwtService'
import { EmailSchema } from '@/useCases/forgotUseCase'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
const code = new ConfirmationCode()
const jwt = new JWT()

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } },
) {
  // check if any account exist with that email
  const checkExist = await prisma.users.findFirst({
    where: { email, deleted: false },
  })

  if (!checkExist) {
    return NextResponse.json(
      { error: 'No exite cuenta creada con ese correo' },
      { status: 404 },
    )
  }

  // validate email
  const checkEmail = EmailSchema.safeParse({ email })

  if (!checkEmail.success) {
    return NextResponse.json(
      { response: checkEmail.error.errors[0].message },
      {
        status: 400,
      },
    )
  }

  // send code to email
  code.sendCode(checkEmail.data.email)

  // generate unAuthorized token with email and code and type forgot
  const token = jwt.generateUnAuthorizedToken('forgot', email, code.getCode())

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
}

export async function POST(req: NextRequest) {
  // get code and token
  const { code } = await req.json()
  const token = req.cookies.get('token')?.value

  // verify token and code
  if (!code) {
    return NextResponse.json(
      { error: 'No se ha enviado el código.' },
      { status: 400 },
    )
  }

  if (!token) {
    return NextResponse.json(
      { error: 'No se ha enviado el token.' },
      { status: 400 },
    )
  }

  // verify token and get values
  const decodeJWT = await jwt.verifyToken(token)

  // check if token is valid
  if (typeof decodeJWT === 'string') {
    return NextResponse.json({ error: decodeJWT }, { status: 401 })
  }

  // check if token is forgot type
  if (decodeJWT.type !== 'forgot') {
    return NextResponse.json({ error: 'El token es invalido' }, { status: 401 })
  }

  // check if token is authorized
  if (decodeJWT.code !== code) {
    return NextResponse.json({ error: 'Código incorrecto' }, { status: 401 })
  }

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
}
