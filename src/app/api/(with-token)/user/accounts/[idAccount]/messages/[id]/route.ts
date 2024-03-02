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
    const conversation = await prisma.account.findFirstOrThrow({
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

    const formatedConversation = conversation.messagesFrom
      .concat(conversation.messagesTo)
      .reduce<any>((acc, value) => {
      return [...acc, value]
    }, [])
      .sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      )

    return NextResponse.json(formatedConversation, { status: StatusCodes.OK })
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
    const newMessage = await prisma.message.create({
      data: {
        from: Number(idAccount),
        to: Number(id),
        message
      },
      select: {
        id: true,
        from: true,
        to: true,
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
    })

    // [TO-DO] create notification

    return NextResponse.json(newMessage, { status: StatusCodes.CREATED })
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
    const updatedMessage = await prisma.message
      .update({
        where: {
          id: Number(id),
          from: Number(idAccount)
        },
        data: {
          message
        },
        select: {
          id: true,
          from: true,
          to: true,
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
      })
      .catch(() => {
        throw new AuthorizationError(messages.noPermissions)
      })

    return NextResponse.json(updatedMessage, { status: StatusCodes.OK })
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
          deleted: true
        }
      })
      .catch(() => {
        throw new AuthorizationError(messages.noPermissions)
      })

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
