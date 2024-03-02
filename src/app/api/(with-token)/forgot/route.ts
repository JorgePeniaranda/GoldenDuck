import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import JWT from '@/services/jwtService'
import bcrypt from 'bcryptjs'
import {
  GenerateErrorResponse,
  NotFoundError,
  ValidationError
} from '@/services/errorService'
import { ForgotSchema } from '@/useCases/forgotUseCase'
import { StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'

const jwt = new JWT()

export async function PUT (request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json()

    // validate email and password
    const { email, password } = await ForgotSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error.errors[0].message)
      }
    )

    // get user and check if user exists
    const user = await prisma.user.findFirstOrThrow({
      where: { email, deleted: false }
    })
    if (user === undefined || user === null) {
      throw new NotFoundError(messages.userNotFound)
    }

    // update password
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: bcrypt.hashSync(password),
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        dni: true,
        email: true,
        phoneNumber: true,
        address: true,
        birthDate: true,
        sex: true
      }
    })

    // log session
    await prisma.session.create({
      data: {
        idUser: updatedUser.id,
        userAgent: String(request.headers.get('user-agent')),
        ip: String(request.headers.get('x-real-ip'))
      }
    })

    // generate autorized token with id
    const token = jwt.generateToken({
      id: updatedUser.id
    })

    // generate and send response
    const response = NextResponse.json(
      { token, ...updatedUser },
      { status: StatusCodes.CREATED }
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
