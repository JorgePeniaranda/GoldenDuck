import ConfirmationCode from '@/services/confirmationCodeService'
import JWT from '@/services/jwtService'
import { EmailSchema } from '@/useCases/forgotUseCase'
import { NextResponse } from 'next/server'

const code = new ConfirmationCode()
const jwt = new JWT()

export async function GET(
  req: Request,
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

  // generate unAuthorized token with email and code and type register
  const token = jwt.generateUnAuthorizedToken('register', email, code.getCode())

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

  // check if token is register type
  if (decodeJWT.type !== 'register') {
    return NextResponse.json({ error: 'El token es invalido' }, { status: 401 })
  }

  // check if token is authorized
  if (decodeJWT.code !== code) {
    return NextResponse.json({ error: 'Código incorrecto' }, { status: 401 })
  }

  // generate authorized token with email and type register
  const tokenVerified = jwt.generateAuthorizedWithEmailToken(
    'register',
    decodeJWT.email,
  )

  return NextResponse.json({ token: tokenVerified }, { status: 200 })
}
