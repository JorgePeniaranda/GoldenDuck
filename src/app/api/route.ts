import { NextResponse } from 'next/server'

const response = (): NextResponse => {
  return NextResponse.json(
    { date: new Date().toLocaleString() },
    { status: 418 }
  )
}

export const GET = response
export const HEAD = response
export const POST = response
export const PUT = response
export const DELETE = response
export const PATCH = response
export const OPTIONS = response
