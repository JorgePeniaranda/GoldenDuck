import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import JWT from '@/services/jwtService'

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
      throw new NotFoundError('No se encontró la cuenta')
    }

    const notifications = data.account.reduce(
      (acc, value) => {
        return {
          ...acc,
          notifications: [...acc.notifications.concat(value.notifications)],
          messages: [...acc.messages.concat(value.messagesFrom)]
        }
      },
      { notifications: [], messages: [] }
    )

    notifications.notifications.splice(5)
    notifications.messages.splice(5)

    return NextResponse.json(notifications, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
