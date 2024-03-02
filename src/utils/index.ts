import { RequestError } from '@/services/errorService'
import { type NextRequest } from 'next/server'

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

export const BigIntToJson = (param: any): any => {
  return JSON.parse(
    JSON.stringify(param, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  )
}

export const getRequestData = async (request: NextRequest): Promise<any> => {
  if (await request.clone().text() === '') {
    throw new RequestError('No se ha enviado ningun dato en el cuerpo de la petición')
  }

  const contentType = request.headers.get('content-type')

  if (contentType?.includes('application/json') === true) {
    return await request.json()
  }

  if (contentType?.includes('application/x-www-form-urlencoded') === true) {
    return await request.formData()
  }

  if (contentType?.includes('multipart/form-data') === true) {
    return await request.formData()
  }

  return await request.text()
}
