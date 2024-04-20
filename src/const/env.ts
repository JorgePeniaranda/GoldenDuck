import { getEnvValue } from '@/helpers/env'

export const env = {
  API_URL: getEnvValue('NEXT_PUBLIC_API_URL'),
  TOKEN_KEY_VALUE: getEnvValue('TOKEN_KEY_VALUE'),
  TOKEN_MAX_AGE_SECONDS: getEnvValue('TOKEN_MAX_AGE_SECONDS')
} as const
