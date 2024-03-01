import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import { role } from '@prisma/client'
import { checkRole } from '@/utils'

export async function GET (request: NextRequest,
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
      throw new AuthorizationError('No autorizado')
    }

    // get error
    const data = await prisma.error.findUnique({
      where: {
        id: Number(id),
        deleted: false
      }
    })

    // check if error exists
    if (data === null) {
      throw new NotFoundError('No se encontró el error')
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (request: NextRequest,
  { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )
  const { name, message } = await request.json()

  try {
    // check if user is authorized
    const authorized = await checkRole([role.ADMIN], token).catch((error) => {
      throw error
    })
    if (!authorized) {
      throw new AuthorizationError('No autorizado')
    }

    // update error
    const data = await prisma.error.update({
      where: {
        id: Number(id),
        deleted: false
      },
      data: {
        name,
        message
      }
    })

    // check if error exists
    if (data === null) {
      throw new NotFoundError('No se encontró el error')
    }

    return NextResponse.json({ message: 'Se ha modificado exitosamente' }, { status: 200 })
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
      throw new AuthorizationError('No autorizado')
    }

    // delete error
    const data = await prisma.error.update({
      where: {
        id: Number(id)
      },
      data: {
        deleted: true
      }
    })

    // check if error exists
    if (data === null) {
      throw new NotFoundError('No se encontró el error')
    }

    return NextResponse.json({ message: 'Se ha modificado exitosamente' }, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
