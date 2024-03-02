import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse, ValidationError } from '@/services/errorService'
import validations from '@/services/validationService'
import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

const Schema = z.object({
  email: validations.email.optional(),
  dni: validations.dni.optional(),
  phoneNumber: validations.phoneNumber.optional()
})

export async function POST (request: NextRequest): Promise<NextResponse> {
  const data = await request.json()

  try {
    // validate data
    const { email, dni, phoneNumber } = await Schema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error.errors[0].message)
      }
    )

    await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ email }, { dni }, { phoneNumber }],
        deleted: false
      }
    })

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    console.log(error)
    return GenerateErrorResponse(error)
  }
}
