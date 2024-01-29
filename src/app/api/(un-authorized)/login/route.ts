import JWT from '@/services/jwtService'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  AuthorizationError,
  ErrorsHandler,
  NotFoundError,
  ValidationError,
} from '@/services/errorService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: NextRequest) {
  try {
    // form data
    const data = await req.json()

    // check request
    if (!data.email) throw new ValidationError('No se ha enviado el email')
    if (!data.password)
      throw new ValidationError('No se ha enviado la contraseña')

    // find user
    const user = await prisma.users.findFirst({
      where: { email: data.email, deleted: false },
    })

    // check if user exists
    if (!user) throw new NotFoundError('No existe cuenta creada con ese correo')

    // check password match
    if (!bcrypt.compareSync(data.password, user.password))
      throw new AuthorizationError('La contraseña es incorrecta')

    // generate autorized token with id
    const tokenData = {
      id: user.id,
    }
    const AuthoridedToken = jwt.generateAuthorizedToken(
      'login',
      'dashboard',
      tokenData,
    )

    // generate and send response
    const response = NextResponse.json(
      { message: 'Ha ingresado exitosamente' },
      { status: 200 },
    )

    response.cookies.set('token', AuthoridedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 30,
      path: '/',
    })

    return response
  } catch (e) {
    const { error, status } = ErrorsHandler(e)
    return NextResponse.json({ error }, { status })
  }
}
