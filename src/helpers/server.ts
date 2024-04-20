import { ErrorsDictionary } from '@/messages/errors'

export function getEnvValue (envName: string, defaultValue?: string): string {
  const envValue = process.env[envName]

  if (typeof envValue === 'string' && envValue.length > 0) {
    return envValue
  }

  if (typeof defaultValue === 'string') {
    console.warn(ErrorsDictionary.NoVariableEnv(envName))
    return defaultValue
  }

  throw new Error(ErrorsDictionary.NoVariableEnv(envName))
}
