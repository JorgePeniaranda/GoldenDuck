import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import {
  AuthorizationError,
  GenerateErrorResponse
} from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'

export async function GET (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const data = await prisma.account.findFirstOrThrow({
      where: {
        deleted: false
      },
      select: {
        messagesFrom: {
          where: {
            to: Number(id),
            deleted: false
          },
          orderBy: {
            date: 'asc'
          },
          select: {
            id: true,
            from: true,
            message: true,
            date: true,
            accountFrom: {
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
        },
        messagesTo: {
          where: {
            from: Number(id),
            deleted: false
          },
          orderBy: {
            date: 'asc'
          },
          select: {
            id: true,
            from: true,
            message: true,
            date: true,
            accountFrom: {
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
        }
      }
    })

    const conversation = data.messagesFrom
      .concat(data.messagesTo)
      .reduce<any>((acc, value) => {
      return [...acc, value]
    }, [])
      .sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      )

    return NextResponse.json(conversation, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (
  request: NextRequest,
  { params: { idAccount, id } }: { params: { idAccount: string, id: string } }
): Promise<NextResponse> {
  const { message } = await request.json()

  try {
    // check if account exists
    await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(id)
      }
    })

    // create message
    await prisma.message.create({
      data: {
        from: Number(idAccount),
        to: Number(id),
        message
      }
    })

    // [TO-DO] create notification

    return NextResponse.json(messages.created, { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (
  request: NextRequest,
  { params: { idAccount, id } }: { params: { idAccount: string, id: string } }
): Promise<NextResponse> {
  const { message } = await request.json()

  try {
    await prisma.message
      .update({
        where: {
          id: Number(id),
          from: Number(idAccount)
        },
        data: {
          message
        }
      })
      .catch(() => {
        throw new AuthorizationError(messages.noPermissions)
      })

    return NextResponse.json(messages.updated, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (
  request: NextRequest,
  { params: { idAccount, id } }: { params: { idAccount: string, id: string } }
): Promise<NextResponse> {
  try {
    await prisma.message
      .update({
        where: {
          id: Number(id),
          from: Number(idAccount)
        },
        data: {
          message: 'messages.deleted'
        }
      })
      .catch(() => {
        throw new AuthorizationError(messages.noPermissions)
      })

    return NextResponse.json(messages.deleted, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
