import { env } from '@/constants/env'
import { cookies } from 'next/headers'

export function saveCode (code: string): void {
  console.log(code)
  cookies().set({
    name: env.CODE_KEY_VALUE,
    value: code,
    httpOnly: true,
    secure: true,
    domain: 'localhost',
    maxAge: Number(env.CODE_MAX_AGE_SECONDS)
  })
}

export function getCode (): string | undefined {
  return cookies().get(env.CODE_KEY_VALUE)?.value
}

export function clearCode (): void {
  cookies().delete(env.CODE_KEY_VALUE)
}
