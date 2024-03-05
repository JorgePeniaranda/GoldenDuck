import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, RequestError } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson, getRequestData } from '@/utils'
import { ErrorsDictionary } from '@/const/messages'

export async function GET (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
  try {
    const { investments } = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount)
      },
      select: {
        investments: {
          select: {
            id: true,
            amount: true,
            interest: true,
            dateEnd: true,
            date: true
          }
        }
      }
    })

    return NextResponse.json(BigIntToJson(investments), {
      status: StatusCodes.OK
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (
  request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }
): Promise<NextResponse> {
  try {
    const {
      amount: requestAmount,
      dateEnd,
      interest
    } = await getRequestData(request)
    const amount = BigInt(String(requestAmount))

    // check if the account has enough balance
    const account = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount)
      },
      select: {
        balance: true
      }
    })
    if (account.balance < amount) {
      throw new RequestError(ErrorsDictionary.InsufficientBalance)
    }

    // create the investment
    const newInvestment = await prisma.investment.create({
      data: {
        idAccount: Number(idAccount),
        amount,
        dateEnd: new Date(String(dateEnd)),
        interest
      },
      select: {
        id: true,
        amount: true,
        interest: true,
        dateEnd: true,
        date: true
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

    return NextResponse.json(
      {
        newBalance: String(account.balance - amount),
        investment: BigIntToJson(newInvestment)
      },
      {
        status: StatusCodes.CREATED
      }
    )
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
