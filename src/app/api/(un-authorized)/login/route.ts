import JWT from '@/services/jwtService'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from '@/services/errorService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.email) throw new ValidationError('No se ha enviado el email')

    if (!data.password)
      throw new ValidationError('No se ha enviado la contraseña')

    // get user
    const user = await prisma.users.findFirst({
      where: { email: data.email, deleted: false },
    })

    // check if user exists
    if (!user) throw new NotFoundError('No existe cuenta creada con ese correo')

    // check password
    if (!bcrypt.compareSync(data.password, user.password))
      throw new AuthorizationError('La contraseña es incorrecta')

    // generate autorized token with id
    const AuthoridedToken = jwt.generateAuthorizedToken(user.id)

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
    if (e instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        { error: 'No se ha podido conectar a la base de datos' },
        { status: 500 },
      )
    }
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 })
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
