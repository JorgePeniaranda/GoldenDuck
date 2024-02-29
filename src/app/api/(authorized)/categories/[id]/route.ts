import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { role } from '@prisma/client'

const jwt = new JWT()

export async function GET (request: NextRequest,
  { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { userId } = jwt.verifyToken(token)

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deleted: false
      },
      select: {
        role: true
      }
    })

    if (user === null) {
      throw new NotFoundError('No se encontró la cuenta')
    }

    if (user.role !== role.ADMIN && user.role !== role.SUPPORT) {
      throw new AuthorizationError('No autorizado')
    }

    const data = await prisma.category.findUnique({
      where: {
        id: Number(id),
        deleted: false
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la categoria')
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
  const { name } = await request.json()

  try {
    const { userId } = jwt.verifyToken(token)

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deleted: false
      },
      select: {
        role: true
      }
    })

    if (user === null) {
      throw new NotFoundError('No se encontró la cuenta')
    }

    if (user.role !== role.ADMIN && user.role !== role.SUPPORT) {
      throw new AuthorizationError('No autorizado')
    }

    const data = await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la categoria')
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
    const { userId } = jwt.verifyToken(token)

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        deleted: false
      },
      select: {
        role: true
      }
    })

    if (user === null) {
      throw new NotFoundError('No se encontró la cuenta')
    }

    if (user.role !== role.ADMIN && user.role !== role.SUPPORT) {
      throw new AuthorizationError('No autorizado')
    }

    const data = await prisma.category.update({
      where: {
        id: Number(id)
      },
      data: {
        deleted: true
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la categoria')
    }

    return NextResponse.json({ message: 'Se ha modificado exitosamente' }, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
