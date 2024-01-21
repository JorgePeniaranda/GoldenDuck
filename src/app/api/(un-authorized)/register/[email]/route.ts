import ConfirmationCode from '@/services/confirmationCodeService'
import JWT from '@/services/jwtService'
import { EmailSchema } from '@/useCases/forgotUseCase'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const code = new ConfirmationCode()
const jwt = new JWT()

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } },
) {
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

  // get email and send code
  code.sendCode(email)

  // encrypt code
  const hashedCode = bcrypt.hashSync(code.getCode(), 10)

  // generate unAuthorized token with email and code and type register
  const token = jwt.generateUnAuthorizedToken('register', email, hashedCode)

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

  // check if token is register type
  if (decodeJWT.type !== 'register') {
    return NextResponse.json({ error: 'El token es invalido' }, { status: 401 })
  }

  // check if token is authorized
  if (!bcrypt.compareSync(code, decodeJWT.code)) {
    return NextResponse.json({ error: 'Código incorrecto' }, { status: 401 })
  }

  // generate authorized token with email and type register
  const tokenVerified = jwt.generateAuthorizedWithEmailToken(
    'register',
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
