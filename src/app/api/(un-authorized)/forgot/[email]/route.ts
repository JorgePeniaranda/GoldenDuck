import ConfirmationCode from '@/services/confirmationCodeService'
import JWT from '@/services/jwtService'
import { EmailSchema } from '@/useCases/forgotUseCase'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
const code = new ConfirmationCode()
const jwt = new JWT()

export async function GET(
  req: Request,
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

  return NextResponse.json({ token }, { status: 200 })
}

export async function POST(req: Request) {
  // get code and token
  const { code, token } = await req.json()

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

  return NextResponse.json({ token: tokenVerified }, { status: 200 })
}
