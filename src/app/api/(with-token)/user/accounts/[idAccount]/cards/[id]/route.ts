import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'

export async function GET (request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.card.findFirst({
      where: {
        id: Number(id),
        idAccount: Number(idAccount),
        deleted: false
      },
      select: {
        id: true,
        number: true,
        cvv: true,
        expiration: true
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la tarjeta')
    }

    return NextResponse.json(BigIntToJson(data), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }): Promise<NextResponse> {
  const { number, cvv, expiration } = await request.json()

  try {
    const data = await prisma.card.update({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      data: {
        idAccount: Number(idAccount),
        number,
        cvv,
        expiration: new Date(String(expiration))
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la tarjeta')
    }

    return NextResponse.json('Se ha actualizado exitosamente', { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.card.update({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      data: {
        deleted: true
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la inversión')
    }

    return NextResponse.json('Se ha eliminado exitosamente', { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
