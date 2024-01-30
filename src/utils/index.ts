export const randomAlphanumeric = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join('')
}

export const checkAlphanumeric = (value: string) => /^[a-zA-Z0-9]*$/.test(value)

export const checkOnlyLetters = (value: string) => /^[a-zA-Z]+$/.test(value)
