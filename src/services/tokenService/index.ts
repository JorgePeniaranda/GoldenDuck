import { env } from '@/constants/env'
import { cookies } from 'next/headers'

export function saveToken (token: string): void {
  cookies().set({
    name: env.TOKEN_KEY_VALUE,
    value: token,
    httpOnly: true,
    secure: true,
    domain: 'localhost',
    maxAge: Number(env.TOKEN_MAX_AGE_SECONDS)
  })
}

export function getToken (): string | undefined {
  return cookies().get(env.TOKEN_KEY_VALUE)?.value
}

export function clearToken (): void {
  cookies().delete(env.TOKEN_KEY_VALUE)
}
