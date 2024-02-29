import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  GenerateErrorResponse,
  NotFoundError,
  ValidationError
} from '@/services/errorService'
import { ForgotSchema } from '@/useCases/forgotUseCase'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function PUT (req: NextRequest): Promise<NextResponse> {
  try {
    // get token and form data
    const data = await req.json()

    // validate email and password
    const { email, password } = await ForgotSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error.errors[0].message)
      }
    )

    // get user and check if user exists
    const user = await prisma.user.findFirst({
      where: { email, deleted: false }
    })
    if (user === undefined || user === null) {
      throw new NotFoundError('No existe cuenta creada con ese correo')
    }

    // update password
    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: bcrypt.hashSync(password), updateAt: new Date() }
    })

    // generate autorized token with id
    const token = jwt.generateToken({
      id: newUser.id
    })

    // generate and send response
    const response = NextResponse.json(
      { token, message: 'Se ha actualizado la contraseña exitosamente' },
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
