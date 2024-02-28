export const randomAlphanumeric = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('')
}

export const checkAlphanumeric = (value: string): boolean =>
  /^[a-zA-Z0-9]*$/.test(value)

export const checkOnlyLetters = (value: string): boolean =>
  /^[a-zA-Z]+$/.test(value)

export const checkPasswordStrong = (value: string): boolean =>
  /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,72}$/.test(value)
