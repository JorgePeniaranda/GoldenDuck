import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'

export async function GET (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
  try {
    const data = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount),
        deleted: false
      },
      select: {
        messagesFrom: {
          where: {
            read: false,
            deleted: false
          },
          select: {
            id: true,
            from: true,
            message: true,
            date: true,
            accountFrom: {
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
        },
        messagesTo: {
          where: {
            read: false,
            deleted: false
          },
          orderBy: {
            date: 'desc'
          },
          select: {
            id: true,
            from: true,
            message: true,
            date: true,
            accountFrom: {
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
        }
      }
    })

    return NextResponse.json(data, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
