import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse, ValidationError } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { BigIntToJson, getRequestData } from '@/utils'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import validations from '@/services/validationService'
import { ErrorsDictionary } from '@/const/messages'

const jwt = new JWT()

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
        deleted: false
      },
      select: {
        name: true,
        lastName: true,
        dni: true,
        email: true,
        phoneNumber: true,
        address: true,
        birthDate: true,
        sex: true,
        updatedAt: true,
        createdAt: true,
        role: true
      }
    })

    return NextResponse.json(BigIntToJson(user), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { phoneNumber, address } = await getRequestData(request)
    const { id } = jwt.verifyToken(token)

    // validate phone number and address
    await validations.phoneNumber.parseAsync(phoneNumber).catch((error) => {
      throw new ValidationError(error.errors[0].message)
    })
    await validations.address.parseAsync(address).catch((error) => {
      throw new ValidationError(error.errors[0].message)
    })

    const user = await prisma.user.update({
      where: {
        id,
        deleted: false
      },
      data: {
        phoneNumber: BigInt(String(phoneNumber)),
        address
      }
    })

    return NextResponse.json(BigIntToJson(user), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { password: userPassword } = await getRequestData(request)
    const { id } = jwt.verifyToken(token)

    // validate password
    const password = await validations.password.parseAsync(userPassword).catch((error) => {
      throw new ValidationError(error.errors[0].message)
    })

    // check user password
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
        deleted: false
      },
      select: {
        password: true
      }
    })
    if (!bcrypt.compareSync(password, user.password)) {
      throw new AuthorizationError(ErrorsDictionary.IncorrectPassword)
    }

    // delete user
    await prisma.user.deleteUser(Number(id))

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
