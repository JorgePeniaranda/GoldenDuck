import { CheckToken } from '@/utils/api-utils'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  const checkToken = await CheckToken(req)

  if (checkToken.error) {
    return NextResponse.json(
      { response: checkToken.error },
      { status: checkToken.status },
    )
  }

  return NextResponse.json({
    date: new Date().toLocaleString(),
  })
}
