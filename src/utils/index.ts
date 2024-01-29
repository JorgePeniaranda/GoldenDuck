export const randomAlphanumeric = (length: number) => {
  return Array.from(Array(length), () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join('')
}

export const checkAlphanumeric = (value: string) => /^[a-zA-Z0-9]*$/.test(value)

export const checkOnlyLetters = (value: string) => /^[a-zA-Z]+$/.test(value)
