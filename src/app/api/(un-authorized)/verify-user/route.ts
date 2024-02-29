import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import {
  GenerateErrorResponse,
  NotFoundError,
  ValidationError
} from '@/services/errorService'
import validations from '@/services/validationService'
import { z } from 'zod'

const Schema = z.object({
  email: validations.email,
  dni: validations.dni,
  phoneNumber: validations.phoneNumber
})

// check if any account exist with that email
export async function POST (request: NextRequest): Promise<NextResponse> {
  const data = await request.json()

  try {
    // validate data
    const { email, dni, phoneNumber } = await Schema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error.errors[0].message)
      }
    )

    // check if any account exist
    const checkExist = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { dni }, { phoneNumber }],
        deleted: false
      },
      select: {
        id: true
      }
    })

    if (checkExist === undefined || checkExist === null) {
      throw new NotFoundError('No existe una cuenta creada con ese correo')
    }

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
