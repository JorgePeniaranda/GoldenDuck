import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'

export async function GET (request: NextRequest,
  { params: { idAccount, id } }: { params: { idAccount: string, id: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.transaction.findFirstOrThrow({
      where: {
        id: Number(id),
        OR: [
          { to: Number(idAccount) },
          { from: Number(idAccount) }
        ]
      },
      select: {
        id: true,
        from: true,
        to: true,
        amount: true,
        date: true,
        accountTo: {
          select: {
            imgUrl: true,
            user: {
              select: {
                name: true,
                lastName: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(BigIntToJson(data), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
