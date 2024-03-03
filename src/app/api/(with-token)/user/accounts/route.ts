import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { BigIntToJson, getRequestData } from '@/utils'
import { StatusCodes } from 'http-status-codes'

const jwt = new JWT()

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    const accounts = await prisma.user.findUniqueOrThrow({
      where: {
        id,
        deleted: false
      },
      select: {
        account: {
          where: {
            deleted: false
          },
          select: {
            id: true,
            balance: true,
            imgUrl: true,
            updatedAt: true,
            createdAt: true
          }
        }
      }
    })

    return NextResponse.json(BigIntToJson(accounts), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { imgUrl } = await getRequestData(request)
    const { id } = jwt.verifyToken(token)

    const newAccount = await prisma.account.create({
      data: {
        idUser: id,
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

    return NextResponse.json(BigIntToJson(newAccount), {
      status: StatusCodes.CREATED
    })
  } catch (error) {
    console.log(error)
    return GenerateErrorResponse(error)
  }
}
