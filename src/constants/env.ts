import { getEnvValue } from '@/helpers/server'

export const env = {
  API_URL: new URL(getEnvValue('NEXT_PUBLIC_API_URL', 'http://localhost:3000')),
  TOKEN_KEY_VALUE: getEnvValue('TOKEN_KEY_VALUE', 'token'),
  TOKEN_MAX_AGE_SECONDS: getEnvValue('TOKEN_MAX_AGE_SECONDS', '3600')
} as const
