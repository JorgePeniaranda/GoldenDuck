import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import JWT from '@/services/jwtService'
import bcrypt from 'bcryptjs'
import {
  AuthorizationError,
  GenerateErrorResponse,
  NotFoundError,
  ValidationError
} from '@/services/errorService'
import { LoginSchema } from '@/useCases/loginUseCase'

const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    // form data
    const data = await request.json()

    // check request
    const { email, password } = await LoginSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error.errors[0].message)
      }
    )

    // find user
    const user = await prisma.user.findFirst({
      where: { email, deleted: false },
      select: { id: true, password: true }
    })

    // check if user exists
    if (user === undefined || user === null) {
      throw new NotFoundError('No existe cuenta creada con ese correo')
    }

    // check password match
    if (!bcrypt.compareSync(password, user.password)) {
      throw new AuthorizationError('La contraseña es incorrecta')
    }

    // log session
    await prisma.session.create({
      data: {
        idUser: user.id,
        userAgent: String(request.headers.get('user-agent')),
        ip: String(request.headers.get('x-real-ip'))
      }
    })

    // generate autorized token with id
    const token = jwt.generateToken({
      id: user.id
    })

    // generate and send response
    const response = NextResponse.json(
      { token, message: 'Ha ingresado exitosamente' },
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
