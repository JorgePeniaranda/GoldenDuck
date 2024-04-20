export const checkAlphanumeric = (value: string): boolean => /^[a-zA-Z0-9]*$/.test(value)

export const checkOnlyLetters = (value: string): boolean => /^[a-zA-Z]+$/.test(value)

export const checkPasswordStrong = (value: string): boolean =>
  /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,72}$/.test(value)
