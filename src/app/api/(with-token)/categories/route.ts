import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { ConflictError, GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { ErrorsDictionary } from '@/const/messages'
import { getRequestData } from '@/utils'

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    let categories
    // check if user is authorized
    const authorized = await prisma.user.verifyRole([role.ADMIN], token).catch((error) => {
      throw error
    })

    if (authorized) {
      // get categories
      categories = await prisma.category.findMany()
    } else {
      categories = await prisma.category.findMany({
        where: {
          deleted: false
        }
      })
    }

    return NextResponse.json(categories, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { name } = await getRequestData(request)

    // check if user is authorized
    await prisma.user.verifyRoleOrThrow([role.ADMIN], token).catch((error) => {
      throw error
    })

    // check if category already exists
    const checkCategory = await prisma.category.findFirst({
      where: {
        name
      }
    })
    if (checkCategory !== null) {
      throw new ConflictError(ErrorsDictionary.CategoryNotFount)
    }

    // create category
    const newCategory = await prisma.category.create({
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(newCategory, { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
