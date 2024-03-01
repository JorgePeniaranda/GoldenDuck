import { prisma } from '@/libs/prisma'
import { NotFoundError } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { type role } from '@prisma/client'

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
    JSON.stringify(
      param,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    )
  )
}

export const checkRole = async (authorizedRoles: role[], token: string): Promise<boolean> => {
  const { id: userId } = new JWT().verifyToken(token)

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deleted: false
    },
    select: {
      role: true
    }
  })

  if (user === null) {
    throw new NotFoundError('No se encontró la cuenta')
  }

  if (authorizedRoles.includes(user.role)) {
    return true
  }

  return false
}
