import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, RequestError } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'
import { messages } from '@/const/messages'

export async function GET (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount),
        deleted: false
      },
      select: {
        transactionsFrom: {
          orderBy: {
            date: 'desc'
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
        },
        transactionsTo: {
          orderBy: {
            date: 'desc'
          },
          select: {
            id: true,
            from: true,
            to: true,
            amount: true,
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

    return NextResponse.json(BigIntToJson(data), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  const { to, amount } = await request.json()

  try {
    // check if the account exists
    await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(to),
        deleted: false
      }
    })

    // check if the account has enough balance
    const account = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount)
      },
      select: {
        balance: true
      }
    })
    if (account.balance < BigInt(String(amount))) {
      throw new RequestError(messages.insufficientBalance)
    }

    // create the transaction
    await prisma.transaction.create({
      data: {
        from: Number(idAccount),
        to: Number(to),
        amount: BigInt(String(amount))
      }
    })

    // remove the amount from the account
    await prisma.account.update({
      where: {
        id: Number(idAccount)
      },
      data: {
        balance: {
          decrement: BigInt(String(amount))
        }
      }
    })

    // add the amount to the account
    await prisma.account.update({
      where: {
        id: Number(to)
      },
      data: {
        balance: {
          increment: BigInt(String(amount))
        }
      }
    })

    // [TODO] send notification

    return NextResponse.json(messages.updated, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
