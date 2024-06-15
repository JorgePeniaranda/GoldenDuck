export function getEnvValue(envName: string, defaultValue?: string): string {
  const envValue = process.env[envName]

  if (typeof envValue === 'string' && envValue.length > 0) {
    return envValue
  }

  if (typeof defaultValue === 'string') {
    console.warn(`No value found for ${envName}. Using default value: ${defaultValue}`)
    return defaultValue
  }

  throw new Error(`No value found for ${envName} and no default value provided`)
}
