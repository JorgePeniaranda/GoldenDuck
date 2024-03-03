import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { ConflictError, GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { getRequestData } from '@/utils'
import { StatusCodes } from 'http-status-codes'
import { ErrorsDictionary } from '@/const/messages'

export async function GET (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // get category
    const category = await prisma.category.findUniqueOrThrow({
      where: {
        id: Number(id),
        deleted: false
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(category, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
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

    // update category
    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(updatedCategory, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    // check if user is authorized
    await prisma.user.verifyRoleOrThrow([role.ADMIN], token).catch((error) => {
      throw error
    })

    await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        deleted: true
      },
      select: {
        id: true,
        name: true
      }
    })

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
