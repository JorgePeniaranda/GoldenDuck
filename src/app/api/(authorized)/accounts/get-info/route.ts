import { CheckAuthorizedToken } from '@/utils/api'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  // const checkedToken = await CheckAuthorizedToken(req)

  // if (checkedToken.error) {
  //   return NextResponse.json(
  //     { response: checkedToken.error },
  //     { status: checkedToken.status },
  //   )
  // }

  // const user = await prisma.users.findUnique({
  //   where: {
  //     id: checkedToken.userId,
  //   },
  // })

  // if (!user) {
  //   return NextResponse.json(
  //     { response: 'El usuario no existe' },
  //     { status: 404 },
  //   )
  // }

  // return NextResponse.json(
  //   {
  //     name: user.name,
  //     lastName: user.lastName,
  //     dni: user.dni,
  //     email: user.email,
  //     phoneNumber: user.phoneNumber,
  //     address: user.address,
  //     birthDate: user.birthDate,
  //     sex: user.sex,
  //   },
  //   { status: 200 },
  // )

  return NextResponse.json({
    message: 'Esta ruta no está implementada',
  })
}
