import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse } from 'next/server'
import { type RegisterForm } from '@/types'
import { SignUpSchema } from '@/useCases/registerUseCase'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  ConflictError,
  GenerateErrorResponse,
  ValidationError
} from '@/services/errorService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    const userData = await request.json()

    // validate data
    const data = await SignUpSchema.parseAsync(userData as RegisterForm).catch(
      (error) => {
        throw new ValidationError(error.errors[0].message)
      }
    )

    // Check if user already exists
    const checkSameUser = await prisma.user.findFirst({
      where: {
        OR: [
          { dni: data.dni },
          { email: data.email },
          { phoneNumber: data.phoneNumber }
        ],
        deleted: false
      }
    })
    if (checkSameUser !== undefined && checkSameUser !== null) {
      throw new ConflictError('Ya existe una cuenta con esos datos')
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10)
      }
    })

    // Create account for new user
    await prisma.account.create({
      data: {
        idUser: newUser.id
      }
    })

    // generate autorized token with id
    const token = jwt.generateToken({
      id: newUser.id
    })

    // generate and send response
    const response = NextResponse.json(
      { token, message: 'Se ha registrado exitosamente' },
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
