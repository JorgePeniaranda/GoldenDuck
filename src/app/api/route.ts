import { NextResponse } from 'next/server'

const response = NextResponse.json(
  { date: new Date().toLocaleString() },
  { status: 418 }
)

export function GET (): NextResponse {
  return response
}

export function HEAD (): NextResponse {
  return response
}

export function POST (): NextResponse {
  return response
}

export function PUT (): NextResponse {
  return response
}

export function DELETE (): NextResponse {
  return response
}

export function PATCH (): NextResponse {
  return response
}

export async function OPTIONS (): Promise<NextResponse> {
  return response
}
