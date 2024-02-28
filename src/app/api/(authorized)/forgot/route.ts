import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  GenerateErrorResponse,
  NotFoundError,
  ValidationError
} from '@/services/errorService'
import validations from '@/services/validationService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    // get token and form data
    const { email: userEmail, password: userPassword } = await req.json()

    // validate email and password
    const email = await validations.email
      .parseAsync(userEmail)
      .catch((error) => {
        throw new ValidationError(error.errors[0].message)
      })
    const password = await validations.password
      .parseAsync(userPassword)
      .catch((error) => {
        throw new ValidationError(error.errors[0].message)
      })

    // get user and check if user exists
    const user = await prisma.users.findFirst({
      where: { email, deleted: false }
    })
    if (user === undefined || user === null) {
      throw new NotFoundError('No existe cuenta creada con ese correo')
    }

    // update password
    const newUser = await prisma.users.update({
      where: { id: user.id },
      data: { password: bcrypt.hashSync(password) }
    })

    // generate autorized token with id
    const token = jwt.generateToken({
      id: newUser.id
    })

    // generate and send response
    const response = NextResponse.json(
      { message: 'Se ha actualizado la contraseña exitosamente' },
      { status: 201 }
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
