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
    const data = await prisma.user.findUnique({
      where: {
        id,
        deleted: false
      },
      select: {
        account: {
          select: {
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
            },
            messagesTo: {
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
      return NextResponse.json({ message: 'No hay mensajes' }, { status: 204 })
    }

    return NextResponse.json(data.account, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  const { message } = await request.json()

  try {
    await prisma.notification.create({
      data: {
        idAccount: Number(idAccount),
        message
      }
    })

    return NextResponse.json('Se ha creado exitosamente', { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
