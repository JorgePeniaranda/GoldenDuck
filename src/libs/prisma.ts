import { ErrorsDictionary } from '@/const/messages'
import { AuthorizationError } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { type RegisterForm } from '@/types'
import { PrismaClient, type role } from '@prisma/client'

const jwt = new JWT()

export const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      delete: () => 'query disabled',
      deleteMany: () => 'query disabled'
    },
    user: {
      createUser: async (data: RegisterForm) => {
        const user = await prisma.user.create({
          data: {
            ...data,
            password: data.password,
            phoneNumber: Number(data.phoneNumber),
            dni: Number(data.dni)
          },
          select: {
            id: true,
            name: true,
            lastName: true,
            dni: true,
            email: true,
            phoneNumber: true,
            address: true,
            birthDate: true,
            sex: true
          }
        })

        await prisma.account.create({
          data: {
            idUser: user.id
          }
        })

        return user
      },
      verifyRole: async (authorizedRoles: role[], token: string) => {
        const { id: userId } = jwt.verifyToken(token)

        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
            deleted: false
          },
          select: {
            role: true
          }
        })

        if (authorizedRoles.includes(user.role)) {
          return false
        }

        return true
      },
      verifyRoleOrThrow: async (authorizedRoles: role[], token: string) => {
        const { id: userId } = jwt.verifyToken(token)

        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
            deleted: false
          },
          select: {
            role: true
          }
        })

        if (!authorizedRoles.includes(user.role)) {
          throw new AuthorizationError(ErrorsDictionary.NoPermissions)
        }

        return true
      },
      deleteUser: async (id: number) => {
        await prisma.account.updateMany({
          where: {
            idUser: id,
            deleted: false
          },
          data: {
            deleted: true
          }
        })

        // delete user
        await prisma.user.update({
          where: {
            id,
            deleted: false
          },
          data: {
            deleted: true
          }
        })
      }
    }
  }
})
