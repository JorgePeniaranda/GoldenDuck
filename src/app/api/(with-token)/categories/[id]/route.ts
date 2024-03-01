import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { checkRole } from '@/utils'
import { StatusCodes } from 'http-status-codes'

export async function GET (request: NextRequest,
  { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
  try {
    // get category
    const data = await prisma.category.findUniqueOrThrow({
      where: {
        id: Number(id),
        deleted: false
      }
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (request: NextRequest,
  { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
  const { name } = await request.json()
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    // check if user is authorized
    const authorized = await checkRole([role.ADMIN], token).catch((error) => {
      throw error
    })
    if (!authorized) {
      throw new AuthorizationError('Permisos insuficientes')
    }

    // update category
    await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })

    return NextResponse.json({ message: 'Se ha modificado exitosamente' }, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (request: NextRequest,
  { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    // check if user is authorized
    const authorized = await checkRole([role.ADMIN], token).catch((error) => {
      throw error
    })
    if (!authorized) {
      throw new AuthorizationError('Permisos insuficientes')
    }

    // delete category
    await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        deleted: true
      }
    })

    return NextResponse.json({ message: 'Se ha eliminado exitosamente' }, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
