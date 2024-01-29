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
import validations from '@/services/validationService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: NextRequest) {
  try {
    // get token and form data
    const { email, password } = await req.json()
    const token = req.cookies.get('token')?.value

    // check request
    if (!token) throw new ValidationError('No se ha enviado el token')
    if (!email) throw new ValidationError('No se ha enviado el email')
    if (!password) throw new ValidationError('No se ha enviado la contraseña')

    // verify token and get values
    const jwtToken = await jwt.verifyToken(token)

    // check if token is valid
    if (
      jwtToken.email !== email ||
      jwtToken.type !== 'forgot' ||
      jwtToken.authorized == false
    )
      throw new AuthorizationError('Token invalido')

    // validate email and password
    const checkEmail = validations.email.safeParse({ email })
    if (!checkEmail.success) throw new ValidationError('Email invalido')
    const checkPassword = validations.password.safeParse({ password })
    if (!checkPassword.success) throw new ValidationError('Contraseña invalida')

    // get user
    const user = await prisma.users.findFirst({
      where: { email: checkEmail.data, deleted: false },
    })

    // check if user exists
    if (!user) throw new NotFoundError('No existe cuenta creada con ese correo')

    // update password
    const newUser = await prisma.users.update({
      where: { id: user.id },
      data: { password: bcrypt.hashSync(checkPassword.data) },
    })

    // generate autorized token with id
    const AuthoridedToken = jwt.generateAuthorizedToken(newUser.id)

    // generate and send response
    const response = NextResponse.json(
      { message: 'Se ha actualizado la contraseña exitosamente' },
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
    const { error, status } = ErrorsHandler(e)
    return NextResponse.json({ error }, { status })
  }
}
