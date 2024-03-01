import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, ConflictError, GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { checkRole } from '@/utils'

export async function GET (request: NextRequest): Promise<NextResponse> {
  try {
    // get categories
    const data = await prisma.category.findMany({
      where: {
        deleted: false
      }
    })

    return NextResponse.json(data, { status: 200 })
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
    const authorized = await checkRole([role.ADMIN, role.SUPPORT], token).catch((error) => {
      throw error
    })
    if (!authorized) {
      throw new AuthorizationError('No autorizado')
    }

    // check if category already exists
    const checkCategory = await prisma.category.findFirst({
      where: {
        name
      }
    })
    if (checkCategory !== null) {
      throw new ConflictError('La categoria ya existe')
    }

    // create category
    const data = await prisma.category.create({
      data: {
        name
      }
    })

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
