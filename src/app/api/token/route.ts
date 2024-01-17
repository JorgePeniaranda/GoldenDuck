import { CheckToken } from '@/utils/api-utils'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const checkToken = await CheckToken(req)

  if (checkToken.error) {
    return NextResponse.json(
      { response: checkToken.error },
      { status: checkToken.status },
    )
  }

  return NextResponse.json({ response: checkToken.userId }, { status: 200 })
}
