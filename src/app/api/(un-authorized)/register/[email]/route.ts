import ConfirmationCode from '@/services/confirmationCodeService'
import JWT from '@/services/jwtService'
import { EmailSchema } from '@/useCases/forgotUseCase'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from '@/services/errorService'

const code = new ConfirmationCode()
const jwt = new JWT()

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } },
) {
  try {
    // validate email
    const checkEmail = EmailSchema.safeParse({ email })

    if (!checkEmail.success)
      throw new ValidationError(checkEmail.error.errors[0].message)

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
  } catch (e) {
    if (e instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        { error: 'No se ha podido conectar a la base de datos' },
        { status: 500 },
      )
    }
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    if (e instanceof ConflictError) {
      return NextResponse.json({ error: e.message }, { status: 409 })
    }
    if (e instanceof AuthorizationError) {
      return NextResponse.json({ error: e.message }, { status: 401 })
    }
    if (e instanceof NotFoundError) {
      return NextResponse.json({ error: e.message }, { status: 404 })
    }
    return NextResponse.json({ error: 'Ha ocurrido un error' }, { status: 500 })
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

    // check if token is register type
    if (decodeJWT.type !== 'register')
      throw new AuthorizationError('Token invalido')

    // check if token is authorized
    if (!bcrypt.compareSync(code, decodeJWT.code))
      throw new AuthorizationError('Código invalido')

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
  } catch (e) {
    if (e instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        { error: 'No se ha podido conectar a la base de datos' },
        { status: 500 },
      )
    }
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    if (e instanceof ConflictError) {
      return NextResponse.json({ error: e.message }, { status: 409 })
    }
    if (e instanceof AuthorizationError) {
      return NextResponse.json({ error: e.message }, { status: 401 })
    }
    if (e instanceof NotFoundError) {
      return NextResponse.json({ error: e.message }, { status: 404 })
    }
    return NextResponse.json({ error: 'Ha ocurrido un error' }, { status: 500 })
  }
}
