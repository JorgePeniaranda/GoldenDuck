import { NextResponse } from 'next/server'

export function GET (): NextResponse {
  return NextResponse.json({
    date: new Date().toLocaleString()
  })
}
