import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  AuthorizationError,
  GenerateErrorResponse,
  NotFoundError,
  ValidationError
} from '@/services/errorService'
import validations from '@/services/validationService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    // form data
    const { email, password } = await req.json()

    // check request
    await validations.email.parseAsync(email).catch((error) => {
      throw new ValidationError(error.errors[0].message)
    })
    await validations.password.parseAsync(password).catch((error) => {
      throw new ValidationError(error.errors[0].message)
    })

    // find user
    const user = await prisma.users.findFirst({
      where: { email, deleted: false }
    })

    // check if user exists
    if (user === undefined || user === null) {
      throw new NotFoundError('No existe cuenta creada con ese correo')
    }

    // check password match
    if (!bcrypt.compareSync(password as string, user.password)) {
      throw new AuthorizationError('La contraseña es incorrecta')
    }

    // generate autorized token with id
    const token = jwt.generateToken({
      id: user.id
    })

    // generate and send response
    const response = NextResponse.json(
      { message: 'Ha ingresado exitosamente' },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 30,
      path: '/'
    })

    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
