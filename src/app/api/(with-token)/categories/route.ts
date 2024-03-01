import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { ConflictError, GenerateErrorResponse } from '@/services/errorService'
import { verifyRoleOrThrow } from '@/utils'
import { role } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    let data
    // check if user is authorized
    const authorized = await verifyRoleOrThrow([role.ADMIN], token).catch((error) => {
      throw error
    })

    if (authorized) {
      // get categories
      data = await prisma.category.findMany()
    } else {
      data = await prisma.category.findMany({
        where: {
          deleted: false
        }
      })
    }

    return NextResponse.json(data, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { name } = await request.json()
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    // check if user is authorized
    await verifyRoleOrThrow([role.ADMIN], token).catch((error) => {
      throw error
    })

    // check if category already exists
    const checkCategory = await prisma.category.findFirst({
      where: {
        name
      }
    })
    if (checkCategory !== null) {
      throw new ConflictError(messages.categoryExists)
    }

    // create category
    await prisma.category.create({
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json({ messages: messages.created }, { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
