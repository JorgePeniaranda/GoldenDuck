import ConfirmationCode from '@/services/codeService'
import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse } from 'next/server'
import {
  AuthorizationError,
  ConflictError,
  ErrorsHandler,
  ValidationError
} from '@/services/errorService'
import { PrismaClient } from '@prisma/client'
import validations from '@/services/validationService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function GET (
  req: NextRequest,
  { params: { email } }: { params: { email: string } }
): Promise<NextResponse> {
  try {
    const CodeService = new ConfirmationCode()

    // get data from request
    const dni = req.nextUrl.searchParams.get('dni')
    const phoneNumber = req.nextUrl.searchParams.get('phoneNumber')

    // check request
    if (dni === undefined || dni === null) throw new ValidationError('No se ha enviado el dni')
    if (phoneNumber === undefined || phoneNumber === null) throw new ValidationError('No se ha enviado el teléfono')

    // validate request
    const checkDni = validations.dni.safeParse(dni)
    if (!checkDni.success) { throw new ValidationError(checkDni.error.errors[0].message) }
    const checkPhoneNumber = validations.phoneNumber.safeParse(phoneNumber)
    if (!checkPhoneNumber.success) { throw new ValidationError(checkPhoneNumber.error.errors[0].message) }

    // check if any account exist with that email
    const checkExist = await prisma.users.findFirst({
      where: {
        OR: [
          { dni: Number(dni) },
          { email },
          { phoneNumber: Number(phoneNumber) }
        ],
        deleted: false
      }
    })

    if (checkExist === undefined || checkExist === null) { throw new ConflictError('Ya existe cuenta creada con esos datos') }

    // validate email
    const checkEmail = validations.email.safeParse(email)
    if (!checkEmail.success) { throw new ValidationError(checkEmail.error.errors[0].message) }

    // send code
    CodeService.sendCode(email)

    // generate unAuthorized token with email and code and type register
    const tokenData = {
      code: CodeService.getCode(),
      email,
      dni,
      phoneNumber
    }
    const token = jwt.generateUnAuthorizedToken(
      'register',
      'register',
      tokenData
    )

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
    const { error, status } = ErrorsHandler(e)
    return NextResponse.json({ error }, { status })
  }
}

export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    const CodeService = new ConfirmationCode()

    // get code and token
    const { code } = await req.json()
    const token = req.cookies.get('token')?.value

    // validate request
    if (code === undefined || code === null) throw new ValidationError('No se ha enviado el código')
    if (token === undefined || token === null) throw new ValidationError('No se ha enviado el token')

    // verify token and get values
    const decodeJWT = jwt.verifyToken(token)

    // check if token is valid
    if (decodeJWT.iss !== 'register' && decodeJWT.aud !== 'register') { throw new AuthorizationError('Token invalido') }
    if (!CodeService.checkCode(code as string, decodeJWT.code as string)) { throw new AuthorizationError('Código invalido') }

    // generate authorized token with email and type register
    const tokenData = {
      email: decodeJWT.email,
      dni: decodeJWT.dni,
      phoneNumber: decodeJWT.phoneNumber
    }
    const tokenVerified = jwt.generateAuthorizedToken(
      'register',
      'register',
      tokenData
    )

    // generate and send response
    const response = NextResponse.json(
      { message: 'Validación de coreo exitosa' },
      { status: 200 }
    )
    response.cookies.set('token', tokenVerified, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
      path: '/'
    })
    return response
  } catch (e) {
    const { error, status } = ErrorsHandler(e)
    return NextResponse.json({ error }, { status })
  }
}
