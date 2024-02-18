import { NextResponse } from 'next/server'

export function GET () {
  return NextResponse.json({
    date: new Date().toLocaleString()
  })
}
