import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'

export async function GET (request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.notification.findFirst({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      select: {
        id: true,
        message: true,
        date: true,
        account: {
          select: {
            user: {
              select: {
                name: true,
                lastName: true
              }
            },
            imgUrl: true
          }
        }
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la notificación')
    }

    return NextResponse.json(data, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.notification.update({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      data: {
        read: true
      },
      select: {
        id: true,
        message: true,
        date: true,
        read: true
      }
    })

    if (data === null) {
      throw new NotFoundError('No se encontró la notificación')
    }

    return NextResponse.json(data, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
