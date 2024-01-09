export const randomAlphanumeric = (length: number) => {
  return Array.from(Array(length), () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join('')
}
