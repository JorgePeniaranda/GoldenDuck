import JWT from '@/services/jwtService'
import { NextRequest, NextResponse } from 'next/server'
import { SignupForm } from '@/types'
import { SignUpSchema } from '@/useCases/registerUseCase'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from '@/services/errorService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: NextRequest) {
  try {
    // get token and form data
    const data = await req.json()
    const token = req.cookies.get('token')?.value

    // check if token and email are sent
    if (!token) throw new ValidationError('No se ha enviado el token')

    if (!data.email) throw new ValidationError('No se ha enviado el email')

    // verify token and get values
    const jwtToken = await jwt.verifyToken(token)

    // check if token is valid
    if (typeof jwtToken === 'string') throw new AuthorizationError(jwtToken)

    if (
      jwtToken.email !== data.email ||
      jwtToken.type !== 'register' ||
      jwtToken.authorized == false
    )
      throw new AuthorizationError('Token invalido')

    // Check format of form body
    const checkUserData = await SignUpSchema.safeParseAsync(data as SignupForm)
    if (!checkUserData.success)
      throw new ValidationError(checkUserData.error.errors[0].message)

    // Check if user already exists
    const checkSameUser = await prisma.users.findFirst({
      where: {
        OR: [
          { dni: checkUserData.data.dni },
          { email: checkUserData.data.email },
          { phoneNumber: checkUserData.data.phoneNumber },
        ],
        deleted: false,
      },
    })
    if (checkSameUser)
      throw new ConflictError('Ya existe una cuenta con esos datos')

    // Create new user
    const newUser = await prisma.users.create({
      data: {
        ...checkUserData.data,
        password: bcrypt.hashSync(checkUserData.data.password, 10),
      },
    })

    // generate autorized token with id
    const AuthoridedToken = jwt.generateAuthorizedToken(newUser.id)

    // generate and send response
    const response = NextResponse.json(
      { message: 'Se ha registrado exitosamente' },
      { status: 201 },
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
