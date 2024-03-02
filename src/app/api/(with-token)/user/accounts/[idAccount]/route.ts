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

export async function GET (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    const account = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount),
        idUser: id,
        deleted: false
      },
      select: {
        id: true,
        balance: true,
        imgUrl: true,
        updatedAt: true,
        createdAt: true
      }
    })

    return NextResponse.json(BigIntToJson(account), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { imgUrl } = await getRequestData(request)
    const { id } = jwt.verifyToken(token)

    const updatedAccount = await prisma.account.update({
      where: {
        id: Number(idAccount),
        idUser: id,
        deleted: false
      },
      data: {
        imgUrl
      },
      select: {
        id: true,
        balance: true,
        imgUrl: true,
        updatedAt: true,
        createdAt: true
      }
    })

    return NextResponse.json(BigIntToJson(updatedAccount), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
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

    // validate user password
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

    // delete account
    await prisma.account.update({
      where: {
        id: Number(String(idAccount)),
        idUser: id,
        deleted: false
      },
      data: {
        deleted: true
      }
    })

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    console.log(error)
    return GenerateErrorResponse(error)
  }
}
