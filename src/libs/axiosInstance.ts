import { ErrorsDictionary } from '@/const/messages'
import { ConfigError } from '@/services/errorService'
import axios from 'axios'

const getBaseURL = (): string => {
  const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL
  const host = process.env.NEXT_PUBLIC_API_HOST
  const port = process.env.NEXT_PUBLIC_API_PORT

  if (typeof protocol !== 'string' || protocol === '') {
    throw new ConfigError(
      ErrorsDictionary.NoVariableEnv('NEXT_PUBLIC_API_PROTOCOL')
    )
  }
  if (typeof host !== 'string' || host === '') {
    throw new ConfigError(
      ErrorsDictionary.NoVariableEnv('NEXT_PUBLIC_API_HOST')
    )
  }
  if (typeof port !== 'string' || port === '') {
    throw new ConfigError(
      ErrorsDictionary.NoVariableEnv('NEXT_PUBLIC_API_PORT')
    )
  }

  return `${protocol}://${host}:${port}`
}

export const AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 8000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
