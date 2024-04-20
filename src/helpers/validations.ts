export function checkAlphanumeric (value: string): boolean {
  return /^[a-zA-Z0-9]*$/.test(value)
}

export function checkOnlyLetters (value: string): boolean {
  return /^[a-zA-Z]+$/.test(value)
}

export function checkPasswordStrong (value: string): boolean {
  return /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,72}$/.test(value)
}
