import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { StatusCodes } from 'http-status-codes'

const jwt = new JWT()

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    // check if any account exist
    const data = await prisma.user.findFirst({
      where: {
        id,
        deleted: false
      },
      select: {
        account: {
          select: {
            notifications: {
              where: {
                read: false
              },
              select: {
                id: true,
                idAccount: true,
                message: true,
                date: true
              }
            },
            messagesFrom: {
              where: {
                read: false
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
        }
      }
    })

    if (data === null) {
      return NextResponse.json({ message: 'No hay notificaciones' }, { status: 204 })
    }

    const notifications = data.account.reduce(
      (acc, value) => {
        return {
          ...acc,
          notifications: [...acc.notifications.concat(value.notifications)],
          messages: [...acc.messages.concat(value.messagesFrom)]
        }
      },
      { notifications: [] as any, messages: [] as any }
    )

    return NextResponse.json(notifications, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  const { message } = await request.json()

  try {
    const data = await prisma.notification.create({
      data: {
        idAccount: Number(idAccount),
        message
      }
    })

    return NextResponse.json(data, { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
