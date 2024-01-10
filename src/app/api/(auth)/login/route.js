import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(req) {
  const createUser = 'asd'

  return NextResponse.json({
    data: createUser,
  })
}
