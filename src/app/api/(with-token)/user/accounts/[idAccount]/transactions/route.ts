import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, RequestError } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson, getRequestData } from '@/utils'
import { messages } from '@/const/messages'

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
            category: {
              select: {
                name: true
              }
            },
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
            category: {
              select: {
                name: true
              }
            },
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

export async function POST (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
  try {
    const { to, amount: requestAmount } = await getRequestData(request)
    const amount = BigInt(String(requestAmount))

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
    const newTransaction = await prisma.transaction.create({
      data: {
        from: Number(idAccount),
        to: Number(to),
        amount
      },
      select: {
        id: true,
        from: true,
        to: true,
        amount: true,
        date: true,
        category: {
          select: {
            name: true
          }
        },
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
    })

    // remove the amount from the account
    await prisma.account.update({
      where: {
        id: Number(idAccount)
      },
      data: {
        balance: {
          decrement: amount
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
          increment: amount
        }
      }
    })

    // [TODO] send notification

    return NextResponse.json(
      {
        newBalance: String(account.balance - amount),
        transaction: BigIntToJson(newTransaction)
      },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    console.log(error)
    return GenerateErrorResponse(error)
  }
}
