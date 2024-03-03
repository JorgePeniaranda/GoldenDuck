import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { GenerateErrorResponse } from '@/services/errorService'

const response = (): NextResponse => {
  try {
    return NextResponse.json(
      { date: jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzA5MTM0NzE3LCJleHAiOjE3MDkxMzY1MTd9.FuMRP-WSJpQa34AmkAmTEmdRG6b-zz0pzyyxjc2jxes', 'ewq') },
      { status: 418 }
    )
  } catch (e) {
    console.log(e)
    return GenerateErrorResponse(e)
  }
}

export const GET = response
export const HEAD = response
export const POST = response
export const PUT = response
export const DELETE = response
export const PATCH = response
export const OPTIONS = response
